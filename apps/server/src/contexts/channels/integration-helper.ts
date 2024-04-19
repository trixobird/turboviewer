import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { type Integration, IntegrationStatus, type IntegrationTypeEnum, Prisma, prisma } from '@repo/database';
import { logger } from '@repo/logger';
import { redis } from '@repo/redis';
import { AError, isAError } from '@repo/utils';
import type QueryString from 'qs';
import { env, isMode } from '../../config';
import { FireAndForget } from '../../fire-and-forget';
import { encryptAesGcm } from '../../utils/aes-util';
import { pubSub } from '../../schema/pubsub';
import { groupBy } from '../../utils/data-object-utils';
import { type ChannelInsight, type TokensResponse } from './channel-interface';
import { getChannel, isIntegrationTypeEnum } from './channel-helper';
import { decryptTokens } from './integration-util';
import IntegrationUncheckedCreateInput = Prisma.IntegrationUncheckedCreateInput;

const fireAndForget = new FireAndForget();

export const authCallback = (req: ExpressRequest, res: ExpressResponse): void => {
  const { code, state: stateArg, error_description: errorDescription } = req.query;

  completeIntegration(code, stateArg, errorDescription)
    .then((integrationType) => {
      if (isAError(integrationType)) {
        logger.error('Failed to complete integration %s:', integrationType.message);
        res.redirect(`${env.PUBLIC_URL}/settings/integrations?error=${integrationType.message}`);
      } else {
        res.redirect(`${env.PUBLIC_URL}/settings/integrations?type=${integrationType}&status=success`);
      }
    })
    .catch((_e: unknown) => {
      res.redirect(`${env.PUBLIC_URL}/settings/integrations?error=uknown_error`);
    });
};

export const getIntegrationAuthUrl = (type: IntegrationTypeEnum, organizationId: string, userId: string): string => {
  const { url, state } = getChannel(type).generateAuthUrl();
  fireAndForget.add(() => saveOrgState(state, organizationId, userId));
  return url;
};

const completeIntegration = async (
  code: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined,
  stateArg: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined,
  errorDescription: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined,
): Promise<AError | IntegrationTypeEnum> => {
  if (typeof errorDescription === 'string') {
    return new AError(errorDescription);
  }

  if (typeof code !== 'string' || typeof stateArg !== 'string') {
    return new AError('invalid_code');
  }

  const [mode, integrationType, state] = stateArg.split('_');

  // mode should only be uuid
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(state)) {
    return new AError('invalid_state');
  }

  if (!isMode(mode)) {
    return new AError('invalid_mode');
  }

  // integration should only be one of the IntegrationTypeEnum values
  if (!isIntegrationTypeEnum(integrationType)) {
    return new AError('invalid_integration');
  }

  const redisResp = await getOrgFromState(stateArg);
  if (!redisResp) {
    return new AError('invalid_organization');
  }

  const { organizationId, userId } = redisResp;
  const channel = getChannel(integrationType);
  const tokens = await channel.exchangeCodeForTokens(code);
  if (isAError(tokens)) {
    return tokens;
  }

  fireAndForget.add(async () => {
    const dbIntegration = await saveTokens(tokens, organizationId, integrationType);
    if (isAError(dbIntegration)) return dbIntegration;
    const integration = decryptTokens(dbIntegration);
    if (!integration) return new AError('Failed to decrypt integration');
    await saveChannelData(integration, userId, true);
  });
  return integrationType;
};

const integrationStateKey = (state: string) => `integration-state:${state}`;
export const saveOrgState = async (state: string, organizationId: string, userId: string): Promise<void> => {
  await redis.set(integrationStateKey(state), JSON.stringify({ organizationId, userId }), { EX: 12 * 60 * 60 });
};
const getOrgFromState = async (state: string): Promise<{ organizationId: string; userId: string } | null> => {
  return await redis
    .get(integrationStateKey(state))
    .then((res) => (res ? (JSON.parse(res) as { organizationId: string; userId: string }) : null));
};

