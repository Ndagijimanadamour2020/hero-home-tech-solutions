import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import AssessmentForm from '@/components/AssessmentForm';
import Testimonials from '@/components/Testimonials';
import ContentExplorer from '@/components/ContentExplorer';
import { Cpu, Check, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <ContentExplorer />
      <Portfolio />
      
      {/* About Section */}
      <section id="about" className="py-24 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Enterprise Positioning</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                More Than Code: Your Strategic Digital Partner
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Hero Home Tech Solutions was established to bridge the gap between complex modern technologies and tangible business growth. We do not just deliver standard websites; we engineer strategic digital infrastructures that drive efficiency, lower overheads, and scale client revenue.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Full-Stack Capability</h4>
                    <p className="text-xs text-slate-400">From modern Next.js/React frontends to resilient PostgreSQL/Node backends.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 mt-1">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Automated AI Integration</h4>
                    <p className="text-xs text-slate-400">Embedding real-world intelligent automation to optimize operational speed.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 mt-1">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Regional & International Integration</h4>
                    <p className="text-xs text-slate-400">Specialized experience in local Mobile Money (Paypack, IremboPay) and global payments (Stripe).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative">
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-3xl font-extrabold text-blue-400 mb-1">100%</div>
                  <div className="text-sm font-semibold text-white">Focus on Business ROI</div>
                  <p className="text-xs text-slate-400 mt-1">Every application, API, and workflow is designed to solve concrete operational bottlenecks.</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-3xl font-extrabold text-indigo-400 mb-1">Modern Stack</div>
                  <div className="text-sm font-semibold text-white">Next.js 14, TypeScript, Tailwind, Node</div>
                  <p className="text-xs text-slate-400 mt-1">Built with high-tier tech standards for high speed, reliability, and security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <AssessmentForm />
    </div>
  );
}
