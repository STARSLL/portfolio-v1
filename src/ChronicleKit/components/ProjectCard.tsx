import { motion } from "motion/react";
import TagChip from "./TagChip";

interface ProjectCardProps {
  index: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  tags: string[];
}

export default function ProjectCard({
  index,
  category,
  title,
  subtitle,
  description,
  year,
  tags,
}: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col p-6 cursor-pointer"
      style={{
        background: "rgba(22,46,80,0.78)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(90,176,232,0.24)",
        clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
      }}
    >
      {/* Top: index + category */}
      <div className="flex items-start justify-between mb-5">
        <span className="font-mono text-xs text-muted-foreground/60 tracking-widest">
          {index}
        </span>
        <TagChip variant="muted">{category}</TagChip>
      </div>

      {/* Thin separator */}
      <div className="w-full h-px mb-5" style={{ background: "rgba(90,176,232,0.18)" }} />

      {/* Title block */}
      <div className="mb-3 flex-grow">
        <p className="text-lg font-semibold text-foreground leading-snug tracking-tight mb-1">
          {title}
        </p>
        <p className="font-mono text-xs text-muted-foreground tracking-widest">
          {subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(200,216,238,0.72)" }}>
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-muted-foreground/65">{year}</span>
          {tags.map((tag, i) => (
            <span key={i} className="font-mono text-xs text-muted-foreground/50">
              · {tag}
            </span>
          ))}
        </div>
        {/* Arrow indicator */}
        <span className="font-mono text-xs text-primary/55 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 inline-block">
          →
        </span>
      </div>

      {/* Hover accent: left edge line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(90,176,232,0.6), transparent)" }}
      />
    </motion.article>
  );
}
