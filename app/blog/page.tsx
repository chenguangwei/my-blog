import { Metadata } from 'next';
import { getAllArticles } from '@/lib/markdown';
import ArticleCard from '@/components/ArticleCard';
import { siteConfig } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest articles about technology, design, and more.',
  openGraph: {
    title: 'Blog',
    description: 'Read my latest articles about technology, design, and more.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
  },
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-lg text-gray-600">
          Thoughts, stories, and ideas about technology, design, and life.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="paper-card p-12 text-center">
          <p className="text-gray-600">No articles yet. Check back soon!</p>
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

