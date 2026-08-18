'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Branding } from '@/lib/settings';

interface BrandingContextValue extends Branding {
  refreshBranding: () => Promise<void>;
}

const BrandingContext = createContext<BrandingContextValue | null>(null);

export function BrandingProvider({
  initialBranding,
  children,
}: {
  initialBranding: Branding;
  children: React.ReactNode;
}) {
  const [branding, setBranding] = useState<Branding>(initialBranding);

  const refreshBranding = useCallback(async () => {
    try {
      const res = await fetch('/api/settings', { cache: 'no-store' });
      if (res.ok) setBranding(await res.json());
    } catch {
      // Keep the last known branding when the refresh fails.
    }
  }, []);

  const icon = branding.faviconUrl || branding.logoUrl;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const href = icon || '/favicon.ico';
    document
      .querySelectorAll<HTMLLinkElement>("link[rel='icon'], link[rel='shortcut icon']")
      .forEach((link) => link.remove());

    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = href;
    document.head.appendChild(link);
  }, [icon]);

  const value = useMemo(
    () => ({ ...branding, refreshBranding }),
    [branding, refreshBranding]
  );

  return <BrandingContext.Provider value={value}>{children}</BrandingContext.Provider>;
}

export function useBranding(): BrandingContextValue {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used inside a BrandingProvider.');
  }
  return context;
}
