import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
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
    } = body;

    // Validate required fields
    if (!projectName || !projectProblem || !projectSolution || !projectBenefits) {
      return NextResponse.json(
        { error: 'Please fill in all required project content fields.' },
        { status: 400 }
      );
    }

    // Process image lines into an array
    const imageList = typeof images === 'string'
      ? images.split('\n').map((url: string) => url.trim()).filter(Boolean)
      : Array.isArray(images) ? images : [];

    const newProject = await prisma.project.create({
      data: {
        projectName,
        projectProblem,
        projectSolution,
        projectBenefits,
        projectUrl: projectUrl || null,
        price: parseFloat(price) || 0,
        liveDemoUrl: liveDemoUrl || null,
        images: imageList,
        projectZipUrl: projectZipUrl || null,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error('Project creation error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}