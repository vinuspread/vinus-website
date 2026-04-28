# vinus.co.kr 리뉴얼 - Phase 1: Public Site 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js 15 + Supabase 기반의 공개 사이트 구축 — 홈, 포트폴리오, 블로그, 소개, 의뢰 페이지 + 디자인 에이전시 수준 모션 시스템

**Architecture:** App Router로 SSG/ISR 렌더링. Supabase PostgreSQL에서 콘텐츠 fetch. Framer Motion으로 페이지 전환, GSAP+ScrollTrigger로 Text/Image Reveal, Lenis로 부드러운 스크롤. 관리자 없이도 Supabase 대시보드에서 직접 데이터 입력해 개발/테스트 가능.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Supabase (`@supabase/ssr`), Framer Motion, GSAP + ScrollTrigger, Lenis (`lenis/react`), Vitest + Testing Library, Resend (이메일)

---

## 파일 구조

```
vinus_website/
├── app/
│   ├── layout.tsx                   # 루트 레이아웃 (폰트, LenisProvider, PageTransition)
│   ├── page.tsx                     # 홈 (포트폴리오 그리드)
│   ├── we/page.tsx                  # 회사 소개
│   ├── work/
│   │   ├── page.tsx                 # 포트폴리오 목록 (ISR)
│   │   └── [slug]/page.tsx          # 포트폴리오 상세 (SSG)
│   ├── blog/
│   │   ├── page.tsx                 # 블로그 목록 (ISR)
│   │   └── [slug]/page.tsx          # 블로그 상세 (SSG)
│   ├── request/page.tsx             # 프로젝트 의뢰
│   └── api/request/route.ts         # 이메일 발송 API
├── components/
│   ├── layout/
│   │   ├── Header.tsx               # 네비게이션
│   │   └── Footer.tsx               # 푸터
│   ├── motion/
│   │   ├── LenisProvider.tsx        # Lenis 스크롤 설정
│   │   ├── PageTransition.tsx       # Framer Motion 페이지 전환
│   │   ├── TextReveal.tsx           # GSAP 텍스트 라인 reveal
│   │   └── ImageReveal.tsx          # GSAP 커튼 reveal
│   ├── home/
│   │   └── PortfolioGrid.tsx        # 홈 포트폴리오 그리드
│   ├── work/
│   │   └── WorkCard.tsx             # 포트폴리오 카드 (hover 모션)
│   ├── blog/
│   │   └── BlogCard.tsx             # 블로그 카드
│   └── blocks/
│       ├── BlockRenderer.tsx        # blocks JSON 렌더러
│       ├── TextBlock.tsx
│       ├── ImageBlock.tsx
│       ├── GalleryBlock.tsx
│       ├── VideoBlock.tsx
│       ├── DividerBlock.tsx
│       └── FileBlock.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                # 브라우저 Supabase client
│   │   └── server.ts                # 서버 Supabase client
│   └── utils.ts                     # slugify 등 공통 유틸
├── types/
│   └── index.ts                     # Work, Blog, Block 등 공통 타입
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql   # DB 스키마 + RLS
├── vitest.config.ts
├── next.config.ts
└── package.json
```

---

## Task 1: 프로젝트 초기화

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `vitest.config.ts`, `tsconfig.json`

- [ ] **Step 1: Next.js 프로젝트 생성**

```bash
cd /Users/sungyounghan/project/vinus_website
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```
프롬프트: 모두 기본값 선택 (Enter)

- [ ] **Step 2: 의존성 설치**

```bash
npm install @supabase/ssr @supabase/supabase-js framer-motion gsap @gsap/react lenis resend
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

- [ ] **Step 3: vitest.config.ts 작성**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

- [ ] **Step 4: vitest.setup.ts 작성**

```typescript
// vitest.setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: next.config.ts 작성**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 6: package.json에 test 스크립트 추가**

`package.json`의 `scripts`에 추가:
```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:run": "vitest run"
```

- [ ] **Step 7: 환경변수 파일 생성**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=hansungyoung@gmail.com
```

`.env.local`을 `.gitignore`에 추가 (이미 포함되어 있음).

- [ ] **Step 8: 실행 확인**

```bash
npm run dev
```
Expected: `http://localhost:3000` 에서 Next.js 기본 페이지 표시

---

## Task 2: Supabase DB 스키마

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`

- [ ] **Step 1: 마이그레이션 파일 작성**

```sql
-- supabase/migrations/001_initial_schema.sql

create extension if not exists "uuid-ossp";

-- 포트폴리오
create table public.work (
  id              uuid default uuid_generate_v4() primary key,
  slug            text unique not null,
  title           text not null,
  category        text,
  thumbnail_url   text,
  thumbnail_color text default '#e5e5e5',
  blocks          jsonb default '[]'::jsonb,
  meta_title      text,
  meta_description text,
  is_published    boolean default false,
  sort_order      integer default 0,
  created_at      timestamptz default now()
);

