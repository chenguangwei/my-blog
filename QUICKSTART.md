# Quick Start Guide

Get your blog up and running in 5 minutes!

## 🚀 Installation

```bash
# Navigate to your project directory
cd my-blog

# Install dependencies
npm install
```

## ⚙️ Configuration

### 1. Update Site Information

Edit `lib/utils.ts`:

```typescript
export const siteConfig = {
  name: 'Your Blog Name',              // Your blog title
  description: 'Your description',      // Blog description
  url: 'https://yourdomain.com',       // Your domain
  author: {
    name: 'Your Name',                 // Your name
    email: 'your@email.com',           // Your email
    avatar: '/images/avatar.svg',      // Your avatar
    bio: 'Your bio here',              // Short bio
  },
  social: {
    twitter: '@yourusername',          // Twitter handle
    github: 'yourusername',            // GitHub username
  },
};
```

### 2. Add Your Avatar

Replace `public/images/avatar.svg` with your own image:
- Recommended size: 400x400px
- Supported formats: JPG, PNG, SVG
- Rename your file to `avatar.jpg` or `avatar.png`
- Update the path in `lib/utils.ts` if needed

## 📝 Create Your First Article

1. Create a new file in the `content/` directory:

```bash
touch content/my-first-post.md
```

2. Add frontmatter and content:

```markdown
---
title: "My First Post"
date: "2024-01-15"
excerpt: "This is my first blog post!"
tags: ["introduction"]
language: "en"
---

## Hello World

This is my first blog post. Welcome to my blog!

### What's Next?

I'll be writing about:
- Technology
- Design
- Life

Stay tuned!
```

3. Save the file

## 🏃 Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ Checklist

Before deploying, make sure you've:

- [ ] Updated site information in `lib/utils.ts`
- [ ] Added your avatar image
- [ ] Created at least one article
- [ ] Tested the site locally
- [ ] Checked all pages load correctly
- [ ] Verified responsive design on mobile

## 🌐 Deploy to Vercel

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)

3. Click "New Project"

4. Import your repository

5. Click "Deploy"

Done! Your blog is now live! 🎉

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
- See [CONTRIBUTING.md](CONTRIBUTING.md) for customization guide

## 🆘 Need Help?

Common issues:

**Port already in use:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Module not found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Build fails:**
```bash
# Check for TypeScript errors
npm run lint
```

## 🎯 Quick Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linter
```

---

**Happy blogging! 🎉**

Need more help? Check the [full documentation](README.md).

