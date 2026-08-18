'use client';

import { Cpu } from 'lucide-react';
import { useBranding } from '@/components/BrandingProvider';

interface Props {
  size?: 'sm' | 'md';
  showTagline?: boolean;
}

export default function BrandLogo({ size = 'md', showTagline = true }: Props) {
  const { siteName, tagline, logoUrl } = useBranding();
  const boxClass = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';

  return (
    <span className="flex items-center gap-3">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={siteName}
          className={`${boxClass} rounded-xl object-contain bg-slate-900 p-1`}
        />
      ) : (
        <span
          className={`${boxClass} grid place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20`}
        >
          <Cpu className="h-5 w-5" />
        </span>
      )}
      <span>
        <span
          className={`block font-bold leading-none tracking-tight text-white ${
            size === 'sm' ? 'text-base' : 'text-xl'
          }`}
        >
          {siteName}
        </span>
        {showTagline && tagline && (
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
}
