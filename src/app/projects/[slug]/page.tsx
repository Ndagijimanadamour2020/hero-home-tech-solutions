export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { projectPrice, safeUrl } from '@/lib/project';
import ProjectGallery from '@/components/ProjectGallery';
import MomoPaymentModal from '@/components/MomoPaymentModal';

interface Props {
  params: { slug: string };
}

function toList(value?: string | null): string[] {
  return (value || '')
    .split(/\r?\n|•|;/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!project) {
    notFound();
  }

  const gallery = [project.image, ...(project.images || [])].filter(
    (url): url is string => Boolean(url)
  );
  const demoUrl = safeUrl(project.liveDemoUrl);
  const benefits = toList(project.benefits);
  const priceLabel = projectPrice(project);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/projects" className="text-sm text-slate-400 hover:text-white">
          &larr; All products
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr,1fr]">
          <div>
            <ProjectGallery images={gallery} title={project.title} />

            <div className="mt-10 space-y-8 text-slate-300">
              {project.problem && (
                <section>
                  <h2 className="text-xl font-bold text-white">The Challenge</h2>
                  <p className="mt-2 whitespace-pre-line">{project.problem}</p>
                </section>
              )}

              {project.solution && (
                <section>
                  <h2 className="text-xl font-bold text-white">The Solution</h2>
                  <p className="mt-2 whitespace-pre-line">{project.solution}</p>
                </section>
              )}

              {benefits.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white">Key Benefits</h2>
                  <ul className="mt-3 space-y-2">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.features?.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-white">What&apos;s included</h2>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:sticky lg:top-24">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              {project.category?.name || 'Unassigned Category'}
            </span>
            <h1 className="mt-2 text-3xl font-extrabold">{project.title}</h1>
            {project.shortDescription && (
              <p className="mt-3 text-sm text-slate-400">{project.shortDescription}</p>
            )}

            <p className="mt-6 text-3xl font-bold text-emerald-400">{priceLabel}</p>
            <p className="text-xs text-slate-500">One-time payment · instant download after confirmation</p>

            <div className="mt-6 space-y-3">
              {project.isPurchasable && project.price > 0 ? (
                <MomoPaymentModal
                  projectSlug={project.slug}
                  projectTitle={project.title}
                  priceLabel={priceLabel}
                  ctaLabel={`${project.paymentCta || 'Buy Now'} / Pay with MoMo`}
                />
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500"
                >
                  Request a quote
                </Link>
              )}

              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-white hover:border-blue-500"
                >
                  <ExternalLink className="h-4 w-4" /> View live demo
                </a>
              )}
            </div>

            {project.technologies?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
