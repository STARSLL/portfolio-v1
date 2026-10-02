import { ReactNode } from "react";
import { clsx } from "clsx";

interface ButtonProps {
  children: ReactNode;
  variant?: "outline" | "ghost";
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, variant = "outline", onClick, className }: ButtonProps) {
  return (
    /* using <button> directly: kit Button is the primary interactive CTA with no kit alternative */
    <button
      onClick={onClick}
      className={clsx(
        "group relative inline-flex items-center gap-5 font-mono text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer",
        variant === "outline" && [
          "px-10 py-3.5 border border-border text-muted-foreground",
          "hover:border-primary/45 hover:text-foreground",
        ],
        variant === "ghost" && [
          "px-6 py-3 text-muted-foreground hover:text-foreground",
        ],
        className
      )}
    >
      <span className="w-7 h-px bg-muted-foreground/30 group-hover:bg-primary/55 group-hover:w-10 transition-all duration-300" />
      <span>{children}</span>
      <span className="w-7 h-px bg-muted-foreground/30 group-hover:bg-primary/55 group-hover:w-10 transition-all duration-300" />
    </button>
  );
}
