import { z } from 'zod';
import { commonSchema, createEnv } from '@repo/utils';

const schema = z
  .object({
    GRAPHQL_ENDPOINT: z.string().min(1).default('http://localhost:4000/graphql'),
  })
  .merge(commonSchema);

export const env = createEnv(schema);

export const TOKEN_KEY = 'av_token';
export const REFRESH_TOKEN_KEY = 'av_refresh_token';
