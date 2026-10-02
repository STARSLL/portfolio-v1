# Components

## 全局组件

### 顶部导航栏（NavBar）
- 桌面：水平导航，固定顶部，滚动隐藏，上滚出现。
- 移动端：汉堡菜单，全屏展开。
- 背景：毛玻璃 `bg-surface/80 backdrop-blur`。
- Logo 在左，导航链接在右。

### 页脚（Footer）
- 最简化：版权 + 社交链接图标按钮。
- 上方留白 `space-10`（128px）。

### 图标按钮（IconButton）
- 线性几何风格，线宽 1.5–2px，颜色 `--text-secondary`。
- 不使用彩色图标、面性图标、手绘图标。
- Hover：颜色切换至 `--accent-primary`。

### 链接（Link）
- 默认色 `--text-secondary`（`#9aa5b8`）。
- Hover / Active：`--accent-primary`（`#4a9eff`）。

---

## 首页组件

### 首屏定位区（Hero）
- 定位语（大标题）+ 核心标签 + 联系方式图标按钮。
- 粒子动效背景 + 蓝图几何层。
- 大面积留白，文字参与画面构成。

### 代表项目卡片（ProjectCard）
- 封面图 16:9，图片清晰，不做强模糊。
- 信息区：玻璃质感背景，4px 圆角，边框 `1px #2a3550`。
- 包含：封面 / 标题 / 标签 / 时间。
- 尺寸变体：大 / 中 / 小。
- 桌面：一行三列；移动：单列堆叠。

### 主按钮（Button）
- 文案「了解更多项目」，居中显示。
- 变体：大 / 中 / 小；样式：outline / ghost。
- 圆角 `--radius-button`（4px）。

---

## 项目总览组件

### 标签筛选按钮（FilterTag）
- 多选并集，选中态高亮（`--accent-primary` 边框 + 背景）。
- 不显示数量。

### 侧边筛选面板（FilterPanel）
- 桌面：固定在左侧。
- 移动：折叠，顶部非固定，滚动后消失。

### 项目卡片（ProjectCard）
- 封面 / 标题 / 标签 / 时间。
- 桌面三列，平板三列，移动单列。

---

## 项目详情组件

### 面包屑（Breadcrumb）
- 「项目总览 / 项目名称」。

### 锚点导航（AnchorNav）
- 桌面：右侧固定；移动：折叠面板。

### 模块容器（SectionContainer）
- 统一间距与标题样式。

### 图片展示（ImageDisplay）
- 单图 / 多图 / 全宽图三种模式。

### 媒体容器（MediaContainer）
- 视频 / 原型演示容器，16:9 比例。

### 数据高亮块（DataHighlight）
- 数据或结果高亮呈现，强调数字与结论。

### 下一项目卡片（NextProjectCard）
- 页尾跳转至下一个项目。

---

## 个人资料组件

### 模块卡片（ProfileCard）
- 统一卡片样式，4px 圆角，边框 `1px #2a3550`。

### 技能标签（SkillTag）
- 小型标签，等宽字体，字距略宽。

### 时间线条目（TimelineItem）
- 左侧竖线 + 日期 + 内容。

### 获奖条目（AwardItem）
- 可显示 `--gold` 色金色标记。

---

## 规则

- 基础组件 + 样式，暂不做全量变体。
- 按钮和卡片需要尺寸变体：**大 / 中 / 小**。
- 不需要加载、空、错误状态；筛选无结果显示「无」。
- 所有组件遵循 `tokens.md` 中的色彩、圆角、间距规范。

---

## Kit 组件（当前已实现）

| 组件 | 路径 | 说明 |
|------|------|------|
| `ParticleCanvas` | `src/ChronicleKit/components/ParticleCanvas.tsx` | 粒子动效背景 |
| `NavBar` | `src/ChronicleKit/components/NavBar.tsx` | 顶部导航 |
| `ProjectCard` | `src/ChronicleKit/components/ProjectCard.tsx` | 项目卡片 |
| `TagChip` | `src/ChronicleKit/components/TagChip.tsx` | 标签芯片 |
| `Button` | `src/ChronicleKit/components/Button.tsx` | CTA 按钮 |
| `BlueprintBg` | `src/ChronicleKit/components/BlueprintBg.tsx` | 蓝图几何背景层 |
| `GeomDecorator` | `src/ChronicleKit/components/GeomDecorator.tsx` | 几何装饰层 |