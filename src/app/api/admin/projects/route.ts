// src/app/api/admin/projects/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, problem, solution, benefits, price, liveDemoUrl, images, downloadFolder, categoryId, status } = body;

    const project = await prisma.project.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        problem,
        solution,
        benefits,
        shortDescription: problem.substring(0, 150),
        description: solution,
        price: parseFloat(price),
        liveDemoUrl: liveDemoUrl || null,
        images: images || [],
        downloadFolder: downloadFolder || null,
        categoryId,
        status: status || 'PUBLISHED',
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}