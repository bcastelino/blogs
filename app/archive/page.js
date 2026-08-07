import { getAllPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';
import PostCard from '@/components/PostCard';
import styles from './page.module.css';

export const metadata = {
  title: 'Archive',
  description: 'Every post published on The Brian Journal, newest first.',
  alternates: {
    canonical: `${SITE_URL}/archive/`,
  },
};

export default function ArchivePage() {
  const posts = getAllPosts().filter((post) => !post.noindex);

  return (
    <div className="container">
      <section className={styles.wrap}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Index</span>
          <h1 className={styles.title}>Archive</h1>
          <p className={styles.lead}>
            Every post, newest first. {posts.length}{' '}
            {posts.length === 1 ? 'entry' : 'entries'} and counting.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className={styles.empty}>No posts yet, check back soon.</p>
        ) : (
          <div className={styles.list}>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
