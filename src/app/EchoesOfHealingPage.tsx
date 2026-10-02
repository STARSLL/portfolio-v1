import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLanguage } from "./LanguageContext";

// ── 素材导入 ─────────────────────────────────────────────────────────
// A46: 首屏介绍
import imgHeroBg   from "@/imports/A46/539185c4d80a71a775eff32e3d4e2dfe1a523963.png";
import imgHeroFig  from "@/imports/A46/cda59b94c94a1e62b4d76d1c93e0a6643353ec99.png";
// A41-1: 背景研究
import imgOutdoors from "@/imports/A41-1/213736d57cb968b5a6130eca2975fb8d5c9aa918.png";
import imgPTSD     from "@/imports/A41-1/ff2630d3b0749ea7585a0310926c5c9c8a10e312.png";
import imgResearch from "@/imports/A41-1/88ff1f33b23b0e765e1df17c495023fb0b9f60f3.png";
import imgData1    from "@/imports/A41-1/d74e4ccd8aad969e1a2ae58459153cb606fec71b.png";
// A43: 用户研究 / 服务设计
import imgPersona  from "@/imports/A43/1f58fd160bd12b548a1db22e7d8bcc19c03a9826.png";
import imgSketch   from "@/imports/A43/c8b07e09d3428b5fa275e2eb479131a635261d06.png";
import imgService  from "@/imports/A43/d491998c7cc96d3ba60377f1f28d7f1593a53b65.png";
import imgUI1      from "@/imports/A43/903e6fee3c075cd989b07b70dd9c6cedf2c2a40b.png";
import imgUI2      from "@/imports/A43/8ba39baa741e8cd930dde90edf3353df105af48e.png";
import imgUI3      from "@/imports/A43/ad9f3ba1fd0fcd8210106f04924001f295032b50.png";
// A42: 暴露疗法 / 理论基础
import imgTherapy1 from "@/imports/A42/3883dec1771f566bdd1f5f9aced215a708876341.png";
import imgVR       from "@/imports/A42/46fbdb64a1d9a759a63586ebe53a9510e34e3512.png";
import imgTherapy2 from "@/imports/A42/88870a2d5b28cd7f7938d0287f532b9b99970f49.png";
import imgTheory   from "@/imports/A42/0e83fb55a916ef84213e79f3419644fd3c2d2518.png";
// A45: VR 场景 / 最终成果
import imgScene1   from "@/imports/A45/c739e58d5f2f0929a47ae48071c94e501985f73f.png";
import imgScene2   from "@/imports/A45/a3f20aeac12de025a9cb237a5986f6e06e36294b.png";
import imgScene3   from "@/imports/A45/92b8f526be95690379614e72a847f24a44110d44.png";
import imgOutcome  from "@/imports/A45/fae5daa6594331962a35e5bcb572feb1c1fb1ab4.png";

// ── 色彩令牌 ──────────────────────────────────────────────────────────
const C = {
  bg:        "#111111",
  bgCard:    "#1A1A1A",
  bgDeep:    "#0A0A0A",
  yellow:    "#F2E51D",
  yellowFaint:"rgba(242,229,29,0.12)",
  yellowBorder:"rgba(242,229,29,0.35)",
  white:     "#FFFFFF",
  gray:      "#AAAAAA",
  grayDark:  "#555555",
  border:    "rgba(255,255,255,0.10)",
  borderY:   "rgba(242,229,29,0.25)",
};

const FO = "'Oregano', serif"; // 斜体衬线
const FB = "'Space Grotesk', system-ui, sans-serif";
const FM = "'Space Mono', monospace";

// ── 锚点章节 ──────────────────────────────────────────────────────────
const SECS = [
  { id: "hero",     zh: "首屏",    en: "Hero" },
  { id: "bg",       zh: "背景研究", en: "Background" },
  { id: "user",     zh: "用户研究", en: "User Research" },
  { id: "theory",   zh: "理论基础", en: "Theory" },
  { id: "service",  zh: "服务设计", en: "Service Design" },
  { id: "vr",       zh: "VR 系统", en: "VR System" },
  { id: "ai",       zh: "AI 陪伴", en: "AI Companion" },
  { id: "ui",       zh: "界面设计", en: "UI Design" },
  { id: "outcome",  zh: "最终成果", en: "Final Outcome" },
];

