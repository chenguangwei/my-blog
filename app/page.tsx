import Image from 'next/image';
import Link from 'next/link';
import { getLatestArticles } from '@/lib/markdown';
import ArticleCard from '@/components/ArticleCard';
import { siteConfig } from '@/lib/utils';

export default function HomePage() {
  const latestArticles = getLatestArticles(6);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Hero Section */}
      <section className="mb-20 text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={siteConfig.author.avatar}
              alt={siteConfig.author.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          {siteConfig.author.name}
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
          {siteConfig.author.bio}
        </p>
        
        <div className="mt-6 flex items-center justify-center space-x-4">
          <a
            href={`https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Twitter
          </a>
          <span className="text-gray-300">·</span>
          <a
            href={`https://github.com/${siteConfig.social.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <span className="text-gray-300">·</span>
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Email
          </a>
        </div>
      </section>

      {/* Latest Articles */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            View all →
          </Link>
        </div>

        {latestArticles.length === 0 ? (
          <div className="paper-card p-12 text-center">
            <p className="text-gray-600">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

