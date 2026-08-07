import styles from './PostCTA.module.css';

// Shared call-to-action rendered below every post. Points readers who arrive
// from search back to the portfolio and the systems behind the writing.
export default function PostCTA() {
  return (
    <aside className={styles.cta} aria-label="About the author and hiring status">
      <p className={styles.lead}>
        I&apos;m an AI Data Engineer working on Databricks, currently open to
        AI Engineer, Data Engineer, and AI Platform Engineer roles.
      </p>
      <a
        className={styles.link}
        href="https://bcastelino.com/work?utm_source=brian-journal&utm_medium=referral&utm_campaign=post-cta&utm_content=see-the-systems"
        target="_blank"
        rel="noopener"
      >
        See the systems behind these posts →
      </a>
    </aside>
  );
}
