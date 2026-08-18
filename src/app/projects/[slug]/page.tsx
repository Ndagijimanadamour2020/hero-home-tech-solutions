export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { projectPrice, safeUrl } from '@/lib/project';
import ProjectRequestForm from '@/components/ProjectRequestForm';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = await prisma.project.findFirst({
    where: { slug: params.slug, status: 'PUBLISHED' },
  });
  if (!p) return { title: 'Project Not Found | Hero Home Tech Solutions' };
  return {
    title: `${p.projectName || p.title} | Hero Home Tech Solutions`,
    description: p.shortDescription || p.projectProblem || '',
  };
}

export default async function Project({ params }: { params: { slug: string } }) {
  const p = await prisma.project.findFirst({
    where: { slug: params.slug, status: 'PUBLISHED' },
    include: { category: true },
  });

  if (!p) notFound();

  const demo = safeUrl(p.liveDemoUrl);

  return (
    <main className="min-h-screen bg-slate-950 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-sm font-semibold text-blue-400">
          {p.category?.name || 'General Project'}
        </p>

        <h1 className="mt-2 text-4xl font-bold text-white">
          {p.projectName || p.title}
        </h1>

        {p.shortDescription && (
          <p className="mt-4 text-xl text-slate-300">{p.shortDescription}</p>
        )}

        <p className="mt-5 text-lg font-bold text-emerald-400">{projectPrice(p)}</p>

        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500"
          >
            Open Live Demo
          </a>
        )}

        {/* Dynamic Image Gallery */}
        {p.images && p.images.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {p.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Preview ${i + 1}`}
                className="h-48 w-full rounded-xl border border-slate-800 object-cover shadow-lg"
              />
            ))}
          </div>
        )}

        {/* Project Problem, Solution, Benefits Breakdown */}
        <div className="mt-12 space-y-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-slate-300">
          {(p.projectProblem || p.problem) && (
            <div>
              <h2 className="text-2xl font-bold text-white">The Challenge</h2>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed">
                {p.projectProblem || p.problem}
              </p>
            </div>
          )}

          {(p.projectSolution || p.solution) && (
            <div>
              <h2 className="text-2xl font-bold text-white">Our Solution</h2>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed">
                {p.projectSolution || p.solution}
              </p>
            </div>
          )}

          {(p.projectBenefits || p.benefits) && (
            <div>
              <h2 className="text-2xl font-bold text-white">Key Benefits</h2>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed">
                {p.projectBenefits || p.benefits}
              </p>
            </div>
          )}
        </div>

        {p.features && p.features.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">Features</h2>
            <ul className="mt-4 grid gap-2 text-slate-300 md:grid-cols-2">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-500">•</span> {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {p.technologies && p.technologies.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white">Technologies</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.technologies.map((t, i) => (
                <span
                  key={i}
                  className="rounded bg-slate-800 px-3 py-1 text-sm text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <ProjectRequestForm project={p} />
        </div>
      </div>
    </main>
  );
}