# Figma Make Rules

## 生成原则

1. **先确认设计系统，再生成页面。** 所有 Token、字体、间距、动效在生成页面前已定义。
2. 所有页面必须使用 `tokens.md` 中的 CSS 变量。
3. 所有字体遵循 `typography.md`。
4. 所有间距遵循 `spacing-grid.md`（8px 基础单位）。
5. 所有动效遵循 `motion.md`。
6. 所有响应式行为遵循 `responsive.md`。
7. 视觉风格遵循 `art-direction.md`。

## Prompt 模板

生成一个个人作品集网站页面。视觉风格：理性主导，冷灰蓝基底，几何切割，玻璃折射质感，秩序中的破碎，大面积留白。使用已定义的设计系统 tokens。不要使用默认圆角、默认字体、彩色图标。项目封面 16:9，图片保持清晰。毛玻璃仅用于卡片信息区或背景。

## 禁止

| 禁止项 | 说明 |
|--------|------|
| Google Fonts CDN | 字体本地托管；MVP 可用 Google Fonts 临时代替，但须标注 |
| Inter / Roboto / Arial 作为主字体 | 主英文字体为 Unbounded |
| 大圆角 | 圆角统一 4px，不得超过 8px |
| 高饱和色 | 仅使用 Token 色彩，禁止随意引入高饱和色 |
| 彩色图标 / 面性图标 | 只用线性几何图标 |
| 对项目封面图做强模糊 | 图片保持清晰，毛玻璃只用于信息层 |
| 忽略移动端适配 | 每个组件必须有移动端行为定义 |
| 8px 栅格外的随意间距 | 所有间距必须是 8px 的倍数 |
| 硬编码 hex 颜色值 | 始终引用 Token 变量 |

## 组件生成顺序

1. 全局 Token 和 CSS 变量
2. 全局组件（NavBar、Footer、IconButton）
3. 首页（Hero、ProjectCard、Button）
4. 项目总览页
5. 项目详情页
6. 个人资料页

## Token 映射（Tailwind ↔ CSS 变量）

当前 theme.css 中的 Tailwind Token 名称与设计系统 Token 名称的对应关系：

| 设计系统 Token | theme.css / Tailwind 对应 |
|----------------|--------------------------|
| `--bg-page` | `--background` / `bg-background` |
| `--bg-surface` | `--card` / `bg-card` |
| `--border` | `--border` / `border-border` |
| `--text-primary` | `--foreground` / `text-foreground` |
| `--text-secondary` | `--muted-foreground` / `text-muted-foreground` |
| `--accent-primary` | `--primary` / `text-primary` / `bg-primary` |
