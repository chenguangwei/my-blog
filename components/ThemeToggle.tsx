'use client';

import { useState, useEffect } from 'react';

type Theme = 'white' | 'warm' | 'cool' | 'paper' | 'night';

interface ThemeConfig {
  name: string;
  bg: string;
  text: string;
  card: string;
  border: string;
  accent: string;
}

const themes: Record<Theme, ThemeConfig> = {
  white: {
    name: '纯白',
    bg: 'bg-white',
    text: 'text-gray-900',
    card: 'bg-white',
    border: 'border-gray-100',
    accent: 'bg-gray-50',
  },
  warm: {
    name: '暖光',
    bg: 'bg-amber-50/50',
    text: 'text-stone-900',
    card: 'bg-white/80',
    border: 'border-amber-100',
    accent: 'bg-amber-50',
  },
  cool: {
    name: '冷灰',
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    card: 'bg-white/90',
    border: 'border-slate-200',
    accent: 'bg-slate-100',
  },
  paper: {
    name: '纸张',
    bg: 'bg-stone-100/80',
    text: 'text-stone-800',
    card: 'bg-stone-50',
    border: 'border-stone-200',
    accent: 'bg-stone-100',
  },
  night: {
    name: '夜间',
    bg: 'bg-zinc-900',
    text: 'text-zinc-100',
    card: 'bg-zinc-800/90',
    border: 'border-zinc-700',
    accent: 'bg-zinc-800',
  },
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('white');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('blog-theme') as Theme;
    if (saved && themes[saved]) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('blog-theme', theme);
      
      // 更新 CSS 变量
      const root = document.documentElement;
      const config = themes[theme];
      
      // 移除所有主题类
      Object.values(themes).forEach(t => {
        root.classList.remove(t.bg, t.text);
      });
      
      // 添加当前主题类
      root.classList.add(config.bg, config.text);
      
      // 设置 data 属性用于 CSS 选择器
      root.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  return { theme, setTheme, themes, mounted };
}

export default function ThemeToggle() {
  const { theme, setTheme, themes, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
        style={{
          background: theme === 'night' 
            ? 'linear-gradient(135deg, #1e1e1e 0%, #3d3d3d 100%)' 
            : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        aria-label="切换主题"
        title="切换背景主题"
      >
        <svg 
          className={`w-4 h-4 transition-colors ${theme === 'night' ? 'text-amber-400' : 'text-gray-600'}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {theme === 'night' ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          )}
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[140px] py-2 rounded-xl shadow-lg border backdrop-blur-sm
            bg-white/95 border-gray-200 dark:bg-zinc-800/95 dark:border-zinc-700"
            style={{
              background: theme === 'night' ? 'rgba(39, 39, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: theme === 'night' ? 'rgba(63, 63, 70, 1)' : 'rgba(229, 231, 235, 1)',
            }}
          >
            <div className="px-3 py-1.5 text-xs font-medium opacity-60 uppercase tracking-wider"
              style={{ color: theme === 'night' ? '#a1a1aa' : '#6b7280' }}
            >
              选择主题
            </div>
            {(Object.keys(themes) as Theme[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setTheme(key);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm flex items-center gap-3 transition-colors
                  ${theme === key ? 'font-medium' : 'opacity-80 hover:opacity-100'}`}
                style={{
                  color: theme === 'night' ? '#e4e4e7' : '#374151',
                  backgroundColor: theme === key 
                    ? (theme === 'night' ? 'rgba(63, 63, 70, 0.5)' : 'rgba(243, 244, 246, 1)')
                    : 'transparent',
                }}
              >
                <span 
                  className="w-4 h-4 rounded-full border shadow-sm flex-shrink-0"
                  style={{
                    background: key === 'white' ? '#ffffff' 
                      : key === 'warm' ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
                      : key === 'cool' ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                      : key === 'paper' ? 'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)'
                      : 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
                    borderColor: key === 'night' ? '#3f3f46' : '#d1d5db',
                  }}
                />
                <span>{themes[key].name}</span>
                {theme === key && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

