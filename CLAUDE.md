# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Stack

- **Next.js 16** (App Router) — `src/app/` directory
- **React 19**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **TypeScript 5**

## Architecture

This is a portfolio/agency site being built from Figma designs. All pages live under `src/app/`. Components are co-located or placed in `src/app/components/`.

Key patterns observed from `feedback.md`:
- Animation components like `RevealText` wrap children — text styling must be applied to the inner `<span>`, not the wrapper
- Responsive breakpoints use `md:` prefix; some elements use `hidden md:block` for desktop-only display
- Large display text uses viewport units (`text-[18vw]`) with fixed desktop fallbacks (`md:text-[216px]`)

## Sections

The site has at minimum: Hero, Awards, Brands sections (from feedback history).

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