const saveTokens = async (
  tokens: TokensResponse,
  organizationId: string,
  type: IntegrationTypeEnum,
): Promise<Integration | AError> => {
  logger.info(`Saving tokens for organization ${organizationId}`);

  const encryptedAccessToken = encryptAesGcm(tokens.accessToken, env.CHANNEL_SECRET);
  if (!encryptedAccessToken) {
    throw new Error('Failed to encrypt access token');
  }
  const encryptedRefreshToken = tokens.refreshToken
    ? encryptAesGcm(tokens.refreshToken, env.CHANNEL_SECRET)
    : undefined;

  if (!tokens.externalId) {
    const externalId = await getChannel(type).getUserId(tokens.accessToken);
    if (isAError(externalId)) {
      logger.error(`Failed to get external id for organization: ${organizationId} and channel: ${type}`);
      return externalId;
    }
    tokens.externalId = externalId;
  }

  const integrationData: IntegrationUncheckedCreateInput = {
    type,
    accessToken: encryptedAccessToken,
    refreshToken: encryptedRefreshToken,
    accessTokenExpiresAt: tokens.accessTokenExpiresAt,
    refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
    externalId: tokens.externalId,
    status: IntegrationStatus.CONNECTED,
    organizationId,
  };
  return await prisma.integration.upsert({
    create: integrationData,
    update: integrationData,
    where: {
      organizationId_type: {
        organizationId,
        type,
      },
    },
  });
};

const saveInsightsAndAds = async (
  insightsByExternalAdId: Map<string, ChannelInsight[]>,
  accountExternalIdMap: Map<string, string>,
  integration: Integration,
) => {
  await Promise.all(
    Array.from(insightsByExternalAdId.values()).flatMap(async (groupedInsights) => {
      if (!accountExternalIdMap.has(groupedInsights[0].externalAccountId)) {
        logger.error('Account %s not found', groupedInsights[0].externalAccountId);
        return;
      }
      return await prisma.$transaction(async (tx) => {
        const { id } = await tx.ad.upsert({
          select: { id: true },
          create: {
            externalId: groupedInsights[0].externalAdId,
            adAccount: {
              connect: {
                integrationId_externalId: {
                  integrationId: integration.id,
                  externalId: groupedInsights[0].externalAccountId,
                },
              },
            },
          },
          update: {},
          where: {
            adAccountId_externalId: {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it is checked above
              adAccountId: accountExternalIdMap.get(groupedInsights[0].externalAccountId)!,
              externalId: groupedInsights[0].externalAdId,
            },
          },
        });
        return await prisma.$transaction(
          groupedInsights.map((insight) => {
            return tx.insight.upsert({
              where: {
                adId_date_device_publisher_position: {
                  adId: id,
                  date: insight.date,
                  device: insight.device,
                  publisher: insight.publisher,
                  position: insight.position,
                },
              },
              update: {
                impressions: insight.impressions,
                spend: insight.spend,
              },
              create: {
                adId: id,
                date: insight.date,
                impressions: insight.impressions,
                spend: insight.spend,
                device: insight.device,
                publisher: insight.publisher,
                position: insight.position,
              },
            });
          }),
        );
      });
    }),
  );
};

export const saveChannelData = async (
  integration: Integration,
  userId: string | undefined,
  initial: boolean,
): Promise<AError | undefined> => {
  logger.info(
    `Starting ${integration.type} ad ingress for organizationId: ${integration.organizationId}${userId ? ` initial.` : ''}`,
  );
  userId &&
    pubSub.publish('user:channel:initial-progress', userId, {
      channel: integration.type,
      progress: 0,
    });

  const channel = getChannel(integration.type);
  const data = await channel.getChannelData(integration, userId, initial);
  if (isAError(data)) return data;

  const accounts = await Promise.all(
    data.accounts.map((acc) =>
      prisma.adAccount.upsert({
        select: { id: true, externalId: true },
        where: {
          integrationId_externalId: {
            integrationId: integration.id,
            externalId: acc.externalId,
          },
        },
        update: { currency: acc.currency },
        create: {
          integrationId: integration.id,
          externalId: acc.externalId,
          currency: acc.currency,
        },
      }),
    ),
  );

  userId &&
    pubSub.publish('user:channel:initial-progress', userId, {
      channel: integration.type,
      progress: 95,
    });

  const accountExternalIdMap = new Map<string, string>(accounts.map((acc) => [acc.externalId, acc.id]));

  const insightsByExternalAdId = groupBy(data.insights, (item) => item.externalAdId);
  await saveInsightsAndAds(insightsByExternalAdId, accountExternalIdMap, integration);

  userId &&
    pubSub.publish('user:channel:initial-progress', userId, {
      channel: integration.type,
      progress: 100,
    });
};