-- 블로그
create table public.blog (
  id              uuid default uuid_generate_v4() primary key,
  slug            text unique not null,
  title           text not null,
  category        text check (category in ('Story', 'Download')) default 'Story',
  thumbnail_url   text,
  blocks          jsonb default '[]'::jsonb,
  file_url        text,
  meta_title      text,
  meta_description text,
  is_published    boolean default false,
  sort_order      integer default 0,
  created_at      timestamptz default now()
);

-- FAQ
create table public.faq (
  id          uuid default uuid_generate_v4() primary key,
  question    text not null,
  answer      text not null,
  sort_order  integer default 0,
  is_published boolean default false
);

-- 사이트 설정
create table public.settings (
  key   text primary key,
  value text
);

-- 초기 설정값
insert into public.settings (key, value) values
  ('company_name', '디자인스튜디오 바이너스프레드'),
  ('company_name_en', 'VINUSPREAD'),
  ('address', '서울 강서구 공항대로 227'),
  ('tel', '02-3661-1907'),
  ('email', 'contact@vinus.co.kr'),
  ('instagram', 'https://www.instagram.com/vinuspread/'),
  ('pinterest', 'https://www.pinterest.co.kr/vinuspread/'),
  ('we_intro', '웹 개발 및 디자인 전문 스튜디오');

-- RLS 활성화
alter table public.work enable row level security;
alter table public.blog enable row level security;
alter table public.faq enable row level security;
alter table public.settings enable row level security;

-- 공개 읽기 정책 (published만)
create policy "public read published work" on public.work
  for select using (is_published = true);

create policy "public read published blog" on public.blog
  for select using (is_published = true);

create policy "public read published faq" on public.faq
  for select using (is_published = true);

create policy "public read settings" on public.settings
  for select using (true);

-- 인증 사용자 전체 권한
create policy "auth full access work" on public.work
  for all using (auth.role() = 'authenticated');

create policy "auth full access blog" on public.blog
  for all using (auth.role() = 'authenticated');

create policy "auth full access faq" on public.faq
  for all using (auth.role() = 'authenticated');

create policy "auth full access settings" on public.settings
  for all using (auth.role() = 'authenticated');
```

- [ ] **Step 2: Supabase 대시보드에서 실행**

1. [supabase.com](https://supabase.com) → 프로젝트 생성 (이름: `vinus`)
2. SQL Editor → 위 SQL 전체 붙여넣기 → Run
3. `.env.local`에 Project URL과 anon key 입력

- [ ] **Step 3: 테스트용 데이터 입력 (Supabase 대시보드 Table Editor)**

work 테이블에 샘플 2개 입력:
```
slug: daekyo-dreams-admin
title: Daekyo Dreams Admin
category: UX/UI
thumbnail_color: rgba(78,78,78,0.9)
is_published: true
sort_order: 1
```

```
slug: travel-service-character-yomo
title: Travel Service Character YOMO
category: Character
thumbnail_color: rgba(54,187,165,0.9)
is_published: true
sort_order: 2
```

---

## Task 3: TypeScript 타입 + Supabase 클라이언트

**Files:**
- Create: `types/index.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/utils.ts`
- Test: `types/index.test.ts`

- [ ] **Step 1: 타입 정의**

```typescript
// types/index.ts

export type MotionType = 'none' | 'fadeIn' | 'slideUp' | 'textReveal' | 'curtainReveal' | 'zoomIn' | 'stagger'

export interface TextBlock {
  id: string
  type: 'text'
  content: string
  motion: MotionType
}

export interface ImageBlock {
  id: string
  type: 'image'
  src: string
  alt: string
  motion: MotionType
}

export interface GalleryBlock {
  id: string
  type: 'gallery'
  images: { src: string; alt: string }[]
  motion: MotionType
}

export interface VideoBlock {
  id: string
  type: 'video'
  url: string
  motion: MotionType
}

export interface DividerBlock {
  id: string
  type: 'divider'
  height: number
  motion: MotionType
}

export interface FileBlock {
  id: string
  type: 'file'
  url: string
  label: string
  motion: MotionType
}

export type Block = TextBlock | ImageBlock | GalleryBlock | VideoBlock | DividerBlock | FileBlock

export interface Work {
  id: string
  slug: string
  title: string
  category: string | null
  thumbnail_url: string | null
  thumbnail_color: string | null
  blocks: Block[]
  meta_title: string | null
  meta_description: string | null
  is_published: boolean
  sort_order: number
  created_at: string
}

export interface Blog {
  id: string
  slug: string
  title: string
  category: 'Story' | 'Download'
  thumbnail_url: string | null
  blocks: Block[]
  file_url: string | null
  meta_title: string | null
  meta_description: string | null
  is_published: boolean
  sort_order: number
  created_at: string
}

export interface Faq {
  id: string
  question: string
  answer: string
  sort_order: number
  is_published: boolean
}

export interface Settings {
  [key: string]: string
}
```

- [ ] **Step 2: 타입 가드 테스트 작성**

```typescript
// types/index.test.ts
import { describe, it, expect } from 'vitest'
import type { Block, Work } from './index'

