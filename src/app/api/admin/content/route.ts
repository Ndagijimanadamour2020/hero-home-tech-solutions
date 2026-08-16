export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';

const models: Record<string, any> = { solutions: prisma.solution, industries: prisma.industry, demos: prisma.demo, caseStudies: prisma.caseStudy, leads: prisma.lead };
const listFields = new Set(['features', 'benefits', 'useCases', 'technologies', 'impact']);
function clean(data: Record<string, any>) { return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, listFields.has(key) && typeof value === 'string' ? value.split('\n').map(v => v.trim()).filter(Boolean) : value === '' ? null : value])); }
function modelFor(request: Request) { return models[new URL(request.url).searchParams.get('type') || '']; }
export async function GET(request: Request) { if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const model = modelFor(request); return model ? NextResponse.json(await model.findMany({ orderBy: { createdAt: 'desc' } })) : NextResponse.json({ error: 'Unknown content type' }, { status: 400 }); }
export async function POST(request: Request) { if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const model = modelFor(request); if (!model) return NextResponse.json({ error: 'Unknown content type' }, { status: 400 }); const { id, ...data } = clean(await request.json()); return NextResponse.json(await model.create({ data }), { status: 201 }); }
export async function PATCH(request: Request) { if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const model = modelFor(request); const { id, ...data } = clean(await request.json()); if (!model || !id) return NextResponse.json({ error: 'id and valid type required' }, { status: 400 }); return NextResponse.json(await model.update({ where: { id }, data })); }
export async function DELETE(request: Request) { if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const model = modelFor(request); const id = new URL(request.url).searchParams.get('id'); if (!model || !id) return NextResponse.json({ error: 'id and valid type required' }, { status: 400 }); await model.delete({ where: { id } }); return NextResponse.json({ success: true }); }
