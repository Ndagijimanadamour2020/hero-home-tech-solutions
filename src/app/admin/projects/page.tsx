export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { projectPrice } from '@/lib/project';

export default async function Projects() {
  if (!isAdmin()) redirect('/admin/login');

  const projects = await prisma.project.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="p-6 lg:p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Add Project
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="p-4">Project</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-slate-800 text-slate-300">
                <td className="p-4 font-semibold text-white">
                  {p.projectName || p.title || 'Untitled Project'}
                </td>
                <td className="p-4">{p.category?.name || 'Uncategorized'}</td>
                <td className="p-4">{projectPrice(p)}</td>
                <td className="p-4">{p.status}</td>
                <td className="p-4">{p.featured ? 'Yes' : 'No'}</td>
                <td className="p-4">
                  <Link href={`/projects/${p.slug}`} className="mr-3 text-blue-400 hover:underline">
                    View
                  </Link>
                  <Link href={`/admin/projects/${p.id}/edit`} className="text-blue-400 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!projects.length && (
          <p className="p-6 text-center text-slate-400">No projects found. Create your first project.</p>
        )}
      </div>
    </main>
  );
}