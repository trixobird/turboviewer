import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { type Integration, IntegrationStatus, type IntegrationTypeEnum, Prisma, prisma } from '@repo/database';
import { logger } from '@repo/logger';
import { redis } from '@repo/redis';
import { AError, FireAndForget, isAError, isMode } from '@repo/utils';
import type QueryString from 'qs';
import { z } from 'zod';
import { decryptTokens, encryptAesGcm } from '@repo/channel-utils';
import { type TokensResponse } from '@repo/channel-utils';
import { getChannel, isIntegrationTypeEnum } from './channel-helper';
import { env } from './config';
import IntegrationUncheckedCreateInput = Prisma.IntegrationUncheckedCreateInput;
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;

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
      res.redirect(`${env.PUBLIC_URL}/settings/integrations?error=unknown_error`);
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

  const { organizationId } = redisResp;
  const channel = getChannel(integrationType);
  const tokens = await channel.exchangeCodeForTokens(code);
  if (isAError(tokens)) {
    return tokens;
  }

  const dbIntegration = await saveTokens(tokens, organizationId, integrationType).catch((e: unknown) => {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      const metaSchema = z.object({ modelName: z.string(), target: z.array(z.string()) });
      const parsed = metaSchema.safeParse(e.meta);
      if (
        parsed.success &&
        parsed.data.modelName === 'Integration' &&
        parsed.data.target.includes('external_id') &&
        parsed.data.target.includes('type')
      )
        return new AError(
          'There is already an integration for this organization. Please disconnect the existing one first.',
        );
      return new AError('Failed to save tokens to database');
    }
    return new AError('Failed to save tokens to database');
  });
  if (isAError(dbIntegration)) return dbIntegration;

  fireAndForget.add(async () => {
    const integration = decryptTokens(dbIntegration);
    if (!integration) return new AError('Failed to decrypt integration');
    await saveChannelData(integration, true);
  });
  return integrationType;
};

const integrationStateKey = (state: string): string => `integration-state:${state}`;
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

export const saveChannelData = async (integration: Integration, initial: boolean): Promise<AError | undefined> => {
  logger.info(`Starting ${initial ? 'initial' : 'periodic'} ad ingress for integrationId: ${integration.id}`);

  const channel = getChannel(integration.type);
  const data = await channel.getChannelData(integration, initial);
  if (isAError(data)) return data;
};
