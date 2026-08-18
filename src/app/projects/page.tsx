export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { ExternalLink, PackageCheck } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { projectPrice, safeUrl } from '@/lib/project';
import { PRODUCT_PILLARS, matchesPillar } from '@/lib/product-pillars';

export default async function Products() {
  const projects = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true },
    orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }],
  });

  const pillarCounts = PRODUCT_PILLARS.map((pillar) => ({
    pillar,
    count: projects.filter((project) => matchesPillar(pillar, project)).length,
  }));

  return (
    <section className="min-h-screen bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Reusable Products</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold text-white">
          Production-ready systems you can buy today and deploy this week
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Every product below ships with a live demo, screenshots and an instant download after payment — pay
          securely with MTN Mobile Money in RWF, USD or EUR.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillarCounts.map(({ pillar, count }) => (
            <div key={pillar.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <PackageCheck className="h-6 w-6 text-blue-400" />
              <h2 className="mt-3 text-lg font-bold text-white">{pillar.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{pillar.description}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-blue-400">
                {count} {count === 1 ? 'product' : 'products'} available
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-bold text-white">All products</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {projects.map((p) => {
            const cover = p.image || p.images?.[0];
            const demo = safeUrl(p.liveDemoUrl);

            return (
              <article
                key={p.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:border-blue-500/50"
              >
                <div>
                  {cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cover} alt={p.title || 'Product preview'} className="h-44 w-full object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-blue-400">{p.category?.name || 'General Product'}</p>
                      {p.featured && (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-400">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-white">{p.title}</h3>
                    {(p.shortDescription || p.problem) && (
                      <p className="mt-3 line-clamp-3 text-sm text-slate-400">{p.shortDescription || p.problem}</p>
                    )}
                    {demo && (
                      <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/50 px-6 pb-6 pt-4">
                  <span className="font-semibold text-emerald-400">{projectPrice(p)}</span>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    View & Buy
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {!projects.length && <p className="mt-10 text-slate-400">No products published yet.</p>}
      </div>
    </section>
  );
}
