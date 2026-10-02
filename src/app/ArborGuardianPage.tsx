import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLanguage } from "./LanguageContext";

// ── Frame2 images — 现有保护措施 + 风洞实验 + 背景研究 ─────────────
import imgTree      from "@/imports/Frame2/41d23c16b763983eed79ac5d424065693ba29d46.png";
import imgMethod1   from "@/imports/Frame2/8a7ce0ce242e3e741b1310cc13c92ae35978393a.png";
import imgMethod2   from "@/imports/Frame2/8ed7f3863024bc5d61c55aff5c2bf2faeadbd737.png";
import imgMethod3   from "@/imports/Frame2/243e0212f40c7c171a95cd311944d91154e31ca8.png";
import imgMethod4   from "@/imports/Frame2/55518b67880a8473bff043122db16d7c90b64daa.png";
import imgEquip     from "@/imports/Frame2/a5c2c10049f3681bdbe4b152844b45fe1aeac79d.png";
import imgBrainA    from "@/imports/Frame2/bab2bf0109ee716b89d54a0290228ac0421afbf5.png";
import imgBrainB    from "@/imports/Frame2/2e75fe17153ded20a58547cabf65274dca01471a.png";
import imgSandstorm from "@/imports/Frame2/00240a9b4494727e51df0e61348e41aff324886a.png";
import imgFire      from "@/imports/Frame2/6dbc35f3eca40b96ed3142230d701b7e46ee505c.png";
import imgEarth     from "@/imports/Frame2/610350683f15ccf2768c8ea6620a7f8cbffa5af4.png";
import imgWinter    from "@/imports/Frame2/9df5772edc5fc04c57021b6a498acc2eccd19e3a.png";

// ── Frame6-1 images — 数字交互界面 ───────────────────────────────────
import imgUI1       from "@/imports/Frame6-1/44f4f6a37636242271610e18b6b26135cfeb19fa.png";
import imgUI2       from "@/imports/Frame6-1/ec19e8206235b9c5400efbcfa7301af5d0902836.png";
import imgUI3       from "@/imports/Frame6-1/79badb83103caa28ee2c18d83b563b2dc9de49af.png";
import imgUI4       from "@/imports/Frame6-1/c00e639b3b06f8fd42323c19e090a5617f45254a.png";
import imgUI5       from "@/imports/Frame6-1/4091e35d3491e15273812d5b5e1d4d5db227e14f.png";
import imgUIAlt     from "@/imports/Frame6-1/e32da2f823957f820d8fd1a96b95c9442e9692c8.png";

// ── Frame9 images — 传感器草图 + 材料分析 + 原型制作 ──────────────────
import imgSensor    from "@/imports/Frame9/d289255c90fd64e402e8815cbb8a4ac787a74d12.png";
import imgProto1    from "@/imports/Frame9/63798519a91b8e6c129f9237a7623eb9e90ef692.png";
import imgProto2    from "@/imports/Frame9/98ff871b8f4293cc64596151bedbbdee0a514b05.png";
import imgProto3    from "@/imports/Frame9/6c7b07bb04e52ebde32f112f811b469d1f48905e.png";
import imgMat1      from "@/imports/Frame9/550c06be800d0cbb93f52764a0f07bc96cd4fe76.png";
import imgMat2      from "@/imports/Frame9/b5d4160393344a7bf2b02f35ff2277df3aae6cf6.png";
import imgMat3      from "@/imports/Frame9/b96a7e94de1531b15f8b350494cf3b81a8c5146f.png";
import imgMat4      from "@/imports/Frame9/36deb7a4b00335bc6f1b02db022415bac86fb298.png";
import imgMat5      from "@/imports/Frame9/b1f41eb2c98133608ced3373716d2520c2f4c708.png";
import imgMat6      from "@/imports/Frame9/5046f40d683f8ba961ff6ed3016b75366f287393.png";
import imgFinal1    from "@/imports/Frame9/3e21ec14070a89b69ed2adea111ca3d585da0efe.png";
import imgFinal2    from "@/imports/Frame9/3c0e9eb347e263a2b0fb0151bbfcf0f00b1f69ad.png";
import imgFinal3    from "@/imports/Frame9/9320548931d8bd062b4e58fefd6b3f7dd077b4eb.png";
import imgFinal4    from "@/imports/Frame9/cbebe52bb7ff5e1819c8d6f809cd309e3ef9a756.png";
import imgFinal5    from "@/imports/Frame9/b5ec11d7fa7e3826e3437f0f502c22d69e52ebb4.png";
import imgOutput    from "@/imports/Frame9/8522273ced2164d0b7beca16beb9229762a0a369.png";

// ── 色彩令牌 ──────────────────────────────────────────────────────────
const C = {
  bg:        "#FFFFFF",
  bgAlt:     "#F4F6FA",
  bgDeep:    "#E8EDF4",
  bgDark:    "#141820",
  fog:       "#4776AC",
  fogMid:    "rgba(71,118,172,0.35)",
  fogLight:  "rgba(71,118,172,0.10)",
  fogBorder: "rgba(71,118,172,0.20)",
  ink:       "#1A1E26",
  gray:      "#6B7480",
  grayLight: "#B8C4D0",
  border:    "rgba(26,30,38,0.07)",
};

const FB = "'Space Grotesk', system-ui, sans-serif";
const FM = "'Space Mono', monospace";
const FO = "'Oregano', serif";

// ── 锚点章节 ──────────────────────────────────────────────────────────
const SECS = [
  { id: "s-hero",      zh: "项目介绍", en: "Overview" },
  { id: "s-climate",   zh: "气候研究", en: "Climate" },
  { id: "s-existing",  zh: "现有分析", en: "Analysis" },
  { id: "s-concept",   zh: "设计概念", en: "Concept" },
  { id: "s-structure", zh: "仿生结构", en: "Structure" },
  { id: "s-monitor",   zh: "智能监测", en: "Monitoring" },
  { id: "s-material",  zh: "材料研究", en: "Materials" },
  { id: "s-proto",     zh: "原型制作", en: "Prototype" },
  { id: "s-ui",        zh: "数字交互", en: "Digital UI" },
  { id: "s-outcome",   zh: "最终成果", en: "Outcome" },
];

// ── 滚动显现 ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 20 }: {
  children: React.ReactNode; delay?: number; y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -48px 0px" });
  return (
    <motion.div ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : y }}
      transition={{ duration: inView ? 0.68 : 0.28, delay: inView ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── 工程网格背景 ──────────────────────────────────────────────────────
function EngrGrid({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity }}>
      <defs>
        <pattern id="g-sm" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke={C.fog} strokeWidth="0.3" opacity="0.5" />
        </pattern>
        <pattern id="g-lg" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke={C.fog} strokeWidth="0.7" opacity="0.22" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#g-sm)" />
      <rect width="100%" height="100%" fill="url(#g-lg)" />
    </svg>
  );
}

