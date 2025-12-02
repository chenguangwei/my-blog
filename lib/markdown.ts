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
  category?: string;
  language?: string;
  author?: string;
  image?: string;
}

export interface Article {
  slug: string;
  category: string | null;
  meta: ArticleMeta;
  content: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  description?: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

// 递归获取所有 markdown 文件
function getAllMarkdownFiles(dir: string, baseDir: string = dir): { filePath: string; category: string | null }[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files: { filePath: string; category: string | null }[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      // 递归处理子目录
      const subFiles = getAllMarkdownFiles(fullPath, baseDir);
      files.push(...subFiles);
    } else if (item.isFile() && item.name.endsWith('.md')) {
      // 计算相对于 content 目录的分类路径
      const relativePath = path.relative(baseDir, dir);
      const category = relativePath === '' ? null : relativePath;
      files.push({ filePath: fullPath, category });
    }
  }

  return files;
}

// 从文件路径生成 slug
function generateSlugFromPath(filePath: string, category: string | null): string {
  const fileName = path.basename(filePath, '.md');
  if (category) {
    return `${category}/${fileName}`;
  }
  return fileName;
}

// Get all article slugs with categories
export function getAllArticleSlugs(): string[] {
  const files = getAllMarkdownFiles(contentDirectory);
  return files.map(({ filePath, category }) => generateSlugFromPath(filePath, category));
}

// Get article by slug (supports nested paths like "tech/my-article" or "2024/01/my-article")
export function getArticleBySlug(slug: string): Article | null {
  try {
    // 尝试直接路径
    let fullPath = path.join(contentDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      // 如果不存在，尝试在所有子目录中查找
      const files = getAllMarkdownFiles(contentDirectory);
      const found = files.find(({ filePath, category }) => {
        const fileSlug = generateSlugFromPath(filePath, category);
        return fileSlug === slug || path.basename(filePath, '.md') === slug;
      });
      
      if (found) {
        fullPath = found.filePath;
      } else {
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 从路径中提取分类
    const relativePath = path.relative(contentDirectory, fullPath);
    const pathParts = relativePath.split(path.sep);
    const category = pathParts.length > 1 ? pathParts.slice(0, -1).join('/') : null;
    
    // 如果 frontmatter 中没有 category，使用文件夹名作为分类
    const meta = data as ArticleMeta;
    if (!meta.category && category) {
      meta.category = category;
    }

    return {
      slug,
      category,
      meta,
      content,
    };
  } catch (error) {
    return null;
  }
}

// Get all articles sorted by date
export function getAllArticles(): Article[] {
  const files = getAllMarkdownFiles(contentDirectory);
  const articles = files
    .map(({ filePath, category }) => {
      const slug = generateSlugFromPath(filePath, category);
      return getArticleBySlug(slug);
    })
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      const dateA = new Date(a.meta.date);
      const dateB = new Date(b.meta.date);
      return dateB.getTime() - dateA.getTime();
    });

  return articles;
}

// Get all categories with article counts
export function getAllCategories(): Category[] {
  const articles = getAllArticles();
  const categoryMap = new Map<string, number>();

  // 统计每个分类的文章数
  articles.forEach((article) => {
    const category = article.category || article.meta.category;
    if (category) {
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    }
  });

  // 转换为数组并排序
  const categories: Category[] = Array.from(categoryMap.entries()).map(([name, count]) => ({
    name: formatCategoryName(name),
    slug: name,
    count,
  }));

  // 按文章数量降序排序
  categories.sort((a, b) => b.count - a.count);

  return categories;
}

// 格式化分类名称（将路径转换为可读名称）
function formatCategoryName(slug: string): string {
  // 处理年月格式 (2024/01 -> 2024年01月)
  if (/^\d{4}\/\d{2}$/.test(slug)) {
    const [year, month] = slug.split('/');
    return `${year}年${month}月`;
  }
  
  // 处理年份格式 (2024 -> 2024年)
  if (/^\d{4}$/.test(slug)) {
    return `${slug}年`;
  }

  // 其他情况：将路径分隔符替换为 " / "，首字母大写
  return slug
    .split('/')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' / ');
}

// Get articles by category
export function getArticlesByCategory(categorySlug: string): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) => {
    const category = article.category || article.meta.category;
    return category === categorySlug || category?.startsWith(categorySlug + '/');
  });
}

// Get articles by tag
export function getArticlesByTag(tag: string): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) => 
    article.meta.tags?.includes(tag)
  );
}

// Get all unique tags
export function getAllTags(): { name: string; count: number }[] {
  const articles = getAllArticles();
  const tagMap = new Map<string, number>();

  articles.forEach((article) => {
    article.meta.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  const tags = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return tags;
}

// Get articles grouped by year-month
export function getArticlesGroupedByDate(): { yearMonth: string; articles: Article[] }[] {
  const articles = getAllArticles();
  const grouped = new Map<string, Article[]>();

  articles.forEach((article) => {
    const date = new Date(article.meta.date);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!grouped.has(yearMonth)) {
      grouped.set(yearMonth, []);
    }
    grouped.get(yearMonth)!.push(article);
  });

  return Array.from(grouped.entries())
    .map(([yearMonth, articles]) => ({ yearMonth, articles }))
    .sort((a, b) => b.yearMonth.localeCompare(a.yearMonth));
}

// Convert markdown to HTML with video and raw HTML support
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
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
function generateHeadingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
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
    let id = generateHeadingSlug(text);

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
