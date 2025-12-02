import { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.author.name}`,
  openGraph: {
    title: 'About',
    description: `Learn more about ${siteConfig.author.name}`,
    url: `${siteConfig.url}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="paper-card p-8 md:p-12">
        <div className="mb-8 flex justify-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={siteConfig.author.avatar}
              alt={siteConfig.author.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <h1 className="mb-6 text-center text-4xl font-bold text-gray-900">
          About Me
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-600 leading-relaxed">
            {siteConfig.author.bio}
          </p>

          <h2>What I Do</h2>
          <p>
            I'm a software engineer and designer passionate about creating
            beautiful, functional digital experiences. I specialize in web
            development, with a focus on modern JavaScript frameworks and
            design systems.
          </p>

          <h2>This Blog</h2>
          <p>
            This blog is where I share my thoughts on technology, design, and
            life. I write about things I'm learning, projects I'm working on,
            and ideas I find interesting.
          </p>

          <h2>Get in Touch</h2>
          <p>
            Feel free to reach out if you'd like to connect. You can find me on{' '}
            <a
              href={`https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            ,{' '}
            <a
              href={`https://github.com/${siteConfig.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            , or send me an{' '}
            <a href={`mailto:${siteConfig.author.email}`}>email</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

