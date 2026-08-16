import Link from 'next/link';
import { ArrowRight, ShieldCheck, Cpu, Globe, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-24 lg:py-32 border-b border-slate-800/80">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8 backdrop-blur-sm">
            <Cpu className="w-4 h-4" /> Enterprise Software & Technology Partner
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-8 leading-[1.15]">
            Architecting Scalable <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Software & AI Solutions</span> for Growth
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto font-normal">
            We build high-performance web applications, custom enterprise software, and integrated AI automation that streamline operations, digitize workflows, and accelerate business revenue across East Africa and globally.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base transition-all shadow-xl shadow-blue-600/30 hover:scale-[1.02]"
            >
              Get a Free Digital Assessment <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="#portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-base transition-all hover:border-slate-700"
            >
              Explore Solutions & Case Studies
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-800/80 text-left">
            <div className="flex items-center gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Full-Stack Security</h4>
                <p className="text-xs text-slate-400">Enterprise encryption & robust APIs</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
              <Globe className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Local & Global Focus</h4>
                <p className="text-xs text-slate-400">Mobile Money, Card, & Stripe integrations</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
              <Cpu className="w-6 h-6 text-indigo-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">AI-Driven Systems</h4>
                <p className="text-xs text-slate-400">Automated assistants & smart tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
