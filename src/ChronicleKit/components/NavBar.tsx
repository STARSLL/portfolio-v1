import { useState, useEffect, useRef, ReactNode } from "react";

interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavBarProps {
  links?: NavLink[];
  logoCode?: string;
  activeLabel?: string;
  rightSlot?: ReactNode;
}

const defaultLinks: NavLink[] = [
  { label: "首页", href: "#" },
  { label: "项目展示", href: "#projects" },
  { label: "个人资料", href: "#about" },
];

export default function NavBar({ links = defaultLinks, logoCode = "CR-∞", activeLabel, rightSlot }: NavBarProps) {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 60 || y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 h-14 backdrop-blur-lg border-b border-primary/10 bg-background/75 transition-transform duration-300"
        style={{ transform: visible ? "translateY(0)" : "translateY(-100%)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 border border-primary/60 rotate-45 flex-shrink-0"
            style={{ background: "rgba(90,176,232,0.08)" }}
          />
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground select-none">
            {logoCode}
          </span>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 mr-3">
          {links.map((link, i) => {
            const isActive = activeLabel === link.label;
            return (
              <li key={i}>
                {/* using <a> instead of NavLink: no react-router configured in this project */}
                <a
                  href={link.href ?? "#"}
                  onClick={
                    link.onClick
                      ? (e) => { e.preventDefault(); link.onClick!(); }
                      : undefined
                  }
                  className={`relative font-mono text-xs tracking-widest transition-colors duration-200 group ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-primary/60 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right slot (e.g. language toggle) — visible on both desktop and mobile */}
        {rightSlot && <div className="hidden md:flex items-center">{rightSlot}</div>}

        {/* Mobile hamburger — three-line icon */}
        <button
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
        >
          <span
            className="font-mono text-base text-foreground/70 select-none transition-all duration-200"
            style={{ opacity: menuOpen ? 0 : 1, position: menuOpen ? "absolute" : "relative" }}
          >
            ≡
          </span>
          <span
            className="font-mono text-base text-foreground/70 select-none transition-all duration-200"
            style={{ opacity: menuOpen ? 1 : 0, position: menuOpen ? "relative" : "absolute" }}
          >
            ×
          </span>
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden flex flex-col px-8 pt-24 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(6,10,19,0.97)", backdropFilter: "blur(20px)" }}
        onClick={() => setMenuOpen(false)}
      >
        {/* Horizontal rule */}
        <div className="h-px mb-10 w-12" style={{ background: "rgba(90,176,232,0.25)" }} />

        <ul className="space-y-8">
          {links.map((link, i) => {
            const isActive = activeLabel === link.label;
            return (
              <li key={i}>
                <a
                  href={link.href ?? "#"}
                  onClick={(e) => {
                    if (link.onClick) { e.preventDefault(); link.onClick(); }
                    setMenuOpen(false);
                  }}
                  className={`font-mono text-2xl tracking-[0.15em] transition-colors duration-200 block ${
                    isActive ? "text-primary" : "text-muted-foreground/70"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {rightSlot && (
          <div className="mt-10" onClick={(e) => e.stopPropagation()}>
            {rightSlot}
          </div>
        )}
        <div className="mt-auto pb-12 font-mono text-xs text-muted-foreground/20 tracking-widest">
          {logoCode}
        </div>
      </div>
    </>
  );
}
