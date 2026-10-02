# Typography

## 字体栈

| 用途 | 字体 |
|------|------|
| 英文与数字 | Unbounded |
| 中文 | 素材集市智造黑 |
| 等宽 / 技术标签 | SF Mono, Menlo, Consolas, monospace |

## 使用规则

- **英文优先 Unbounded，中文优先素材集市智造黑。**
- 标题使用细字重 + 宽体。英文用 Unbounded ExtraLight/Light，中文用素材集市智造黑细字重。
- 首屏大标题：大字号、细字重、宽体、行高紧凑（line-height 1.05–1.1）。
- 模块标题：Medium / SemiBold。
- 正文：Regular，行高 1.7。
- 标签、元信息、数据：等宽字体，小字号，字距略宽（letter-spacing 0.08–0.15em），可全大写或半角。

## 字号层级（参考）

| 层级 | 大小 | 字重 | 字体 |
|------|------|------|------|
| 首屏超大标题 | clamp(4rem, 10vw, 10rem) | 200–300 | Unbounded |
| 页面标题 h1 | clamp(2.5rem, 6vw, 5rem) | 300 | Unbounded |
| 区块标题 h2 | clamp(1.5rem, 3vw, 2.5rem) | 500 | Unbounded |
| 模块小标题 h3 | 1.125rem | 500 | Unbounded |
| 正文 | 1rem | 400 | 系统/中文回退 |
| 标签 / 元信息 | 0.75rem | 400 | 等宽 |

## 中英文混排

- 不强行同一字族。
- 英文与数字走 Unbounded，中文走素材集市智造黑。
- 保持基线对齐和视觉重量平衡。
- 混排时在中英文之间保留 0.25em 的细小间距（可用零宽空格或 CSS `word-spacing`）。

## 字体加载

- 本地托管，**不使用 Google Fonts CDN**。
- 正式版做子集化（仅打包实际用到的字形）。
- MVP 阶段：Unbounded 可暂用 Google Fonts；中文用系统字体回退（`"PingFang SC", "Microsoft YaHei", sans-serif`）。
- 回退栈示例：`"Unbounded", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif`
