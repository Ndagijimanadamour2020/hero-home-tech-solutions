export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { projectPrice } from '@/lib/project';

export default async function FeaturedProjects() {
  const projects = await prisma.project.findMany({
    where: { status: 'PUBLISHED', featured: true },
    include: { category: true },
    orderBy: { displayOrder: 'asc' },
    take: 3,
  });

  if (!projects.length) return null;

  return (
    <section className="border-t border-slate-800 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Featured Projects
            </p>
            <h2 className="mt-1 text-3xl font-bold text-white">
              Solutions ready to deploy
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-semibold text-blue-400 hover:underline"
          >
            View all projects &rarr;
          </Link>
        </div>

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
                    alt={p.projectName || p.title || 'Project preview'}
                    className="h-44 w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-xs font-semibold text-blue-400">
                    {p.category?.name || 'General Project'}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {p.projectName || p.title}
                  </h3>
                  {(p.shortDescription || p.projectProblem || p.problem) && (
                    <p className="mt-3 text-sm text-slate-400 line-clamp-3">
                      {p.shortDescription || p.projectProblem || p.problem}
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
      </div>
    </section>
  );
}