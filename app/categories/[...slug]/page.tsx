import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategories, getArticlesByCategory } from '@/lib/markdown';
import ArticleCard from '@/components/ArticleCard';
import { siteConfig } from '@/lib/utils';

interface CategoryPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug.split('/'),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categorySlug = slug.join('/');
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return {
      title: '分类未找到',
    };
  }

  return {
    title: `${category.name} - 分类`,
    description: `浏览 ${category.name} 分类下的所有文章`,
    openGraph: {
      title: `${category.name} - 分类`,
      description: `浏览 ${category.name} 分类下的所有文章`,
      url: `${siteConfig.url}/categories/${categorySlug}`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categorySlug = slug.join('/');
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(categorySlug);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* 面包屑导航 */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/categories" className="opacity-60 hover:opacity-100 transition-opacity">
              分类
            </Link>
          </li>
          {slug.map((part, index) => (
            <li key={part} className="flex items-center space-x-2">
              <span className="opacity-40">/</span>
              {index === slug.length - 1 ? (
                <span className="font-medium">{part}</span>
              ) : (
                <Link 
                  href={`/categories/${slug.slice(0, index + 1).join('/')}`}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                >
                  {part}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-lg opacity-70">
          共 {articles.length} 篇文章
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="paper-card p-12 text-center">
          <p className="opacity-70">该分类下暂无文章</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

