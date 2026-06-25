import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>The Brian Journal</p>
        <nav className={styles.links}>
          <Link href="/">Writing</Link>
          <Link href="/about">About</Link>
          <a href="https://github.com/bcastelino" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
        <p className={styles.legal}>
          © {new Date().getFullYear()} Brian Castelino. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
