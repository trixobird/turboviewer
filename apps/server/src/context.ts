import { type YogaInitialContext } from 'graphql-yoga';
import { $Enums } from '@repo/database';
import { decodeJwt } from './auth';
import { acceptedLanguage, type Language } from './language';
import RoleEnum = $Enums.RoleEnum;

export interface GraphQLContext {
  currentUserId: undefined | string;
  organizationId: undefined | string;
  acceptedLanguage: Language;
  isAdmin: boolean | undefined;
  request: {
    operatingSystem: string;
    browserName: string;
  };
}

export const createContext = (initialContext: YogaInitialContext): GraphQLContext => {
  const token = decodeJwt(initialContext.request);

  const userAgent = initialContext.request.headers.get('user-agent') ?? '';
  const operatingSystem = userAgent.split('(')[1]?.split(')')[0] || 'Unknown';
  const browserName = userAgent.split(') ')[1]?.split(' ')[0] || 'Unknown';

  return {
    currentUserId: token?.userId,
    organizationId: token?.organizationId,
    isAdmin: token?.roles.includes(RoleEnum.ADMIN),
    acceptedLanguage: acceptedLanguage(initialContext.request),
    request: {
      operatingSystem,
      browserName,
    },
  };
};