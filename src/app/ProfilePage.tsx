import { useRef, useEffect, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { TagChip } from "../ChronicleKit";
import { useLanguage } from "./LanguageContext";
import imgPortrait from "@/imports/image.png";

// ─── Figma profile material images ───────────────────────────────
import imgProjVR1   from "@/imports/Frame1707480126/18db94fb400eea6e8aebd4712f20a7bd83db9e80.png";
import imgProjVR2   from "@/imports/Frame1707480126/f7cbaf6b8acd2593d710ec44b1952f33427a64cc.png";
import imgProjVR3   from "@/imports/Frame1707480126/260c55b4cc80fb1fd20787dd9db250a469a0640d.png";
import imgProjUE1   from "@/imports/Frame1707480126/fae5daa6594331962a35e5bcb572feb1c1fb1ab4.png";
import imgProjUE2   from "@/imports/Frame1707480126/c739e58d5f2f0929a47ae48071c94e501985f73f.png";
import imgProjUE3   from "@/imports/Frame1707480126/a3f20aeac12de025a9cb237a5986f6e06e36294b.png";
import imgProjUE4   from "@/imports/Frame1707480126/92b8f526be95690379614e72a847f24a44110d44.png";
import imgIF1       from "@/imports/Frame1707480126/903e6fee3c075cd989b07b70dd9c6cedf2c2a40b.png";
import imgIF2       from "@/imports/Frame1707480126/8ba39baa741e8cd930dde90edf3353df105af48e.png";
import imgIF3       from "@/imports/Frame1707480126/ad9f3ba1fd0fcd8210106f04924001f295032b50.png";
import imgIFCert    from "@/imports/Frame1707480126/95230452c1ba76d08bf9ec395a71a39463ac65c1.png";
import imgFullBody  from "@/imports/Frame1707480126/890bd15eb11cae5220f76b78a0f65e720891350e.png";
import imgIcAdobe   from "@/imports/Frame1707480126/33631aaf922ed1abf45c4f9411badfd4ce4e4777.png";
import imgIcBlender from "@/imports/Frame1707480126/901d17e555e39a5164d7ce9864ffa5c072140b1e.png";
import imgIcKeyshot from "@/imports/Frame1707480126/d894def0b2cfe1f86e5c92f245f76e538b03b8a4.png";
import imgIcSW      from "@/imports/Frame1707480126/1ef36b0802dab4819954933d257891ca080160af.png";
import imgIcFigma   from "@/imports/Frame1707480126/9277e154a55ff3c588cfcaa3bd4ecf76ad5c124b.png";
import imgIcUnity   from "@/imports/Frame1707480126/6d6677c7e8d429caebfbad36e5c6837b98eb2a1e.png";
import imgIcAI      from "@/imports/Frame1707480126/4f4921230ebbf5cb52c7545297384792eb08e11a.png";

// ─── Scroll animation wrapper (bidirectional) ────────────────────
function ScrollReveal({
  delay = 0,
  y = 20,
  children,
}: {
  delay?: number;
  y?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : y }}
      transition={{
        duration: inView ? 0.58 : 0.3,
        delay: inView ? delay : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section heading (consistent with other pages) ────────────────
function SectionHeading({ code, label }: { code: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-xs text-muted-foreground/35 tracking-widest">
        ─ {code} ─
      </span>
      <span className="font-mono text-xs tracking-[0.22em] uppercase text-muted-foreground/45">
        {label}
      </span>
      <span className="flex-1 h-px" style={{ background: "rgba(90,176,232,0.1)" }} />
    </div>
  );
}

// ─── Glass card wrapper ────────────────────────────────────────────
function ProfileCard({
  children,
  className = "",
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    /* using <div> instead of kit ProjectCard: ProfileCard is a generic container with
       no image/cover area — ProjectCard has a fixed image+index+category structure */
    <div
      className={`p-6 ${className}`}
      style={{
        border: accent
          ? "1px solid rgba(212,168,83,0.35)"
          : "1px solid rgba(90,176,232,0.16)",
        borderRadius: "4px",
        background: accent
          ? "rgba(20,14,5,0.55)"
          : "rgba(10,21,37,0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Skill tag pill ───────────────────────────────────────────────
function SkillTag({ children }: { children: ReactNode }) {
  return (
    /* using <span> instead of TagChip: TagChip requires variant prop and is styled
       for category classification (uppercase, letter-spacing), not inline skill lists */
    <span
      className="inline-block font-mono text-muted-foreground/60 border border-primary/15 px-2.5 py-1 hover:text-primary/70 hover:border-primary/30 transition-colors duration-200 cursor-default"
      style={{ fontSize: "0.62rem", letterSpacing: "0.08em", borderRadius: "2px" }}
    >
      {children}
    </span>
  );
}

// ─── Module horizontal divider ────────────────────────────────────
function ModuleDivider() {
  return (
    <div
      className="h-px mt-24 md:mt-32"
      style={{ background: "rgba(90,176,232,0.08)" }}
    />
  );
}

// ─── Photo placeholder ────────────────────────────────────────────
function PhotoPlaceholder() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: "3/4",
        background: "linear-gradient(155deg, #0d1c35 0%, #081528 100%)",
        border: "1px solid rgba(90,176,232,0.2)",
        borderRadius: "2px",
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(90,176,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,176,232,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(90,176,232,0.08) 0%, transparent 55%)",
        }}
      />
      {/* Corner brackets */}
      {(["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"] as const).map((cls, i) => (
        <div
          key={i}
          className={`absolute w-5 h-5 ${cls}`}
          style={{ borderColor: "rgba(90,176,232,0.38)" }}
        />
      ))}
      {/* Center annotation */}
      <img
        src={imgPortrait}
        alt="个人照片"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────

const SKILLS_ZH = {
  design: ["Figma", "SolidWorks", "Keyshot", "Adobe Photoshop", "Adobe Illustrator", "UI/UX 设计", "服务设计", "CMF 设计", "三维渲染"],
  dev: ["Unity / Unreal Engine 5", "Arduino 原型开发", "Web 开发基础", "3D 建模与参数化建模", "程序设计"],
  research: ["半结构化访谈", "问卷调查", "用户测试", "竞品分析", "体验研究", "数据统计分析", "用户画像构建"],
  ai: ["AIGC 辅助设计全流程", "ChatGPT", "Figma Make", "生成式 AI 工作流", "数据可视化"],
};

const SKILLS_EN = {
  design: ["Figma", "SolidWorks", "Keyshot", "Adobe Photoshop", "Adobe Illustrator", "UI/UX Design", "Service Design", "CMF Design", "3D Rendering"],
  dev: ["Unity / Unreal Engine 5", "Arduino Prototyping", "Web Development", "3D & Parametric Modeling", "Programming"],
  research: ["Semi-Structured Interviews", "Surveys", "User Testing", "Competitive Analysis", "Experience Research", "Statistical Analysis", "User Persona"],
  ai: ["End-to-End AIGC Workflow", "ChatGPT", "Figma Make", "Generative AI Workflow", "Data Visualization"],
};

const EDUCATION_ZH = [
  {
    school: "香港大学",
    en: "The University of Hong Kong",
    degree: "工业工程与物流管理",
    type: "硕士在读",
    period: "2026 – 2027",
    location: "中国香港",
    courses: ["供应链管理", "运筹学", "虚拟现实技术及应用", "物联网", "项目管理"],
  },
  {
    school: "西安交通大学 & 米兰理工大学",
    en: "XJTU & Politecnico di Milano",
    degree: "工业设计",
    type: "本科",
    period: "2022 – 2026",
    location: "西安 / 米兰",
    gpa: "82 / 100（前 50%）",
    courses: [
      "产品设计创新材料 · 95/100",
      "设计实践-3 · 100/100",
      "产品设计基础-2 · 94/100",
      "高级三维建模 · 99/100",
    ],
  },
];

const EDUCATION_EN = [
  {
    school: "The University of Hong Kong",
    en: "HKU",
    degree: "Industrial Engineering & Logistics Management",
    type: "MSc (current)",
    period: "2026 – 2027",
    location: "Hong Kong",
    courses: ["Supply Chain Management", "Operations Research", "VR Technology & Applications", "IoT", "Project Management"],
  },
  {
    school: "Xi'an Jiaotong University & Politecnico di Milano",
    en: "XJTU & PoliMi",
    degree: "Industrial Design",
    type: "Bachelor",
    period: "2022 – 2026",
    location: "Xi'an / Milan",
    gpa: "82 / 100 (Top 50%)",
    courses: [
      "Innovative Materials in Product Design · 95/100",
      "Design Practice 3 · 100/100",
      "Product Design Foundation 2 · 94/100",
      "Advanced 3D Modeling · 99/100",
    ],
  },
];

const AWARDS_ZH = [
  {
    title: "iF Design Award 2025",
    subtitle: "Professional Concept / Personal Concept",
    project: "Magic Fit O2O",
    org: "西安交通大学",
    date: "2025.4",
    highlight: true,
    desc: "iF 与红点奖、IDEA 奖并称「世界三大设计奖」；全球 66 国 11,000 件作品中脱颖而出。为采用 Ti-6Al-4V 钛合金和镍钛形状记忆合金的模块化眼镜开发了参数化三维模型与产品可视化，参与无螺丝模块化眼镜系统的概念开发及视觉展示。",
  },
  {
    title: "数控系统外观工业设计大赛",
    subtitle: "优秀奖",
    org: "西安交通大学",
    date: "2024.8",
    desc: "负责主机操作面板的参数化建模，协作完成概念设计。",
  },
  {
    title: "第 35 届腾飞杯创新创业大赛",
    subtitle: "创新赛道 优秀奖",
    org: "西安交通大学",
    date: "2024.7",
    desc: "「基于眼追踪的自闭症谱系障碍早期筛查研究」——主导用户界面 UI 设计，满足 ASD 相关行为特征要求；参与调研访谈与记录分析。",
  },
];

const AWARDS_EN = [
  {
    title: "iF Design Award 2025",
    subtitle: "Professional Concept / Personal Concept",
    project: "Magic Fit O2O",
    org: "Xi'an Jiaotong University",
    date: "2025.4",
    highlight: true,
    desc: "One of the world's three most prestigious design awards, alongside Red Dot and IDEA. Selected from 11,000+ entries across 66 countries. Developed parametric 3D models and product visualization for a modular eyewear system using Ti-6Al-4V titanium and nitinol shape-memory alloys; contributed to concept development and visual presentation.",
  },
  {
    title: "CNC System Industrial Design Competition",
    subtitle: "Excellence Award",
    org: "Xi'an Jiaotong University",
    date: "2024.8",
    desc: "Led parametric modeling of the host control panel and co-developed the concept design.",
  },
  {
    title: "35th TengFei Cup Innovation & Entrepreneurship",
    subtitle: "Innovation Track — Excellence Award",
    org: "Xi'an Jiaotong University",
    date: "2024.7",
    desc: "\"Eye-Tracking-Based Early Screening for Autism Spectrum Disorder\" — led UI design meeting ASD-specific behavioral requirements; participated in user research interviews and analysis.",
  },
];

const GAME_ITEMS_ZH = [
  {
    title: "Unity / Unreal Engine 5 原型开发",
    desc: "在产品设计项目中构建可交互数字原型，验证空间交互逻辑与用户体验假设，探索沉浸式技术在复杂系统中的应用场景。",
  },
  {
    title: "Arduino 硬件交互原型",
    desc: "基于 Arduino UNO 搭建低保真硬件原型，验证「锅具识别 → 火力判断 → 烹饪建议」辅助交互闭环，用物理原型替代早期 UI 模型进行用户测试。",
  },
  {
    title: "游戏交互机制分析",
    desc: "从 HCI 视角分析游戏反馈机制与沉浸感设计，将玩家行为模型转化为实体产品与数字界面的交互设计参考。",
  },
  {
    title: "沉浸式体验研究",
    desc: "探索 VR/AR 技术在复杂系统（工业、医疗、展览）中的应用，关注空间感知、操作流畅性与多模态信息呈现方式。",
  },
];

const GAME_ITEMS_EN = [
  {
    title: "Unity / Unreal Engine 5 Prototyping",
    desc: "Built interactive digital prototypes within product design projects to validate spatial interaction logic and UX hypotheses, exploring immersive technology in complex systems.",
  },
  {
    title: "Arduino Hardware Interaction Prototype",
    desc: "Assembled low-fidelity hardware prototypes on Arduino UNO to validate a 'cookware detection → heat inference → cooking suggestion' interaction loop, replacing early UI mockups for user testing.",
  },
  {
    title: "Game Interaction Mechanics Analysis",
    desc: "Analyzed game feedback mechanisms and immersion design from an HCI perspective, translating player behavior models into interaction design references for physical and digital products.",
  },
  {
    title: "Immersive Experience Research",
    desc: "Explored VR/AR applications in complex domains (industrial, medical, exhibition), focusing on spatial perception, interaction fluency, and multimodal information presentation.",
  },
];

const CONTACT_ITEMS = [
  { label: "EMAIL", value: "sunsetjsx@163.com", href: "mailto:sunsetjsx@163.com" },
  { label: "PHONE", value: "+86 136 6505 4985", href: "tel:+8613665054985" },
  { label: "PHONE", value: "+852 5573 2448", href: "tel:+85255732448" },
  { label: "LINKEDIN", value: "shengxin-jiang-02a262423", href: "https://www.linkedin.com/in/shengxin-jiang-02a262423" },
  { label: "WEBSITE", value: "shengxinjiang.com", href: "https://shengxinjiang.com" },
  { label: "WECHAT", value: "Jerry55732448", href: undefined },
];

// ─── Page component ───────────────────────────────────────────────
export default function ProfilePage() {
  const { lang } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const SKILLS = lang === "zh" ? SKILLS_ZH : SKILLS_EN;
  const EDUCATION = lang === "zh" ? EDUCATION_ZH : EDUCATION_EN;
  const AWARDS = lang === "zh" ? AWARDS_ZH : AWARDS_EN;
  const GAME_ITEMS = lang === "zh" ? GAME_ITEMS_ZH : GAME_ITEMS_EN;

  const EASE_OUT = [0.16, 1, 0.3, 1] as const;
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease: EASE_OUT },
  });

  return (
    <div
      className="min-h-screen text-foreground"
      style={{ fontFamily: "'Space Grotesk', 'Noto Serif SC', system-ui, sans-serif" }}
    >

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Sparse background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg className="w-full h-full" viewBox="0 0 1440 580" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="prf-glow" cx="70%" cy="45%" r="38%">
                <stop offset="0%" stopColor="#5AB0E8" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#5AB0E8" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1440" height="580" fill="url(#prf-glow)" />
            <line x1="0" y1="580" x2="280" y2="0" stroke="rgba(90,176,232,0.035)" strokeWidth="0.8" />
            <circle cx="1120" cy="200" r="190" fill="none" stroke="rgba(90,176,232,0.04)" strokeWidth="0.6" strokeDasharray="8 18" />
            <circle cx="1120" cy="200" r="80" fill="none" stroke="rgba(90,176,232,0.055)" strokeWidth="0.5" strokeDasharray="3 10" />
            <g stroke="rgba(90,176,232,0.22)" strokeWidth="0.8">
              <line x1="32" y1="32" x2="62" y2="32" />
              <line x1="32" y1="32" x2="32" y2="62" />
            </g>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-8 md:px-14">
          {/* Archive row */}
          <motion.div
            {...fadeUp(0.05)}
            className="flex items-center justify-between mb-8 font-mono text-xs tracking-[0.18em] text-muted-foreground/40"
          >
            <span>{lang === "zh" ? "档案编号: CR-PRF-∞" : "FILE NO.: CR-PRF-∞"}</span>
            <span className="hidden sm:block">PROFILE · 2026</span>
          </motion.div>

          {/* Top rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE_OUT }}
            className="h-px mb-12 origin-left"
            style={{ background: "rgba(90,176,232,0.18)" }}
          />

          {/* Name — full-width typographic element */}
          <motion.h1
            {...fadeUp(0.2)}
            className="font-bold leading-none tracking-tighter text-foreground"
            style={{ fontSize: "clamp(4.5rem, 14vw, 11rem)" }}
          >
            江圣鑫
          </motion.h1>

          {/* Grid below name: photo + content */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Photo — 3 cols on desktop, full width on mobile */}
            <motion.div {...fadeUp(0.3)} className="md:col-span-3">
              <PhotoPlaceholder />
            </motion.div>

            {/* Content — 9 cols */}
            <div className="md:col-span-9 flex flex-col gap-7">
              <motion.div {...fadeUp(0.38)}>
                <p
                  className="font-mono text-primary/65 tracking-[0.18em] uppercase mb-4"
                  style={{ fontSize: "0.72rem" }}
                >
                  Product Designer · Engineer
                </p>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {lang === "zh"
                    ? "本科工业设计背景，兼具人机交互研究经验与实体产品落地能力。曾获 iF 设计奖，参与 AIGC 方向论文撰写，拥有 Unity/Unreal 原型开发、产品设计与用户研究全流程项目经验。现于香港大学攻读工业工程与物流管理硕士，致力于探索沉浸式技术在复杂系统中的应用。"
                    : "Industrial design graduate with HCI research experience and hands-on product delivery. iF Design Award winner, AIGC paper contributor, and practitioner across Unity/Unreal prototyping, product design, and full-cycle user research. Currently pursuing an MSc in Industrial Engineering at HKU, focused on applying immersive technology to complex systems."}
                </p>
              </motion.div>

              {/* Ability tags */}
              <motion.div {...fadeUp(0.46)} className="flex flex-wrap gap-2">
                <TagChip variant="active">{lang === "zh" ? "交互设计" : "Interaction Design"}</TagChip>
                <TagChip>{lang === "zh" ? "产品设计" : "Product Design"}</TagChip>
                <TagChip>{lang === "zh" ? "原型开发" : "Prototyping"}</TagChip>
                <TagChip>{lang === "zh" ? "AI 辅助设计" : "AI-Assisted Design"}</TagChip>
              </motion.div>

              {/* Quick info */}
              <motion.div
                {...fadeUp(0.54)}
                className="flex flex-wrap gap-8 pt-1"
                style={{ borderTop: "1px solid rgba(90,176,232,0.08)" }}
              >
                {(lang === "zh"
                  ? [["位置", "中国香港"], ["院校", "香港大学"], ["语言", "普通话 / 英文 IELTS 6.5"]]
                  : [["Location", "Hong Kong"], ["School", "HKU"], ["Languages", "Mandarin / English IELTS 6.5"]]
                ).map(([k, v]) => (
                  <div key={k} className="pt-4">
                    <p
                      className="font-mono text-muted-foreground/28 tracking-widest mb-1"
                      style={{ fontSize: "0.56rem" }}
                    >
                      {k}
                    </p>
                    <p
                      className="font-mono text-muted-foreground/65"
                      style={{ fontSize: "0.68rem" }}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONTENT MODULES
      ══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-8 md:px-14 pb-32">

        {/* ─── MODULE 1: 关于我 ────────────────────────────────── */}
        <ModuleDivider />
        <div className="pt-16 md:pt-20">
          <ScrollReveal>
            <SectionHeading code="M01" label={lang === "zh" ? "关于我" : "ABOUT"} />
          </ScrollReveal>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Left: text */}
            <div className="flex-1 flex flex-col gap-5 min-w-0">
              <ScrollReveal delay={0.06} y={16}>
                <p
                  className="font-bold leading-tight tracking-tight text-foreground"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
                >
                  {lang === "zh"
                    ? <><span>我关注技术如何改变</span><span className="text-primary">人与产品之间的关系。</span></>
                    : <><span>I care about how technology reshapes </span><span className="text-primary">the relationship between people and products.</span></>
                  }
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.14} y={16}>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {lang === "zh"
                    ? "我的设计方法论建立在「理解 → 原型 → 验证」的闭环上。每一个产品决策都应该来自真实的用户洞察，而不是主观假设。无论是半结构化访谈还是硬件原型测试，我始终相信：真实的用户行为是最诚实的设计反馈。"
                    : "My design methodology is built on a closed loop of Understand → Prototype → Validate. Every product decision should be grounded in genuine user insight, not subjective assumption. Whether through semi-structured interviews or hardware prototype testing, I believe real user behavior is the most honest design feedback."}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "zh"
                    ? "跨越工业设计、交互设计与工程实现三个领域，让我能够在方案的「可行性」与「体验」之间找到平衡点。从概念草图到 1:1 实体样机，从线框原型到可交互 Demo——我习惯于在整个设计流程中保持完整的主导权。"
                    : "Spanning industrial design, interaction design, and engineering implementation, I find the balance between feasibility and experience. From concept sketches to 1:1 physical prototypes, from wireframes to interactive demos — I maintain full ownership across the entire design process."}
                </p>
              </ScrollReveal>
            </div>
            {/* Right: full-body photo */}
            <ScrollReveal delay={0.2} y={16}>
              <div
                className="flex-shrink-0 overflow-hidden"
                style={{ border: "1px solid rgba(90,176,232,0.14)", borderRadius: "4px", width: "160px" }}
              >
                <img src={imgFullBody} alt="个人全身照" className="w-full object-cover object-top" style={{ maxHeight: "320px" }} />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ─── MODULE 2: 技能矩阵 ──────────────────────────────── */}
        <ModuleDivider />
        <div className="pt-16 md:pt-20">
          <ScrollReveal>
            <SectionHeading code="M02" label={lang === "zh" ? "技能矩阵" : "SKILLS"} />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(lang === "zh"
              ? [
                  { label: "设计工具", tags: SKILLS.design },
                  { label: "开发 & 原型", tags: SKILLS.dev },
                  { label: "研究方法", tags: SKILLS.research },
                  { label: "AI 工作流", tags: SKILLS.ai },
                ]
              : [
                  { label: "Design Tools", tags: SKILLS.design },
                  { label: "Dev & Prototyping", tags: SKILLS.dev },
                  { label: "Research Methods", tags: SKILLS.research },
                  { label: "AI Workflow", tags: SKILLS.ai },
                ]
            ).map(({ label, tags }, i) => (
              <ScrollReveal key={label} delay={i * 0.08}>
                <ProfileCard>
                  <p
                    className="font-mono text-muted-foreground/35 tracking-widest uppercase mb-4"
                    style={{ fontSize: "0.58rem" }}
                  >
                    {label}
                  </p>
                  <div
                    className="h-px mb-4"
                    style={{ background: "rgba(90,176,232,0.08)" }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <SkillTag key={t}>{t}</SkillTag>
                    ))}
                  </div>
                </ProfileCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Software icons strip */}
          <ScrollReveal delay={0.18}>
            <div
              className="mt-6 p-5 flex flex-wrap gap-6 items-center"
              style={{ border: "1px solid rgba(90,176,232,0.1)", borderRadius: "4px", background: "rgba(10,21,37,0.4)" }}
            >
              <span className="font-mono text-muted-foreground/25 tracking-widest mr-2" style={{ fontSize: "0.55rem" }}>{lang === "zh" ? "软件工具" : "SOFTWARE"}</span>
              {([
                { src: imgIcAdobe,   label: "Adobe Suite" },
                { src: imgIcBlender, label: "Blender" },
                { src: imgIcKeyshot, label: "Keyshot" },
                { src: imgIcSW,      label: "SolidWorks" },
                { src: imgIcFigma,   label: "Figma" },
                { src: imgIcUnity,   label: "Unity / UE5" },
                { src: imgIcAI,      label: "ChatGPT" },
              ]).map(({ src, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 group cursor-default">
                  <img src={src} alt={label} className="w-9 h-9 object-contain transition-opacity duration-200 group-hover:opacity-80" />
                  <span className="font-mono text-muted-foreground/38 group-hover:text-muted-foreground/60 transition-colors duration-200" style={{ fontSize: "0.5rem", letterSpacing: "0.06em" }}>{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ─── MODULE 3: 教育经历 ──────────────────────────────── */}
        <ModuleDivider />
        <div className="pt-16 md:pt-20">
          <ScrollReveal>
            <SectionHeading code="M03" label={lang === "zh" ? "教育经历" : "EDUCATION"} />
          </ScrollReveal>

          <div className="space-y-5">
            {EDUCATION.map((edu, i) => (
              <ScrollReveal key={edu.school} delay={i * 0.1}>
                <ProfileCard>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                    {/* Left: school info */}
                    <div className="md:col-span-7">
                      <p className="text-base font-semibold text-foreground tracking-tight mb-0.5">
                        {edu.school}
                      </p>
                      <p
                        className="font-mono text-muted-foreground/40 tracking-widest mb-3"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {edu.en}
                      </p>
                      <p className="text-sm text-muted-foreground mb-1">
                        {edu.degree}
                        <span
                          className="ml-2 font-mono text-primary/55"
                          style={{ fontSize: "0.62rem" }}
                        >
                          · {edu.type}
                        </span>
                      </p>
                      {edu.gpa && (
                        <p
                          className="font-mono text-muted-foreground/45 mt-1"
                          style={{ fontSize: "0.62rem" }}
                        >
                          GPA {edu.gpa}
                        </p>
                      )}
                    </div>

                    {/* Right: period + courses */}
                    <div className="md:col-span-5">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="font-mono text-primary/60 tracking-widest"
                          style={{ fontSize: "0.65rem" }}
                        >
                          {edu.period}
                        </span>
                        <span
                          className="font-mono text-muted-foreground/30 tracking-widest"
                          style={{ fontSize: "0.58rem" }}
                        >
                          {edu.location}
                        </span>
                      </div>
                      <div
                        className="h-px mb-3"
                        style={{ background: "rgba(90,176,232,0.07)" }}
                      />
                      <div className="space-y-1">
                        {edu.courses.map((c) => (
                          <p
                            key={c}
                            className="font-mono text-muted-foreground/45"
                            style={{ fontSize: "0.6rem", letterSpacing: "0.05em" }}
                          >
                            · {c}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </ProfileCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ─── MODULE 4: 实习经历 ──────────────────────────────── */}
        <ModuleDivider />
        <div className="pt-16 md:pt-20">
          <ScrollReveal>
            <SectionHeading code="M04" label={lang === "zh" ? "实习经历" : "INTERNSHIP"} />
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <ProfileCard>
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                <div>
                  <p className="text-base font-semibold text-foreground tracking-tight mb-0.5">
                    {lang === "zh" ? "设计师助理" : "Design Assistant"}
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    {lang === "zh" ? "福建省建筑设计研究院有限公司" : "Fujian Architectural Design & Research Institute"}
                    <span
                      className="font-mono ml-2 text-muted-foreground/35"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {lang === "zh" ? "福建福州" : "Fuzhou, China"}
                    </span>
                  </p>
                </div>
                <span
                  className="font-mono text-primary/55 tracking-widest flex-shrink-0"
                  style={{ fontSize: "0.65rem" }}
                >
                  2025.06 – 2025.08
                </span>
              </div>

              <div
                className="h-px mb-6"
                style={{ background: "rgba(90,176,232,0.08)" }}
              />

              {/* Items: problem → method → output */}
              <div className="space-y-5">
                {(lang === "zh"
                  ? [
                      { label: "室内设计交付", desc: "为国家水暖洁具产品质检中心独立完成全楼层彩平图设计，根据功能分区要求快速迭代 20+ 版本，输出效果图及节点说明，支持最终交付。" },
                      { label: "成果转化", desc: "整理办公 / 酒店 / 金融等 3 类项目的阶段性成果，设计并制作对外宣传册与汇报 PPT，统一了团队的版式与信息分级规范。" },
                      { label: "流程优化", desc: "建立会议纪要标准化模板，将散落的讨论要点沉淀为可复用的沟通资产，被团队后续项目沿用。" },
                    ]
                  : [
                      { label: "Interior Design Delivery", desc: "Independently produced full-floor color floor plans for the National Plumbing Products Quality Inspection Center; iterated 20+ versions per functional zoning requirements and delivered rendered outputs and annotated node details." },
                      { label: "Output Conversion", desc: "Organized deliverables across 3 project types (office, hotel, finance); designed and produced client-facing brochures and presentation decks, establishing consistent layout and information hierarchy standards for the team." },
                      { label: "Process Optimization", desc: "Created standardized meeting-minutes templates that captured discussion points as reusable communication assets, adopted by the team on subsequent projects." },
                    ]
                ).map(({ label, desc }) => (
                  <div key={label} className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-3">
                      <span
                        className="font-mono text-primary/50 tracking-widest"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.12em" }}
                      >
                        {label}
                      </span>
                    </div>
                    <p
                      className="md:col-span-9 text-sm text-muted-foreground/75 leading-relaxed"
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </ProfileCard>
          </ScrollReveal>
        </div>

        {/* ─── MODULE 5: 科研经历 ──────────────────────────────── */}
        <ModuleDivider />
        <div className="pt-16 md:pt-20">
          <ScrollReveal>
            <SectionHeading code="M05" label={lang === "zh" ? "科研经历" : "RESEARCH"} />
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <ProfileCard>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                <p
                  className="font-mono text-primary/60 tracking-widest"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
                >
                  International Journal of Human–Computer Interaction
                </p>
                <span
                  className="font-mono text-muted-foreground/35 tracking-widest flex-shrink-0"
                  style={{ fontSize: "0.62rem" }}
                >
                  2026
                </span>
              </div>

              <p className="text-sm font-medium text-foreground/85 leading-snug mb-4 max-w-2xl italic">
                "Navigating the Role of Generative AI in Shaping Self-Efficacy and Design Thinking Process of Novice Designers: A Case Study in Sustainable Design Education."
              </p>

              <div
                className="h-px mb-5"
                style={{ background: "rgba(90,176,232,0.08)" }}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                  <p
                    className="font-mono text-muted-foreground/28 tracking-widest mb-1.5"
                    style={{ fontSize: "0.56rem" }}
                  >
                    {lang === "zh" ? "作者角色" : "Author Role"}
                  </p>
                  <p
                    className="font-mono text-muted-foreground/60"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {lang === "zh" ? "第六作者" : "6th Author"}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <p
                    className="font-mono text-muted-foreground/28 tracking-widest mb-2"
                    style={{ fontSize: "0.56rem" }}
                  >
                    {lang === "zh" ? "贡献" : "Contributions"}
                  </p>
                  <div className="space-y-1.5">
                    {(lang === "zh"
                      ? ["用户研究设计与参与者协调", "数据预处理与统计分析", "研究结果可视化呈现", "AIGC 辅助设计全流程技能掌握"]
                      : ["User research design & participant coordination", "Data preprocessing & statistical analysis", "Visualization of research findings", "End-to-end AIGC-assisted design workflow"]
                    ).map((item) => (
                      <p
                        key={item}
                        className="text-sm text-muted-foreground/65 leading-relaxed"
                      >
                        · {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </ProfileCard>
          </ScrollReveal>
        </div>

        {/* ─── MODULE 6: 获奖经历 ──────────────────────────────── */}
        <ModuleDivider />
        <div className="pt-16 md:pt-20">
          <ScrollReveal>
            <SectionHeading code="M06" label={lang === "zh" ? "获奖经历" : "AWARDS"} />
          </ScrollReveal>

          <div className="space-y-5">
            {AWARDS.map((award, i) => (
              <ScrollReveal key={award.title} delay={i * 0.09}>
                {/* using ProfileCard wrapper; accent prop changes border to gold for iF */}
                <ProfileCard accent={award.highlight}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        {/* Gold award badge — only for highlighted (iF) */}
                        {award.highlight && (
                          <span
                            className="font-mono px-2 py-0.5 tracking-widest"
                            style={{
                              fontSize: "0.56rem",
                              border: "1px solid rgba(212,168,83,0.5)",
                              color: "#d4a853",
                              background: "rgba(212,168,83,0.06)",
                              letterSpacing: "0.14em",
                              borderRadius: "2px",
                            }}
                          >
                            iF Award
                          </span>
                        )}
                        <p
                          className="font-semibold text-foreground tracking-tight"
                          style={award.highlight ? { color: "#d4a853", opacity: 0.9 } : {}}
                        >
                          {award.title}
                        </p>
                      </div>
                      <p
                        className="font-mono text-muted-foreground/45 tracking-widest"
                        style={{ fontSize: "0.62rem" }}
                      >
                        {award.subtitle}
                        {award.project && (
                          <span className="ml-2 text-muted-foreground/30">
                            · {award.project}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p
                        className="font-mono tracking-widest mb-0.5"
                        style={{
                          fontSize: "0.62rem",
                          color: award.highlight ? "rgba(212,168,83,0.6)" : "rgba(90,176,232,0.5)",
                        }}
                      >
                        {award.date}
                      </p>
                      <p
                        className="font-mono text-muted-foreground/28 tracking-widest"
                        style={{ fontSize: "0.56rem" }}
                      >
                        {award.org}
                      </p>
                    </div>
                  </div>
                  <div
                    className="h-px mb-4"
                    style={{
                      background: award.highlight
                        ? "rgba(212,168,83,0.12)"
                        : "rgba(90,176,232,0.08)",
                    }}
                  />
                  {award.highlight ? (
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <div
                        className="flex-shrink-0 overflow-hidden"
                        style={{ borderRadius: "3px", border: "1px solid rgba(212,168,83,0.22)", width: "160px" }}
                      >
                        <img src={imgIFCert} alt="iF Award 证书" className="w-full h-full object-contain" />
                      </div>
                      <p className="text-sm text-muted-foreground/70 leading-relaxed flex-1">
                        {award.desc}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground/70 leading-relaxed">
                      {award.desc}
                    </p>
                  )}
                </ProfileCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ─── MODULE 7: 游戏与沉浸式体验 ─────────────────────── */}
        <ModuleDivider />
        <div className="pt-16 md:pt-20">
          <ScrollReveal>
            <SectionHeading code="M07" label={lang === "zh" ? "游戏与沉浸式体验" : "GAME & IMMERSIVE"} />
          </ScrollReveal>

          {/* Intro statement */}
          <ScrollReveal delay={0.05}>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xl mb-8">
              {lang === "zh"
                ? "这不是关于玩家身份的展示，而是关于如何用游戏思维与引擎工具解决真实设计问题——从验证交互假设，到探索沉浸式技术的产品应用边界。"
                : "This is not about being a gamer — it's about applying game-thinking and engine tools to real design problems: from validating interaction hypotheses to exploring the product boundaries of immersive technology."}
            </p>
          </ScrollReveal>

          {/* Project screenshot galleries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* VR / PICO 4 */}
            <ScrollReveal delay={0.04}>
              <div style={{ border: "1px solid rgba(90,176,232,0.15)", borderRadius: "4px", overflow: "hidden", background: "rgba(8,18,36,0.5)" }}>
                <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(90,176,232,0.1)" }}>
                  <span className="font-mono text-muted-foreground/40 tracking-widest" style={{ fontSize: "0.55rem" }}>VR EXPERIENCE · PICO 4</span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1">
                  {[imgProjVR1, imgProjVR2, imgProjVR3].map((src, idx) => (
                    <div key={idx} className="overflow-hidden" style={{ aspectRatio: "16/10" }}>
                      <img src={src} alt={`VR项目截图 ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            {/* Unreal Engine 5 */}
            <ScrollReveal delay={0.1}>
              <div style={{ border: "1px solid rgba(90,176,232,0.15)", borderRadius: "4px", overflow: "hidden", background: "rgba(8,18,36,0.5)" }}>
                <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(90,176,232,0.1)" }}>
                  <span className="font-mono text-muted-foreground/40 tracking-widest" style={{ fontSize: "0.55rem" }}>UNREAL ENGINE 5 · GAME DEV</span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-1">
                  {[imgProjUE1, imgProjUE2, imgProjUE3, imgProjUE4].map((src, idx) => (
                    <div key={idx} className="overflow-hidden" style={{ aspectRatio: "16/10" }}>
                      <img src={src} alt={`UE5项目截图 ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GAME_ITEMS.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                {/* Game module cards use hex CSS pattern for subtle differentiation */}
                <div
                  className="group relative p-6 overflow-hidden cursor-default transition-all duration-300"
                  style={{
                    border: "1px solid rgba(90,176,232,0.22)",
                    borderRadius: "4px",
                    background: "rgba(8,18,36,0.6)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  {/* Hex pattern overlay — unique to this module for subtle dynamism */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{
                      backgroundImage: [
                        "repeating-linear-gradient(60deg, rgba(90,176,232,0.035) 0px, rgba(90,176,232,0.035) 1px, transparent 1px, transparent 14px)",
                        "repeating-linear-gradient(-60deg, rgba(90,176,232,0.035) 0px, rgba(90,176,232,0.035) 1px, transparent 1px, transparent 14px)",
                      ].join(","),
                    }}
                  />
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(90,176,232,0.07) 0%, transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <p
                      className="font-mono text-primary/60 tracking-widest mb-2"
                      style={{ fontSize: "0.62rem", letterSpacing: "0.1em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-sm font-semibold text-foreground tracking-tight mb-2 leading-snug">
                      {item.title}
                    </p>
                    <div
                      className="h-px mb-3"
                      style={{ background: "rgba(90,176,232,0.09)" }}
                    />
                    <p className="text-sm text-muted-foreground/65 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {/* Left edge accent */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(90,176,232,0.5), transparent)",
                    }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ─── MODULE 8: 联系方式 ──────────────────────────────── */}
        <ModuleDivider />
        <div className="pt-16 md:pt-20">
          <ScrollReveal>
            <SectionHeading code="M08" label={lang === "zh" ? "联系方式" : "CONTACT"} />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: statement */}
            <ScrollReveal delay={0.06}>
              <div className="lg:col-span-5">
                <p
                  className="font-bold leading-tight tracking-tight text-foreground mb-4"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                >
                  {lang === "zh" ? "开放合作机会，" : "Open to collaboration —"}<br />
                  <span className="text-primary">{lang === "zh" ? "欢迎联系。" : "let's talk."}</span>
                </p>
                <p className="text-sm text-muted-foreground/65 leading-relaxed">
                  {lang === "zh"
                    ? "如果你在寻找一位能够同时理解设计、工程与用户研究的设计师，请随时发起对话。"
                    : "If you are looking for a designer who understands design, engineering, and user research in equal measure, feel free to reach out."}
                </p>
              </div>
            </ScrollReveal>

            {/* Right: contact list */}
            <div className="lg:col-span-7">
              <ProfileCard>
                <div className="space-y-0">
                  {CONTACT_ITEMS.map((item, i) => (
                    <ScrollReveal key={`${item.label}-${i}`} delay={0.08 + i * 0.06}>
                      <div>
                        {i > 0 && (
                          <div
                            className="h-px"
                            style={{ background: "rgba(90,176,232,0.07)" }}
                          />
                        )}
                        <div className="flex items-center justify-between py-4 group">
                          <span
                            className="font-mono text-muted-foreground/28 tracking-widest w-20 flex-shrink-0"
                            style={{ fontSize: "0.56rem" }}
                          >
                            {item.label}
                          </span>
                          {item.href ? (
                            /* using <a> directly: no kit Link component exists; this is a semantic anchor */
                            <a
                              href={item.href}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel="noopener noreferrer"
                              className="font-mono text-muted-foreground/65 hover:text-primary transition-colors duration-200 tracking-wide text-right"
                              style={{ fontSize: "0.68rem" }}
                            >
                              {item.value}
                              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary">
                                →
                              </span>
                            </a>
                          ) : (
                            <span
                              className="font-mono text-muted-foreground/55 tracking-wide text-right"
                              style={{ fontSize: "0.68rem" }}
                            >
                              {item.value}
                            </span>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ProfileCard>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <div className="relative" style={{ background: "rgba(6,10,19,0.80)" }}>
        <div
          className="mx-8 md:mx-14"
          style={{ height: "1px", background: "rgba(90,176,232,0.07)" }}
        />
        <div className="py-10 px-8 md:px-14 flex items-center justify-between font-mono text-xs tracking-[0.18em] text-muted-foreground/28">
          <span>CHRONICLE KIT v1.0</span>
          <span>{lang === "zh" ? "江圣鑫 · 记录者工具包" : "Shengxin Jiang · The Chronicler's Toolkit"}</span>
        </div>
      </div>
    </div>
  );
}
