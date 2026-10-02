import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { TagChip, Button, BlueprintBg } from "../ChronicleKit";
import { useLanguage } from "./LanguageContext";
import imgMagicFit  from "@/imports/30.jpg";
import imgPawGuard  from "@/imports/04.jpg";
import imgQinQiang  from "@/imports/21/b7c6a037719a4b157e14d3d95e12437fa8b80d4f.png";

interface HomePageProps {
  onNavigateToProjects: () => void;
  onNavigateToProfile: () => void;
  onNavigateToProject?: (id: string) => void;
}

function ScrollReveal({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 44, scale: inView ? 1 : 0.965 }}
      transition={{ duration: inView ? 0.68 : 0.42, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

function ProjectsSectionBg() {
  const W = 1920, H = 900;
  const dirs8 = Array.from({ length: 8 }, (_, i) => (i * 45 * Math.PI) / 180);
  const cx = W * 0.5, cy = H * 0.5;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="ps-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5AB0E8" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#5AB0E8" stopOpacity="0" />
          </radialGradient>
          <pattern id="ps-dots" x="0" y="0" width="11" height="11" patternUnits="userSpaceOnUse">
            <circle cx="5.5" cy="5.5" r="1.1" fill="#5AB0E8" />
          </pattern>
        </defs>
        <ellipse cx={cx} cy={cy} rx={700} ry={500} fill="url(#ps-glow)" />
        {dirs8.map((rad, i) => (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(rad) * 820} y2={cy + Math.sin(rad) * 820}
            stroke="rgba(90,176,232,0.04)" strokeWidth="0.8"
          />
        ))}
        <circle cx={cx} cy={cy} r={280} fill="none" stroke="#5AB0E8" strokeWidth="0.7" strokeDasharray="6 12" opacity="0.1" />
        <circle cx={cx} cy={cy} r={460} fill="none" stroke="#5AB0E8" strokeWidth="0.5" strokeDasharray="3 18" opacity="0.055" />
        {dirs8.filter((_, i) => i % 2 === 0).map((rad, i) => {
          const x = cx + Math.cos(rad) * 280, y = cy + Math.sin(rad) * 280;
          return <rect key={i} x={x - 4} y={y - 4} width={8} height={8} fill="none" stroke="#5AB0E8" strokeWidth="1" opacity="0.28" />;
        })}
        <line x1={0} y1={100} x2={280} y2={H} stroke="rgba(90,176,232,0.035)" strokeWidth="0.8" />
        <line x1={W} y1={120} x2={W - 260} y2={H} stroke="rgba(90,176,232,0.035)" strokeWidth="0.8" />
        <rect x={18} y={18} width={130} height={170} fill="url(#ps-dots)" opacity="0.12" />
        <rect x={W - 148} y={H - 188} width={130} height={170} fill="url(#ps-dots)" opacity="0.09" />
        {[[60, 50], [W - 60, H - 50]].map(([x, y], i) => (
          <g key={i} stroke="#5AB0E8" strokeWidth="0.8" opacity="0.28">
            <line x1={x - 12} y1={y} x2={x + 12} y2={y} />
            <line x1={x} y1={y - 12} x2={x} y2={y + 12} />
          </g>
        ))}
        <line x1={0} y1={H * 0.5} x2={200} y2={H * 0.5} stroke="rgba(90,176,232,0.08)" strokeWidth="0.6" strokeDasharray="5 8" />
        <line x1={W - 200} y1={H * 0.5} x2={W} y2={H * 0.5} stroke="rgba(90,176,232,0.08)" strokeWidth="0.6" strokeDasharray="5 8" />
      </svg>
    </div>
  );
}

