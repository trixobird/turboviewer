import { z } from 'zod';
import { createEnv } from '@repo/utils';
import { channelsSchema } from '@repo/channel-utils';

const schema = z
  .object({
    LINKEDIN_APPLICATION_ID: z.string().length(14),
    LINKEDIN_APPLICATION_SECRET: z.string().length(16),
  })
  .merge(channelsSchema);

export const env = createEnv(schema);
