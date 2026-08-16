export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export async function GET() { if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json(await prisma.category.findMany({ include: { _count: { select: { projects: true } } }, orderBy: { name: 'asc' } })); }
export async function POST(request: Request) { if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const { name } = await request.json(); if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 }); return NextResponse.json(await prisma.category.create({ data: { name: String(name).trim(), slug: slugify(name) } }), { status: 201 }); }
export async function DELETE(request: Request) { if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const id = new URL(request.url).searchParams.get('id'); if (!id) return NextResponse.json({ error: 'Category id is required.' }, { status: 400 }); const category = await prisma.category.findUnique({ where: { id }, include: { _count: { select: { projects: true } } } }); if (!category || category._count.projects) return NextResponse.json({ error: 'Categories with projects cannot be deleted.' }, { status: 409 }); await prisma.category.delete({ where: { id } }); return NextResponse.json({ success: true }); }
