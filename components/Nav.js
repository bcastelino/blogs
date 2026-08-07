import Link from 'next/link';
import BrandMark from './BrandMark';
import ThemeToggle from './ThemeToggle';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <BrandMark className={styles.brandMark} />
          <span className={styles.brandText}>The Brian Journal</span>
        </Link>
        <nav className={styles.links} aria-label="Primary">
          <Link href="/archive" className={styles.link}>
            Archive
          </Link>
          <Link href="/topics" className={styles.link}>
            Topics
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <a
            href="https://bcastelino.com/?utm_source=brian-journal&utm_medium=referral&utm_campaign=nav&utm_content=portfolio-link"
            className={styles.link}
            target="_blank"
            rel="noopener"
          >
            Portfolio
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
