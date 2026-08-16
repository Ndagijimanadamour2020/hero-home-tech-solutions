import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
// Importing route modules during `next build` must not require a live database.
// Vercel supplies DATABASE_URL at runtime; this inert fallback is never queried.
const databaseUrl = process.env.DATABASE_URL || 'postgresql://build:build@db.invalid:5432/build?schema=public';

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: { db: { url: databaseUrl } },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
