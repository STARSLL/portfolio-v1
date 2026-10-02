import { motion } from "motion/react";

export interface ProjectOverviewCardProps {
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  pattern?: "diag" | "grid" | "dots" | "cross" | "stripe" | "hex";
  award?: string;
  pinned?: boolean;
}

type PatternKey = "diag" | "grid" | "dots" | "cross" | "stripe" | "hex";

const PATTERNS: Record<PatternKey, React.CSSProperties> = {
  diag: {
    backgroundImage:
      "repeating-linear-gradient(45deg, rgba(90,176,232,0.055) 0px, rgba(90,176,232,0.055) 1px, transparent 1px, transparent 20px)",
  },
  grid: {
    backgroundImage: [
      "linear-gradient(rgba(90,176,232,0.07) 1px, transparent 1px)",
      "linear-gradient(90deg, rgba(90,176,232,0.07) 1px, transparent 1px)",
    ].join(","),
    backgroundSize: "28px 28px",
  },
  dots: {
    backgroundImage: "radial-gradient(rgba(90,176,232,0.2) 1.2px, transparent 1.2px)",
    backgroundSize: "18px 18px",
  },
  cross: {
    backgroundImage: [
      "repeating-linear-gradient(0deg, rgba(90,176,232,0.055) 0px, rgba(90,176,232,0.055) 1px, transparent 1px, transparent 32px)",
      "repeating-linear-gradient(90deg, rgba(90,176,232,0.055) 0px, rgba(90,176,232,0.055) 1px, transparent 1px, transparent 32px)",
    ].join(","),
  },
  stripe: {
    backgroundImage:
      "repeating-linear-gradient(0deg, rgba(90,176,232,0.07) 0px, rgba(90,176,232,0.07) 1px, transparent 1px, transparent 22px)",
  },
  hex: {
    backgroundImage: [
      "repeating-linear-gradient(60deg, rgba(90,176,232,0.045) 0px, rgba(90,176,232,0.045) 1px, transparent 1px, transparent 14px)",
      "repeating-linear-gradient(-60deg, rgba(90,176,232,0.045) 0px, rgba(90,176,232,0.045) 1px, transparent 1px, transparent 14px)",
    ].join(","),
  },
};

export default function ProjectOverviewCard({
  title,
  subtitle,
  year,
  tags,
  pattern = "grid",
  award,
  pinned,
}: ProjectOverviewCardProps) {
  const patternStyle = PATTERNS[pattern] ?? PATTERNS.grid;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col cursor-pointer overflow-hidden"
      style={{ border: "1px solid rgba(90,176,232,0.18)", borderRadius: "4px" }}
    >
      {/* ── Cover — 16:9 ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: "linear-gradient(140deg, #0e1f3c 0%, #081830 100%)",
          borderBottom: "1px solid rgba(90,176,232,0.12)",
          ...patternStyle,
        }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 28% 38%, rgba(90,176,232,0.09) 0%, transparent 55%)",
          }}
        />

        {/* Award badge */}
        {award && (
          <div
            className="absolute top-3 left-3 font-mono tracking-widest px-2 py-0.5"
            style={{
              fontSize: "0.58rem",
              border: "1px solid rgba(212,168,83,0.5)",
              color: "#d4a853",
              background: "rgba(212,168,83,0.06)",
              letterSpacing: "0.16em",
            }}
          >
            {award}
          </div>
        )}

        {/* Pinned indicator (no award) */}
        {pinned && !award && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 font-mono"
            style={{ fontSize: "0.58rem", color: "rgba(90,176,232,0.55)", letterSpacing: "0.15em" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
            SELECTED
          </div>
        )}

        {/* Corner brackets */}
        <div
          className="absolute top-2.5 right-2.5 w-5 h-5 border-t border-r pointer-events-none"
          style={{ borderColor: "rgba(90,176,232,0.28)" }}
        />
        <div
          className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l pointer-events-none"
          style={{ borderColor: "rgba(90,176,232,0.16)" }}
        />

        {/* Hover: view label */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span
            className="font-mono text-primary/65 tracking-widest"
            style={{ fontSize: "0.65rem" }}
          >
            查看项目 →
          </span>
        </div>
      </div>

      {/* ── Info section ── */}
      <div
        className="p-4 rounded-[4px]"
        style={{
          background: "rgba(10,21,37,0.90)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <p className="text-sm font-semibold text-foreground tracking-tight leading-snug mb-1">
          {title}
        </p>
        <p
          className="font-mono text-muted-foreground/45 mb-3 tracking-widest"
          style={{ fontSize: "0.6rem" }}
        >
          {subtitle}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-x-0 gap-y-0.5">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="font-mono text-muted-foreground/55 group-hover:text-primary/65 transition-colors duration-200"
                style={{ fontSize: "0.62rem", letterSpacing: "0.08em" }}
              >
                {i > 0 && <span className="opacity-35 mx-1">·</span>}
                {tag}
              </span>
            ))}
          </div>
          <span
            className="font-mono text-muted-foreground/28 flex-shrink-0 ml-2"
            style={{ fontSize: "0.6rem" }}
          >
            {year}
          </span>
        </div>
      </div>

      {/* Hover: left edge accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(90,176,232,0.55), transparent)",
        }}
      />

      {/* Hover: border highlight via inset shadow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(90,176,232,0.38)", borderRadius: "4px" }}
      />
    </motion.article>
  );
}
