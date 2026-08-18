'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CategoryOption {
  id: string;
  name: string;
}

const CURRENCIES = ['RWF', 'USD', 'EUR'];

const inputClass =
  'w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none';

async function uploadFiles(files: File[], kind: 'image' | 'archive'): Promise<string[]> {
  const payload = new FormData();
  payload.append('kind', kind);
  files.forEach((file) => payload.append('files', file));

  const res = await fetch('/api/admin/upload', { method: 'POST', body: payload });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Upload failed.');
  }

  return Array.isArray(data.urls) ? data.urls : [];
}

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<'image' | 'archive' | null>(null);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [zipUrl, setZipUrl] = useState('');

  const [formData, setFormData] = useState({
    projectName: '',
    projectProblem: '',
    projectSolution: '',
    projectBenefits: '',
    projectUrl: '',
    price: '',
    currency: 'RWF',
    liveDemoUrl: '',
    categoryId: '',
  });

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setError('');
    setUploading('image');
    try {
      const urls = await uploadFiles(files, 'image');
      setImageUrls((current) => [...current, ...urls]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading('archive');
    try {
      const [url] = await uploadFiles([file], 'archive');
      setZipUrl(url || '');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, images: imageUrls, projectZipUrl: zipUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-xl text-slate-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">Add New Project</h1>

      {error && <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Project Name *</label>
            <input name="projectName" required value={formData.projectName} onChange={handleChange} className={inputClass} placeholder="e.g. AgriVision AI" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Category *</label>
            <select name="categoryId" required value={formData.categoryId} onChange={handleChange} className={inputClass}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Price</label>
            <div className="flex gap-2">
              <input type="number" min="0" step="0.01" name="price" value={formData.price} onChange={handleChange} className={inputClass} placeholder="150000" />
              <select name="currency" value={formData.currency} onChange={handleChange} className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none">
                {CURRENCIES.map((currency) => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project Problem *</label>
          <textarea name="projectProblem" required rows={3} value={formData.projectProblem} onChange={handleChange} className={inputClass} placeholder="Describe the problem this project solves..." />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project Solution *</label>
          <textarea name="projectSolution" required rows={3} value={formData.projectSolution} onChange={handleChange} className={inputClass} placeholder="Explain the technical solution implemented..." />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project Benefits *</label>
          <textarea name="projectBenefits" required rows={3} value={formData.projectBenefits} onChange={handleChange} className={inputClass} placeholder="List key business or technical benefits, one per line..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Project URL (Details Page)</label>
            <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} className={inputClass} placeholder="https://herohometechs.com/projects/agrivision" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Live Demo URL</label>
            <input name="liveDemoUrl" value={formData.liveDemoUrl} onChange={handleChange} className={inputClass} placeholder="https://demo.agrivision.rw" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project File (.zip Download)</label>
          <input type="file" accept=".zip,application/zip" onChange={handleZipUpload} disabled={uploading !== null} className="w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500 disabled:opacity-50" />
          {uploading === 'archive' && <p className="mt-2 text-xs text-slate-400">Uploading archive...</p>}
          {zipUrl && (
            <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
              <span className="truncate text-xs text-slate-300">{zipUrl}</span>
              <button type="button" onClick={() => setZipUrl('')} className="text-xs font-semibold text-rose-400 hover:underline">Remove</button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project Images (select multiple for the 3D carousel)</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading !== null} className="w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500 disabled:opacity-50" />
          {uploading === 'image' && <p className="mt-2 text-xs text-slate-400">Uploading images...</p>}
          {imageUrls.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              {imageUrls.map((url) => (
                <div key={url} className="relative overflow-hidden rounded-lg border border-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Uploaded project preview" className="h-24 w-full object-cover" />
                  <button type="button" onClick={() => setImageUrls((current) => current.filter((item) => item !== url))} className="absolute right-1 top-1 rounded bg-slate-950/80 px-2 py-1 text-xs font-semibold text-rose-400">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={loading || uploading !== null} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50">
          {loading ? 'Saving Project...' : 'Save Project'}
        </button>
      </form>
    </div>
  );
}
