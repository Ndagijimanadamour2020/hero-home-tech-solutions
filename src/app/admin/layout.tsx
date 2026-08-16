import { isAdmin } from '@/lib/admin-auth';
import AdminSidebar from '@/components/AdminSidebar';
export default function AdminLayout({ children }: { children: React.ReactNode }) { return isAdmin() ? <div className="bg-slate-950 min-h-screen"><AdminSidebar /><div className="lg:ml-64">{children}</div></div> : children; }
