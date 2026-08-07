import Link from 'next/link';
import { getVisiblePosts, getFeaturedPost, formatDate } from '@/lib/posts';
import RandomCardViz from '@/components/RandomCardViz';
import styles from './page.module.css';

export const metadata = {
  alternates: {
    canonical: 'https://bcastelino.com/blogs/',
  },
};

const ACCENTS = [
  styles.accentOrange,
  styles.accentBlue,
  styles.accentGreen,
  styles.accentRed,
  styles.accentIndigo,
  styles.accentPink,
  styles.accentSlate,
];

function accentFor(index) {
  return ACCENTS[index % ACCENTS.length];
}

function categoryOf(post) {
  return post.tags[0] ?? 'Notes';
}

export default function HomePage() {
  const posts = getVisiblePosts();
  const cover = getFeaturedPost();
  const rest = posts.filter((post) => post.slug !== cover?.slug);

  const issueMonth = cover?.date
    ? new Date(cover.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';
  const latest = rest.slice(0, 6);

  return (
    <div className={styles.shell}>
      <header className={styles.masthead}>
        <div className={styles.mastheadTop}>
          <span className={styles.eyebrow}>The Brian Journal</span>
          <span className={styles.issueLine}>
            {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
            {issueMonth ? ` · ${issueMonth}` : ''}
          </span>
        </div>
        <h1 className={styles.mastheadTitle}>Databricks, data &amp; AI engineering</h1>
        <p className={styles.mastheadLead}>
          Long-form writing on Databricks, data engineering, and production AI.
          Sourced, specific, and honest about what I don&apos;t know yet.
        </p>
        <hr className={styles.mastheadRule} />
      </header>

      {posts.length === 0 && <p className={styles.empty}>No posts yet, check back soon.</p>}

      {cover && (
        <section className={styles.section}>
          <div className={`${styles.sectionHead} ${styles.accentOrange}`}>
            <span className={styles.sectionEyebrowWrap}>
              <span className={styles.sectionDot} aria-hidden="true" />
              <span className={styles.sectionEyebrow}>Cover Story</span>
            </span>
            <span className={styles.sectionRule} aria-hidden="true" />
          </div>

          <Link href={`/blog/${cover.slug}`} className={`${styles.coverCard} ${styles.accentOrange}`}>
            <div className={styles.coverViz}>
              <RandomCardViz seed={0} />
            </div>
            <div className={styles.coverText}>
              <div className={styles.coverTagRow}>
                <span className={styles.cardKicker}>{categoryOf(cover)}</span>
                <span className={styles.metaDim}>
                  {cover.date ? `${formatDate(cover.date)} · ` : ''}
                  {cover.readingTime}
                </span>
              </div>
              <h2 className={styles.coverTitle}>{cover.title}</h2>
              {cover.excerpt && <p className={styles.coverPreview}>{cover.excerpt}</p>}
              <span className={styles.coverArrow}>Read the story →</span>
            </div>
          </Link>
        </section>
      )}

      {latest.length > 0 && (
        <section className={styles.section}>
          <div className={`${styles.sectionHead} ${styles.accentBlue}`}>
            <span className={styles.sectionEyebrowWrap}>
              <span className={styles.sectionDot} aria-hidden="true" />
              <span className={styles.sectionEyebrow}>Latest</span>
            </span>
            <span className={styles.sectionRule} aria-hidden="true" />
          </div>

          <div className={styles.latestGrid}>
            {latest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`${styles.card} ${accentFor(i + 1)}`}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardKicker}>{categoryOf(post)}</span>
                  <span className={styles.metaDim}>
                    {post.date ? `${formatDate(post.date)} · ` : ''}
                    {post.readingTime}
                  </span>
                </div>
                <div className={styles.cardViz}>
                  <RandomCardViz seed={i + 1} />
                </div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                {post.excerpt && <p className={styles.cardPreview}>{post.excerpt}</p>}
                <span className={styles.cardArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className={styles.browse}>
          <p className={styles.browseText}>Looking for something specific?</p>
          <div className={styles.browseLinks}>
            <Link href="/topics" className={styles.browseLink}>
              Browse by topic
            </Link>
            <Link href="/archive" className={styles.browseLink}>
              See the full archive
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
