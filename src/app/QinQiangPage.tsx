import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLanguage } from "./LanguageContext";

// ── 素材图片导入 ──────────────────────────────────────────────────────
// Slide 21: 建模渲染
import imgHeroChar from "@/imports/21/b7c6a037719a4b157e14d3d95e12437fa8b80d4f.png";
import imgRenderTop from "@/imports/21/c3890c60e171954da6962f8f28882876e75bbbb9.png";
import imgRenderA from "@/imports/21/52f097af85c8a00390bdb463eac276cb3797bb80.png";
import imgRenderB from "@/imports/21/cf91e09f47589c591c48338f3946955d64cf79c8.png";
import imgRenderC from "@/imports/21/9b4a38b5082f5eb034e157dcaf46ad87c2cfc319.png";
import imgRenderFront from "@/imports/21/62ad8a6653bf2a75f6ff1f9f4b32e4700e8a2ec3.png";
import imgRenderSide from "@/imports/21/4c0f7d2570ebef673bca66667cc7cbf9f21f1e6f.png";
// Slide 19: 用户画像
import imgPersona1 from "@/imports/19/58ba763dd93477184a2a9c5107ab347186d07f85.png";
import imgPersona2 from "@/imports/19/0aa4a0bd4fb20ff0544074175012bc16846d0bb2.png";
import imgPersona3 from "@/imports/19/c239b1c6cee14337aa343745b918ab29bfda389b.png";
// Slide 20: AIGC脑暴
import imgInkWash from "@/imports/20/74c118b2beff997b313e27fcc75851c2945b3bfa.png";
import imgAIGC1 from "@/imports/20/d2ff11d676f01ef8e6c5ef371c56a6207d4ae03e.png";
import imgAIGC2 from "@/imports/20/63196954274d1b247ad6be7b3b31180c998e7ed3.png";
// Slide 22: UI界面
import imgUI1 from "@/imports/22/6a60b9bd70722bd4e3947b8a7272f0cffdde10de.png";
import imgUI2 from "@/imports/22/a6c045308e8b64328bee1b64440d0da3bffda8ac.png";
import imgUI3 from "@/imports/22/fcd6546e459659581a647ce00ef412b4980f95fb.png";
// Slide 23: 交互流程
import imgFlow1 from "@/imports/23/65c948ecb6ea13b099dc2a8c88baf30875025794.png";
import imgFlow2 from "@/imports/23/03a74867d243ee47ad27347fb90de73ef950d66d.png";
import imgFlow3 from "@/imports/23/404cc4c5f78f7cf90dbe5792039ac6c49fda16ca.png";

// ── 色彩令牌 ──────────────────────────────────────────────────────────
const C = {
  bg:        "#F8EEE4",
  bgAlt:     "#F0E4D4",
  bgDeep:    "#E8D8C4",
  ink:       "#1A1208",
  inkMid:    "#3D3020",
  inkMuted:  "#8C7A68",
  inkFaint:  "#C4AD98",
  red:       "#E26150",
  redDeep:   "#C04030",
  redFaint:  "rgba(226,97,80,0.10)",
  blue:      "#154A97",
  blueFaint: "rgba(21,74,151,0.08)",
  border:    "rgba(26,18,8,0.10)",
  borderMed: "rgba(26,18,8,0.20)",
};

const FD = "'Noto Serif SC', serif";
const FB = "'Space Grotesk', system-ui, sans-serif";
const FM = "'Space Mono', monospace";

// ── 锚点导航章节 ──────────────────────────────────────────────────────
const SECS = [
  { id: "hero",      zh: "开幕",      en: "Opening" },
  { id: "bg",        zh: "项目背景",  en: "Background" },
  { id: "user",      zh: "用户研究",  en: "User Research" },
  { id: "strategy",  zh: "设计策略",  en: "Strategy" },
  { id: "aigc",      zh: "AIGC 创作", en: "AIGC Creation" },
  { id: "journey",   zh: "体验流程",  en: "Experience Flow" },
  { id: "ui",        zh: "界面设计",  en: "UI Design" },
  { id: "prototype", zh: "原型展示",  en: "Prototype" },
  { id: "final",     zh: "最终体验",  en: "Final Experience" },
];

// ── 滚动入场动画 ─────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 28 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -48px 0px" });
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : y }}
      transition={{ duration: inView ? 0.72 : 0.3, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Section 包裹 ──────────────────────────────────────────────────────
function Section({ id, alt = false, deep = false, children }: {
  id: string; alt?: boolean; deep?: boolean; children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{
        background: deep ? C.bgDeep : alt ? C.bgAlt : C.bg,
        borderBottom: `1px solid ${C.border}`,
        scrollMarginTop: "72px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 48px" }}>
        {children}
      </div>
    </section>
  );
}

// ── 章节大标题 ─────────────────────────────────────────────────────
function SHead({ num, zh, en }: { num: string; zh: string; en: string }) {
  const { lang } = useLanguage();
  return (
    <Reveal>
      <div style={{ marginBottom: "56px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px" }}>
          <span style={{
            fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color: C.red, opacity: 0.85,
          }}>
            {num}
          </span>
          <div style={{ height: "1px", flex: 1, background: C.border }} />
        </div>
        <h2 style={{
          fontFamily: FD, fontSize: "clamp(2.4rem,5vw,4rem)",
          fontWeight: 700, color: C.ink, letterSpacing: "-0.02em", lineHeight: 1.1,
        }}>
          {lang === "zh" ? zh : en}
        </h2>
      </div>
    </Reveal>
  );
}

// ── 数据圆环 (SVG) ────────────────────────────────────────────────
function Donut({ pct, label, sub, color = C.red }: { pct: number; label: string; sub: string; color?: string }) {
  const r = 40; const circ = 2 * Math.PI * r;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke={C.border} strokeWidth="7" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${(pct / 100) * circ} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)" />
        <text x="50" y="48" textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: FM, fontSize: "13px", fill: color, fontWeight: "bold" }}>
          {pct}%
        </text>
        <text x="50" y="64" textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: FD, fontSize: "9px", fill: C.inkMuted }}>
          {sub}
        </text>
      </svg>
      <p style={{ fontFamily: FD, fontSize: "0.82rem", color: C.inkMid, marginTop: "6px" }}>{label}</p>
    </div>
  );
}

