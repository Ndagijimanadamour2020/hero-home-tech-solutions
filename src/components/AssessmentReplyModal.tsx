'use client';
import { useState } from 'react';

export default function AssessmentReplyModal({ lead, onClose }: { lead: any; onClose: () => void }) {
  const [replyMessage, setReplyMessage] = useState('');
  const [sending, setSending] = useState(false);

  if (!lead) return null;

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const res = await fetch('/api/admin/assessments/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: lead.id, email: lead.email, message: replyMessage }),
    });

    setSending(false);
    if (res.ok) {
      alert('Response sent successfully!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white">Reply to {lead.name}</h2>
        <p className="mb-4 text-xs text-slate-400">Target Email: {lead.email}</p>
        <form onSubmit={handleSendReply} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400">Assessment Request</label>
            <p className="rounded-lg bg-slate-800 p-3 text-sm text-slate-300">{lead.request}</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400">Your Response</label>
            <textarea
              required
              rows={4}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Write your feedback or pricing proposal..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-500 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Assessment Response'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}