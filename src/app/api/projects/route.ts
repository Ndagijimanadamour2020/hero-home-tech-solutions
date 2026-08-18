export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    const {
      projectName,
      projectProblem,
      projectSolution,
      projectBenefits,
      projectUrl,
      price,
      liveDemoUrl,
      images,
      projectZipUrl,
      currency,
      categoryId,
      shortDescription,
      description,
    } = body;

    if (!projectName || !projectProblem || !projectSolution || !projectBenefits) {
      return NextResponse.json(
        { error: 'Please provide project name, problem, solution, and benefits.' },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Please select a category for this project.' },
        { status: 400 }
      );
    }

    const name = String(projectName).trim();
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now()}`;

    const imageArray = typeof images === 'string'
      ? images.split('\n').map((url: string) => url.trim()).filter(Boolean)
      : Array.isArray(images) ? images : [];

    const project = await prisma.project.create({
      data: {
        title: name,
        slug: generatedSlug,
        problem: String(projectProblem),
        solution: String(projectSolution),
        benefits: String(projectBenefits),
        shortDescription: String(shortDescription || projectProblem),
        description: String(description || projectSolution),
        categoryId: String(categoryId),
        projectUrl: projectUrl || null,
        price: parseFloat(price) || 0,
        currency: ['RWF', 'USD', 'EUR'].includes(String(currency).toUpperCase())
          ? String(currency).toUpperCase()
          : 'RWF',
        liveDemoUrl: liveDemoUrl || null,
        images: imageArray,
        downloadFolder: projectZipUrl || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err: any) {
    console.error('Error creating project:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}