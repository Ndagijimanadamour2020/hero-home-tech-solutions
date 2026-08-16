export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';
import { safeUrl } from '@/lib/project';
const arrays = new Set(['technologies', 'features', 'gallery']);
function clean(body: Record<string, any>) { const data: Record<string, any> = {}; for (const [key, value] of Object.entries(body)) data[key] = arrays.has(key) && typeof value === 'string' ? value.split('\n').map(v => v.trim()).filter(Boolean) : value === '' ? null : value; if (data.price !== null && data.price !== undefined) data.price = Number(data.price); for (const field of ['liveDemoUrl', 'sourceCodeUrl', 'projectUrl']) if (data[field] && !safeUrl(data[field])) throw new Error(`Invalid ${field}`); return data; }
export async function PATCH(request: Request, { params }: { params: { id: string } }) { if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); try { return NextResponse.json(await prisma.project.update({ where: { id: params.id }, data: clean(await request.json()) as any })); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save project.' }, { status: 400 }); } }
export async function DELETE(_: Request, { params }: { params: { id: string } }) { if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); await prisma.project.delete({ where: { id: params.id } }); return NextResponse.json({ success: true }); }
