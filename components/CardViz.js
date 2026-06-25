const accentStroke = { stroke: 'var(--accent)' };
const accentSoft = { stroke: 'color-mix(in oklab, var(--accent) 18%, transparent)' };
const accentFill = { fill: 'var(--accent)' };
const accentFillSoft = { fill: 'color-mix(in oklab, var(--accent) 16%, transparent)' };

// A small set of abstract, accent-colored SVG "vizzes" used to decorate cards,
// inspired by an editorial / data-driven magazine aesthetic.
export default function CardViz({ variant = 0 }) {
  const v = ((variant % 5) + 5) % 5;

  if (v === 0) {
    // Progress ring
    return (
      <svg viewBox="-100 -100 200 200" aria-hidden="true">
        <circle cx="0" cy="0" r="68" fill="none" strokeWidth="14" style={accentSoft} />
        <circle
          cx="0"
          cy="0"
          r="68"
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          style={accentStroke}
          strokeDasharray="300 427"
          transform="rotate(-90)"
        />
      </svg>
    );
  }

  if (v === 1) {
    // Stacked bars
    return (
      <svg viewBox="0 0 200 160" aria-hidden="true">
        <rect x="18" y="92" width="30" height="60" rx="6" style={accentFillSoft} />
        <rect x="62" y="58" width="30" height="94" rx="6" style={accentFillSoft} />
        <rect x="106" y="28" width="30" height="124" rx="6" style={accentFill} />
        <rect x="150" y="74" width="30" height="78" rx="6" style={accentFillSoft} />
      </svg>
    );
  }

  if (v === 2) {
    // Concentric arcs
    return (
      <svg viewBox="-100 -100 200 200" aria-hidden="true">
        <circle cx="0" cy="0" r="32" fill="none" strokeWidth="10" style={accentStroke} />
        <circle cx="0" cy="0" r="54" fill="none" strokeWidth="10" style={accentSoft} strokeDasharray="200 140" />
        <circle cx="0" cy="0" r="78" fill="none" strokeWidth="10" style={accentSoft} strokeDasharray="120 360" />
      </svg>
    );
  }

  if (v === 3) {
    // Wave lines
    return (
      <svg viewBox="0 0 200 140" aria-hidden="true" fill="none">
        <path d="M6 96 C 40 96, 50 44, 84 44 S 128 96, 162 96 S 200 60, 200 60" strokeWidth="6" strokeLinecap="round" style={accentStroke} />
        <path d="M6 116 C 40 116, 50 78, 84 78 S 128 116, 162 116 S 200 92, 200 92" strokeWidth="6" strokeLinecap="round" style={accentSoft} />
      </svg>
    );
  }

  // v === 4 — dot grid
  const dots = [];
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 6; c += 1) {
      const on = (r + c) % 3 === 0;
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={24 + c * 30}
          cy={24 + r * 30}
          r={on ? 9 : 5}
          style={on ? accentFill : accentFillSoft}
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 200 140" aria-hidden="true">
      {dots}
    </svg>
  );
}
