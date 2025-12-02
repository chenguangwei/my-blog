# Contributing Guide

Thank you for your interest in improving this blog! This guide will help you customize and extend the project.

## Getting Started

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my-blog/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utility functions
├── content/         # Markdown articles
├── public/          # Static assets
└── styles/          # Global styles
```

## Adding Features

### New Page

Create a new directory in `app/`:

```typescript
// app/projects/page.tsx
export default function ProjectsPage() {
  return (
    <div>
      <h1>My Projects</h1>
    </div>
  );
}
```

### New Component

Create a new file in `components/`:

```typescript
// components/Newsletter.tsx
export default function Newsletter() {
  return (
    <form>
      <input type="email" placeholder="Your email" />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

### New Utility Function

Add to `lib/utils.ts`:

```typescript
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
```

## Styling

### Tailwind Classes

Use Tailwind utility classes:

```tsx
<div className="mx-auto max-w-5xl px-6 py-16">
  <h1 className="text-4xl font-bold text-gray-900">Title</h1>
</div>
```

### Custom Styles

Add to `app/globals.css`:

```css
.custom-class {
  @apply bg-white rounded-lg shadow-paper;
}
```

### Theme Customization

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
    },
  },
}
```

## Content Management

### Article Frontmatter

Required fields:
- `title`: Article title
- `date`: Publication date (YYYY-MM-DD)
- `excerpt`: Short description

Optional fields:
- `tags`: Array of tags
- `language`: Language code
- `author`: Author name
- `image`: Featured image URL

### Markdown Syntax

Supported features:
- Headings (`#`, `##`, `###`)
- **Bold** and *italic*
- Lists and numbered lists
- Links `[text](url)`
- Images `![alt](url)`
- Code blocks with syntax highlighting
- Tables
- Blockquotes

## Testing

### Manual Testing

1. Test all pages load correctly
2. Check responsive design on mobile
3. Verify links work
4. Test article rendering
5. Check SEO metadata

### Build Testing

```bash
npm run build
npm run start
```

## Code Quality

### Linting

```bash
npm run lint
```

### TypeScript

Ensure no TypeScript errors:

```bash
npx tsc --noEmit
```

## Best Practices

### Components

- Keep components small and focused
- Use TypeScript interfaces for props
- Add proper accessibility attributes

### Performance

- Use `next/image` for images
- Implement proper caching
- Minimize client-side JavaScript

### SEO

- Add proper metadata to all pages
- Use semantic HTML
- Include alt text for images

## Common Tasks

### Change Site Name

Edit `lib/utils.ts`:

```typescript
export const siteConfig = {
  name: 'Your New Name',
  // ...
}
```

### Add Social Links

Edit `lib/utils.ts`:

```typescript
social: {
  twitter: '@newhandle',
  github: 'newusername',
  linkedin: 'newprofile',
}
```

### Customize Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#your-color',
}
```

### Add Analytics

Edit `app/layout.tsx`:

```tsx
<Script
  src="https://analytics.example.com/script.js"
  strategy="afterInteractive"
/>
```

## Troubleshooting

### Build Errors

**Module not found:**
- Check import paths
- Ensure file exists
- Verify case sensitivity

**TypeScript errors:**
- Check type definitions
- Add missing types
- Fix type mismatches

### Runtime Errors

**404 on article pages:**
- Check file exists in `content/`
- Verify frontmatter is valid
- Check slug matches filename

**Images not loading:**
- Verify image path
- Check file exists in `public/`
- Ensure proper image format

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Questions?

Feel free to open an issue or reach out for help!

Happy coding! 🎉

