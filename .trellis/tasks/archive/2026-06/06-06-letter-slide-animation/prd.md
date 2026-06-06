# 字母切换滑动动画

## Goal

在微信小程序字母卡片左右滑动切换时，展示轻量的左右滑动动画，让切换方向可感知，同时尽量减少小程序运行开销。

## What I Already Know

* 当前项目是 Taro 3.6 + React 18 + TypeScript + SCSS 的 ABC 字母学习小程序。
* 主页面是 `src/pages/index/index.tsx`，样式是 `src/pages/index/index.scss`。
* 当前页面已使用 `onTouchStart` / `onTouchEnd` 自行判断左右滑动，没有使用 swiper 组件。
* 当前 `nextPage` / `prevPage` / `goToPage` 只更新 `currentPage`，切换没有方向动画。

## Requirements

* 手指拖拽时，整个卡片内容（字母 + 单词卡片）实时跟随手指水平移动（跟手动画）。
* 松手后根据拖拽距离和速度决定：超过阈值则完成切换（弹出剩余距离 + 切换数据 + 新页滑入），未超过阈值则回弹到原位。
* 顶部上一页/下一页按钮切换时使用对应方向的滑动动画，保持体验一致。
* 点选底部字母进度点时按目标页相对当前页自动决定动画方向。
* 到达 A/Z 边界时拖拽有阻尼效果（damping），松手回弹，不触发切换。
* 动画使用 `Taro.createAnimation` 驱动，跟手阶段 duration=0 实现实时跟随。

## Acceptance Criteria

* [ ] 手指拖拽时，整个 `.card-content` 区域（字母 + 单词）实时跟随手指水平移动。
* [ ] 松手后超过阈值（80px 或高速滑动）时，完成页面切换并有滑出/滑入动画。
* [ ] 松手后未超过阈值时，内容回弹到原位。
* [ ] 在第一页向右拖拽或最后一页向左拖拽时有阻尼效果，松手回弹。
* [ ] 点击导航按钮和底部进度点时动画方向正确（复用 `changePage`）。
* [ ] 项目构建或类型检查通过可用的本地命令验证。

## Definition of Done

* 代码改动范围保持在主页面交互和样式。
* 不新增运行时依赖。
* 通过 Taro 构建或等价质量检查。
* 若发现新的项目约定，按 Trellis 要求补充规格文档。

## Technical Approach

在 `onTouchMove` 中用 `Taro.createAnimation`（duration=0）驱动 `.card-content` 整体实时跟手平移。松手时根据偏移距离/速度判断切换或回弹。`animation` 属性从 `.letter-section` 移到 `.card-content`，让字母和单词卡片一起跟随拖拽。按钮/进度点触发的 `changePage()` 保持程序式动画逻辑。

## Decision (ADR-lite)

**Context**: 用户希望拖拽字母卡片时内容跟随手指移动，类似原生滑动体验。  
**Decision**: 在 `onTouchMove` 中用 duration=0 的 `Taro.createAnimation` 实时更新 translateX，松手后根据距离/速度决定切换或回弹，动画范围扩大到整个 `.card-content`。  
**Consequences**: 需要在 `onTouchMove` 中频繁调用 `createAnimation` + `setState`，但 duration=0 的 animation 不触发过渡计算，开销可控。

## Out of Scope

* 不引入 swiper 或第三方动画库。
* 不重构主页面结构或字母数据模型。

## Technical Notes

* 相关文件：`src/pages/index/index.tsx`、`src/pages/index/index.scss`。
* 当前触摸阈值是横向位移大于纵向位移且大于 50px。
