# 修复小程序体验检测问题

## Goal

修复微信小程序体验检测未通过的两个问题：移除 CSS `:active` 点击态实现，并扩大首页分页点的真实可点击响应区域，避免滚动误触和难以点中的体验问题。

## What I Already Know

- 检测报告指出存在 CSS `:active` 伪类点击态，应改用小程序组件 `hover-*` 能力。
- 检测报告指出 `pages/index/index` 的 `.indicator-dot` 点击区域只有数 rpx，响应区域过小。
- 当前实现集中在 `src/pages/index/index.tsx` 和 `src/pages/index/index.scss`。
- `src/pages/index/index.scss` 中存在多处 `&:active`。
- 当前分页点的 `onClick` 直接挂在 `.indicator-dot` 小圆点上，伪元素透明区域不足以稳定通过检测。

## Requirements

- 移除首页样式中的所有 CSS `:active` 伪类点击态。
- 对需要点击态反馈的组件改用 Taro/小程序 `hoverClass`。
- 首页分页点使用真实外层点击容器承载 `onClick`，响应区域不小于 64rpx x 64rpx。
- 保持分页点视觉尺寸和当前页面高亮效果基本不变。
- 不改变字母发音、单词发音、弹窗、分页跳转等业务行为。

## Acceptance Criteria

- [x] `src/pages/index/index.scss` 中不再存在 `:active`。
- [x] 首页分页点的点击事件挂在真实大尺寸组件上，而不是小视觉点上。
- [x] 交互组件的按压态通过 `hoverClass` 对应的样式类实现。
- [x] 微信小程序体验检测中的这两个问题应可重新通过。
- [x] 项目微信小程序构建通过。

## Definition of Done

- 代码改动范围控制在首页相关文件。
- 构建验证通过，或明确记录无法验证原因。
- 不记录知识库：本次属于局部体验检测修复，不改变核心业务或架构。

## Technical Approach

- 在 `index.tsx` 为可点击 `View` 添加 `hoverClass`，将原本 `:active` 样式迁移为对应 `*-hover` 类。
- 将分页指示器改为外层 `.indicator-hit-area` 负责点击和响应区域，内层 `.indicator-dot` 只负责视觉显示。
- 删除 `.indicator-dot::after` 透明伪元素，避免检测仍识别为小组件点击区域。

## Out of Scope

- 不重设计首页视觉风格。
- 不调整页面布局、数据结构或音频播放逻辑。
- 不处理体验检测报告未列出的其他潜在可点击区域。

## Technical Notes

- 相关文件：
  - `src/pages/index/index.tsx`
  - `src/pages/index/index.scss`
- 验证命令：
  - `npm run build:weapp`
