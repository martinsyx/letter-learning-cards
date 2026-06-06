# 迁移 Next.js 添加单词功能改进到 Taro 小程序

## Goal

将 `C:\workspace\letter-learning-cards\` (Next.js) 项目中"添加单词"功能的所有改进迁移到当前 Taro 小程序项目，包括：emoji 增强、emoji picker、以及**沪教版/沪教牛津版年级单词库**。适配小程序架构（class 组件 + Taro API）。

## What I already know

**源项目 (Next.js) 的改进点：**
- `iconMap` 有 ~700+ 条目（vs 目标项目 ~350 条），覆盖动物、食物、物品、自然、身体、人物、颜色、数字、动作、季节、时间、地点等更多分类
- `getIconForWord()` 使用多策略匹配：直接匹配 → 连字符匹配 → 部分词匹配 → 包含匹配 → 兜底 `📝`
- 有独立的 `EmojiPicker` 组件（9 个分类 tab + 搜索 + 网格选择）
- 添加单词时自动尝试匹配图标，匹配失败才弹出 emoji picker
- **沪教版** 年级单词库：hujiaoGrade1-6Words（6 个年级）
- **沪教牛津版** 年级单词库：grade1-5Words（5 个年级）
- 多级弹窗：选择教材 → 选择年级 → 勾选单词 → 显示在卡片上
- `selectedExtraWords` 机制：toggle 式勾选单词，控制是否显示在主卡片上

**目标项目 (Taro) 现状：**
- `wordEmojiMap` ~350 条目，只做精确匹配
- `fetchWordImages()` 只返回匹配结果，无多策略匹配
- 图片选择器只显示搜索结果（通常 0-1 个 emoji），无分类浏览
- 已有音标自动获取（Free Dictionary API，比源项目更好）
- 已有重复检查（源项目没有）

**架构差异：**
- 源：React hooks (`useState`) + `div`/`span` + `localStorage`
- 目标：Taro class 组件 (`Component`) + `View`/`Text` + `Taro.getStorage`

## Decision (ADR-lite)

**Context**: emoji picker 需要 9 个分类 tab + 搜索 + 网格，小程序原生组件无法满足
**Decision**: 使用自定义浮层弹窗，复用现有 `image-picker-overlay` 的弹出模式
**Consequences**: 需要新增 SCSS 样式，但交互体验与现有 UI 风格一致

## Requirements (final)

### Part A: Emoji 增强（image.ts）
1. 扩展 `wordEmojiMap` 到 ~700+ 条目，合并源项目新增的分类
2. `getIconForWord` 新增多策略匹配：精确 → 连字符 → 部分词 → 包含匹配 → 兜底 `📝`
3. 修改 `addWordToList` 流程：自动匹配 emoji → 匹配成功直接填充 → 失败弹出 emoji picker

### Part B: Emoji Picker 组件
4. 新建自定义浮层 emoji picker（分类 tab + 搜索 + emoji 网格），替换现有图片选择器

### Part C: 年级单词库
5. 新建 `src/data/grade-words.ts`，存放沪教版（6 个年级）和沪教牛津版（5 个年级）单词数据
6. 重构弹窗为多级结构：选择教材 → 选择年级 + 自定义 → 勾选/添加单词
7. 新增 `selectedExtraWords` 状态：控制哪些额外单词显示在主卡片上
8. 年级单词使用 toggle 勾选模式（不存入 customWords），自定义单词使用现有添加/删除模式

### 保留
9. 保留音标自动获取（Free Dictionary API）
10. 保留重复检查

## Acceptance Criteria

- [ ] `src/utils/image.ts` 的 emoji 映射覆盖 700+ 单词
- [ ] 输入 "ant" 等常见词直接返回对应 emoji，无需手动选择
- [ ] 输入 "xylophone" 等冷门词弹出 emoji picker 让用户手动选
- [ ] emoji picker 有分类 tab 和搜索功能
- [ ] 弹窗有 3 个入口：沪教版、沪教牛津版、自定义
- [ ] 选择沪教版后显示年级 tab (1-6)，每个年级有对应的单词列表
- [ ] 选择沪教牛津版后显示年级 tab (1-5)
- [ ] 年级单词可以 toggle 勾选/取消勾选
- [ ] 被勾选的年级单词出现在主卡片上，可点击发音
- [ ] 自定义单词流程保持不变（输入 → 自动匹配 emoji → 加入预览 → 保存）
- [ ] 所有改动使用 Taro 组件（View/Text/Input/ScrollView），不使用 HTML 标签

## Definition of Done

- `pnpm dev:weapp` 构建无报错
- 在微信开发者工具中测试添加单词流程正常
- emoji picker 各分类可正常浏览和选择
- 沪教版/沪教牛津版各年级单词可正常浏览和勾选

## Out of Scope (explicit)

- Next.js 源项目中的 `app/api/` 路由
- 音频缓存系统（源项目用 `AudioCache`，目标项目用 `AudioManager`）
- `selectedExtraWords` 的持久化（源项目也没有持久化，刷新后重置）

## Technical Notes

- 源文件：`C:\workspace\letter-learning-cards\app\page.tsx` (iconMap L1327-1744, 年级数据 L7-1055, 弹窗 UI L2188-2476)
- 源 emoji picker：`C:\workspace\letter-learning-cards\components\emoji-picker.tsx`
- 目标 image.ts：`src/utils/image.ts`
- 目标主页面：`src/pages/index/index.tsx`
- 目标样式：`src/pages/index/index.scss`
- 新增数据文件：`src/data/grade-words.ts`

### 关键状态新增（目标项目 PageState）
```typescript
selectedTextbook: string | null     // "沪教" | "沪教牛津" | "自定义" | null
selectedGrade: number               // 1-6
selectedExtraWords: Record<string, string[]>  // toggle 勾选的年级单词
showEmojiPicker: boolean            // emoji picker 浮层
```

### 弹窗层级结构
```
Level 0: 主页面（无弹窗）
  → 点击"添加"按钮
Level 1: 选择教材
  → 沪教版 / 沪教牛津版 / 自定义
Level 2a (沪教/沪教牛津): 年级 tab + 单词列表（toggle 勾选）
Level 2b (自定义): 单词输入 + emoji picker（现有流程）
```
