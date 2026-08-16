'use client';
import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function AssessmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'Web Application Development',
    projectOverview: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you! Your inquiry has been submitted successfully.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          serviceType: 'Web Application Development',
          projectOverview: ''
        });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <section id="assessment" className="py-24 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-slate-900/90 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Let's Collaborate</h2>
            <h3 className="text-3xl font-extrabold text-white mb-3">Get Your Free Digital Assessment</h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Share your project requirements or current technical roadblocks. Our team will review your business needs and provide a strategic technical roadmap within 24 hours.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Assessment Request Received!</h4>
              <p className="text-slate-300 text-sm">{message}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Jean Paul"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+250 78X XXX XXX"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Service Needed *</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none text-sm transition-all"
                >
                  <option value="Web Application Development">Custom Web Application Development</option>
                  <option value="Professional Website & E-commerce">Professional Website & E-commerce</option>
                  <option value="AI Solutions & Automation">AI Solutions & Workflow Automation</option>
                  <option value="Custom Business Systems (ERP/CRM/POS)">Custom Business Systems (ERP/CRM/POS)</option>
                  <option value="Digital Transformation & IT Advisory">Digital Transformation & IT Advisory</option>
                  <option value="Technical SEO & Performance Audit">Technical SEO & Performance Audit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Project Overview & Goals *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.projectOverview}
                  onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                  placeholder="Tell us about your project goals, timelines, and technical requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-blue-500 focus:outline-none text-sm transition-all resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing Request...
                  </>
                ) : (
                  <>
                    Submit Project Overview <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
