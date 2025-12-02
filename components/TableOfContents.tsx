'use client';

import { useEffect, useState, useCallback } from 'react';
import { TOCItem } from '@/lib/markdown';

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -80% 0%', threshold: 0.1 }
    );

    // 延迟观察，确保 DOM 已经渲染
    const timer = setTimeout(() => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [items]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    const element = document.getElementById(id);
    if (element) {
      // 计算目标位置，考虑固定头部的高度
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // 更新 URL hash
      history.pushState(null, '', `#${id}`);
      
      // 更新激活状态
      setActiveId(id);
    }
  }, []);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="paper-card p-4">
        <h3 className="text-sm font-semibold mb-3">
          目录
        </h3>
        <ul className="space-y-1 text-sm max-h-[60vh] overflow-y-auto">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block py-1.5 px-2 rounded transition-all duration-200 ${
                  activeId === item.id
                    ? 'opacity-100 font-medium bg-current/5'
                    : 'opacity-60 hover:opacity-100 hover:bg-current/5'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
