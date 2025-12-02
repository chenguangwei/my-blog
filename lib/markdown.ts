import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ArticleMeta {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  language?: string;
  author?: string;
  image?: string;
}

export interface Article {
  slug: string;
  meta: ArticleMeta;
  content: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

// Get all article slugs
export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      meta: data as ArticleMeta,
      content,
    };
  } catch (error) {
    return null;
  }
}

// Get all articles sorted by date
export function getAllArticles(): Article[] {
  const slugs = getAllArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      const dateA = new Date(a.meta.date);
      const dateB = new Date(b.meta.date);
      return dateB.getTime() - dateA.getTime();
    });

  return articles;
}

// Convert markdown to HTML with video and raw HTML support
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // 允许原生 HTML
    .use(rehypeRaw) // 解析原生 HTML 标签（包括 video, iframe 等）
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['anchor'],
      },
    })
    .use(rehypeHighlight, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}

// Generate slug matching rehype-slug algorithm (GitHub style)
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    // 移除 markdown 链接语法 [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 移除 HTML 标签
    .replace(/<[^>]+>/g, '')
    // 移除特殊字符，但保留中文、日文、韩文等 Unicode 字符
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    // 将空格替换为连字符
    .replace(/\s+/g, '-')
    // 移除开头和结尾的连字符
    .replace(/^-+|-+$/g, '')
    // 移除连续的连字符
    .replace(/-+/g, '-');
}

// Extract table of contents from markdown
export function extractTOC(markdown: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  const slugCounts: Record<string, number> = {};
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    let id = generateSlug(text);

    // 处理重复的 slug（添加数字后缀）
    if (slugCounts[id] !== undefined) {
      slugCounts[id]++;
      id = `${id}-${slugCounts[id]}`;
    } else {
      slugCounts[id] = 0;
    }

    toc.push({ id, text, level });
  }

  return toc;
}

// Get latest articles
export function getLatestArticles(count: number = 6): Article[] {
  const articles = getAllArticles();
  return articles.slice(0, count);
}
