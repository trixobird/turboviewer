import { z } from 'zod';
import { commonSchema, createEnv } from '@repo/utils';

const defaultPort = '4000';
const schema = z
  .object({
    API_ENDPOINT: z.string().url().default(`http://localhost:${defaultPort}/api`),
    AWS_REGION: z.string().min(1).default('eu-central-1'),
    CHANNEL_SECRET: z.string().min(1).default('channelSecret'),
    PORT: z
      .string()
      .min(1)
      .max(5)
      .transform((val) => parseInt(val))
      .default(defaultPort),
    PUBLIC_URL: z.string().url().default('http://localhost:3000'),
  })
  .merge(commonSchema);

export const env = createEnv(schema);
