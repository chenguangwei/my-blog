'use client';

import Link from 'next/link';
import { Article } from '@/lib/markdown';
import { formatDate, getReadingTime } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const readingTime = getReadingTime(article.content);
  const category = article.category || article.meta.category;

  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="paper-card p-6 h-full flex flex-col cursor-pointer">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <time className="text-xs opacity-60 font-medium">
              {formatDate(article.meta.date)}
            </time>
            {category && (
              <>
                <span className="opacity-30">·</span>
                <span className="text-xs opacity-60">{category}</span>
              </>
            )}
          </div>
          
          <h2 className="text-xl font-semibold leading-tight hover:opacity-70 transition-opacity">
            {article.meta.title}
          </h2>
          
          <p className="mt-3 text-sm opacity-70 leading-relaxed line-clamp-3">
            {article.meta.excerpt}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {article.meta.tags && article.meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.meta.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-current/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <span className="text-xs opacity-50">
            {readingTime} min read
          </span>
        </div>
      </article>
    </Link>
  );
}
