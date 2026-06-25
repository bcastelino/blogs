import styles from './page.module.css';

export const metadata = {
  title: 'About',
  description: 'About Brian Castelino and this blog.',
};

export default function AboutPage() {
  return (
    <div className="container">
      <section className={styles.wrap}>
        <h1 className={styles.title}>About</h1>
        <div className="prose">
          <p>
            Hi, I&apos;m Brian. This is my personal blog where I write about technology,
            the things I build, and ideas I&apos;m working through.
          </p>
          <p>
            The site is intentionally simple: a statically generated Next.js app hosted
            on GitHub Pages, with posts written in Markdown.
          </p>
          <p>
            You can find more of my work on{' '}
            <a href="https://github.com/bcastelino" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
