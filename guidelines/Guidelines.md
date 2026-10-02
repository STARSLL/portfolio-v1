# ChronicleKit — Design System Guidelines
**Version 1.1 · 记录者工具包**

## 阅读顺序

生成任何 UI 前必须按顺序阅读以下文件：

1. `guidelines/art-direction.md` — 视觉方向、构图规则、禁止事项
2. `guidelines/tokens.md` — 色彩、间距、圆角、动效 Token
3. `guidelines/typography.md` — 字体栈、使用规则、中英文混排
4. `guidelines/spacing-grid.md` — 间距单位、留白规范、栅格系统
5. `guidelines/components.md` — 全局与页面级组件清单
6. `guidelines/motion.md` — 动效基调、时长、缓动、渐入规则
7. `guidelines/responsive.md` — 断点、各页响应式行为
8. `guidelines/figma-make-rules.md` — 生成原则、Prompt 模板、禁止事项

---

ChronicleKit is a cold gray-blue, geometric design system for technical and industrial portfolios. It draws from military-precision aesthetics and document composition — inspired by Arknights 众生行记: precise, fragmented order, divine rationality meeting engineering logic.

---

## Core Principles

1. **Precision over decoration** — Every element has structural purpose. Lines define space, not ornament.
2. **Fragmented order** — Visual complexity from systematic repetition of simple geometric rules.
3. **Typography as composition** — Text participates in the visual structure at every scale.
4. **Cold rationality** — Cool blue-gray palette exclusively. No warmth, no organic gradients.
5. **Glass and depth** — Layering through opacity and blur, not shadows or elevation.

---

## Reading Order

Before generating any UI:

1. `guidelines/Guidelines.md` — this file, orientation
2. `guidelines/tokens.md` — complete token reference
3. `guidelines/components.md` — component inventory and API

---

## Typography

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Display | Space Grotesk | 700 | Hero headings, large identifiers |
| Heading | Space Grotesk | 500–600 | Section titles |
| Body | Space Grotesk | 400 | Paragraph text, descriptions |
| Label / Code | Space Mono | 400–700 | Archive codes, data labels, tags |
| CJK Display | Noto Serif SC | 300–700 | Chinese characters in display contexts |

Google Fonts import lives in `src/styles/fonts.css`.
Apply the kit font stack: `font-family: 'Space Grotesk', 'Noto Serif SC', system-ui, sans-serif;`

---

## Color Palette

Built on deep navy base `#060A13` with single icy blue accent `#5AB0E8`. No warm tones anywhere.

| Role | Token | Value |
|------|-------|-------|
| Page background | `--background` | `#060A13` |
| Primary text | `--foreground` | `#C8D8EE` |
| Card surface | `--card` | `#0A1525` |
| Icy blue accent | `--primary` | `#5AB0E8` |
| Muted text | `--muted-foreground` | `#4E6A8E` |
| Border (subtle) | `--border` | `rgba(90,176,232,0.14)` |

See `guidelines/tokens.md` for the complete token list.

---

## Geometry

- **Corner radius**: 2px (`--radius: 0.125rem`) — sharp, almost none
- **Angular cuts**: CSS `clip-path` for diagonal/geometric element cuts
- **Borders**: Always 1px, semi-transparent blue-tinted
- **Diagonal lines**: 25°–45° decorative lines at 4–8% opacity
- **Corner brackets**: L-shaped marks defining section boundaries

---

## Motion

- **Entrance**: Fade + translateY(20px), 600–800ms, easing `[0.16, 1, 0.3, 1]`
- **Hover lift**: translateY(-4px), 250–300ms ease
- **Particles**: Continuous drift at 0.35px/frame; mouse-proximity clustering within 160px radius
- **Color/opacity transitions**: 200–300ms linear on all interactive states

---

## Component Inventory

See `guidelines/components.md` for usage and API.

Available components:
- `ParticleCanvas` — interactive particle field background
- `NavBar` — fixed glass navigation bar
- `ProjectCard` — document-style project showcase card
- `TagChip` — angular inline category/skill label
- `Button` — CTA button with animated side lines
- `GeomDecorator` — geometric decorative overlay layer
