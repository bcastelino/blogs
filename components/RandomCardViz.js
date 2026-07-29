'use client';

import { useEffect, useState } from 'react';
import CardViz, { VIZ_COUNT } from './CardViz';

// A shared shuffled "deck" of pattern indices. Each mounted card pops the next
// index, so patterns don't repeat until the whole set has been used. When the
// deck is exhausted it reshuffles, avoiding an immediate repeat at the seam.
let deck = [];
let lastUsed = -1;

function refillDeck() {
  const next = Array.from({ length: VIZ_COUNT }, (_, i) => i);
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  if (next[0] === lastUsed && next.length > 1) {
    [next[0], next[1]] = [next[1], next[0]];
  }
  deck = next;
}

function nextVariant() {
  if (deck.length === 0) refillDeck();
  lastUsed = deck.shift();
  return lastUsed;
}

export default function RandomCardViz({ seed = 0 }) {
  // Deterministic value for SSR / first paint, then randomize after mount so
  // hydration matches and the shapes vary on every page load.
  const [variant, setVariant] = useState(seed % VIZ_COUNT);

  useEffect(() => {
    setVariant(nextVariant());
  }, []);

  return <CardViz variant={variant} />;
}
