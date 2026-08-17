import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // Ensure your Prisma client import path is correct

export async function POST(request: Request) {
  const authenticated = await isAdmin();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, price, demoUrl } = body;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      demoUrl,
    },
  });

  return NextResponse.json(project, { status: 201 });
}