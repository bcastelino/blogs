'use client';

import { useState } from 'react';
import styles from './CopyButton.module.css';

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleCopy}
      aria-live="polite"
      title="Copy Markdown"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 1 0-3.54-3.54l-.88.88" />
        <path d="M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.88a2.5 2.5 0 1 0 3.54 3.54l.88-.88" />
      </svg>
      {copied ? 'Copied' : 'Copy Markdown'}
    </button>
  );
}
