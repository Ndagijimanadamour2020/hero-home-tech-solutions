'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, Loader2, Smartphone, X } from 'lucide-react';

type Phase = 'form' | 'awaiting' | 'success' | 'failed';

interface Props {
  projectSlug: string;
  projectTitle: string;
  priceLabel: string;
  ctaLabel?: string;
}

export default function MomoPaymentModal({
  projectSlug,
  projectTitle,
  priceLabel,
  ctaLabel = 'Buy Now / Pay with MoMo',
}: Props) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>('form');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [reference, setReference] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  useEffect(() => stopPolling, []);

  useEffect(() => {
    if (phase !== 'awaiting' || !reference) return;

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/payments/momo?reference=${reference}`, { cache: 'no-store' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Unable to check the payment status.');

        if (data.status === 'SUCCESSFUL') {
          stopPolling();
          setDownloadUrl(data.downloadUrl || null);
          setPhase('success');
        } else if (data.status === 'FAILED') {
          stopPolling();
          setError(data.reason || 'The payment was declined or timed out.');
          setPhase('failed');
        }
      } catch (err) {
        stopPolling();
        setError(err instanceof Error ? err.message : 'Unable to check the payment status.');
        setPhase('failed');
      }
    }, 5000);

    return stopPolling;
  }, [phase, reference]);

  const reset = () => {
    stopPolling();
    setPhase('form');
    setReference('');
    setDownloadUrl(null);
    setError('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/payments/momo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectSlug, phoneNumber, customerName, customerEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unable to start the payment.');

      setReference(data.referenceId);
      setPhase('awaiting');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start the payment.');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:brightness-110"
      >
        <Smartphone className="h-4 w-4" />
        {ctaLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">MTN Mobile Money</p>
                <h2 className="mt-1 text-xl font-bold text-white">{projectTitle}</h2>
                <p className="text-sm text-slate-400">{priceLabel}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-slate-500 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-400">
                {error}
              </p>
            )}

            {phase === 'form' && (
              <form onSubmit={submit} className="mt-5 space-y-3">
                <input
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="MTN number e.g. 0788123456"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-amber-500"
                />
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-amber-500"
                />
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Email for the receipt (optional)"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-slate-950 hover:brightness-110"
                >
                  Send payment prompt
                </button>
                <p className="text-center text-xs text-slate-500">
                  You will receive a prompt on your phone. Enter your MoMo PIN to authorize.
                </p>
              </form>
            )}

            {phase === 'awaiting' && (
              <div className="mt-6 text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-amber-400" />
                <p className="mt-4 text-sm text-slate-300">
                  Check your phone and approve the payment with your MoMo PIN.
                </p>
                <p className="mt-2 text-xs text-slate-500">Reference: {reference}</p>
              </div>
            )}

            {phase === 'success' && (
              <div className="mt-6 text-center">
                <p className="text-sm font-semibold text-emerald-400">Payment confirmed. Thank you!</p>
                {downloadUrl ? (
                  <a
                    href={downloadUrl}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950"
                  >
                    <Download className="h-4 w-4" />
                    Download your files
                  </a>
                ) : (
                  <p className="mt-3 text-xs text-slate-400">
                    Our team will email your delivery files shortly.
                  </p>
                )}
              </div>
            )}

            {phase === 'failed' && (
              <button
                type="button"
                onClick={reset}
                className="mt-6 w-full rounded-xl border border-slate-700 py-3 text-sm font-semibold text-white"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
