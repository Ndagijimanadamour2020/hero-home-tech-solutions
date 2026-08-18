export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { projectPrice } from '@/lib/project';

export default async function Projects() {
  const projects = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true },
    orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }],
  });

  return (
    <section className="min-h-screen bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
          Our Work
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">
          Projects built for real business growth
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 flex flex-col justify-between"
            >
              <div>
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title || 'Project preview'}
                    className="h-44 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-xs text-blue-400 font-semibold">
                    {p.category?.name || 'General Project'}
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-white">
                    {p.title}
                  </h2>
                  {(p.shortDescription || p.problem) && (
                    <p className="mt-3 text-sm text-slate-400 line-clamp-3">
                      {p.shortDescription || p.problem}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-800/50 flex items-center justify-between">
                <span className="font-semibold text-emerald-400">
                  {projectPrice(p)}
                </span>
                <Link
                  href={`/projects/${p.slug}`}
                  className="inline-block text-sm font-semibold text-blue-400 hover:underline"
                >
                  View Project &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

        {!projects.length && (
          <p className="mt-10 text-slate-400">No projects published yet.</p>
        )}
      </div>
    </section>
  );
}