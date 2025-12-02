# My Personal Blog

A minimalist, elegant personal blog built with Next.js 14, Tailwind CSS, and Markdown. Inspired by Apple and Notion's clean design aesthetics.

## ✨ Features

- **Modern Stack**: Built with Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS
- **Markdown Content**: Write articles in Markdown with YAML frontmatter
- **SEO Optimized**: Complete metadata, OpenGraph, Twitter Cards, and structured data
- **Multi-language Support**: GEO optimization with language-specific routes
- **RSS Feed**: Automatic RSS feed generation
- **Sitemap**: Dynamic sitemap.xml generation
- **Syntax Highlighting**: Beautiful code blocks with syntax highlighting
- **Table of Contents**: Auto-generated TOC for articles
- **Responsive Design**: Mobile-first, works perfectly on all devices
- **Performance**: Optimized images, fonts, and assets
- **Paper-like Design**: Subtle shadows and clean white aesthetic

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download this repository**

```bash
cd my-blog
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Add your avatar image**

Place your avatar image at `public/images/avatar.jpg`

4. **Configure site settings**

Edit `lib/utils.ts` to update your personal information:

```typescript
export const siteConfig = {
  name: 'Your Blog Name',
  description: 'Your blog description',
  url: 'https://yourdomain.com',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    avatar: '/images/avatar.jpg',
    bio: 'Your bio here',
  },
  social: {
    twitter: '@yourusername',
    github: 'yourusername',
  },
};
```

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Writing Articles

### Create a New Article

1. Create a new `.md` file in the `content/` directory
2. Add frontmatter at the top of the file:

```markdown
---
title: "Your Article Title"
date: "2024-01-15"
excerpt: "A brief description of your article"
tags: ["tag1", "tag2"]
language: "en"
author: "Your Name"
---

## Your Content Here

Write your article content in Markdown...
```

### Frontmatter Fields

- **title** (required): Article title
- **date** (required): Publication date in YYYY-MM-DD format
- **excerpt** (required): Short description for article cards and SEO
- **tags** (optional): Array of tags
- **language** (optional): Language code (en, zh, jp)
- **author** (optional): Author name
- **image** (optional): Featured image URL

### Markdown Features

The blog supports:

- Headings (H1-H6)
- Bold, italic, strikethrough
- Lists (ordered and unordered)
- Links and images
- Code blocks with syntax highlighting
- Tables
- Blockquotes
- Horizontal rules

### Code Blocks

Use fenced code blocks with language specification:

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

## 🎨 Customizing Styles

### Tailwind Configuration

Edit `tailwind.config.js` to customize:

- Colors
- Fonts
- Shadows
- Typography styles

### Global Styles

Edit `app/globals.css` to customize:

- Base styles
- Component classes
- Syntax highlighting colors

### Component Styles

Each component in `components/` can be customized individually.

## 📁 Project Structure

```
my-blog/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   ├── blog/
│   │   ├── page.tsx         # Blog list page
│   │   └── [slug]/
│   │       └── page.tsx     # Article detail page
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── sitemap.ts           # Sitemap generation
│   ├── robots.ts            # Robots.txt
│   └── feed.xml/
│       └── route.ts         # RSS feed
├── components/              # React components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── ArticleCard.tsx     # Article preview card
│   └── TableOfContents.tsx # TOC sidebar
├── lib/                     # Utility functions
│   ├── markdown.ts         # Markdown processing
│   └── utils.ts            # Helper functions & config
├── content/                 # Markdown articles
│   ├── hello-world.md
│   └── ...
├── public/                  # Static assets
│   └── images/
│       └── avatar.jpg
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy to Vercel**

- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel will automatically detect Next.js and configure settings
- Click "Deploy"

3. **Configure custom domain** (optional)

- Go to your project settings in Vercel
- Add your custom domain
- Update DNS records as instructed

### Environment Variables

If you need environment variables:

1. Create `.env.local` for local development
2. Add variables in Vercel dashboard under Settings → Environment Variables

### Build Command

The default build command is:

```bash
npm run build
```

## 🔧 Advanced Configuration

### Adding More Languages

1. Update `supportedLanguages` in `lib/utils.ts`
2. Create language-specific routes in `app/[lang]/`
3. Update metadata alternates in `app/layout.tsx`

### Custom Domain

Update the `url` in `lib/utils.ts` to match your domain:

```typescript
url: 'https://yourdomain.com',
```

### Analytics

Add analytics by including the script in `app/layout.tsx`:

```typescript
<Script src="your-analytics-script" />
```

### Comments

To add comments, integrate services like:

- [Giscus](https://giscus.app/) (GitHub Discussions)
- [Utterances](https://utteranc.es/) (GitHub Issues)
- [Disqus](https://disqus.com/)

## 📊 SEO Features

- ✅ Dynamic metadata for each page
- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD)
- ✅ Automatic sitemap.xml
- ✅ RSS feed
- ✅ Robots.txt
- ✅ Semantic HTML
- ✅ Multi-language support (hreflang)
- ✅ Image optimization
- ✅ Performance optimizations

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Pages

Create a new folder in `app/` with a `page.tsx` file:

```typescript
// app/contact/page.tsx
export default function ContactPage() {
  return <div>Contact Page</div>;
}
```

### Modifying Components

All components are in the `components/` directory and can be freely modified.

## 📦 Dependencies

### Core

- **Next.js 14**: React framework
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

### Markdown Processing

- **gray-matter**: Parse frontmatter
- **unified**: Markdown processor
- **remark**: Markdown parser
- **rehype**: HTML processor
- **rehype-highlight**: Syntax highlighting

### Utilities

- **date-fns**: Date formatting

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📄 License

MIT License - feel free to use this project for your personal blog.

## 🙏 Acknowledgments

- Design inspired by Apple and Notion
- Built with Next.js and Tailwind CSS
- Syntax highlighting by highlight.js

## 📮 Support

If you have questions or need help:

1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Visit [Tailwind CSS Documentation](https://tailwindcss.com/docs)
3. Open an issue on GitHub

---

**Happy blogging! 🎉**

