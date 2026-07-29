import { getAllPosts, getPost } from '@/lib/posts';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR } from '@/lib/site';

// Emits /feed.xml at build time (static export): a full-content RSS 2.0 feed
// so readers and aggregators can subscribe to the blog.
export const dynamic = 'force-static';

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cdata(value = '') {
  return `<![CDATA[${String(value).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

export async function GET() {
  const posts = getAllPosts();
  const withHtml = await Promise.all(
    posts.map(async (post) => ({ ...post, html: (await getPost(post.slug)).html }))
  );

  const lastBuildDate = new Date(
    posts[0]?.updated || posts[0]?.date || Date.now()
  ).toUTCString();

  const items = withHtml
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}/`;
      const pubDate = post.date ? new Date(post.date).toUTCString() : lastBuildDate;
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
${categories}
      <description>${cdata(post.excerpt)}</description>
      <content:encoded>${cdata(post.html)}</content:encoded>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <managingEditor>${escapeXml(AUTHOR.name)}</managingEditor>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