// ── Section ───────────────────────────────────────────────────────────
function Section({ id, children, alt = false, dark = false }: {
  id: string; children: React.ReactNode; alt?: boolean; dark?: boolean;
}) {
  return (
    <section id={id} style={{
      background: dark ? C.bgDark : alt ? C.bgAlt : C.bg,
      borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : C.border}`,
      scrollMarginTop: "72px", position: "relative", overflow: "hidden",
    }}>
      {!dark && <EngrGrid opacity={alt ? 0.4 : 0.55} />}
      {dark && (
        <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.18 }}>
          <defs>
            <pattern id="g-dk" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={C.fog} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g-dk)" />
        </svg>
      )}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "88px 48px", position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}

// ── 章节标题 ──────────────────────────────────────────────────────────
function SHead({ num, zh, dark = false }: { num: string; zh: string; dark?: boolean }) {
  return (
    <Reveal>
      <div style={{ marginBottom: "56px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "12px" }}>
          <span style={{
            fontFamily: FO, fontStyle: "italic",
            fontSize: "clamp(4.5rem, 9vw, 8rem)",
            color: C.fog, lineHeight: 1, opacity: 0.15,
            letterSpacing: "-0.02em", userSelect: "none", flexShrink: 0,
          }}>
            {num}
          </span>
          <h2 style={{
            fontFamily: FB, fontWeight: 600,
            fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
            color: dark ? "#fff" : C.ink,
            margin: 0, lineHeight: 1.1, letterSpacing: "-0.01em",
          }}>
            {zh}
          </h2>
        </div>
        <div style={{
          height: "1px",
          background: `linear-gradient(to right, ${C.fog}, ${C.fogBorder} 200px, transparent)`,
        }} />
      </div>
    </Reveal>
  );
}

// ── 指标卡 ────────────────────────────────────────────────────────────
function Stat({ label, value, unit, sub }: { label: string; value: string; unit?: string; sub?: string }) {
  return (
    <div style={{
      padding: "18px 20px", background: C.bg,
      border: `1px solid ${C.fogBorder}`,
      borderTop: `2px solid ${C.fog}`,
    }}>
      <p style={{ fontFamily: FM, fontSize: "0.54rem", letterSpacing: "0.2em", color: C.fog, marginBottom: "8px" }}>{label}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
        <span style={{ fontFamily: FO, fontStyle: "italic", fontSize: "2.2rem", color: C.ink, lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontFamily: FM, fontSize: "0.6rem", color: C.gray }}>{unit}</span>}
      </div>
      {sub && <p style={{ fontFamily: FB, fontSize: "0.7rem", color: C.gray, marginTop: "5px" }}>{sub}</p>}
    </div>
  );
}

// ── 右侧锚点导航 ──────────────────────────────────────────────────────
function AnchorNav() {
  const { lang } = useLanguage();
  const [active, setActive] = useState("s-hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => e.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); }),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav className="hidden xl:flex" style={{
      position: "fixed", right: "24px", top: "50%", transform: "translateY(-50%)",
      flexDirection: "column", gap: "5px", zIndex: 40,
    }}>
      {SECS.map(({ id, zh, en }) => (
        <button key={id} onClick={() => go(id)} style={{
          display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px",
          background: "none", border: "none", cursor: "pointer", padding: "2px 0",
        }}>
          <span style={{
            fontFamily: FM, fontSize: "0.5rem", letterSpacing: "0.08em",
            color: active === id ? C.fog : C.grayLight,
            transition: "color 0.25s", whiteSpace: "nowrap",
          }}>{active === id ? (lang === "zh" ? zh : en) : ""}</span>
          <span style={{
            width: active === id ? "18px" : "5px", height: "1.5px",
            background: active === id ? C.fog : C.grayLight,
            transition: "all 0.28s ease", display: "inline-block",
          }} />
        </button>
      ))}
    </nav>
  );
}

// ── SVG 大树工程图 ─────────────────────────────────────────────────────
function TreeSVG({ phase }: { phase: number }) {
  const { lang } = useLanguage();
  return (
    <svg viewBox="0 0 480 560" style={{ width: "100%", maxHeight: "72vh", display: "block" }}>
      <line x1="40" y1="20" x2="40" y2="520" stroke={C.fog} strokeWidth="0.6" strokeDasharray="4 4" opacity={phase >= 3 ? 0.4 : 0} />
      <line x1="20" y1="500" x2="460" y2="500" stroke={C.fog} strokeWidth="0.6" strokeDasharray="4 4" opacity={phase >= 3 ? 0.4 : 0} />
      {phase >= 2 && (
        <g opacity="0.7" stroke={C.fog} strokeWidth="1.2" fill="none">
          <path d="M 240 420 Q 200 450 160 480 Q 140 490 110 488" />
          <path d="M 240 420 Q 260 455 290 475 Q 320 490 350 485" />
          <path d="M 240 430 Q 225 460 210 490 Q 200 508 185 512" />
          <path d="M 240 430 Q 255 462 270 490 Q 278 508 292 512" />
          <path d="M 240 440 Q 180 470 150 500" />
          <path d="M 240 440 Q 300 472 330 500" />
        </g>
      )}
      {phase >= 1 && (
        <path d="M 220 420 L 225 340 L 222 280 L 228 220 L 240 160 L 252 220 L 258 280 L 255 340 L 260 420"
          stroke={C.ink} strokeWidth="6" fill="#D4C8B4" strokeLinejoin="round" opacity="0.9"
        />
      )}
      {phase >= 2 && (
        <g stroke={C.ink} strokeWidth="2.5" fill="none" opacity="0.7">
          <path d="M 235 280 Q 190 255 155 240" />
          <path d="M 245 280 Q 295 255 330 238" />
          <path d="M 235 240 Q 200 215 172 200" />
          <path d="M 245 240 Q 278 215 305 198" />
          <path d="M 238 210 Q 215 185 198 168" />
          <path d="M 242 210 Q 262 183 278 166" />
          <path d="M 236 330 Q 195 315 170 310" />
          <path d="M 244 330 Q 285 315 310 310" />
        </g>
      )}
      {phase >= 2 && (
        <g opacity="0.75">
          <ellipse cx="240" cy="130" rx="90" ry="75" fill="#C8D8B0" stroke={C.fog} strokeWidth="0.5" />
          <ellipse cx="175" cy="175" rx="62" ry="52" fill="#B8D0A0" stroke={C.fog} strokeWidth="0.4" />
          <ellipse cx="305" cy="172" rx="60" ry="52" fill="#BCCE9E" stroke={C.fog} strokeWidth="0.4" />
          <ellipse cx="195" cy="108" rx="52" ry="44" fill="#C4D8A8" stroke={C.fog} strokeWidth="0.4" />
          <ellipse cx="285" cy="105" rx="50" ry="43" fill="#C0D4A4" stroke={C.fog} strokeWidth="0.4" />
          <ellipse cx="240" cy="78" rx="44" ry="38" fill="#CCE0B4" />
        </g>
      )}
      {phase >= 3 && (
        <g>
          {[
            ...(lang === "zh" ? [
            { cx: 240, cy: 380, label: "主干传感器" },
            { cx: 175, cy: 310, label: "应力节点 A" },
            { cx: 305, cy: 308, label: "应力节点 B" },
            { cx: 155, cy: 240, label: "倾斜传感" },
            { cx: 330, cy: 238, label: "震动传感" },
          ] : [
            { cx: 240, cy: 380, label: "Trunk Sensor" },
            { cx: 175, cy: 310, label: "Stress Node A" },
            { cx: 305, cy: 308, label: "Stress Node B" },
            { cx: 155, cy: 240, label: "Tilt Sensor" },
            { cx: 330, cy: 238, label: "Vibration Sensor" },
          ])].map(({ cx, cy, label }, i) => (
            <g key={label} opacity={phase >= 3 ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${i * 0.12}s` }}>
              <circle cx={cx} cy={cy} r="5" fill={C.fog} opacity="0.85" />
              <circle cx={cx} cy={cy} r="9" fill="none" stroke={C.fog} strokeWidth="0.8" opacity="0.4" />
              <line x1={cx} y1={cy} x2={cx + (cx < 240 ? -28 : 28)} y2={cy - 12}
                stroke={C.fog} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
              <text x={cx + (cx < 240 ? -34 : 34)} y={cy - 14}
                fontFamily={FM} fontSize="8" fill={C.fog} opacity="0.7"
                textAnchor={cx < 240 ? "end" : "start"}>{label}</text>
            </g>
          ))}
        </g>
      )}
      {phase >= 4 && (
        <g opacity="0.45" stroke={C.fog} strokeWidth="0.7">
          <line x1="28" y1="160" x2="36" y2="160" />
          <line x1="28" y1="420" x2="36" y2="420" />
          <line x1="32" y1="160" x2="32" y2="420" strokeDasharray="4 3" />
          <text x="14" y="295" fontFamily={FM} fontSize="8" fill={C.fog} transform="rotate(-90,14,295)" textAnchor="middle">H = 6.2m</text>
          <line x1="145" y1="510" x2="335" y2="510" strokeDasharray="4 3" />
          <line x1="145" y1="505" x2="145" y2="515" />
          <line x1="335" y1="505" x2="335" y2="515" />
          <text x="240" y="524" fontFamily={FM} fontSize="8" fill={C.fog} textAnchor="middle">{lang === "zh" ? "根幅 = 3.8m" : "Root Spread = 3.8m"}</text>
          <text x="52" y="30" fontFamily={FM} fontSize="9" fill={C.fog} opacity="0.6">AG-2024-01</text>
          <text x="380" y="30" fontFamily={FM} fontSize="9" fill={C.fog} opacity="0.6">SCALE 1:50</text>
        </g>
      )}
    </svg>
  );
}

// ── 保护系统爆炸图 SVG ────────────────────────────────────────────────
function ExplodedSVG() {
  const { lang } = useLanguage();
  return (
    <svg viewBox="0 0 400 340" style={{ width: "100%", display: "block" }}>
      <line x1="60" y1="295" x2="340" y2="295" stroke={C.ink} strokeWidth="1" opacity="0.2" />
      <rect x="60" y="295" width="280" height="30" fill="rgba(180,160,130,0.15)" stroke={C.fog} strokeWidth="0.5" strokeDasharray="4 3" opacity="0.5" />
      <text x="200" y="312" fontFamily={FM} fontSize="8" fill={C.gray} textAnchor="middle">{lang === "zh" ? "土壤锚固层" : "Soil Anchor Layer"}</text>
      {[[-60, 30], [60, 30], [-40, 0], [40, 0]].map(([dx, dy], i) => (
        <line key={i} x1={200} y1={295} x2={200 + dx} y2={295 - dy}
          stroke={C.fog} strokeWidth="2.5" opacity="0.65" />
      ))}
      <line x1="200" y1="295" x2="200" y2="130" stroke={C.fog} strokeWidth="3" opacity="0.6" />
      <rect x="193" y="140" width="14" height="155" rx="3" fill="#D4C8B4" stroke={C.ink} strokeWidth="0.8" opacity="0.7" />
      {[160, 195, 228, 260].map((y, i) => (
        <ellipse key={i} cx="200" cy={y} rx={22 + i * 4} ry="6"
          fill="none" stroke={C.fog} strokeWidth="1.2" opacity="0.45" strokeDasharray="3 2" />
      ))}
      {[-1, 0, 1].map((off) => (
        <line key={off} x1={200 + off * 12} y1={155} x2={200 + off * 18} y2={268}
          stroke={C.fog} strokeWidth="0.8" opacity="0.35" strokeDasharray="4 3" />
      ))}
      {[[200, 170], [178, 210], [222, 230]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill={C.fog} opacity="0.8" />
          <circle cx={cx} cy={cy} r="9" fill="none" stroke={C.fog} strokeWidth="0.6" opacity="0.3" />
        </g>
      ))}
      <ellipse cx="200" cy="125" rx="50" ry="38" fill="rgba(180,210,150,0.4)" stroke={C.ink} strokeWidth="0.8" opacity="0.7" />
      <ellipse cx="200" cy="100" rx="36" ry="28" fill="rgba(180,210,150,0.5)" />
      {[
        ...(lang === "zh" ? [
          { x: 120, y: 155, label: "①柔性防护网" },
          { x: 120, y: 200, label: "②智能节点" },
          { x: 120, y: 250, label: "③锚固骨架" },
          { x: 276, y: 145, label: "④太阳能板" },
          { x: 276, y: 185, label: "⑤传感阵列" },
        ] : [
          { x: 120, y: 155, label: "①Flex Net" },
          { x: 120, y: 200, label: "②Smart Node" },
          { x: 120, y: 250, label: "③Anchor Frame" },
          { x: 276, y: 145, label: "④Solar Panel" },
          { x: 276, y: 185, label: "⑤Sensor Array" },
        ])].map(({ x, y, label }) => (
        <g key={label}>
          <line x1={x < 200 ? x + 48 : x - 20} y1={y} x2={x < 200 ? x + 56 : x - 28} y2={y}
            stroke={C.fog} strokeWidth="0.6" opacity="0.4" />
          <text x={x} y={y + 3} fontFamily={FM} fontSize="8" fill={C.ink}
            textAnchor={x < 200 ? "end" : "start"} opacity="0.8">{label}</text>
        </g>
      ))}
      <rect x="208" y="128" width="14" height="8" rx="1" fill={C.fog} opacity="0.5" />
    </svg>
  );
}

