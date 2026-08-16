'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Cpu, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none">
                HERO HOME TECH
              </span>
              <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
                Solutions
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#solutions" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Solutions
            </Link>
            <Link href="#portfolio" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              About
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link 
              href="#assessment" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:shadow-blue-500/25 transition-all"
            >
              Free Digital Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link 
            href="#services" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            Services
          </Link>
          <Link 
            href="#portfolio" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            Portfolio
          </Link>
          <Link href="#solutions" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg">
            Solutions
          </Link>
          <Link 
            href="#about" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            About
          </Link>
          <Link 
            href="#testimonials" 
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            Testimonials
          </Link>
          <Link 
            href="#assessment" 
            onClick={() => setIsOpen(false)}
            className="block w-full text-center mt-4 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold"
          >
            Free Digital Assessment
          </Link>
        </div>
      )}
    </nav>
  );
}