function AboutSectionBg() {
  const W = 1920, H = 900;
  const cx = W * 0.5, cy = H * 0.5;
  const rays = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <radialGradient id="ab-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5AB0E8" stopOpacity="0.11" />
            <stop offset="60%" stopColor="#5AB0E8" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#5AB0E8" stopOpacity="0" />
          </radialGradient>
          <pattern id="ab-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.1" fill="#5AB0E8" />
          </pattern>
        </defs>
        <ellipse cx={cx} cy={cy} rx={680} ry={520} fill="url(#ab-glow)" />
        {rays.map((rad, i) => (
          <line key={i} x1={cx} y1={cy}
            x2={cx + Math.cos(rad) * 750} y2={cy + Math.sin(rad) * 750}
            stroke="rgba(90,176,232,0.045)" strokeWidth="0.8"
          />
        ))}
        <circle cx={cx} cy={cy} r={180} fill="none" stroke="#5AB0E8" strokeWidth="0.8" strokeDasharray="7 6" opacity="0.14" />
        <circle cx={cx} cy={cy} r={320} fill="none" stroke="#5AB0E8" strokeWidth="0.6" strokeDasharray="4 12" opacity="0.09" />
        <circle cx={cx} cy={cy} r={480} fill="none" stroke="#5AB0E8" strokeWidth="0.5" strokeDasharray="2 18" opacity="0.05" />
        {rays.filter((_, i) => i % 3 === 0).map((rad, i) => {
          const x = cx + Math.cos(rad) * 180, y = cy + Math.sin(rad) * 180;
          return <rect key={i} x={x - 4.5} y={y - 4.5} width={9} height={9} fill="none" stroke="#5AB0E8" strokeWidth="1.1" opacity="0.35" />;
        })}
        <circle cx={cx} cy={cy} r={3} fill="#5AB0E8" opacity="0.5" />
        <circle cx={cx} cy={cy} r={7} fill="none" stroke="#5AB0E8" strokeWidth="0.8" opacity="0.25" />
        <rect x={20} y={20} width={110} height={150} fill="url(#ab-dots)" opacity="0.13" />
        <rect x={W - 130} y={20} width={110} height={150} fill="url(#ab-dots)" opacity="0.1" />
        {([
          [40, 40, 1, 1],
          [W - 40, 40, -1, 1],
          [40, H - 40, 1, -1],
          [W - 40, H - 40, -1, -1],
        ] as [number, number, number, number][]).map(([x, y, sx, sy], i) => (
          <g key={i} stroke="rgba(90,176,232,0.25)" strokeWidth="0.9">
            <line x1={x} y1={y} x2={x + sx * 30} y2={y} />
            <line x1={x} y1={y} x2={x} y2={y + sy * 30} />
          </g>
        ))}
        <rect x={W * 0.08} y={H * 0.3} width={50} height={35} fill="none" stroke="#5AB0E8" strokeWidth="0.7" opacity="0.18" />
        <rect x={W * 0.88} y={H * 0.6} width={50} height={35} fill="none" stroke="#5AB0E8" strokeWidth="0.7" opacity="0.15" />
      </svg>
    </div>
  );
}

const PROJECTS_ZH = [
  {
    index: "01",
    title: "Magic Fit O20",
    subtitle: "3D打印定制化钛合金眼镜",
    award: "iF Design Award 2025 获奖作品",
    description: "基于钛合金3D打印技术与模块化结构设计，实现个性化适配的定制化眼镜设计。",
    year: "2025",
    tags: ["工业设计", "产品设计", "材料创新"],
    image: imgMagicFit,
    navigateTo: "magicFitO20",
  },
  {
    index: "02",
    title: "Paw Guardians",
    subtitle: "宠物智能陪伴服务设计",
    award: null,
    description: "通过智能硬件、服务系统和用户研究，探索人与宠物之间的情感陪伴体验。",
    year: "2025",
    tags: ["服务设计", "用户体验设计", "智能产品"],
    image: imgPawGuard,
    navigateTo: "pawGuardians",
  },
  {
    index: "03",
    title: "入戏·秦腔",
    subtitle: "个性化文创体验站设计",
    award: null,
    description: "通过人工智能生成、数字角色设计和沉浸式体验，让用户参与秦腔文化的个性化创造。",
    year: "2025",
    tags: ["体验设计", "文化创新", "AIGC交互", "XR体验"],
    image: imgQinQiang,
    navigateTo: "qinQiang",
  },
];

const PROJECTS_EN = [
  {
    index: "01",
    title: "Magic Fit O20",
    subtitle: "3D-Printed Titanium Custom Eyewear",
    award: "iF Design Award 2025 Winner",
    description: "Custom eyewear designed through titanium 3D printing and a modular structural system that enables precise personal fit.",
    year: "2025",
    tags: ["Industrial Design", "Product Design", "Material Innovation"],
    image: imgMagicFit,
    navigateTo: "magicFitO20",
  },
  {
    index: "02",
    title: "Paw Guardians",
    subtitle: "Smart Pet Companionship Service Design",
    award: null,
    description: "Exploring emotional companionship between humans and pets through intelligent hardware, service systems, and user research.",
    year: "2025",
    tags: ["Service Design", "UX Design", "Smart Product"],
    image: imgPawGuard,
    navigateTo: "pawGuardians",
  },
  {
    index: "03",
    title: "Into Qin Opera",
    subtitle: "Personalized Cultural Experience Station",
    award: null,
    description: "Inviting users to co-create with Qin Opera culture through AI generation, digital character design, and immersive interaction.",
    year: "2025",
    tags: ["Experience Design", "Cultural Innovation", "AIGC Interaction", "XR Experience"],
    image: imgQinQiang,
    navigateTo: "qinQiang",
  },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE_OUT },
});

