import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';
export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const [leadCount, newLeadCount, solutionCount, eventCount, leads] = await Promise.all([prisma.lead.count(), prisma.lead.count({ where: { status: 'NEW' } }), prisma.solution.count(), prisma.analyticsEvent.count({ where: { createdAt: { gte: new Date(Date.now() - 30 * 86400000) } } }), prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 12 })]);
  return NextResponse.json({ leadCount, newLeadCount, solutionCount, eventCount, leads });
}
