# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start dev server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** (configured inline in `globals.css`, not `tailwind.config`)
- **Framer Motion** (always use `LazyMotion` with `domAnimation` features only)
- **React Compiler** enabled in `next.config.mjs` (automatic memoization — avoid manual `useMemo`/`useCallback`)
- Path alias: `@/*` → `./src/*`

## Architecture

### Intent-Based Landing System

This is a conversion-optimized landing page for a Korean driving school (고수도봉). The core architecture is **intent-based**: 5 customer intents (speed, skill, cost, phobia, practice) each define a complete content variant with unique hero, USP, pricing, theme color, and design style.

### Data Flow

All page content is centralized in `src/data/siteConfig.ts` (~730 lines). Components receive sliced data + theme as props from `page.tsx`. To change content, edit `siteConfig.ts` — not individual components.

```
siteConfig.ts → page.tsx (selects intent) → Components (data + theme props)
```

### Component Pattern

- **Server Components**: Default. Used for static presentation (e.g., `Hero`).
- **Client Components**: Marked with `"use client"`. Used for scroll behavior, video playback, animation state, API calls.
- Components are theme-aware: they receive a `theme` color string and apply it via inline styles or Tailwind classes.

### Key Files

- `src/data/siteConfig.ts` — Central content configuration (edit this for content changes)
- `src/app/page.tsx` — Landing page assembly, selects intent data
- `src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `src/lib/structuredData.tsx` — JSON-LD schema generators for SEO

### Tailwind v4 Theme

Custom theme is defined in `src/app/globals.css` via `@theme` block:
- Brand colors: `brand-yellow` (#FECE48), `brand-black` (#111827)
- Custom fonts: `font-sans` (Pretendard), `font-hakgyoansim`, `font-retrosans`
- Custom animations: `fadeInUp`, `fadeIn`, `pulse-soft`

## Performance Conventions

- Prefer CSS animations/keyframes over Framer Motion for LCP-critical sections
- Videos use `preload="none"` or `preload="metadata"` with Intersection Observer for auto-play/pause
- Use Next.js `Image` component for all images (WebP preferred)
- Fonts are loaded locally with `display: swap`

## External Integrations

- Vercel Analytics & Speed Insights (in `layout.tsx`)
- Naver Booking / Naver Place links for CTAs
- `/api/reviews` endpoint for social proof data (with static fallback)

## Reference

See `AI_WEB_PRODUCTION_GUIDE_KO.md` for the full intent-based landing page architecture guide applicable to other industries.
