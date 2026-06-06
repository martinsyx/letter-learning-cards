# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ABC字母学习小程序 — A WeChat Mini Program for children (5+) to learn English alphabet letters with pronunciation. Built with **Taro 3.6 + React 18 + TypeScript + SCSS**.

**⚠️ Dual codebase**: This repo contains both an active Taro Mini Program (`src/`) and a **legacy Next.js web app** (`app/`, `components/`, `hooks/`, `lib/`, `styles/`). The legacy code is not used by the Taro build. Do not modify legacy files unless explicitly asked.

## Build Commands

```bash
pnpm install          # Install dependencies (use pnpm, not npm)

# Development (with hot reload)
pnpm dev:weapp        # WeChat Mini Program (primary target)
pnpm dev:h5           # H5 Web

# Production build
pnpm build:weapp      # WeChat Mini Program
pnpm build:h5         # H5 Web
```

After `dev:weapp` or `build:weapp`, open the `dist/` directory in WeChat DevTools.

**No tests, linter, or formatter are configured.** There is no `pnpm test` or `pnpm lint`.

## Architecture

### Active Codebase (`src/`)

Single-page app with one route: `pages/index/index`.

| File | Role |
|------|------|
| `src/app.tsx` | Taro entry point (class component) |
| `src/app.config.ts` | Mini program config (pages, nav bar) |
| `src/pages/index/index.tsx` | **Main page** (~556 lines) — all UI logic in one class component |
| `src/pages/index/index.scss` | Styles (~648 lines) — Apple-inspired design, rpx units, blur effects |
| `src/data/letters.ts` | Static data: 26 letters × 4 words each, with emoji and IPA phonetics |
| `src/utils/audio.ts` | `AudioManager` class — Youdao TTS primary, Google TTS fallback |
| `src/utils/dictionary.ts` | Free Dictionary API for phonetic lookup (used when adding custom words) |
| `src/utils/image.ts` | Word-to-emoji mapping (~150 entries) for custom word icons |

### Config (`config/`)

- `config/index.ts` — Taro build config: 750rpx design width, webpack5, React framework
- Path alias: `@/*` → `./src/*` (configured in `tsconfig.json`)

### Key Design Decisions

- **Class components** — the app uses React class components, not hooks/functional components
- **rpx units** — all sizing uses rpx (750 design width); do not use px for responsive layouts
- **Touch swipe** — letter navigation via touch events (`onTouchStart`/`onTouchMove`/`onTouchEnd`), not a swiper library
- **Local storage** — custom words persisted via `Taro.getStorage`/`Taro.setStorage`
- **Two grid layouts** — 2×2 grid (default 4 words) switches to 3-column grid when custom words are added

### Audio System

`AudioManager` in `src/utils/audio.ts` uses `Taro.createInnerAudioContext()`:

1. **Primary**: Youdao Dictionary API — `https://dict.youdao.com/dictvoice?audio=<word>&type=2`
2. **Fallback**: Google Translate TTS — `https://translate.google.com/translate_tts?tl=en&q=<word>`
3. On complete failure: shows `Taro.showToast` error

**WeChat backend config required**: Add `dict.youdao.com` and `translate.google.com` to the request domain whitelist.

### WeChat Mini Program

- **AppID**: `wxd23145c5b18e8405`
- **Output**: `dist/` directory
- **project.config.json**: miniprogramRoot set to `dist/`
- Taro component tags must be used: `<View>` not `<div>`, `<Text>` not `<span>`, `<Image>` not `<img>`

### TypeScript

- Target: ES2015, JSX: `react-jsx`
- `noImplicitAny: false` — implicit any is allowed
- `strictNullChecks: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
