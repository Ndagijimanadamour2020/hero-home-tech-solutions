export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import AdminCMS from '@/components/AdminCMS';

export default async function AdminPage() {
  if (!isAdmin()) redirect('/admin/login');
  const [leads, publishedProjects, draftProjects, featuredProjects, recentLeads] = await Promise.all([prisma.lead.count(), prisma.project.count({ where: { status: 'PUBLISHED' } }), prisma.project.count({ where: { status: 'DRAFT' } }), prisma.project.count({ where: { featured: true, status: 'PUBLISHED' } }), prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 8 })]);
  const metrics = [['Total projects', publishedProjects], ['Draft projects', draftProjects], ['Featured projects', featuredProjects], ['Leads', leads]];
  return <main className="min-h-screen bg-slate-950 px-4 py-12"><div className="max-w-7xl mx-auto"><div className="flex justify-between items-center"><div><p className="text-xs uppercase font-bold tracking-widest text-blue-400">Admin CMS</p><h1 className="text-3xl font-bold text-white mt-2">Business pipeline & content</h1></div><form action="/api/admin/logout" method="post"><button className="text-sm text-slate-300 border border-slate-700 rounded-lg px-3 py-2">Sign out</button></form></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">{metrics.map(([label, value]) => <div key={label} className="rounded-xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-400">{label}</p><p className="text-3xl font-bold text-white mt-2">{value}</p></div>)}</div><section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6"><h2 className="text-xl font-bold text-white">Latest leads</h2><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-slate-500"><tr><th className="pb-3">Contact</th><th className="pb-3">Business</th><th className="pb-3">Request</th><th className="pb-3">Status</th></tr></thead><tbody>{recentLeads.map(lead => <tr key={lead.id} className="border-t border-slate-800 text-slate-300"><td className="py-3">{lead.name}<span className="block text-xs text-slate-500">{lead.email}</span></td><td>{lead.business}</td><td>{lead.type}</td><td><span className="text-blue-300">{lead.status}</span></td></tr>)}</tbody></table></div></section><AdminCMS /></div></main>;
}
