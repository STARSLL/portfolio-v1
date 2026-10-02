import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "./LanguageContext";

// ── 封面Sxr images ──────────────────────────────────────────────────
import imgArchSite from "@/imports/封面Sxr/9a2787357a75bb899b39b2e8ec32b8d155bdd691.png";
import imgRedTex from "@/imports/封面Sxr/f69e9d64851233c95c9f8e26e746e766ac6dd544.png";

// ── P1Sxr images ─────────────────────────────────────────────────────
import imgProductRender from "@/imports/P1Sxr/d7cbb96a8bda05386b5542428834db5a0ed977f4.png";
import imgPlatformSite from "@/imports/P1Sxr/c3199f742afd1bd1c6e33e4fac594165167a0619.png";
import imgPlatform2 from "@/imports/P1Sxr/ae4e18c883706acf27d859fff2772b0c375a0d8d.png";
import imgArchEquip from "@/imports/P1Sxr/6e9dde0c1d2a505d08ada632e9c7da90100bde85.png";
import imgSitePhoto from "@/imports/P1Sxr/90e277ee828bbec0b80edc296825b4dafbc83d7b.png";

// ── P2Jsx images ──────────────────────────────────────────────────────
import imgArchWork from "@/imports/P2Jsx/0d7d346f46c740a3cb76c3505832f6860ecdd8ab.png";
import imgProne from "@/imports/P2Jsx/d41b9128e8af55195a7153e321e62952b2cbd3d3.png";

// ── P3Jsx images ──────────────────────────────────────────────────────
import imgMask from "@/imports/P3Jsx/7607dc0d1938c707cd439d894a7386a019410e1b.png";
import imgChest from "@/imports/P3Jsx/34307d043456a5db8f34a988e85f3eaa21e5b391.png";
import imgForceAnalysis from "@/imports/P3Jsx/592a405d8a82b2753fe221d02eb638446e841fbf.png";

// ── P8 images ─────────────────────────────────────────────────────────
import imgProductFull from "@/imports/P8/2132f38bc5e7ef39d7ee41f1cf618e2ec4387030.png";
import imgHand from "@/imports/P8/23aa8f1bb79de0a604c35094e7d94e8ea49f7b87.png";

// ── P9Lsq images ─────────────────────────────────────────────────────
import imgMat1 from "@/imports/P9Lsq/9a5b4bc5b4e61646e1775fdfca303c7ac79352c2.png";
import imgMat2 from "@/imports/P9Lsq/b9e0b541b342ef8dfe4abb8f6754608faaa1b88b.png";
import imgMat3 from "@/imports/P9Lsq/bf746fc3169722c37c21caad6fb14eed45060f5e.png";
import imgMat4 from "@/imports/P9Lsq/cafd27bad32f35d68c6cc8cc8f4bee6dbc4292ce.png";

// ── P10Lsq images ────────────────────────────────────────────────────
import imgBgBottom from "@/imports/P10Lsq/82270e518af385108e6eb9a29f16fd16d87984bf.png";

// ── 色彩令牌 ─────────────────────────────────────────────────────────
const C = {
  bg:       "#0A0805",
  bgAlt:    "#12100D",
  bgPanel:  "rgba(58,42,28,0.45)",
  amber:    "#A67B58",
  amberPale:"#D9C2B0",
  amberDeep:"#74563E",
  white:    "#FFFFFF",
  whiteD:   "rgba(255,255,255,0.72)",
  whiteMute:"rgba(255,255,255,0.38)",
  gridLine: "rgba(255,255,255,0.07)",
  scanLine: "rgba(166,123,88,0.25)",
};

// ── 字体 ─────────────────────────────────────────────────────────────
const FS = "'Space Grotesk', 'Noto Serif SC', sans-serif";
const FM = "'Space Mono', monospace";

