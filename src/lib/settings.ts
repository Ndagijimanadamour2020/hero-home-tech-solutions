import { prisma } from '@/lib/prisma';

export interface Branding {
  siteName: string;
  tagline: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  adminAvatarUrl: string | null;
}

export const defaultBranding: Branding = {
  siteName: 'Hero Home Tech Solutions',
  tagline: 'Enterprise Software & AI Partner',
  logoUrl: null,
  faviconUrl: null,
  adminAvatarUrl: null,
};

export const SETTINGS_ID = 'global';

export async function getBranding(): Promise<Branding> {
  try {
    const settings = await prisma.systemSettings.findUnique({ where: { id: SETTINGS_ID } });
    if (!settings) return defaultBranding;

    return {
      siteName: settings.siteName || defaultBranding.siteName,
      tagline: settings.tagline ?? defaultBranding.tagline,
      logoUrl: settings.logoUrl,
      faviconUrl: settings.faviconUrl,
      adminAvatarUrl: settings.adminAvatarUrl,
    };
  } catch {
    // The database may be unreachable during build or cold start.
    return defaultBranding;
  }
}
