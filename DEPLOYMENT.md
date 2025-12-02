# Deployment Guide

This guide will help you deploy your blog to Vercel in minutes.

## Prerequisites

- A GitHub account
- A Vercel account (free tier is sufficient)
- Your blog repository pushed to GitHub

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure all your changes are committed and pushed:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In" with GitHub
3. Authorize Vercel to access your GitHub account

### 3. Import Your Project

1. Click "New Project" or "Add New..."
2. Select "Project"
3. Find your blog repository in the list
4. Click "Import"

### 4. Configure Project

Vercel will automatically detect Next.js. The default settings should work:

- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 5. Environment Variables (Optional)

If you need environment variables:

1. Click "Environment Variables"
2. Add your variables:
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: Your domain (e.g., `https://yourblog.com`)
3. Click "Add"

### 6. Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 1-2 minutes)
3. Your site is now live! 🎉

## Custom Domain Setup

### Add Your Domain

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Click "Add"
4. Enter your domain name
5. Click "Add"

### Configure DNS

Vercel will provide DNS instructions. Typically:

#### For Root Domain (example.com)

Add an A record:
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

#### For www Subdomain

Add a CNAME record:
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

### Wait for DNS Propagation

DNS changes can take up to 48 hours, but usually complete within a few hours.

## Automatic Deployments

Every time you push to your main branch, Vercel will automatically:

1. Build your site
2. Run checks
3. Deploy if successful
4. Update your live site

### Preview Deployments

Every pull request gets its own preview URL for testing before merging.

## Performance Optimization

### Enable Analytics

1. Go to your project dashboard
2. Click "Analytics"
3. Enable Vercel Analytics (free tier available)

### Configure Caching

Vercel automatically caches static assets. For custom caching:

```typescript
// In your API routes or pages
export const revalidate = 3600; // Revalidate every hour
```

### Image Optimization

Vercel automatically optimizes images served through `next/image`.

## Monitoring

### View Deployment Logs

1. Go to your project dashboard
2. Click on any deployment
3. View build logs and runtime logs

### Check Performance

1. Go to "Analytics" tab
2. View Core Web Vitals
3. Monitor page load times

## Troubleshooting

### Build Fails

**Check the build logs:**
1. Click on the failed deployment
2. Review the error messages
3. Fix issues locally and push again

**Common issues:**
- Missing dependencies in `package.json`
- TypeScript errors
- Missing environment variables

### 404 Errors

**For dynamic routes:**
- Ensure `generateStaticParams` is implemented
- Check that content files exist

### Slow Build Times

**Optimize your build:**
- Use `output: 'standalone'` in `next.config.js`
- Minimize dependencies
- Use caching strategies

## Advanced Configuration

### Custom Build Command

Edit `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install --legacy-peer-deps"
}
```

### Redirects

Add redirects in `next.config.js`:

```javascript
async redirects() {
  return [
    {
      source: '/old-blog/:slug',
      destination: '/blog/:slug',
      permanent: true,
    },
  ]
}
```

### Headers

Add custom headers in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ]
}
```

## Updating Your Site

### Add New Content

1. Create a new `.md` file in `content/`
2. Commit and push:
   ```bash
   git add content/new-article.md
   git commit -m "Add new article"
   git push
   ```
3. Vercel automatically deploys the update

### Update Configuration

1. Edit `lib/utils.ts` or other config files
2. Commit and push
3. Vercel rebuilds and deploys

## Rollback

If something goes wrong:

1. Go to your project dashboard
2. Click "Deployments"
3. Find a previous successful deployment
4. Click "..." → "Promote to Production"

## Cost

Vercel's free tier includes:

- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Preview deployments

For most personal blogs, the free tier is sufficient.

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Your blog is now live! Share it with the world! 🚀**

