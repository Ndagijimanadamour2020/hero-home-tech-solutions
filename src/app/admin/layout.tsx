import { isAdmin } from '@/lib/auth';
import AdminSidebar from '@/components/AdminSidebar';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdmin();

  // Allow rendering the login page without wrapping it in the admin sidebar wrapper
  return (
    <div className="flex min-h-screen bg-gray-100">
      {authenticated && <AdminSidebar />}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}