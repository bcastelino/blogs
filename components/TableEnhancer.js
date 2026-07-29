'use client';

import { useEffect } from 'react';

const HINT_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6 3 12l6 6"/><path d="m15 6 6 6-6 6"/></svg>';

export default function TableEnhancer() {
  useEffect(() => {
    const wraps = Array.from(document.querySelectorAll('.table-wrap'));
    if (wraps.length === 0) return undefined;

    const cleanups = [];

    wraps.forEach((wrap) => {
      const scroller = wrap.querySelector('.table-scroll');
      if (!scroller) return;

      let hint = null;
      let hintTimer = null;

      const ensureHint = () => {
        if (hint) return;
        hint = document.createElement('span');
        hint.className = 'table-hint';
        hint.innerHTML = `${HINT_SVG}<span>Swipe to see more</span>`;
        wrap.appendChild(hint);
      };

      const dismissHint = () => {
        wrap.classList.remove('show-hint');
        if (hintTimer) {
          clearTimeout(hintTimer);
          hintTimer = null;
        }
      };

      const update = () => {
        const overflow = scroller.scrollWidth - scroller.clientWidth > 1;
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        const canLeft = overflow && scroller.scrollLeft > 1;
        const canRight = overflow && scroller.scrollLeft < maxScroll - 1;

        wrap.classList.toggle('can-scroll-left', canLeft);
        wrap.classList.toggle('can-scroll-right', canRight);

        if (overflow) {
          ensureHint();
          if (!wrap.dataset.hintShown) {
            wrap.dataset.hintShown = '1';
            requestAnimationFrame(() => wrap.classList.add('show-hint'));
            hintTimer = setTimeout(dismissHint, 4000);
          }
        } else {
          dismissHint();
        }
      };

      const onScroll = () => {
        update();
        dismissHint();
      };

      update();
      scroller.addEventListener('scroll', onScroll, { passive: true });

      cleanups.push(() => {
        scroller.removeEventListener('scroll', onScroll);
        if (hintTimer) clearTimeout(hintTimer);
      });
    });

    const onResize = () => {
      wraps.forEach((wrap) => {
        const scroller = wrap.querySelector('.table-scroll');
        if (!scroller) return;
        const overflow = scroller.scrollWidth - scroller.clientWidth > 1;
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        wrap.classList.toggle('can-scroll-left', overflow && scroller.scrollLeft > 1);
        wrap.classList.toggle(
          'can-scroll-right',
          overflow && scroller.scrollLeft < maxScroll - 1
        );
      });
    };

    window.addEventListener('resize', onResize);
    cleanups.push(() => window.removeEventListener('resize', onResize));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
