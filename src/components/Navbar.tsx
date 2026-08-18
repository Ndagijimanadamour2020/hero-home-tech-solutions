'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Instantly hide top navbar on any admin route
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <BrandLogo />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="#services" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              Services
            </Link>
            <Link href="#solutions" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              Solutions
            </Link>
            <Link href="/projects" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              Products
            </Link>
            <Link href="#about" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              About
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
              Testimonials
            </Link>
            <Link 
              href="#assessment" 
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-blue-500/25"
            >
              Free Digital Assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="space-y-3 border-b border-slate-800 bg-slate-900 px-4 pb-6 pt-2 md:hidden">
          <Link 
            href="#services" 
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Services
          </Link>
          <Link 
            href="#solutions" 
            onClick={() => setIsOpen(false)} 
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Solutions
          </Link>
          <Link 
            href="#portfolio" 
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Portfolio
          </Link>
          <Link 
            href="#about" 
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            About
          </Link>
          <Link 
            href="#testimonials" 
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Testimonials
          </Link>
          <Link 
            href="#assessment" 
            onClick={() => setIsOpen(false)}
            className="mt-4 block w-full rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white"
          >
            Free Digital Assessment
          </Link>
        </div>
      )}
    </nav>
  );
}