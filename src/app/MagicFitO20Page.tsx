import { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";
import { motion, useInView } from "motion/react";
import img24 from "@/imports/24.jpg";
import img25 from "@/imports/25.jpg";
import img26 from "@/imports/26.jpg";
import img27 from "@/imports/27.jpg";
import img28 from "@/imports/28.jpg";
import img29 from "@/imports/29.jpg";
import img30 from "@/imports/30.jpg";
import img31 from "@/imports/31.jpg";
import img32 from "@/imports/32.jpg";

// ── Design tokens ──────────────────────────────────────────────────
const C = {
  bg: "#FFFFFF",
  bgAlt: "#F7F7F7",
  bgDeep: "#EFEFEF",
  ink: "#0A0A0A",
  inkMid: "#3A3A3A",
  inkMuted: "#777777",
  inkFaint: "#BBBBBB",
  border: "rgba(0,0,0,0.10)",
  borderStrong: "rgba(0,0,0,0.18)",
  red: "#C8202A",
  redFaint: "rgba(200,32,42,0.08)",
  metallic: "#8A8A8A",
};
const FS = "'Space Grotesk', system-ui, sans-serif";
const FM = "'Space Mono', monospace";

// ── Anchor nav sections ────────────────────────────────────────────
const SECTIONS = [
  { id: "hero",       zh: "概览",    en: "Overview" },
  { id: "background", zh: "设计背景", en: "Background" },
  { id: "persona",    zh: "用户画像", en: "Persona" },
  { id: "concept",    zh: "概念发展", en: "Concept" },
  { id: "technology", zh: "技术实现", en: "Technology" },
  { id: "prototype",  zh: "原型测试", en: "Prototype" },
  { id: "final",      zh: "最终设计", en: "Final Design" },
  { id: "award",      zh: "获奖结果", en: "Award" },
];

// ── Reveal animation ───────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : y }}
      transition={{
        duration: inView ? 0.65 : 0.3,
        delay: inView ? delay : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────
function Section({
  id,
  children,
  alt = false,
}: {
  id: string;
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      style={{
        background: alt ? C.bgAlt : C.bg,
        borderBottom: `1px solid ${C.border}`,
        scrollMarginTop: "72px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 48px" }}>
        {children}
      </div>
    </section>
  );
}

// ── Section heading ────────────────────────────────────────────────
function SHead({ en, zh, accent = false }: { en: string; zh: string; accent?: boolean }) {
  const { lang } = useLanguage();
  return (
    <Reveal>
      <div style={{ marginBottom: "52px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          {accent && (
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                background: C.red,
                flexShrink: 0,
              }}
            />
          )}
          <span
            style={{
              fontFamily: FM,
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: accent ? C.red : C.inkMuted,
            }}
          >
            {lang === "en" ? zh : en}
          </span>
        </div>
        <h2
          style={{
            fontFamily: FS,
            fontSize: "clamp(2rem, 5vw, 3.6rem)",
            fontWeight: 700,
            color: C.ink,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {lang === "en" ? en : zh}
        </h2>
        <div
          style={{
            marginTop: "16px",
            height: "1px",
            background: `linear-gradient(to right, ${C.ink}, transparent)`,
            opacity: 0.12,
          }}
        />
      </div>
    </Reveal>
  );
}

// ── Right anchor nav ───────────────────────────────────────────────
function AnchorNav() {
  const { lang } = useLanguage();
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        right: "28px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        zIndex: 40,
      }}
      className="hidden xl:flex"
    >
      {SECTIONS.map(({ id, zh, en }) => {
        const label = lang === "en" ? en : zh;
        return (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 0",
          }}
        >
          <span
            style={{
              fontFamily: FM,
              fontSize: "0.58rem",
              color: active === id ? C.ink : C.inkFaint,
              letterSpacing: "0.08em",
              transition: "color 0.25s",
              whiteSpace: "nowrap",
            }}
          >
            {active === id ? label : ""}
          </span>
          <span
            style={{
              width: active === id ? "20px" : "6px",
              height: "1.5px",
              background: active === id ? C.ink : C.inkFaint,
              transition: "all 0.25s ease",
              display: "inline-block",
            }}
          />
        </button>
        );
      })}
    </nav>
  );
}

