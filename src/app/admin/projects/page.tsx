export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { projectPrice } from '@/lib/project';

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          + Add New Project
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/60 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3">Project Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-semibold text-white">
                  {p.projectName || p.title || 'Untitled Project'}
                </td>
                <td className="px-4 py-3 text-slate-400">
                  {p.category?.name || 'Unassigned'}
                </td>
                <td className="px-4 py-3 text-emerald-400 font-medium">
                  {projectPrice(p)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                      p.status === 'PUBLISHED'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {p.status || 'DRAFT'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="text-xs font-semibold text-blue-400 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!projects.length && (
          <div className="p-6 text-center text-slate-400">
            No projects created yet.
          </div>
        )}
      </div>
    </div>
  );
}