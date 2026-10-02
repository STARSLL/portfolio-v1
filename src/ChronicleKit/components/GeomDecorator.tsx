export default function GeomDecorator() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Diagonal slash — top-right quadrant */}
      <div
        className="absolute"
        style={{
          top: 0,
          right: "18%",
          width: "1px",
          height: "70%",
          background: "linear-gradient(to bottom, transparent, rgba(90,176,232,0.07) 30%, rgba(90,176,232,0.07) 70%, transparent)",
          transform: "rotate(22deg)",
          transformOrigin: "top center",
        }}
      />

      {/* Diagonal slash — left quadrant */}
      <div
        className="absolute"
        style={{
          bottom: 0,
          left: "12%",
          width: "1px",
          height: "55%",
          background: "linear-gradient(to top, transparent, rgba(90,176,232,0.05) 40%, rgba(90,176,232,0.05) 60%, transparent)",
          transform: "rotate(-18deg)",
          transformOrigin: "bottom center",
        }}
      />

      {/* Top-right corner bracket */}
      <div className="absolute top-8 right-8 w-9 h-9 border-t border-r" style={{ borderColor: "rgba(90,176,232,0.22)" }} />

      {/* Bottom-left corner bracket */}
      <div className="absolute bottom-8 left-8 w-9 h-9 border-b border-l" style={{ borderColor: "rgba(90,176,232,0.22)" }} />

      {/* Dot grid — top-right */}
      <div className="absolute top-16 right-20 grid gap-2" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="w-[3px] h-[3px] rounded-full"
            style={{ background: `rgba(90,176,232,${0.12 + (i % 3) * 0.06})` }}
          />
        ))}
      </div>

      {/* Horizontal rule segment — decorative */}
      <div
        className="absolute left-0"
        style={{
          top: "42%",
          width: "6%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(90,176,232,0.18))",
        }}
      />
      <div
        className="absolute right-0"
        style={{
          top: "58%",
          width: "6%",
          height: "1px",
          background: "linear-gradient(to left, transparent, rgba(90,176,232,0.18))",
        }}
      />
    </div>
  );
}
