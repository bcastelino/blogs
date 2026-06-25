import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPostSlugs, getPostMeta, getAllPosts, formatDate } from '@/lib/posts';
import ReadingChrome from '@/components/ReadingChrome';
import KeepReading from '@/components/KeepReading';
import styles from './page.module.css';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const meta = getPostMeta(slug);
    return {
      title: meta.title,
      description: meta.excerpt,
      openGraph: {
        type: 'article',
        title: meta.title,
        description: meta.excerpt,
        publishedTime: meta.date ?? undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  if (!getPostSlugs().includes(slug)) {
    notFound();
  }

  const post = await getPost(slug);
  const related = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  const category = post.tags[0] ?? 'Journal';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date ?? undefined,
    author: { '@type': 'Person', name: 'Brian Castelino' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.layout}>
        <aside className={styles.railCol}>
          <ReadingChrome
            title={post.title}
            kicker={category}
            readingMinutes={post.readingMinutes}
            headings={post.headings}
          />
        </aside>

        <article className={styles.article}>
          <header className={styles.header}>
            <Link href="/" className={styles.back}>
              ← All posts
            </Link>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
              <span className={styles.dot}>·</span>
              <span>{post.readingTime}</span>
            </div>
            {post.tags.length > 0 && (
              <ul className={styles.tags}>
                {post.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div
            className={`prose ${styles.body}`}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>

      <KeepReading posts={related} />
    </>
  );
}
