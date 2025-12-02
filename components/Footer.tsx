'use client';

import { siteConfig } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold mb-3">About</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Home
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  Blog
                </a>
              </li>
              <li>
                <a href="/feed.xml" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href={`https://github.com/${siteConfig.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${siteConfig.author.email}`}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-current/10">
          <p className="text-center text-sm opacity-60">
            © {currentYear} {siteConfig.author.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
