import { getAllPosts } from '@/lib/posts';
import { SITE_URL as SITE } from '@/lib/site';

// Emits /llms.txt at build time (static export) following the llmstxt.org
// convention, so AI systems can discover and cite the blog's content.
export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPosts().filter((post) => !post.noindex);

  const lines = [
    '# The Brian Journal',
    '',
    '> Brian Castelino on Databricks, data engineering, and shipping LLM systems into production. Long-form, sourced, and honest about what broke.',
    '',
    'Author: Brian Castelino, AI Data Engineer at WorldLink US (https://www.linkedin.com/in/cas7elino/). Posts are first-hand, sourced deep dives on Databricks and the lakehouse, data and AI engineering, production LLM systems, and Power BI. Everything is freely readable with no paywall.',
    '',
    '## Posts',
    '',
    ...posts.map((post) => {
      const desc = post.excerpt ? `: ${post.excerpt}` : '';
      return `- [${post.title}](${SITE}/blog/${post.slug}/)${desc}`;
    }),
    '',
    '## Pages',
    '',
    `- [Archive](${SITE}/archive/): Every post in one list.`,
    `- [Topics](${SITE}/topics/): Browse all posts by topic.`,
    `- [About](${SITE}/about/): About Brian Castelino and this blog.`,
    '',
    '## Optional',
    '',
    `- [RSS feed](${SITE}/feed.xml): Full-content feed of all posts.`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
