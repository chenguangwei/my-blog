import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM dd, yyyy');
  } catch (error) {
    return dateString;
  }
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export const siteConfig = {
  name: 'My Personal Blog',
  description: 'A minimalist blog about technology, design, and life',
  url: 'https://yourdomain.com',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    avatar: '/images/avatar.svg',
    bio: 'Software engineer, designer, and writer. Passionate about creating beautiful and functional digital experiences.',
  },
  social: {
    twitter: '@yourusername',
    github: 'yourusername',
  },
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'zh', 'jp'],
};

