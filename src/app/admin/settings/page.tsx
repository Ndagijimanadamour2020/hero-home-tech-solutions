export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { getBranding } from '@/lib/settings';
import SettingsForm from './SettingsForm';

export default async function Settings() {
  if (!(await isAdmin())) redirect('/admin/login');

  const branding = await getBranding();

  return (
    <main className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold text-white">Settings</h1>
      <p className="mt-2 text-sm text-slate-400">
        Branding updates apply instantly across the public site, the admin console and the browser tab icon.
      </p>
      <SettingsForm branding={branding} />
    </main>
  );
}
