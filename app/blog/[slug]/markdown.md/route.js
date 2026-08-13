import { getPostMarkdown, getPostSlugs } from '@/lib/posts';

// Emit one real .md file per article during the static export so the resource
// works on GitHub Pages without a server runtime.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function GET(_request, { params }) {
  const { slug } = await params;

  if (!getPostSlugs().includes(slug)) {
    return new Response('Not found\n', { status: 404 });
  }

  return new Response(getPostMarkdown(slug), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
