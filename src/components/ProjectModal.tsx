// src/components/ProjectModal.tsx

'use client';

import { useState, useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: any;
}

export default function ProjectModal({ isOpen, onClose, onSuccess, project }: ProjectModalProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    problem: '',
    solution: '',
    benefits: '',
    price: '',
    liveDemoUrl: '',
    image1: '',
    image2: '',
    image3: '',
    downloadFolder: '',
    categoryId: '',
    status: 'PUBLISHED',
  });

  useEffect(() => {
    if (isOpen) {
      fetch('/api/admin/categories')
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
          if (!formData.categoryId && data.length > 0) {
            setFormData((prev) => ({ ...prev, categoryId: data[0].id }));
          }
        })
        .catch(() => {});

      if (project) {
        setFormData({
          title: project.title || '',
          slug: project.slug || '',
          problem: project.problem || '',
          solution: project.solution || '',
          benefits: project.benefits || '',
          price: project.price || '',
          liveDemoUrl: project.liveDemoUrl || '',
          image1: project.images?.[0] || '',
          image2: project.images?.[1] || '',
          image3: project.images?.[2] || '',
          downloadFolder: project.downloadFolder || '',
          categoryId: project.categoryId || '',
          status: project.status || 'PUBLISHED',
        });
      }
    }
  }, [isOpen, project]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const images = [formData.image1, formData.image2, formData.image3].filter(Boolean);

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      images,
      shortDescription: formData.problem.substring(0, 150),
      description: formData.solution,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    const method = project ? 'PATCH' : 'POST';
    const endpoint = project ? `/api/admin/projects/${project.id}` : '/api/admin/projects';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-3xl my-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Project Name</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Project Problem</label>
            <textarea
              required
              rows={3}
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Project Solution</label>
            <textarea
              required
              rows={3}
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Project Benefits</label>
            <textarea
              required
              rows={2}
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Live Demo URL</label>
            <input
              type="url"
              value={formData.liveDemoUrl}
              onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Project Category</label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Project Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            >
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="DRAFT">DRAFT</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Downloadable Project Folder Path/URL (Unlocked Post-Payment)
            </label>
            <input
              type="text"
              required
              placeholder="/downloads/projects/sample-project.zip"
              value={formData.downloadFolder}
              onChange={(e) => setFormData({ ...formData, downloadFolder: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-slate-400">
              Project Images (Minimum 3 images required for preview slider)
            </label>
            <input
              type="text"
              required
              placeholder="Image 1 URL"
              value={formData.image1}
              onChange={(e) => setFormData({ ...formData, image1: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
            <input
              type="text"
              required
              placeholder="Image 2 URL"
              value={formData.image2}
              onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
            <input
              type="text"
              required
              placeholder="Image 3 URL"
              value={formData.image3}
              onChange={(e) => setFormData({ ...formData, image3: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}