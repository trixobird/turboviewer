import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: Date; output: Date; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type BaseError = Error & {
  __typename?: 'BaseError';
  message: Scalars['String']['output'];
};

export type Error = {
  message: Scalars['String']['output'];
};

export type GenerateGoogleAuthUrlResponse = {
  __typename?: 'GenerateGoogleAuthUrlResponse';
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  forgetPassword: Scalars['Boolean']['output'];
  googleLoginSignup: TokenDto;
  login: TokenDto;
  /** Uses the refresh token to generate a new token */
  refreshToken: Scalars['String']['output'];
  resetPassword: TokenDto;
  signup: TokenDto;
  updateUser: User;
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


export type MutationResetPasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
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

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  users: Array<User>;
};

export type PrismaClientKnownRequestError = Error & {
  __typename?: 'PrismaClientKnownRequestError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  generateGoogleAuthUrl: GenerateGoogleAuthUrlResponse;
  me: User;
};


export type QueryGenerateGoogleAuthUrlArgs = {
  state: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  name: Scalars['String']['output'];
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
  roles: Array<Role>;
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

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenDto', token: string, refreshToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, organizationId: string, roles: Array<{ __typename?: 'Role', name: string }> } } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'TokenDto', token: string, refreshToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, organizationId: string, roles: Array<{ __typename?: 'Role', name: string }> } } };

export type ForgetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgetPasswordMutation = { __typename?: 'Mutation', forgetPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'TokenDto', token: string, refreshToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, organizationId: string, roles: Array<{ __typename?: 'Role', name: string }> } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', firstName: string, lastName: string, email: string } };

export type UserFieldsFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, organizationId: string, roles: Array<{ __typename?: 'Role', name: string }> };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  firstName
  lastName
  email
  roles {
    name
  }
  organizationId
}
    `;
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
    ${UserFieldsFragmentDoc}`;
export const SignupDocument = gql`
    mutation signup($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
  signup(
    email: $email
    firstName: $firstName
    lastName: $lastName
    password: $password
  ) {
    token
    refreshToken
    user {
      ...UserFields
    }
  }
}
    ${UserFieldsFragmentDoc}`;
export const ForgetPasswordDocument = gql`
    mutation forgetPassword($email: String!) {
  forgetPassword(email: $email)
}
    `;
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
    ${UserFieldsFragmentDoc}`;
export const MeDocument = gql`
    query me {
  me {
    firstName
    lastName
    email
  }
}
    `;
export type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C>(requester: Requester<C>) {
  return {
    login(variables: LoginMutationVariables, options?: C): Promise<LoginMutation> {
      return requester<LoginMutation, LoginMutationVariables>(LoginDocument, variables, options) as Promise<LoginMutation>;
    },
    signup(variables: SignupMutationVariables, options?: C): Promise<SignupMutation> {
      return requester<SignupMutation, SignupMutationVariables>(SignupDocument, variables, options) as Promise<SignupMutation>;
    },
    forgetPassword(variables: ForgetPasswordMutationVariables, options?: C): Promise<ForgetPasswordMutation> {
      return requester<ForgetPasswordMutation, ForgetPasswordMutationVariables>(ForgetPasswordDocument, variables, options) as Promise<ForgetPasswordMutation>;
    },
    resetPassword(variables: ResetPasswordMutationVariables, options?: C): Promise<ResetPasswordMutation> {
      return requester<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, variables, options) as Promise<ResetPasswordMutation>;
    },
    me(variables?: MeQueryVariables, options?: C): Promise<MeQuery> {
      return requester<MeQuery, MeQueryVariables>(MeDocument, variables, options) as Promise<MeQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;