describe('Block types', () => {
  it('TextBlock has required fields', () => {
    const block: Block = {
      id: '1',
      type: 'text',
      content: 'Hello',
      motion: 'fadeIn',
    }
    expect(block.type).toBe('text')
  })

  it('ImageBlock has src and alt', () => {
    const block: Block = {
      id: '2',
      type: 'image',
      src: '/image.jpg',
      alt: 'test image',
      motion: 'curtainReveal',
    }
    expect(block.type).toBe('image')
  })
})

describe('Work type', () => {
  it('Work has required fields', () => {
    const work: Work = {
      id: 'uuid-1',
      slug: 'test-project',
      title: 'Test Project',
      category: 'UX/UI',
      thumbnail_url: '/thumb.jpg',
      thumbnail_color: 'rgba(0,0,0,0.9)',
      blocks: [],
      meta_title: null,
      meta_description: null,
      is_published: true,
      sort_order: 1,
      created_at: '2025-01-01T00:00:00Z',
    }
    expect(work.slug).toBe('test-project')
  })
})
```

- [ ] **Step 3: 테스트 실행 (통과 확인)**

```bash
npm run test:run -- types/index.test.ts
```
Expected: `2 passed`

- [ ] **Step 4: Supabase 브라우저 클라이언트**

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 5: Supabase 서버 클라이언트**

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

- [ ] **Step 6: 공통 유틸**

```typescript
// lib/utils.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function getMetaTitle(title: string, metaTitle: string | null): string {
  return metaTitle ?? `${title} | 바이너스프레드`
}

export function getMetaDescription(description: string | null): string {
  return description ?? '웹 개발 및 디자인 전문 스튜디오, 맞춤형 웹사이트 제작과 창의적인 디자인 솔루션 제공'
}
```

- [ ] **Step 7: 유틸 테스트 작성**

```typescript
// lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { slugify, formatDate, getMetaTitle, getMetaDescription } from './utils'

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })
  it('removes special characters', () => {
    expect(slugify('Hello! World@2024')).toBe('hello-world2024')
  })
  it('collapses multiple hyphens', () => {
    expect(slugify('Hello  World')).toBe('hello-world')
  })
})

describe('formatDate', () => {
  it('formats to YYYY.MM', () => {
    expect(formatDate('2024-03-15T00:00:00Z')).toBe('2024.03')
  })
})

describe('getMetaTitle', () => {
  it('uses metaTitle when provided', () => {
    expect(getMetaTitle('Project', 'Custom Title')).toBe('Custom Title')
  })
  it('falls back to title with suffix', () => {
    expect(getMetaTitle('Project', null)).toBe('Project | 바이너스프레드')
  })
})

describe('getMetaDescription', () => {
  it('returns default when null', () => {
    const result = getMetaDescription(null)
    expect(result).toContain('디자인 솔루션')
  })
  it('returns custom description when provided', () => {
    expect(getMetaDescription('Custom desc')).toBe('Custom desc')
  })
})
```

- [ ] **Step 8: 테스트 실행**

```bash
npm run test:run -- lib/utils.test.ts
```
Expected: `7 passed`

- [ ] **Step 9: 커밋**

```bash
git add -A
git commit -m "feat: project setup, DB schema, types, and Supabase client"
```

---

## Task 4: 모션 시스템 기반 컴포넌트

**Files:**
- Create: `components/motion/LenisProvider.tsx`
- Create: `components/motion/PageTransition.tsx`
- Create: `components/motion/TextReveal.tsx`
- Create: `components/motion/ImageReveal.tsx`

- [ ] **Step 1: LenisProvider 작성**

```typescript
// components/motion/LenisProvider.tsx
'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode } from 'react'

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
```

- [ ] **Step 2: PageTransition 작성**

```typescript
// components/motion/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: TextReveal 작성 (GSAP)**

```typescript
// components/motion/TextReveal.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
}

export default function TextReveal({ children, as: Tag = 'p', className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const lines = el.querySelectorAll('.line-inner')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {children.split('\n').map((line, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <Tag className="line-inner block">{line}</Tag>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: ImageReveal 작성 (GSAP 커튼 효과)**

```typescript
// components/motion/ImageReveal.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface ImageRevealProps {
  src: string
  alt: string
  curtainColor?: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
}

