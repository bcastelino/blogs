import Link from 'next/link';
import CardViz from './CardViz';
import styles from './KeepReading.module.css';

const ACCENTS = [
  'var(--ios-blue)',
  'var(--ios-orange)',
  'var(--ios-green)',
  'var(--ios-indigo)',
  'var(--ios-pink)',
];

export default function KeepReading({ posts = [] }) {
  if (posts.length === 0) return null;

  return (
    <section className={styles.wrap} aria-label="Keep reading">
      <div className={styles.head}>
        <span className={styles.eyebrow}>Keep reading</span>
        <Link className={styles.more} href="/">
          All stories <span aria-hidden="true">›</span>
        </Link>
      </div>
      <hr className={styles.rule} />

      <div className={styles.cards}>
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={styles.card}
            style={{ '--further-accent': ACCENTS[i % ACCENTS.length] }}
          >
            <div className={styles.cardHead}>
              <span className={styles.cardKicker}>{post.tags[0] ?? 'Notes'}</span>
              <span className={styles.cardTag}>Journal</span>
            </div>
            <div className={styles.cardViz} aria-hidden="true">
              <CardViz variant={i} />
            </div>
            <div className={styles.titleRow}>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <span className={styles.tooltip} role="tooltip">
                {post.title}
              </span>
            </div>
            <span className={styles.cardArrow} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
