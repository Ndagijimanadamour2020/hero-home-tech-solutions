'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/admin/Modal';

interface Assessment {
  id: string;
  customerName: string;
  contact: string;
  message: string;
  reply?: string;
  createdAt: string;
}

export default function AssessmentsPage() {
  const [items, setItems] = useState<Assessment[]>([]);
  const [selected, setSelected] = useState<Assessment | null>(null);
  const [replyText, setReplyText] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchItems = async () => {
    const res = await fetch('/api/admin/assessments');
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSendReply = async () => {
    if (!selected) return;
    await fetch(`/api/admin/assessments/${selected.id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: replyText }),
    });
    setSelected(null);
    setReplyText('');
    fetchItems();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/admin/assessments/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null);
    fetchItems();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Digital Assessments & Inquiries</h1>

      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs font-semibold uppercase text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Message</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500">
                  No records found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="p-4 font-medium text-white">{item.customerName}</td>
                  <td className="p-4">{item.contact}</td>
                  <td className="p-4 truncate max-w-xs">{item.message}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => { setSelected(item); setReplyText(item.reply || ''); }}
                      className="rounded-lg bg-blue-600/20 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-600/30"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="rounded-lg bg-rose-600/20 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-600/30"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reply Modal */}
      <Modal isOpen={!!selected} title="Reply to Assessment" onClose={() => setSelected(null)}>
        <div className="space-y-4">
          <p className="text-sm text-slate-400">Recipient: <span className="text-white">{selected?.contact}</span></p>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your official response..."
            className="w-full h-32 rounded-xl bg-slate-950 border border-slate-800 p-3 text-white focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleSendReply} className="w-full rounded-xl bg-blue-600 py-2.5 font-bold text-white hover:bg-blue-500">
            Send Reply
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteId} title="Confirm Deletion" onClose={() => setDeleteId(null)}>
        <div className="space-y-4">
          <p className="text-sm text-slate-300">Are you sure you want to delete this record?</p>
          <div className="flex justify-end space-x-3">
            <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
            <button onClick={handleDelete} className="px-4 py-2 rounded-xl bg-rose-600 font-bold text-white hover:bg-rose-500">Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}