export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getBranding } from '@/lib/settings';

export async function GET() {
  return NextResponse.json(await getBranding());
}