// ═════════════════════════════════════════════════════════════════════
// 主组件
// ═════════════════════════════════════════════════════════════════════
export default function ArborGuardianPage({ onBack }: { onBack: () => void }) {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const ts = [300, 700, 1100, 1600].map((t, i) => setTimeout(() => setPhase(i + 1), t));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FB, color: C.ink }}>
      <style>{`
        .ag-card { transition: border-color 0.3s, box-shadow 0.3s; }
        .ag-card:hover { border-color: rgba(71,118,172,0.45) !important; box-shadow: 0 4px 20px rgba(71,118,172,0.08); }
        @keyframes scanLine { 0% { top: -2px; } 100% { top: 102%; } }
      `}</style>

      <AnchorNav />

      <button onClick={onBack} style={{
        position: "fixed", top: "72px", left: "24px", zIndex: 45,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
        border: `1px solid ${C.fogBorder}`,
        padding: "8px 16px",
        fontFamily: FM, fontSize: "0.62rem", letterSpacing: "0.12em",
        color: C.fog, cursor: "pointer",
      }}>
        {lang === "zh" ? "← 返回项目" : "← Back"}
      </button>

      {/* ═══════════ 01 · Hero ═══════════ */}
      <section id="s-hero" style={{
        position: "relative", minHeight: "100vh",
        background: "linear-gradient(150deg, #EDF1F8 0%, #D8E4F0 55%, #C8D8E8 100%)",
        overflow: "hidden", display: "flex", alignItems: "center",
        paddingTop: "72px", scrollMarginTop: "72px",
      }}>
        <EngrGrid opacity={0.55} />
        {phase >= 2 && (
          <div style={{
            position: "absolute", left: 0, right: 0, height: "1px",
            background: `linear-gradient(to right, transparent, ${C.fog} 45%, transparent)`,
            animation: "scanLine 1.4s ease-out forwards",
            zIndex: 3, pointerEvents: "none",
          }} />
        )}

        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "0 48px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px",
          alignItems: "center", position: "relative", zIndex: 4, width: "100%",
        }}>
          <div>
            <motion.div
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : -8 }}
              transition={{ duration: 0.5 }} style={{ marginBottom: "20px" }}>
              <span style={{
                fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.25em",
                color: C.fog, padding: "4px 12px",
                border: `1px solid ${C.fogBorder}`,
                background: "rgba(255,255,255,0.7)",
              }}>{lang === "zh" ? "AG-2024 · 工业设计 · 生态科技" : "AG-2024 · INDUSTRIAL DESIGN · ECOTECH"}</span>
            </motion.div>

            <motion.div animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 28 }}
              transition={{ duration: 0.8, delay: 0.06 }}>
              <h1 style={{
                fontFamily: FB, fontWeight: 700,
                fontSize: "clamp(3rem, 7vw, 6rem)",
                color: C.ink, lineHeight: 1.0,
                letterSpacing: "-0.03em", margin: 0,
              }}>
                Arbor<br /><span style={{ color: C.fog }}>Guardian</span>
              </h1>
              <p style={{ fontFamily: FM, fontSize: "1rem", color: C.ink, margin: "10px 0 0", letterSpacing: "0.06em", opacity: 0.6 }}>
                {lang === "zh" ? "树木守护者" : "Tree Guardian"}
              </p>
            </motion.div>

            <motion.p animate={{ opacity: phase >= 4 ? 0.7 : 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{ fontFamily: FB, fontSize: "0.88rem", color: C.ink, lineHeight: 1.8, marginTop: "18px", maxWidth: "440px" }}>
              {lang === "zh" ? "极端气候环境下的智能树木保护系统设计" : "Intelligent Tree Protection System Design for Extreme Climate Conditions"}
            </motion.p>

            <motion.div animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "22px" }}>
              {(lang === "zh"
                ? ["工业设计", "智能硬件", "生态科技", "可持续设计", "智慧城市"]
                : ["Industrial Design", "Smart Hardware", "Eco-Tech", "Sustainable Design", "Smart City"]
              ).map((t, i) => {
                const isHighlight = i === 2;
                return (
                  <span key={i} style={{
                    fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.1em",
                    padding: "4px 12px",
                    border: `1px solid ${isHighlight ? C.fog : C.fogBorder}`,
                    color: isHighlight ? C.fog : C.gray,
                    background: isHighlight ? "rgba(71,118,172,0.08)" : "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(4px)",
                  }}>{t}</span>
                );
              })}
            </motion.div>

            <motion.p animate={{ opacity: phase >= 4 ? 0.62 : 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              style={{ fontFamily: FB, fontSize: "0.82rem", color: C.ink, lineHeight: 1.8, marginTop: "26px", maxWidth: "460px" }}>
              {lang === "zh"
                ? "通过仿生支撑结构、环境传感技术以及数字化监测平台，为城市树木提供主动保护能力，实时监测健康状态，并在极端气候条件下提升树木的稳定性与生存能力。"
                : "Through biomimetic support structures, environmental sensing technology, and a digital monitoring platform, ArborGuardian provides active protection for urban trees — monitoring health in real time and enhancing stability and resilience under extreme climate conditions."}
            </motion.p>
          </div>

          <div style={{ position: "relative" }}>
            <motion.div animate={{ opacity: phase >= 2 ? 1 : 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
              <TreeSVG phase={phase} />
            </motion.div>
            <motion.div animate={{ opacity: phase >= 4 ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.7 }}
              style={{
                position: "absolute", bottom: "8px", right: "8px",
                padding: "6px 12px",
                background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)",
                border: `1px solid ${C.fogBorder}`,
                fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.12em", color: C.fog,
              }}>
              REF: AG-STRUCT-001 · SCALE 1:50
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ opacity: phase >= 4 ? 0.45 : 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
            fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.2em", color: C.ink,
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          }}>
          <span>{lang === "zh" ? "向下探索" : "Explore"}</span>
          <div style={{ width: "1px", height: "28px", background: `linear-gradient(to bottom, ${C.fog}, transparent)` }} />
        </motion.div>
      </section>

      {/* ═══════════ 02 · 气候问题研究 ═══════════ */}
      <Section id="s-climate" alt>
        <SHead num="02" zh={lang === "zh" ? "气候问题研究" : "Climate Research"} />
        <div style={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <div>
              <p style={{ fontFamily: FB, fontSize: "0.9rem", color: C.gray, lineHeight: 1.8, marginBottom: "28px" }}>
                {lang === "zh"
                  ? "全球气候变化加速了热带气旋的强度升级，城市树木面临的极端风载荷威胁持续增大。2023年台风「杜苏芮」登陆中国东南沿海，造成沿海城市数以万计的树木倒伏，生态系统受损严重。"
                  : "Global climate change is accelerating the intensification of tropical cyclones, posing growing extreme wind load threats to urban trees. In 2023, Typhoon Doksuri made landfall on China's southeastern coast, toppling tens of thousands of trees in coastal cities and causing severe damage to local ecosystems."}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
                <Stat label={lang === "zh" ? "强台风强度增幅" : "INTENSE TYPHOON INCREASE"} value="+25%" sub={lang === "zh" ? "近50年全球热带气旋强度变化" : "Global tropical cyclone intensity change over 50 years"} />
                <Stat label={lang === "zh" ? "年均登陆次数" : "AVG. ANNUAL LANDFALLS"} value="7–9" unit={lang === "zh" ? "次" : "/yr"} sub={lang === "zh" ? "中国沿海城市年均台风频率" : "Average typhoon frequency for Chinese coastal cities"} />
                <Stat label={lang === "zh" ? "城市树木损失率" : "URBAN TREE DAMAGE RATE"} value="30–65%" sub={lang === "zh" ? "强台风过境后受损比例" : "Proportion damaged after a severe typhoon"} />
              </div>

              {/* 台风级别影响表 — 来自设计资料真实数据 */}
              <div style={{ border: `1px solid ${C.fogBorder}`, background: C.bg }}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.fogBorder}`, display: "grid", gridTemplateColumns: "1fr 120px 1fr 1fr", gap: "12px" }}>
                  {(lang === "zh"
                    ? ["热带气旋类型", "最大风速 (m/s)", "树木症状", "影响级别"]
                    : ["Cyclone Type", "Max Wind (m/s)", "Tree Symptoms", "Impact Level"]
                  ).map((h) => (
                    <span key={h} style={{ fontFamily: FM, fontSize: "0.52rem", letterSpacing: "0.1em", color: C.fog }}>{h}</span>
                  ))}
                </div>
                {(lang === "zh" ? [
                  { type: "热带低压 TD", speed: "10.8–17.1", symptom: "枝叶轻微弯曲", level: "轻微影响", color: "#A8D8A0" },
                  { type: "热带风暴 TS", speed: "17.2–32.6", symptom: "整树振动，大量落叶", level: "中度影响", color: "#F0D080" },
                  { type: "强热带风暴 STS", speed: "24.5–32.6", symptom: "小枝折断，嫩枝损伤", level: "严重破坏", color: "#F0A860" },
                  { type: "台风 TY", speed: "32.7–41.4", symptom: "大多数树木倒伏", level: "灾难性损毁", color: "#E08060" },
                  { type: "强台风 STY", speed: "41.5–50.9", symptom: "大多数树木连根拔起", level: "毁灭性破坏", color: "#D06050" },
                  { type: "超强台风 SuperTY", speed: "≥51.0", speed2: true, symptom: "树木全毁或树干折断", level: "毁灭性破坏", color: "#C03030" },
                ] : [
                  { type: "Tropical Depression TD", speed: "10.8–17.1", symptom: "Minor branch bending", level: "Minor Impact", color: "#A8D8A0" },
                  { type: "Tropical Storm TS", speed: "17.2–32.6", symptom: "Whole-tree vibration, heavy leaf loss", level: "Moderate Impact", color: "#F0D080" },
                  { type: "Severe Tropical Storm STS", speed: "24.5–32.6", symptom: "Small branch breakage, twig damage", level: "Severe Damage", color: "#F0A860" },
                  { type: "Typhoon TY", speed: "32.7–41.4", symptom: "Most trees toppled", level: "Catastrophic Loss", color: "#E08060" },
                  { type: "Severe Typhoon STY", speed: "41.5–50.9", symptom: "Most trees uprooted", level: "Devastating Damage", color: "#D06050" },
                  { type: "Super Typhoon SuperTY", speed: "≥51.0", speed2: true, symptom: "Complete destruction or trunk fracture", level: "Devastating Damage", color: "#C03030" },
                ]).map(({ type, speed, symptom, level, color }) => (
                  <div key={type} style={{ padding: "10px 20px", borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "1fr 120px 1fr 1fr", gap: "12px", alignItems: "center" }}>
                    <span style={{ fontFamily: FM, fontSize: "0.7rem", color: C.ink }}>{type}</span>
                    <span style={{ fontFamily: FM, fontSize: "0.7rem", color: C.fog }}>{speed}</span>
                    <span style={{ fontFamily: FB, fontSize: "0.72rem", color: C.gray }}>{symptom}</span>
                    <span style={{ fontFamily: FM, fontSize: "0.62rem", color: color, padding: "2px 8px", background: `${color}18`, display: "inline-block" }}>{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* 杜苏芮台风路径图 SVG */}
              <div style={{ border: `1px solid ${C.fogBorder}`, padding: "20px", background: C.bg }}>
                <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.18em", color: C.fog, marginBottom: "14px" }}>
                  {lang === "zh" ? "台风「杜苏芮」路径 · 2023.7.21—7.30" : "Typhoon Doksuri Track · 2023.7.21–7.30"}
                </p>
                <svg viewBox="0 0 440 240" style={{ width: "100%", display: "block" }}>
                  <path d="M 60,20 Q 100,30 140,40 Q 180,50 200,80 Q 220,110 230,140 Q 240,165 250,180 Q 260,195 270,210"
                    fill="none" stroke={C.ink} strokeWidth="1.5" opacity="0.2" />
                  <path d="M 380,180 Q 340,160 300,130 Q 260,100 230,80 Q 200,58 170,52"
                    fill="none" stroke={C.fog} strokeWidth="2" strokeDasharray="6 3" opacity="0.7" />
                  {[
                    { x: 360, y: 176, cat: "Cat 6", date: "7.30" },
                    { x: 308, y: 138, cat: "Cat 7", date: "7.29" },
                    { x: 264, y: 106, cat: "Cat 11", date: "7.28" },
                    { x: 196, y: 64, cat: "Cat 10", date: "7.27" },
                  ].map(({ x, y, cat, date }) => (
                    <g key={date}>
                      <circle cx={x} cy={y} r="6" fill={C.fog} opacity="0.7" />
                      <circle cx={x} cy={y} r="12" fill="none" stroke={C.fog} strokeWidth="0.6" opacity="0.3" />
                      <text x={x} y={y - 16} fontFamily={FM} fontSize="8" fill={C.fog} textAnchor="middle" opacity="0.8">{date}</text>
                      <text x={x} y={y - 6} fontFamily={FM} fontSize="7" fill={C.fog} textAnchor="middle" opacity="0.6">{cat}</text>
                    </g>
                  ))}
                  {(lang === "zh" ? [["福州", 228, 78], ["广州", 180, 170], ["厦门", 240, 120]] : [["Fuzhou", 228, 78], ["Guangzhou", 180, 170], ["Xiamen", 240, 120]]).map(([city, x, y]) => (
                    <g key={city as string}>
                      <circle cx={x as number} cy={y as number} r="3" fill="rgba(200,80,80,0.6)" />
                      <text x={(x as number) + 8} y={(y as number) + 4} fontFamily={FM} fontSize="8" fill={C.ink} opacity="0.5">{city as string}</text>
                    </g>
                  ))}
                  <text x="380" y="16" fontFamily={FM} fontSize="8" fill={C.fog} textAnchor="end" opacity="0.6">{lang === "zh" ? "中国沿海 · 台风路径分析" : "China Coast · Typhoon Track Analysis"}</text>
                </svg>
              </div>
              {/* 风洞实验设备照片 */}
              <div style={{ border: `1px solid ${C.fogBorder}`, background: C.bg, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img src={imgEquip} alt="静力拉伸测试与风洞实验设备" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(20,24,32,0.85), transparent)",
                    padding: "16px",
                  }}>
                    <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.15em", color: "#fff", margin: 0 }}>
                      {lang === "zh" ? "风洞实验 · 树木静力拉伸测试装置" : "Wind Tunnel Test · Static Pull Test Apparatus"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════ 03 · 现有保护方式分析 ═══════════ */}
      <Section id="s-existing">
        <SHead num="03" zh={lang === "zh" ? "现有保护方式分析" : "Existing Protection Analysis"} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          <Reveal>
            <div>
              <p style={{ fontFamily: FB, fontSize: "0.9rem", color: C.gray, lineHeight: 1.8, marginBottom: "24px" }}>
                {lang === "zh"
                  ? "现有城市树木保护方式以被动固定为主，缺乏主动感知与动态响应能力。传统木桩、钢缆等方式在超强台风（>51m/s）面前几乎失效，且对树木本身造成额外损伤。"
                  : "Existing urban tree protection relies primarily on passive restraint and lacks active sensing or dynamic response capability. Traditional stakes and steel cables are nearly ineffective against super typhoons (>51 m/s) and cause additional harm to the trees themselves."}
              </p>
              {/* 树木插图 */}
              <div style={{ border: `1px solid ${C.fogBorder}`, overflow: "hidden", position: "relative" }}>
                <img src={imgTree} alt={lang === "zh" ? "树木形态与根系分析图" : "Tree morphology and root system analysis"} style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "380px" }} />
                <div style={{
                  position: "absolute", top: "12px", left: "12px",
                  padding: "4px 10px", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(6px)",
                  border: `1px solid ${C.fogBorder}`,
                  fontFamily: FM, fontSize: "0.54rem", letterSpacing: "0.12em", color: C.fog,
                }}>
                  {lang === "zh" ? "树木形态分析 · 根冠比" : "Tree Morphology Analysis · Root-Crown Ratio"}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              {/* 各种极端环境照片 */}
              <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.18em", color: C.fog, marginBottom: "14px" }}>
                {lang === "zh" ? "城市树木面临的极端环境威胁" : "Extreme Environmental Threats to Urban Trees"}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {(lang === "zh" ? [
                  { img: imgSandstorm, label: "沙尘暴" },
                  { img: imgFire, label: "干旱与火灾" },
                  { img: imgEarth, label: "地震与洪涝" },
                  { img: imgWinter, label: "低温冰雪" },
                ] : [
                  { img: imgSandstorm, label: "Sandstorm" },
                  { img: imgFire, label: "Drought & Fire" },
                  { img: imgEarth, label: "Earthquake & Flood" },
                  { img: imgWinter, label: "Frost & Ice" },
                ]).map(({ img, label }) => (
                  <div key={label} style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
                    <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "linear-gradient(to top, rgba(20,24,32,0.75), transparent)",
                      padding: "8px 10px",
                    }}>
                      <span style={{ fontFamily: FM, fontSize: "0.56rem", color: "#fff", letterSpacing: "0.1em" }}>{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 4种保护方法照片网格 */}
        <Reveal>
          <div>
            <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.18em", color: C.fog, marginBottom: "16px" }}>
              {lang === "zh" ? "现有树木保护措施 · 四种主要方式" : "Existing Tree Protection Methods · Four Main Approaches"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
              {(lang === "zh" ? [
                { img: imgMethod1, label: "钢缆张拉" },
                { img: imgMethod2, label: "树穴格栅" },
                { img: imgMethod3, label: "树干涂白" },
                { img: imgMethod4, label: "木桩/金属支架" },
              ] : [
                { img: imgMethod1, label: "Steel Cable Bracing" },
                { img: imgMethod2, label: "Tree Pit Grating" },
                { img: imgMethod3, label: "Trunk Whitewashing" },
                { img: imgMethod4, label: "Stakes / Metal Frames" },
              ]).map(({ img, label }) => (
                <div key={label} className="ag-card" style={{ border: `1px solid ${C.border}`, overflow: "hidden" }}>
                  <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                    <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "linear-gradient(to top, rgba(20,24,32,0.8), transparent)",
                      padding: "12px 14px",
                    }}>
                      <span style={{ fontFamily: FM, fontSize: "0.6rem", color: "#fff", letterSpacing: "0.1em" }}>{label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 核心矛盾 */}
            <div style={{ marginTop: "24px", padding: "20px 24px", background: C.ink, position: "relative", overflow: "hidden" }}>
              <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.2em", color: C.fog, marginBottom: "10px" }}>{lang === "zh" ? "核心设计矛盾" : "CORE DESIGN TENSION"}</p>
              <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.2rem", color: "#fff", lineHeight: 1.5, margin: 0 }}>
                {lang === "zh" ? "\"树木需要主动保护，而现有方式只能被动束缚\"" : "\"Trees need active protection — existing methods only offer passive restraint\""}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ═══════════ 04 · 设计概念 ═══════════ */}
      <Section id="s-concept" alt>
        <SHead num="04" zh={lang === "zh" ? "设计概念" : "Design Concept"} />
        <Reveal>
          <div style={{
            padding: "36px 48px", marginBottom: "48px",
            background: C.ink, position: "relative", overflow: "hidden",
          }}>
            <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12, pointerEvents: "none" }}>
              <defs><pattern id="g-dk2" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={C.fog} strokeWidth="0.5" />
              </pattern></defs>
              <rect width="100%" height="100%" fill="url(#g-dk2)" />
            </svg>
            <p style={{
              fontFamily: FO, fontStyle: "italic",
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              color: "#FFFFFF", lineHeight: 1.3, margin: 0, position: "relative", zIndex: 1,
            }}>
              {lang === "zh" ? "\"让树木拥有主动防御能力\"" : "\"Give trees the power to actively defend themselves\""}
            </p>
            <p style={{ fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.18em", color: C.fog, marginTop: "12px", position: "relative", zIndex: 1 }}>
              {lang === "zh" ? "设计目标 · DESIGN TARGET · AG-2024" : "DESIGN TARGET · AG-2024"}
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {(lang === "zh" ? [
                { word: "仿生", desc: "从自然汲取结构智慧，模拟根系锚固与柔性茎干力学原理，形成双层防护体系。" },
                { word: "适应", desc: "根据风速、降雨、气温等环境参数实时动态调整防护强度与支撑角度。" },
                { word: "感知", desc: "多维传感阵列持续采集树木倾斜、土壤湿度、震动频率等六大生命体征。" },
                { word: "保护", desc: "从单株到区域建立生态防护网络，守护城市绿色资产安全运营。" },
              ] : [
                { word: "Biomimicry", desc: "Drawing structural wisdom from nature — mimicking root anchoring and flexible stem mechanics to form a two-layer protection system." },
                { word: "Adaptation", desc: "Dynamically adjusting protection strength and support angle in real time based on wind speed, rainfall, and temperature." },
                { word: "Sensing", desc: "A multi-dimensional sensor array continuously captures six vital signs — including trunk tilt, soil moisture, and vibration frequency." },
                { word: "Protection", desc: "Building an ecological protection network from individual trees to entire districts, safeguarding urban green assets." },
              ]).map(({ word, desc }) => (
                <div key={word} className="ag-card" style={{ padding: "20px", border: `1px solid ${C.fogBorder}`, background: C.bg }}>
                  <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "2rem", color: C.fog, margin: "0 0 10px", lineHeight: 1 }}>{word}</p>
                  <p style={{ fontFamily: FB, fontSize: "0.75rem", color: C.gray, margin: 0, lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* 真实头脑风暴板 A */}
              <div style={{ border: `1px solid ${C.fogBorder}`, overflow: "hidden", position: "relative" }}>
                <img src={imgBrainA} alt={lang === "zh" ? "设计头脑风暴关键词板 A" : "Design brainstorming board A"} style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "200px" }} />
                <div style={{ position: "absolute", top: "10px", left: "10px", padding: "3px 10px", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(6px)", border: `1px solid ${C.fogBorder}` }}>
                  <span style={{ fontFamily: FM, fontSize: "0.52rem", letterSpacing: "0.12em", color: C.fog }}>{lang === "zh" ? "设计发散 · BRAINSTORMING" : "BRAINSTORMING"}</span>
                </div>
              </div>
              {/* 真实头脑风暴板 B */}
              <div style={{ border: `1px solid ${C.fogBorder}`, overflow: "hidden", position: "relative" }}>
                <img src={imgBrainB} alt={lang === "zh" ? "设计头脑风暴关键词板 B" : "Design brainstorming board B"} style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "200px" }} />
                <div style={{ position: "absolute", top: "10px", left: "10px", padding: "3px 10px", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(6px)", border: `1px solid ${C.fogBorder}` }}>
                  <span style={{ fontFamily: FM, fontSize: "0.52rem", letterSpacing: "0.12em", color: C.fog }}>{lang === "zh" ? "概念聚焦 · CONCEPT FOCUS" : "CONCEPT FOCUS"}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════ 05 · 仿生结构设计 ═══════════ */}
      <Section id="s-structure">
        <SHead num="05" zh={lang === "zh" ? "仿生结构设计" : "Biomimetic Structure Design"} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <div>
              <p style={{ fontFamily: FB, fontSize: "0.9rem", color: C.gray, lineHeight: 1.8, marginBottom: "28px" }}>
                {lang === "zh"
                  ? "结构设计从植物根系锚固机制与藤蔓柔性适应形变中汲取灵感。内部刚性铝合金骨架深入土层提供抗拉抗压支撑，外部菌丝复合纤维网随树干摆动自适应形变，分散冲击载荷超过40%。"
                  : "The structural design draws inspiration from plant root anchoring mechanisms and the flexible adaptive deformation of vines. An inner rigid aluminum alloy frame anchors deep into the soil for tensile and compressive support, while an outer mycelium composite fiber net adapts to trunk sway and disperses impact loads by over 40%."}
              </p>
              <div style={{ border: `1px solid ${C.fogBorder}`, background: C.bgAlt, padding: "20px" }}>
                <p style={{ fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.18em", color: C.fog, marginBottom: "14px" }}>
                  {lang === "zh" ? "系统结构爆炸图 · AG-STRUCTURE-002" : "System Exploded View · AG-STRUCTURE-002"}
                </p>
                <ExplodedSVG />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {(lang === "zh" ? [
                { num: "①", title: "铝合金锚固骨架", desc: "模拟根系向四周扩展的锚固形态，可深入土层1.5m固定，提供主要抗拉抗压支撑。", spec: "抗风: ≥51 m/s · 6061-T6 航空级铝合金" },
                { num: "②", title: "菌丝复合防护网", desc: "仿藤蔓形变机制编织而成，可随树干摆动自适应形变，分散冲击载荷。", spec: "载荷分散率: >40% · 生物降解周期: 6–12月" },
                { num: "③", title: "记忆合金缓冲节点", desc: "关键连接点采用Ni-Ti记忆合金阻尼节点，强风时提供额外能量耗散，防止共振破坏。", spec: "恢复应变: 8% · 阻尼系数: 0.12–0.18" },
                { num: "④", title: "太阳能自供电模块", desc: "柔性太阳能薄膜集成于防护网外层，为传感器和通信节点持续供电，免维护运行。", spec: "输出: 5W · 储能: 12Ah · 续航: 6个月+" },
              ] : [
                { num: "①", title: "Aluminum Alloy Anchor Frame", desc: "Mimics the radial anchoring form of root systems; anchors 1.5 m into the soil to provide primary tensile and compressive support.", spec: "Wind resistance: ≥51 m/s · 6061-T6 aerospace-grade aluminum" },
                { num: "②", title: "Mycelium Composite Protection Net", desc: "Woven using a vine-deformation mechanism; adapts to trunk sway and disperses impact loads.", spec: "Load dispersion: >40% · Biodegradation period: 6–12 months" },
                { num: "③", title: "Shape-Memory Alloy Damping Nodes", desc: "Ni-Ti shape-memory alloy damping nodes at key joints provide additional energy dissipation in high winds, preventing resonance failure.", spec: "Recovery strain: 8% · Damping coefficient: 0.12–0.18" },
                { num: "④", title: "Solar Self-Powered Module", desc: "Flexible solar thin-film integrated into the outer protective net continuously powers sensors and communication nodes — maintenance-free.", spec: "Output: 5W · Storage: 12Ah · Autonomy: 6+ months" },
              ]).map(({ num, title, desc, spec }) => (
                <div key={num} className="ag-card" style={{ padding: "18px 20px", border: `1px solid ${C.border}`, background: C.bg }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <span style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.5rem", color: C.fog, lineHeight: 1 }}>{num}</span>
                    <p style={{ fontFamily: FB, fontWeight: 600, fontSize: "0.88rem", color: C.ink, margin: 0 }}>{title}</p>
                  </div>
                  <p style={{ fontFamily: FB, fontSize: "0.76rem", color: C.gray, lineHeight: 1.65, margin: "0 0 8px" }}>{desc}</p>
                  <p style={{ fontFamily: FM, fontSize: "0.58rem", letterSpacing: "0.08em", color: C.fog, margin: 0 }}>{spec}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════ 06 · 智能监测系统 ═══════════ */}
      <Section id="s-monitor" alt>
        <SHead num="06" zh={lang === "zh" ? "智能监测系统" : "Intelligent Monitoring System"} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <div>
              {/* 传感器设备照片 */}
              <div style={{ border: `1px solid ${C.fogBorder}`, overflow: "hidden", marginBottom: "20px", position: "relative" }}>
                <img src={imgSensor} alt="条件监测装置传感器系统" style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "320px" }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(to top, rgba(20,24,32,0.85), transparent)",
                  padding: "20px",
                }}>
                  <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.15em", color: "#fff", margin: 0 }}>
                    {lang === "zh" ? "条件监测装置 · 传感器阵列系统" : "Condition Monitoring Device · Sensor Array System"}
                  </p>
                </div>
              </div>
              {/* 数据流程图 */}
              <div style={{ border: `1px solid ${C.fogBorder}`, background: C.bg, padding: "16px" }}>
                <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.12em", color: C.fog, marginBottom: "12px" }}>
                  {lang === "zh" ? "数据采集 → 边缘计算 → 云端分析 流程" : "Data Collection → Edge Computing → Cloud Analysis Pipeline"}
                </p>
                <svg viewBox="0 0 360 90" style={{ width: "100%", display: "block" }}>
                  <defs>
                    <marker id="arrF" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                      <path d="M0,0 L5,2.5 L0,5 Z" fill={C.fog} opacity="0.7" />
                    </marker>
                  </defs>
                  {(lang === "zh" ? [
                    { x: 40, label: "传感器阵列", sub: "500ms 采集" },
                    { x: 130, label: "边缘节点", sub: "本地预处理" },
                    { x: 222, label: "云端平台", sub: "AI 分析" },
                    { x: 310, label: "预警/调度", sub: "6h 预判" },
                  ] : [
                    { x: 40, label: "Sensor Array", sub: "500ms interval" },
                    { x: 130, label: "Edge Node", sub: "Local processing" },
                    { x: 222, label: "Cloud Platform", sub: "AI analysis" },
                    { x: 310, label: "Alert / Dispatch", sub: "6h forecast" },
                  ]).map(({ x, label, sub }, i) => (
                    <g key={label}>
                      <rect x={x - 38} y="25" width="76" height="36" rx="4" fill="rgba(71,118,172,0.08)" stroke={C.fogBorder} strokeWidth="0.8" />
                      <text x={x} y="46" fontFamily={FM} fontSize="8" fill={C.ink} textAnchor="middle">{label}</text>
                      <text x={x} y="56" fontFamily={FM} fontSize="6.5" fill={C.fog} textAnchor="middle">{sub}</text>
                      {i < 3 && <line x1={x + 38} y1="43" x2={x + 54} y2="43" stroke={C.fog} strokeWidth="1" opacity="0.5" markerEnd="url(#arrF)" />}
                    </g>
                  ))}
                  {["LoRa 500ms", "4G/WiFi", "HTTPS"].map((t, i) => (
                    <text key={t} x={85 + i * 92} y="18" fontFamily={FM} fontSize="7" fill={C.gray} textAnchor="middle" opacity="0.7">{t}</text>
                  ))}
                </svg>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.18em", color: C.fog, marginBottom: "8px" }}>
                {lang === "zh" ? "传感器类型与监测参数" : "Sensor Types & Monitoring Parameters"}
              </p>
              {(lang === "zh" ? [
                { icon: "⊕", name: "惯性传感单元", param: "树干三轴加速度监测", range: "±16g / 12bit" },
                { icon: "⊗", name: "土壤湿度传感器", param: "根系水分实时感知", range: "0–100% / ±2%" },
                { icon: "⊘", name: "气体探测器", param: "空气质量全面监测", range: "CO₂/VOC/PM2.5" },
                { icon: "⊙", name: "振动传感器", param: "摆动幅度精密采集", range: "±0.1° 精度" },
              ] : [
                { icon: "⊕", name: "Inertial Measurement Unit", param: "Trunk tri-axial acceleration monitoring", range: "±16g / 12bit" },
                { icon: "⊗", name: "Soil Moisture Sensor", param: "Root zone moisture real-time sensing", range: "0–100% / ±2%" },
                { icon: "⊘", name: "Gas Detector", param: "Comprehensive air quality monitoring", range: "CO₂/VOC/PM2.5" },
                { icon: "⊙", name: "Vibration Sensor", param: "Precise sway amplitude capture", range: "±0.1° accuracy" },
              ]).map(({ icon, name, param, range }) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", border: `1px solid ${C.border}`, background: C.bg }}>
                  <span style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.2rem", color: C.fog, flexShrink: 0, lineHeight: 1 }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.82rem", color: C.ink, margin: 0 }}>{name}</p>
                    <p style={{ fontFamily: FM, fontSize: "0.57rem", color: C.gray, margin: "2px 0 0", letterSpacing: "0.05em" }}>{param}</p>
                  </div>
                  <span style={{ fontFamily: FM, fontSize: "0.54rem", color: C.fog, letterSpacing: "0.08em", flexShrink: 0 }}>{range}</span>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "8px" }}>
                <Stat label={lang === "zh" ? "传感精度" : "SENSING ACCURACY"} value="±0.1°" sub={lang === "zh" ? "树干倾斜实时监测" : "Trunk tilt real-time monitoring"} />
                <Stat label={lang === "zh" ? "系统响应" : "SYSTEM RESPONSE"} value="<50" unit="ms" sub={lang === "zh" ? "异常检测响应时间" : "Anomaly detection response time"} />
                <Stat label={lang === "zh" ? "电池续航" : "BATTERY LIFE"} value="6" unit={lang === "zh" ? "月+" : "mo+"} sub={lang === "zh" ? "太阳能自持供电" : "Solar self-powered operation"} />
                <Stat label={lang === "zh" ? "节点覆盖" : "NODE CAPACITY"} value="128" unit={lang === "zh" ? "株" : "trees"} sub={lang === "zh" ? "单平台最大管理容量" : "Max trees per platform"} />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════ 07 · 材料研究 ═══════════ */}
      <Section id="s-material">
        <SHead num="07" zh={lang === "zh" ? "材料研究" : "Material Research"} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start", marginBottom: "48px" }}>
          <Reveal>
            <div>
              <p style={{ fontFamily: FB, fontSize: "0.9rem", color: C.gray, lineHeight: 1.8, marginBottom: "24px" }}>
                {lang === "zh"
                  ? "核心材料创新在于引入菌丝复合材料（Mycelium Composites）作为柔性防护网主体。菌丝网络的天然多孔轻量结构可实现完全生物降解，在保护树木的同时对生态环境零残留、零污染。"
                  : "The core material innovation is the introduction of Mycelium Composites as the primary flexible protective net. The naturally porous, lightweight mycelium network is fully biodegradable — protecting trees while leaving zero residue or ecological pollution."}
              </p>
              {/* 材料对比表 — 来自设计真实数据 */}
              <div style={{ border: `1px solid ${C.fogBorder}`, background: C.bg }}>
                <p style={{ fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.18em", color: C.fog, padding: "14px 18px", borderBottom: `1px solid ${C.fogBorder}` }}>
                  {lang === "zh" ? "菌丝复合材料 vs 传统材料综合对比" : "Mycelium Composites vs. Traditional Materials — Comprehensive Comparison"}
                </p>
                {/* 表头 */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "8px 18px", borderBottom: `1px solid ${C.border}`, background: C.bgAlt }}>
                  {(lang === "zh"
                    ? ["材料属性", "菌丝复合", "聚合物复合", "石膏基", "水泥材料"]
                    : ["Property", "Mycelium", "Polymer Composite", "Gypsum-based", "Cement"]
                  ).map((h) => (
                    <span key={h} style={{ fontFamily: FM, fontSize: "0.52rem", letterSpacing: "0.06em", color: C.fog }}>{h}</span>
                  ))}
                </div>
                {(lang === "zh" ? [
                  { prop: "密度 (kg/m³)", vals: ["50–430", "1200–1500", "600–1100", "1800–2400"] },
                  { prop: "成本", vals: ["低", "中–高", "低–中", "低"] },
                  { prop: "抗压强度 (kPa)", vals: ["940 to 5 kN", "50–400", "10–700", "none"] },
                  { prop: "吸水率 (%)", vals: ["70–320", "低", "高", "中"] },
                  { prop: "可回收性", vals: ["完全降解", "部分回收", "难以回收", "难以回收"] },
                  { prop: "原材料", vals: ["菌丝+有机废料", "石化基聚合物", "矿物石膏", "水泥砂石"] },
                  { prop: "制造工艺", vals: ["模具培养生长", "聚合+发泡", "搅拌浇注", "搅拌浇注"] },
                ] : [
                  { prop: "Density (kg/m³)", vals: ["50–430", "1200–1500", "600–1100", "1800–2400"] },
                  { prop: "Cost", vals: ["Low", "Medium–High", "Low–Medium", "Low"] },
                  { prop: "Compressive Strength (kPa)", vals: ["940 to 5 kN", "50–400", "10–700", "none"] },
                  { prop: "Water Absorption (%)", vals: ["70–320", "Low", "High", "Medium"] },
                  { prop: "Recyclability", vals: ["Fully biodegradable", "Partially recyclable", "Hard to recycle", "Hard to recycle"] },
                  { prop: "Raw Materials", vals: ["Mycelium + organic waste", "Petroleum-based polymers", "Mineral gypsum", "Cement & aggregate"] },
                  { prop: "Manufacturing", vals: ["Mold cultivation & growth", "Polymerization + foaming", "Mix & cast", "Mix & cast"] },
                ]).map(({ prop, vals }) => (
                  <div key={prop} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "8px 18px", borderBottom: `1px solid ${C.border}`, alignItems: "center" }}>
                    <span style={{ fontFamily: FM, fontSize: "0.6rem", color: C.ink }}>{prop}</span>
                    {vals.map((v, i) => (
                      <span key={i} style={{ fontFamily: FM, fontSize: "0.58rem", color: i === 0 ? C.fog : C.gray, fontWeight: i === 0 ? 600 : 400 }}>{v}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p style={{ fontFamily: FM, fontSize: "0.55rem", letterSpacing: "0.18em", color: C.fog, marginBottom: "12px" }}>
                {lang === "zh" ? "菌丝体培养过程 · 实验记录" : "Mycelium Cultivation Process · Lab Records"}
              </p>
              {/* 6张培养过程照片 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "12px" }}>
                {[imgMat1, imgMat2, imgMat3, imgMat4, imgMat5, imgMat6].map((img, i) => (
                  <div key={i} style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                    <img src={img} alt={lang === "zh" ? `菌丝培养阶段 ${i + 1}` : `Mycelium cultivation stage ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", top: "6px", left: "6px", padding: "2px 6px", background: "rgba(20,24,32,0.65)", backdropFilter: "blur(4px)" }}>
                      <span style={{ fontFamily: FM, fontSize: "0.48rem", color: "#fff", letterSpacing: "0.1em" }}>D{(i + 1) * 2 - 1}–D{(i + 1) * 2}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* 最终成型照片 */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px" }}>
                {[imgFinal1, imgFinal2, imgFinal3, imgFinal4, imgFinal5].map((img, i) => (
                  <div key={i} style={{ aspectRatio: "1", overflow: "hidden" }}>
                    <img src={img} alt={lang === "zh" ? `材料成型样品 ${i + 1}` : `Formed material sample ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: FM, fontSize: "0.54rem", color: C.gray, marginTop: "8px", letterSpacing: "0.08em" }}>
                {lang === "zh"
                  ? "不同模具形态下的菌丝复合材料成型样品 · 碳排放较传统材料减少 68%"
                  : "Mycelium composite samples from various mold geometries · 68% lower carbon footprint vs. traditional materials"}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ═══════════ 08 · 原型制作 ═══════════ */}
      <Section id="s-proto" alt>
        <SHead num="08" zh={lang === "zh" ? "原型制作" : "Prototyping"} />
        <Reveal>
          <p style={{ fontFamily: FB, fontSize: "0.9rem", color: C.gray, lineHeight: 1.8, marginBottom: "40px", maxWidth: "680px" }}>
            {lang === "zh"
            ? "从概念草图到实体原型，历经三轮迭代优化。第一次试验验证锚固骨架可行性，第二轮解决菌丝网与骨架连接强度问题，最终版本经过真实台风（47 m/s 阵风）实地考验。"
            : "From concept sketches to physical prototype, three rounds of iterative refinement. The first trial validated anchor frame feasibility; the second resolved mycelium-net-to-frame bond strength; the final version was tested against a real typhoon (47 m/s gusts) in the field."}
          </p>
        </Reveal>

        {/* 迭代时间线 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "40px" }}>
          {(lang === "zh" ? [
            { phase: "第一次尝试", tag: "ATTEMPT 01", status: "待优化", isPass: false, summary: "3D打印铝合金骨架原型制作，验证锚固机制可行性。", finding: "发现菌丝网附着力不足，与骨架连接在 20 m/s 风速下出现滑脱。", data: "最大承载风速 22 m/s" },
            { phase: "结构优化", tag: "ITERATION 02", status: "显著改善", isPass: false, summary: "引入编织节点连接系统，增加3个锚固臂与应变缓冲阻尼节点。", finding: "菌丝网拉伸强度提升 2.3×，连接强度达到设计目标。", data: "最大承载风速 38 m/s" },
            { phase: "最终版本", tag: "FINAL V3.0", status: "验证通过", isPass: true, summary: "完整集成传感器阵列与通信模块，校园内 5 株樟树实地安装测试。", finding: "经受 2024 年夏季强台风（阵风 47 m/s）考验，零损毁记录。", data: "验证风速 47 m/s ✓" },
          ] : [
            { phase: "First Attempt", tag: "ATTEMPT 01", status: "Needs Improvement", isPass: false, summary: "3D-printed aluminum alloy anchor frame prototype — validated anchoring mechanism feasibility.", finding: "Mycelium net adhesion insufficient; net-to-frame connection slipped at 20 m/s wind speed.", data: "Max wind load: 22 m/s" },
            { phase: "Structural Refinement", tag: "ITERATION 02", status: "Significant Improvement", isPass: false, summary: "Introduced woven-node connection system; added 3 anchor arms and strain-buffering damping nodes.", finding: "Mycelium net tensile strength increased 2.3×; connection strength met design targets.", data: "Max wind load: 38 m/s" },
            { phase: "Final Version", tag: "FINAL V3.0", status: "Validated", isPass: true, summary: "Full sensor array and communication module integration; field-installed on 5 camphor trees on campus.", finding: "Survived a severe typhoon in summer 2024 (gusts up to 47 m/s) — zero damage recorded.", data: "Validated at 47 m/s ✓" },
          ]).map(({ phase, tag, status, isPass, summary, finding, data }) => (
            <Reveal key={phase} delay={0.06}>
              <div className="ag-card" style={{ padding: "24px", border: `1px solid ${C.border}`, background: C.bg, height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                  <div>
                    <p style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.1rem", color: C.fog, margin: 0, lineHeight: 1 }}>{phase}</p>
                    <p style={{ fontFamily: FM, fontSize: "0.52rem", letterSpacing: "0.1em", color: C.gray, margin: "4px 0 0" }}>{tag}</p>
                  </div>
                  <span style={{ fontFamily: FM, fontSize: "0.5rem", letterSpacing: "0.08em", padding: "3px 8px", border: `1px solid ${isPass ? C.fog : C.border}`, color: isPass ? C.fog : C.gray }}>{status}</span>
                </div>
                <div style={{ height: "1px", background: C.border, marginBottom: "14px" }} />
                <p style={{ fontFamily: FB, fontSize: "0.78rem", color: C.ink, lineHeight: 1.6, marginBottom: "10px" }}>{summary}</p>
                <p style={{ fontFamily: FB, fontSize: "0.72rem", color: C.gray, lineHeight: 1.6, marginBottom: "12px" }}>{finding}</p>
                <div style={{ padding: "8px 12px", background: C.fogLight, borderLeft: `2px solid ${C.fog}` }}>
                  <p style={{ fontFamily: FM, fontSize: "0.6rem", color: C.fog, margin: 0 }}>{data}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 原型制作照片 */}
        <Reveal>
          <div>
            <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.18em", color: C.fog, marginBottom: "16px" }}>
              {lang === "zh" ? "原型制造记录 · PROTOTYPE FABRICATION RECORD" : "PROTOTYPE FABRICATION RECORD"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {(lang === "zh" ? [
                { img: imgProto1, label: "电路板焊接组装" },
                { img: imgProto2, label: "传感器模块测试" },
                { img: imgProto3, label: "系统集成调试" },
              ] : [
                { img: imgProto1, label: "PCB Soldering & Assembly" },
                { img: imgProto2, label: "Sensor Module Testing" },
                { img: imgProto3, label: "System Integration & Debugging" },
              ]).map(({ img, label }) => (
                <div key={label} style={{ position: "relative", overflow: "hidden", border: `1px solid ${C.fogBorder}` }}>
                  <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                    <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ padding: "10px 14px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
                    <span style={{ fontFamily: FM, fontSize: "0.58rem", color: C.gray, letterSpacing: "0.08em" }}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ═══════════ 09 · 数字交互系统 ═══════════ */}
      <Section id="s-ui" dark>
        <SHead num="09" zh={lang === "zh" ? "数字交互系统" : "Digital Interaction System"} dark />
        <Reveal>
          <p style={{ fontFamily: FB, fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "36px", maxWidth: "680px" }}>
            {lang === "zh"
              ? "远程树木监测系统通过传感器采集树木实时状态数据，并借助全息投影技术将各类参数可视化呈现。平台智能标注关键编号树木，工作人员可快速识别异常节点，并对受损树木进行实时状态追踪。"
              : "The remote tree monitoring system collects real-time status data via sensors and visualizes all parameters through holographic projection. The platform intelligently tags critical numbered trees, enabling staff to quickly identify anomalous nodes and track the real-time condition of damaged trees."}
          </p>
        </Reveal>

        {/* 主界面全息投影照片 */}
        <Reveal delay={0.06}>
          <div style={{ border: "1px solid rgba(71,118,172,0.3)", overflow: "hidden", marginBottom: "24px", position: "relative" }}>
            <img src={imgUI1} alt="全息投影树木监测主界面" style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "460px" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(20,24,32,0.9), transparent)", padding: "24px 28px" }}>
              <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.2em", color: C.fog, marginBottom: "6px" }}>{lang === "zh" ? "主界面 · MAIN INTERFACE" : "MAIN INTERFACE"}</p>
              <p style={{ fontFamily: FB, fontSize: "0.88rem", color: "#fff", margin: 0 }}>{lang === "zh" ? "全息投影 · 树木三维模型 · 参数信息展示" : "Holographic Projection · 3D Tree Model · Parameter Display"}</p>
            </div>
          </div>
        </Reveal>

        {/* 4个界面面板 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "28px" }}>
          {(lang === "zh" ? [
            { img: imgUI2, label: "问题预警", desc: "红色光效警示异常树木节点" },
            { img: imgUI3, label: "健康树木", desc: "蓝色光效显示正常运行状态" },
            { img: imgUI4, label: "树木修复", desc: "修复模式与干预措施可视化" },
            { img: imgUI5, label: "状态监测", desc: "CO₂与土壤湿度实时数据图表" },
          ] : [
            { img: imgUI2, label: "Issue Alert", desc: "Red light effects highlight anomalous tree nodes" },
            { img: imgUI3, label: "Healthy Trees", desc: "Blue light effects indicate normal operating status" },
            { img: imgUI4, label: "Tree Recovery", desc: "Repair mode and intervention measures visualized" },
            { img: imgUI5, label: "Status Monitoring", desc: "Real-time CO₂ and soil moisture charts" },
          ]).map(({ img, label, desc }) => (
            <Reveal key={label} delay={0.06}>
              <div style={{ border: "1px solid rgba(71,118,172,0.25)", overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                  <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "12px 16px", background: "rgba(71,118,172,0.08)", borderTop: "1px solid rgba(71,118,172,0.2)" }}>
                  <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.8rem", color: "#fff", margin: "0 0 2px" }}>· {label}</p>
                  <p style={{ fontFamily: FM, fontSize: "0.58rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 界面补充说明 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {(lang === "zh" ? [
            { icon: "◈", func: "全息投影", desc: "三维树木模型实时渲染，健康指数可视化，支持单株/区域切换" },
            { icon: "◆", func: "风险预警", desc: "极端天气预测联动，提前 6h 发出台风响应指令，红光标记异常节点" },
            { icon: "◉", func: "数据分析", desc: "AI辅助维护决策，CO₂与土壤湿度趋势对比，自动生成健康报告" },
          ] : [
            { icon: "◈", func: "Holographic Projection", desc: "Real-time 3D tree model rendering, health index visualization, single-tree / zone switching" },
            { icon: "◆", func: "Risk Alert", desc: "Extreme weather forecast integration — issues typhoon response commands 6h in advance and marks anomalous nodes in red" },
            { icon: "◉", func: "Data Analysis", desc: "AI-assisted maintenance decisions, CO₂ and soil moisture trend comparison, automatic health report generation" },
          ]).map(({ icon, func, desc }) => (
            <Reveal key={func} delay={0.06}>
              <div style={{ padding: "18px 16px", border: "1px solid rgba(71,118,172,0.25)", background: "rgba(71,118,172,0.06)" }}>
                <span style={{ fontFamily: FO, fontStyle: "italic", fontSize: "1.6rem", color: C.fog, display: "block", marginBottom: "10px", lineHeight: 1 }}>{icon}</span>
                <p style={{ fontFamily: FB, fontWeight: 500, fontSize: "0.85rem", color: "#fff", marginBottom: "6px" }}>{func}</p>
                <p style={{ fontFamily: FB, fontSize: "0.72rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ═══════════ 10 · 最终成果 ═══════════ */}
      <Section id="s-outcome">
        <SHead num="10" zh={lang === "zh" ? "最终成果" : "Final Outcome"} />
        <Reveal>
          <div style={{ padding: "36px 44px", background: C.bgAlt, border: `1px solid ${C.fogBorder}`, borderLeft: `4px solid ${C.fog}`, marginBottom: "44px" }}>
            <p style={{ fontFamily: FB, fontSize: "clamp(0.9rem, 2vw, 1.15rem)", color: C.ink, lineHeight: 1.8, margin: 0 }}>
              {lang === "zh"
                ? "ArborGuardian 将工业设计、生态工程和智能技术融合于一体，创造了一种面向未来城市环境的树木主动保护方式。通过仿生结构的精准力学、多维传感的实时感知以及数字孪生的智慧决策，让城市生态系统具备更强的气候适应能力。"
                : "ArborGuardian integrates industrial design, ecological engineering, and intelligent technology into a single solution — creating an active tree protection system built for the future urban environment. Through the precise mechanics of biomimetic structures, real-time multi-dimensional sensing, and smart digital-twin decision-making, it equips urban ecosystems with greater climate resilience."}
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          <Reveal>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                <Stat label={lang === "zh" ? "迭代版本" : "ITERATIONS"} value="3" unit={lang === "zh" ? "代" : "gen."} sub={lang === "zh" ? "原型设计迭代次数" : "Prototype design iterations"} />
                <Stat label={lang === "zh" ? "实地验证" : "FIELD VALIDATED"} value="47" unit="m/s" sub={lang === "zh" ? "台风阵风考验通过" : "Typhoon gust test passed"} />
                <Stat label={lang === "zh" ? "监测精度" : "MONITORING ACCURACY"} value="±0.1°" sub={lang === "zh" ? "树干倾斜实时监测" : "Trunk tilt real-time monitoring"} />
                <Stat label={lang === "zh" ? "碳足迹减少" : "CARBON REDUCTION"} value="-68%" sub={lang === "zh" ? "对比传统保护材料" : "vs. traditional protection materials"} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {(lang === "zh" ? [
                  "仿生双层防护结构 — 内刚外柔，适应超强台风载荷",
                  "六维传感阵列 — 500ms 实时采集，边缘计算本地处理",
                  "菌丝复合材料 — 生物可降解，对树木零损伤",
                  "数字孪生平台 — 城市尺度树木健康智慧管理",
                  "极端天气预警 — 提前 6 小时台风风险预判与响应",
                ] : [
                  "Biomimetic dual-layer protection structure — rigid core, flexible outer layer, engineered for super typhoon loads",
                  "Six-dimensional sensor array — 500 ms real-time collection with local edge computing",
                  "Mycelium composite material — fully biodegradable, zero harm to trees",
                  "Digital twin platform — intelligent urban-scale tree health management",
                  "Extreme weather early warning — typhoon risk prediction and response 6 hours in advance",
                ]).map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "10px", fontFamily: FB, fontSize: "0.82rem", color: C.ink, lineHeight: 1.5 }}>
                    <span style={{ color: C.fog, flexShrink: 0 }}>▸</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              {/* 最终产品成果照片 */}
              <div style={{ border: `1px solid ${C.fogBorder}`, overflow: "hidden", marginBottom: "16px" }}>
                <img src={imgOutput} alt="ArborGuardian 最终成果展示" style={{ width: "100%", display: "block", objectFit: "cover" }} />
              </div>
              {/* 补充界面截图 */}
              <div style={{ border: `1px solid ${C.fogBorder}`, overflow: "hidden" }}>
                <img src={imgUIAlt} alt="系统整合界面展示" style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: "200px" }} />
              </div>
              <div style={{ marginTop: "12px", padding: "16px 20px", border: `1px solid ${C.fogBorder}`, background: C.fogLight }}>
                <p style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.18em", color: C.fog, marginBottom: "10px" }}>{lang === "zh" ? "未来延展方向" : "FUTURE DIRECTIONS"}</p>
                {(lang === "zh"
                  ? ["城市智慧林业网络集成", "多树种结构适配方案", "气候预测 AI 模型联动", "跨城市生态数据共享"]
                  : ["Integration with urban smart forestry networks", "Structural adaptation for multiple tree species", "Climate forecast AI model integration", "Cross-city ecological data sharing"]
                ).map((f, i) => (
                  <p key={i} style={{ fontFamily: FB, fontSize: "0.78rem", color: C.gray, margin: "4px 0", lineHeight: 1.5 }}>· {f}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 页脚 */}
      <div style={{
        borderTop: `1px solid ${C.fogBorder}`, background: C.bgAlt,
        padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.14em", color: C.gray }}>
          ARBOR GUARDIAN · {lang === "zh" ? "树木守护者" : "Tree Guardian"} · AG-2024
        </span>
        <button onClick={onBack} style={{
          fontFamily: FM, fontSize: "0.6rem", letterSpacing: "0.12em",
          color: C.fog, background: "none", border: `1px solid ${C.fogBorder}`,
          padding: "8px 20px", cursor: "pointer",
        }}>
          {lang === "zh" ? "← 返回项目列表" : "← Back to Projects"}
        </button>
        <span style={{ fontFamily: FM, fontSize: "0.56rem", letterSpacing: "0.14em", color: C.gray }}>
          {lang === "zh" ? "工业设计 · 生态科技 · 智慧城市" : "Industrial Design · Eco-Tech · Smart City"}
        </span>
      </div>
    </div>
  );
}
