const accentStroke = { stroke: 'var(--accent)' };
const accentSoft = { stroke: 'color-mix(in oklab, var(--accent) 18%, transparent)' };
const accentFill = { fill: 'var(--accent)' };
const accentFillSoft = { fill: 'color-mix(in oklab, var(--accent) 16%, transparent)' };

// Progress ring
function ProgressRing() {
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

// Stacked bars
function StackedBars() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <rect x="18" y="92" width="30" height="60" rx="6" style={accentFillSoft} />
      <rect x="62" y="58" width="30" height="94" rx="6" style={accentFillSoft} />
      <rect x="106" y="28" width="30" height="124" rx="6" style={accentFill} />
      <rect x="150" y="74" width="30" height="78" rx="6" style={accentFillSoft} />
    </svg>
  );
}

// Concentric arcs
function ConcentricArcs() {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true">
      <circle cx="0" cy="0" r="32" fill="none" strokeWidth="10" style={accentStroke} />
      <circle cx="0" cy="0" r="54" fill="none" strokeWidth="10" style={accentSoft} strokeDasharray="200 140" />
      <circle cx="0" cy="0" r="78" fill="none" strokeWidth="10" style={accentSoft} strokeDasharray="120 360" />
    </svg>
  );
}

// Wave lines
function WaveLines() {
  return (
    <svg viewBox="0 0 200 140" aria-hidden="true" fill="none">
      <path d="M6 96 C 40 96, 50 44, 84 44 S 128 96, 162 96 S 200 60, 200 60" strokeWidth="6" strokeLinecap="round" style={accentStroke} />
      <path d="M6 116 C 40 116, 50 78, 84 78 S 128 116, 162 116 S 200 92, 200 92" strokeWidth="6" strokeLinecap="round" style={accentSoft} />
    </svg>
  );
}

// Dot grid
function DotGrid() {
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

// Triangles / peaks
function Triangles() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      <polygon points="20,140 70,44 120,140" style={accentFillSoft} />
      <polygon points="88,140 140,20 192,140" style={accentFill} />
    </svg>
  );
}

// Diagonal stripes
function DiagonalStripes() {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true" fill="none">
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={-30 + i * 46}
          y1="170"
          x2={70 + i * 46}
          y2="-10"
          strokeWidth="12"
          strokeLinecap="round"
          style={i % 2 === 0 ? accentStroke : accentSoft}
        />
      ))}
    </svg>
  );
}

// Plus / cross grid
function CrossGrid() {
  const marks = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const cx = 40 + c * 60;
      const cy = 32 + r * 48;
      const on = (r + c) % 2 === 0;
      marks.push(
        <g key={`${r}-${c}`} style={on ? accentFill : accentFillSoft}>
          <rect x={cx - 4} y={cy - 15} width="8" height="30" rx="3" />
          <rect x={cx - 15} y={cy - 4} width="30" height="8" rx="3" />
        </g>,
      );
    }
  }
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true">
      {marks}
    </svg>
  );
}

// Zigzag
function Zigzag() {
  return (
    <svg viewBox="0 0 200 140" aria-hidden="true" fill="none">
      <polyline
        points="12,44 47,104 82,44 117,104 152,44 188,104"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={accentSoft}
      />
      <polyline
        points="12,70 47,30 82,70 117,30 152,70 188,30"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={accentStroke}
      />
    </svg>
  );
}

// Nested squares
function NestedSquares() {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true">
      <g transform="rotate(45)">
        <rect x="-60" y="-60" width="120" height="120" rx="10" fill="none" strokeWidth="10" style={accentSoft} />
        <rect x="-38" y="-38" width="76" height="76" rx="8" fill="none" strokeWidth="10" style={accentStroke} />
        <rect x="-17" y="-17" width="34" height="34" rx="6" style={accentFillSoft} />
      </g>
    </svg>
  );
}

// Network / scatter
function Network() {
  const pts = [
    [30, 118],
    [78, 40],
    [138, 92],
    [172, 34],
    [60, 96],
  ];
  const edges = [
    [0, 4],
    [4, 1],
    [1, 2],
    [2, 3],
    [4, 2],
  ];
  return (
    <svg viewBox="0 0 200 150" aria-hidden="true" fill="none">
      {edges.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} strokeWidth="4" style={accentSoft} />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 11 : 7} style={i % 2 === 0 ? accentFill : accentFillSoft} />
      ))}
    </svg>
  );
}

// Hexagon
function Hexagon() {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true">
      <polygon points="70,0 35,60.6 -35,60.6 -70,0 -35,-60.6 35,-60.6" fill="none" strokeWidth="10" style={accentStroke} />
      <polygon points="38,0 19,32.9 -19,32.9 -38,0 -19,-32.9 19,-32.9" style={accentFillSoft} />
    </svg>
  );
}

// A set of abstract, accent-colored SVG "vizzes" used to decorate cards,
// inspired by an editorial / data-driven magazine aesthetic.
const VIZ = [
  ProgressRing,
  StackedBars,
  ConcentricArcs,
  WaveLines,
  DotGrid,
  Triangles,
  DiagonalStripes,
  CrossGrid,
  Zigzag,
  NestedSquares,
  Network,
  Hexagon,
];

export const VIZ_COUNT = VIZ.length;

export default function CardViz({ variant = 0 }) {
  const idx = ((variant % VIZ_COUNT) + VIZ_COUNT) % VIZ_COUNT;
  const Shape = VIZ[idx];
  return <Shape />;
}
