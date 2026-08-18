'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBranding } from '@/components/BrandingProvider';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { siteName, logoUrl, adminAvatarUrl } = useBranding();

  const navItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Projects Management', href: '/admin/projects' },
    { label: 'Categories', href: '/admin/categories' },
    { label: 'Digital Assessments', href: '/admin/assessments' },
    { label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-8 flex items-center gap-3 px-2">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoUrl} alt={siteName} className="h-10 w-10 rounded-lg bg-slate-900 object-contain p-1" />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            {siteName.charAt(0)}
          </span>
        )}
        <span className="text-sm font-bold uppercase tracking-wide text-blue-400">{siteName}</span>
      </div>

      {adminAvatarUrl && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={adminAvatarUrl} alt="Administrator" className="h-9 w-9 rounded-full object-cover" />
          <span className="text-xs font-semibold text-slate-300">Signed in as administrator</span>
        </div>
      )}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              pathname === item.href
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <form action="/api/admin/logout" method="POST" className="pt-4 border-t border-slate-800">
        <button
          type="submit"
          className="w-full rounded-lg bg-red-900/30 px-4 py-2 text-left text-sm font-medium text-red-400 hover:bg-red-900/50"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}