import { getAllPosts } from '@/lib/posts';
import { SITE_URL as SITE } from '@/lib/site';

// Emits /llms.txt at build time (static export) following the llmstxt.org
// convention, so AI systems can discover and cite the blog's content.
export const dynamic = 'force-static';

export function GET() {
  const posts = getAllPosts();

  const lines = [
    '# The Brian Journal',
    '',
    '> Personal blog by Brian Castelino with long-form, technical writing on data, AI, agentic systems, Databricks and the lakehouse, developer tooling, and building software in the open.',
    '',
    'Author: Brian Castelino (https://www.linkedin.com/in/cas7elino/). Posts are editorial-style deep dives, build logs, and field notes on shipping software. Everything is freely readable with no paywall.',
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
    `- [Topics](${SITE}/topics/): Browse all posts by topic.`,
    `- [About](${SITE}/about/): About Brian Castelino and this blog.`,
    `- [Writing](${SITE}/writing/): How posts are written and what the Markdown setup supports.`,
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
