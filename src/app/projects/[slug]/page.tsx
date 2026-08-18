export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { projectPrice } from '@/lib/project';

interface Props {
  params: { slug: string };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <span className="text-sm font-semibold uppercase text-blue-400">
          {project.category?.name || 'Unassigned Category'}
        </span>
        <h1 className="text-4xl font-extrabold mt-2">
          {project.title}
        </h1>
        <p className="text-emerald-400 text-xl font-semibold mt-4">
          {projectPrice(project)}
        </p>

        <div className="mt-8 space-y-6 text-slate-300">
          {project.problem && (
            <div>
              <h2 className="text-xl font-bold text-white">The Challenge</h2>
              <p className="mt-2">{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <h2 className="text-xl font-bold text-white">The Solution</h2>
              <p className="mt-2">{project.solution}</p>
            </div>
          )}

          {project.benefits && (
            <div>
              <h2 className="text-xl font-bold text-white">Key Benefits</h2>
              <p className="mt-2">{project.benefits}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}