// ── Spec annotation row ────────────────────────────────────────────
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "10px 0",
        borderBottom: `1px solid ${C.border}`,
        gap: "16px",
      }}
    >
      <span style={{ fontFamily: FM, fontSize: "0.68rem", color: C.inkMuted, letterSpacing: "0.08em" }}>
        {label}
      </span>
      <span style={{ fontFamily: FS, fontSize: "0.88rem", fontWeight: 600, color: C.ink }}>
        {value}
      </span>
    </div>
  );
}

// ── Pain point chip ────────────────────────────────────────────────
function PainChip({ text }: { text: string }) {
  return (
    <div
      style={{
        padding: "10px 14px",
        border: `1px solid ${C.border}`,
        background: C.bgAlt,
        fontFamily: FS,
        fontSize: "0.82rem",
        color: C.inkMid,
        lineHeight: 1.5,
      }}
    >
      {text}
    </div>
  );
}

// ── Tech highlight chip ────────────────────────────────────────────
function TechBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: FM,
        fontSize: "0.62rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "5px 10px",
        border: `1px solid ${C.borderStrong}`,
        color: C.inkMid,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

// ── Hero scan line animation ───────────────────────────────────────
function HeroScanLine({ active }: { active: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 3,
        opacity: active ? 1 : 0,
        transition: "opacity 0.3s",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(180,180,180,0.6) 40%, rgba(255,255,255,0.9) 50%, rgba(180,180,180,0.6) 60%, transparent)",
          boxShadow: "0 0 12px rgba(200,200,200,0.5)",
          animation: active ? "scanDown 1.1s ease-out forwards" : "none",
        }}
      />
    </div>
  );
}