// ── 右侧锚点导航 ──────────────────────────────────────────────────
function AnchorNav() {
  const { lang } = useLanguage();
  const [active, setActive] = useState("hero");
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
      flexDirection: "column", gap: "5px", zIndex: 40,
    }}>
      {SECS.map(({ id, zh, en }) => {
        const label = lang === "zh" ? zh : en;
        return (
          <button key={id} onClick={() => go(id)} title={label} style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            gap: "8px", background: "none", border: "none", cursor: "pointer", padding: "2px 0",
          }}>
            <span style={{
              fontFamily: FM, fontSize: "0.55rem", color: active === id ? C.red : C.inkFaint,
              letterSpacing: "0.08em", transition: "color 0.25s", whiteSpace: "nowrap",
            }}>
              {active === id ? label : ""}
            </span>
            <span style={{
              width: active === id ? "18px" : "5px", height: "1.5px",
              background: active === id ? C.red : C.inkFaint,
              transition: "all 0.28s ease", display: "inline-block",
            }} />
          </button>
        );
      })}
    </nav>
  );
}

// ── 用户画像卡片 ──────────────────────────────────────────────────
function PersonaCard({ photo, name, age, role, core, pains, color = C.red }: {
  photo: string; name: string; age: string; role: string; core: string; pains: string[]; color?: string;
}) {
  const { lang } = useLanguage();
  return (
    <div style={{
      background: C.bg, border: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ height: "200px", overflow: "hidden", background: C.bgAlt }}>
        <img src={photo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontFamily: FD, fontSize: "1.4rem", fontWeight: 700, color: C.ink, margin: 0 }}>{name}</h3>
          <p style={{ fontFamily: FB, fontSize: "0.8rem", color: C.inkMuted, margin: "4px 0 0" }}>{age} · {role}</p>
        </div>
        <div style={{
          padding: "12px", background: C.bgAlt, borderLeft: `3px solid ${color}`,
          marginBottom: "16px",
        }}>
          <p style={{ fontFamily: FD, fontSize: "0.8rem", color: C.inkMid, lineHeight: 1.6, margin: 0 }}>
            {lang === "zh" ? "核心诉求：" : "Core Need: "}{core}
          </p>
        </div>
        <div>
          <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.12em", color: C.inkMuted, marginBottom: "8px" }}>
            {lang === "zh" ? "主要痛点" : "PAIN POINTS"}
          </p>
          {pains.map((p, i) => (
            <div key={i} style={{
              display: "flex", gap: "8px", alignItems: "flex-start",
              fontFamily: FD, fontSize: "0.8rem", color: C.inkMid, lineHeight: 1.55,
              marginBottom: "6px",
            }}>
              <span style={{ color, flexShrink: 0, marginTop: "2px" }}>◆</span>
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 流程步骤 ──────────────────────────────────────────────────────
function FlowStep({ num, label, desc, img, isLast = false }: {
  num: string; label: string; desc: string; img?: string; isLast?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "50%",
          background: C.red, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: FM, fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, zIndex: 1,
        }}>
          {num}
        </div>
        {!isLast && (
          <div style={{ width: "2px", flex: 1, minHeight: "60px", background: C.border, marginTop: "4px" }} />
        )}
      </div>
      <div style={{ marginLeft: "20px", paddingBottom: isLast ? 0 : "40px", flex: 1 }}>
        <h4 style={{
          fontFamily: FD, fontSize: "1.15rem", fontWeight: 700, color: C.ink,
          margin: "8px 0 6px",
        }}>{label}</h4>
        <p style={{ fontFamily: FB, fontSize: "0.85rem", color: C.inkMuted, lineHeight: 1.65, marginBottom: img ? "16px" : 0 }}>
          {desc}
        </p>
        {img && (
          <div style={{ borderRadius: "12px", overflow: "hidden", maxWidth: "200px", boxShadow: "0 8px 32px rgba(26,18,8,0.18)" }}>
            <img src={img} alt={label} style={{ width: "100%", display: "block", objectFit: "cover" }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// 主组件
// ═════════════════════════════════════════════════════════════════════
export default function QinQiangPage({ onBack }: { onBack: () => void }) {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1300);
    const t4 = setTimeout(() => setPhase(4), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FB }}>
      <style>{`
        @keyframes inkBloom {
          0%   { transform: scale(0.3); opacity: 0; }
          40%  { opacity: 0.55; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes inkPulse {
          0%, 100% { opacity: 0.07; }
          50%       { opacity: 0.14; }
        }
        @keyframes scanX {
          0%   { left: -20%; }
          100% { left: 120%; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
        .qq-char-hover { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .qq-char-hover:hover { transform: scale(1.03); }
        .qq-img-zoom { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .qq-img-zoom:hover { transform: scale(1.04); }
      `}</style>

      <AnchorNav />

      {/* 返回按钮 */}
      <button
        onClick={onBack}
        style={{
          position: "fixed", top: "72px", left: "24px", zIndex: 45,
          background: "rgba(248,238,228,0.88)", backdropFilter: "blur(8px)",
          border: `1px solid ${C.border}`, padding: "8px 16px",
          fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.12em",
          color: C.inkMuted, cursor: "pointer",
        }}
      >
        {lang === "zh" ? "← 返回项目" : "← Back"}
      </button>

      {/* ════════════════════════════════════════
          首屏 Hero
      ════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: "relative", minHeight: "100vh",
          background: C.bg, overflow: "hidden",
          display: "flex", alignItems: "center",
          paddingTop: "72px", scrollMarginTop: "72px",
        }}
      >
        {/* 水墨扩散 blob 动画 */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0,
        }}>
          {/* 主 blob */}
          <div style={{
            position: "absolute", right: "8%", top: "15%",
            width: "55vw", height: "75vh",
            background: `radial-gradient(ellipse at 60% 40%, rgba(226,97,80,0.13) 0%, rgba(226,97,80,0.04) 50%, transparent 70%)`,
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 1.2s ease",
            animation: "inkPulse 6s ease-in-out infinite",
          }} />
          {/* 次 blob */}
          <div style={{
            position: "absolute", left: "-5%", bottom: "10%",
            width: "40vw", height: "50vh",
            background: `radial-gradient(ellipse, rgba(21,74,151,0.07) 0%, transparent 65%)`,
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 1s ease 0.4s",
          }} />
          {/* 水墨纹理素材叠加 */}
          <img
            src={imgInkWash}
            alt=""
            aria-hidden
            style={{
              position: "absolute", top: "-10%", right: "-5%",
              width: "60%", height: "120%",
              objectFit: "cover", mixBlendMode: "multiply",
              opacity: phase >= 2 ? 0.06 : 0,
              transition: "opacity 1.5s ease",
            }}
          />
          {/* 扫描线 */}
          {phase >= 3 && (
            <div style={{
              position: "absolute", top: 0, bottom: 0, width: "2px",
              background: "linear-gradient(to bottom, transparent, rgba(226,97,80,0.5) 40%, rgba(226,97,80,0.9) 50%, rgba(226,97,80,0.5) 60%, transparent)",
              left: "-20%",
              animation: "scanX 1.4s cubic-bezier(0.16,1,0.3,1) forwards",
            }} />
          )}
          {/* 装饰纹样点 */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%`,
              width: "4px", height: "4px", borderRadius: "50%",
              background: C.red,
              opacity: phase >= 4 ? (0.15 - i * 0.02) : 0,
              transition: `opacity 0.5s ease ${i * 0.1}s`,
            }} />
          ))}
        </div>

        {/* Hero 主体内容 */}
        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "0 48px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px",
          alignItems: "center", position: "relative", zIndex: 1,
          width: "100%",
        }}>
          {/* 左：文字区 */}
          <div>
            {/* 项目编号 */}
            <motion.div
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 12 }}
              transition={{ duration: 0.6 }}
              style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}
            >
              <span style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.22em", color: C.red }}>
                {lang === "zh" ? "文化创新 · 体验设计 · AIGC" : "Cultural Innovation · Experience Design · AIGC"}
              </span>
            </motion.div>

            {/* 主标题 */}
            <motion.div
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 style={{
                fontFamily: FD, fontWeight: 900,
                fontSize: "clamp(3rem, 7vw, 6rem)",
                color: C.ink, lineHeight: 1.05,
                letterSpacing: "-0.03em", margin: 0,
              }}>
                {lang === "zh" ? (
                  <>
                    <span style={{ color: C.red }}>入戏</span>
                    <br />
                    <span style={{ fontSize: "0.62em", fontWeight: 700 }}>·秦腔</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: C.red }}>Into the Play</span>
                    <br />
                    <span style={{ fontSize: "0.62em", fontWeight: 700 }}>· Qin Opera</span>
                  </>
                )}
              </h1>
              <h2 style={{
                fontFamily: FD, fontWeight: 400,
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                color: C.inkMid, margin: "16px 0 0",
                letterSpacing: "0.02em", lineHeight: 1.5,
              }}>
                {lang === "zh" ? "个性化文创体验站设计" : "Personalized Cultural Experience Station Design"}
              </h2>
            </motion.div>

            {/* 标签组 */}
            <motion.div
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 14 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "32px" }}
            >
              {(lang === "zh"
                ? ["体验设计", "文化创新", "AIGC 交互", "XR 体验"]
                : ["Experience Design", "Cultural Innovation", "AIGC Interaction", "XR Experience"]
              ).map((tag, i) => {
                const isHighlight = i === 2;
                return (
                  <span key={i} style={{
                    fontFamily: FM, fontSize: "0.65rem", letterSpacing: "0.1em",
                    padding: "6px 14px",
                    border: `1px solid ${isHighlight ? C.red : C.borderMed}`,
                    color: isHighlight ? C.red : C.inkMuted,
                    background: isHighlight ? C.redFaint : "transparent",
                  }}>
                    {tag}
                  </span>
                );
              })}
            </motion.div>

            {/* 项目元数据 */}
            <motion.div
              animate={{ opacity: phase >= 4 ? 0.8 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ display: "flex", gap: "24px", marginTop: "40px", flexWrap: "wrap" }}
            >
              {(lang === "zh"
                ? [["项目类型", "毕业设计·校企联合"], ["设计时间", "2024–2025"], ["核心方向", "东方未来主义"]]
                : [["Project Type", "Graduation Design · Industry Collaboration"], ["Timeline", "2024–2025"], ["Core Direction", "Oriental Futurism"]]
              ).map(([k, v]) => (
                <div key={k}>
                  <p style={{ fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.14em", color: C.inkFaint, margin: "0 0 3px" }}>{k}</p>
                  <p style={{ fontFamily: FD, fontSize: "0.85rem", color: C.inkMid, margin: 0 }}>{v}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 右：秦腔人物 */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <motion.div
              animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 1.05 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="qq-char-hover"
              style={{ animation: phase >= 4 ? "floatY 6s ease-in-out infinite" : "none" }}
            >
              <img
                src={imgHeroChar}
                alt={lang === "zh" ? "秦腔戏曲人物" : "Qin Opera character"}
                style={{
                  width: "min(480px, 90%)",
                  maxHeight: "75vh",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                  filter: "drop-shadow(0 20px 48px rgba(226,97,80,0.18))",
                }}
              />
            </motion.div>
            {/* 装饰圆环 */}
            <div style={{
              position: "absolute", right: "0", top: "10%",
              width: "120px", height: "120px", borderRadius: "50%",
              border: `1px solid ${C.red}`, opacity: phase >= 3 ? 0.18 : 0,
              transition: "opacity 0.8s ease",
            }} />
            <div style={{
              position: "absolute", left: "5%", bottom: "15%",
              width: "60px", height: "60px", borderRadius: "50%",
              border: `1px solid ${C.inkFaint}`, opacity: phase >= 3 ? 0.25 : 0,
              transition: "opacity 0.8s ease 0.2s",
            }} />
          </div>
        </div>

        {/* 底部滚动提示 */}
        <motion.div
          animate={{ opacity: phase >= 4 ? 0.5 : 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
            fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.18em", color: C.inkMuted,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          }}
        >
          <span>{lang === "zh" ? "向下探索" : "Scroll to Explore"}</span>
          <div style={{
            width: "1px", height: "32px",
            background: `linear-gradient(to bottom, ${C.red}, transparent)`,
          }} />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          01 项目背景
      ════════════════════════════════════════ */}
      <Section id="bg" alt>
        <SHead num="01" zh="项目背景" en="Project Background" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start" }}>
          <Reveal>
            <div>
              <h3 style={{ fontFamily: FD, fontSize: "1.15rem", fontWeight: 700, color: C.ink, marginBottom: "16px" }}>
                {lang === "zh" ? "设计挑战" : "Design Challenge"}
              </h3>
              <p style={{ fontFamily: FD, fontSize: "0.92rem", color: C.inkMid, lineHeight: 1.8, marginBottom: "28px" }}>
                {lang === "zh"
                  ? "如何通过模块化设计与数字赋能，让传统秦腔从「被观看的文化」转变为「用户可以参与创造的文化体验」？降低理解门槛，让年轻用户重新连接秦腔文化。"
                  : "How can modular design and digital empowerment transform traditional Qin Opera from a 'culture to be watched' into a 'culture users can participate in creating'? Lower the barrier to understanding and help young audiences reconnect with Qin Opera heritage."}
              </p>
              <div style={{
                padding: "20px 24px",
                background: C.bg,
                borderLeft: `3px solid ${C.red}`,
                border: `1px solid ${C.border}`,
                borderLeftWidth: "3px",
              }}>
                <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.16em", color: C.red, marginBottom: "10px" }}>
                  {lang === "zh" ? "调研数据 · N=67" : "SURVEY DATA · N=67"}
                </p>
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "space-around" }}>
                  <Donut pct={76}
                    label={lang === "zh" ? "听说过但不了解" : "Heard of but unfamiliar"}
                    sub={lang === "zh" ? "受访者" : "respondents"} />
                  <Donut pct={73}
                    label={lang === "zh" ? "愿意接收文化传播" : "Open to cultural outreach"}
                    sub={lang === "zh" ? "受访者" : "respondents"} color={C.blue} />
                  <Donut pct={54}
                    label={lang === "zh" ? "年龄 19–25 岁" : "Age 19–25"}
                    sub={lang === "zh" ? "受访者" : "respondents"} color={C.red} />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <h3 style={{ fontFamily: FD, fontSize: "1.15rem", fontWeight: 700, color: C.ink, marginBottom: "20px" }}>
                {lang === "zh" ? "秦腔的吸引力与疏离感" : "Qin Opera: Appeal & Distance"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {(lang === "zh" ? [
                  { tag: "吸引力", items: ["丰富的历史故事和人物", "华丽的舞台妆造", "高亢有力的唱腔"], color: C.red },
                  { tag: "疏离感", items: ["节奏较慢，内容晦涩", '感觉"土气"', "宣传渠道有限"], color: C.inkMuted },
                ] : [
                  { tag: "Appeal", items: ["Rich historical stories and characters", "Spectacular stage costumes and makeup", "Powerful, resonant vocal style"], color: C.red },
                  { tag: "Distance", items: ["Slow pacing, obscure content", 'Perceived as old-fashioned', "Limited promotional channels"], color: C.inkMuted },
                ]).map(({ tag, items, color }) => (
                  <div key={tag}>
                    <div style={{
                      fontFamily: FD, fontSize: "0.75rem", color, fontWeight: 700,
                      padding: "4px 10px", border: `1px solid ${color}`,
                      display: "inline-block", marginBottom: "12px",
                      opacity: (tag === "疏离感" || tag === "Distance") ? 0.7 : 1,
                    }}>
                      {tag}
                    </div>
                    {items.map((it, idx) => (
                      <div key={idx} style={{
                        fontFamily: FD, fontSize: "0.82rem", color: C.inkMid, lineHeight: 1.6,
                        paddingLeft: "12px", borderLeft: `2px solid ${color}`,
                        marginBottom: "8px",
                        opacity: (tag === "疏离感" || tag === "Distance") ? 0.75 : 1,
                      }}>
                        {it}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "24px" }}>
                <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.14em", color: C.inkMuted, marginBottom: "12px" }}>
                  {lang === "zh" ? "用户期待的互动方式" : "DESIRED INTERACTION MODES"}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {(lang === "zh"
                    ? ["AI 换妆 · 数字化服饰", "科技 AI 赋能", "沉浸式剧场", "互动游戏", "乐器体验"]
                    : ["AI Makeover · Digital Costume", "AI-Powered Technology", "Immersive Theater", "Interactive Games", "Instrument Experience"]
                  ).map((t, i) => (
                    <span key={i} style={{
                      fontFamily: FD, fontSize: "0.75rem", color: C.red,
                      padding: "5px 12px",
                      border: `1px solid rgba(226,97,80,0.35)`,
                      background: C.redFaint,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          02 用户研究
      ════════════════════════════════════════ */}
      <Section id="user">
        <SHead num="02" zh="用户研究" en="User Research" />
        <Reveal>
          <p style={{ fontFamily: FD, fontSize: "0.95rem", color: C.inkMuted, maxWidth: "600px", lineHeight: 1.75, marginBottom: "48px" }}>
            {lang === "zh"
              ? "通过用户访谈与问卷调研，建立三类典型用户画像，覆盖新奇体验追求者、文化深度挖掘者与家庭休闲用户三种需求维度。"
              : "Through user interviews and surveys, we developed three representative user personas covering the dimensions of novelty seekers, cultural depth explorers, and family leisure visitors."}
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          <Reveal delay={0}>
            <PersonaCard
              photo={imgPersona1}
              name={lang === "zh" ? "思涵" : "Sihan"}
              age={lang === "zh" ? "22岁" : "22 yrs"}
              role={lang === "zh" ? "在校大学生" : "University Student"}
              core={lang === "zh"
                ? "好玩、好看、好分享，15分钟内获得值得发朋友圈的酷炫体验"
                : "Fun, visually stunning, and shareable — a cool experience worth posting about within 15 minutes"}
              pains={lang === "zh"
                ? ["听不懂秦腔，不知道好在哪", "传统展览有点无聊，无法激发分享欲"]
                : ["Can't understand Qin Opera or why it's special", "Traditional exhibitions feel dull with nothing worth sharing"]}
              color={C.red}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <PersonaCard
              photo={imgPersona2}
              name={lang === "zh" ? "老马" : "Lao Ma"}
              age={lang === "zh" ? "28岁" : "28 yrs"}
              role={lang === "zh" ? "文化行业从业者" : "Cultural Industry Professional"}
              core={lang === "zh"
                ? "打破那层玻璃，让我不仅能看热闹，更能看懂门道"
                : "Break through the glass wall — I want to understand the craft, not just watch the spectacle"}
              pains={lang === "zh"
                ? ["像在看没有字幕的外国电影，无法理解演员的唱词", "展览信息碎片化，缺乏系统解读"]
                : ["Like watching a foreign film without subtitles — the lyrics are incomprehensible", "Exhibition information is fragmented with no systematic interpretation"]}
              color={C.blue}
            />
          </Reveal>
          <Reveal delay={0.16}>
            <PersonaCard
              photo={imgPersona3}
              name={lang === "zh" ? "江妈" : "Jiang Mum"}
              age={lang === "zh" ? "35岁" : "35 yrs"}
              role={lang === "zh" ? "在职母亲 · 带孩子（5岁）" : "Working Mother · With Child (age 5)"}
              core={lang === "zh"
                ? "轻松愉快、能让孩子也参与的家庭活动，在玩乐中接触传统文化"
                : "A relaxed, joyful family activity where even the kids can join in and discover traditional culture through play"}
              pains={lang === "zh"
                ? ["传统戏曲的慢节奏让孩子感到无聊", "自己是门外汉，不知道如何给孩子讲解"]
                : ["The slow pace of traditional opera bores young children", "She's a novice herself and doesn't know how to explain it to her child"]}
              color="#8C7A68"
            />
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          03 设计策略
      ════════════════════════════════════════ */}
      <Section id="strategy" alt>
        <SHead num="03" zh="设计策略" en="Design Strategy" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
          <Reveal>
            <div>
              <h3 style={{ fontFamily: FD, fontSize: "1.15rem", fontWeight: 700, color: C.ink, marginBottom: "28px" }}>
                {lang === "zh" ? "文化转化路径" : "Cultural Transformation Pathway"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {(lang === "zh" ? [
                  { node: "秦腔文化", desc: "传统戏曲审美·表演形式·角色语言", color: C.ink },
                  { node: "文化提取", desc: "视觉元素·音律·动作·角色原型", color: C.inkMid },
                  { node: "AI 生成", desc: "AIGC 角色创作·数字服饰·个人 IP", color: C.blue },
                  { node: "用户创造", desc: "参数化定制·表演参与·互动叙事", color: C.red },
                  { node: "数字传播", desc: "纪念品·社交分享·文化破圈", color: C.red },
                ] : [
                  { node: "Qin Opera Heritage", desc: "Traditional aesthetics · Performance forms · Character language", color: C.ink },
                  { node: "Cultural Extraction", desc: "Visual elements · Rhythm · Movement · Character archetypes", color: C.inkMid },
                  { node: "AI Generation", desc: "AIGC character creation · Digital costume · Personal IP", color: C.blue },
                  { node: "User Creation", desc: "Parametric customization · Performance participation · Interactive narrative", color: C.red },
                  { node: "Digital Dissemination", desc: "Souvenirs · Social sharing · Cultural reach", color: C.red },
                ]).map(({ node, desc, color }, i) => (
                  <div key={i} style={{ display: "flex", gap: "0" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40px", flexShrink: 0 }}>
                      <div style={{
                        width: "10px", height: "10px", borderRadius: "50%",
                        background: color, flexShrink: 0,
                        boxShadow: color === C.red ? `0 0 0 4px rgba(226,97,80,0.15)` : "none",
                      }} />
                      {i < 4 && <div style={{ width: "1px", height: "40px", background: C.border }} />}
                    </div>
                    <div style={{ paddingBottom: "32px" }}>
                      <p style={{
                        fontFamily: FD, fontWeight: 700, fontSize: "1rem",
                        color: color, margin: "0 0 4px", lineHeight: 1,
                      }}>{node}</p>
                      <p style={{ fontFamily: FD, fontSize: "0.8rem", color: C.inkMuted, margin: 0, lineHeight: 1.5 }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {(lang === "zh" ? [
                { title: "降低理解门槛", desc: "以 AI 和互动体验替代说教式传播，让用户在「做」中理解" },
                { title: "个性化赋权", desc: "用户创造属于自己的秦腔 IP 角色，从观众变成创作者" },
                { title: "东方未来主义", desc: "传统审美与数字科技融合，形成独特视觉语言" },
                { title: "社交货币化", desc: "可分享的数字纪念品与体验，驱动文化的自然传播" },
              ] : [
                { title: "Lower the Barrier", desc: "Replace didactic transmission with AI and interactive experience — users understand by doing" },
                { title: "Personalized Empowerment", desc: "Users create their own Qin Opera IP character, transforming from audience to author" },
                { title: "Oriental Futurism", desc: "Traditional aesthetics fused with digital technology, forming a distinctive visual language" },
                { title: "Social Currency", desc: "Shareable digital souvenirs and experiences that drive organic cultural spread" },
              ]).map(({ title, desc }) => (
                <div key={title} style={{
                  padding: "20px", background: C.bg, border: `1px solid ${C.border}`,
                  borderTop: `2px solid ${C.red}`,
                }}>
                  <h4 style={{ fontFamily: FD, fontWeight: 700, fontSize: "0.9rem", color: C.ink, marginBottom: "8px" }}>
                    {title}
                  </h4>
                  <p style={{ fontFamily: FD, fontSize: "0.78rem", color: C.inkMuted, lineHeight: 1.6, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          04 AIGC 创作过程
      ════════════════════════════════════════ */}
      <Section id="aigc">
        <SHead num="04" zh="AIGC 创作过程" en="AIGC Creation Process" />
        <Reveal>
          <p style={{ fontFamily: FD, fontSize: "0.95rem", color: C.inkMuted, maxWidth: "680px", lineHeight: 1.75, marginBottom: "40px" }}>
            {lang === "zh"
              ? "以 AI 提示词为设计工具，探索秦腔人物角色生成、戏服参数化设计与数字 IP 生成流程。从《秦韵长歌》桌游概念出发，最终聚焦「入戏·秦腔」互动型文创体验站方向。"
              : "Using AI prompts as a design tool, we explored Qin Opera character generation, parametric costume design, and digital IP creation workflows. Starting from the 'Qin Rhyme' board game concept, the project ultimately focused on the 'Into the Play · Qin Opera' interactive cultural experience station."}
          </p>
        </Reveal>

        {/* 水墨背景 + 大图展示 */}
        <Reveal delay={0.08}>
          <div style={{
            position: "relative", borderRadius: "4px", overflow: "hidden",
            marginBottom: "28px",
            boxShadow: "0 8px 48px rgba(26,18,8,0.12)",
          }}>
            <img src={imgAIGC2} alt={lang === "zh" ? "AIGC 脑暴过程" : "AIGC ideation process"} className="qq-img-zoom"
              style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "520px" }} />
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <Reveal delay={0.1}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img src={imgAIGC1} alt={lang === "zh" ? "AIGC 概念文档" : "AIGC concept document"} className="qq-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "16px 20px",
                background: "linear-gradient(to top, rgba(26,18,8,0.7), transparent)",
              }}>
                <p style={{ fontFamily: FD, fontSize: "0.85rem", color: "#fff", margin: 0 }}>
                  {lang === "zh" ? "概念探索 · AI 提示词工程" : "Concept Exploration · AI Prompt Engineering"}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {(lang === "zh" ? [
                { tag: "人物生成", desc: "秦腔角色 IP 原型探索：旦、生、净、丑四大行当的数字化还原" },
                { tag: "戏服设计", desc: "参数化戏服生成系统：颜色·图案·配饰·身段动作的 AI 辅助创作" },
                { tag: "数字 IP", desc: "用户专属秦腔人格：结合面部特征与偏好，生成个性化角色卡片" },
              ] : [
                { tag: "Character Generation", desc: "Qin Opera character IP prototyping: digital rendering of the four role types — Dan, Sheng, Jing, and Chou" },
                { tag: "Costume Design", desc: "Parametric costume generation system: AI-assisted creation of color, pattern, accessories, and movement" },
                { tag: "Digital IP", desc: "User-exclusive Qin Opera persona: personalized character cards generated from facial features and preferences" },
              ]).map(({ tag, desc }) => (
                <div key={tag} style={{
                  padding: "20px 24px",
                  border: `1px solid ${C.border}`,
                  borderLeft: `3px solid ${C.red}`,
                  background: C.bgAlt,
                }}>
                  <p style={{
                    fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.12em",
                    color: C.red, marginBottom: "8px",
                  }}>
                    {tag}
                  </p>
                  <p style={{ fontFamily: FD, fontSize: "0.85rem", color: C.inkMid, lineHeight: 1.65, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          05 用户体验流程
      ════════════════════════════════════════ */}
      <Section id="journey" alt>
        <SHead num="05" zh="用户体验流程" en="User Experience Flow" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          <Reveal>
            <div style={{ paddingTop: "8px" }}>
              <FlowStep num="01"
                label={lang === "zh" ? "文化引导与初始接触" : "Cultural Orientation & First Contact"}
                desc={lang === "zh"
                  ? "用户进入空间，通过互动装置快速了解秦腔基础知识与行当类型，建立初步认知。"
                  : "Visitors enter the space and quickly learn Qin Opera basics and role types through interactive installations, building initial awareness."}
              />
              <FlowStep num="02"
                label={lang === "zh" ? "生成个人秦腔角色" : "Generate a Personal Qin Opera Character"}
                desc={lang === "zh"
                  ? "AI 扫描用户面部特征，结合选择的行当与服饰参数，生成专属秦腔 IP 形象。"
                  : "AI scans the visitor's facial features and, combined with their chosen role type and costume parameters, generates a personalized Qin Opera IP avatar."}
                img={imgFlow1}
              />
              <FlowStep num="03"
                label={lang === "zh" ? "角色扮演式学习体验" : "Role-Play Learning Experience"}
                desc={lang === "zh"
                  ? "通过身体动作感应参与秦腔表演段落，在「做」中体验唱腔、身段与水袖。"
                  : "Visitors engage with Qin Opera performance scenes through motion sensing, experiencing singing style, body movements, and water sleeves by doing."}
                img={imgFlow2}
              />
              <FlowStep num="04"
                label={lang === "zh" ? "获得实体数字纪念品" : "Receive a Physical & Digital Souvenir"}
                desc={lang === "zh"
                  ? "体验结算后，生成专属数字纪念章与角色卡，可打印或分享到社交媒体。"
                  : "After the experience, a unique digital badge and character card are generated — printable or shareable on social media."}
                img={imgFlow3}
              />
              <FlowStep num="05"
                label={lang === "zh" ? "社交传播与持续参与" : "Social Sharing & Ongoing Engagement"}
                isLast
                desc={lang === "zh"
                  ? "体验内容可在线上持续参与，形成「线下体验→线上传播→再次引流」的闭环。"
                  : "The experience continues online, forming a closed loop of 'offline experience → online sharing → renewed traffic.'"}
              />
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div style={{ position: "sticky", top: "100px" }}>
              <div style={{
                padding: "32px", background: C.bg, border: `1px solid ${C.border}`,
              }}>
                <p style={{
                  fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.18em",
                  color: C.red, marginBottom: "20px",
                }}>
                  {lang === "zh" ? "设计理念" : "DESIGN PHILOSOPHY"}
                </p>
                <p style={{
                  fontFamily: FD, fontSize: "1.05rem", color: C.ink,
                  lineHeight: 1.75, margin: 0,
                }}>
                  {lang === "zh"
                    ? "「入戏」不仅是一种行为，更是一种身份的转变。我们希望每位访客离开时，都带走一个属于自己的秦腔故事。"
                    : '"Into the Play" is more than an action — it is a transformation of identity. We hope every visitor leaves carrying a Qin Opera story that is uniquely their own.'}
                </p>
                <div style={{ marginTop: "24px", borderTop: `1px solid ${C.border}`, paddingTop: "20px" }}>
                  {(lang === "zh"
                    ? [["平均体验时长", "15–20 分钟"], ["预期转化率", "73% 愿意分享"], ["文化渗透路径", "5 个递进节点"]]
                    : [["Avg. Session Length", "15–20 min"], ["Expected Share Rate", "73% willing to share"], ["Cultural Journey", "5 progressive touchpoints"]]
                  ).map(([k, v]) => (
                    <div key={k} style={{
                      display: "flex", justifyContent: "space-between",
                      fontFamily: FD, padding: "8px 0", borderBottom: `1px solid ${C.border}`,
                    }}>
                      <span style={{ fontSize: "0.82rem", color: C.inkMuted }}>{k}</span>
                      <span style={{ fontSize: "0.88rem", color: C.red, fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ════════════════════════════════════════
          06 交互界面设计
      ════════════════════════════════════════ */}
      <Section id="ui">
        <SHead num="06" zh="交互界面设计" en="Interaction & UI Design" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "28px" }}>
          {(lang === "zh" ? [
            { img: imgUI1, label: "角色生成", sub: "参数化交互界面" },
            { img: imgUI2, label: "表演参与", sub: "身体参与·表演式交互" },
            { img: imgUI3, label: "体验结算", sub: "数字纪念与延展界面" },
          ] : [
            { img: imgUI1, label: "Character Generation", sub: "Parametric Interaction Interface" },
            { img: imgUI2, label: "Performance Participation", sub: "Body Tracking · Performative Interaction" },
            { img: imgUI3, label: "Experience Checkout", sub: "Digital Souvenir & Extension Interface" },
          ]).map(({ img, label, sub }) => (
            <Reveal key={label} delay={0.06}>
              <div>
                <div style={{
                  borderRadius: "12px", overflow: "hidden",
                  boxShadow: "0 12px 48px rgba(26,18,8,0.22)",
                  marginBottom: "14px",
                }}>
                  <img src={img} alt={label} className="qq-img-zoom"
                    style={{ width: "100%", display: "block", objectFit: "cover" }} />
                </div>
                <div style={{ paddingLeft: "4px" }}>
                  <p style={{ fontFamily: FD, fontWeight: 700, fontSize: "0.95rem", color: C.ink, margin: "0 0 3px" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.1em", color: C.inkMuted, margin: 0 }}>
                    {sub}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div style={{
            padding: "20px 28px", background: C.bgAlt, border: `1px solid ${C.border}`,
            display: "flex", gap: "32px", flexWrap: "wrap",
          }}>
            {(lang === "zh" ? [
              ["深色东方主题", "以深红·墨黑·金色为主色，传统戏曲纹样为装饰语言"],
              ["模块化参数面板", "左侧实时预览·右侧参数调节，所见即所得"],
              ["动态角色渲染", "XR 全身捕捉与实时 3D 角色映射技术"],
            ] : [
              ["Dark Oriental Theme", "Deep red, ink black, and gold as primary colors; traditional opera patterns as decorative language"],
              ["Modular Parameter Panel", "Real-time preview on the left · Parameter controls on the right — WYSIWYG"],
              ["Dynamic Character Rendering", "XR full-body capture with real-time 3D character mapping technology"],
            ]).map(([k, v]) => (
              <div key={k} style={{ flex: "1", minWidth: "200px" }}>
                <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.12em", color: C.red, marginBottom: "6px" }}>{k}</p>
                <p style={{ fontFamily: FD, fontSize: "0.82rem", color: C.inkMid, lineHeight: 1.6, margin: 0 }}>{v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ════════════════════════════════════════
          07 原型展示
      ════════════════════════════════════════ */}
      <Section id="prototype" alt>
        <SHead num="07" zh="原型展示" en="Prototype Showcase" />
        <Reveal>
          <p style={{ fontFamily: FD, fontSize: "0.95rem", color: C.inkMuted, maxWidth: "680px", lineHeight: 1.75, marginBottom: "40px" }}>
            {lang === "zh"
              ? "基于场景调研与空间行为分析，完成展览亭体的三维建模与沉浸式渲染。以秦腔戏曲舞台为设计母题，融合传统建筑语言与数字展馆体验。"
              : "Based on site research and spatial behavior analysis, we completed 3D modeling and immersive rendering of the exhibition pavilion. Drawing on the Qin Opera stage as a design motif, the structure fuses traditional architectural language with a digital exhibition experience."}
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <Reveal>
            <div style={{
              overflow: "hidden", borderRadius: "4px",
              boxShadow: "0 8px 40px rgba(226,97,80,0.18)",
            }}>
              <img src={imgRenderA} alt={lang === "zh" ? "展览亭体渲染" : "Exhibition pavilion render"} className="qq-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "320px" }} />
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Reveal delay={0.08}>
              <div style={{ overflow: "hidden", borderRadius: "4px", boxShadow: "0 4px 20px rgba(26,18,8,0.14)" }}>
                <img src={imgRenderTop} alt={lang === "zh" ? "俯视图" : "Top view"} className="qq-img-zoom"
                  style={{ width: "100%", display: "block", objectFit: "cover" }} />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ overflow: "hidden", borderRadius: "4px", boxShadow: "0 4px 20px rgba(26,18,8,0.14)" }}>
                <img src={imgRenderFront} alt={lang === "zh" ? "正视图" : "Front view"} className="qq-img-zoom"
                  style={{ width: "100%", display: "block", objectFit: "cover" }} />
              </div>
            </Reveal>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[imgRenderB, imgRenderC, imgRenderSide, imgRenderA].map((img, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{ overflow: "hidden", borderRadius: "4px", aspectRatio: "4/3" }}>
                <img src={img} alt={lang === "zh" ? `渲染图 ${i + 1}` : `Render ${i + 1}`} className="qq-img-zoom"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════
          08 最终体验
      ════════════════════════════════════════ */}
      <section
        id="final"
        style={{
          background: C.ink, scrollMarginTop: "72px", position: "relative", overflow: "hidden",
        }}
      >
        {/* 水墨素材叠加 */}
        <img src={imgInkWash} alt="" aria-hidden style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", mixBlendMode: "screen", opacity: 0.04, pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 48px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <Reveal>
              <div>
                <p style={{
                  fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.22em",
                  color: C.red, marginBottom: "20px",
                }}>
                  {lang === "zh" ? "08 · 最终体验" : "08 · FINAL EXPERIENCE"}
                </p>
                <h2 style={{
                  fontFamily: FD, fontWeight: 900,
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  color: "#F8EEE4", lineHeight: 1.1,
                  letterSpacing: "-0.03em", margin: "0 0 24px",
                }}>
                  {lang === "zh" ? (
                    <>
                      传统文化
                      <br />
                      <span style={{ color: C.red }}>被数字重新唤醒</span>
                    </>
                  ) : (
                    <>
                      Traditional Culture
                      <br />
                      <span style={{ color: C.red }}>Reawakened by the Digital</span>
                    </>
                  )}
                </h2>
                <p style={{
                  fontFamily: FD, fontSize: "0.95rem", color: "rgba(248,238,228,0.65)",
                  lineHeight: 1.8, marginBottom: "36px",
                }}>
                  {lang === "zh"
                    ? "「入戏·秦腔」将传统秦腔文化 + AI 技术 + 用户参与三者结合，创造出一种新的数字文化体验方式。每一位访客都可以在 15 分钟内完成从陌生人到「秦腔角色扮演者」的身份转变。"
                    : '"Into the Play · Qin Opera" brings together traditional Qin Opera heritage, AI technology, and user participation to create a new model of digital cultural experience. Every visitor can complete the transformation from a stranger to a "Qin Opera performer" within 15 minutes.'}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {(lang === "zh"
                    ? ["体验设计", "文化创新", "AIGC 交互", "XR 体验", "东方未来主义"]
                    : ["Experience Design", "Cultural Innovation", "AIGC Interaction", "XR Experience", "Oriental Futurism"]
                  ).map((t, i) => (
                    <span key={i} style={{
                      fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.1em",
                      padding: "6px 14px", border: "1px solid rgba(248,238,228,0.2)",
                      color: "rgba(248,238,228,0.6)",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div style={{
                display: "flex", flexDirection: "column", gap: "20px",
              }}>
                {(lang === "zh" ? [
                  { n: "5", u: "个", label: "核心互动节点" },
                  { n: "15+", u: "分钟", label: "沉浸式体验时长" },
                  { n: "3", u: "类", label: "用户类型全覆盖" },
                ] : [
                  { n: "5", u: "", label: "Core Interactive Touchpoints" },
                  { n: "15+", u: "min", label: "Immersive Session Length" },
                  { n: "3", u: "", label: "User Types Fully Covered" },
                ]).map(({ n, u, label }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "20px 24px",
                    border: "1px solid rgba(248,238,228,0.1)",
                    background: "rgba(248,238,228,0.04)",
                  }}>
                    <div>
                      <span style={{
                        fontFamily: FD, fontWeight: 900,
                        fontSize: "2.4rem", color: C.red, lineHeight: 1,
                      }}>
                        {n}
                      </span>
                      <span style={{ fontFamily: FD, fontSize: "1rem", color: "rgba(248,238,228,0.5)", marginLeft: "4px" }}>
                        {u}
                      </span>
                    </div>
                    <p style={{ fontFamily: FD, fontSize: "0.9rem", color: "rgba(248,238,228,0.55)", margin: 0 }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 页脚 ─────────────────────────────────────────────────── */}
      <div style={{
        background: C.bgDeep, borderTop: `1px solid ${C.border}`,
        padding: "28px 48px", display: "flex",
        justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.14em", color: C.inkFaint }}>
          {lang === "zh" ? "入戏·秦腔 个性化文创体验站" : "Into the Play · Qin Opera Cultural Experience Station"}
        </span>
        <button onClick={onBack} style={{
          fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.12em",
          color: C.inkMuted, background: "none", border: `1px solid ${C.border}`,
          padding: "8px 20px", cursor: "pointer",
        }}>
          {lang === "zh" ? "← 返回项目列表" : "← Back to Projects"}
        </button>
        <span style={{ fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.14em", color: C.inkFaint }}>
          {lang === "zh" ? "体验设计 · AIGC · XR" : "Experience Design · AIGC · XR"}
        </span>
      </div>
    </div>
  );
}
