import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPostSlugs, getPostMeta, getAllPosts, formatDate, tagSlug } from '@/lib/posts';
import ReadingChrome from '@/components/ReadingChrome';
import KeepReading from '@/components/KeepReading';
import TableEnhancer from '@/components/TableEnhancer';
import { SITE_URL, SITE_NAME, LOGO_URL } from '@/lib/site';
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
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}/`,
      },
      openGraph: {
        type: 'article',
        title: meta.title,
        description: meta.excerpt,
        url: `${SITE_URL}/blog/${slug}/`,
        publishedTime: meta.date ?? undefined,
        modifiedTime: meta.updated ?? meta.date ?? undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: meta.title,
        description: meta.excerpt,
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

  const canonical = `${SITE_URL}/blog/${slug}/`;
  const ogImage = `${canonical}opengraph-image`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    url: canonical,
    datePublished: post.date ?? undefined,
    dateModified: post.updated ?? post.date ?? undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    ...(post.tags.length > 0
      ? { keywords: post.tags.join(', '), articleSection: post.tags[0] }
      : {}),
    author: {
      '@type': 'Person',
      name: post.author,
      ...(post.authorUrl ? { url: post.authorUrl, sameAs: [post.authorUrl] } : {}),
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: category, item: `${SITE_URL}/topics/${tagSlug(category)}/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  };

  const faqJsonLd =
    post.faq.length > 0
      ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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
            {post.tags.length > 0 && (
              <Link href={`/topics/${tagSlug(category)}/`} className={styles.kicker}>
                <span className={styles.kickerDot} aria-hidden="true" />
                {category}
              </Link>
            )}
            <h1 className={styles.title}>{post.title}</h1>
            {post.excerpt && <p className={styles.standfirst}>{post.excerpt}</p>}
            <div className={styles.meta}>
              {post.author && (
                <>
                  <span>
                    By{' '}
                    {post.authorUrl ? (
                      <a
                        href={post.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.author}
                      >
                        {post.author}
                      </a>
                    ) : (
                      post.author
                    )}
                  </span>
                  <span className={styles.dot}>·</span>
                </>
              )}
              {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
              <span className={styles.dot}>·</span>
              <span>{post.readingTime}</span>
              {post.updated && post.updated !== post.date && (
                <>
                  <span className={styles.dot}>·</span>
                  <span>Updated {formatDate(post.updated)}</span>
                </>
              )}
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

          {post.takeaways.length > 0 && (
            <aside className={styles.takeaways} aria-label="Key takeaways">
              <h2 className={styles.takeawaysTitle}>Key takeaways</h2>
              <ul className={styles.takeawaysList}>
                {post.takeaways.map((item, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </aside>
          )}

          <div
            className={`prose ${styles.body}`}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <TableEnhancer />

          {post.faq.length > 0 && (
            <section className={`prose ${styles.faq}`} aria-labelledby="faq">
              <h2 id="faq">Frequently asked questions</h2>
              {post.faq.map((item) => (
                <details key={item.question} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    {item.question}
                    <span className={styles.faqIcon} aria-hidden="true" />
                  </summary>
                  <p className={styles.faqAnswer}>{item.answer}</p>
                </details>
              ))}
            </section>
          )}
        </article>
      </div>

      <KeepReading posts={related} />
    </>
  );
}
