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
        <nav className={styles.links}>
          <Link href="/writing" className={styles.link}>
            Writing
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
