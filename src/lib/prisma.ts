import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// A build without Vercel environment variables can import Prisma safely.
// Dynamic routes/pages only connect when they execute at runtime.
export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@localhost:5432/db',
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
