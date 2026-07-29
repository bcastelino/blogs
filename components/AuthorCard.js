import Link from 'next/link';
import styles from './AuthorCard.module.css';

export default function AuthorCard({ author }) {
  if (!author) return null;
  return (
    <section className={styles.card} aria-label="About the author">
      <Link href={`/authors/${author.slug}/`} className={styles.link}>
        <span className={styles.label}>Written by</span>
        <span className={styles.name}>{author.name}</span>
        <span className={styles.bio}>{author.bio}</span>
      </Link>
    </section>
  );
}
