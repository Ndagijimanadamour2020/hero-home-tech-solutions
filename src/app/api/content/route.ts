import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [solutions, industries, demos, caseStudies] = await Promise.all([
      prisma.solution.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }),
      prisma.industry.findMany({ where: { published: true }, orderBy: { name: 'asc' } }),
      prisma.demo.findMany({ where: { published: true }, include: { solution: true }, orderBy: { createdAt: 'desc' } }),
      prisma.caseStudy.findMany({ where: { published: true }, include: { solutionRecord: true }, orderBy: { createdAt: 'desc' } }),
    ]);
    return NextResponse.json({ solutions, industries, demos, caseStudies });
  } catch {
    return NextResponse.json({ error: 'Content is temporarily unavailable.' }, { status: 503 });
  }
}