// ── 滚动显现 ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -48px 0px" });
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : y }}
      transition={{ duration: inView ? 0.65 : 0.3, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── 章节标题装饰 ─────────────────────────────────────────────────────
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <span style={{ fontFamily: FM, fontSize: "0.65rem", color: C.amber, letterSpacing: "0.22em" }}>{num}</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${C.amber} 0%, transparent 100%)` }} />
      <span style={{ fontFamily: FM, fontSize: "0.65rem", color: C.whiteMute, letterSpacing: "0.18em" }}>{label}</span>
    </div>
  );
}

// ── 科技框线装饰 ─────────────────────────────────────────────────────
function CornerBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ padding: "20px" }}>
      {/* corner ticks */}
      {[["top-0 left-0","border-t border-l"],["top-0 right-0","border-t border-r"],["bottom-0 left-0","border-b border-l"],["bottom-0 right-0","border-b border-r"]].map(([pos, border], i) => (
        <div key={i} className={`absolute w-4 h-4 ${pos} ${border}`} style={{ borderColor: C.amber }} />
      ))}
      {children}
    </div>
  );
}

// ── 压力分布图（内联 SVG，避免 recharts 内部键冲突）────────────────
const pressureData = [
  { label: "0.07", value: 69.59 },
  { label: "0.44", value: 14.02 },
  { label: "0.81", value: 8.11 },
  { label: "1.18", value: 4.39 },
  { label: "1.55", value: 2.03 },
  { label: "1.92", value: 1.01 },
  { label: "2.30", value: 0.84 },
];

function PressureChart() {
  const W = 340, H = 140, PL = 36, PB = 24, PT = 8, PR = 8;
  const chartW = W - PL - PR;
  const chartH = H - PB - PT;
  const maxVal = 80;
  const barW = Math.floor(chartW / pressureData.length) - 3;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      {/* y-axis gridlines */}
      {[0, 20, 40, 60, 80].map((v) => {
        const y = PT + chartH - (v / maxVal) * chartH;
        return (
          <g key={`grid-${v}`}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            <text x={PL - 4} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">{v}</text>
          </g>
        );
      })}
      {/* bars */}
      {pressureData.map(({ label, value }, i) => {
        const bh = (value / maxVal) * chartH;
        const x = PL + i * (chartW / pressureData.length) + 2;
        const y = PT + chartH - bh;
        return (
          <g key={`bar-${i}`}>
            <rect x={x} y={y} width={barW} height={bh} fill="rgba(217,217,217,0.85)" />
            <text x={x + barW / 2} y={y - 3} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="monospace">{value}</text>
            <text x={x + barW / 2} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── 主页面 ────────────────────────────────────────────────────────────
interface Props { onBack: () => void; }

export default function SAGEPage({ onBack }: Props) {
  const { lang } = useLanguage();

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: FS, minHeight: "100vh", overflowX: "hidden" }}>
      {/* ── 顶部导航 ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(10,8,5,0.92) 0%, transparent 100%)", backdropFilter: "blur(4px)" }}>
        <button onClick={onBack} className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ fontFamily: FM, fontSize: "0.7rem", color: C.amberPale, letterSpacing: "0.15em" }}>
          <ArrowLeft size={14} />
          {lang === "zh" ? "返回项目列表" : "← Back"}
        </button>
        <div className="flex-1" />
        <span style={{ fontFamily: FM, fontSize: "0.62rem", color: C.whiteMute, letterSpacing: "0.2em" }}>
          {lang === "zh" ? "SAGE · 灵衡 · G11" : "SAGE · G11"}
        </span>
      </div>

      {/* ══════════════════════════════════════════════
          01  封面 HERO
      ══════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: 600 }}>
        {/* 背景考古现场照 */}
        <img src={imgArchSite} alt={lang === "zh" ? "考古现场" : "Archaeological site"} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%", opacity: 0.65 }} />
        {/* 左侧暗色渐变 */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,8,5,0.82) 30%, transparent 70%)" }} />
        {/* 底部渐变 */}
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: `linear-gradient(to top, ${C.bg}, transparent)` }} />

        {/* 红棕纹理叠层 */}
        <div className="absolute left-0 top-0 h-full w-[45%] overflow-hidden" style={{ mixBlendMode: "multiply", opacity: 0.18 }}>
          <img src={imgRedTex} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleY(-1) rotate(180deg)" }} />
        </div>

        {/* 内容 */}
        <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-16 md:px-16 md:pb-20">
          <Reveal>

          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-3 h-3 rounded-full" style={{ background: C.amberPale }} />
              <span style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", fontWeight: 200, letterSpacing: "0.05em", lineHeight: 1 }}>
                {lang === "zh" ? "灵衡" : "SAGE"}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ fontSize: "clamp(5rem, 18vw, 14rem)", fontWeight: 100, lineHeight: 0.85, color: "rgba(255,255,255,0.12)", letterSpacing: "-0.02em", userSelect: "none", marginLeft: "-0.04em" }}>
              SAGE
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.15rem)", color: C.whiteD, maxWidth: 580, lineHeight: 1.7, marginTop: 8 }}>
              {lang === "zh"
                ? "基于智能自适应技术的姿态引导与可穿戴力学平衡系统"
                : "Smart Adaptive Guidance Equipoise — Wearable Postural Support System"}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: FM, fontSize: "0.6rem", color: C.whiteMute, letterSpacing: "0.25em", marginTop: 8 }}>
              Smart Adaptive Guidance Equipoise
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          02  设计陈述 DESIGN STATEMENT
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 px-8 md:px-16">
        {/* 网格背景 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
          <defs>
            <pattern id="grid-sage" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0L0 0L0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-sage)" />
        </svg>

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <SectionLabel num="01" label="DESIGN STATEMENT" />
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 100, letterSpacing: "0.03em", lineHeight: 1.1, marginBottom: 48 }}>
              {lang === "zh" ? "设计陈述" : "Design Statement"}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧文字 */}
            <div>
              <Reveal delay={0.05}>
                {lang === "zh" ? (
                  <p style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", color: C.whiteD, lineHeight: 1.85, marginBottom: 24 }}>
                    本团队正在研发一款面向
                    <span style={{ color: C.amberPale }}>悬浮考古平台作业</span>
                    场景的可穿戴式人体工学辅助装备。通过
                    <span style={{ color: C.amberPale }}>智能姿态引导</span>
                    与
                    <span style={{ color: C.amberPale }}>动态力学支撑</span>
                    ，主动缓解考古人员长期俯卧、前倾姿势所导致的
                    <span style={{ color: C.amberPale }}>腰核肌群劳损与颈部疲劳</span>
                    ，同步提升作业稳定性与工作效率。
                  </p>
                ) : (
                  <p style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", color: C.whiteD, lineHeight: 1.85, marginBottom: 24 }}>
                    Our team is developing a wearable ergonomic assistance device designed for
                    <span style={{ color: C.amberPale }}> elevated archaeological platform work</span>.
                    Through <span style={{ color: C.amberPale }}>intelligent posture guidance</span> and{" "}
                    <span style={{ color: C.amberPale }}>dynamic mechanical support</span>, it actively
                    alleviates <span style={{ color: C.amberPale }}>lumbar muscle strain and cervical fatigue</span>{" "}
                    caused by prolonged prone and forward-leaning postures, while simultaneously improving
                    operational stability and work efficiency.
                  </p>
                )}
              </Reveal>
              <Reveal delay={0.1}>
                <div className="grid grid-cols-2 gap-3 mt-8">
                  {(lang === "zh"
                    ? ["可穿戴人体工学", "智能模块系统", "文化情感共鸣", "价值创新竞争"]
                    : ["Wearable Ergonomics", "Smart Module System", "Cultural Resonance", "Value Innovation"]
                  ).map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: C.amber, flexShrink: 0 }} />
                      <span style={{ fontFamily: FM, fontSize: "0.72rem", color: C.whiteD, letterSpacing: "0.08em" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-10 flex gap-8 flex-wrap">
                  {[
                    { zh: "蓝海创新", en: "Blue Ocean Strategy", note: "Blue Ocean" },
                    { zh: "技术引领", en: "Tech-Driven", note: "Innovation" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{ fontSize: "1.6rem", fontWeight: 200, color: C.amberPale }}>
                        {lang === "zh" ? item.zh : item.en}
                      </div>
                      <div style={{ fontFamily: FM, fontSize: "0.6rem", color: C.whiteMute, letterSpacing: "0.2em" }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* 右侧产品渲染图 */}
            <Reveal delay={0.08} y={32}>
              <div className="relative">
                {/* 科技坐标网格 */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.35 }}>
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                  <line x1="0" y1="60%" x2="100%" y2="60%" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                  <rect x="35%" y="55%" width="30%" height="10%" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                </svg>
                <img src={imgProductRender} alt={lang === "zh" ? "灵衡产品渲染图" : "SAGE product render"} className="w-full max-w-md mx-auto object-contain" style={{ filter: "drop-shadow(-12px -10px 18px rgba(31,54,57,0.6))" }} />
              </div>
            </Reveal>
          </div>

          {/* 现场照片横排 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16">
            {(lang === "zh" ? [
              { src: imgPlatformSite, label: "悬浮考古平台" },
              { src: imgPlatform2, label: "可调高度挖掘平台" },
              { src: imgArchEquip, label: "防磨工装与内置支撑" },
              { src: imgSitePhoto, label: "山西垣曲北白鹅墓地遗址" },
            ] : [
              { src: imgPlatformSite, label: "Elevated Archaeological Platform" },
              { src: imgPlatform2, label: "Height-Adjustable Excavation Platform" },
              { src: imgArchEquip, label: "Anti-Abrasion Gear & Built-in Support" },
              { src: imgSitePhoto, label: "Beibaie Cemetery Site, Yuanqu, Shanxi" },
            ]).map(({ src, label }, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="relative overflow-hidden group" style={{ borderRadius: 2 }}>
                  <img src={src} alt={label} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ height: 160, objectPosition: "center" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,5,0.7) 0%, transparent 60%)" }} />
                  <span className="absolute bottom-2 left-3" style={{ fontFamily: FM, fontSize: "0.6rem", color: C.whiteD, letterSpacing: "0.08em" }}>{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          03  问题定义 PROBLEM DEFINING
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 px-8 md:px-16" style={{ background: C.bgAlt }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionLabel num="02" label="PROBLEM DEFINING" />
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 100, letterSpacing: "0.03em", lineHeight: 1.1, marginBottom: 48 }}>
              {lang === "zh" ? "问题定义" : "Problem Definition"}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* 左侧：痛点标注图 */}
            <div>
              <Reveal delay={0.05}>
                <div className="relative" style={{ borderRadius: 2, overflow: "hidden" }}>
                  <img src={imgProne} alt={lang === "zh" ? "考古人员俯卧作业" : "Archaeologist working prone"} className="w-full object-cover" style={{ maxHeight: 360, objectPosition: "center" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 50%, rgba(10,8,5,0.5) 100%)" }} />
                  {/* 橙色压力标注框 */}
                  <div className="absolute" style={{ top: "28%", left: "32%", width: 64, height: 80, background: "rgba(174,105,49,0.32)", border: "1px solid rgba(174,105,49,0.5)" }} />
                  <div className="absolute" style={{ top: "55%", left: "28%", width: 64, height: 60, background: "rgba(174,105,49,0.32)", border: "1px solid rgba(174,105,49,0.5)" }} />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-6 grid grid-cols-1 gap-3">
                  {(lang === "zh" ? [
                    { icon: "⬟", label: "颈椎压力", desc: "颈部僵硬疼痛，转动困难，需靠转动眼睛代偿" },
                    { icon: "⬟", label: "胸部压力", desc: "平台边缘对胸部产生持续性压迫" },
                    { icon: "⬟", label: "眼部疲劳", desc: "频繁转动眼球导致视觉疲劳与注意力下降" },
                    { icon: "⬟", label: "手部操作空间受限", desc: "精细操作需保留充足手部活动余量" },
                  ] : [
                    { icon: "⬟", label: "Cervical Pressure", desc: "Neck stiffness and pain, restricted rotation, compensated by excessive eye movement" },
                    { icon: "⬟", label: "Chest Pressure", desc: "Continuous compression of the chest by platform edges" },
                    { icon: "⬟", label: "Eye Fatigue", desc: "Frequent eyeball rotation causes visual fatigue and reduced concentration" },
                    { icon: "⬟", label: "Limited Hand Workspace", desc: "Precision work requires sufficient freedom for hand movement" },
                  ]).map(({ icon, label, desc }, i) => (
                    <Reveal key={i} delay={0.05 + i * 0.04}>
                      <div className="flex gap-3 items-start py-3 border-b" style={{ borderColor: C.gridLine }}>
                        <span style={{ color: C.amber, fontSize: "0.5rem", marginTop: 5, flexShrink: 0 }}>{icon}</span>
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 500, color: C.amberPale, marginBottom: 2 }}>{label}</div>
                          <div style={{ fontSize: "0.8rem", color: C.whiteD, lineHeight: 1.6 }}>{desc}</div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* 右侧：考古照片 + 目标陈述 */}
            <div className="space-y-8">
              <Reveal delay={0.08}>
                <div className="relative overflow-hidden" style={{ borderRadius: 2 }}>
                  <img src={imgArchWork} alt={lang === "zh" ? "考古作业现场" : "Archaeological fieldwork"} className="w-full object-cover" style={{ height: 280, objectPosition: "center top" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,5,0.5), transparent 70%)" }} />
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <CornerBox>
                  <div style={{ fontFamily: FM, fontSize: "0.62rem", color: C.amber, letterSpacing: "0.2em", marginBottom: 12 }}>
                    {lang === "zh" ? "设计目标" : "DESIGN GOAL"}
                  </div>
                  {lang === "zh" ? (
                    <p style={{ fontSize: "0.95rem", color: C.whiteD, lineHeight: 1.8 }}>
                      本产品针对考古人员在悬浮平台俯卧作业时面临的
                      <span style={{ color: C.amberPale }}>颈部肌群劳损</span>
                      与
                      <span style={{ color: C.amberPale }}>视野受限</span>
                      问题，在确保手部操作灵活性的基础上，有效降低颈部肌肉负荷及眼部频繁转动引发的视觉疲劳，同步提升作业稳定性与操作效率。
                    </p>
                  ) : (
                    <p style={{ fontSize: "0.95rem", color: C.whiteD, lineHeight: 1.8 }}>
                      This product addresses{" "}
                      <span style={{ color: C.amberPale }}>cervical muscle strain</span> and{" "}
                      <span style={{ color: C.amberPale }}>limited field of view</span> faced by
                      archaeologists working prone on elevated platforms. While preserving full
                      hand dexterity, it effectively reduces neck muscle load and visual fatigue
                      from repeated eye rotation, improving both stability and operational efficiency.
                    </p>
                  )}
                </CornerBox>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          04  相关性 RELEVANCE
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 px-8 md:px-16">
        {/* 古物面孔背景 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img src={imgMask} alt="" className="absolute top-0 right-0 h-full object-cover object-right" style={{ width: "55%", opacity: 0.2, filter: "saturate(0.4)" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.bg} 40%, transparent 75%)` }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <SectionLabel num="03" label="RELEVANCE" />
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 100, letterSpacing: "0.03em", lineHeight: 1.1, marginBottom: 48 }}>
              {lang === "zh" ? "设计关联性" : "Design Relevance"}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 左侧：四大驱动 */}
            <div>
              {(lang === "zh" ? [
                { zh: "数据驱动", desc: "基于真实生物力学测量数据，量化俯卧作业姿态下各关节负荷分布，支撑设计决策" },
                { zh: "需求驱动", desc: "深入田野调研，挖掘考古人员长时作业中尚未被满足的人体工学核心诉求" },
                { zh: "文化情感联结", desc: "以中国传统文物器型语言为设计灵感，在功能装备中注入历史温度与人文情怀" },
                { zh: "以人为中心设计", desc: "全程参与式设计，贯穿田野观察、快速原型与迭代验证" },
              ] : [
                { zh: "Data-Driven", desc: "Based on real biomechanical measurement data, quantifying joint load distribution in prone work postures to inform design decisions" },
                { zh: "Needs-Driven", desc: "In-depth field research to uncover unmet ergonomic needs of archaeologists during extended fieldwork" },
                { zh: "Cultural & Emotional Connection", desc: "Drawing design inspiration from traditional Chinese artifact forms, embedding historical warmth and humanistic values into functional equipment" },
                { zh: "Human-Centered Design", desc: "Participatory design throughout — field observation, rapid prototyping, and iterative validation" },
              ]).map(({ zh, desc }, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="py-5 border-b" style={{ borderColor: C.gridLine }}>
                    <div style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, color: C.white, marginBottom: 6 }}>{zh}</div>
                    <p style={{ fontSize: "0.85rem", color: C.whiteD, lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* 右侧：力学分析面板 */}
            <div className="space-y-6">
              <Reveal delay={0.08}>
                <div className="relative overflow-hidden" style={{ background: "rgba(56,56,56,0.7)", borderRadius: 2 }}>
                  <div className="py-2 px-4" style={{ background: C.amberDeep }}>
                    <span style={{ fontFamily: FM, fontSize: "0.72rem", color: C.white, letterSpacing: "0.15em" }}>力学分析 / Mechanical Analysis</span>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-3">
                    <img src={imgChest} alt={lang === "zh" ? "胸部压力分布" : "Chest pressure distribution"} className="w-full object-cover opacity-60" style={{ height: 140, mixBlendMode: "luminosity", borderRadius: 1 }} />
                    <img src={imgForceAnalysis} alt={lang === "zh" ? "受力分析" : "Force analysis"} className="w-full object-cover" style={{ height: 140, borderRadius: 1 }} />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div style={{ background: "rgba(36,36,36,0.7)", borderRadius: 2, overflow: "hidden" }}>
                  <div className="py-2 px-4" style={{ background: "rgba(217,217,217,0.15)" }}>
                    <span style={{ fontFamily: FM, fontSize: "0.72rem", color: C.white, letterSpacing: "0.15em" }}>压力分布 / Pressure Distribution</span>
                  </div>
                  <div className="px-4 pb-4 pt-2">
                    <PressureChart />
                    <p style={{ fontFamily: FM, fontSize: "0.58rem", color: C.whiteMute, textAlign: "center", letterSpacing: "0.1em", marginTop: 4 }}>
                      {lang === "zh" ? "压力区间（0.07–2.30 N/cm²）" : "Pressure Range (0.07–2.30 N/cm²)"}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          05  差异化 DIFFERENTIATION
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 px-8 md:px-16 overflow-hidden" style={{ background: C.bgAlt }}>
        {/* 产品全图背景 */}
        <div className="absolute right-0 top-0 h-full pointer-events-none" style={{ width: "50%", opacity: 0.35 }}>
          <img src={imgProductFull} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(18,16,13,1) 0%, transparent 100%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <SectionLabel num="04" label="DIFFERENTIATION" />
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 100, letterSpacing: "0.03em", lineHeight: 1.1, marginBottom: 48 }}>
              {lang === "zh" ? "差异化定位" : "Differentiated Positioning"}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            {(lang === "zh" ? [
              { title: "前所未有的领域", sub: "考古专用人体工学装备市场真空", icon: "△" },
              { title: "专业化考古设备", sub: "针对悬浮平台俯卧作业量身定制", icon: "◇" },
              { title: "人机耦合系统", sub: "感知—决策—执行闭环集成", icon: "○" },
              { title: "行业特有矛盾破解", sub: "精细操作性与身体防护性的同步实现", icon: "□" },
            ] : [
              { title: "Unprecedented Market Space", sub: "No existing ergonomic equipment designed specifically for archaeology", icon: "△" },
              { title: "Specialized Archaeological Device", sub: "Tailored for prone work on elevated excavation platforms", icon: "◇" },
              { title: "Human-Machine Coupling System", sub: "Integrated sense–decide–execute closed-loop", icon: "○" },
              { title: "Breaking Industry Trade-offs", sub: "Simultaneously achieving fine motor dexterity and full-body protection", icon: "□" },
            ]).map(({ title, sub, icon }, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <CornerBox>
                  <div style={{ fontFamily: FM, fontSize: "1.2rem", color: C.amberPale, marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600, color: C.white, marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: "0.82rem", color: C.whiteD, lineHeight: 1.65 }}>{sub}</p>
                </CornerBox>
              </Reveal>
            ))}
          </div>

          {/* 手部图 + 标注 */}
          <Reveal delay={0.2}>
            <div className="mt-16 flex flex-col md:flex-row gap-8 items-center">
              <div className="relative max-w-xs">
                <img src={imgHand} alt={lang === "zh" ? "精准操作分析" : "Precision operation analysis"} className="w-full object-contain opacity-60" style={{ filter: "grayscale(0.4)" }} />
                {/* 圆圈标注 */}
                {[[38, 28, 36],[62, 52, 64],[30, 72, 24]].map(([l, t, s], i) => (
                  <div key={i} className="absolute rounded-full" style={{ left: `${l}%`, top: `${t}%`, width: s, height: s, border: "1px solid rgba(255,255,255,0.6)", transform: "translate(-50%,-50%)" }} />
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div style={{ fontFamily: FM, fontSize: "0.62rem", color: C.amber, letterSpacing: "0.2em", marginBottom: 8 }}>
                  {lang === "zh" ? "核心矛盾" : "CORE TENSION"}
                </div>
                {(lang === "zh" ? [
                  ["精细操作性", "手部自由度与触觉反馈保留"],
                  ["身体防护性", "颈椎/胸廓/腰核全链条减负"],
                ] : [
                  ["Fine Motor Dexterity", "Preserving hand freedom and tactile feedback"],
                  ["Full-Body Protection", "Reducing load across cervical spine, thorax, and lumbar core"],
                ]).map(([a, b], i) => (
                  <div key={i} className="py-3 px-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: C.white, marginBottom: 2 }}>{a}</div>
                    <div style={{ fontSize: "0.78rem", color: C.whiteD }}>{b}</div>
                  </div>
                ))}
                <div className="py-3 px-5 mt-1" style={{ background: "rgba(166,123,88,0.18)", border: "1px solid rgba(166,123,88,0.4)" }}>
                  <div style={{ fontFamily: FM, fontSize: "0.7rem", color: C.amberPale, fontWeight: 700 }}>
                    {lang === "zh" ? "SAGE 同步实现两者" : "SAGE ACHIEVES BOTH"}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          06  可持续性 SUSTAINABILITY
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <SectionLabel num="05" label="SUSTAINABILITY" />
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 100, letterSpacing: "0.03em", lineHeight: 1.1, marginBottom: 48 }}>
              {lang === "zh" ? "材料与可持续性" : "Materials & Sustainability"}
            </h2>
          </Reveal>

          {/* 四格材料图 */}
          <div className="grid grid-cols-2 gap-1 mb-16">
            {(lang === "zh" ? [
              { src: imgMat1, name: "中国漆", en: "Chinese Lacquer", props: ["可再生", "可降解", "耐腐蚀"] },
              { src: imgMat2, name: "碳纤维", en: "Carbon Fiber", props: ["高强轻量", "耐久性", "结构支撑"] },
              { src: imgMat3, name: "聚氨酯泡棉", en: "Polyurethane Foam", props: ["低毒", "可降解", "弹性优异"] },
              { src: imgMat4, name: "聚乳酸纤维", en: "Polylactic Acid Fiber", props: ["生物基", "低碳生产", "可堆肥"] },
            ] : [
              { src: imgMat1, name: "Chinese Lacquer", en: "Chinese Lacquer", props: ["Renewable", "Biodegradable", "Corrosion-Resistant"] },
              { src: imgMat2, name: "Carbon Fiber", en: "Carbon Fiber", props: ["High-Strength & Lightweight", "Durable", "Structural Support"] },
              { src: imgMat3, name: "Polyurethane Foam", en: "Polyurethane Foam", props: ["Low Toxicity", "Biodegradable", "Excellent Elasticity"] },
              { src: imgMat4, name: "Polylactic Acid Fiber", en: "Polylactic Acid Fiber", props: ["Bio-Based", "Low-Carbon Production", "Compostable"] },
            ]).map(({ src, name, en, props }, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="relative overflow-hidden group" style={{ borderRadius: 2 }}>
                  <img src={src} alt={name} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ height: "clamp(180px, 25vw, 280px)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,5,0.85) 0%, rgba(10,8,5,0.1) 60%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div style={{ fontSize: "1.1rem", fontWeight: 600, color: C.white, marginBottom: 2 }}>{name}</div>
                    <div style={{ fontFamily: FM, fontSize: "0.58rem", color: C.whiteMute, letterSpacing: "0.15em", marginBottom: 8 }}>{en}</div>
                    <div className="flex gap-2 flex-wrap">
                      {props.map((p, pi) => (
                        <span key={pi} style={{ fontFamily: FM, fontSize: "0.58rem", color: C.amberPale, background: "rgba(166,123,88,0.18)", padding: "2px 6px", border: "1px solid rgba(166,123,88,0.35)", borderRadius: 1 }}>{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 材料特性对比 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: C.amberPale, letterSpacing: "0.1em" }}>
                  {lang === "zh" ? "中国漆 · 可持续属性" : "Chinese Lacquer · Sustainability"}
                </div>
                {(lang === "zh" ? [
                  ["可再生性", "源自漆树树液，农林复合可持续采收"],
                  ["环境友好", "无毒、可生物降解，零化学污染"],
                  ["高耐久性", "抗腐蚀、耐磨损、防潮，延长装备寿命"],
                ] : [
                  ["Renewability", "Derived from lacquer tree sap; sustainably harvested through agroforestry"],
                  ["Eco-Friendly", "Non-toxic, biodegradable, zero chemical pollution"],
                  ["High Durability", "Corrosion-resistant, wear-resistant, moisture-proof — extends equipment lifespan"],
                ]).map(([k, v], i) => (
                  <div key={i} className="py-3 px-4 border-l-2" style={{ borderColor: C.amber, background: "rgba(166,123,88,0.06)" }}>
                    <span style={{ fontWeight: 600, color: C.white, fontSize: "0.85rem" }}>{k}：</span>
                    <span style={{ color: C.whiteD, fontSize: "0.82rem" }}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="space-y-4">
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: C.amberPale, letterSpacing: "0.1em" }}>
                  {lang === "zh" ? "聚乳酸纤维 · 可持续属性" : "PLA Fiber · Sustainability"}
                </div>
                {(lang === "zh" ? [
                  ["可再生来源", "源自玉米、甘蔗、木薯、秸秆等农业废料"],
                  ["完全可降解", "在自然土壤/海水环境中经微生物降解为CO₂"],
                  ["低碳生产", "生物发酵与聚合工艺显著减少化石燃料依赖"],
                ] : [
                  ["Renewable Sourcing", "Derived from corn, sugarcane, cassava, straw, and other agricultural by-products"],
                  ["Fully Biodegradable", "Breaks down into CO₂ via microbial degradation in soil or seawater"],
                  ["Low-Carbon Production", "Biological fermentation and polymerization processes significantly reduce fossil fuel dependency"],
                ]).map(([k, v], i) => (
                  <div key={i} className="py-3 px-4 border-l-2" style={{ borderColor: C.amberDeep, background: "rgba(116,86,62,0.08)" }}>
                    <span style={{ fontWeight: 600, color: C.white, fontSize: "0.85rem" }}>{k}：</span>
                    <span style={{ color: C.whiteD, fontSize: "0.82rem" }}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          07  影响力 IMPACT
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 px-8 md:px-16 overflow-hidden" style={{ background: C.bgAlt }}>
        {/* 背景纹理 */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }}>
          <img src={imgBgBottom} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ mixBlendMode: "hard-light" }} />
        </div>
        {/* 装饰条 */}
        <div className="absolute left-0 top-0" style={{ width: "55%", height: 120, background: C.amberDeep, marginLeft: -80, borderRadius: 0 }} />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <SectionLabel num="06" label="IMPACT" />
            <h2 className="relative z-10" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: 100, letterSpacing: "0.03em", lineHeight: 1.1, marginBottom: 8 }}>
              {lang === "zh" ? "影响力" : "Impact"}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div style={{ position: "relative", zIndex: 0, fontSize: "clamp(4rem, 14vw, 10rem)", fontWeight: 100, color: "rgba(255,255,255,0.06)", letterSpacing: "-0.02em", lineHeight: 0.85, marginTop: -8, marginBottom: 40, userSelect: "none" }}>
              SAGE
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            {lang === "zh" ? (
              <p className="max-w-4xl mb-12" style={{ fontSize: "0.9rem", color: C.whiteD, lineHeight: 1.8 }}>
                本产品以<span style={{ fontWeight: 700, color: C.amberPale }}>文化软叙事</span>支撑<span style={{ fontWeight: 700, color: C.amberPale }}>技术硬实力</span>。通过解决考古现场的微痛点，最终撬动文化遗产保护、科研范式升级与公众认知重塑等宏观社会价值，构建融合科技与人文的创新社会服务范式。
              </p>
            ) : (
              <p className="max-w-4xl mb-12" style={{ fontSize: "0.9rem", color: C.whiteD, lineHeight: 1.8 }}>
                This product anchors <span style={{ fontWeight: 700, color: C.amberPale }}>technological capability</span> in{" "}
                <span style={{ fontWeight: 700, color: C.amberPale }}>cultural narrative</span>. By resolving micro-scale pain points
                on archaeological sites, it ultimately unlocks macro-level social value — advancing cultural heritage
                preservation, upgrading scientific research paradigms, and reshaping public perception of archaeology.
              </p>
            )}
          </Reveal>

          {/* 三栏影响力 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(lang === "zh" ? [
              {
                title: "创意发明",
                accent: C.amberDeep,
                items: [
                  { h: "人体工学优化", list: ["俯卧作业颈椎负荷降低 → 减少职业伤病", "智能摄像补光消除盲区 → 防止视觉疲劳"] },
                  { h: "功能效率提升", list: ["照明/成像/心率一体化 → 减轻装备负荷", "实时心脏预警 → 提升高风险作业安全性"] },
                ],
              },
              {
                title: "应用拓展",
                accent: "#3a3a3a",
                items: [
                  { h: "水下考古", list: ["压力自适应支撑系统", "声纳扫描融合"] },
                  { h: "文物修复", list: ["触觉反馈模块", "微型精密工具集成"] },
                  { h: "灾区探险与应急救援", list: ["强化防御安全特性", "耐火材料集成"] },
                ],
              },
              {
                title: "社会效益",
                accent: "#2a2a2a",
                items: [
                  { h: "文化遗产保护", list: ["人体工学支撑降低文物接触损伤"] },
                  { h: "行业生态重构", list: ["定义「考古-人体工学装备」品类"] },
                  { h: "公众认知更新", list: ["行业价值创新"] },
                ],
              },
            ] : [
              {
                title: "Creative Invention",
                accent: C.amberDeep,
                items: [
                  { h: "Ergonomic Optimization", list: ["Reduced cervical load in prone work → fewer occupational injuries", "Smart camera fill-light eliminates blind spots → prevents visual fatigue"] },
                  { h: "Functional Efficiency", list: ["Integrated lighting / imaging / heart rate → lighter equipment burden", "Real-time cardiac alert → improved safety in high-risk fieldwork"] },
                ],
              },
              {
                title: "Application Expansion",
                accent: "#3a3a3a",
                items: [
                  { h: "Underwater Archaeology", list: ["Pressure-adaptive support system", "Sonar scan integration"] },
                  { h: "Artifact Restoration", list: ["Haptic feedback module", "Miniature precision tool integration"] },
                  { h: "Disaster Exploration & Emergency Rescue", list: ["Enhanced defensive safety features", "Fire-resistant material integration"] },
                ],
              },
              {
                title: "Social Benefits",
                accent: "#2a2a2a",
                items: [
                  { h: "Cultural Heritage Preservation", list: ["Ergonomic support reduces artifact contact damage"] },
                  { h: "Industry Ecosystem Restructuring", list: ["Defines the 'Archaeological Ergonomic Equipment' product category"] },
                  { h: "Public Awareness Shift", list: ["Industry value innovation"] },
                ],
              },
            ]).map(({ title, accent, items }, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="h-full" style={{ background: "rgba(58,42,28,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 2 }}>
                  <div className="py-3 px-5 flex items-center gap-2" style={{ background: accent }}>
                    {i === 0 && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M0 0H12L0 12V0Z" fill={C.amberPale} /></svg>}
                    <span style={{ fontWeight: 700, fontSize: "1rem", color: C.white }}>{title}</span>
                  </div>
                  <div className="p-5 space-y-5">
                    {items.map(({ h, list }, hi) => (
                      <div key={hi}>
                        <div style={{ fontWeight: 600, fontSize: "0.88rem", color: C.amberPale, marginBottom: 6 }}>{h}</div>
                        <ul className="space-y-1 pl-3">
                          {list.map((l, li) => (
                            <li key={li} className="flex items-start gap-2">
                              <span style={{ color: C.amber, fontSize: "0.5rem", marginTop: 5, flexShrink: 0 }}>■</span>
                              <span style={{ fontSize: "0.78rem", color: C.whiteD, lineHeight: 1.6 }}>{l}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 页脚 ── */}
      <footer className="py-12 px-8 md:px-16 text-center" style={{ background: C.bg, borderTop: `1px solid ${C.gridLine}` }}>
        <div style={{ fontFamily: FM, fontSize: "0.6rem", color: C.whiteMute, letterSpacing: "0.3em" }}>
          {lang === "zh"
            ? "SAGE · 灵衡 · 基于智能自适应技术的姿态引导与可穿戴力学平衡系统"
            : "SAGE · Smart Adaptive Guidance Equipoise · Wearable Postural Support System"}
        </div>
        <div className="mt-2" style={{ fontFamily: FM, fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>
          沈席茹 · 李诗祺 · 江圣鑫 · 曹铭哲 · 张梓墨 · G11
        </div>
      </footer>
    </div>
  );
}
