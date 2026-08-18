export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import { getBranding, SETTINGS_ID } from '@/lib/settings';

function optionalText(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  const text = String(value).trim();
  return text || null;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(await getBranding());
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const siteName = optionalText(body.siteName);
    const tagline = optionalText(body.tagline);
    const logoUrl = optionalText(body.logoUrl);
    const faviconUrl = optionalText(body.faviconUrl);
    const adminAvatarUrl = optionalText(body.adminAvatarUrl);

    const settings = await prisma.systemSettings.upsert({
      where: { id: SETTINGS_ID },
      create: {
        id: SETTINGS_ID,
        ...(siteName ? { siteName } : {}),
        tagline: tagline ?? null,
        logoUrl: logoUrl ?? null,
        faviconUrl: faviconUrl ?? null,
        adminAvatarUrl: adminAvatarUrl ?? null,
      },
      update: {
        ...(siteName ? { siteName } : {}),
        ...(tagline === undefined ? {} : { tagline }),
        ...(logoUrl === undefined ? {} : { logoUrl }),
        ...(faviconUrl === undefined ? {} : { faviconUrl }),
        ...(adminAvatarUrl === undefined ? {} : { adminAvatarUrl }),
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Unable to save system settings:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to save settings.' },
      { status: 500 }
    );
  }
}
