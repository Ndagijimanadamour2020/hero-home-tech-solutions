export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = await prisma.solution.findFirst({ where: { slug: params.slug, published: true }, include: { demos: { where: { published: true } }, caseStudies: { where: { published: true } } } });
  if (!solution) notFound();
  return <section className="py-24 bg-slate-950 min-h-screen"><div className="max-w-4xl mx-auto px-4"><Link href="/#solutions" className="text-sm text-blue-400">← All solutions</Link><p className="mt-10 text-xs uppercase tracking-widest font-bold text-blue-400">{solution.targetAudience}</p><h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white">{solution.title}</h1><p className="text-xl text-slate-300 mt-5">{solution.tagline}</p><div className="grid md:grid-cols-2 gap-8 mt-14"><div className="rounded-2xl bg-slate-900 p-7 border border-slate-800"><h2 className="font-bold text-white text-xl">The challenge</h2><p className="text-slate-400 mt-3 leading-relaxed">{solution.problem}</p></div><div className="rounded-2xl bg-slate-900 p-7 border border-slate-800"><h2 className="font-bold text-white text-xl">Our approach</h2><p className="text-slate-400 mt-3 leading-relaxed">{solution.solution}</p></div></div><div className="mt-12 grid sm:grid-cols-2 gap-8"><div><h2 className="text-xl font-bold text-white">What&apos;s included</h2><ul className="mt-4 space-y-2 text-slate-300">{solution.features.map(item => <li key={item}>• {item}</li>)}</ul></div><div><h2 className="text-xl font-bold text-white">Business benefits</h2><ul className="mt-4 space-y-2 text-slate-300">{solution.benefits.map(item => <li key={item}>• {item}</li>)}</ul></div></div><Link href="/#assessment" className="inline-block mt-14 px-6 py-3 rounded-xl bg-blue-600 font-bold text-white">Discuss your project</Link></div></section>;
}
