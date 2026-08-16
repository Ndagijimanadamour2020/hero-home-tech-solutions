import { Layout, Code2, Bot, RefreshCw, Search, Server, Wrench, Shield } from 'lucide-react';

const services = [
  {
    icon: Layout,
    title: "Professional Website Development",
    description: "High-converting corporate websites, bespoke landing pages, and scalable e-commerce solutions engineered for performance and maximum lead capture.",
    features: ["Next.js & React Frontend", "Mobile-first Responsive Design", "Lightning Speed Optimization"]
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "End-to-end management systems including ERPs, CRMs, inventory tracking, POS applications, and booking platforms customized for your business workflow.",
    features: ["Custom Dashboards & Analytics", "PostgreSQL / MySQL Integration", "Multi-role Access Control"]
  },
  {
    icon: Bot,
    title: "AI Solutions & Automation",
    description: "Transform operations with intelligent AI chatbots, automated document processing, custom LLM integrations, and workflow automation tools.",
    features: ["24/7 AI Customer Support Assistants", "Workflow & Process Automation", "Business Data AI Integration"]
  },
  {
    icon: RefreshCw,
    title: "Digital Transformation",
    description: "Strategic consulting and technical execution to transition paper-based or manual processes into secure, cloud-enabled digital systems.",
    features: ["Legacy Systems Migration", "Process Mapping & Modernization", "Employee Training & Onboarding"]
  },
  {
    icon: Search,
    title: "Technical SEO & Optimization",
    description: "Comprehensive SEO architecture, local search dominant positioning, speed optimization, and conversion rate optimization (CRO).",
    features: ["Search Engine Visibility Strategy", "Schema & Metadata Setup", "Core Web Vitals Perfection"]
  },
  {
    icon: Server,
    title: "Web Application & SaaS Development",
    description: "Robust full-stack web application engineering designed to scale effortlessly from early-stage products to high-volume SaaS platforms.",
    features: ["Node.js / Express / Laravel APIs", "Secure JWT & OAuth Authentication", "Localized & Global Payment Gateways"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Core Expertise</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white mb-4">
            End-to-End Technology Solutions Built for Impact
          </p>
          <p className="text-slate-400 text-lg">
            We partner with enterprises, growing companies, and organizations to deliver high-value technical execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>
              </div>

              <ul className="space-y-2 border-t border-slate-800/80 pt-4">
                {item.features.map((feat, fIdx) => (
                  <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
