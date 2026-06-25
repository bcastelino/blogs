'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './DocsSidebar.module.css';

export default function DocsSidebar({ sections = [] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);
  const tickingRef = useRef(false);

  const update = useCallback(() => {
    const offset = 140;
    let current = sections[0]?.id ?? null;
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top <= offset) {
        current = section.id;
      }
    }
    setActiveId(current);
  }, [sections]);

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

  return (
    <nav className={styles.rail} aria-label="Docs sections">
      {sections.length > 0 && (
        <>
          <div className={styles.railHead}>On this page</div>
          <ol className={styles.railList}>
            {sections.map((section, i) => (
              <li
                key={section.id}
                className={`${styles.railItem} ${activeId === section.id ? styles.railItemOn : ''}`}
              >
                <a className={styles.railLink} href={`#${section.id}`}>
                  <span className={styles.railIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.railText}>{section.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </>
      )}
    </nav>
  );
}
