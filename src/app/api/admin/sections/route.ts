// src/app/api/admin/sections/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const sections = await prisma.sectionContent.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch section content' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { type, title, description } = await req.json();

    const section = await prisma.sectionContent.upsert({
      where: { type },
      update: { title, description },
      create: { type, title, description },
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save section content' }, { status: 500 });
  }
}