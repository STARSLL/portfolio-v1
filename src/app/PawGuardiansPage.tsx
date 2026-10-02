import { useRef, useState, useEffect, type ReactNode } from "react";
import { useLanguage } from "./LanguageContext";
import { motion, useInView } from "motion/react";
import img04 from "@/imports/04.jpg";
import imgUiVolunteers from "@/imports/Ui/c47c2f9ed25cf33d5efbc75082610a66e4384a3e.png";
import imgUiFeeding    from "@/imports/Ui/1460d883088611cd49fe5c44a5db3c83f9d2a562.png";
import imgUiPetProfile from "@/imports/Ui/e9e0b3ff5898ae94c76378e3b0678992dc8c5e10.png";
import imgUiStore      from "@/imports/Ui/7c422d3da8e5cb3b87368280648a38780bac52e1.png";
import imgUiProfile    from "@/imports/Ui/46240e2adf9478fd51e124e27133b28d3518a7fa.png";
import imgUiFrame      from "@/imports/Ui/898d6b6326c8696cb62d35eae092fcdb03f4c874.png";

// ─── Light-theme color tokens (independent from global dark theme) ─
const C = {
  bg: "#FAFAF8",
  bgAlt: "#F2EEE6",
  teal: "#1B4741",
  tealMed: "#2D5A52",
  tealMuted: "#5E8B82",
  tealBorder: "rgba(27, 71, 65, 0.13)",
  tealFaint: "rgba(27, 71, 65, 0.05)",
  orange: "#E87C2E",
  orangeFaint: "rgba(232, 124, 46, 0.08)",
  orangeBorder: "rgba(232, 124, 46, 0.28)",
  body: "#2D4240",
  muted: "#8C9E9C",
  paperGrid: [
    "linear-gradient(rgba(27,71,65,0.042) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(27,71,65,0.042) 1px, transparent 1px)",
  ].join(","),
} as const;

const FD = "'Caveat', cursive";
const FB = "'Space Grotesk', system-ui, sans-serif";
const FM = "'Space Mono', monospace";
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Section anchor list ───────────────────────────────────────────
const ANCHORS = [
  { id: "pg-brief",      zh: "项目简介", en: "Overview"      },
  { id: "pg-bg",         zh: "设计背景", en: "Background"    },
  { id: "pg-research",   zh: "用户研究", en: "User Research" },
  { id: "pg-insights",   zh: "用户洞察", en: "Insights"      },
  { id: "pg-journey",    zh: "旅程图",   en: "Journey Map"   },
  { id: "pg-blueprint",  zh: "服务蓝图", en: "Blueprint"     },
  { id: "pg-ui",         zh: "UI 设计",  en: "UI Design"     },
  { id: "pg-product",    zh: "产品设计", en: "Product"       },
  { id: "pg-story",      zh: "故事板",   en: "Storyboard"    },
  { id: "pg-results",    zh: "设计成果", en: "Results"       },
];

// ─── Helpers ───────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  y = 22,
  x = 0,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -44px 0px" });
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : y, x: inView ? 0 : x }}
      transition={{ duration: 0.58, delay: inView ? delay : 0, ease: EASE }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

function Inner({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1160px] mx-auto px-6 md:px-10 py-16 md:py-20">
      {children}
    </div>
  );
}

function Section({
  id,
  children,
  bg,
  grid,
}: {
  id: string;
  children: ReactNode;
  bg?: string;
  grid?: boolean;
}) {
  return (
    <section
      id={id}
      style={{
        background: bg ?? C.bg,
        backgroundImage: grid ? C.paperGrid : undefined,
        backgroundSize: grid ? "32px 32px" : undefined,
        scrollMarginTop: 72,
      }}
    >
      {children}
    </section>
  );
}

function SectionHead({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub?: string;
}) {
  return (
    <div style={{ marginBottom: 44 }}>
      <span
        style={{
          fontFamily: FM,
          fontSize: "0.6rem",
          color: C.muted,
          letterSpacing: "0.22em",
          display: "block",
        }}
      >
        {num}
      </span>
      <h2
        style={{
          fontFamily: FD,
          fontSize: "clamp(2rem, 5vw, 3.4rem)",
          color: C.teal,
          fontWeight: 700,
          margin: "8px 0 0",
          lineHeight: 1.08,
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            fontFamily: FM,
            fontSize: "0.62rem",
            color: C.muted,
            marginTop: 8,
            letterSpacing: "0.18em",
          }}
        >
          {sub}
        </p>
      )}
      <div
        style={{ width: 44, height: 2, background: C.orange, marginTop: 14 }}
      />
    </div>
  );
}

