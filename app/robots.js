import { SITE_URL as SITE } from '@/lib/site';

// Generates /robots.txt at build time (static export).
// Explicitly allows AI search crawlers so the blog can be cited in AI answers,
// while blocking the training-only Common Crawl bot.
export const dynamic = 'force-static';

const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'Google-Extended',
  'Bingbot',
  'Applebot-Extended',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
