'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ReadingChrome.module.css';

export default function ReadingChrome({
  title,
  kicker,
  readingMinutes,
  headings = [],
  canonicalUrl,
  markdownHref,
}) {
  const [progress, setProgress] = useState(0); // 0..1
  const [percent, setPercent] = useState(0); // 0..100
  const [activeId, setActiveId] = useState(headings[0]?.id ?? null);
  const [showMini, setShowMini] = useState(false);
  const [copyStatus, setCopyStatus] = useState('idle');
  const [menuOpen, setMenuOpen] = useState(false);
  const tickingRef = useRef(false);
  const railListRef = useRef(null);
  const copyControlRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuItemRefs = useRef([]);
  const copyResetRef = useRef(null);
  const pendingMenuFocusRef = useRef('first');

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

  // Keep the active item visible inside the rail without scrolling the page.
  useEffect(() => {
    const list = railListRef.current;
    if (!list || !activeId) return;
    const item = list.querySelector(`[data-id="${activeId}"]`);
    if (!item) return;
    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const margin = 16;
    if (itemRect.top < listRect.top + margin) {
      list.scrollTop -= listRect.top + margin - itemRect.top;
    } else if (itemRect.bottom > listRect.bottom - margin) {
      list.scrollTop += itemRect.bottom - (listRect.bottom - margin);
    }
  }, [activeId]);

  useEffect(() => {
    return () => window.clearTimeout(copyResetRef.current);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleOutsidePointer = (event) => {
      if (!copyControlRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsidePointer, true);
    return () => document.removeEventListener('pointerdown', handleOutsidePointer, true);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const targetIndex = pendingMenuFocusRef.current === 'last'
      ? menuItemRefs.current.length - 1
      : 0;
    menuItemRefs.current[targetIndex]?.focus();
  }, [menuOpen]);

  const scheduleCopyReset = () => {
    window.clearTimeout(copyResetRef.current);
    copyResetRef.current = window.setTimeout(() => setCopyStatus('idle'), 1800);
  };

  const copyPage = async ({ fromMenu = false } = {}) => {
    setCopyStatus('copying');
    try {
      const response = await fetch(markdownHref);
      if (!response.ok) throw new Error(`Markdown request failed: ${response.status}`);
      const markdown = await response.text();
      await navigator.clipboard.writeText(markdown);
      setCopyStatus('copied');
      if (fromMenu) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    } catch {
      setCopyStatus('error');
    }
    scheduleCopyReset();
  };

  const openMenu = (focusTarget = 'first') => {
    pendingMenuFocusRef.current = focusTarget;
    setMenuOpen(true);
  };

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    openMenu('first');
  };

  const closeMenuAndRestoreFocus = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const handleMenuButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu(event.key === 'ArrowUp' ? 'last' : 'first');
    }
  };

  const handleMenuKeyDown = (event) => {
    const items = menuItemRefs.current.filter(Boolean);
    const currentIndex = items.indexOf(document.activeElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenuAndRestoreFocus();
      return;
    }

    if (event.key === 'Tab') {
      setMenuOpen(false);
      return;
    }

    let nextIndex = null;
    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % items.length;
    if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + items.length) % items.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = items.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      items[nextIndex]?.focus();
    }
  };

  const copyLabel = {
    idle: 'Copy page',
    copying: 'Copying…',
    copied: 'Copied',
    error: 'Copy failed',
  }[copyStatus];

  const chatGptUrl = `https://chatgpt.com/?hints=search&q=${encodeURIComponent(
    `Read from ${canonicalUrl} so I can ask questions about it.`
  )}`;
  const canonicalMarkdownUrl = `${canonicalUrl}markdown.md`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(
    `Read from ${canonicalMarkdownUrl} so I can ask questions about it.`
  )}`;

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
            <ol className={styles.railList} ref={railListRef}>
              {(() => {
                let h2Index = 0;
                return headings.map((h) => {
                  if (h.level === 2) h2Index += 1;
                  return (
                    <li
                      key={h.id}
                      data-id={h.id}
                      className={`${styles.railItem} ${activeId === h.id ? styles.railItemOn : ''
                        } ${h.level === 3 ? styles.railItemSub : ''}`}
                    >
                      <a className={styles.railLink} href={`#${h.id}`}>
                        <span className={styles.railIndex}>
                          {h.level === 2 ? String(h2Index).padStart(2, '0') : ''}
                        </span>
                        <span className={styles.railText}>{h.text}</span>
                      </a>
                    </li>
                  );
                });
              })()}
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
          <div className={styles.copyControl} ref={copyControlRef}>
            <div className={styles.copySplit}>
              <button
                type="button"
                className={styles.copyPrimary}
                onClick={() => copyPage()}
                disabled={copyStatus === 'copying'}
              >
                <span className={styles.railActionIcon} aria-hidden="true">
                  <CopyIcon />
                </span>
                <span>{copyLabel}</span>
              </button>
              <button
                type="button"
                ref={menuButtonRef}
                className={`${styles.copyToggle} ${menuOpen ? styles.copyToggleOpen : ''}`}
                onClick={toggleMenu}
                onKeyDown={handleMenuButtonKeyDown}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-controls="copy-page-menu"
                aria-label={menuOpen ? 'Close copy page menu' : 'Open copy page menu'}
              >
                <ChevronIcon />
              </button>
            </div>

            {menuOpen && (
              <div
                id="copy-page-menu"
                className={styles.copyMenu}
                role="menu"
                aria-label="Copy page actions"
                onKeyDown={handleMenuKeyDown}
              >
                <button
                  type="button"
                  role="menuitem"
                  ref={(node) => { menuItemRefs.current[0] = node; }}
                  className={styles.copyMenuItem}
                  onClick={() => copyPage({ fromMenu: true })}
                  disabled={copyStatus === 'copying'}
                >
                  <span className={styles.copyMenuIcon} aria-hidden="true"><CopyIcon /></span>
                  <span className={styles.copyMenuText}>
                    <span className={styles.copyMenuTitle}>Copy page</span>
                    <span className={styles.copyMenuDescription}>Copy page as Markdown for LLMs</span>
                  </span>
                </button>
                <a
                  role="menuitem"
                  ref={(node) => { menuItemRefs.current[1] = node; }}
                  className={styles.copyMenuItem}
                  href={markdownHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.copyMenuIcon} aria-hidden="true"><MarkdownIcon /></span>
                  <span className={styles.copyMenuText}>
                    <span className={styles.copyMenuTitle}>View as Markdown <ExternalIcon /></span>
                    <span className={styles.copyMenuDescription}>View this page as plain text</span>
                  </span>
                </a>
                <a
                  role="menuitem"
                  ref={(node) => { menuItemRefs.current[2] = node; }}
                  className={styles.copyMenuItem}
                  href={chatGptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.copyMenuIcon} aria-hidden="true"><BrandIcon brand="chatgpt" /></span>
                  <span className={styles.copyMenuText}>
                    <span className={styles.copyMenuTitle}>Open in ChatGPT <ExternalIcon /></span>
                    <span className={styles.copyMenuDescription}>Ask questions about this page</span>
                  </span>
                </a>
                <a
                  role="menuitem"
                  ref={(node) => { menuItemRefs.current[3] = node; }}
                  className={styles.copyMenuItem}
                  href={claudeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.copyMenuIcon} aria-hidden="true"><BrandIcon brand="claude" /></span>
                  <span className={styles.copyMenuText}>
                    <span className={styles.copyMenuTitle}>Open in Claude <ExternalIcon /></span>
                    <span className={styles.copyMenuDescription}>Ask questions about this page</span>
                  </span>
                </a>
              </div>
            )}
            <span className="sr-only" aria-live="polite">
              {copyStatus === 'copied' && 'Page copied as Markdown.'}
              {copyStatus === 'error' && 'Unable to copy the page.'}
            </span>
          </div>
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

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5.25" y="5.25" width="7.5" height="7.5" rx="1.5" />
      <path d="M3.25 10.75H2.9A1.65 1.65 0 0 1 1.25 9.1V2.9A1.65 1.65 0 0 1 2.9 1.25h6.2a1.65 1.65 0 0 1 1.65 1.65v.35" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

function MarkdownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="3.25" width="15" height="11.5" rx="2" />
      <path d="M4 11V7l2 2.5L8 7v4M11 9.5l1.5 1.5L14 9.5M12.5 11V7" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className={styles.externalIcon} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.25 1.75h5v5M8.1 1.9 3.75 6.25" />
      <path d="M7 5.75v1.5a1 1 0 0 1-1 1H2.75a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1.5" />
    </svg>
  );
}

function BrandIcon({ brand }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <span className={styles.brandIcon}>
      <img
        className={styles.brandIconDarkMark}
        src={`${basePath}/brand/${brand}-mark-dark.svg`}
        alt=""
        width="16"
        height="16"
      />
      <img
        className={styles.brandIconLightMark}
        src={`${basePath}/brand/${brand}-mark-light.svg`}
        alt=""
        width="16"
        height="16"
      />
    </span>
  );
}
