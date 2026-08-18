import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      projectName,
      problem,
      projectProblem,
      solution,
      projectSolution,
      benefits,
      projectBenefits,
      projectUrl,
      price,
      liveDemoUrl,
      images,
      projectZipUrl,
      shortDescription,
      description,
      categoryId,
      status,
      featured,
    } = body;

    // Fallbacks to handle legacy and new payload field names
    const name = String(projectName || title || 'Untitled Project').trim();
    const prob = String(projectProblem || problem || '').trim();
    const sol = String(projectSolution || solution || '').trim();
    const ben = String(projectBenefits || benefits || '').trim();

    if (!name || !prob || !sol || !ben) {
      return NextResponse.json(
        { error: 'Project name, problem, solution, and benefits are required.' },
        { status: 400 }
      );
    }

    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now()}`;

    const imageArray = typeof images === 'string'
      ? images.split('\n').map((url: string) => url.trim()).filter(Boolean)
      : Array.isArray(images) ? images : [];

    const project = await prisma.project.create({
      data: {
        // Required schema fields
        projectName: name,
        title: name,
        slug: generatedSlug,
        projectProblem: prob,
        projectSolution: sol,
        projectBenefits: ben,
        
        // Optional / Legacy fields
        problem: prob,
        solution: sol,
        benefits: ben,
        shortDescription: shortDescription || null,
        description: description || null,
        categoryId: categoryId || null,
        status: status || 'DRAFT',
        featured: Boolean(featured),
        price: parseFloat(price) || 0,
        liveDemoUrl: liveDemoUrl || null,
        projectUrl: projectUrl || null,
        projectZipUrl: projectZipUrl || null,
        images: imageArray,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err: any) {
    console.error('Error creating project:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}