'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300
      border-gray-100 bg-white/80
      data-[theme=warm]:border-amber-100 data-[theme=warm]:bg-amber-50/80
      data-[theme=cool]:border-slate-200 data-[theme=cool]:bg-slate-50/80
      data-[theme=paper]:border-stone-200 data-[theme=paper]:bg-stone-100/80
      data-[theme=night]:border-zinc-800 data-[theme=night]:bg-zinc-900/80"
    >
      <nav className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-semibold transition-colors hover:opacity-70"
          >
            My Blog
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              About
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
