export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { isAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  // Check if current route is a public authentication page
  const isAuthPage =
    pathname === '/admin/login' ||
    pathname.startsWith('/admin/forgot-password') ||
    pathname.startsWith('/admin/reset-password');

  // Render auth pages directly without the admin sidebar or redirect logic
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Protect all other admin dashboard routes
  const authenticated = await isAdmin();
  if (!authenticated) {
    redirect('/admin/login');
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Projects Management', href: '/admin/projects' },
    { label: 'Sections & Content', href: '/admin/sections' },
    { label: 'Digital Assessments', href: '/admin/assessments' },
    { label: 'System Settings', href: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col justify-between p-4">
        <div>
          <div className="px-3 py-4 text-xs font-bold uppercase tracking-wider text-blue-400">
            Hero Tech Admin
          </div>
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="w-full rounded-lg bg-rose-500/10 px-3 py-2 text-left text-sm font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors"
          >
            Sign out
          </button>
        </form>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}