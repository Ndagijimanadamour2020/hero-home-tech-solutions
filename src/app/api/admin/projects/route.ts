export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

const SUPPORTED_CURRENCIES = ['RWF', 'USD', 'EUR'] as const;

type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

function toText(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean).join('\n');
  }
  return value === null || value === undefined ? '' : String(value).trim();
}

function toUrlList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean);
  }
  return toText(value).split('\n').map((entry) => entry.trim()).filter(Boolean);
}

function toCurrency(value: unknown): SupportedCurrency {
  const currency = toText(value).toUpperCase();
  return SUPPORTED_CURRENCIES.includes(currency as SupportedCurrency)
    ? (currency as SupportedCurrency)
    : 'RWF';
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
      currency,
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
    const name = toText(projectName ?? title) || 'Untitled Project';
    const prob = toText(projectProblem ?? problem);
    const sol = toText(projectSolution ?? solution);
    const ben = toText(projectBenefits ?? benefits);

    if (!prob || !sol || !ben) {
      return NextResponse.json(
        { error: 'Project name, problem, solution, and benefits are required.' },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: 'A category is required for this project.' },
        { status: 400 }
      );
    }

    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now()}`;

    const project = await prisma.project.create({
      data: {
        title: name,
        slug: generatedSlug,
        problem: prob,
        solution: sol,
        benefits: ben,
        shortDescription: toText(shortDescription) || prob,
        description: toText(description) || sol,
        categoryId: String(categoryId),
        status: status || 'DRAFT',
        featured: Boolean(featured),
        price: Number.parseFloat(String(price)) || 0,
        currency: toCurrency(currency),
        liveDemoUrl: toText(liveDemoUrl) || null,
        projectUrl: toText(projectUrl) || null,
        downloadFolder: toText(projectZipUrl) || null,
        images: toUrlList(images),
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err: any) {
    console.error('Error creating project:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
