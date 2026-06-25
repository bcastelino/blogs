'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ReadingChrome.module.css';

export default function ReadingChrome({ title, kicker, readingMinutes, headings = [] }) {
  const [progress, setProgress] = useState(0); // 0..1
  const [percent, setPercent] = useState(0); // 0..100
  const [activeId, setActiveId] = useState(headings[0]?.id ?? null);
  const [showMini, setShowMini] = useState(false);
  const [copied, setCopied] = useState(false);
  const tickingRef = useRef(false);

  const update = useCallback(() => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const scrollable = doc.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0;
    setProgress(ratio);
    setPercent(Math.round(ratio * 100));
    setShowMini(scrollTop > 320);

    // Active heading = last heading whose top is above the offset line.
    const offset = 140;
    let current = headings[0]?.id ?? null;
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el && el.getBoundingClientRect().top <= offset) {
        current = h.id;
      }
    }
    setActiveId(current);
  }, [headings]);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        update();
        tickingRef.current = false;
      });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [update]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* 1. Top scroll-progress line + percentage */}
      <div className={styles.progressTrack} aria-hidden="true">
        <div
          className={styles.progressFill}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Sticky mini bar showing title + percentage read */}
      <div className={`${styles.mini} ${showMini ? styles.miniOn : ''}`}>
        <div className={styles.miniInner}>
          {kicker && <span className={styles.miniKicker}>{kicker}</span>}
          <span className={styles.miniDivider} aria-hidden="true" />
          <span className={styles.miniTitle}>{title}</span>
          <span className={styles.miniMeta}>{percent}% read</span>
        </div>
      </div>

      {/* 2. Left rail: on-this-page + reading metadata + actions */}
      <nav className={styles.rail} aria-label="Article navigation">
        {headings.length > 0 && (
          <>
            <div className={styles.railHead}>On this page</div>
            <ol className={styles.railList}>
              {headings.map((h, i) => (
                <li
                  key={h.id}
                  className={`${styles.railItem} ${
                    activeId === h.id ? styles.railItemOn : ''
                  } ${h.level === 3 ? styles.railItemSub : ''}`}
                >
                  <a className={styles.railLink} href={`#${h.id}`}>
                    <span className={styles.railIndex}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.railText}>{h.text}</span>
                  </a>
                </li>
              ))}
            </ol>
          </>
        )}

        <div className={styles.railMeta}>
          <span className={styles.railMetaLabel}>Reading</span>
          <span className={styles.railMetaValue}>
            {readingMinutes} min · {percent}%
          </span>
        </div>

        <div className={styles.railActions}>
          <button type="button" className={styles.railAction} onClick={copyLink} aria-live="polite">
            <span className={styles.railActionIcon} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 1 0-3.54-3.54l-.88.88" />
                <path d="M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.88a2.5 2.5 0 1 0 3.54 3.54l.88-.88" />
              </svg>
            </span>
            {copied ? 'Copied' : 'Copy link'}
          </button>
          <button type="button" className={styles.railAction} onClick={scrollTop}>
            <span className={styles.railActionIcon} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 13V3" />
                <path d="M3.5 7.5 8 3l4.5 4.5" />
              </svg>
            </span>
            Top
          </button>
        </div>
      </nav>
    </>
  );
}
