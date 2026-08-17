export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import { LeadStatus } from '@prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authenticated = await isAdmin();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const status: LeadStatus = body.status || LeadStatus.CONTACTED;

    const updatedLead = await prisma.lead.update({
      where: { id: params.id },
      data: {
        status,
      },
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error('Update Lead Error:', error);
    return NextResponse.json({ error: 'Failed to update lead status' }, { status: 500 });
  }
}