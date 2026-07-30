import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getTag } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { SITE_URL } from '@/lib/site';
import styles from './page.module.css';

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }) {
  const { tag: tagParam } = await params;
  const tag = getTag(tagParam);
  if (!tag) return {};
  return {
    title: `${tag.name} · Topics`,
    description: `${tag.count} ${tag.count === 1 ? 'post' : 'posts'} on ${tag.name} from The Brian Journal.`,
    alternates: {
      canonical: `${SITE_URL}/topics/${tag.slug}/`,
    },
  };
}

export default async function TopicPage({ params }) {
  const { tag: tagParam } = await params;
  const tag = getTag(tagParam);
  if (!tag) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tag.name} · The Brian Journal`,
    url: `${SITE_URL}/topics/${tag.slug}/`,
    description: `Posts tagged ${tag.name}.`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tag.posts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}/`,
        name: post.title,
      })),
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
          <Link href="/topics" className={styles.back}>
            ← All topics
          </Link>
          <h1 className={styles.title}>{tag.name}</h1>
          <p className={styles.lead}>
            {tag.count} {tag.count === 1 ? 'post' : 'posts'} tagged with {tag.name}.
          </p>
        </header>

        <div className={styles.list}>
          {tag.posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
