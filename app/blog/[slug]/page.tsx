import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllArticleSlugs,
  getArticleBySlug,
  markdownToHtml,
  extractTOC,
} from '@/lib/markdown';
import { formatDate, getReadingTime, siteConfig } from '@/lib/utils';
import TableOfContents from '@/components/TableOfContents';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const { meta } = article;
  const url = `${siteConfig.url}/blog/${slug}`;

  return {
    title: meta.title,
    description: meta.excerpt,
    authors: [{ name: meta.author || siteConfig.author.name }],
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      url,
      type: 'article',
      publishedTime: meta.date,
      authors: [meta.author || siteConfig.author.name],
      images: meta.image ? [{ url: meta.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.excerpt,
      creator: siteConfig.social.twitter,
      images: meta.image ? [meta.image] : [],
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${siteConfig.url}/en/blog/${slug}`,
        'zh': `${siteConfig.url}/zh/blog/${slug}`,
        'ja': `${siteConfig.url}/jp/blog/${slug}`,
      },
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { meta, content } = article;
  const htmlContent = await markdownToHtml(content);
  const toc = extractTOC(content);
  const readingTime = getReadingTime(content);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.excerpt,
    datePublished: meta.date,
    author: {
      '@type': 'Person',
      name: meta.author || siteConfig.author.name,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <article className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_250px]">
          {/* Main Content */}
          <div className="min-w-0">
            {/* Article Header */}
            <header className="mb-12">
              <div className="mb-4 flex items-center space-x-3 text-sm text-gray-600">
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                <span>·</span>
                <span>{readingTime} min read</span>
                {meta.language && (
                  <>
                    <span>·</span>
                    <span className="uppercase">{meta.language}</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 leading-tight md:text-5xl">
                {meta.title}
              </h1>

              {meta.tags && meta.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-600 bg-gray-50 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="paper-card p-8 md:p-12">
              <div
                className="prose prose-gray max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-gray-900 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-gray-900"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>

          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </article>
    </>
  );
}