export default function ImageReveal({
  src,
  alt,
  curtainColor = '#1a1a1a',
  className,
  fill = false,
  width,
  height,
}: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const curtain = curtainRef.current
    if (!wrapper || !curtain) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtain,
        { scaleX: 1, transformOrigin: 'left center' },
        {
          scaleX: 0,
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden ${className ?? ''}`}>
      {fill ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <Image src={src} alt={alt} width={width ?? 800} height={height ?? 600} className="w-full h-auto" />
      )}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-10"
        style={{ backgroundColor: curtainColor }}
      />
    </div>
  )
}
```

- [ ] **Step 5: 커밋**

```bash
git add components/motion/
git commit -m "feat: add motion system (Lenis, PageTransition, TextReveal, ImageReveal)"
```

---

## Task 5: 루트 레이아웃 + Header + Footer

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Test: `components/layout/Header.test.tsx`

- [ ] **Step 1: Header 테스트 작성**

```typescript
// components/layout/Header.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('renders all nav items', () => {
    render(<Header />)
    expect(screen.getByText('We')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Request')).toBeInTheDocument()
  })

  it('does not render Download as top-level menu', () => {
    render(<Header />)
    const navLinks = screen.getAllByRole('link')
    const hrefs = navLinks.map(link => link.getAttribute('href'))
    expect(hrefs).not.toContain('/download')
  })
})
```

- [ ] **Step 2: 테스트 실행 (FAIL 확인)**

```bash
npm run test:run -- components/layout/Header.test.tsx
```
Expected: FAIL — `Cannot find module './Header'`

- [ ] **Step 3: Header 구현**

```typescript
// components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'We', href: '/we' },
  { label: 'Work', href: '/work' },
  {
    label: 'Blog',
    href: '/blog',
    children: [
      { label: 'Story', href: '/blog?category=Story' },
      { label: 'Download', href: '/blog?category=Download' },
    ],
  },
  { label: 'Request', href: '/request' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
      <Link href="/" className="text-white font-bold text-lg tracking-wider" aria-label="바이너스프레드 홈">
        VINUS
      </Link>

      {/* 데스크탑 네비게이션 */}
      <nav className="hidden md:flex items-center gap-8" aria-label="메인 메뉴">
        {navItems.map(item => (
          <div key={item.label} className="relative group">
            <Link
              href={item.href}
              className={`text-sm tracking-widest uppercase transition-opacity ${
                pathname.startsWith(item.href) ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              } text-white`}
            >
              {item.label}
            </Link>
            {item.children && (
              <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
                <ul className="bg-white rounded shadow-lg py-2 min-w-[120px]">
                  {item.children.map(child => (
                    <li key={child.label}>
                      <Link href={child.href} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* 모바일 햄버거 */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="메뉴 열기"
      >
        <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
      </button>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black text-white p-8 md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {navItems.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-2xl" onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-2 ml-4 flex flex-col gap-2">
                      {item.children.map(child => (
                        <li key={child.label}>
                          <Link href={child.href} className="text-base opacity-60" onClick={() => setMenuOpen(false)}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 4: 테스트 실행 (PASS 확인)**

```bash
npm run test:run -- components/layout/Header.test.tsx
```
Expected: `2 passed`

- [ ] **Step 5: Footer 구현**

```typescript
// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <p className="font-bold text-lg tracking-wider">VINUSPREAD</p>
          <p className="text-sm text-gray-500 mt-1">디자인스튜디오 바이너스프레드</p>
        </div>
        <div className="text-sm text-gray-500 space-y-1">
          <p>서울 강서구 공항대로 227</p>
          <p>02-3661-1907</p>
        </div>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/vinuspread/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black transition-colors">
            Instagram
          </a>
          <a href="https://www.pinterest.co.kr/vinuspread/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black transition-colors">
            Pinterest
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-100">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} VINUSPREAD. All rights reserved.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: 루트 layout.tsx 작성**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/motion/LenisProvider'
import PageTransition from '@/components/motion/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: '디자인스튜디오 바이너스프레드',
    template: '%s | 바이너스프레드',
  },
  description: '웹 개발 및 디자인 전문 스튜디오, 맞춤형 웹사이트 제작과 창의적인 디자인 솔루션 제공',
  metadataBase: new URL('https://vinus.co.kr'),
  openGraph: {
    siteName: '바이너스프레드',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <LenisProvider>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 7: 브라우저 확인**

```bash
npm run dev
```
`http://localhost:3000` 에서 헤더/푸터 렌더링 확인. 메뉴 클릭 시 모바일/데스크탑 동작 확인.

- [ ] **Step 8: 커밋**

```bash
git add app/layout.tsx components/layout/
git commit -m "feat: add root layout, Header with nav, Footer"
```

---

## Task 6: 블록 렌더러 + 블록 컴포넌트

**Files:**
- Create: `components/blocks/BlockRenderer.tsx`
- Create: `components/blocks/TextBlock.tsx`
- Create: `components/blocks/ImageBlock.tsx`
- Create: `components/blocks/GalleryBlock.tsx`
- Create: `components/blocks/VideoBlock.tsx`
- Create: `components/blocks/DividerBlock.tsx`
- Create: `components/blocks/FileBlock.tsx`
- Test: `components/blocks/BlockRenderer.test.tsx`

- [ ] **Step 1: BlockRenderer 테스트 작성**

```typescript
// components/blocks/BlockRenderer.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BlockRenderer from './BlockRenderer'
import type { Block } from '@/types'

describe('BlockRenderer', () => {
  it('renders text block', () => {
    const blocks: Block[] = [
      { id: '1', type: 'text', content: 'Hello World', motion: 'none' },
    ]
    render(<BlockRenderer blocks={blocks} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders divider block', () => {
    const blocks: Block[] = [
      { id: '2', type: 'divider', height: 40, motion: 'none' },
    ]
    const { container } = render(<BlockRenderer blocks={blocks} />)
    const divider = container.querySelector('[style*="height: 40px"]')
    expect(divider).toBeTruthy()
  })

  it('renders file block with download link', () => {
    const blocks: Block[] = [
      { id: '3', type: 'file', url: '/test.pdf', label: 'Download PDF', motion: 'none' },
    ]
    render(<BlockRenderer blocks={blocks} />)
    const link = screen.getByText('Download PDF')
    expect(link.closest('a')).toHaveAttribute('href', '/test.pdf')
  })

  it('renders empty array without error', () => {
    const { container } = render(<BlockRenderer blocks={[]} />)
    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
```

- [ ] **Step 2: 테스트 실행 (FAIL 확인)**

```bash
npm run test:run -- components/blocks/BlockRenderer.test.tsx
```
Expected: FAIL

- [ ] **Step 3: TextBlock 구현**

```typescript
// components/blocks/TextBlock.tsx
import type { TextBlock as TextBlockType } from '@/types'

export default function TextBlock({ block }: { block: TextBlockType }) {
  return (
    <div
      className="prose prose-lg max-w-none my-8"
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  )
}
```

- [ ] **Step 4: ImageBlock 구현**

```typescript
// components/blocks/ImageBlock.tsx
import Image from 'next/image'
import type { ImageBlock as ImageBlockType } from '@/types'

export default function ImageBlock({ block }: { block: ImageBlockType }) {
  return (
    <div className="my-8 relative w-full">
      <Image
        src={block.src}
        alt={block.alt}
        width={1200}
        height={800}
        className="w-full h-auto rounded"
      />
    </div>
  )
}
```

- [ ] **Step 5: GalleryBlock 구현**

```typescript
// components/blocks/GalleryBlock.tsx
import Image from 'next/image'
import type { GalleryBlock as GalleryBlockType } from '@/types'

export default function GalleryBlock({ block }: { block: GalleryBlockType }) {
  return (
    <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-3">
      {block.images.map((img, i) => (
        <div key={i} className="relative aspect-square overflow-hidden rounded">
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: VideoBlock 구현**

```typescript
// components/blocks/VideoBlock.tsx
import type { VideoBlock as VideoBlockType } from '@/types'

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

export default function VideoBlock({ block }: { block: VideoBlockType }) {
  const youtubeId = getYoutubeId(block.url)

  if (youtubeId) {
    return (
      <div className="my-8 relative aspect-video w-full rounded overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded video"
        />
      </div>
    )
  }

  return (
    <div className="my-8">
      <video src={block.url} controls className="w-full rounded" />
    </div>
  )
}
```

- [ ] **Step 7: DividerBlock 구현**

```typescript
// components/blocks/DividerBlock.tsx
import type { DividerBlock as DividerBlockType } from '@/types'

export default function DividerBlock({ block }: { block: DividerBlockType }) {
  return <div style={{ height: `${block.height}px` }} aria-hidden="true" />
}
```

- [ ] **Step 8: FileBlock 구현**

```typescript
// components/blocks/FileBlock.tsx
import type { FileBlock as FileBlockType } from '@/types'

export default function FileBlock({ block }: { block: FileBlockType }) {
  return (
    <div className="my-8">
      <a
        href={block.url}
        download
        className="inline-flex items-center gap-2 px-6 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors"
      >
        <span>↓</span>
        {block.label}
      </a>
    </div>
  )
}
```

- [ ] **Step 9: BlockRenderer 구현**

```typescript
// components/blocks/BlockRenderer.tsx
import type { Block } from '@/types'
import TextBlock from './TextBlock'
import ImageBlock from './ImageBlock'
import GalleryBlock from './GalleryBlock'
import VideoBlock from './VideoBlock'
import DividerBlock from './DividerBlock'
import FileBlock from './FileBlock'

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map(block => {
        switch (block.type) {
          case 'text':     return <TextBlock key={block.id} block={block} />
          case 'image':    return <ImageBlock key={block.id} block={block} />
          case 'gallery':  return <GalleryBlock key={block.id} block={block} />
          case 'video':    return <VideoBlock key={block.id} block={block} />
          case 'divider':  return <DividerBlock key={block.id} block={block} />
          case 'file':     return <FileBlock key={block.id} block={block} />
        }
      })}
    </>
  )
}
```

- [ ] **Step 10: 테스트 실행 (PASS 확인)**

```bash
npm run test:run -- components/blocks/BlockRenderer.test.tsx
```
Expected: `4 passed`

- [ ] **Step 11: 커밋**

```bash
git add components/blocks/
git commit -m "feat: add BlockRenderer and all block components"
```

---

## Task 7: WorkCard 컴포넌트 (호버 모션)

**Files:**
- Create: `components/work/WorkCard.tsx`
- Test: `components/work/WorkCard.test.tsx`

- [ ] **Step 1: WorkCard 테스트 작성**

```typescript
// components/work/WorkCard.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkCard from './WorkCard'
import type { Work } from '@/types'

