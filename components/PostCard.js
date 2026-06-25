import Link from 'next/link';
import { formatDate } from '@/lib/posts';
import styles from './PostCard.module.css';

export default function PostCard({ post }) {
  return (
    <article className={styles.card}>
      <Link href={`/blog/${post.slug}`} className={styles.link}>
        <div className={styles.meta}>
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          <span className={styles.dot}>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        {post.tags.length > 0 && (
          <ul className={styles.tags}>
            {post.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </Link>
    </article>
  );
}
