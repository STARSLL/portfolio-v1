# Design Tokens

## 色彩

| Token | 值 | 用途 |
|-------|----|------|
| `--bg-page` | `#0f1420` | 页面底层背景 |
| `--bg-surface` | `#1a2235` | 卡片、面板表面 |
| `--bg-surface-2` | `#1f2a40` | 次级表面、hover 状态 |
| `--border` | `#2a3550` | 所有边框 |
| `--text-primary` | `#e5e9f0` | 主要文字 |
| `--text-secondary` | `#9aa5b8` | 次要文字 |
| `--text-muted` | `#5a6a85` | 辅助文字、占位文字 |
| `--accent-primary` | `#4a9eff` | 主强调色（蓝） |
| `--accent-secondary` | `#6ee7ff` | 次强调色（冰蓝） |
| `--accent-gradient` | `linear-gradient(135deg, #4a9eff, #6ee7ff)` | 渐变强调 |
| `--gold` | `#d4a853` | 获奖、特殊高亮 |

## 语义色（可选）

| Token | 值 |
|-------|----|
| `--success` | `#34d399` |
| `--warning` | `#d4a853` |
| `--error` | `#f87171` |

## 圆角

| Token | 值 |
|-------|----|
| `--radius-card` | `4px` |
| `--radius-button` | `4px` |
| `--radius-tag` | `4px` |

## 间距

基础单位 **8px**。

| Token | 值 |
|-------|----|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `16px` |
| `--space-4` | `24px` |
| `--space-5` | `32px` |
| `--space-6` | `48px` |
| `--space-7` | `64px` |
| `--space-8` | `80px` |
| `--space-9` | `96px` |
| `--space-10` | `128px` |

## 动效

| Token | 值 |
|-------|----|
| `--duration-micro` | `150ms` |
| `--duration-scroll` | `500ms` |
| `--duration-anchor` | `700ms` |
| `--duration-hero` | `1000ms` |
| `--ease-micro` | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| `--ease-scroll` | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## 使用原则

1. 所有颜色使用 Token，禁止硬编码原始 hex 值。
2. 所有间距使用 8px 倍数，使用 Token 引用。
3. 圆角统一用 `--radius-*` Token，不得随意调整。
4. 动效时长与缓动使用 `--duration-*` 和 `--ease-*` Token。