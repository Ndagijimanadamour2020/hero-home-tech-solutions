'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Projects Management', href: '/admin/projects' },
    { label: 'Digital Assessments', href: '/admin/assessments' },
  ];

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-8 px-2 text-xl font-bold text-blue-400">HERO TECH ADMIN</div>
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