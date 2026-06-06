# ABC Learning 小程序版

这是一个基于 Taro 框架开发的字母学习小程序，支持微信小程序、支付宝小程序等多个平台。

## 技术栈

- Taro 3.6+
- React 18
- TypeScript
- SCSS

## 项目结构

```
├── config/                 # 配置文件
│   ├── index.ts           # 主配置
│   ├── dev.ts            # 开发环境配置
│   └── prod.ts           # 生产环境配置
├── src/
│   ├── app.tsx           # 应用入口
│   ├── app.config.ts     # 小程序配置
│   ├── app.scss          # 全局样式
│   ├── data/             # 数据文件
│   │   └── letters.ts    # 字母和单词数据
│   └── pages/            # 页面
│       └── index/        # 首页
│           ├── index.tsx
│           └── index.scss
└── project.config.json   # 小程序项目配置
```

## 开发命令

```bash
# 安装依赖
npm install

# 微信小程序
npm run dev:weapp

# 支付宝小程序
npm run dev:alipay

# 百度小程序
npm run dev:swan

# 字节跳动小程序
npm run dev:tt

# H5
npm run dev:h5
```

## 构建命令

```bash
# 微信小程序
npm run build:weapp

# 支付宝小程序
npm run build:alipay

# 百度小程序
npm run build:swan

# 字节跳动小程序
npm run build:tt

# H5
npm run build:h5
```

## 功能特性

- ✅ 26个字母学习卡片
- ✅ 每个字母配4个相关单词
- ✅ 点击发音（真人录音 + TTS降级）
- ✅ 慢放模式
- ✅ 沪教版/沪教牛津版单词库（待完成）
- ✅ 自定义单词功能（待完成）

## 音频说明

小程序音频播放使用 `Taro.createInnerAudioContext()`，支持：
1. 优先播放本地音频文件（`/audio/` 目录）
2. 失败时使用微信同声传译插件进行TTS合成

## 注意事项

1. 需要在微信公众平台配置同声传译插件（appid: `wx069ba97219f66d99`）
2. 音频文件需要放在 `src/assets/audio/` 目录
3. 小程序包大小限制为2MB（主包），注意控制资源大小

## 从 Next.js 迁移的主要变化

1. **组件标签**: `div` → `View`, `img` → `Image`
2. **样式单位**: `px` → `rpx` (750rpx = 屏幕宽度)
3. **API调用**: 使用 `Taro.xxx` 代替浏览器API
4. **音频播放**: `InnerAudioContext` 代替 `HTMLAudioElement`
5. **本地存储**: `Taro.getStorage` 代替 `localStorage`
6. **路由**: 使用 Taro 导航API
