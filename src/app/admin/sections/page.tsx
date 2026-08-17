// src/app/admin/sections/page.tsx

'use client';

import { useState, useEffect } from 'react';

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSections = async () => {
    const res = await fetch('/api/admin/sections');
    if (res.ok) {
      const data = await res.json();
      setSections(data);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleEdit = (section: any) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section content?')) return;
    const res = await fetch(`/api/admin/sections/${id}`, { method: 'DELETE' });
    if (res.ok) fetchSections();
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    const method = selectedSection ? 'PATCH' : 'POST';
    const endpoint = selectedSection
      ? `/api/admin/sections/${selectedSection.id}`
      : '/api/admin/sections';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchSections();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Public Sections Content (CMS)</h1>
          <p className="text-sm text-slate-400">
            Dynamically edit Services, Solutions, Portfolio, and About page content.
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedSection(null);
            setIsModalOpen(true);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          + Add Section Content
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950 text-xs font-semibold text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sections.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No custom section content configured yet.
                </td>
              </tr>
            ) : (
              sections.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4 font-bold text-blue-400">{item.type}</td>
                  <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                  <td className="px-6 py-4 max-w-sm truncate text-slate-400">{item.description}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300 font-medium">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              {selectedSection ? 'Edit Section' : 'Add Section'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Section Type</label>
                <select
                  name="type"
                  defaultValue={selectedSection?.type || 'SERVICES'}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
                >
                  <option value="SERVICES">SERVICES</option>
                  <option value="SOLUTIONS">SOLUTIONS</option>
                  <option value="PORTFOLIO">PORTFOLIO</option>
                  <option value="ABOUT">ABOUT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={selectedSection?.title || ''}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  defaultValue={selectedSection?.description || ''}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}