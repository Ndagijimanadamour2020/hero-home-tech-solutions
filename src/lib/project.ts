import { PriceType } from '@prisma/client';

export function projectPrice(project: { price: { toString(): string } | null; currency: string; priceType: PriceType }) {
  if (project.priceType === 'CONTACT') return 'Contact us for pricing';
  if (project.priceType === 'FREE_DEMO') return 'Free demo';
  const amount = project.price ? Number(project.price.toString()).toLocaleString() : '—';
  return `${project.priceType === 'STARTING_FROM' ? 'Starting from ' : ''}${project.currency} ${amount}`;
}
export function safeUrl(value?: string | null) { if (!value) return null; try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null; } catch { return null; } }
