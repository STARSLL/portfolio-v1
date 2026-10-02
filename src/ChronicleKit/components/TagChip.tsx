import { ReactNode } from "react";
import { clsx } from "clsx";

interface TagChipProps {
  children: ReactNode;
  variant?: "default" | "active" | "muted";
  className?: string;
}

export default function TagChip({ children, variant = "default", className }: TagChipProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 py-1 font-mono text-xs tracking-[0.18em] uppercase transition-all duration-200",
        variant === "default" && [
          "border border-primary/20 text-primary/55 bg-primary/5",
          "hover:border-primary/45 hover:text-primary/85 hover:bg-primary/8",
        ],
        variant === "active" && "border border-primary/55 text-primary bg-primary/12",
        variant === "muted" && "border border-border text-muted-foreground bg-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