// ── Annotation line ────────────────────────────────────────────────
function AnnotationLine({
  x1, y1, x2, y2, label, labelX, labelY, visible,
}: {
  x1: number; y1: number; x2: number; y2: number;
  label: string; labelX: number; labelY: number;
  visible: boolean;
}) {
  return (
    <g style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease 0.2s" }}>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="0.5"
        strokeDasharray="4 3"
      />
      <circle cx={x1} cy={y1} r="2" fill="rgba(0,0,0,0.4)" />
      <text
        x={labelX}
        y={labelY}
        style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", fill: "rgba(0,0,0,0.55)", letterSpacing: "0.05em" }}
      >
        {label}
      </text>
    </g>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function MagicFitO20Page({ onBack }: { onBack: () => void }) {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1100);
    const t4 = setTimeout(() => setPhase(4), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FS }}>
      <style>{`
        @keyframes scanDown {
          0%   { top: 0%; }
          100% { top: 100%; }
        }
        .mf-img-zoom { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .mf-img-zoom:hover { transform: scale(1.025); }
      `}</style>

      <AnchorNav />

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "fixed",
          top: "72px",
          left: "24px",
          zIndex: 45,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          border: `1px solid ${C.border}`,
          padding: "8px 16px",
          fontFamily: FM,
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          color: C.inkMid,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {lang === "zh" ? "← 返回项目" : "← Back"}
      </button>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: "72px",
          scrollMarginTop: "72px",
        }}
      >
        {/* Large background watermark text */}
        <div
          style={{
            position: "absolute",
            bottom: "4%",
            right: "-2%",
            fontFamily: FS,
            fontWeight: 900,
            fontSize: "clamp(80px, 18vw, 220px)",
            color: "rgba(0,0,0,0.03)",
            letterSpacing: "-0.05em",
            userSelect: "none",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          O20
        </div>

        {/* iF Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : -10 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            top: "100px",
            left: "48px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              background: C.red,
              color: "#fff",
              fontFamily: FM,
              fontSize: "0.58rem",
              letterSpacing: "0.15em",
              padding: "6px 12px",
              textTransform: "uppercase",
            }}
          >
            iF Design Award 2025 · Winner
          </div>
          <div
            style={{
              fontFamily: FM,
              fontSize: "0.58rem",
              color: C.inkMuted,
              letterSpacing: "0.1em",
            }}
          >
            ID: 673720
          </div>
        </motion.div>

        {/* Product image with scan */}
        <div
          style={{
            position: "relative",
            width: "min(700px, 88vw)",
            marginBottom: "40px",
          }}
        >
          <HeroScanLine active={phase >= 2} />

          {/* SVG annotation overlay */}
          <svg
            viewBox="0 0 700 400"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            <AnnotationLine
              x1={200} y1={120} x2={80} y2={80}
              label={lang === "en" ? "Ti64 Alloy Frame" : "Ti64 合金框架"}
              labelX={8} labelY={75}
              visible={phase >= 3}
            />
            <AnnotationLine
              x1={480} y1={90} x2={610} y2={50}
              label={lang === "en" ? "Nitinol Nose Pad" : "镍钛记忆合金鼻托"}
              labelX={520} labelY={44}
              visible={phase >= 3}
            />
            <AnnotationLine
              x1={350} y1={240} x2={350} y2={340}
              label={lang === "en" ? "Screw-Free X-Round Hinge" : "无螺丝铰链 X-Round"}
              labelX={265} labelY={355}
              visible={phase >= 3}
            />
          </svg>

          <motion.img
            src={img24}
            alt="Magic Fit O20 titanium eyewear"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 1.04 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%",
              display: "block",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", zIndex: 5, position: "relative" }}
        >
          <p
            style={{
              fontFamily: FM,
              fontSize: "0.65rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: C.inkMuted,
              marginBottom: "12px",
            }}
          >
            {lang === "zh" ? "Magic Fit O20 · 3D打印定制化钛合金眼镜" : "Magic Fit O20 · 3D-Printed Titanium Alloy Eyewear"}
          </p>
          <h1
            style={{
              fontFamily: FS,
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              color: C.ink,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            X-ROUND
          </h1>
          <p
            style={{
              fontFamily: FS,
              fontSize: "1rem",
              color: C.inkMuted,
              marginTop: "12px",
              letterSpacing: "0.02em",
            }}
          >
            Custom 3D-Printed Titanium Alloy Eyewear
          </p>
        </motion.div>

        {/* Metadata row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "40px",
            fontFamily: FM,
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            color: C.inkMuted,
            whiteSpace: "nowrap",
          }}
        >
          <span>2023.02–2024.11</span>
          <span style={{ color: C.inkFaint }}>·</span>
          <span>{lang === "zh" ? "西安交通大学" : "Xi'an Jiaotong University"}</span>
          <span style={{ color: C.inkFaint }}>·</span>
          <span style={{ color: C.red }}>iF Award 2025 · Red Dot 2024</span>
        </motion.div>
      </section>

      {/* ── DESIGN BACKGROUND ─────────────────────────────────────── */}
      <Section id="background" alt>
        <SHead en="Design Background" zh="设计背景" accent />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <div>
              <h3
                style={{
                  fontFamily: FS,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: C.ink,
                  marginBottom: "16px",
                }}
              >
                {lang === "zh" ? "设计挑战" : "Design Challenge"}
              </h3>
              <p
                style={{
                  fontFamily: FS,
                  fontSize: "0.92rem",
                  color: C.inkMid,
                  lineHeight: 1.75,
                  marginBottom: "28px",
                }}
              >
                {lang === "zh"
                  ? "如何通过模块化设计与数字赋能，开发低成本、高效率的3D打印定制钛合金眼镜，简化眼镜制造工序，缓解钛合金材料运用成本高的问题，提升用户佩戴体验和品牌价值？"
                  : "How might we use modular design and digital enablement to develop low-cost, high-efficiency 3D-printed custom titanium eyewear — simplifying manufacturing, reducing material costs, and elevating the wearing experience?"}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {(lang === "zh"
                  ? ["生产工序繁多，劳动密集", "钛合金工艺难度大，焊接点多", "材料成本高，样式受限", "千人千面，标准化难以满足个体需求"]
                  : ["Complex multi-step production, labor-intensive", "Titanium alloy craftsmanship is difficult, many weld points", "High material cost, limited style options", "One size does not fit all — standardization fails individual needs"]
                ).map((txt) => (
                  <PainChip key={txt} text={txt} />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <img
              src={img25}
              alt="Design background and manufacturing process"
              className="mf-img-zoom"
              style={{
                width: "100%",
                borderRadius: "2px",
                display: "block",
                objectFit: "cover",
              }}
            />
          </Reveal>
        </div>
      </Section>

      {/* ── USER PERSONA ──────────────────────────────────────────── */}
      <Section id="persona">
        <SHead en="User Persona" zh="用户画像" accent />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <Reveal>
            <img
              src={img26}
              alt="User persona illustration"
              className="mf-img-zoom"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div
                style={{
                  fontFamily: FM,
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.red,
                  marginBottom: "6px",
                }}
              >
                Primary Persona
              </div>
              <h3
                style={{
                  fontFamily: FS,
                  fontWeight: 700,
                  fontSize: "1.8rem",
                  color: C.ink,
                  marginBottom: "4px",
                  letterSpacing: "-0.02em",
                }}
              >
                Chen Shuo
              </h3>
              <p style={{ fontFamily: FS, fontSize: "0.82rem", color: C.inkMuted, marginBottom: "24px" }}>
                Fashion Brand Manager · 35 yrs · High-end consumer
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "28px" }}>
                {(lang === "zh"
                  ? ["希望购买钛合金材质眼镜", "期望眼镜与个人脸型匹配", "希望单副眼镜具备可换样式功能", "期望眼镜具备更多集成功能"]
                  : ["Wants to purchase titanium alloy eyewear", "Expects frames to match personal face shape", "Wants interchangeable style options in one frame", "Expects more integrated features from eyewear"]
                ).map((m) => (
                  <div
                    key={m}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontFamily: FS,
                      fontSize: "0.84rem",
                      color: C.inkMid,
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: C.red, flexShrink: 0, marginTop: "2px" }}>→</span>
                    {m}
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "20px" }}>
                <p
                  style={{
                    fontFamily: FM,
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.inkMuted,
                    marginBottom: "12px",
                  }}
                >
                  {lang === "zh" ? "核心痛点" : "Key Pain Points"}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(lang === "zh"
                    ? ["结构贴合性差，佩戴易滑落", "缺乏个性化定制，样式单一，打样成本高", "传统镜架材质重，长时间佩戴不舒适"]
                    : ["Poor structural fit — frames slip during wear", "Lack of personalization; high prototyping cost for bespoke styles", "Traditional frame materials are heavy, uncomfortable for long wear"]
                  ).map((p) => (
                    <div
                      key={p}
                      style={{
                        fontFamily: FS,
                        fontSize: "0.8rem",
                        color: C.inkMid,
                        paddingLeft: "12px",
                        borderLeft: `2px solid ${C.inkFaint}`,
                        lineHeight: 1.5,
                      }}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── CONCEPT DEVELOPMENT ───────────────────────────────────── */}
      <Section id="concept" alt>
        <SHead en="Concept Development" zh="概念发展" accent />

        <Reveal>
          <p
            style={{
              fontFamily: FS,
              fontSize: "1rem",
              color: C.inkMid,
              lineHeight: 1.75,
              maxWidth: "700px",
              marginBottom: "40px",
            }}
          >
            {lang === "zh"
              ? "本设计旨在解决传统眼镜在结构贴合性、佩戴舒适性及功能适配性方面的不足，通过三维人脸扫描与个体脸型参数分析，结合金属3D打印技术，开发满足不同人群个性化需求的定制化眼镜产品。"
              : "This design addresses the shortfalls of conventional eyewear in structural fit, wearing comfort, and functional adaptability — using 3D facial scanning, individual face-parameter analysis, and metal 3D printing to create truly personalized eyewear for every user."}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <img
            src={img27}
            alt="Ideation sketches and concept development"
            className="mf-img-zoom"
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
              marginBottom: "40px",
            }}
          />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {(lang === "zh"
            ? [
                { title: "重新拆解眼镜结构", desc: "借鉴中国传统榫卯连接原理，将焊接方式创新改为线条旋合缠绕" },
                { title: "无螺丝模块化", desc: "尝试去除所有焊接点，依托3D打印分模块成型，实现镜圈、鼻梁、铰链三大核心部件可更换" },
                { title: "记忆合金鼻托", desc: "Ni-Ti形状记忆合金材料，配合大漆工艺，防滑固定同时兼顾高级时尚感" },
              ]
            : [
                { title: "Deconstructing the Frame Structure", desc: "Inspired by traditional Chinese mortise-and-tenon joinery — replacing welding with an interlocking coil-wrap mechanism" },
                { title: "Screw-Free Modularity", desc: "All welds eliminated via 3D-printed modular forming — lens rim, nose bridge, and hinge are each individually replaceable" },
                { title: "Shape-Memory Nose Pad", desc: "Ni-Ti shape-memory alloy combined with traditional lacquer craft — anti-slip security with a premium aesthetic" },
              ]
          ).map(({ title, desc }) => (
            <Reveal key={title} delay={0.08}>
              <div
                style={{
                  padding: "24px",
                  border: `1px solid ${C.border}`,
                  background: C.bg,
                }}
              >
                <h4
                  style={{
                    fontFamily: FS,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: C.ink,
                    marginBottom: "10px",
                  }}
                >
                  {title}
                </h4>
                <p style={{ fontFamily: FS, fontSize: "0.82rem", color: C.inkMid, lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── TECHNOLOGY ────────────────────────────────────────────── */}
      <Section id="technology">
        <SHead en="Technology" zh="技术实现" accent />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <div>
              <h3
                style={{
                  fontFamily: FS,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: C.ink,
                  marginBottom: "20px",
                }}
              >
                {lang === "zh" ? "3D打印定制镜框制造与数模获取" : "3D-Printed Custom Frame Manufacturing & Digital Modeling"}
              </h3>
              <div style={{ marginBottom: "28px" }}>
                <SpecRow label={lang === "zh" ? "颧宽" : "Cheekbone Width"} value="138.5 mm" />
                <SpecRow label={lang === "zh" ? "瞳距" : "Pupillary Distance"} value="62 mm" />
                <SpecRow label={lang === "zh" ? "镜框总宽" : "Total Frame Width"} value="140 mm" />
                <SpecRow label={lang === "zh" ? "镜框厚度" : "Frame Thickness"} value="4.5 mm" />
                <SpecRow label={lang === "zh" ? "打印范围" : "Print Volume"} value="180 × 180 × 150 mm" />
                <SpecRow label={lang === "zh" ? "单次打印最大框数" : "Max Frames per Print"} value={lang === "zh" ? "44 副" : "44 pairs"} />
                <SpecRow label={lang === "zh" ? "打印精度" : "Print Precision"} value={lang === "zh" ? "微米级" : "Micron-level"} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(lang === "zh"
                  ? ["SLM 选择性激光熔化", "Ti64 钛合金粉末", "Ni-Ti 记忆合金", "3D 面部扫描", "数字定制系统"]
                  : ["SLM Selective Laser Melting", "Ti64 Titanium Powder", "Ni-Ti Shape-Memory Alloy", "3D Facial Scanning", "Digital Customization System"]
                ).map((t) => (
                  <TechBadge key={t} label={t} />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <img
              src={img28}
              alt="3D printing technology and face scanning"
              className="mf-img-zoom"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div
            style={{
              marginTop: "48px",
              padding: "24px 32px",
              background: C.bgAlt,
              border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${C.red}`,
            }}
          >
            <p style={{ fontFamily: FS, fontSize: "0.9rem", color: C.inkMid, lineHeight: 1.75 }}>
              {lang === "zh"
                ? "采用先进的面部扫描技术并自主研发迭代，结合自研的镜架定制化系统，使得镜架参数更贴合自身面部特征，增强佩戴者的舒适度，并能打造个性化的风格，从而实现对配镜者的「量脸定制」。"
                : "Leveraging advanced facial scanning technology with a proprietary customization system, frame parameters are precisely matched to individual facial geometry — delivering bespoke comfort and a truly personal aesthetic."}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ── PROTOTYPE TESTING ─────────────────────────────────────── */}
      <Section id="prototype" alt>
        <SHead en="Prototype Testing" zh="原型测试" accent />

        <Reveal>
          <img
            src={img29}
            alt="Post-processing and prototype testing"
            className="mf-img-zoom"
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
              marginBottom: "40px",
            }}
          />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {(lang === "zh"
            ? [
                { step: "01", title: "后工艺流程", desc: "经历喷砂、喷砂后磨料流、电解抛光、等离子抛光、物理研磨抛光六个阶段" },
                { step: "02", title: "手磨抛光技术", desc: "对原始支撑痕迹进行去除并粗磨，表面研磨时间达 60+ 小时" },
                { step: "03", title: "电解抛光技术", desc: "在抛光过程中对材料和抛光参数进行了详细比较分析，确保微米级表面质量" },
              ]
            : [
                { step: "01", title: "Post-Process Pipeline", desc: "Six-stage process: sandblasting, abrasive flow, electrolytic polishing, plasma polishing, and physical grinding" },
                { step: "02", title: "Hand-Grinding & Polish", desc: "Removing raw support marks and rough-grinding the surface — 60+ hours of surface treatment per batch" },
                { step: "03", title: "Electrolytic Polishing", desc: "Detailed material and parameter comparison during polishing to ensure micron-level surface quality" },
              ]
          ).map(({ step, title, desc }) => (
            <Reveal key={step} delay={0.08}>
              <div style={{ borderTop: `2px solid ${C.ink}`, paddingTop: "16px" }}>
                <span
                  style={{
                    fontFamily: FM,
                    fontSize: "0.65rem",
                    color: C.inkMuted,
                    letterSpacing: "0.12em",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  {step}
                </span>
                <h4
                  style={{
                    fontFamily: FS,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: C.ink,
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </h4>
                <p style={{ fontFamily: FS, fontSize: "0.82rem", color: C.inkMid, lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── FINAL DESIGN ──────────────────────────────────────────── */}
      <Section id="final">
        <SHead en="Final Design" zh="最终设计" accent />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center", marginBottom: "48px" }}>
          <Reveal>
            <img
              src={img30}
              alt="X-Round final design product shots"
              className="mf-img-zoom"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3
                style={{
                  fontFamily: FS,
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  color: C.ink,
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {lang === "zh" ? "X-Round 模块化钛合金眼镜" : "X-Round Modular Titanium Eyewear"}
              </h3>
              <p
                style={{
                  fontFamily: FS,
                  fontSize: "0.9rem",
                  color: C.inkMid,
                  lineHeight: 1.75,
                  marginBottom: "24px",
                }}
              >
                {lang === "zh"
                  ? "X-Round是一款3D打印定制化钛合金无螺丝模块化眼镜。该设计借鉴中国传统榫卯连接原理，将传统眼镜制造中的焊接连接方式创新性地改为两根线条旋合缠绕的方式。镜框主体采用流线型设计，并通过无螺丝铰链与镜腿相连。模块化设计使得镜框的拆卸和组装更加便捷，用户可单独更换损坏部件，极大延长了眼镜的使用寿命。"
                  : "X-Round is a 3D-printed, custom-fit, screw-free modular titanium eyewear system. Inspired by traditional Chinese mortise-and-tenon joinery, the conventional welded joints are replaced by an interlocking coil-wrap mechanism. The streamlined frame connects to temples via a screw-free hinge. Modular design makes disassembly and reassembly effortless — users can replace individual components, dramatically extending the product's lifespan."}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {(lang === "zh"
                  ? ["镜圈、鼻梁、铰链三大核心部件可更换", "大漆工艺鼻托，防滑兼顾高级审美", "Ti64 钛合金 3D 打印主体结构", "Ni-Ti 形状记忆合金鼻托部件"]
                  : ["Lens rim, nose bridge & hinge are all individually replaceable", "Lacquer-craft nose pad — anti-slip with premium aesthetics", "Ti64 titanium alloy 3D-printed main structure", "Ni-Ti shape-memory alloy nose pad components"]
                ).map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontFamily: FS,
                      fontSize: "0.84rem",
                      color: C.inkMid,
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        background: C.ink,
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <img
            src={img32}
            alt="Final design details and packaging"
            className="mf-img-zoom"
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
        </Reveal>
      </Section>

      {/* ── AWARD RESULT ──────────────────────────────────────────── */}
      <section
        id="award"
        style={{
          background: C.bgDeep,
          borderBottom: `1px solid ${C.border}`,
          scrollMarginTop: "72px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 48px" }}>
          <SHead en="Award Result" zh="获奖结果" accent />

          {/* Award badges */}
          <Reveal>
            <div
              style={{
                display: "flex",
                gap: "24px",
                flexWrap: "wrap",
                marginBottom: "52px",
              }}
            >
              <div
                style={{
                  background: C.red,
                  color: "#fff",
                  padding: "20px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.2em", opacity: 0.8 }}>
                  WINNER
                </span>
                <span style={{ fontFamily: FS, fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
                  iF Design Award 2025
                </span>
                <span style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.1em", opacity: 0.75 }}>
                  Professional Concept / Product Concepts
                </span>
              </div>
              <div
                style={{
                  background: C.ink,
                  color: "#fff",
                  padding: "20px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.2em", opacity: 0.7 }}>
                  WINNER
                </span>
                <span style={{ fontFamily: FS, fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
                  Red Dot Award 2024
                </span>
                <span style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.1em", opacity: 0.65 }}>
                  Product Design Concept
                </span>
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
            <Reveal>
              <img
                src={img31}
                alt="iF Award certificate and final product"
                className="mf-img-zoom"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <div
                  style={{
                    fontFamily: FM,
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: C.inkMuted,
                    marginBottom: "24px",
                  }}
                >
                  Project Credits
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { label: lang === "zh" ? "设计单位" : "Institution", value: lang === "zh" ? "西安交通大学" : "Xi'an Jiaotong University" },
                    { label: lang === "zh" ? "指导老师" : "Supervisors", value: "Li Hongwei · Huang Ke · Jiang Weile" },
                    { label: lang === "zh" ? "团队成员" : "Team", value: "Jiang Shengxin · Shen Xiru · Su Qiruo · Cao Mingzhe · Jia Yuqiao" },
                    { label: lang === "zh" ? "合作企业" : "Partners", value: lang === "zh" ? "西安智能视光设备有限公司 · 陕西龙漆文化实业有限公司" : "Xi'an Smart Vision Equipment Co. · Shaanxi Dragon Lacquer Cultural Industry Co." },
                    { label: lang === "zh" ? "创作周期" : "Duration", value: "2023.02 — 2024.11" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span
                        style={{
                          fontFamily: FM,
                          fontSize: "0.62rem",
                          letterSpacing: "0.1em",
                          color: C.inkMuted,
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        {label}
                      </span>
                      <span style={{ fontFamily: FS, fontSize: "0.88rem", color: C.ink, fontWeight: 500 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          background: C.bg,
          padding: "32px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.14em", color: C.inkFaint }}>
          MAGIC FIT O20 · X-ROUND
        </span>
        <button
          onClick={onBack}
          style={{
            fontFamily: FM,
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            color: C.inkMuted,
            background: "none",
            border: `1px solid ${C.border}`,
            padding: "8px 20px",
            cursor: "pointer",
          }}
        >
          {lang === "zh" ? "← 返回项目列表" : "← Back to Projects"}
        </button>
        <span style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.14em", color: C.inkFaint }}>
          iF DESIGN AWARD 2025
        </span>
      </div>
    </div>
  );
}
