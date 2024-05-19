import gql from 'graphql-tag';
import * as Urql from '@urql/next';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: Date; output: Date };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Ad = {
  __typename?: 'Ad';
  adAccount: AdAccount;
  adAccountId: Scalars['String']['output'];
  externalId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  insights: AdInsightsConnection;
  name: Scalars['String']['output'];
};

export type AdInsightsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  dateFrom?: InputMaybe<Scalars['Date']['input']>;
  dateTo?: InputMaybe<Scalars['Date']['input']>;
  devices?: InputMaybe<Array<DeviceEnum>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  highestFirst?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InsightsColumnsOrderBy;
  positions?: InputMaybe<Array<Scalars['String']['input']>>;
  publishers?: InputMaybe<Array<PublisherEnum>>;
};

export type AdAccount = {
  __typename?: 'AdAccount';
  advertisements: AdAccountAdvertisementsConnection;
  createdAt: Scalars['Date']['output'];
  currency: CurrencyEnum;
  externalId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  integration: Integration;
  integrationId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type AdAccountAdvertisementsArgs = {
  after?: InputMaybe<Scalars['ID']['input']>;
  before?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type AdAccountAdvertisementsConnection = {
  __typename?: 'AdAccountAdvertisementsConnection';
  edges: Array<Maybe<AdAccountAdvertisementsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type AdAccountAdvertisementsConnectionEdge = {
  __typename?: 'AdAccountAdvertisementsConnectionEdge';
  cursor: Scalars['ID']['output'];
  node: Ad;
};

export type AdInsightsConnection = {
  __typename?: 'AdInsightsConnection';
  edges: Array<Maybe<AdInsightsConnectionEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type AdInsightsConnectionEdge = {
  __typename?: 'AdInsightsConnectionEdge';
  cursor: Scalars['ID']['output'];
  node: Insight;
};

export type BaseError = Error & {
  __typename?: 'BaseError';
  message: Scalars['String']['output'];
};

export type ChannelInitialProgressPayload = {
  __typename?: 'ChannelInitialProgressPayload';
  channel: IntegrationType;
  progress: Scalars['Float']['output'];
};

export enum CurrencyEnum {
  AFN = 'AFN',
  ALL = 'ALL',
  DZD = 'DZD',
  USD = 'USD',
  EUR = 'EUR',
  AOA = 'AOA',
  XCD = 'XCD',
  ARS = 'ARS',
  AMD = 'AMD',
  AWG = 'AWG',
  AUD = 'AUD',
  AZN = 'AZN',
  BSD = 'BSD',
  BHD = 'BHD',
  BDT = 'BDT',
  BBD = 'BBD',
  BYN = 'BYN',
  BZD = 'BZD',
  XOF = 'XOF',
  BMD = 'BMD',
  BTN = 'BTN',
  INR = 'INR',
  BOB = 'BOB',
  BOV = 'BOV',
  BAM = 'BAM',
  BWP = 'BWP',
  NOK = 'NOK',
  BRL = 'BRL',
  BND = 'BND',
  BGN = 'BGN',
  BIF = 'BIF',
  CVE = 'CVE',
  KHR = 'KHR',
  XAF = 'XAF',
  CAD = 'CAD',
  KYD = 'KYD',
  CLF = 'CLF',
  CLP = 'CLP',
  CNY = 'CNY',
  COP = 'COP',
  COU = 'COU',
  KMF = 'KMF',
  CDF = 'CDF',
  NZD = 'NZD',
  CRC = 'CRC',
  CUC = 'CUC',
  CUP = 'CUP',
  ANG = 'ANG',
  CZK = 'CZK',
  DKK = 'DKK',
  DJF = 'DJF',
  DOP = 'DOP',
  EGP = 'EGP',
  SVC = 'SVC',
  ERN = 'ERN',
  ETB = 'ETB',
  FKP = 'FKP',
  FJD = 'FJD',
  XPF = 'XPF',
  GMD = 'GMD',
  GEL = 'GEL',
  GHS = 'GHS',
  GIP = 'GIP',
  GTQ = 'GTQ',
  GBP = 'GBP',
  GNF = 'GNF',
  GYD = 'GYD',
  HTG = 'HTG',
  HNL = 'HNL',
  HKD = 'HKD',
  HUF = 'HUF',
  ISK = 'ISK',
  IDR = 'IDR',
  XDR = 'XDR',
  IRR = 'IRR',
  IQD = 'IQD',
  ILS = 'ILS',
  JMD = 'JMD',
  JPY = 'JPY',
  JOD = 'JOD',
  KZT = 'KZT',
  KES = 'KES',
  KPW = 'KPW',
  KRW = 'KRW',
  KWD = 'KWD',
  KGS = 'KGS',
  LAK = 'LAK',
  LBP = 'LBP',
  LSL = 'LSL',
  ZAR = 'ZAR',
  LRD = 'LRD',
  LYD = 'LYD',
  CHF = 'CHF',
  MOP = 'MOP',
  MGA = 'MGA',
  MWK = 'MWK',
  MYR = 'MYR',
  MVR = 'MVR',
  MRU = 'MRU',
  MUR = 'MUR',
  XUA = 'XUA',
  MXN = 'MXN',
  MXV = 'MXV',
  MDL = 'MDL',
  MNT = 'MNT',
  MAD = 'MAD',
  MZN = 'MZN',
  MMK = 'MMK',
  NAD = 'NAD',
  NPR = 'NPR',
  NIO = 'NIO',
  NGN = 'NGN',
  OMR = 'OMR',
  PKR = 'PKR',
  PAB = 'PAB',
  PGK = 'PGK',
  PYG = 'PYG',
  PEN = 'PEN',
  PHP = 'PHP',
  PLN = 'PLN',
  QAR = 'QAR',
  MKD = 'MKD',
  RON = 'RON',
  RUB = 'RUB',
  RWF = 'RWF',
  SHP = 'SHP',
  WST = 'WST',
  STN = 'STN',
  SAR = 'SAR',
  RSD = 'RSD',
  SCR = 'SCR',
  SLE = 'SLE',
  SGD = 'SGD',
  XSU = 'XSU',
  SBD = 'SBD',
  SOS = 'SOS',
  SSP = 'SSP',
  LKR = 'LKR',
  SDG = 'SDG',
  SRD = 'SRD',
  SZL = 'SZL',
  SEK = 'SEK',
  CHE = 'CHE',
  CHW = 'CHW',
  SYP = 'SYP',
  TWD = 'TWD',
  TJS = 'TJS',
  TZS = 'TZS',
  THB = 'THB',
  TOP = 'TOP',
  TTD = 'TTD',
  TND = 'TND',
  TRY = 'TRY',
  TMT = 'TMT',
  UGX = 'UGX',
  UAH = 'UAH',
  AED = 'AED',
  USN = 'USN',
  UYI = 'UYI',
  UYU = 'UYU',
  UZS = 'UZS',
  VUV = 'VUV',
  VEF = 'VEF',
  VED = 'VED',
  VND = 'VND',
  YER = 'YER',
  ZMW = 'ZMW',
  ZWL = 'ZWL',
}

export enum DeviceEnum {
  MobileWeb = 'MobileWeb',
  MobileApp = 'MobileApp',
  Desktop = 'Desktop',
  Unknown = 'Unknown',
}

export type Error = {
  message: Scalars['String']['output'];
};

export type GenerateGoogleAuthUrlResponse = {
  __typename?: 'GenerateGoogleAuthUrlResponse';
  url: Scalars['String']['output'];
};

export type GroupedInsight = Pagination & {
  __typename?: 'GroupedInsight';
  edges: Array<GroupedInsights>;
  totalCount: Scalars['Int']['output'];
};

export type GroupedInsights = {
  __typename?: 'GroupedInsights';
  adAccountId?: Maybe<Scalars['String']['output']>;
  adAccountName?: Maybe<Scalars['String']['output']>;
  adId?: Maybe<Scalars['String']['output']>;
  adName?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<CurrencyEnum>;
  date?: Maybe<Scalars['Date']['output']>;
  device?: Maybe<DeviceEnum>;
  iFrame?: Maybe<IFrame>;
  impressions: Scalars['Int']['output'];
  position?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<PublisherEnum>;
  spend: Scalars['Int']['output'];
};

export type IFrame = {
  __typename?: 'IFrame';
  height: Scalars['String']['output'];
  src: Scalars['String']['output'];
  width: Scalars['String']['output'];
};

export type Insight = {
  __typename?: 'Insight';
  ad: Ad;
  adId: Scalars['String']['output'];
  date: Scalars['Date']['output'];
  device: DeviceEnum;
  id: Scalars['ID']['output'];
  impressions: Scalars['Int']['output'];
  position: Scalars['String']['output'];
  publisher: PublisherEnum;
  spend: Scalars['Int']['output'];
};

export enum InsightsColumnsGroupBy {
  adAccountId = 'adAccountId',
  adId = 'adId',
  date = 'date',
  device = 'device',
  position = 'position',
  publisher = 'publisher',
}

export enum InsightsColumnsOrderBy {
  spend = 'spend',
  impressions = 'impressions',
}

export enum InsightsOrderBy {
  MobileWeb = 'MobileWeb',
  MobileApp = 'MobileApp',
  Desktop = 'Desktop',
  Unknown = 'Unknown',
}

export type Integration = {
  __typename?: 'Integration';
  accessTokenExpiresAt?: Maybe<Scalars['Date']['output']>;
  adAccounts: Array<AdAccount>;
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  organization: Organization;
  organizationId: Scalars['String']['output'];
  refreshTokenExpiresAt?: Maybe<Scalars['Date']['output']>;
  type: IntegrationType;
};

export type IntegrationAdAccountsArgs = {
  currency?: InputMaybe<CurrencyEnum>;
};

export type IntegrationListItem = {
  __typename?: 'IntegrationListItem';
  authUrl?: Maybe<Scalars['String']['output']>;
  status: IntegrationStatus;
  type: IntegrationType;
};

export enum IntegrationStatus {
  ComingSoon = 'ComingSoon',
  NotConnected = 'NotConnected',
  Expired = 'Expired',
  Connected = 'Connected',
  Revoked = 'Revoked',
}

export enum IntegrationType {
  META = 'META',
  TIKTOK = 'TIKTOK',
  LINKEDIN = 'LINKEDIN',
}

export type MetaError = Error & {
  __typename?: 'MetaError';
  code: Scalars['Int']['output'];
  errorSubCode: Scalars['Int']['output'];
  fbTraceId: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deAuthIntegration: MutationDeAuthIntegrationResult;
  forgetPassword: Scalars['Boolean']['output'];
  googleLoginSignup: TokenDto;
  login: TokenDto;
  refreshData: Scalars['Boolean']['output'];
  /** Uses the refresh token to generate a new token */
  refreshToken: Scalars['String']['output'];
  resetPassword: TokenDto;
  signup: TokenDto;
  updateUser: User;
};

export type MutationDeAuthIntegrationArgs = {
  type: IntegrationType;
};

export type MutationForgetPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationGoogleLoginSignupArgs = {
  code: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationRefreshDataArgs = {
  initial: Scalars['Boolean']['input'];
  integrationIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationUpdateUserArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

export type MutationDeAuthIntegrationResult = BaseError | MetaError | MutationDeAuthIntegrationSuccess;

export type MutationDeAuthIntegrationSuccess = {
  __typename?: 'MutationDeAuthIntegrationSuccess';
  data: Scalars['String']['output'];
};

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  integrations: Array<Integration>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  users: Array<User>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ID']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['ID']['output']>;
};

export type Pagination = {
  totalCount: Scalars['Int']['output'];
};

export type PrismaClientKnownRequestError = Error & {
  __typename?: 'PrismaClientKnownRequestError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export enum PublisherEnum {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Messenger = 'Messenger',
  AudienceNetwork = 'AudienceNetwork',
  LinkedIn = 'LinkedIn',
  TikTok = 'TikTok',
  Unknown = 'Unknown',
}

export type Query = {
  __typename?: 'Query';
  generateGoogleAuthUrl: GenerateGoogleAuthUrlResponse;
  insights: GroupedInsight;
  integrations: Array<Integration>;
  lastThreeMonthsAds: Array<Ad>;
  me: User;
  settingsChannels: Array<IntegrationListItem>;
};

export type QueryGenerateGoogleAuthUrlArgs = {
  state: Scalars['String']['input'];
};

export type QueryInsightsArgs = {
  adAccountIds?: InputMaybe<Array<Scalars['String']['input']>>;
  adIds?: InputMaybe<Array<Scalars['String']['input']>>;
  dateFrom?: InputMaybe<Scalars['Date']['input']>;
  dateTo?: InputMaybe<Scalars['Date']['input']>;
  devices?: InputMaybe<Array<DeviceEnum>>;
  groupBy?: InputMaybe<Array<InsightsColumnsGroupBy>>;
  order?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InsightsColumnsOrderBy;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  positions?: InputMaybe<Array<Scalars['String']['input']>>;
  publishers?: InputMaybe<Array<PublisherEnum>>;
};

export type QueryIntegrationsArgs = {
  type?: InputMaybe<IntegrationType>;
};

export type Subscription = {
  __typename?: 'Subscription';
  channelInitialSetupProgress: ChannelInitialProgressPayload;
};

export type TokenDto = {
  __typename?: 'TokenDto';
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  organization: Organization;
  organizationId: Scalars['ID']['output'];
  roles: Array<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type ZodError = Error & {
  __typename?: 'ZodError';
  fieldErrors: Array<ZodFieldError>;
  message: Scalars['String']['output'];
};

export type ZodFieldError = {
  __typename?: 'ZodFieldError';
  message: Scalars['String']['output'];
  path: Array<Scalars['String']['output']>;
};

export type AdAccountsQueryVariables = Exact<{ [key: string]: never }>;

export type AdAccountsQuery = {
  __typename?: 'Query';
  integrations: Array<{
    __typename?: 'Integration';
    adAccounts: Array<{ __typename?: 'AdAccount'; id: string; name: string; currency: CurrencyEnum }>;
  }>;
};

export type InsightsQueryVariables = Exact<{
  adAccountIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  adIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  dateFrom?: InputMaybe<Scalars['Date']['input']>;
  dateTo?: InputMaybe<Scalars['Date']['input']>;
  devices?: InputMaybe<Array<DeviceEnum> | DeviceEnum>;
  publishers?: InputMaybe<Array<PublisherEnum> | PublisherEnum>;
  positions?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
  orderBy: InsightsColumnsOrderBy;
  groupBy?: InputMaybe<Array<InsightsColumnsGroupBy> | InsightsColumnsGroupBy>;
  pageSize: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;

export type InsightsQuery = {
  __typename?: 'Query';
  insights: {
    __typename?: 'GroupedInsight';
    totalCount: number;
    edges: Array<{
      __typename?: 'GroupedInsights';
      adAccountId?: string | null;
      adAccountName?: string | null;
      adId?: string | null;
      adName?: string | null;
      currency?: CurrencyEnum | null;
      date?: Date | null;
      device?: DeviceEnum | null;
      publisher?: PublisherEnum | null;
      position?: string | null;
      impressions: number;
      spend: number;
      iFrame?: { __typename?: 'IFrame'; src: string; height: string; width: string } | null;
    }>;
  };
};

export type LastThreeMonthsAdsQueryVariables = Exact<{ [key: string]: never }>;

export type LastThreeMonthsAdsQuery = {
  __typename?: 'Query';
  lastThreeMonthsAds: Array<{ __typename?: 'Ad'; id: string; name: string }>;
};

export type SettingsChannelsQueryVariables = Exact<{ [key: string]: never }>;

export type SettingsChannelsQuery = {
  __typename?: 'Query';
  settingsChannels: Array<{
    __typename?: 'IntegrationListItem';
    type: IntegrationType;
    status: IntegrationStatus;
    authUrl?: string | null;
  }>;
};

export type DeAuthIntegrationMutationVariables = Exact<{
  type: IntegrationType;
}>;

export type DeAuthIntegrationMutation = {
  __typename?: 'Mutation';
  deAuthIntegration:
    | { __typename?: 'BaseError'; message: string }
    | { __typename?: 'MetaError'; message: string }
    | { __typename?: 'MutationDeAuthIntegrationSuccess'; data: string };
};

export type ChannelInitialSetupProgressSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ChannelInitialSetupProgressSubscription = {
  __typename?: 'Subscription';
  channelInitialSetupProgress: {
    __typename?: 'ChannelInitialProgressPayload';
    progress: number;
    channel: IntegrationType;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'TokenDto';
    token: string;
    refreshToken: string;
    user: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      roles: Array<string>;
      organizationId: string;
    };
  };
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: {
    __typename?: 'TokenDto';
    token: string;
    refreshToken: string;
    user: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      roles: Array<string>;
      organizationId: string;
    };
  };
};

export type ForgetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ForgetPasswordMutation = { __typename?: 'Mutation'; forgetPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword: {
    __typename?: 'TokenDto';
    token: string;
    refreshToken: string;
    user: {
      __typename?: 'User';
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      roles: Array<string>;
      organizationId: string;
    };
  };
};

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = { __typename?: 'Mutation'; refreshToken: string };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: { __typename?: 'User'; firstName: string; lastName: string; email: string };
};

export type UserFieldsFragment = {
  __typename?: 'User';
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Array<string>;
  organizationId: string;
};

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    firstName
    lastName
    email
    roles
    organizationId
  }
`;
export const AdAccountsDocument = gql`
  query adAccounts {
    integrations {
      adAccounts {
        id
        name
        currency
      }
    }
  }
`;

export function useAdAccountsQuery(options?: Omit<Urql.UseQueryArgs<AdAccountsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdAccountsQuery, AdAccountsQueryVariables>({ query: AdAccountsDocument, ...options });
}
export const InsightsDocument = gql`
  query insights(
    $adAccountIds: [String!]
    $adIds: [String!]
    $dateFrom: Date
    $dateTo: Date
    $devices: [DeviceEnum!]
    $publishers: [PublisherEnum!]
    $positions: [String!]
    $order: String
    $orderBy: InsightsColumnsOrderBy!
    $groupBy: [InsightsColumnsGroupBy!]
    $pageSize: Int!
    $page: Int!
  ) {
    insights(
      adAccountIds: $adAccountIds
      adIds: $adIds
      dateFrom: $dateFrom
      dateTo: $dateTo
      devices: $devices
      publishers: $publishers
      positions: $positions
      order: $order
      orderBy: $orderBy
      groupBy: $groupBy
      pageSize: $pageSize
      page: $page
    ) {
      totalCount
      edges {
        adAccountId
        adAccountName
        adId
        adName
        currency
        date
        device
        publisher
        position
        impressions
        spend
        iFrame {
          src
          height
          width
        }
      }
    }
  }
`;

export function useInsightsQuery(options: Omit<Urql.UseQueryArgs<InsightsQueryVariables>, 'query'>) {
  return Urql.useQuery<InsightsQuery, InsightsQueryVariables>({ query: InsightsDocument, ...options });
}
export const LastThreeMonthsAdsDocument = gql`
  query lastThreeMonthsAds {
    lastThreeMonthsAds {
      id
      name
    }
  }
`;

export function useLastThreeMonthsAdsQuery(
  options?: Omit<Urql.UseQueryArgs<LastThreeMonthsAdsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<LastThreeMonthsAdsQuery, LastThreeMonthsAdsQueryVariables>({
    query: LastThreeMonthsAdsDocument,
    ...options,
  });
}
export const SettingsChannelsDocument = gql`
  query settingsChannels {
    settingsChannels {
      type
      status
      authUrl
    }
  }
`;

export function useSettingsChannelsQuery(options?: Omit<Urql.UseQueryArgs<SettingsChannelsQueryVariables>, 'query'>) {
  return Urql.useQuery<SettingsChannelsQuery, SettingsChannelsQueryVariables>({
    query: SettingsChannelsDocument,
    ...options,
  });
}
export const DeAuthIntegrationDocument = gql`
  mutation deAuthIntegration($type: IntegrationType!) {
    deAuthIntegration(type: $type) {
      ... on BaseError {
        message
      }
      ... on MetaError {
        message
      }
      ... on MutationDeAuthIntegrationSuccess {
        data
      }
    }
  }
`;

export function useDeAuthIntegrationMutation() {
  return Urql.useMutation<DeAuthIntegrationMutation, DeAuthIntegrationMutationVariables>(DeAuthIntegrationDocument);
}
export const ChannelInitialSetupProgressDocument = gql`
  subscription channelInitialSetupProgress {
    channelInitialSetupProgress {
      progress
      channel
    }
  }
`;

export function useChannelInitialSetupProgressSubscription<TData = ChannelInitialSetupProgressSubscription>(
  options?: Omit<Urql.UseSubscriptionArgs<ChannelInitialSetupProgressSubscriptionVariables>, 'query'>,
  handler?: Urql.SubscriptionHandler<ChannelInitialSetupProgressSubscription, TData>,
) {
  return Urql.useSubscription<
    ChannelInitialSetupProgressSubscription,
    TData,
    ChannelInitialSetupProgressSubscriptionVariables
  >({ query: ChannelInitialSetupProgressDocument, ...options }, handler);
}
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const SignupDocument = gql`
  mutation signup($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    signup(email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
      token
      refreshToken
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
}
export const ForgetPasswordDocument = gql`
  mutation forgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

export function useForgetPasswordMutation() {
  return Urql.useMutation<ForgetPasswordMutation, ForgetPasswordMutationVariables>(ForgetPasswordDocument);
}
export const ResetPasswordDocument = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      token
      refreshToken
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
}
export const RefreshTokenDocument = gql`
  mutation refreshToken {
    refreshToken
  }
`;

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument);
}
export const MeDocument = gql`
  query me {
    me {
      firstName
      lastName
      email
    }
  }
`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
}
