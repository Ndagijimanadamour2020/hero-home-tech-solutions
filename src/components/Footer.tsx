import Link from 'next/link';
import { Cpu, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-600 text-white">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">HERO HOME TECH</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Your trusted enterprise technology partner specializing in custom full-stack web platforms, AI solutions, and digital transformation.
            </p>
            <p className="text-xs text-slate-500">
              Kigali, Rwanda | East Africa & Global
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#services" className="hover:text-white transition-colors">Web Applications</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Custom Software & CRM</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">AI & Workflow Automation</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">E-Commerce Architecture</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Technical SEO</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#about" className="hover:text-white transition-colors">About Hero Home Tech</Link></li>
              <li><Link href="#portfolio" className="hover:text-white transition-colors">Featured Projects</Link></li>
              <li><Link href="#testimonials" className="hover:text-white transition-colors">Client Outcomes</Link></li>
              <li><Link href="#assessment" className="hover:text-white transition-colors">Request Digital Audit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Connect</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>info@herohometech.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Kigali, Rwanda</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="https://linkedin.com" target="_blank" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Hero Home Tech Solutions. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Engineered with Next.js, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
