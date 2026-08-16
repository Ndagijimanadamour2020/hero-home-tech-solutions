'use client';
import { useState } from 'react';
import { ExternalLink, Layers, CheckCircle } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "AgriVision AI Platform",
    category: "AI & SaaS",
    description: "An early-stage agricultural AI platform integrating intelligent crop management diagnostics and data analysis for farmers.",
    tech: ["Next.js", "TypeScript", "Python AI", "Tailwind CSS"],
    impact: "Automated diagnostics and real-time field insights"
  },
  {
    id: 2,
    title: "Enterprise Learning Platform",
    category: "Web Apps",
    description: "Full-stack Learning Management System tailored with card & Mobile Money multi-currency automated checkouts.",
    tech: ["Laravel", "IremboPay API", "MySQL", "Tailwind"],
    impact: "Seamless automated local payment processing"
  },
  {
    id: 3,
    title: "Ubuzima Hybrid Marketing E-Commerce",
    category: "E-Commerce",
    description: "Scalable e-commerce engine with real-time stock management and localized Mobile Money integration.",
    tech: ["Node.js", "React", "PostgreSQL", "Paypack API"],
    impact: "Streamlined order management and local payment conversion"
  },
  {
    id: 4,
    title: "Educational News & Resource Hub",
    category: "Web Apps",
    description: "High-traffic institutional portal optimized for speed, technical SEO, and rapid content publishing.",
    tech: ["PHP", "Bootstrap 5", "MySQL", "SEO Engine"],
    impact: "100% uptime with optimized search engine rank"
  }
];

const categories = ["All", "AI & SaaS", "Web Apps", "E-Commerce"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-slate-900/50 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Featured Case Studies</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Proven Technical Solutions
          </p>
          <p className="text-slate-400 text-lg">
            A selection of recent systems, platforms, and digital products engineered for clients.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-950 rounded-2xl p-8 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>
                
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    Key Business Outcome:
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{item.impact}</p>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                  {item.tech.map((t, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
