import Link from 'next/link';
import { getAllTags } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';
import styles from './page.module.css';

export const metadata = {
  title: 'Topics',
  description: 'Browse every topic covered on The Brian Journal, from data and AI to developer tooling and building in the open.',
  alternates: {
    canonical: `${SITE_URL}/topics/`,
  },
};

export default function TopicsPage() {
  const tags = getAllTags();

  return (
    <div className="container">
      <section className={styles.wrap}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Index</span>
          <h1 className={styles.title}>Topics</h1>
          <p className={styles.lead}>
            Every subject covered on The Brian Journal. Pick a thread and follow it.
          </p>
        </header>

        {tags.length === 0 ? (
          <p className={styles.empty}>No topics yet, check back soon.</p>
        ) : (
          <ul className={styles.grid}>
            {tags.map((tag) => (
              <li key={tag.slug}>
                <Link href={`/topics/${tag.slug}`} className={styles.chip}>
                  <span className={styles.chipName}>{tag.name}</span>
                  <span className={styles.chipCount}>
                    {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
