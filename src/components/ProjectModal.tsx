'use client';
import { useState } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: any;
}

export default function ProjectModal({ isOpen, onClose, onSuccess, project }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    price: project?.price || '',
    demoUrl: project?.demoUrl || '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = project ? 'PUT' : 'POST';
    const endpoint = project ? `/api/admin/projects/${project.id}` : '/api/admin/projects';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <h2 className="mb-4 text-xl font-bold text-white">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400">Description</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400">Price ($)</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400">Demo URL</label>
            <input
              type="url"
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}