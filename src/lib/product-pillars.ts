export interface ProductPillar {
  title: string;
  description: string;
  keywords: string[];
}

/** Strategic reusable-product lines showcased on the public products pages. */
export const PRODUCT_PILLARS: ProductPillar[] = [
  {
    title: 'Inventory & Sales Management Systems',
    description:
      'Stock control, sales tracking, invoicing and reporting for retailers, wholesalers and distributors.',
    keywords: ['inventory', 'sales', 'stock', 'wholesale', 'retail'],
  },
  {
    title: 'Restaurant POS & Inventory Systems',
    description:
      'Table orders, kitchen tickets, menu and ingredient stock, plus daily revenue dashboards for hospitality.',
    keywords: ['restaurant', 'pos', 'hospitality', 'cafe', 'bar', 'menu'],
  },
  {
    title: 'Business Website Templates & Custom Web Apps',
    description:
      'Launch-ready company websites, booking portals and bespoke web applications tailored to your workflow.',
    keywords: ['website', 'web app', 'template', 'portal', 'landing', 'custom'],
  },
];

export function matchesPillar(
  pillar: ProductPillar,
  project: { title: string; shortDescription?: string | null; category?: { name: string } | null }
): boolean {
  const haystack = [project.title, project.shortDescription, project.category?.name]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return pillar.keywords.some((keyword) => haystack.includes(keyword));
}
