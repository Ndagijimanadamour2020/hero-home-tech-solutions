'use client';

import { useRef, useState } from 'react';
import { useBranding } from '@/components/BrandingProvider';
import { uploadFiles } from '@/lib/client-upload';
import type { Branding } from '@/lib/settings';

type ImageField = 'logoUrl' | 'faviconUrl' | 'adminAvatarUrl';

const IMAGE_FIELDS: { field: ImageField; label: string; hint: string; rounded: string }[] = [
  { field: 'logoUrl', label: 'System logo', hint: 'Shown in the navbar, footer and admin sidebar.', rounded: 'rounded-xl' },
  { field: 'faviconUrl', label: 'Site favicon', hint: 'Square PNG or ICO used for the browser tab.', rounded: 'rounded-lg' },
  { field: 'adminAvatarUrl', label: 'Admin profile picture', hint: 'Displayed in the admin sidebar.', rounded: 'rounded-full' },
];

function UploadButton({
  onFile,
  disabled,
}: {
  onFile: (file: File) => void;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
      >
        Upload
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = '';
        }}
      />
    </>
  );
}

export default function SettingsForm({ branding }: { branding: Branding }) {
  const { refreshBranding } = useBranding();
  const [values, setValues] = useState<Branding>(branding);
  const [busyField, setBusyField] = useState<ImageField | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async (field: ImageField, file: File) => {
    setError('');
    setMessage('');
    setBusyField(field);
    try {
      const [url] = await uploadFiles([file], 'image');
      setValues((current) => ({ ...current, [field]: url || null }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setBusyField(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSaving(true);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to save settings.');

      await refreshBranding();
      setMessage('Settings saved. Branding updated across the site.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="mt-6 max-w-3xl space-y-6">
      {error && <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">{error}</p>}
      {message && <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">{message}</p>}

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="font-bold text-white">Site identity</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">Site name</label>
            <input
              value={values.siteName}
              onChange={(e) => setValues({ ...values, siteName: e.target.value })}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-300">Tagline</label>
            <input
              value={values.tagline || ''}
              onChange={(e) => setValues({ ...values, tagline: e.target.value })}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="font-bold text-white">Branding assets</h2>
        {IMAGE_FIELDS.map(({ field, label, hint, rounded }) => (
          <div key={field} className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className={`grid h-16 w-16 shrink-0 place-items-center overflow-hidden border border-slate-800 bg-slate-900 ${rounded}`}>
              {values[field] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={values[field] as string} alt={label} className="h-full w-full object-contain" />
              ) : (
                <span className="text-xs text-slate-600">None</span>
              )}
            </div>
            <div className="min-w-[12rem] flex-1">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-slate-500">{hint}</p>
            </div>
            <div className="flex items-center gap-2">
              <UploadButton disabled={busyField !== null} onFile={(file) => void handleUpload(field, file)} />
              {values[field] && (
                <button
                  type="button"
                  onClick={() => setValues({ ...values, [field]: null })}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-rose-400"
                >
                  Remove
                </button>
              )}
              {busyField === field && <span className="text-xs text-slate-400">Uploading...</span>}
            </div>
          </div>
        ))}
      </section>

      <button
        type="submit"
        disabled={saving || busyField !== null}
        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save settings'}
      </button>
    </form>
  );
}