// ─── Right-side anchor navigation (xl+) ───────────────────────────
function AnchorNav() {
  const { lang } = useLanguage();
  const [active, setActive] = useState(ANCHORS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -52% 0px" }
    );
    ANCHORS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="hidden xl:flex flex-col gap-1.5"
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 30,
      }}
    >
      {ANCHORS.map(({ id, zh, en }) => {
        const label = lang === "zh" ? zh : en;
        const on = active === id;
        return (
          <button
            key={id}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "1px 0",
            }}
            aria-label={label}
          >
            <span
              style={{
                fontFamily: FM,
                fontSize: "0.52rem",
                color: on ? C.orange : "transparent",
                letterSpacing: "0.12em",
                transition: "color 0.25s",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
            <div
              style={{
                width: on ? 18 : 6,
                height: 2,
                background: on ? C.orange : C.tealBorder,
                transition: "all 0.28s ease",
                borderRadius: 1,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── Journey Map ───────────────────────────────────────────────────
function JourneyMap() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -80px 0px" });

  const stagesZh = [
    { num: "01", label: "发现", sub: "发现校园流浪猫\n产生关注" },
    { num: "02", label: "加入", sub: "扫码加入\n守护联盟" },
    { num: "03", label: "认领", sub: "认领猫咪\n建立档案" },
    { num: "04", label: "守护", sub: "系统调度\n定期喂养" },
    { num: "05", label: "传递", sub: "招募新成员\n扩大网络" },
  ];
  const stagesEn = [
    { num: "01", label: "Discovery",     sub: "Spot a campus stray\nfeel concerned" },
    { num: "02", label: "Joining",       sub: "Scan to join\nthe Guardian Alliance" },
    { num: "03", label: "Adoption",      sub: "Adopt a cat\nbuild its profile" },
    { num: "04", label: "Guardianship",  sub: "System schedules\nregular feedings" },
    { num: "05", label: "Passing On",    sub: "Recruit new members\nexpand the network" },
  ];
  const stages = lang === "zh" ? stagesZh : stagesEn;

  return (
    <div ref={ref}>
      {/* Emotion arc */}
      <div
        style={{
          marginBottom: 0,
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: FM,
            fontSize: "0.54rem",
            color: C.muted,
            letterSpacing: "0.16em",
            display: "block",
            marginBottom: 6,
          }}
        >
          EMOTIONAL ARC ↑ positive
        </span>
        <div style={{ height: 72, position: "relative" }}>
          <svg
            width="100%"
            height="72"
            viewBox="0 0 500 72"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            {/* Dashed base */}
            <path
              d="M 50 62 C 90 58, 120 48, 150 42 S 210 32, 250 26 S 320 18, 350 16 S 420 8, 450 6"
              fill="none"
              stroke={C.tealBorder}
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            {/* Animated curve */}
            <motion.path
              d="M 50 62 C 90 58, 120 48, 150 42 S 210 32, 250 26 S 320 18, 350 16 S 420 8, 450 6"
              fill="none"
              stroke={C.orange}
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            />
            {/* Stage dots */}
            {([50, 150, 250, 350, 450] as const).map((cx, i) => {
              const cy = [62, 42, 26, 16, 6][i];
              return (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill={C.orange}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: inView ? 0.35 + i * 0.16 : 0 }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Node row */}
      <div style={{ position: "relative" }}>
        {/* Base connector */}
        <div
          style={{
            position: "absolute",
            left: 44,
            right: 44,
            top: 22,
            height: 2,
            background: C.tealBorder,
          }}
        />
        {/* Animated connector */}
        <motion.div
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 1.1, delay: 0.18, ease: EASE }}
          style={{
            position: "absolute",
            left: 44,
            right: 44,
            top: 22,
            height: 2,
            background: C.orange,
            transformOrigin: "left",
            zIndex: 1,
          }}
        />

        <div className="grid grid-cols-5" style={{ position: "relative", zIndex: 2 }}>
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 14 }}
              transition={{ duration: 0.5, delay: inView ? i * 0.16 + 0.12 : 0, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              {/* Node */}
              <motion.div
                animate={{
                  backgroundColor: inView ? C.orange : C.bg,
                  borderColor: inView ? C.orange : C.tealBorder,
                }}
                transition={{ duration: 0.35, delay: inView ? i * 0.16 + 0.22 : 0 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "2px solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <motion.span
                  animate={{ color: inView ? "#ffffff" : C.muted }}
                  transition={{ duration: 0.28, delay: inView ? i * 0.16 + 0.28 : 0 }}
                  style={{ fontFamily: FM, fontSize: "0.6rem", fontWeight: 700 }}
                >
                  {stage.num}
                </motion.span>
              </motion.div>

              <p
                style={{
                  fontFamily: FD,
                  fontSize: "1.3rem",
                  color: C.teal,
                  fontWeight: 700,
                  marginTop: 14,
                  textAlign: "center",
                }}
              >
                {stage.label}
              </p>
              <p
                style={{
                  fontFamily: FB,
                  fontSize: "0.66rem",
                  color: C.muted,
                  marginTop: 6,
                  textAlign: "center",
                  lineHeight: 1.55,
                  padding: "0 4px",
                  whiteSpace: "pre-line",
                }}
              >
                {stage.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Service Blueprint ─────────────────────────────────────────────
function ServiceBlueprint() {
  const { lang } = useLanguage();
  const layersZh = [
    {
      label: "用户行为",
      color: C.orange,
      bg: C.orangeFaint,
      border: C.orangeBorder,
      items: ["发现流浪猫", "下载 App", "创建猫档案", "查看排班", "NFC 签到", "社区互动", "招募好友"],
    },
    {
      label: "前台系统",
      color: C.teal,
      bg: C.tealFaint,
      border: C.tealBorder,
      items: ["地图发现", "注册引导", "档案填写", "智能调度", "记录同步", "动态发布", "邀请生成"],
    },
    {
      label: "后台支撑",
      color: C.tealMed,
      bg: "rgba(45, 90, 82, 0.04)",
      border: "rgba(45, 90, 82, 0.14)",
      items: ["LBS 服务", "身份验证", "AI 健康分析", "排班算法", "IoT 数据流", "内容审核", "数据统计"],
    },
    {
      label: "物理层",
      color: C.muted,
      bg: "rgba(140, 158, 156, 0.05)",
      border: "rgba(140, 158, 156, 0.14)",
      items: ["—", "—", "智能喂食器", "自动感应", "重量摄像", "—", "—"],
    },
  ];
  const layersEn = [
    {
      label: "User Actions",
      color: C.orange,
      bg: C.orangeFaint,
      border: C.orangeBorder,
      items: ["Spot stray cat", "Download app", "Create profile", "View schedule", "NFC check-in", "Community", "Recruit friends"],
    },
    {
      label: "Front-stage",
      color: C.teal,
      bg: C.tealFaint,
      border: C.tealBorder,
      items: ["Map discovery", "Onboarding", "Profile form", "Smart scheduling", "Sync records", "Post update", "Generate invite"],
    },
    {
      label: "Back-stage",
      color: C.tealMed,
      bg: "rgba(45, 90, 82, 0.04)",
      border: "rgba(45, 90, 82, 0.14)",
      items: ["LBS service", "Auth", "AI health analysis", "Schedule algorithm", "IoT data stream", "Content review", "Analytics"],
    },
    {
      label: "Physical Layer",
      color: C.muted,
      bg: "rgba(140, 158, 156, 0.05)",
      border: "rgba(140, 158, 156, 0.14)",
      items: ["—", "—", "Smart feeder", "Auto sensor", "Weight + camera", "—", "—"],
    },
  ];
  const layers = lang === "zh" ? layersZh : layersEn;

  return (
    <div style={{ overflowX: "auto" }}>
      {layers.map((layer, li) => (
        <Reveal key={li} delay={li * 0.08}>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              marginBottom: 2,
              minWidth: 680,
            }}
          >
            <div
              style={{
                width: 88,
                flexShrink: 0,
                background: layer.bg,
                border: `1px solid ${layer.border}`,
                borderRight: "none",
                borderTop: li > 0 ? "none" : `1px solid ${layer.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 6px",
              }}
            >
              <span
                style={{
                  fontFamily: FM,
                  fontSize: "0.56rem",
                  color: layer.color,
                  letterSpacing: "0.14em",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  textAlign: "center",
                }}
              >
                {layer.label}
              </span>
            </div>

            {layer.items.map((item, ii) => (
              <div
                key={ii}
                style={{
                  flex: 1,
                  border: `1px solid ${layer.border}`,
                  borderLeft: "none",
                  borderTop: li > 0 ? "none" : `1px solid ${layer.border}`,
                  padding: "12px 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    item === "—" ? "transparent" : layer.bg,
                  minHeight: 52,
                }}
              >
                <span
                  style={{
                    fontFamily: FB,
                    fontSize: "0.66rem",
                    color: item === "—" ? C.tealBorder : layer.color,
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─── Phone mockup shell ────────────────────────────────────────────
function Phone({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 178,
          height: 344,
          border: `1.5px solid ${C.tealBorder}`,
          borderRadius: 18,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 12px 32px rgba(27,71,65,0.09)",
          flexShrink: 0,
        }}
      >
        {/* Notch bar */}
        <div
          style={{
            height: 22,
            background: C.teal,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{ width: 36, height: 7, background: "#000", borderRadius: 4 }}
          />
        </div>
        <div style={{ height: "calc(100% - 22px)", overflow: "hidden" }}>
          {children}
        </div>
      </div>
      <p
        style={{
          fontFamily: FM,
          fontSize: "0.56rem",
          color: C.muted,
          marginTop: 14,
          letterSpacing: "0.14em",
          textAlign: "center",
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ─── Storyboard panel ──────────────────────────────────────────────
function StoryPanel({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <Reveal delay={parseInt(num) * 0.07}>
      <div
        style={{
          border: `1px solid ${C.tealBorder}`,
          background: C.bg,
          position: "relative",
          height: "100%",
        }}
      >
        {/* Corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            width: 14,
            height: 14,
            borderTop: `1.5px solid ${C.tealBorder}`,
            borderLeft: `1.5px solid ${C.tealBorder}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            width: 14,
            height: 14,
            borderBottom: `1.5px solid ${C.tealBorder}`,
            borderRight: `1.5px solid ${C.tealBorder}`,
          }}
        />
        {/* Sketch area */}
        <div
          style={{
            height: 108,
            background: C.tealFaint,
            borderBottom: `1px dashed ${C.tealBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: C.paperGrid,
              backgroundSize: "16px 16px",
            }}
          />
          <span
            style={{
              fontFamily: FD,
              fontSize: "3rem",
              color: "rgba(27,71,65,0.12)",
              position: "relative",
            }}
          >
            {num}
          </span>
        </div>
        <div style={{ padding: "16px 20px 20px" }}>
          <span
            style={{
              fontFamily: FM,
              fontSize: "0.54rem",
              color: C.orange,
              letterSpacing: "0.18em",
            }}
          >
            SCENE {num}
          </span>
          <p
            style={{
              fontFamily: FD,
              fontSize: "1.15rem",
              color: C.teal,
              fontWeight: 600,
              margin: "6px 0 8px",
              lineHeight: 1.3,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontFamily: FB,
              fontSize: "0.75rem",
              color: C.body,
              lineHeight: 1.65,
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Metric card ───────────────────────────────────────────────────
function Metric({
  num,
  label,
  accent,
}: {
  num: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        border: `1px solid ${accent ? C.orangeBorder : C.tealBorder}`,
        background: accent ? C.orangeFaint : C.tealFaint,
        padding: "22px 18px",
      }}
    >
      <p
        style={{
          fontFamily: FD,
          fontSize: "2.2rem",
          color: accent ? C.orange : C.teal,
          fontWeight: 700,
          margin: 0,
          lineHeight: 1,
        }}
      >
        {num}
      </p>
      <p
        style={{
          fontFamily: FB,
          fontSize: "0.74rem",
          color: C.body,
          marginTop: 10,
          lineHeight: 1.5,
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Main page
// ═══════════════════════════════════════════════════════════════════
export default function PawGuardiansPage({
  onBack,
}: {
  onBack?: () => void;
}) {
  const { lang } = useLanguage();
  return (
    <div
      style={{ background: C.bg, minHeight: "100vh", position: "relative" }}
    >
      <AnchorNav />

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "92vh",
          background: C.bg,
          backgroundImage: C.paperGrid,
          backgroundSize: "32px 32px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft orange glow */}
        <div
          style={{
            position: "absolute",
            left: "28%",
            bottom: "8%",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,124,46,0.17) 0%, transparent 70%)",
            filter: "blur(48px)",
            pointerEvents: "none",
          }}
        />

        <div
          className="max-w-[1160px] mx-auto w-full px-6 md:px-10"
          style={{ paddingTop: 100, paddingBottom: 80 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — title block */}
            <div>
              {/* Back button */}
              {onBack && (
                <motion.button
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  onClick={onBack}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: `1px solid ${C.tealBorder}`,
                    cursor: "pointer",
                    padding: "6px 14px",
                    marginBottom: 36,
                    fontFamily: FM,
                    fontSize: "0.62rem",
                    color: C.muted,
                    letterSpacing: "0.14em",
                    transition: "border-color 0.2s, color 0.2s",
                    borderRadius: 2,
                  }}
                  onMouseEnter={(e) => {
                    const b = e.currentTarget;
                    b.style.borderColor = C.orange;
                    b.style.color = C.orange;
                  }}
                  onMouseLeave={(e) => {
                    const b = e.currentTarget;
                    b.style.borderColor = C.tealBorder;
                    b.style.color = C.muted;
                  }}
                >
                  {lang === "zh" ? "← 返回项目列表" : "← Back"}
                </motion.button>
              )}

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  fontFamily: FM,
                  fontSize: "0.62rem",
                  color: C.muted,
                  letterSpacing: "0.22em",
                  display: "block",
                }}
              >
                /PROJECT DETAIL · 项目详情
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.14, ease: EASE }}
                style={{
                  fontFamily: FD,
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 700,
                  color: C.teal,
                  lineHeight: 1.05,
                  margin: "10px 0 18px",
                }}
              >
                Paw
                <br />
                Guardians
                <br />
                Alliance
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
                style={{
                  fontFamily: FB,
                  fontSize: "0.92rem",
                  color: C.body,
                  lineHeight: 1.75,
                  maxWidth: 420,
                }}
              >
                {lang === "zh"
                  ? "校园流浪猫智能管理与服务系统设计。通过 IoT 智能喂食站与社群 App，协调多方守护者共同照料校园流浪猫的健康与生存状态。"
                  : "A smart management and service system for campus stray cats. IoT feeding stations and a community app coordinate multiple guardians to collaboratively care for the health and wellbeing of campus strays."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.42 }}
                style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}
              >
                {(lang === "zh"
                  ? ["用户研究", "交互设计", "产品设计", "服务设计"]
                  : ["User Research", "Interaction Design", "Product Design", "Service Design"]
                ).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: FM,
                      fontSize: "0.58rem",
                      color: C.tealMuted,
                      border: `1px solid ${C.tealBorder}`,
                      padding: "4px 10px",
                      letterSpacing: "0.12em",
                      borderRadius: 2,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — product render */}
            <motion.div
              initial={{ opacity: 0, x: 52, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.18, ease: EASE }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={img04}
                alt="Paw Guardians 智能喂食站 3D 渲染图"
                style={{ width: "100%", maxWidth: 540, objectFit: "contain" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 01 PROJECT BRIEF ════════════════════════════════════════ */}
      <Section id="pg-brief" bg={C.bgAlt}>
        <Inner>
          <Reveal>
            <SectionHead num="— 01 —" title={lang === "zh" ? "项目简介" : "Project Brief"} sub="PROJECT BRIEF" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
            {(lang === "zh" ? [
              { l: "项目类型", v: "服务系统设计", s: "Service System Design" },
              { l: "时间周期", v: "12 周", s: "2023.09 — 2023.12" },
              { l: "我的角色", v: "独立负责人", s: "研究 → 原型 → 测试" },
              { l: "工具链", v: "Figma · SolidWorks", s: "Arduino + Unity 原型验证" },
            ] : [
              { l: "Project Type", v: "Service System Design", s: "Service System Design" },
              { l: "Timeline", v: "12 Weeks", s: "2023.09 — 2023.12" },
              { l: "My Role", v: "Solo Lead", s: "Research → Prototype → Test" },
              { l: "Tools", v: "Figma · SolidWorks", s: "Arduino + Unity prototyping" },
            ]).map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div
                  style={{
                    border: `1px solid ${C.tealBorder}`,
                    padding: "22px 20px",
                    background: C.bg,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 9,
                      left: 9,
                      width: 12,
                      height: 12,
                      borderTop: `1.5px solid ${C.orange}`,
                      borderLeft: `1.5px solid ${C.orange}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FM,
                      fontSize: "0.54rem",
                      color: C.muted,
                      letterSpacing: "0.16em",
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    {item.l}
                  </span>
                  <p
                    style={{
                      fontFamily: FD,
                      fontSize: "1.45rem",
                      color: C.teal,
                      fontWeight: 700,
                      lineHeight: 1.1,
                      margin: "0 0 6px",
                    }}
                  >
                    {item.v}
                  </p>
                  <p
                    style={{ fontFamily: FB, fontSize: "0.68rem", color: C.muted, lineHeight: 1.5 }}
                  >
                    {item.s}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div
              style={{
                maxWidth: 760,
                borderLeft: `4px solid ${C.orange}`,
                paddingLeft: 28,
              }}
            >
              <p
                style={{
                  fontFamily: FD,
                  fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                  color: C.teal,
                  lineHeight: 1.55,
                  fontWeight: 400,
                }}
              >
                {lang === "zh"
                  ? "\"如何让校园流浪猫的照护从自发、分散的个人行为，转变为有系统支撑的协同守护网络？\""
                  : "\"How might we transform the care of campus stray cats from spontaneous, fragmented individual acts into a systemically supported, collaborative guardianship network?\""}
              </p>
            </div>
          </Reveal>
        </Inner>
      </Section>

      {/* ══ 02 DESIGN BACKGROUND ════════════════════════════════════ */}
      <Section id="pg-bg" grid>
        <Inner>
          <Reveal>
            <SectionHead num="— 02 —" title={lang === "zh" ? "设计背景" : "Design Background"} sub="DESIGN BACKGROUND" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div>
                <h3
                  style={{
                    fontFamily: FD,
                    fontSize: "1.9rem",
                    color: C.teal,
                    fontWeight: 700,
                    marginBottom: 18,
                  }}
                >
                  {lang === "zh" ? "问题语境" : "Problem Context"}
                </h3>
                <p
                  style={{
                    fontFamily: FB,
                    fontSize: "0.88rem",
                    color: C.body,
                    lineHeight: 1.78,
                  }}
                >
                  {lang === "zh"
                    ? "高校校园内流浪猫数量持续增长，现有关爱行为主要依赖学生个体自发投喂，缺乏系统协调。同一地点重复投喂与无人照看交替出现，猫咪健康状况无从追踪，关爱资源的浪费与盲区同时并存。"
                    : "The number of stray cats on university campuses continues to grow, yet existing care relies almost entirely on spontaneous individual feeding — with no systematic coordination. Over-feeding at the same spot and neglected zones appear side by side, cat health goes untracked, and care resources are both wasted and blind-spotted simultaneously."}
                </p>
                <p
                  style={{
                    fontFamily: FB,
                    fontSize: "0.88rem",
                    color: C.body,
                    lineHeight: 1.78,
                    marginTop: 14,
                  }}
                >
                  {lang === "zh"
                    ? "与此同时，有意愿参与照护的学生缺少信息渠道，无法高效找到需要帮助的猫咪，或接触到已有的守护群体。"
                    : "At the same time, students who want to help lack any information channel — they cannot efficiently locate cats in need or connect with established guardian communities."}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {(lang === "zh" ? [
                  { n: "67%", l: "校园猫咪无个人档案记录" },
                  { n: "3×", l: "同地点每日平均重复投喂" },
                  { n: "40+", l: "现有守护者跨区协调困难" },
                  { n: "0", l: "现有系统化管理方案" },
                ] : [
                  { n: "67%", l: "of campus cats have no individual health record" },
                  { n: "3×", l: "average daily duplicate feedings at the same location" },
                  { n: "40+", l: "existing guardians face cross-zone coordination challenges" },
                  { n: "0", l: "existing systematic management solutions" },
                ]).map((s, i) => (
                  <Reveal key={i} delay={0.08 + i * 0.06}>
                    <div
                      style={{
                        border: `1px solid ${C.tealBorder}`,
                        padding: "20px 16px",
                        background: C.bg,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: FD,
                          fontSize: "2.3rem",
                          color: C.orange,
                          fontWeight: 700,
                          margin: 0,
                          lineHeight: 1,
                        }}
                      >
                        {s.n}
                      </p>
                      <p
                        style={{
                          fontFamily: FB,
                          fontSize: "0.72rem",
                          color: C.body,
                          marginTop: 10,
                          lineHeight: 1.5,
                        }}
                      >
                        {s.l}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </Inner>
      </Section>

      {/* ══ 03 USER RESEARCH ════════════════════════════════════════ */}
      <Section id="pg-research" bg={C.bgAlt}>
        <Inner>
          <Reveal>
            <SectionHead num="— 03 —" title={lang === "zh" ? "用户研究" : "User Research"} sub="USER RESEARCH" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {(lang === "zh" ? [
              {
                en: "FIELD OBSERVATION",
                cn: "实地观察",
                meta: "2 周 · 3 处点位",
                desc: "东门小花园、南苑食堂附近、图书馆后区。记录喂食时间、人群行为与猫咪出没规律。",
              },
              {
                en: "SEMI-STRUCTURED INTERVIEW",
                cn: "深度访谈",
                meta: "12 位 · 45–60 min/场",
                desc: "6 名常规投喂学生、3 名偶尔参与者、2 名保洁人员、1 名社团负责人。",
              },
              {
                en: "ONLINE SURVEY",
                cn: "问卷调查",
                meta: "2 周 · 87 份有效回收",
                desc: "覆盖全校不同院系，评估关注度、参与意愿、现有行为模式与技术接受程度。",
              },
            ] : [
              {
                en: "FIELD OBSERVATION",
                cn: "Field Observation",
                meta: "2 weeks · 3 sites",
                desc: "East gate garden, south campus canteen area, and the library rear zone. Recorded feeding times, crowd behavior, and cat patrol patterns.",
              },
              {
                en: "SEMI-STRUCTURED INTERVIEW",
                cn: "In-depth Interviews",
                meta: "12 participants · 45–60 min each",
                desc: "6 regular feeders, 3 occasional participants, 2 cleaning staff, 1 student club lead.",
              },
              {
                en: "ONLINE SURVEY",
                cn: "Online Survey",
                meta: "2 weeks · 87 valid responses",
                desc: "Covered students across all departments, assessing awareness, participation intent, existing behaviors, and technology acceptance.",
              },
            ]).map((item, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div
                  style={{
                    border: `1px solid ${C.tealBorder}`,
                    padding: "26px 22px",
                    background: C.bg,
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "3px 9px",
                      border: `1px solid ${C.orangeBorder}`,
                      background: C.orangeFaint,
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FM,
                        fontSize: "0.52rem",
                        color: C.orange,
                        letterSpacing: "0.14em",
                      }}
                    >
                      {item.en}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: FD,
                      fontSize: "1.65rem",
                      color: C.teal,
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    {item.cn}
                  </h3>
                  <p
                    style={{
                      fontFamily: FM,
                      fontSize: "0.58rem",
                      color: C.orange,
                      marginBottom: 14,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.meta}
                  </p>
                  <p
                    style={{ fontFamily: FB, fontSize: "0.78rem", color: C.body, lineHeight: 1.7 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div
              style={{
                background: C.tealFaint,
                border: `1px solid ${C.tealBorder}`,
                padding: "26px 30px",
              }}
            >
              <span
                style={{
                  fontFamily: FM,
                  fontSize: "0.58rem",
                  color: C.tealMuted,
                  letterSpacing: "0.18em",
                }}
              >
                KEY FINDINGS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
                {(lang === "zh" ? [
                  { s: "89%", t: "受访者希望实时了解周边喂养情况，避免重复投喂" },
                  { s: "76%", t: "愿意使用 App 记录和协调喂养行为" },
                  { s: "92%", t: "认为健康档案对识别问题猫咪非常有价值" },
                ] : [
                  { s: "89%", t: "of respondents want real-time visibility into nearby feeding activity to avoid duplication" },
                  { s: "76%", t: "are willing to use an app to log and coordinate feeding" },
                  { s: "92%", t: "find health profiles highly valuable for identifying cats in need" },
                ]).map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span
                      style={{
                        fontFamily: FD,
                        fontSize: "2.2rem",
                        color: C.orange,
                        fontWeight: 700,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {f.s}
                    </span>
                    <p
                      style={{ fontFamily: FB, fontSize: "0.78rem", color: C.body, lineHeight: 1.65 }}
                    >
                      {f.t}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Inner>
      </Section>

      {/* ══ 04 USER INSIGHTS ════════════════════════════════════════ */}
      <Section id="pg-insights" grid>
        <Inner>
          <Reveal>
            <SectionHead num="— 04 —" title={lang === "zh" ? "用户洞察" : "User Insights"} sub="USER INSIGHTS" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(lang === "zh" ? [
              {
                num: "01",
                tag: "时间协调",
                title: "喂养行为碎片化",
                desc: "多个守护者在同一地点、相近时间投喂，导致食物浪费。而部分区域则长时间无人照看，缺乏有效的时间协调机制。",
              },
              {
                num: "02",
                tag: "健康追踪",
                title: "健康信息不透明",
                desc: "受伤或生病的猫咪无法被多人及时发现。负责人短暂离校后，照护信息无法交接，健康状态记录断档。",
              },
              {
                num: "03",
                tag: "社群接入",
                title: "新人进入门槛高",
                desc: "想参与的学生不知道在哪里找猫、谁在照顾、该如何开始。守护社群对外几乎不可见，难以吸纳新成员。",
              },
              {
                num: "04",
                tag: "设备智能化",
                title: "物理设备严重不足",
                desc: "手动投喂盒需频繁检查补充，天气影响明显。没有设备状态的远程感知能力，维护成本高、响应慢。",
              },
            ] : [
              {
                num: "01",
                tag: "Scheduling",
                title: "Fragmented Feeding Behavior",
                desc: "Multiple guardians feed at the same location within similar time windows, leading to food waste. Meanwhile, some areas remain unattended for extended periods — there is no effective time-coordination mechanism.",
              },
              {
                num: "02",
                tag: "Health Tracking",
                title: "Opaque Health Information",
                desc: "Injured or ill cats cannot be spotted promptly by multiple people. When a guardian leaves campus temporarily, care information fails to transfer, leaving health records with gaps.",
              },
              {
                num: "03",
                tag: "Community Access",
                title: "High Barrier for New Volunteers",
                desc: "Students who want to help don't know where to find cats, who's already caring for them, or how to get started. The guardian community is nearly invisible externally, making it hard to bring in new members.",
              },
              {
                num: "04",
                tag: "Equipment",
                title: "Critical Gap in Physical Equipment",
                desc: "Manual feeding boxes need frequent checking and refilling, and weather has a significant impact. There is no remote sensing of device status, making maintenance costly and slow to respond.",
              },
            ]).map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  style={{
                    border: `1px solid ${C.tealBorder}`,
                    padding: "28px 26px",
                    background: C.bg,
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 18,
                      fontFamily: FD,
                      fontSize: "4.5rem",
                      color: "rgba(27,71,65,0.05)",
                      fontWeight: 700,
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      fontFamily: FM,
                      fontSize: "0.54rem",
                      color: C.orange,
                      border: `1px solid ${C.orangeBorder}`,
                      padding: "2px 8px",
                      letterSpacing: "0.14em",
                      display: "inline-block",
                      marginBottom: 14,
                    }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: FD,
                      fontSize: "1.55rem",
                      color: C.teal,
                      fontWeight: 700,
                      marginBottom: 12,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{ fontFamily: FB, fontSize: "0.8rem", color: C.body, lineHeight: 1.72 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Inner>
      </Section>

      {/* ══ 05 JOURNEY MAP ══════════════════════════════════════════ */}
      <Section id="pg-journey" bg={C.bgAlt}>
        <Inner>
          <Reveal>
            <SectionHead num="— 05 —" title={lang === "zh" ? "用户旅程图" : "User Journey Map"} sub="USER JOURNEY MAP" />
          </Reveal>

          <Reveal delay={0.1}>
            <JourneyMap />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {(lang === "zh" ? [
              {
                type: "痛点峰值",
                color: "#C44055",
                moment: "发现喂养记录缺失 / 不知道猫咪在哪",
                stage: "加入阶段",
              },
              {
                type: "关键转折",
                color: C.orange,
                moment: '系统第一次提醒"附近有猫需要照护"',
                stage: "认领阶段",
              },
              {
                type: "情感高峰",
                color: C.teal,
                moment: "自己认领的猫咪档案被其他守护者持续维护",
                stage: "传递阶段",
              },
            ] : [
              {
                type: "Pain Peak",
                color: "#C44055",
                moment: "Feeding records missing / no idea where the cat is",
                stage: "Joining Stage",
              },
              {
                type: "Key Turning Point",
                color: C.orange,
                moment: "System first alerts: \"a cat nearby needs care\"",
                stage: "Adoption Stage",
              },
              {
                type: "Emotional Peak",
                color: C.teal,
                moment: "Your adopted cat's profile is still being maintained by other guardians",
                stage: "Passing On Stage",
              },
            ]).map((m, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <div
                  style={{
                    border: `1px solid ${C.tealBorder}`,
                    borderTop: `3px solid ${m.color}`,
                    padding: "16px 20px",
                    background: C.bg,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FM,
                      fontSize: "0.54rem",
                      color: C.muted,
                      letterSpacing: "0.14em",
                    }}
                  >
                    {m.type}
                  </span>
                  <p
                    style={{
                      fontFamily: FD,
                      fontSize: "1.05rem",
                      color: C.teal,
                      fontWeight: 600,
                      margin: "8px 0 8px",
                      lineHeight: 1.4,
                    }}
                  >
                    {m.moment}
                  </p>
                  <span
                    style={{ fontFamily: FM, fontSize: "0.56rem", color: m.color, letterSpacing: "0.1em" }}
                  >
                    @ {m.stage}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Inner>
      </Section>

      {/* ══ 06 SERVICE BLUEPRINT ════════════════════════════════════ */}
      <Section id="pg-blueprint" grid>
        <Inner>
          <Reveal>
            <SectionHead num="— 06 —" title={lang === "zh" ? "服务蓝图" : "Service Blueprint"} sub="SERVICE BLUEPRINT" />
          </Reveal>

          <ServiceBlueprint />

          <Reveal delay={0.35}>
            <p
              style={{
                fontFamily: FB,
                fontSize: "0.8rem",
                color: C.muted,
                marginTop: 22,
                lineHeight: 1.75,
                maxWidth: 780,
              }}
            >
              {lang === "zh"
                ? "服务蓝图横向呈现 7 个核心触点，纵向覆盖用户行为、前台交互、后台逻辑与物理支撑四层。喂食器 IoT 模块在「NFC 签到」触点贯通前后台，实现数据自动采集与排班联动。"
                : "The service blueprint presents 7 core touchpoints horizontally, spanning four vertical layers: user actions, front-stage interactions, back-stage logic, and physical support. The IoT module connects front- and back-stage at the NFC check-in touchpoint, enabling automatic data capture and scheduling synchronization."}
            </p>
          </Reveal>
        </Inner>
      </Section>

      {/* ══ 07 UI DESIGN ════════════════════════════════════════════ */}
      <Section id="pg-ui" bg={C.bgAlt}>
        <Inner>
          <Reveal>
            <SectionHead num="— 07 —" title={lang === "zh" ? "UI 设计" : "UI Design"} sub="UI DESIGN · APP INTERFACE" />
          </Reveal>

          <div style={{ display: "flex", gap: "28px", justifyContent: "center", flexWrap: "wrap", alignItems: "flex-end" }}>
            {([
              { img: imgUiVolunteers, label: "Community",    zh: "社区" },
              { img: imgUiFeeding,    label: "Feeding Map",  zh: "投喂地图" },
              { img: imgUiPetProfile, label: "Pet Profile",  zh: "猫咪档案" },
              { img: imgUiStore,      label: "Store",        zh: "商店" },
              { img: imgUiProfile,    label: "Profile",      zh: "个人中心" },
            ] as { img: string; label: string; zh: string }[]).map(({ img, label, zh }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                  {/* 标签 */}
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: FD, fontSize: "1.05rem", color: C.teal, margin: 0, lineHeight: 1.2 }}>{label}</p>
                    {lang === "zh" && <p style={{ fontFamily: FM, fontSize: "0.48rem", color: C.muted, margin: "2px 0 0", letterSpacing: "0.08em" }}>{zh}</p>}
                  </div>
                  {/* iPhone 外壳 + 截图 */}
                  <div style={{ position: "relative", width: "190px", flexShrink: 0 }}>
                    {/* 截图图层（在外壳下方，圆角裁切） */}
                    <img
                      src={img}
                      alt={label}
                      style={{
                        position: "absolute",
                        top: "1.8%",
                        left: "3.9%",
                        width: "92.2%",
                        height: "96.4%",
                        objectFit: "cover",
                        borderRadius: "22px",
                        display: "block",
                      }}
                    />
                    {/* iPhone 外壳图层（置于顶层） */}
                    <img
                      src={imgUiFrame}
                      alt=""
                      aria-hidden
                      style={{ position: "relative", width: "100%", display: "block", zIndex: 1 }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.32}>
            <p
              style={{
                fontFamily: FB,
                fontSize: "0.8rem",
                color: C.muted,
                textAlign: "center",
                marginTop: 32,
                lineHeight: 1.72,
              }}
            >
              {lang === "zh"
                ? "App 核心界面覆盖地图定位、猫咪档案与喂养调度三大模块，支持 NFC 签到自动记录与智能排班推送。"
                : "The app's core interface covers three key modules — map navigation, cat profiles, and feeding scheduling — with NFC check-in for automatic logging and smart schedule push notifications."}
            </p>
          </Reveal>
        </Inner>
      </Section>

      {/* ══ 08 PRODUCT DESIGN ═══════════════════════════════════════ */}
      <Section id="pg-product" grid>
        <Inner>
          <Reveal>
            <SectionHead num="— 08 —" title={lang === "zh" ? "产品设计" : "Product Design"} sub="PRODUCT DESIGN" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <Reveal x={-28}>
              <img
                src={img04}
                alt="Paw Guardians 智能喂食站产品渲染"
                style={{
                  width: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 16px 40px rgba(27,71,65,0.10))",
                }}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h3
                  style={{
                    fontFamily: FD,
                    fontSize: "2.1rem",
                    color: C.teal,
                    fontWeight: 700,
                    marginBottom: 22,
                  }}
                >
                  {lang === "zh" ? "智能喂食站" : "Smart Feeding Station"}
                </h3>
                <p
                  style={{
                    fontFamily: FB,
                    fontSize: "0.88rem",
                    color: C.body,
                    lineHeight: 1.78,
                    marginBottom: 24,
                  }}
                >
                  {lang === "zh"
                    ? "以猫耳造型为核心识别符号，强化设备亲和属性。透明侧门可视化食物库存，圆形显示屏实时呈现食量百分比与当日喂养统计，橙色 LED 氛围灯提升夜间可见度与情感共鸣。"
                    : "The cat-ear silhouette serves as the primary identifying symbol, reinforcing the device's approachable character. A transparent side panel visualizes food inventory at a glance, while a circular display shows real-time fill percentage and daily feeding statistics. The orange LED ambient ring improves nighttime visibility and emotional resonance."}
                </p>

                {(lang === "zh" ? [
                  {
                    l: "重量传感器",
                    d: "实时监测剩余食量，触达阈值自动推送补充通知至管理员",
                  },
                  {
                    l: "摄像模块",
                    d: "捕获猫咪到访图像，辅助 AI 识别个体身份与健康异常",
                  },
                  {
                    l: "NFC 感应区",
                    d: "守护者手机轻触完成签到，自动记录本次投喂行为至档案",
                  },
                  {
                    l: "IoT 连接",
                    d: "4G / Wi-Fi 双模通信，传感数据实时同步云端与 App",
                  },
                  {
                    l: "防雨结构",
                    d: "IP54 防护等级，耐候 ABS 外壳，适应校园户外全天候使用",
                  },
                ] : [
                  {
                    l: "Weight Sensor",
                    d: "Monitors remaining food level in real time and automatically pushes a restocking alert to administrators when the threshold is reached.",
                  },
                  {
                    l: "Camera Module",
                    d: "Captures images of visiting cats to assist AI in identifying individuals and detecting health anomalies.",
                  },
                  {
                    l: "NFC Tap Zone",
                    d: "Guardians tap their phone to check in, automatically logging the feeding event to the cat's health profile.",
                  },
                  {
                    l: "IoT Connectivity",
                    d: "Dual 4G / Wi-Fi connectivity syncs sensor data to the cloud and app in real time.",
                  },
                  {
                    l: "Weather-resistant Housing",
                    d: "IP54-rated protection with weatherproof ABS casing, designed for all-weather outdoor campus use.",
                  },
                ]).map((spec, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      paddingBottom: 13,
                      borderBottom: `1px solid ${C.tealBorder}`,
                      marginBottom: 13,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: C.orange,
                        flexShrink: 0,
                        marginTop: 5,
                      }}
                    />
                    <div>
                      <span
                        style={{
                          fontFamily: FM,
                          fontSize: "0.62rem",
                          color: C.orange,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {spec.l}
                      </span>
                      <p
                        style={{
                          fontFamily: FB,
                          fontSize: "0.78rem",
                          color: C.body,
                          marginTop: 4,
                          lineHeight: 1.62,
                        }}
                      >
                        {spec.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Inner>
      </Section>

      {/* ══ 09 STORYBOARD ═══════════════════════════════════════════ */}
      <Section id="pg-story" bg={C.bgAlt}>
        <Inner>
          <Reveal>
            <SectionHead num="— 09 —" title={lang === "zh" ? "使用故事板" : "Storyboard"} sub="STORYBOARD" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StoryPanel
              num="01"
              title={lang === "zh" ? "遇见流浪猫" : "A Chance Encounter"}
              desc={lang === "zh"
                ? "小张在图书馆附近发现一只瘦弱的橙白猫，想帮助却不知从何下手，也不知道是否已经有人在照顾。"
                : "Xiao Zhang spots a scrawny orange-and-white cat near the library. She wants to help, but has no idea how to start — or whether anyone is already taking care of it."}
            />
            <StoryPanel
              num="02"
              title={lang === "zh" ? "扫码加入" : "Scan to Join"}
              desc={lang === "zh"
                ? "附近智能喂食站上的二维码引导她找到守护联盟 App，一分钟完成注册，地图上周边所有猫咪清晰可见。"
                : "A QR code on the nearby smart feeder leads her to the Guardian Alliance app. Registration takes one minute, and every cat in the area appears clearly on the map."}
            />
            <StoryPanel
              num="03"
              title={lang === "zh" ? "认领守护" : "Adopt a Guardian Role"}
              desc={lang === "zh"
                ? "她认领了「小橘」，为其建立健康档案。系统自动将她纳入小橘的喂养排班，并推送其他守护者的联系方式。"
                : "She adopts \"Little Orange,\" creating a health profile for the cat. The system automatically adds her to Little Orange's feeding schedule and shares contact info for other guardians."}
            />
            <StoryPanel
              num="04"
              title={lang === "zh" ? "协同照护" : "Collaborative Care"}
              desc={lang === "zh"
                ? "排班算法合理分工，多位守护者各司其职。小橘的食物充足、健康数据持续更新，形成可持续的关爱闭环。"
                : "The scheduling algorithm divides responsibilities fairly among multiple guardians. Little Orange stays fed, health data stays current, and a sustainable care loop takes shape."}
            />
          </div>
        </Inner>
      </Section>

      {/* ══ 10 DESIGN RESULTS ═══════════════════════════════════════ */}
      <Section id="pg-results" grid>
        <Inner>
          <Reveal>
            <SectionHead num="— 10 —" title={lang === "zh" ? "设计成果" : "Design Results"} sub="DESIGN RESULTS" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-12">
            <Reveal>
              <div>
                <h3
                  style={{
                    fontFamily: FD,
                    fontSize: "1.9rem",
                    color: C.teal,
                    fontWeight: 700,
                    marginBottom: 18,
                  }}
                >
                  {lang === "zh" ? "验证与反馈" : "Validation & Feedback"}
                </h3>
                <p
                  style={{ fontFamily: FB, fontSize: "0.88rem", color: C.body, lineHeight: 1.78 }}
                >
                  {lang === "zh"
                    ? "原型阶段邀请 8 名校园猫守护者参与 2 周实地使用测试，覆盖东门、南苑、图书馆 3 个区域，共登记 5 只流浪猫建立健康档案。"
                    : "Eight campus cat guardians were invited to participate in a 2-week field test of the prototype, covering three zones — East Gate, South Campus, and the Library — and registering health profiles for 5 stray cats."}
                </p>
                <p
                  style={{
                    fontFamily: FB,
                    fontSize: "0.88rem",
                    color: C.body,
                    lineHeight: 1.78,
                    marginTop: 14,
                  }}
                >
                  {lang === "zh"
                    ? "测试结束后收集结构化反馈，验证系统协调效果与用户满意度，识别出喂食器补充流程与 AI 识别精度为核心迭代方向。"
                    : "Structured feedback was collected after testing to validate coordination effectiveness and user satisfaction. Feeder restocking workflows and AI recognition accuracy were identified as the primary areas for iteration."}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <Metric num="↓ 71%" label={lang === "zh" ? "重复喂食事件减少" : "Reduction in duplicate feeding events"} accent />
                <Metric num="8" label={lang === "zh" ? "守护者协作规模" : "Guardian collaboration scale"} />
                <Metric num="5" label={lang === "zh" ? "猫咪建立健康档案" : "Cats with health profiles established"} />
                <Metric num="4.3 / 5" label={lang === "zh" ? "系统满意度评分" : "User satisfaction score"} accent />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div
              style={{
                border: `1px solid ${C.tealBorder}`,
                borderLeft: `4px solid ${C.orange}`,
                padding: "28px 32px",
                background: C.bg,
              }}
            >
              <p
                style={{
                  fontFamily: FD,
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  color: C.teal,
                  lineHeight: 1.58,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {lang === "zh"
                  ? "\"这个项目让我理解了服务设计不只是流程图——它是真实关系的重新编排，是让善意可以被持续传递的基础设施。\""
                  : "\"This project taught me that service design is more than flowcharts — it is the re-choreography of real relationships, the infrastructure that lets kindness keep flowing.\""}
              </p>
              <p
                style={{
                  fontFamily: FM,
                  fontSize: "0.58rem",
                  color: C.muted,
                  marginTop: 16,
                  letterSpacing: "0.14em",
                }}
              >
                — 江圣鑫 · PROJECT REFLECTION
              </p>
            </div>
          </Reveal>
        </Inner>
      </Section>

      {/* ══ FOOTER ══════════════════════════════════════════════════ */}
      <section
        style={{
          background: C.bgAlt,
          borderTop: `1px solid ${C.tealBorder}`,
        }}
      >
        <div
          className="max-w-[1160px] mx-auto px-6 md:px-10 py-10"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}
        >
          <span
            style={{
              fontFamily: FM,
              fontSize: "0.58rem",
              color: C.muted,
              letterSpacing: "0.18em",
            }}
          >
            {lang === "zh" ? "PAW GUARDIANS ALLIANCE · 校园流浪猫智能管理系统设计" : "PAW GUARDIANS ALLIANCE · Campus Stray Cat Smart Management System"}
          </span>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                fontFamily: FM,
                fontSize: "0.62rem",
                color: C.orange,
                border: `1px solid ${C.orangeBorder}`,
                background: "none",
                padding: "8px 20px",
                cursor: "pointer",
                letterSpacing: "0.12em",
                transition: "background 0.2s",
                borderRadius: 2,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = C.orangeFaint;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "none";
              }}
            >
              {lang === "zh" ? "← 返回项目总览" : "← Back to Overview"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
