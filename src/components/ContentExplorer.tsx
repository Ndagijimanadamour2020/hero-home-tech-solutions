'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, PlayCircle, Sparkles } from 'lucide-react';

type Content = { solutions: any[]; industries: any[]; demos: any[]; caseStudies: any[] };

export default function ContentExplorer() {
  const [content, setContent] = useState<Content | null>(null);
  useEffect(() => { fetch('/api/content').then(r => r.ok ? r.json() : null).then(setContent).catch(() => undefined); }, []);
  if (!content) return <section id="solutions" className="py-24 bg-slate-900/50 border-y border-slate-800"><div className="max-w-7xl mx-auto px-4 text-center text-slate-400">Loading our latest solutions…</div></section>;
  return <>
    <section id="solutions" className="py-24 bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="max-w-3xl mb-12"><p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Built for measurable growth</p><h2 className="text-3xl sm:text-4xl font-bold text-white">Solutions shaped around your business</h2><p className="text-slate-400 mt-4">From a first workflow to a full digital platform, we solve the bottleneck before we write the code.</p></div>
      <div className="grid md:grid-cols-3 gap-6">{content.solutions.map(solution => <article key={solution.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-7 flex flex-col"><Sparkles className="w-6 h-6 text-blue-400 mb-5"/><h3 className="text-xl font-bold text-white">{solution.title}</h3><p className="text-blue-300 text-sm mt-2">{solution.tagline}</p><p className="text-slate-400 text-sm mt-4 flex-1">{solution.problem}</p><Link href={`/solutions/${solution.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-300">Explore solution <ArrowRight className="w-4 h-4"/></Link></article>)}</div>
      {content.industries.length > 0 && <div className="mt-14"><p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-4">Industries we support</p><div className="flex gap-3 flex-wrap">{content.industries.map(industry => <span key={industry.id} className="px-4 py-2 rounded-full border border-slate-700 bg-slate-950 text-sm text-slate-300">{industry.name}</span>)}</div></div>}</div>
    </section>
    <section id="demos" className="py-24 bg-slate-950"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex items-end justify-between gap-6 mb-10"><div><p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Proof before commitment</p><h2 className="text-3xl font-bold text-white">Product demos & case studies</h2></div></div><div className="grid md:grid-cols-2 gap-6">{content.caseStudies.map(item => <article key={item.id} className="rounded-2xl border border-slate-800 p-7 bg-slate-900/50"><p className="text-xs font-bold text-blue-400">{item.clientName}</p><h3 className="text-xl font-bold text-white mt-2">{item.title}</h3><p className="text-sm text-slate-400 mt-3">{item.challenge}</p><div className="mt-5 flex flex-wrap gap-2">{item.technologies.map((tech: string) => <span key={tech} className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded">{tech}</span>)}</div><div className="mt-5 text-sm text-emerald-400 flex gap-2"><CheckCircle2 className="w-4 h-4"/>{item.impact[0]}</div></article>)}{content.demos.map(item => <article key={item.id} className="rounded-2xl border border-slate-800 p-7 bg-slate-900/50"><PlayCircle className="text-indigo-400"/><h3 className="text-xl font-bold text-white mt-4">{item.title}</h3><p className="text-sm text-slate-400 mt-3">{item.description}</p>{item.demoUrl ? <a href={item.demoUrl} target="_blank" className="text-blue-400 text-sm mt-5 inline-block">Open demo →</a> : <span className="text-slate-500 text-sm mt-5 inline-block">Demo coming soon</span>}</article>)}</div></div></section>
  </>;
}
