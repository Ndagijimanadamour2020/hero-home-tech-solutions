'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const username = form.get('username') as string;
    const password = form.get('password') as string;

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Force full refresh navigation to establish admin session middleware
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Invalid username or password.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 grid place-items-center px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md">
        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Hero Home Tech</p>
        <h1 className="text-3xl font-bold text-white mt-2">Admin sign in</h1>
        <p className="text-slate-400 text-sm mt-2">Manage your website and incoming leads.</p>

        <div className="mt-8 space-y-4">
          <div>
            <input
              required
              name="username"
              placeholder="Username"
              defaultValue="damour"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
            />
            <div className="flex justify-between items-center text-xs pt-2">
              <Link href="/admin/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-rose-500/10 p-3 text-sm text-rose-400 border border-rose-500/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </main>
  );
}