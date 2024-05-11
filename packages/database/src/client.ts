import { neonConfig, Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';
// eslint-disable-next-line import/no-relative-packages -- we need to import from the generated client
import { PrismaClient } from '../.prisma';
import { env } from './config';

neonConfig.webSocketConstructor = ws;
const connectionString = env.DATABASE_URL;

const pool = new Pool({ connectionString });
const params = new URLSearchParams(connectionString);
const hasPgbouncer = params.has('pgbouncer');
const adapter = new PrismaNeon(pool);
export const prisma = new PrismaClient(hasPgbouncer ? { adapter } : undefined);

// eslint-disable-next-line import/no-relative-packages -- we need to import from the generated client
export * from '../.prisma';
