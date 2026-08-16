export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { eventName, page = '/', meta } = await request.json();
    if (!eventName || typeof eventName !== 'string') return NextResponse.json({ error: 'eventName is required' }, { status: 400 });
    await prisma.analyticsEvent.create({ data: { eventName: eventName.slice(0, 100), page: String(page).slice(0, 255), meta: meta ?? undefined } });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch { return NextResponse.json({ success: false }, { status: 202 }); }
}
