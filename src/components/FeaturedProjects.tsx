import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { projectPrice } from '@/lib/project';

export default async function FeaturedProjects() {
  const projects = await prisma.project.findMany({
    where: { status: 'PUBLISHED' },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  return (
    <section className="py-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {p.category?.name || 'General Project'}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  {p.projectName || p.title || 'Untitled Project'}
                </h3>
                <p className="text-slate-400 text-sm mt-2 line-clamp-3">
                  {p.projectProblem || p.description || 'No description provided.'}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-emerald-400 font-semibold">
                  {projectPrice(p)}
                </span>
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-sm font-medium text-blue-400 hover:underline"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}