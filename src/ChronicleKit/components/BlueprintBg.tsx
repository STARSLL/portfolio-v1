export default function BlueprintBg() {
  const W = 1920;
  const H = 1080;

  // Focal composition point (slightly left of center, lower half)
  const fx = W * 0.42;
  const fy = H * 0.62;

  const GRID = 72;
  const hLines = Array.from({ length: Math.ceil(H / GRID) + 1 }, (_, i) => i * GRID);
  const vLines = Array.from({ length: Math.ceil(W / GRID) + 1 }, (_, i) => i * GRID);

  // 20 radiating construction lines
  const radials = Array.from({ length: 20 }, (_, i) => (i * 360) / 20);

  // 8-directional handles at two circle radii
  const dirs8 = Array.from({ length: 8 }, (_, i) => (i * 45 * Math.PI) / 180);
  const R1 = 192;
  const R2 = 378;

  // Dense binary text rows
  const binaryRows = Array.from({ length: 32 }, (_, i) =>
    i % 3 === 0
      ? "10110100 01001101 00111010 11010110"
      : i % 3 === 1
      ? "00011101 10110100 01100011 01110001"
      : "01001101 11010110 10001110 00110101"
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bp-glow-focal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5AB0E8" stopOpacity="0.16" />
          <stop offset="60%" stopColor="#5AB0E8" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#5AB0E8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bp-glow-tr" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5AB0E8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#5AB0E8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bp-glow-bl" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5AB0E8" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#5AB0E8" stopOpacity="0" />
        </radialGradient>
        <pattern id="bp-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.3" fill="#5AB0E8" />
        </pattern>
        <pattern id="bp-dots-sm" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="0.9" fill="#5AB0E8" />
        </pattern>
      </defs>

      {/* ── Blueprint grid ───────────────────────────────────────── */}
      <g stroke="#5AB0E8" strokeWidth="0.5" opacity="0.024">
        {hLines.map(y => <line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} />)}
        {vLines.map(x => <line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} />)}
      </g>

      {/* ── Radiating construction lines from focal ──────────────── */}
      <g stroke="#5AB0E8" strokeWidth="0.7" opacity="0.06">
        {radials.map(deg => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={fx} y1={fy}
              x2={fx + Math.cos(rad) * 1100}
              y2={fy + Math.sin(rad) * 1100}
            />
          );
        })}
      </g>

      {/* ── Dashed concentric selection rings ───────────────────── */}
      <circle cx={fx} cy={fy} r={R1}
        fill="none" stroke="#5AB0E8" strokeWidth="0.9"
        strokeDasharray="8 5" opacity="0.18" />
      <circle cx={fx} cy={fy} r={R2}
        fill="none" stroke="#5AB0E8" strokeWidth="0.7"
        strokeDasharray="4 10" opacity="0.11" />
      <circle cx={fx} cy={fy} r={530}
        fill="none" stroke="#5AB0E8" strokeWidth="0.5"
        strokeDasharray="2 16" opacity="0.055" />

      {/* ── Selection handle squares — inner ring ────────────────── */}
      {dirs8.map((rad, i) => {
        const x = fx + Math.cos(rad) * R1;
        const y = fy + Math.sin(rad) * R1;
        const s = 8;
        return (
          <rect key={`h1-${i}`} x={x - s / 2} y={y - s / 2}
            width={s} height={s}
            fill="#060A13" stroke="#5AB0E8" strokeWidth="1.3" opacity="0.5" />
        );
      })}

      {/* ── Selection handle squares — outer ring ────────────────── */}
      {dirs8.filter((_, i) => i % 2 === 0).map((rad, i) => {
        const x = fx + Math.cos(rad) * R2;
        const y = fy + Math.sin(rad) * R2;
        const s = 7;
        return (
          <rect key={`h2-${i}`} x={x - s / 2} y={y - s / 2}
            width={s} height={s}
            fill="#060A13" stroke="#5AB0E8" strokeWidth="1.1" opacity="0.3" />
        );
      })}

      {/* ── Rotated selection bounding box (design-tool aesthetic) ── */}
      <g transform={`translate(${W * 0.65}, ${H * 0.38}) rotate(-24)`} opacity="0.18">
        <rect x={-170} y={-105} width={340} height={210}
          fill="none" stroke="#5AB0E8" strokeWidth="1"
          strokeDasharray="10 5" />
        {[[-170, -105], [170, -105], [170, 105], [-170, 105], [0, -105], [170, 0], [0, 105], [-170, 0]].map(([x, y], i) => (
          <rect key={i} x={x - 4.5} y={y - 4.5} width={9} height={9}
            fill="#060A13" stroke="#5AB0E8" strokeWidth="1.2" />
        ))}
      </g>

      {/* ── Second smaller rotated box ───────────────────────────── */}
      <g transform={`translate(${W * 0.72}, ${H * 0.68}) rotate(12)`} opacity="0.12">
        <rect x={-80} y={-55} width={160} height={110}
          fill="none" stroke="#5AB0E8" strokeWidth="0.8"
          strokeDasharray="6 4" />
        {[[-80, -55], [80, -55], [80, 55], [-80, 55]].map(([x, y], i) => (
          <rect key={i} x={x - 3.5} y={y - 3.5} width={7} height={7}
            fill="#060A13" stroke="#5AB0E8" strokeWidth="1" />
        ))}
      </g>

      {/* ── Glows ────────────────────────────────────────────────── */}
      <ellipse cx={fx} cy={fy} rx={420} ry={420} fill="url(#bp-glow-focal)" />
      <ellipse cx={W * 0.84} cy={H * 0.18} rx={300} ry={300} fill="url(#bp-glow-tr)" />
      <ellipse cx={W * 0.08} cy={H * 0.82} rx={220} ry={220} fill="url(#bp-glow-bl)" />

      {/* ── Blue solid accent blocks ─────────────────────────────── */}
      {/* Top-left anchor */}
      <rect x={0} y={0} width={96} height={58} fill="#122640" opacity="0.85" />
      <rect x={0} y={58} width={60} height={28} fill="#5AB0E8" opacity="0.13" />
      {/* Inner smaller block */}
      <rect x={8} y={8} width={48} height={30} fill="#5AB0E8" opacity="0.08" />

      {/* Right edge accent bar */}
      <rect x={W - 4} y={H * 0.22} width={4} height={H * 0.38}
        fill="#5AB0E8" opacity="0.38" />

      {/* Bottom-right block */}
      <rect x={W - 110} y={H - 90} width={110} height={90} fill="#122640" opacity="0.6" />
      <rect x={W - 75} y={H - 55} width={75} height={55} fill="#5AB0E8" opacity="0.07" />

      {/* Floating mid-right block */}
      <rect x={W * 0.88} y={H * 0.44} width={60} height={45}
        fill="#5AB0E8" opacity="0.11" />
      <rect x={W * 0.88} y={H * 0.44} width={60} height={45}
        fill="none" stroke="#5AB0E8" strokeWidth="0.8" opacity="0.3" />

      {/* ── Halftone dot zones ───────────────────────────────────── */}
      <rect x={W * 0.76} y={H * 0.02} width={160} height={200}
        fill="url(#bp-dots)" opacity="0.18" />
      <rect x={W * 0.04} y={H * 0.48} width={90} height={130}
        fill="url(#bp-dots-sm)" opacity="0.12" />

      {/* ── Dense binary data strip — left side ─────────────────── */}
      <g fill="#5AB0E8" opacity="0.075"
        fontFamily="'Space Mono', 'Courier New', monospace" fontSize="7">
        {binaryRows.map((row, i) => (
          <text key={i} x={108} y={72 + i * 11} letterSpacing="1.5">
            {row}
          </text>
        ))}
      </g>

      {/* ── Crosshair target marks ───────────────────────────────── */}
      {[
        [W * 0.13, H * 0.12, 14],
        [W * 0.86, H * 0.80, 12],
        [W * 0.50, H * 0.07, 10],
        [W * 0.25, H * 0.85, 11],
      ].map(([x, y, r], i) => (
        <g key={i} stroke="#5AB0E8" strokeWidth="0.8" opacity="0.3">
          <line x1={x - r} y1={y} x2={x + r} y2={y} />
          <line x1={x} y1={y - r} x2={x} y2={y + r} />
          <circle cx={x} cy={y} r={r * 0.6}
            fill="none" strokeDasharray="2 3" strokeWidth="0.6" />
        </g>
      ))}

      {/* ── Downward arrow indicator — top center ────────────────── */}
      <polygon
        points={`${W * 0.5},26 ${W * 0.5 - 11},46 ${W * 0.5 + 11},46`}
        fill="#5AB0E8" opacity="0.42"
      />

      {/* ── Thin rule segments at edges ──────────────────────────── */}
      <line x1={W * 0.04} y1={H * 0.28} x2={W * 0.14} y2={H * 0.28}
        stroke="#5AB0E8" strokeWidth="0.6" opacity="0.22" />
      <line x1={W * 0.83} y1={H * 0.72} x2={W * 0.96} y2={H * 0.72}
        stroke="#5AB0E8" strokeWidth="0.6" opacity="0.18" />
      <line x1={W * 0.6} y1={H * 0.94} x2={W * 0.75} y2={H * 0.94}
        stroke="#5AB0E8" strokeWidth="0.5" opacity="0.14" />

      {/* ── Focal star point ─────────────────────────────────────── */}
      <circle cx={fx} cy={fy} r={3} fill="#5AB0E8" opacity="0.55" />
      <circle cx={fx} cy={fy} r={6} fill="none" stroke="#5AB0E8"
        strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}
