// src/app/admin/page.tsx

export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  if (!isAdmin()) redirect('/admin/login');

  const [assessmentsCount, visitorEventsCount, pendingMessagesCount, recentMessages] = await Promise.all([
    prisma.lead.count({ where: { type: 'DIGITAL_ASSESSMENT' } }),
    prisma.analyticsEvent.count({ where: { eventName: 'PAGE_VIEW' } }),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.findMany({
      where: { status: 'NEW' },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Admin Console</p>
          <h1 className="text-3xl font-bold text-white mt-1">Dashboard Overview</h1>
        </div>
        <form action="/api/admin/logout" method="post">
          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
            Sign out
          </button>
        </form>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Customer Digital Assessments
          </p>
          <p className="mt-3 text-4xl font-extrabold text-blue-400">{assessmentsCount}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Website Visitors
          </p>
          <p className="mt-3 text-4xl font-extrabold text-emerald-400">{visitorEventsCount}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Messages Needing Reply
          </p>
          <p className="mt-3 text-4xl font-extrabold text-amber-400">{pendingMessagesCount}</p>
        </div>
      </div>

      {/* Customer Messages Table */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Pending Customer Inquiries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-slate-800 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">Message / Request</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentMessages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-500">
                    No unreplied messages found.
                  </td>
                </tr>
              ) : (
                recentMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-800/50">
                    <td className="py-4 font-medium text-white">{msg.name}</td>
                    <td className="py-4 text-xs">
                      <p>{msg.email}</p>
                      <p className="text-slate-400">{msg.phone}</p>
                    </td>
                    <td className="py-4 max-w-md truncate">{msg.message || msg.type}</td>
                    <td className="py-4 text-xs text-slate-400">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}