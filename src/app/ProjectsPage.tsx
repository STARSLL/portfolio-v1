import { useState, useMemo, useRef, useEffect, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { ProjectOverviewCard } from "../ChronicleKit";
import { useLanguage } from "./LanguageContext";

// ─── Filter tags ──────────────────────────────────────────────────
const FILTER_TAGS_ZH = [
  "产品设计",
  "交互设计",
  "用户研究",
  "原型开发",
  "可持续设计",
  "AI 辅助设计",
  "游戏/沉浸式体验",
  "CMF 设计",
];

const FILTER_TAGS_EN = [
  "Product Design",
  "Interaction Design",
  "User Research",
  "Prototyping",
  "Sustainable Design",
  "AI-Assisted Design",
  "Game / Immersive",
  "CMF Design",
];

// ─── Project data ─────────────────────────────────────────────────
interface Project {
  id: string;
  pinned?: boolean;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  pattern: "diag" | "grid" | "dots" | "cross" | "stripe" | "hex";
  award?: string;
  navigateTo?: string;
}

const ALL_PROJECTS_ZH: Project[] = [
  {
    id: "if-award",
    pinned: true,
    title: "Magic Fit O20 · 钛合金眼镜",
    subtitle: "iF DESIGN AWARD 2025 · WINNER",
    year: "2025",
    tags: ["产品设计", "CMF 设计"],
    pattern: "diag",
    award: "iF Award",
    navigateTo: "magicFitO20",
  },
  {
    id: "sage",
    pinned: true,
    title: "SAGE · 灵衡",
    subtitle: "基于智能自适应技术的姿态引导与可穿戴力学平衡系统",
    year: "2025",
    tags: ["产品设计", "用户研究", "原型开发", "可持续设计"],
    pattern: "cross",
    navigateTo: "sage",
  },
  {
    id: "paw-guardians",
    title: "Paw Guardians Alliance",
    subtitle: "校园流浪猫智能管理与服务系统",
    year: "2025",
    tags: ["用户研究", "交互设计", "产品设计", "原型开发"],
    pattern: "hex",
    navigateTo: "pawGuardians",
  },
  {
    id: "qin-qiang",
    pinned: true,
    title: "入戏·秦腔",
    subtitle: "个性化文创体验站设计",
    year: "2025",
    tags: ["体验设计", "AI 辅助设计", "交互设计", "游戏/沉浸式体验"],
    pattern: "stripe",
    navigateTo: "qinQiang",
  },
  {
    id: "echoes-of-healing",
    pinned: true,
    title: "回响疗愈",
    subtitle: "面向退伍军人的沉浸式心理疗愈体验系统设计",
    year: "2025",
    tags: ["服务设计", "VR体验", "AI辅助疗愈", "心理健康科技"],
    pattern: "dots",
    navigateTo: "echoesOfHealing",
  },
  {
    id: "arbor-guardian",
    pinned: true,
    title: "ArborGuardian",
    subtitle: "极端气候下的智能树木保护系统",
    year: "2025",
    tags: ["工业设计", "智能硬件", "生态科技", "可持续设计"],
    pattern: "dots",
    navigateTo: "arborGuardian",
  },
];

const ALL_PROJECTS_EN: Project[] = [
  {
    id: "if-award",
    pinned: true,
    title: "Magic Fit O20 · Titanium Eyewear",
    subtitle: "iF DESIGN AWARD 2025 · WINNER",
    year: "2025",
    tags: ["Product Design", "CMF Design"],
    pattern: "diag",
    award: "iF Award",
    navigateTo: "magicFitO20",
  },
  {
    id: "sage",
    pinned: true,
    title: "SAGE · Balance",
    subtitle: "Adaptive Posture-Guidance & Wearable Biomechanics System",
    year: "2025",
    tags: ["Product Design", "User Research", "Prototyping", "Sustainable Design"],
    pattern: "cross",
    navigateTo: "sage",
  },
  {
    id: "paw-guardians",
    title: "Paw Guardians Alliance",
    subtitle: "Smart Stray-Cat Management & Service System for Campus",
    year: "2025",
    tags: ["User Research", "Interaction Design", "Product Design", "Prototyping"],
    pattern: "hex",
    navigateTo: "pawGuardians",
  },
  {
    id: "qin-qiang",
    pinned: true,
    title: "Into Qin Opera",
    subtitle: "Personalized Cultural Experience Station",
    year: "2025",
    tags: ["Experience Design", "AI-Assisted Design", "Interaction Design", "Game / Immersive"],
    pattern: "stripe",
    navigateTo: "qinQiang",
  },
  {
    id: "echoes-of-healing",
    pinned: true,
    title: "Echoes of Healing",
    subtitle: "Immersive Psychological Healing Experience for Veterans",
    year: "2025",
    tags: ["Service Design", "VR Experience", "AI-Assisted Healing", "Mental Health Tech"],
    pattern: "dots",
    navigateTo: "echoesOfHealing",
  },
  {
    id: "arbor-guardian",
    pinned: true,
    title: "ArborGuardian",
    subtitle: "Intelligent Tree Protection System for Extreme Climate",
    year: "2025",
    tags: ["Industrial Design", "Smart Hardware", "Eco-Tech", "Sustainable Design"],
    pattern: "dots",
    navigateTo: "arborGuardian",
  },
];

// ─── Utilities ────────────────────────────────────────────────────
function ScrollReveal({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{
        duration: inView ? 0.58 : 0.32,
        delay: inView ? delay : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left font-mono py-2 transition-all duration-200 ${
        active
          ? "text-primary border-l-2 border-primary pl-2.5"
          : "text-muted-foreground/55 border-l border-primary/18 pl-3 hover:text-muted-foreground/80 hover:border-primary/38"
      }`}
      style={{ fontSize: "0.68rem", letterSpacing: "0.1em" }}
    >
      {label}
    </button>
  );
}

function MobileFilter({ tags, selected, onToggle, lang }: { tags: string[]; selected: string[]; onToggle: (t: string) => void; lang: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid rgba(90,176,232,0.14)", borderRadius: "2px" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 font-mono text-muted-foreground/55 tracking-widest"
        style={{ fontSize: "0.68rem" }}
      >
        <span>{lang === "zh" ? "筛选能力标签" : "Filter by Skills"}</span>
        <div className="flex items-center gap-3">
          {selected.length > 0 && (
            <span className="text-primary" style={{ fontSize: "0.62rem" }}>
              {selected.length} {lang === "zh" ? "已选" : "selected"}
            </span>
          )}
          <span className="text-primary/55">{open ? "−" : "+"}</span>
        </div>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "200px" : "0px" }}>
        <div className="px-4 pb-4 flex flex-wrap gap-2" style={{ borderTop: "1px solid rgba(90,176,232,0.10)" }}>
          <div className="w-full h-3" />
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              className={`font-mono px-3 py-1.5 transition-all duration-200 ${
                selected.includes(tag) ? "text-primary" : "text-muted-foreground/50 hover:text-muted-foreground/80"
              }`}
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                borderRadius: "2px",
                border: selected.includes(tag) ? "1px solid rgba(90,176,232,0.45)" : "1px solid rgba(90,176,232,0.14)",
                background: selected.includes(tag) ? "rgba(90,176,232,0.06)" : "transparent",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeaderBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <svg className="w-full h-full" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="hdr-glow" cx="15%" cy="70%" r="40%">
            <stop offset="0%" stopColor="#5AB0E8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#5AB0E8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="420" fill="url(#hdr-glow)" />
        <line x1="0" y1="420" x2="360" y2="0" stroke="rgba(90,176,232,0.04)" strokeWidth="0.8" />
        <line x1="1440" y1="420" x2="1080" y2="0" stroke="rgba(90,176,232,0.04)" strokeWidth="0.8" />
        <line x1="0" y1="1" x2="1440" y2="1" stroke="rgba(90,176,232,0.06)" strokeWidth="0.5" />
        <circle cx="180" cy="310" r="90" fill="none" stroke="rgba(90,176,232,0.045)" strokeWidth="0.6" strokeDasharray="5 12" />
        <circle cx="1280" cy="100" r="55" fill="none" stroke="rgba(90,176,232,0.04)" strokeWidth="0.6" strokeDasharray="3 9" />
        <g stroke="rgba(90,176,232,0.22)" strokeWidth="0.9">
          <line x1="32" y1="32" x2="64" y2="32" />
          <line x1="32" y1="32" x2="32" y2="64" />
        </g>
        <g stroke="rgba(90,176,232,0.18)" strokeWidth="0.9">
          <line x1="1408" y1="32" x2="1376" y2="32" />
          <line x1="1408" y1="32" x2="1408" y2="64" />
        </g>
        <g stroke="rgba(90,176,232,0.22)" strokeWidth="0.7">
          <line x1="90" y1="180" x2="110" y2="180" />
          <line x1="100" y1="170" x2="100" y2="190" />
        </g>
      </svg>
    </div>
  );
}

// ─── Projects Page ────────────────────────────────────────────────
export default function ProjectsPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const { lang } = useLanguage();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const FILTER_TAGS = lang === "zh" ? FILTER_TAGS_ZH : FILTER_TAGS_EN;
  const ALL_PROJECTS = lang === "zh" ? ALL_PROJECTS_ZH : ALL_PROJECTS_EN;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset filters when language changes (tags differ between langs)
  useEffect(() => {
    setSelectedFilters([]);
  }, [lang]);

  const sortedProjects = useMemo(() => {
    const pinned = ALL_PROJECTS.filter((p) => p.pinned);
    const others = ALL_PROJECTS.filter((p) => !p.pinned).sort((a, b) => b.year.localeCompare(a.year));
    return [...pinned, ...others];
  }, [ALL_PROJECTS]);

  const filteredProjects = useMemo(() => {
    if (selectedFilters.length === 0) return sortedProjects;
    return sortedProjects.filter((p) => p.tags.some((tag) => selectedFilters.includes(tag)));
  }, [selectedFilters, sortedProjects]);

  const toggleFilter = (tag: string) => {
    setSelectedFilters((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const EASE_OUT = [0.16, 1, 0.3, 1] as const;

  return (
    <div
      className="min-h-screen text-foreground"
      style={{ fontFamily: "'Space Grotesk', 'Noto Serif SC', system-ui, sans-serif" }}
    >
      {/* ─── Page header ──────────────────────────────────────── */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <HeaderBg />
        <div className="relative max-w-7xl mx-auto px-8 md:px-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="font-mono text-xs text-muted-foreground/35 tracking-widest">─ 002 ─</span>
            <span className="font-mono text-xs tracking-[0.22em] uppercase text-muted-foreground/45">
              {lang === "zh" ? "项目档案" : "PROJECT ARCHIVE"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE_OUT }}
            className="font-bold leading-none tracking-tighter text-foreground"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            {lang === "zh" ? "项目展示" : "PROJECTS"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: EASE_OUT }}
            className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md"
          >
            {lang === "zh"
              ? "探索实体产品、数字交互与沉浸式体验中的设计实践。"
              : "Design practice across physical products, digital interaction, and immersive experience."}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.36, ease: EASE_OUT }}
            className="mt-12 h-px w-full origin-left"
            style={{ background: "rgba(90,176,232,0.14)" }}
          />
        </div>
      </section>

      {/* ─── Main content ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 md:px-14 pb-32">
        <div className="flex gap-10 lg:gap-14">

          {/* ── Desktop sidebar ── */}
          <aside className="hidden lg:block w-44 flex-shrink-0">
            <div className="sticky top-24">
              <p className="font-mono text-muted-foreground/28 uppercase tracking-widest mb-5" style={{ fontSize: "0.58rem" }}>
                {lang === "zh" ? "能力范围" : "SKILL AREAS"}
              </p>
              <div className="space-y-0.5">
                {FILTER_TAGS.map((tag) => (
                  <FilterButton
                    key={tag}
                    label={tag}
                    active={selectedFilters.includes(tag)}
                    onClick={() => toggleFilter(tag)}
                  />
                ))}
              </div>
              <div className="my-6 h-px" style={{ background: "rgba(90,176,232,0.07)" }} />
              <p className="font-mono text-muted-foreground/25 tracking-widest" style={{ fontSize: "0.58rem" }}>
                {filteredProjects.length} / {ALL_PROJECTS.length} {lang === "zh" ? "项目" : "projects"}
              </p>
              {selectedFilters.length > 0 && (
                <button
                  onClick={() => setSelectedFilters([])}
                  className="block mt-3 font-mono text-primary/55 hover:text-primary transition-colors duration-200 tracking-widest"
                  style={{ fontSize: "0.6rem" }}
                >
                  {lang === "zh" ? "清除筛选 ×" : "Clear filters ×"}
                </button>
              )}
              <div className="mt-10 space-y-1 opacity-20">
                <div className="h-px w-8" style={{ background: "rgba(90,176,232,0.6)" }} />
                <div className="h-px w-5" style={{ background: "rgba(90,176,232,0.4)" }} />
                <div className="h-px w-3" style={{ background: "rgba(90,176,232,0.3)" }} />
              </div>
            </div>
          </aside>

          {/* ── Main column ── */}
          <main className="flex-1 min-w-0 pt-2">
            <div className="lg:hidden mb-8">
              <MobileFilter tags={FILTER_TAGS} selected={selectedFilters} onToggle={toggleFilter} lang={lang} />
            </div>

            <div className="flex items-center justify-between mb-8">
              <p className="font-mono text-muted-foreground/30 tracking-widest" style={{ fontSize: "0.6rem" }}>
                {selectedFilters.length === 0
                  ? (lang === "zh" ? "全部项目 · 时间倒序" : "All projects · Newest first")
                  : (lang === "zh"
                      ? `筛选结果 · ${filteredProjects.length} 项匹配`
                      : `Filtered · ${filteredProjects.length} match${filteredProjects.length !== 1 ? "es" : ""}`)}
              </p>
              <p className="lg:hidden font-mono text-muted-foreground/25 tracking-widest" style={{ fontSize: "0.58rem" }}>
                {filteredProjects.length} / {ALL_PROJECTS.length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project, i) => (
                <ScrollReveal key={project.id} delay={Math.min(i * 0.055, 0.3)}>
                  <div
                    onClick={() => project.navigateTo && onNavigate?.(project.navigateTo)}
                    style={{ cursor: project.navigateTo ? "pointer" : "default" }}
                  >
                    <ProjectOverviewCard {...project} />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="py-28 text-center font-mono text-muted-foreground/30 tracking-widest" style={{ fontSize: "0.72rem" }}>
                <p>{lang === "zh" ? "无匹配项目" : "No matching projects"}</p>
                <button
                  onClick={() => setSelectedFilters([])}
                  className="mt-4 text-primary/50 hover:text-primary transition-colors duration-200"
                >
                  {lang === "zh" ? "清除筛选" : "Clear filters"}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <div className="relative" style={{ background: "rgba(6,10,19,0.80)" }}>
        <div className="mx-8 md:mx-14" style={{ height: "1px", background: "rgba(90,176,232,0.07)" }} />
        <div className="py-10 px-8 md:px-14 flex items-center justify-between font-mono text-xs tracking-[0.18em] text-muted-foreground/28">
          <span>CHRONICLE KIT v1.0</span>
          <span>{lang === "zh" ? "记录者工具包" : "The Chronicler's Toolkit"}</span>
        </div>
      </div>
    </div>
  );
}