const mockWork: Work = {
  id: '1',
  slug: 'test-project',
  title: 'Test Project',
  category: 'UX/UI',
  thumbnail_url: '/test.jpg',
  thumbnail_color: 'rgba(78,78,78,0.9)',
  blocks: [],
  meta_title: null,
  meta_description: null,
  is_published: true,
  sort_order: 1,
  created_at: '2024-03-01T00:00:00Z',
}

describe('WorkCard', () => {
  it('renders title', () => {
    render(<WorkCard work={mockWork} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('links to correct slug', () => {
    render(<WorkCard work={mockWork} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/work/test-project')
  })

  it('renders date', () => {
    render(<WorkCard work={mockWork} />)
    expect(screen.getByText('2024.03')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 테스트 실행 (FAIL 확인)**

```bash
npm run test:run -- components/work/WorkCard.test.tsx
```
Expected: FAIL

- [ ] **Step 3: WorkCard 구현**

```typescript
// components/work/WorkCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Work } from '@/types'
import { formatDate } from '@/lib/utils'

export default function WorkCard({ work }: { work: Work }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/work/${work.slug}`} className="group block relative overflow-hidden">
        {/* 썸네일 */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {work.thumbnail_url ? (
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={work.thumbnail_url}
                alt={work.title}
                fill
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: work.thumbnail_color ?? '#e5e5e5' }} />
          )}

          {/* 호버 오버레이 */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-5"
            style={{ backgroundColor: work.thumbnail_color ?? 'rgba(0,0,0,0.7)' }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.strong
              className="block text-white font-medium text-base leading-tight"
              initial={{ y: 12, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              {work.title}
            </motion.strong>
            <motion.span
              className="block text-white/70 text-xs mt-1"
              initial={{ y: 12, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              {work.category && <span className="mr-2">{work.category}</span>}
              {formatDate(work.created_at)}
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}
```

- [ ] **Step 4: 테스트 실행 (PASS 확인)**

```bash
npm run test:run -- components/work/WorkCard.test.tsx
```
Expected: `3 passed`

- [ ] **Step 5: 커밋**

```bash
git add components/work/
git commit -m "feat: add WorkCard with hover motion"
```

---

## Task 8: 홈 페이지 (포트폴리오 그리드)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: 홈 페이지 구현**

```typescript
// app/page.tsx
import { createClient } from '@/lib/supabase/server'
import WorkCard from '@/components/work/WorkCard'
import type { Work } from '@/types'

export const revalidate = 3600 // 1시간마다 ISR

export default async function HomePage() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from('work')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  return (
    <main className="pt-20">
      <nav
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
        aria-label="포트폴리오"
      >
        {(works as Work[] ?? []).map(work => (
          <WorkCard key={work.id} work={work} />
        ))}
      </nav>
    </main>
  )
}
```

- [ ] **Step 2: 브라우저 확인**

```bash
npm run dev
```
`http://localhost:3000` — 샘플 데이터 카드 렌더링, 호버 모션 동작 확인.

- [ ] **Step 3: 커밋**

```bash
git add app/page.tsx
git commit -m "feat: home page with portfolio grid"
```

---

## Task 9: Work 목록/상세 페이지

**Files:**
- Create: `app/work/page.tsx`
- Create: `app/work/[slug]/page.tsx`

- [ ] **Step 1: Work 목록 페이지**

```typescript
// app/work/page.tsx
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import WorkCard from '@/components/work/WorkCard'
import type { Work } from '@/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Work',
  description: '바이너스프레드의 포트폴리오 — 웹사이트, 앱, 캐릭터 디자인 프로젝트',
}

export default async function WorkPage() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from('work')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  return (
    <main className="pt-24 px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 tracking-tight">Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(works as Work[] ?? []).map(work => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Work 상세 페이지 (SSG)**

```typescript
// app/work/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { getMetaTitle, getMetaDescription } from '@/lib/utils'
import type { Work } from '@/types'

export const revalidate = 86400 // 24시간

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = await createClient()
  const { data: works } = await supabase
    .from('work')
    .select('slug')
    .eq('is_published', true)

  return (works ?? []).map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: work } = await supabase
    .from('work')
    .select('title, meta_title, meta_description, thumbnail_url')
    .eq('slug', slug)
    .single()

  if (!work) return {}

  return {
    title: getMetaTitle(work.title, work.meta_title),
    description: getMetaDescription(work.meta_description),
    openGraph: {
      images: work.thumbnail_url ? [work.thumbnail_url] : [],
    },
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: work } = await supabase
    .from('work')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!work) notFound()

  const typedWork = work as Work

  return (
    <main className="pt-24 px-8 max-w-4xl mx-auto pb-24">
      <header className="mb-12">
        <p className="text-sm text-gray-500 tracking-wider uppercase mb-3">
          {typedWork.category}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {typedWork.title}
        </h1>
      </header>

      <BlockRenderer blocks={typedWork.blocks ?? []} />
    </main>
  )
}
```

- [ ] **Step 3: 브라우저 확인**

`http://localhost:3000/work` — 목록 페이지 확인.
`http://localhost:3000/work/daekyo-dreams-admin` — 상세 페이지 확인 (샘플 데이터 기준).

- [ ] **Step 4: 커밋**

```bash
git add app/work/
git commit -m "feat: work list and detail pages with SSG"
```

---

## Task 10: Blog 목록/상세 페이지

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Blog 목록 페이지 (Story/Download 탭)**

```typescript
// app/blog/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BlogCard from '@/components/blog/BlogCard'
import type { Blog } from '@/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: '바이너스프레드의 이야기, 프로젝트 노트, 다운로드 자료',
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const activeCategory = category ?? 'all'

  const supabase = await createClient()
  let query = supabase
    .from('blog')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })

  if (activeCategory !== 'all') {
    query = query.eq('category', activeCategory)
  }

  const { data: blogs } = await query

  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Story', value: 'Story' },
    { label: 'Download', value: 'Download' },
  ]

  return (
    <main className="pt-24 px-8 max-w-7xl mx-auto pb-24">
      <h1 className="text-4xl font-bold mb-8 tracking-tight">Blog</h1>

      {/* 탭 */}
      <nav className="flex gap-6 mb-12 border-b border-gray-200">
        {tabs.map(tab => (
          <Link
            key={tab.value}
            href={tab.value === 'all' ? '/blog' : `/blog?category=${tab.value}`}
            className={`pb-3 text-sm tracking-wider transition-colors border-b-2 -mb-px ${
              activeCategory === tab.value
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <ul className="space-y-6">
        {(blogs as Blog[] ?? []).map(blog => (
          <li key={blog.id}>
            <BlogCard blog={blog} />
          </li>
        ))}
      </ul>
    </main>
  )
}
```

- [ ] **Step 2: BlogCard 컴포넌트**

```typescript
// components/blog/BlogCard.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Blog } from '@/types'
import { formatDate } from '@/lib/utils'

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${blog.slug}`} className="group flex items-start justify-between gap-4 py-6 border-b border-gray-100 hover:border-black transition-colors">
        <div>
          <span className="text-xs text-gray-400 tracking-wider uppercase">{blog.category}</span>
          <h2 className="text-lg font-medium mt-1 group-hover:underline underline-offset-4">{blog.title}</h2>
        </div>
        <time className="text-sm text-gray-400 shrink-0">{formatDate(blog.created_at)}</time>
      </Link>
    </motion.article>
  )
}
```

- [ ] **Step 3: Blog 상세 페이지 (SSG)**

```typescript
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { getMetaTitle, getMetaDescription, formatDate } from '@/lib/utils'
import type { Blog } from '@/types'

export const revalidate = 86400

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = await createClient()
  const { data: blogs } = await supabase
    .from('blog')
    .select('slug')
    .eq('is_published', true)

  return (blogs ?? []).map(b => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: blog } = await supabase
    .from('blog')
    .select('title, meta_title, meta_description')
    .eq('slug', slug)
    .single()

  if (!blog) return {}

  return {
    title: getMetaTitle(blog.title, blog.meta_title),
    description: getMetaDescription(blog.meta_description),
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: blog } = await supabase
    .from('blog')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!blog) notFound()

  const typedBlog = blog as Blog

  return (
    <main className="pt-24 px-8 max-w-3xl mx-auto pb-24">
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs tracking-wider uppercase text-gray-400">{typedBlog.category}</span>
          <time className="text-xs text-gray-400">{formatDate(typedBlog.created_at)}</time>
        </div>
        <h1 className="text-4xl font-bold leading-tight">{typedBlog.title}</h1>
      </header>

      <BlockRenderer blocks={typedBlog.blocks ?? []} />

      {typedBlog.file_url && (
        <div className="mt-12 pt-8 border-t">
          <a
            href={typedBlog.file_url}
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm tracking-wider hover:bg-gray-800 transition-colors"
          >
            ↓ 파일 다운로드
          </a>
        </div>
      )}
    </main>
  )
}
```

- [ ] **Step 4: 커밋**

```bash
git add app/blog/ components/blog/
git commit -m "feat: blog list with category tabs and detail pages"
```

---

## Task 11: We (소개) 페이지 + Request (의뢰) 페이지

**Files:**
- Create: `app/we/page.tsx`
- Create: `app/request/page.tsx`
- Create: `app/api/request/route.ts`

- [ ] **Step 1: We 페이지**

```typescript
// app/we/page.tsx
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import TextReveal from '@/components/motion/TextReveal'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'We',
  description: '바이너스프레드 — 웹 개발 및 디자인 전문 스튜디오',
}

export default async function WePage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('key, value')

  const s: Record<string, string> = {}
  settings?.forEach(({ key, value }) => { if (value) s[key] = value })

  return (
    <main className="pt-32 px-8 max-w-5xl mx-auto pb-24">
      <TextReveal as="h1" className="text-5xl md:text-7xl font-bold leading-tight mb-16">
        {s.company_name_en ?? 'VINUSPREAD'}
      </TextReveal>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-lg text-gray-600 leading-relaxed">
            {s.we_intro ?? '웹 개발 및 디자인 전문 스튜디오입니다.'}
          </p>
        </div>
        <div className="space-y-4 text-sm text-gray-500">
          <p>{s.address}</p>
          <p>{s.tel}</p>
          <div className="flex gap-4 pt-4">
            <a href={s.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
            <a href={s.pinterest} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: 이메일 API route**

```typescript
// app/api/request/route.ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, tel, budget, description } = body

  if (!name || !email || !description) {
    return NextResponse.json({ error: '필수 항목을 입력해주세요.' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'noreply@vinus.co.kr',
    to: process.env.ADMIN_EMAIL!,
    subject: `[바이너스프레드] 프로젝트 의뢰: ${name}`,
    html: `
      <h2>새 프로젝트 의뢰</h2>
      <p><strong>이름:</strong> ${name}</p>
      <p><strong>이메일:</strong> ${email}</p>
      <p><strong>연락처:</strong> ${tel ?? '-'}</p>
      <p><strong>예산:</strong> ${budget ?? '-'}</p>
      <hr />
      <p><strong>내용:</strong></p>
      <p>${description.replace(/\n/g, '<br/>')}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: '발송 실패. 다시 시도해주세요.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 3: Request 페이지**

```typescript
// app/request/page.tsx
'use client'

import { useState } from 'react'

export default function RequestPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      tel: (form.elements.namedItem('tel') as HTMLInputElement).value,
      budget: (form.elements.namedItem('budget') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
    }

    const res = await fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setStatus(res.ok ? 'done' : 'error')
  }

  return (
    <main className="pt-32 px-8 max-w-2xl mx-auto pb-24">
      <h1 className="text-4xl font-bold mb-4">Request</h1>
      <p className="text-gray-500 mb-12 text-sm">
        내용을 디테일하게 남겨주시면 정확한 견적과 컨설팅이 가능합니다.<br />
        남겨주신 의뢰는 담당자 이메일로 발송되며, 어떠한 정보도 저장하지 않습니다.
      </p>

      {status === 'done' ? (
        <div className="text-center py-16">
          <p className="text-xl font-medium">의뢰가 접수되었습니다.</p>
          <p className="text-gray-500 mt-2 text-sm">빠른 시일 내에 연락드리겠습니다.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: 'name', label: '이름 *', type: 'text', required: true },
            { name: 'email', label: '이메일 *', type: 'email', required: true },
            { name: 'tel', label: '연락처', type: 'tel', required: false },
            { name: 'budget', label: '예산', type: 'text', required: false },
          ].map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm mb-2">{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent"
              />
            </div>
          ))}

          <div>
            <label htmlFor="description" className="block text-sm mb-2">프로젝트 내용 *</label>
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-500 text-sm">발송에 실패했습니다. 다시 시도해주세요.</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 bg-black text-white text-sm tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? '발송 중...' : '의뢰하기'}
          </button>
        </form>
      )}
    </main>
  )
}
```

- [ ] **Step 4: 브라우저 확인**

```bash
npm run dev
```
- `http://localhost:3000/we` — 소개 페이지 확인
- `http://localhost:3000/request` — 폼 확인

- [ ] **Step 5: 커밋**

```bash
git add app/we/ app/request/ app/api/
git commit -m "feat: We page, Request form with email API"
```

---

## Task 12: Vercel 배포

**Files:**
- No file changes (배포 설정)

- [ ] **Step 1: GitHub 레포지토리 생성 및 push**

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/vinus-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Vercel 연결**

1. [vercel.com](https://vercel.com) → New Project → GitHub 레포 선택
2. Framework Preset: Next.js (자동 감지)
3. Environment Variables 입력:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
4. Deploy 클릭

- [ ] **Step 3: 배포 확인**

배포 완료 후 Vercel URL에서:
- 홈 페이지 포트폴리오 그리드 확인
- Work 목록/상세 확인
- Blog 탭 전환 확인
- We, Request 페이지 확인
- 페이지 전환 모션 확인 (AnimatePresence)
- 스크롤 부드러움 확인 (Lenis)

- [ ] **Step 4: 최종 커밋**

```bash
git add -A
git commit -m "chore: Phase 1 complete — public site deployed to Vercel"
```

---

## 전체 테스트 실행

```bash
npm run test:run
```
Expected: 모든 테스트 통과

---

## Phase 1 완료 후 다음 단계

Phase 2 계획: `docs/superpowers/plans/2026-04-28-vinus-phase2-cms-seo.md`
- CMS 관리자 (/admin) — Work, Blog, FAQ CRUD + 블록 에디터
- Supabase Storage 이미지 업로드
- SEO: sitemap.xml, robots.txt, JSON-LD, llms.txt
- 301 리다이렉트 (카페24 URL → 새 URL)
