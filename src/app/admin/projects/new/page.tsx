'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    projectName: '',
    projectProblem: '',
    projectSolution: '',
    projectBenefits: '',
    projectUrl: '',
    price: '',
    liveDemoUrl: '',
    images: '',
    projectZipUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
            <input name="projectName" required value={formData.projectName} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="e.g. AgriVision AI" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Price (RWF / USD)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="150000" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project Problem *</label>
          <textarea name="projectProblem" required rows={3} value={formData.projectProblem} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="Describe the problem this project solves..." />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project Solution *</label>
          <textarea name="projectSolution" required rows={3} value={formData.projectSolution} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="Explain the technical solution implemented..." />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project Benefits *</label>
          <textarea name="projectBenefits" required rows={3} value={formData.projectBenefits} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="List key business or technical benefits..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Project URL (Details Page)</label>
            <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="https://herohometechs.com/projects/agrivision" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-300">Live Demo URL</label>
            <input name="liveDemoUrl" value={formData.liveDemoUrl} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="https://demo.agrivision.rw" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project File URL (.zip Download)</label>
          <input name="projectZipUrl" value={formData.projectZipUrl} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" placeholder="https://res.cloudinary.com/your-cloud/raw/upload/project.zip" />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-300">Project Images (At least 5 URLs, one per line for 3D Carousel)</label>
          <textarea name="images" rows={5} value={formData.images} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none font-mono text-xs" placeholder="https://example.com/img1.jpg&#10;https://example.com/img2.jpg&#10;https://example.com/img3.jpg&#10;https://example.com/img4.jpg&#10;https://example.com/img5.jpg" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50">
          {loading ? 'Saving Project...' : 'Save Project'}
        </button>
      </form>
    </div>
  );
}