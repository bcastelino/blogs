import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import CardViz from '@/components/CardViz';
import styles from './page.module.css';

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

function shortDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HomePage() {
  const posts = getAllPosts();
  const [cover, ...rest] = posts;

  const issueMonth = cover?.date
    ? new Date(cover.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';
  const topics = [...new Set(posts.flatMap((p) => p.tags))];

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
        <h1 className={styles.mastheadTitle}>Notes on building &amp; ideas</h1>
        <p className={styles.mastheadLead}>
          Essays, experiments, and field notes on technology, software, and the
          occasional tangent.
        </p>
        <hr className={styles.mastheadRule} />
      </header>

      {posts.length === 0 && <p className={styles.empty}>No posts yet — check back soon.</p>}

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
              <CardViz variant={0} />
            </div>
            <div className={styles.coverText}>
              <div className={styles.coverTagRow}>
                <span className={styles.cardKicker}>{categoryOf(cover)}</span>
                <span className={styles.metaDim}>{cover.readingTime}</span>
              </div>
              <h2 className={styles.coverTitle}>{cover.title}</h2>
              {cover.excerpt && <p className={styles.coverPreview}>{cover.excerpt}</p>}
              <span className={styles.coverArrow}>Read the story →</span>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className={styles.section}>
          <div className={`${styles.sectionHead} ${styles.accentBlue}`}>
            <span className={styles.sectionEyebrowWrap}>
              <span className={styles.sectionDot} aria-hidden="true" />
              <span className={styles.sectionEyebrow}>Latest</span>
            </span>
            <span className={styles.sectionRule} aria-hidden="true" />
          </div>

          <div className={styles.latestGrid}>
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`${styles.card} ${accentFor(i + 1)}`}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardKicker}>{categoryOf(post)}</span>
                  <span className={styles.metaDim}>{post.readingTime}</span>
                </div>
                <div className={styles.cardViz}>
                  <CardViz variant={i + 1} />
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

      {topics.length > 0 && (
        <section className={styles.section}>
          <div className={`${styles.sectionHead} ${styles.accentGreen}`}>
            <span className={styles.sectionEyebrowWrap}>
              <span className={styles.sectionDot} aria-hidden="true" />
              <span className={styles.sectionEyebrow}>Topics</span>
            </span>
            <span className={styles.sectionRule} aria-hidden="true" />
          </div>
          <div className={styles.catGrid}>
            {topics.map((topic) => (
              <span key={topic} className={styles.tagPill}>
                {topic}
              </span>
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className={styles.section}>
          <div className={`${styles.sectionHead} ${styles.accentSlate}`}>
            <span className={styles.sectionEyebrowWrap}>
              <span className={styles.sectionDot} aria-hidden="true" />
              <span className={styles.sectionEyebrow}>Archive</span>
            </span>
            <span className={styles.sectionRule} aria-hidden="true" />
          </div>

          <div className={styles.archiveList}>
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`${styles.archiveRow} ${accentFor(i)}`}
              >
                <span className={styles.archiveDot} aria-hidden="true" />
                <span className={styles.archiveTitle}>{post.title}</span>
                <span className={styles.archiveDate}>{shortDate(post.date)}</span>
                <span className={styles.archiveCategory}>{categoryOf(post)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
