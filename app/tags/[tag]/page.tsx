import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getArticlesByTag } from '@/lib/markdown';
import ArticleCard from '@/components/ArticleCard';
import { siteConfig } from '@/lib/utils';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${decodedTag} - 标签`,
    description: `浏览标签 "${decodedTag}" 下的所有文章`,
    openGraph: {
      title: `${decodedTag} - 标签`,
      description: `浏览标签 "${decodedTag}" 下的所有文章`,
      url: `${siteConfig.url}/tags/${tag}`,
      type: 'website',
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const articles = getArticlesByTag(decodedTag);

  if (articles.length === 0) {
    notFound();
  }

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
          <li className="flex items-center space-x-2">
            <span className="opacity-40">/</span>
            <span className="font-medium">标签: {decodedTag}</span>
          </li>
        </ol>
      </nav>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">#</span>
          <h1 className="text-4xl font-bold">{decodedTag}</h1>
        </div>
        <p className="text-lg opacity-70">
          共 {articles.length} 篇文章
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

