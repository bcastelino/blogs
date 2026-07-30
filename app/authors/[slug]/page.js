import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/posts';
import { getAuthor, getAuthorSlugs } from '@/lib/authors';
import PostCard from '@/components/PostCard';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import styles from './page.module.css';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAuthorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.name} · Authors`,
    description: `${author.bio} Posts by ${author.name} on ${SITE_NAME}.`,
    alternates: {
      canonical: `${SITE_URL}/authors/${author.slug}/`,
    },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const posts = getAllPosts().filter((post) => post.authorSlug === author.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${author.name} · ${SITE_NAME}`,
    url: `${SITE_URL}/authors/${author.slug}/`,
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      description: author.bio,
      ...(author.url ? { url: author.url, sameAs: [author.url] } : {}),
    },
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={styles.wrap}>
        <header className={styles.header}>
          <Link href="/" className={styles.back}>
            ← All posts
          </Link>
          <span className={styles.label}>Author</span>
          <h1 className={styles.title}>{author.name}</h1>
          <p className={styles.lead}>{author.bio}</p>
          {author.url && (
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.external}
            >
              LinkedIn ↗
            </a>
          )}
        </header>

        <div className={styles.list}>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
