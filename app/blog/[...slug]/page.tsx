import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ 
    slug: slug.split('/') 
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const article = getArticleBySlug(slugPath);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const { meta } = article;
  const url = `${siteConfig.url}/blog/${slugPath}`;

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
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const article = getArticleBySlug(slugPath);

  if (!article) {
    notFound();
  }

  const { meta, content, category } = article;
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
            {/* Breadcrumb */}
            {category && (
              <nav className="mb-6 text-sm">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link href="/blog" className="opacity-60 hover:opacity-100 transition-opacity">
                      文章
                    </Link>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="opacity-40">/</span>
                    <Link 
                      href={`/categories/${category}`}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      {category}
                    </Link>
                  </li>
                </ol>
              </nav>
            )}

            {/* Article Header */}
            <header className="mb-12">
              <div className="mb-4 flex items-center flex-wrap gap-x-3 gap-y-1 text-sm opacity-70">
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                <span>·</span>
                <span>{readingTime} min read</span>
                {meta.language && (
                  <>
                    <span>·</span>
                    <span className="uppercase">{meta.language}</span>
                  </>
                )}
                {category && (
                  <>
                    <span>·</span>
                    <Link 
                      href={`/categories/${category}`}
                      className="hover:opacity-100 transition-opacity"
                    >
                      {category}
                    </Link>
                  </>
                )}
              </div>

              <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {meta.title}
              </h1>

              {meta.tags && meta.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {meta.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-current/5 hover:bg-current/10 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="paper-card p-6 md:p-8 lg:p-12">
              <div
                className="prose prose-gray max-w-none 
                  prose-headings:font-semibold 
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl 
                  prose-a:text-current prose-a:no-underline hover:prose-a:underline 
                  prose-img:rounded-lg 
                  prose-pre:bg-gray-900
                  prose-code:before:content-none prose-code:after:content-none"
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

