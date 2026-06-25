'use client';

import { useEffect } from 'react';
import styles from './MermaidRenderer.module.css';

export default function MermaidRenderer() {
  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = await import('mermaid').then((m) => m.default);
      if (cancelled) return;

      // Register the ELK layout separately so a failure here doesn't abort
      // every diagram — they just fall back to the default (dagre) layout.
      try {
        const elkLayouts = await import('@mermaid-js/layout-elk').then(
          (m) => m.default
        );
        if (elkLayouts) mermaid.registerLayoutLoaders(elkLayouts);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Mermaid ELK layout unavailable, using default layout:', err);
      }
      if (cancelled) return;

      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.getAttribute('data-theme') &&
          window.matchMedia?.('(prefers-color-scheme: dark)').matches);

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
      });

      const blocks = document.querySelectorAll('pre code.language-mermaid');
      for (const code of blocks) {
        const pre = code.parentElement;
        if (!pre || pre.dataset.mermaidProcessed) continue;
        pre.dataset.mermaidProcessed = 'true';

        const source = code.textContent?.trim() ?? '';
        if (!source) continue;

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const wrapper = document.createElement('div');
        wrapper.className = styles.diagram;

        try {
          const { svg } = await mermaid.render(id, source);
          wrapper.innerHTML = svg;
          pre.replaceWith(wrapper);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Mermaid render failed:', err);
          // Clean up the stray error node Mermaid injects into <body>.
          document.getElementById(id)?.remove();
          const message =
            err instanceof Error ? err.message : String(err ?? 'Unknown error');
          const errorBox = document.createElement('div');
          errorBox.className = styles.error;
          errorBox.innerHTML = `<strong>Mermaid diagram failed to render</strong><pre>${message
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')}</pre>`;
          pre.insertAdjacentElement('beforebegin', errorBox);
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
