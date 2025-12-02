import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getAllTags } from '@/lib/markdown';
import { siteConfig } from '@/lib/utils';

export const metadata: Metadata = {
  title: '分类',
  description: '按分类浏览所有文章',
  openGraph: {
    title: '分类',
    description: '按分类浏览所有文章',
    url: `${siteConfig.url}/categories`,
    type: 'website',
  },
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* 分类部分 */}
      <section className="mb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">分类</h1>
          <p className="text-lg opacity-70">
            按文件夹分类浏览文章
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="paper-card p-12 text-center">
            <p className="opacity-70">暂无分类</p>
            <p className="text-sm opacity-50 mt-2">
              在 content 目录下创建文件夹来添加分类
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="paper-card p-6 flex items-center justify-between group"
              >
                <div>
                  <h2 className="font-semibold group-hover:opacity-70 transition-opacity">
                    {category.name}
                  </h2>
                  <p className="text-sm opacity-50 mt-1">
                    {category.count} 篇文章
                  </p>
                </div>
                <svg 
                  className="w-5 h-5 opacity-30 group-hover:opacity-70 transition-opacity" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 标签部分 */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">标签</h2>
          <p className="opacity-70">
            按标签浏览文章
          </p>
        </div>

        {tags.length === 0 ? (
          <div className="paper-card p-12 text-center">
            <p className="opacity-70">暂无标签</p>
          </div>
        ) : (
          <div className="paper-card p-6">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/tags/${encodeURIComponent(tag.name)}`}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium 
                    bg-current/5 hover:bg-current/10 transition-colors"
                >
                  <span>{tag.name}</span>
                  <span className="ml-2 opacity-50">({tag.count})</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

