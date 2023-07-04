import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
}

export const prisma = new PrismaClient({
  log: process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' ? ['info', 'query'] : [],
});