// ── 滚动显现 ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -48px 0px" });
  return (
    <motion.div ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : y }}
      transition={{ duration: inView ? 0.7 : 0.3, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── 装饰网格线背景 ────────────────────────────────────────────────────
function GridBg({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} aria-hidden>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={C.yellow} strokeWidth="0.5" opacity={opacity * 25} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// ── Section 包裹 ──────────────────────────────────────────────────────
function Section({ id, children, alt = false, noGrid = false }: {
  id: string; children: React.ReactNode; alt?: boolean; noGrid?: boolean;
}) {
  return (
    <section
      id={id}
      style={{
        background: alt ? C.bgCard : C.bg,
        borderBottom: `1px solid ${C.borderY}`,
        scrollMarginTop: "72px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!noGrid && <GridBg />}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 48px", position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}

// ── 章节大标题 ─────────────────────────────────────────────────────
function SHead({ num, zh, en, sub }: { num: string; zh: string; en: string; sub?: string }) {
  const { lang } = useLanguage();
  return (
    <Reveal>
      <div style={{ marginBottom: "56px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
          <span style={{
            fontFamily: FO, fontSize: "clamp(3rem, 6vw, 5rem)",
            color: C.yellow, lineHeight: 1, fontStyle: "italic",
            opacity: 0.2, userSelect: "none", letterSpacing: "-0.02em",
          }}>
            {num}
          </span>
          <div>
            <h2 style={{
              fontFamily: FO, fontStyle: "italic",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: C.white, margin: 0, lineHeight: 1.1,
              letterSpacing: "0.01em",
            }}>
              {lang === "zh" ? zh : en}
            </h2>
            {sub && (
              <p style={{
                fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.2em",
                color: C.yellow, margin: "6px 0 0", opacity: 0.8,
              }}>
                {sub}
              </p>
            )}
          </div>
        </div>
        <div style={{ height: "1px", background: `linear-gradient(to right, ${C.yellow}, transparent)`, opacity: 0.4 }} />
      </div>
    </Reveal>
  );
}

// ── 数据卡 ────────────────────────────────────────────────────────────
function StatCard({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div style={{
      padding: "20px 24px",
      border: `1px solid ${C.borderY}`,
      background: C.bgCard,
      borderTop: `2px solid ${C.yellow}`,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
        <span style={{ fontFamily: FO, fontStyle: "italic", fontSize: "2.4rem", color: C.yellow, lineHeight: 1 }}>{value}</span>
        <span style={{ fontFamily: FM, fontSize: "0.7rem", color: C.gray }}>{unit}</span>
      </div>
      <p style={{ fontFamily: FB, fontSize: "0.78rem", color: C.gray, margin: 0, lineHeight: 1.5 }}>{label}</p>
    </div>
  );
}

// ── 理论方法卡 ────────────────────────────────────────────────────────
function TheoryCard({ icon, title, desc, limit }: { icon: string; title: string; desc: string; limit: string }) {
  const { lang } = useLanguage();
  return (
    <div style={{
      padding: "24px", border: `1px solid ${C.border}`, background: C.bgDeep,
      display: "flex", flexDirection: "column", gap: "12px",
    }}>
      <span style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.8rem", color: C.yellow, opacity: 0.6 }}>{icon}</span>
      <h4 style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.1rem", color: C.white, margin: 0 }}>{title}</h4>
      <p style={{ fontFamily: FB, fontSize: "0.8rem", color: C.gray, lineHeight: 1.65, margin: 0 }}>{desc}</p>
      <div style={{
        padding: "10px 12px", background: "rgba(242,229,29,0.06)",
        borderLeft: `2px solid ${C.yellow}`,
      }}>
        <p style={{ fontFamily: FM, fontSize: "0.65rem", color: C.yellow, margin: 0, letterSpacing: "0.06em" }}>
          {lang === "zh" ? "局限：" : "Limitation: "}{limit}
        </p>
      </div>
    </div>
  );
}

// ── 服务阶段节点 ──────────────────────────────────────────────────────
function StageNode({ num, title, desc, isLast = false }: {
  num: string; title: string; desc: string; isLast?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: "0", alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "48px" }}>
        <div style={{
          width: "36px", height: "36px", border: `2px solid ${C.yellow}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: FO, fontStyle: "italic", fontSize: "0.9rem", color: C.yellow,
          background: C.bg, flexShrink: 0, zIndex: 1,
        }}>
          {num}
        </div>
        {!isLast && (
          <div style={{
            width: "1px", flex: 1, minHeight: "52px",
            background: `linear-gradient(to bottom, ${C.yellow}, transparent)`,
            marginTop: "4px", opacity: 0.4,
          }} />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : "40px", paddingLeft: "16px", paddingTop: "6px", flex: 1 }}>
        <h4 style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.05rem", color: C.yellow, margin: "0 0 6px" }}>
          {title}
        </h4>
        <p style={{ fontFamily: FB, fontSize: "0.8rem", color: C.gray, lineHeight: 1.65, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

// ── 右侧锚点导航 ──────────────────────────────────────────────────────
function AnchorNav() {
  const [active, setActive] = useState("hero");
  const { lang } = useLanguage();
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    SECS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <nav className="hidden xl:flex" style={{
      position: "fixed", right: "24px", top: "50%", transform: "translateY(-50%)",
      flexDirection: "column", gap: "6px", zIndex: 40,
    }}>
      {SECS.map(({ id, zh, en }) => (
        <button key={id} onClick={() => go(id)} style={{
          display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px",
          background: "none", border: "none", cursor: "pointer", padding: "2px 0",
        }}>
          <span style={{
            fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.08em",
            color: active === id ? C.yellow : C.grayDark,
            transition: "color 0.25s", whiteSpace: "nowrap",
          }}>
            {active === id ? (lang === "zh" ? zh : en) : ""}
          </span>
          <span style={{
            width: active === id ? "18px" : "5px", height: "1.5px",
            background: active === id ? C.yellow : C.grayDark,
            transition: "all 0.28s ease", display: "inline-block",
          }} />
        </button>
      ))}
    </nav>
  );
}

// ═════════════════════════════════════════════════════════════════════
// 主组件
// ═════════════════════════════════════════════════════════════════════
export default function EchoesOfHealingPage({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1400);
    const t4 = setTimeout(() => setPhase(4), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FB, color: C.white }}>
      <style>{`
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50%       { transform: translateY(-8px) scale(1.05); opacity: 1; }
        }
        @keyframes scanH {
          0%   { top: 0%; }
          100% { top: 110%; }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.04; }
          50%       { opacity: 0.08; }
        }
        @keyframes yellowGlow {
          0%, 100% { box-shadow: 0 0 16px rgba(242,229,29,0.2); }
          50%       { box-shadow: 0 0 32px rgba(242,229,29,0.4); }
        }
        .eoh-img-zoom { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .eoh-img-zoom:hover { transform: scale(1.03); }
        .eoh-card-hover { transition: border-color 0.3s, transform 0.3s; }
        .eoh-card-hover:hover { border-color: rgba(242,229,29,0.6) !important; transform: translateY(-2px); }
      `}</style>

      <AnchorNav />

      {/* 返回按钮 */}
      <button onClick={onBack} style={{
        position: "fixed", top: "72px", left: "24px", zIndex: 45,
        background: "rgba(17,17,17,0.88)", backdropFilter: "blur(8px)",
        border: `1px solid ${C.borderY}`, padding: "8px 16px",
        fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.12em",
        color: C.yellow, cursor: "pointer",
      }}>
        {lang === "zh" ? "← 返回项目" : "← Back"}
      </button>

      {/* ════════════════════════════════════════
          首屏 Hero
      ════════════════════════════════════════ */}
      <section id="hero" style={{
        position: "relative", minHeight: "100vh",
        background: C.bgDeep, overflow: "hidden",
        display: "flex", alignItems: "center",
        paddingTop: "72px", scrollMarginTop: "72px",
      }}>
        <GridBg opacity={0.06} />

        {/* 背景图层 */}
        <img src={imgHeroBg} alt="" aria-hidden style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", mixBlendMode: "overlay",
          opacity: phase >= 1 ? 0.15 : 0, transition: "opacity 1.8s ease",
        }} />

        {/* 扫描线 */}
        {phase >= 2 && (
          <div style={{
            position: "absolute", left: 0, right: 0, height: "1px",
            background: `linear-gradient(to right, transparent, ${C.yellow} 40%, rgba(255,255,255,0.8) 50%, ${C.yellow} 60%, transparent)`,
            animation: "scanH 1.6s ease-out forwards",
            zIndex: 3, pointerEvents: "none",
          }} />
        )}

        {/* 粒子装饰点 */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
          {[...Array(14)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${5 + (i * 7.1) % 90}%`,
              top: `${15 + (i * 13.7) % 70}%`,
              width: i % 3 === 0 ? "3px" : "2px",
              height: i % 3 === 0 ? "3px" : "2px",
              borderRadius: "50%",
              background: C.yellow,
              opacity: phase >= 3 ? (0.3 - (i % 4) * 0.06) : 0,
              transition: `opacity 0.4s ease ${i * 0.08}s`,
              animation: phase >= 4 ? `particleFloat ${3 + (i % 3)}s ease-in-out infinite ${i * 0.3}s` : "none",
            }} />
          ))}
          {/* 黄色连接线 */}
          {phase >= 3 && (
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
              <line x1="8%" y1="30%" x2="25%" y2="55%" stroke={C.yellow} strokeWidth="0.5" strokeDasharray="4 8" />
              <line x1="75%" y1="20%" x2="90%" y2="45%" stroke={C.yellow} strokeWidth="0.5" strokeDasharray="4 8" />
              <line x1="40%" y1="10%" x2="55%" y2="85%" stroke={C.yellow} strokeWidth="0.3" strokeDasharray="2 12" />
            </svg>
          )}
        </div>

        {/* 主体 */}
        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "0 48px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px",
          alignItems: "center", position: "relative", zIndex: 4, width: "100%",
        }}>
          {/* 左：文字 */}
          <div>
            <motion.div
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : -10 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}
            >
              <span style={{
                fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.25em",
                color: C.yellow, padding: "4px 10px",
                border: `1px solid ${C.borderY}`,
              }}>
                04
              </span>
              <span style={{ fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.18em", color: C.gray }}>
                {lang === "zh" ? "服务设计 · 体验设计 · VR疗愈" : "Service Design · Experience Design · VR Therapy"}
              </span>
            </motion.div>

            <motion.div
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 style={{
                fontFamily: FO, fontStyle: "italic",
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                color: C.yellow, lineHeight: 1.05,
                letterSpacing: "0.02em", margin: 0,
              }}>
                {lang === "zh" ? "回响疗愈" : "Echoes of Healing"}
              </h1>
              <p style={{
                fontFamily: FO, fontStyle: "italic",
                fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                color: C.white, margin: "8px 0 0", letterSpacing: "0.02em", opacity: 0.75,
              }}>
                {lang === "zh"
                  ? "面向退伍军人的沉浸式心理疗愈体验系统设计"
                  : "Immersive Psychological Healing Experience System for Veterans"}
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 12 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "28px" }}
            >
              {(lang === "zh"
                ? ["服务设计", "VR体验", "AI辅助疗愈", "心理健康科技"]
                : ["Service Design", "VR Experience", "AI-Assisted Healing", "Mental Health Tech"]
              ).map((t, i) => (
                <span key={t} style={{
                  fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.1em",
                  padding: "5px 12px",
                  border: `1px solid ${i === 1 ? C.yellow : C.border}`,
                  color: i === 1 ? C.yellow : C.gray,
                  background: i === 1 ? C.yellowFaint : "transparent",
                }}>
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.p
              animate={{ opacity: phase >= 4 ? 0.65 : 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                fontFamily: FB, fontSize: "0.88rem", color: C.gray,
                lineHeight: 1.8, marginTop: "32px", maxWidth: "480px",
              }}
            >
              {lang === "zh"
                ? "通过VR场景重建、AI情绪陪伴以及渐进式暴露体验，帮助用户在安全环境中重新面对创伤记忆，建立新的认知与情绪调节方式。"
                : "Through VR scene reconstruction, AI emotional companionship, and progressive exposure therapy, users can safely confront traumatic memories and build new cognitive and emotional regulation strategies."}
            </motion.p>
          </div>

          {/* 右：粒子人物 */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <motion.div
              animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 1.06 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                animation: phase >= 4 ? "particleFloat 7s ease-in-out infinite" : "none",
                filter: `drop-shadow(0 0 28px rgba(242,229,29,0.22))`,
              }}
            >
              <img src={imgHeroFig} alt={lang === "zh" ? "粒子人物轮廓 — 记忆重建" : "Particle figure silhouette — memory reconstruction"}
                style={{
                  width: "min(500px, 90%)", maxHeight: "72vh",
                  objectFit: "contain", display: "block", margin: "0 auto",
                }}
              />
            </motion.div>
            {/* 装饰方框 */}
            <div style={{
              position: "absolute", inset: "5%",
              border: `1px solid ${C.borderY}`,
              opacity: phase >= 3 ? 0.3 : 0, transition: "opacity 0.8s ease",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", top: "8%", right: "8%",
              width: "48px", height: "48px",
              border: `1px solid ${C.yellow}`,
              opacity: phase >= 3 ? 0.35 : 0, transition: "opacity 0.8s ease 0.2s",
              pointerEvents: "none",
            }} />
          </div>
        </div>

        {/* 底部提示 */}
        <motion.div
          animate={{ opacity: phase >= 4 ? 0.45 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)",
            fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.2em", color: C.yellow,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          }}
        >
          <span>{lang === "zh" ? "向下探索" : "Scroll to Explore"}</span>
          <div style={{ width: "1px", height: "28px", background: `linear-gradient(to bottom, ${C.yellow}, transparent)` }} />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          01 项目介绍
      ════════════════════════════════════════ */}
      <Section id="bg">
        <SHead num="01" zh="项目介绍" en="Project Overview" sub="PROJECT OVERVIEW · RESEARCH ARCHIVE" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start" }}>
          <Reveal>
            <div>
              <div style={{
                padding: "28px 32px", border: `1px solid ${C.borderY}`,
                background: C.bgCard, marginBottom: "24px",
                animation: "yellowGlow 4s ease-in-out infinite",
              }}>
                <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.1rem", color: C.yellow, marginBottom: "12px" }}>
                  {lang === "zh" ? "系统核心" : "System Core"}
                </p>
                <p style={{ fontFamily: FB, fontSize: "0.9rem", color: C.white, lineHeight: 1.8, margin: 0 }}>
                  {lang === "zh"
                    ? "Echoes of Healing 是一个面向退伍军人的沉浸式心理疗愈体验系统。通过VR场景重建、AI情绪陪伴以及渐进式暴露体验，帮助用户在安全环境中重新面对创伤记忆，建立新的认知和情绪调节方式。"
                    : "Echoes of Healing is an immersive psychological healing experience system designed for veterans. Through VR scene reconstruction, AI emotional companionship, and progressive exposure therapy, it helps users safely confront traumatic memories and build new cognitive and emotional regulation strategies."}
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <StatCard value="40%" unit="" label={lang === "zh" ? "传统暴露疗法中途退出率" : "Dropout rate in traditional exposure therapy"} />
                <StatCard value="6" unit={lang === "zh" ? "阶段" : "stages"} label={lang === "zh" ? "渐进式疗愈路径设计" : "Progressive healing pathway stages"} />
                <StatCard value="VR" unit="+" label={lang === "zh" ? "AI 双模块融合系统" : "AI dual-module integrated system"} />
                <StatCard value="24/7" unit="" label={lang === "zh" ? "AI 情绪陪伴全天候支持" : "24/7 AI emotional support"} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ position: "relative" }}>
              <img src={imgResearch} alt={lang === "zh" ? "研究背景" : "Research background"} className="eoh-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute", bottom: "16px", left: "16px", right: "16px",
                padding: "12px 16px",
                background: "rgba(17,17,17,0.85)", backdropFilter: "blur(6px)",
                borderLeft: `2px solid ${C.yellow}`,
              }}>
                <p style={{ fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.1em", color: C.yellow, margin: 0 }}>
                  {lang === "zh"
                    ? "Alex Miller · 退伍军人 · 中东战区两次服役"
                    : "Alex Miller · Veteran · Two tours in the Middle East"}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          02 背景研究
      ════════════════════════════════════════ */}
      <Section id="bg" alt>
        <SHead num="02" zh="背景研究" en="Background Research" sub="PTSD · SHELL SHOCK · RESEARCH DATA" />
        <div style={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <div>
              <img src={imgOutdoors} alt={lang === "zh" ? "战场背景研究" : "Combat background research"} className="eoh-img-zoom"
                style={{
                  width: "100%", display: "block", objectFit: "cover",
                  marginBottom: "24px", maxHeight: "280px",
                  filter: "grayscale(30%)",
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <StatCard value="30.9%" unit="" label={lang === "zh" ? "美国退伍军人PTSD终身患病率" : "Lifetime PTSD prevalence in U.S. veterans"} />
                <StatCard value="4.9%" unit="" label={lang === "zh" ? "普通人群PTSD终身患病率" : "Lifetime PTSD prevalence in general population"} />
                <StatCard value="8.9%" unit="" label={lang === "zh" ? "每年美国新增PTSD病例比例" : "Annual new PTSD case rate in the U.S."} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <img src={imgPTSD} alt="PTSD mechanism diagram" className="eoh-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
              <img src={imgData1} alt="PTSD data visualization" className="eoh-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
              {(lang === "zh"
                ? [
                    { label: "战争创伤影响", desc: "战场暴力暴露、生死经历、战友伤亡等高应激事件导致长期心理创伤" },
                    { label: "PTSD 形成机制", desc: "杏仁核过度激活、海马体损伤导致恐惧记忆无法正常整合与消退" },
                  ]
                : [
                    { label: "Impact of Combat Trauma", desc: "High-stress events such as battlefield violence, life-or-death experiences, and loss of fellow soldiers lead to long-term psychological trauma." },
                    { label: "PTSD Formation Mechanism", desc: "Hyperactivation of the amygdala and hippocampal damage prevent fear memories from being properly integrated and extinguished." },
                  ]
              ).map(({ label, desc }) => (
                <div key={label} style={{
                  padding: "14px 18px", border: `1px solid ${C.border}`,
                  borderLeft: `2px solid ${C.yellow}`, background: C.bg,
                }}>
                  <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "0.9rem", color: C.yellow, marginBottom: "6px" }}>{label}</p>
                  <p style={{ fontFamily: FB, fontSize: "0.78rem", color: C.gray, margin: 0, lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          03 用户研究
      ════════════════════════════════════════ */}
      <Section id="user">
        <SHead num="03" zh="用户研究" en="User Research" sub="USER PERSONA · ALEX MILLER · VETERAN" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <div>
              <div style={{
                position: "relative", overflow: "hidden", marginBottom: "16px",
                border: `1px solid ${C.borderY}`,
              }}>
                <img src={imgPersona} alt="Alex Miller — User Persona" className="eoh-img-zoom"
                  style={{ width: "100%", display: "block", objectFit: "cover", filter: "grayscale(20%)" }}
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 16px",
                  background: "linear-gradient(to top, rgba(10,10,10,0.95), transparent)",
                }}>
                  <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.5rem", color: C.yellow, margin: 0 }}>
                    Alex Miller
                  </p>
                  <p style={{ fontFamily: FM, fontSize: "0.6rem", color: C.gray, margin: "4px 0 0", letterSpacing: "0.1em" }}>
                    {lang === "zh"
                      ? "30岁 · 退伍军人 · 中东战区两次服役"
                      : "Age 30 · Veteran · Two tours in the Middle East"}
                  </p>
                </div>
              </div>
              <div style={{ padding: "16px", border: `1px solid ${C.border}`, background: C.bgCard }}>
                {(lang === "zh"
                  ? [
                      ["身份", "退伍陆军士兵"],
                      ["服役", "中东战区两次服役"],
                      ["现状", "退伍后返乡，从事建筑工作"],
                      ["家庭", "已婚，育有一女"],
                    ]
                  : [
                      ["Role", "Army Veteran"],
                      ["Service", "Two tours in the Middle East"],
                      ["Status", "Returned home, working in construction"],
                      ["Family", "Married, one daughter"],
                    ]
                ).map(([k, v]) => (
                  <div key={k} style={{
                    display: "flex", gap: "12px", padding: "7px 0",
                    borderBottom: `1px solid ${C.border}`,
                    fontFamily: FM, fontSize: "0.65rem",
                  }}>
                    <span style={{ color: C.yellow, minWidth: "40px", opacity: 0.7 }}>{k}</span>
                    <span style={{ color: C.gray }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {(lang === "zh"
                ? [
                    { type: "心理状态", icon: "◈", items: ["闪回与噩梦反复出现", "持续性情绪麻木与回避", "长期睡眠障碍", "安全感严重缺失"] },
                    { type: "行为模式", icon: "◇", items: ["回避与战争相关的人地物", "社会孤立，拒绝社交", "过度警觉与惊吓反应", "酒精或药物依赖风险"] },
                    { type: "核心需求", icon: "◆", items: ["在可控环境中处理创伤记忆", "获得持续、无评判的情感支持", "逐步重建安全感与信任感", "保持主动性与自我掌控感"] },
                    { type: "设计机会", icon: "◉", items: ["VR 提供可控的模拟暴露环境", "AI 实现全天候陪伴与引导", "游戏化降低治疗抵触情绪", "数据可视化让进展可见可感"] },
                  ]
                : [
                    { type: "Mental State", icon: "◈", items: ["Recurring flashbacks and nightmares", "Persistent emotional numbing and avoidance", "Chronic sleep disturbance", "Severe loss of sense of safety"] },
                    { type: "Behavioral Patterns", icon: "◇", items: ["Avoidance of war-related people, places, and objects", "Social isolation and withdrawal", "Hypervigilance and exaggerated startle response", "Risk of alcohol or substance dependence"] },
                    { type: "Core Needs", icon: "◆", items: ["Process traumatic memories in a controlled environment", "Receive continuous, non-judgmental emotional support", "Gradually rebuild a sense of safety and trust", "Maintain agency and self-control throughout treatment"] },
                    { type: "Design Opportunities", icon: "◉", items: ["VR provides a controlled, simulated exposure environment", "AI enables around-the-clock companionship and guidance", "Gamification reduces resistance to treatment", "Data visualization makes progress visible and tangible"] },
                  ]
              ).map(({ type, icon, items }) => (
                <div key={type} className="eoh-card-hover" style={{
                  padding: "20px", border: `1px solid ${C.border}`, background: C.bgDeep,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                    <span style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.2rem", color: C.yellow }}>{icon}</span>
                    <span style={{ fontFamily: FO, fontStyle: "italic", fontSize: "0.95rem", color: C.white }}>{type}</span>
                  </div>
                  {items.map((it) => (
                    <div key={it} style={{
                      display: "flex", gap: "8px", alignItems: "flex-start",
                      fontFamily: FB, fontSize: "0.78rem", color: C.gray, lineHeight: 1.5,
                      marginBottom: "6px",
                    }}>
                      <span style={{ color: C.yellow, flexShrink: 0, fontSize: "0.5rem", marginTop: "4px" }}>▸</span>
                      {it}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          04 理论基础
      ════════════════════════════════════════ */}
      <Section id="theory" alt>
        <SHead num="04" zh="理论基础" en="Theoretical Basis" sub="EXPOSURE THERAPY · CPT · EMDR · LIMITATIONS" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <TheoryCard
                icon="①"
                title={lang === "zh" ? "暴露疗法" : "Exposure Therapy"}
                desc={lang === "zh"
                  ? "通过反复、系统地暴露于创伤记忆或触发物，帮助患者逐步降低恐惧反应。包括书面暴露和想象暴露两种方式。"
                  : "Involves repeated, systematic exposure to traumatic memories or triggers to help patients gradually reduce fear responses. Includes written and imaginal exposure techniques."}
                limit={lang === "zh" ? "高强度情绪压力，中断率高达 40%" : "High emotional stress; dropout rate as high as 40%"}
              />
              <TheoryCard
                icon="②"
                title={lang === "zh" ? "认知加工疗法（CPT）" : "Cognitive Processing Therapy (CPT)"}
                desc={lang === "zh"
                  ? "帮助患者识别和改变与创伤相关的扭曲认知，通过书写和认知重构技术重新理解创伤事件的意义。"
                  : "Helps patients identify and modify trauma-related cognitive distortions through written assignments and cognitive restructuring techniques to reinterpret the meaning of traumatic events."}
                limit={lang === "zh" ? "需要高度认知投入，接受度因人而异" : "Requires high cognitive engagement; acceptance varies by individual"}
              />
              <TheoryCard
                icon="③"
                title={lang === "zh" ? "EMDR 眼动脱敏疗法" : "EMDR Eye Movement Desensitization"}
                desc={lang === "zh"
                  ? "通过眼动或其他双侧刺激，同时处理创伤记忆，帮助记忆重新整合，减少情绪负荷。"
                  : "Uses eye movements or other bilateral stimulation to process traumatic memories simultaneously, facilitating memory reconsolidation and reducing emotional distress."}
                limit={lang === "zh" ? "依赖专业治疗师实时指导，可及性受限" : "Requires real-time guidance from a trained therapist; limited accessibility"}
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <img src={imgTherapy1} alt={lang === "zh" ? "书写暴露疗法场景" : "Written exposure therapy"} className="eoh-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
              <img src={imgVR} alt="VR mental health application" className="eoh-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
              <div style={{
                padding: "24px", background: C.bgDeep,
                border: `1px solid ${C.borderY}`,
                borderTop: `2px solid ${C.yellow}`,
              }}>
                <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1rem", color: C.yellow, marginBottom: "12px" }}>
                  {lang === "zh" ? "设计机会窗口" : "Design Opportunity Window"}
                </p>
                <p style={{ fontFamily: FB, fontSize: "0.82rem", color: C.gray, lineHeight: 1.75, margin: 0 }}>
                  {lang === "zh"
                    ? "传统疗法的核心瓶颈在于「进入门槛高」与「持续支持缺失」。VR 提供可控的渐进式暴露环境，AI 实现随时随地的情绪陪伴。二者结合，可将放弃率从 40% 大幅降低。"
                    : "The core bottleneck of traditional therapies lies in high barriers to entry and lack of continuous support. VR provides a controlled, progressive exposure environment, while AI delivers on-demand emotional companionship. Together, they can significantly reduce the 40% dropout rate."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          05 服务设计
      ════════════════════════════════════════ */}
      <Section id="service">
        <SHead num="05" zh="服务设计" en="Service Design" sub="SIX-STAGE HEALING PATH · SERVICE BLUEPRINT" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start" }}>
          <Reveal>
            <div style={{ paddingTop: "8px" }}>
              <StageNode
                num="01"
                title={lang === "zh" ? "危机觉察" : "Crisis Awareness"}
                desc={lang === "zh"
                  ? "识别创伤症状，完成初始心理评估，建立治疗师与用户的初步信任关系。"
                  : "Identify trauma symptoms, complete initial psychological assessment, and establish a preliminary therapeutic alliance between therapist and user."}
              />
              <StageNode
                num="02"
                title={lang === "zh" ? "建立安全感" : "Establishing Safety"}
                desc={lang === "zh"
                  ? "通过低强度放松场景（自然环境、音乐疗愈）帮助用户稳定情绪基线，引入控制感训练。"
                  : "Use low-intensity relaxation environments (nature scenes, music therapy) to help stabilize the user's emotional baseline and introduce sense-of-control training."}
              />
              <StageNode
                num="03"
                title={lang === "zh" ? "初步暴露训练" : "Initial Exposure Training"}
                desc={lang === "zh"
                  ? "在 VR 安全环境中进行低强度场景还原，配合 AI 实时情绪反馈与呼吸引导。"
                  : "Conduct low-intensity scene reconstructions in a safe VR environment, supported by real-time AI emotional feedback and breathing guidance."}
              />
              <StageNode
                num="04"
                title={lang === "zh" ? "深入记忆处理" : "In-Depth Memory Processing"}
                desc={lang === "zh"
                  ? "逐步重建核心创伤场景，运用认知重构技术改写创伤叙事，整合情绪反应。"
                  : "Progressively reconstruct core traumatic scenes using cognitive restructuring techniques to reframe the trauma narrative and integrate emotional responses."}
              />
              <StageNode
                num="05"
                title={lang === "zh" ? "现实环境迁移" : "Real-World Generalization"}
                desc={lang === "zh"
                  ? "将 VR 中习得的应对策略迁移到日常生活情境，训练真实触发场景下的调节能力。"
                  : "Transfer coping strategies learned in VR to everyday life contexts and practice regulation skills in real-world trigger situations."}
              />
              <StageNode
                num="06"
                title={lang === "zh" ? "持续成长维护" : "Ongoing Growth & Maintenance"}
                isLast
                desc={lang === "zh"
                  ? "建立长期自我监测习惯，AI 持续陪伴跟踪进展，防止复发，促进社会再融合。"
                  : "Establish long-term self-monitoring habits, with AI continuously tracking progress, preventing relapse, and supporting social reintegration."}
              />
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ position: "sticky", top: "100px" }}>
              <img src={imgService} alt={lang === "zh" ? "服务流程图" : "Service flow diagram"} className="eoh-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover", marginBottom: "24px" }}
              />
              <img src={imgSketch} alt={lang === "zh" ? "服务蓝图设计草图" : "Service blueprint design sketch"} className="eoh-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          06 VR 体验系统
      ════════════════════════════════════════ */}
      <Section id="vr" alt>
        <SHead num="06" zh="VR 体验系统" en="VR Experience System" sub="SCENE RECONSTRUCTION · PROGRESSIVE EXPOSURE" />
        <Reveal>
          <p style={{
            fontFamily: FB, fontSize: "0.92rem", color: C.gray,
            lineHeight: 1.8, maxWidth: "680px", marginBottom: "40px",
          }}>
            {lang === "zh"
              ? "用户不是被迫回忆创伤，而是在完全可控的环境中主动选择暴露程度。游戏分为两部分：「场景构建」阶段用于认知重构，「叙事体验」阶段用于情绪处理与整合。"
              : "Users are not forced to recall trauma — they actively choose their level of exposure in a fully controlled environment. The experience is divided into two parts: the \"Scene Construction\" phase for cognitive restructuring, and the \"Narrative Experience\" phase for emotional processing and integration."}
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {(lang === "zh"
            ? [
                { img: imgScene1, label: "场景进入", sub: "进入场景 · Enter the scene" },
                { img: imgScene2, label: "角色重建", sub: "Character recreation" },
                { img: imgScene3, label: "场景构建", sub: "Scene construction" },
              ]
            : [
                { img: imgScene1, label: "Scene Entry", sub: "Enter the scene · 进入场景" },
                { img: imgScene2, label: "Character Reconstruction", sub: "Character recreation" },
                { img: imgScene3, label: "Scene Construction", sub: "Scene construction" },
              ]
          ).map(({ img, label, sub }) => (
            <Reveal key={label} delay={0.06}>
              <div className="eoh-card-hover" style={{ border: `1px solid ${C.border}`, overflow: "hidden" }}>
                <div style={{ overflow: "hidden", position: "relative" }}>
                  <img src={img} alt={label} className="eoh-img-zoom"
                    style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "4/3" }}
                  />
                  <div style={{
                    position: "absolute", top: "8px", left: "8px",
                    padding: "3px 8px", background: "rgba(242,229,29,0.9)",
                    fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.12em", color: "#000",
                  }}>
                    VR
                  </div>
                </div>
                <div style={{ padding: "12px 16px" }}>
                  <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "0.95rem", color: C.white, margin: "0 0 3px" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: FM, fontSize: "0.58rem", color: C.grayDark, margin: 0, letterSpacing: "0.08em" }}>
                    {sub}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {(lang === "zh"
              ? [
                  { title: "可控渐进暴露", desc: "用户掌握暴露强度旋钮，随时暂停或退出，治疗过程由自己主导" },
                  { title: "实时生物反馈", desc: "VR头显集成心率、皮肤电反应监测，AI根据生理数据实时调整场景强度" },
                  { title: "双模块游戏结构", desc: "「构建游戏」用于书写式暴露认知重构；「叙事游戏」用于VR情境体验与情绪处理" },
                  { title: "场景忠实还原", desc: "基于用户叙述的创伤事件进行精确场景建模，同时保留必要的安全感缓冲区域" },
                ]
              : [
                  { title: "Controlled Progressive Exposure", desc: "Users control their own exposure intensity dial and can pause or exit at any time, keeping ownership of the therapeutic process." },
                  { title: "Real-Time Biofeedback", desc: "The VR headset integrates heart rate and galvanic skin response monitoring; AI adjusts scene intensity in real time based on physiological data." },
                  { title: "Dual-Module Game Structure", desc: "The \"Construction Game\" handles written-exposure cognitive restructuring; the \"Narrative Game\" facilitates VR situational experience and emotional processing." },
                  { title: "Faithful Scene Reconstruction", desc: "Trauma scenes are precisely modeled based on the user's own account, while maintaining necessary safety buffer zones throughout." },
                ]
            ).map(({ title, desc }) => (
              <div key={title} style={{
                padding: "16px 20px", background: C.bgDeep, border: `1px solid ${C.border}`,
              }}>
                <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "0.9rem", color: C.yellow, marginBottom: "6px" }}>{title}</p>
                <p style={{ fontFamily: FB, fontSize: "0.78rem", color: C.gray, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ════════════════════════════════════════
          07 AI 情绪陪伴系统
      ════════════════════════════════════════ */}
      <Section id="ai">
        <SHead num="07" zh="AI 情绪陪伴系统" en="AI Emotional Companion System" sub="AI COMPANION · EMOTIONAL MONITORING · PERSONALIZED GUIDANCE" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {(lang === "zh"
                ? [
                    { icon: "◈", title: "情绪实时监测", desc: "通过语音语调分析、面部表情识别与生理数据融合，实时评估用户情绪状态，标记高风险时刻。" },
                    { icon: "◇", title: "心理反馈引导", desc: "AI 在用户情绪高峰时自动介入，提供呼吸引导、接地技术或短暂暂停建议，防止过度激活。" },
                    { icon: "◆", title: "个性化疗愈路径", desc: "根据用户每次疗愈会话的数据，动态调整下次暴露强度、场景选择和引导策略，实现真正个性化。" },
                    { icon: "◉", title: "治疗进程记录", desc: "自动生成每次会话的情绪轨迹报告，可与治疗师共享，形成人机协同的疗愈支持体系。" },
                  ]
                : [
                    { icon: "◈", title: "Real-Time Emotional Monitoring", desc: "Combines voice tone analysis, facial expression recognition, and physiological data to assess the user's emotional state in real time and flag high-risk moments." },
                    { icon: "◇", title: "Psychological Feedback & Guidance", desc: "AI automatically intervenes at emotional peaks, offering breathing guidance, grounding techniques, or brief pause suggestions to prevent emotional overactivation." },
                    { icon: "◆", title: "Personalized Healing Pathway", desc: "Dynamically adjusts exposure intensity, scene selection, and guidance strategy for each subsequent session based on data from prior healing sessions." },
                    { icon: "◉", title: "Treatment Progress Tracking", desc: "Automatically generates an emotional trajectory report for each session, shareable with the therapist to form a human-AI collaborative healing support system." },
                  ]
              ).map(({ icon, title, desc }) => (
                <div key={title} style={{
                  display: "flex", gap: "16px", padding: "16px",
                  border: `1px solid ${C.border}`, background: C.bgCard,
                }}>
                  <span style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.6rem", color: C.yellow, flexShrink: 0, lineHeight: 1 }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "0.95rem", color: C.white, margin: "0 0 6px" }}>{title}</p>
                    <p style={{ fontFamily: FB, fontSize: "0.78rem", color: C.gray, lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <img src={imgTherapy2} alt="AI emotional companion system" className="eoh-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover", marginBottom: "20px" }}
              />
              <div style={{
                padding: "24px", border: `1px solid ${C.borderY}`,
                background: C.bgDeep,
              }}>
                <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "0.9rem", color: C.yellow, marginBottom: "10px" }}>
                  {lang === "zh" ? "AI 助手核心指令" : "AI Assistant Core Prompts"}
                </p>
                {(lang === "zh"
                  ? [
                      '"你现在是安全的。我们可以随时停下来。"',
                      '"我注意到你的呼吸加快了，试着用4-7-8呼吸法。"',
                      '"你今天的进步比上次提升了23%，继续保持。"',
                    ]
                  : [
                      '"You are safe right now. We can stop at any time."',
                      '"I noticed your breathing quickened — try the 4-7-8 breathing technique."',
                      '"Your progress today is 23% better than last session. Keep it up."',
                    ]
                ).map((q, i) => (
                  <div key={i} style={{
                    fontFamily: FB, fontSize: "0.78rem", color: C.gray,
                    borderLeft: `2px solid ${C.yellow}`, paddingLeft: "12px",
                    marginBottom: "10px", opacity: 0.9, lineHeight: 1.5,
                  }}>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          08 UI 设计
      ════════════════════════════════════════ */}
      <Section id="ui" alt>
        <SHead num="08" zh="交互界面设计" en="Interface Design" sub="APP INTERFACE · VR CONTROL PANEL · ALL CHINESE" />
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "24px" }}>
            {(lang === "zh"
              ? [
                  { img: imgUI1, label: "用户状态监测", desc: "疗愈进度 · 情绪曲线 · 历史记录" },
                  { img: imgUI2, label: "VR 场景选择", desc: "暴露强度 · 场景类型 · 时长控制" },
                  { img: imgUI3, label: "情绪反馈记录", desc: "会话总结 · AI 建议 · 进度报告" },
                ]
              : [
                  { img: imgUI1, label: "User Status Monitoring", desc: "Healing Progress · Emotional Curve · Session History" },
                  { img: imgUI2, label: "VR Scene Selection", desc: "Exposure Intensity · Scene Type · Duration Control" },
                  { img: imgUI3, label: "Emotional Feedback Log", desc: "Session Summary · AI Recommendations · Progress Report" },
                ]
            ).map(({ img, label, desc }) => (
              <Reveal key={label} delay={0.06}>
                <div>
                  <div style={{
                    overflow: "hidden", border: `1px solid ${C.borderY}`,
                    marginBottom: "12px",
                  }}>
                    <img src={img} alt={label} className="eoh-img-zoom"
                      style={{ width: "100%", display: "block", objectFit: "cover" }}
                    />
                  </div>
                  <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "0.95rem", color: C.white, margin: "0 0 3px" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: FM, fontSize: "0.58rem", color: C.grayDark, margin: 0, letterSpacing: "0.08em" }}>
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div style={{
            padding: "20px 28px", border: `1px solid ${C.border}`, background: C.bg,
            display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center",
          }}>
            <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.15em", color: C.yellow, margin: 0 }}>
              {lang === "zh" ? "界面语言 · 全中文" : "Interface Language · Chinese"}
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {(lang === "zh"
                ? ["开始体验", "查看状态", "调整环境", "记录情绪", "暂停疗愈", "联系治疗师"]
                : ["Start Session", "View Status", "Adjust Environment", "Log Emotions", "Pause Therapy", "Contact Therapist"]
              ).map((btn, i) => (
                <div key={btn} style={{
                  fontFamily: FB, fontSize: "0.75rem",
                  padding: "6px 14px",
                  border: `1px solid ${i === 0 ? C.yellow : C.border}`,
                  background: i === 0 ? C.yellowFaint : "transparent",
                  color: i === 0 ? C.yellow : C.gray,
                }}>
                  {btn}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ════════════════════════════════════════
          09 最终成果
      ════════════════════════════════════════ */}
      <section id="outcome" style={{
        background: C.bgDeep, scrollMarginTop: "72px", position: "relative", overflow: "hidden",
      }}>
        <GridBg opacity={0.06} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 48px", position: "relative", zIndex: 1 }}>
          <SHead num="09" zh="最终成果" en="Final Outcome" />
          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "56px", alignItems: "center" }}>
            <Reveal>
              <div>
                <img src={imgOutcome} alt={lang === "zh" ? "最终成果展示" : "Final outcome showcase"} className="eoh-img-zoom"
                  style={{
                    width: "100%", display: "block", objectFit: "cover",
                    marginBottom: "28px",
                    filter: "contrast(1.1) saturate(0.9)",
                  }}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <StatCard value="2" unit={lang === "zh" ? "模块" : "modules"} label={lang === "zh" ? "VR + AI 双核心系统" : "VR + AI dual-core system"} />
                  <StatCard value="6" unit={lang === "zh" ? "阶段" : "stages"} label={lang === "zh" ? "完整疗愈路径" : "Complete healing pathway"} />
                  <StatCard value="↓40%" unit="" label={lang === "zh" ? "预期治疗退出率降幅" : "Expected reduction in treatment dropout"} />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div>
                <div style={{
                  padding: "32px", border: `1px solid ${C.borderY}`,
                  background: "rgba(242,229,29,0.04)",
                  marginBottom: "24px",
                }}>
                  <p style={{
                    fontFamily: FO, fontStyle: "italic",
                    fontSize: "1.2rem", color: C.yellow, lineHeight: 1.6, margin: 0,
                  }}>
                    {lang === "zh"
                      ? "「通过VR沉浸体验、AI情绪支持和渐进式心理干预，Echoes of Healing 尝试重新定义创伤恢复过程，让用户重新获得面对过去和连接现实的能力。」"
                      : "\"Through immersive VR experiences, AI emotional support, and progressive psychological intervention, Echoes of Healing seeks to redefine the trauma recovery process — restoring users' ability to face the past and reconnect with the present.\""}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(lang === "zh"
                    ? ["未来战争受害者 PTSD 群体扩展", "阿尔茨海默症认知激活辅助应用", "自然灾害幸存者心理支持", "国际化部署与文化本土化适配"]
                    : ["Expansion to future war-related PTSD populations", "Cognitive activation support for Alzheimer's disease", "Psychological support for natural disaster survivors", "International deployment with cultural localization"]
                  ).map((item) => (
                    <div key={item} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      fontFamily: FB, fontSize: "0.8rem", color: C.gray,
                    }}>
                      <span style={{ color: C.yellow, fontSize: "0.5rem" }}>▸</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <div style={{
        borderTop: `1px solid ${C.borderY}`, background: C.bgDeep,
        padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.14em", color: C.grayDark }}>
          {lang === "zh" ? "ECHOES OF HEALING · 回响疗愈" : "ECHOES OF HEALING · 回响疗愈"}
        </span>
        <button onClick={onBack} style={{
          fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.12em",
          color: C.yellow, background: "none", border: `1px solid ${C.borderY}`,
          padding: "8px 20px", cursor: "pointer",
        }}>
          {lang === "zh" ? "← 返回项目列表" : "← Back to Projects"}
        </button>
        <span style={{ fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.14em", color: C.grayDark }}>
          {lang === "zh" ? "服务设计 · VR疗愈 · AI交互" : "Service Design · VR Therapy · AI Interaction"}
        </span>
      </div>
    </div>
  );
}
