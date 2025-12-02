'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'white' | 'warm' | 'cool' | 'paper' | 'night';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('white');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('blog-theme') as Theme;
    if (saved && ['white', 'warm', 'cool', 'paper', 'night'].includes(saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('blog-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div 
        className={`min-h-screen transition-colors duration-300 ${
          theme === 'white' ? 'bg-white text-gray-900' :
          theme === 'warm' ? 'bg-amber-50/50 text-stone-900' :
          theme === 'cool' ? 'bg-slate-50 text-slate-900' :
          theme === 'paper' ? 'bg-stone-100/80 text-stone-800' :
          'bg-zinc-900 text-zinc-100'
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

