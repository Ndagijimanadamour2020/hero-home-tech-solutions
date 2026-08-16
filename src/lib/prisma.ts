import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Prisma must not be constructed just because Next imports a route while
 * analysing or prerendering it. The proxy creates the client only when a
 * request handler (or dynamic server page) actually accesses a Prisma model.
 */
function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const value = (getPrismaClient() as unknown as Record<PropertyKey, unknown>)[property];
    return typeof value === 'function' ? value.bind(getPrismaClient()) : value;
  },
});