export default function HomePage({ onNavigateToProjects, onNavigateToProfile, onNavigateToProject }: HomePageProps) {
  const { lang } = useLanguage();
  const PROJECTS = lang === "zh" ? PROJECTS_ZH : PROJECTS_EN;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute rounded-full" style={{
            left: "38%", top: "58%", width: "720px", height: "720px",
            background: "radial-gradient(circle, rgba(90,176,232,0.09) 0%, rgba(90,176,232,0.03) 45%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }} />
          <div className="absolute rounded-full" style={{
            right: "12%", top: "16%", width: "480px", height: "480px",
            background: "radial-gradient(circle, rgba(90,176,232,0.07) 0%, transparent 70%)",
            transform: "translate(50%, -50%)",
          }} />
          <div className="absolute rounded-full" style={{
            left: "5%", bottom: "10%", width: "320px", height: "320px",
            background: "radial-gradient(circle, rgba(90,176,232,0.05) 0%, transparent 70%)",
            transform: "translate(-50%, 50%)",
          }} />
        </div>

        <BlueprintBg />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 pt-14">
          <motion.div
            {...fadeUp(0.1)}
            className="flex items-center justify-between mb-6 font-mono text-xs tracking-[0.18em] text-muted-foreground"
          >
            <span>{lang === "zh" ? "档案编号: CR-∞" : "FILE NO.: CR-∞"}</span>
            <span className="hidden sm:block">PORTFOLIO · 2026</span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
            className="w-full h-px mb-12 origin-left"
            style={{ background: "rgba(90,176,232,0.18)" }}
          />

          <div className="mb-8">
            <motion.p {...fadeUp(0.35)} className="font-bold leading-none tracking-tighter text-foreground" style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}>
              PRODUCT
            </motion.p>
            <motion.p {...fadeUp(0.45)} className="font-bold leading-none tracking-tighter text-primary" style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}>
              DESIGNER ·
            </motion.p>
            <motion.p {...fadeUp(0.55)} className="font-bold leading-none tracking-tighter text-foreground" style={{ fontSize: "clamp(3.2rem, 9vw, 8.5rem)" }}>
              ENGINEER
            </motion.p>
          </div>

          <motion.div {...fadeUp(0.65)} className="flex items-center gap-3 mb-8 font-mono text-sm tracking-[0.25em] text-muted-foreground">
            <span className="w-6 h-px" style={{ background: "rgba(90,176,232,0.35)" }} />
            <span>{lang === "zh" ? "工业 × 交互 × 技术" : "INDUSTRIAL × INTERACTION × TECHNOLOGY"}</span>
            <span className="w-6 h-px" style={{ background: "rgba(90,176,232,0.35)" }} />
          </motion.div>

          <motion.div {...fadeUp(0.75)} className="flex flex-wrap gap-2.5">
            <TagChip variant="active">INDUSTRIAL</TagChip>
            <TagChip>INTERACTION</TagChip>
            <TagChip>TECHNOLOGY</TagChip>
          </motion.div>

          <motion.div
            {...fadeUp(0.9)}
            className="absolute bottom-8 left-8 right-8 md:left-14 md:right-14 flex items-center justify-between font-mono text-xs tracking-[0.18em] text-muted-foreground/50"
          >
            <span>{lang === "zh" ? "↓ 探索项目" : "↓ EXPLORE WORK"}</span>
            <span>SCROLL 001/∞</span>
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────────────────── */}
      <section id="projects" className="relative py-28 overflow-hidden">
        <ProjectsSectionBg />

        <div className="relative z-10 px-8 md:px-14 max-w-7xl mx-auto">
          <ScrollReveal delay={0}>
            <div className="flex items-center gap-4 mb-16">
              <span className="font-mono text-xs text-muted-foreground/40 tracking-widest">─ 002 ─</span>
              <span className="font-mono text-xs tracking-[0.22em] uppercase text-muted-foreground">
                {lang === "zh" ? "最新项目" : "FEATURED PROJECTS"}
              </span>
              <span className="flex-1 h-px" style={{ background: "rgba(90,176,232,0.1)" }} />
              <span className="font-mono text-xs text-muted-foreground/30 tracking-widest">
                {PROJECTS.length} / ∞
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, i) => (
              <ScrollReveal key={project.index} delay={i * 0.11}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onNavigateToProject?.(project.navigateTo)}
                  className="group relative flex flex-col cursor-pointer overflow-hidden"
                  style={{
                    background: "rgba(22,46,80,0.78)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(90,176,232,0.24)",
                    clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
                  }}
                >
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: "100%", height: "100%", objectFit: "cover", display: "block",
                        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                      }}
                      className="group-hover:scale-105"
                    />
                    {project.award && (
                      <div style={{
                        position: "absolute", top: "10px", left: "10px",
                        background: "rgba(200,32,42,0.88)", backdropFilter: "blur(6px)",
                        padding: "3px 9px",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.55rem", letterSpacing: "0.12em",
                        color: "#fff",
                      }}>
                        {project.award}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-grow p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="font-mono text-xs text-primary/40 tracking-widest flex-shrink-0 mt-0.5">
                        {project.index}
                      </span>
                      <div>
                        <p className="text-base font-semibold text-foreground leading-snug tracking-tight">
                          {project.title}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground tracking-wider mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-mono text-xs text-muted-foreground/55 border border-primary/10 px-2 py-0.5" style={{ fontSize: "0.6rem", letterSpacing: "0.06em" }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm leading-relaxed flex-grow" style={{ color: "rgba(200,216,238,0.66)", fontSize: "0.8rem" }}>
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid rgba(90,176,232,0.12)" }}>
                      <span className="font-mono text-xs text-muted-foreground/40">{project.year}</span>
                      <span className="font-mono text-xs text-primary/55 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 inline-block">
                        {lang === "zh" ? "查看项目 →" : "VIEW PROJECT →"}
                      </span>
                    </div>
                  </div>

                  <div
                    className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to bottom, transparent, rgba(90,176,232,0.6), transparent)" }}
                  />
                </motion.article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.28}>
            <div className="mt-16 flex justify-center">
              <Button onClick={onNavigateToProjects}>
                {lang === "zh" ? "了解更多项目" : "View All Projects"}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── ABOUT ME CTA ─────────────────────────────────────────── */}
      <section id="about" className="relative py-32 overflow-hidden">
        <AboutSectionBg />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 flex flex-col items-center text-center">
          <ScrollReveal>
            <span className="font-mono text-xs tracking-[0.22em] text-muted-foreground/35 block mb-14">
              ─ 003 ─
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="mb-6">
              <p className="font-bold tracking-tighter text-foreground leading-none" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
                ABOUT THE
              </p>
              <p className="font-bold tracking-tighter text-primary leading-none" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
                CREATOR
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed mb-14">
              {lang === "zh" ? (
                <>设计师、工程师、创造者。<br />在工业交互与前沿技术的交叉地带<br />探索与构建。</>
              ) : (
                <>Designer. Engineer. Creator.<br />Exploring and building at the intersection<br />of industrial interaction and emerging technology.</>
              )}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.28}>
            <button
              onClick={onNavigateToProfile}
              className="group relative inline-flex items-center gap-5 px-12 py-4 font-mono text-xs tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer"
              style={{ border: "1px solid rgba(90,176,232,0.22)", background: "transparent" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(90,176,232,0.55)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(90,176,232,0.06)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(90,176,232,0.22)";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <span className="w-8 h-px transition-all duration-300 group-hover:w-12" style={{ background: "rgba(90,176,232,0.4)" }} />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {lang === "zh" ? "个人资料 / ABOUT ME" : "PROFILE / ABOUT ME"}
              </span>
              <span className="w-8 h-px transition-all duration-300 group-hover:w-12" style={{ background: "rgba(90,176,232,0.4)" }} />
            </button>
          </ScrollReveal>

          <div className="absolute top-8 left-8 w-8 h-8 border-t border-l" style={{ borderColor: "rgba(90,176,232,0.18)" }} />
          <div className="absolute top-8 right-8 w-8 h-8 border-t border-r" style={{ borderColor: "rgba(90,176,232,0.18)" }} />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l" style={{ borderColor: "rgba(90,176,232,0.18)" }} />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r" style={{ borderColor: "rgba(90,176,232,0.18)" }} />
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────── */}
      <div className="relative" style={{ background: "rgba(6,10,19,0.80)" }}>
        <div className="mx-8 md:mx-14" style={{ height: "1px", background: "rgba(90,176,232,0.07)" }} />
        <div className="py-10 px-8 md:px-14 flex items-center justify-between font-mono text-xs tracking-[0.18em] text-muted-foreground/28">
          <span>CHRONICLE KIT v1.0</span>
          <span>{lang === "zh" ? "记录者工具包" : "The Chronicler's Toolkit"}</span>
        </div>
      </div>
    </>
  );
}
