import { getAllPosts } from '@/lib/posts';

// Generates /sitemap.xml at build time (static export).
export const dynamic = 'force-static';

const SITE = 'https://bcastelino.github.io/blogs';

export default function sitemap() {
  const now = new Date().toISOString();

  const postEntries = getAllPosts().map((post) => ({
    url: `${SITE}/blog/${post.slug}/`,
    lastModified: post.updated || post.date || now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/about/`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE}/writing/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ...postEntries,
  ];
}
