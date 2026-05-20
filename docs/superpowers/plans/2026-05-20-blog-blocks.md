# Blog Block System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 6 blog-specific content blocks (텍스트, 인용구, 구분선, 링크카드, 동영상, 코드블록) to the admin blog editor and public story renderer.

**Architecture:** New block types are added to the shared `Block` union in `types/index.ts`, rendered by 6 new components dispatched from the existing `BlockRenderer`. A new `BlogBlockEditor` component replaces the generic `BlockEditor` in `BlogForm` — it only exposes blog-relevant block types and has a simpler UI. The link-card block stores fetched OG data at write time (via a new `/api/admin/og` route), so the public renderer never re-fetches.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4, Supabase (jsonb blocks column), native `fetch` for OG scraping.

---

## File Map

**Create:**
- `components/blocks/BlogTextBlock.tsx` — renders paragraph / h2 / h3
- `components/blocks/BlogQuoteBlock.tsx` — blockquote with optional attribution
- `components/blocks/BlogDividerBlock.tsx` — thin `<hr>` line or empty space
- `components/blocks/BlogLinkCardBlock.tsx` — OG preview card (external `<a>`)
- `components/blocks/BlogVideoBlock.tsx` — YouTube / Vimeo 16:9 iframe embed
- `components/blocks/BlogCodeBlock.tsx` — `<pre><code>` with language label + copy button
- `components/admin/BlogBlockEditor.tsx` — admin editor for the 6 blog block types
- `app/api/admin/og/route.ts` — GET route that fetches & parses OG meta from a URL

**Modify:**
- `types/index.ts` — add 6 interfaces + extend `Block` union
- `components/blocks/BlockRenderer.tsx` — add 6 new `case` branches + imports
- `components/admin/BlogForm.tsx` — swap `BlockEditor` → `BlogBlockEditor`

---

## Task 1: Add blog block types to `types/index.ts`

**Files:**
- Modify: `types/index.ts` (lines 131–131, `Block` union + add before it)

- [ ] **Step 1: Add new type aliases and interfaces**

Open `types/index.ts`. After line 17 (`export type EmbedInputType = ...`), add:

```typescript
export type BlogTextVariant = 'paragraph' | 'h2' | 'h3'
export type BlogDividerStyle = 'line' | 'space'
export type CodeLanguage = 'javascript' | 'typescript' | 'css' | 'html' | 'bash' | 'json' | 'python' | 'text'
```

After the `ScrollStoryBlock` interface (line 129), add the 6 new block interfaces:

```typescript
export interface BlogTextBlock {
  id: string
  type: 'blog-text'
  variant: BlogTextVariant
  content: string
  spacing: SpacingType
}

export interface BlogQuoteBlock {
  id: string
  type: 'blog-quote'
  quote: string
  attribution?: string
  spacing: SpacingType
}

export interface BlogDividerBlock {
  id: string
  type: 'blog-divider'
  style: BlogDividerStyle
  spacing: SpacingType
}

export interface BlogLinkCardBlock {
  id: string
  type: 'blog-link-card'
  url: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogSiteName: string
  spacing: SpacingType
}

export interface BlogVideoBlock {
  id: string
  type: 'blog-video'
  url: string
  caption?: string
  spacing: SpacingType
}

export interface BlogCodeBlock {
  id: string
  type: 'blog-code'
  code: string
  language: CodeLanguage
  spacing: SpacingType
}
```

- [ ] **Step 2: Extend the `Block` union**

Replace line 131:
```typescript
// BEFORE
export type Block = TextBlock | ImageBlock | GalleryBlock | MultiThumbnailBlock | VideoBlock | DividerBlock | FileBlock | HeadingTextBlock | EmbedBlock | ScrollStoryBlock

// AFTER
export type Block = TextBlock | ImageBlock | GalleryBlock | MultiThumbnailBlock | VideoBlock | DividerBlock | FileBlock | HeadingTextBlock | EmbedBlock | ScrollStoryBlock | BlogTextBlock | BlogQuoteBlock | BlogDividerBlock | BlogLinkCardBlock | BlogVideoBlock | BlogCodeBlock
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/sungyounghan/project/vinus_website && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors related to `types/index.ts`.

- [ ] **Step 4: Commit**

```bash
git add types/index.ts
git commit -m "feat(types): add 6 blog-specific block types to Block union"
```

---

## Task 2: Create 6 public renderer components

**Files:**
- Create: `components/blocks/BlogTextBlock.tsx`
- Create: `components/blocks/BlogQuoteBlock.tsx`
- Create: `components/blocks/BlogDividerBlock.tsx`
- Create: `components/blocks/BlogLinkCardBlock.tsx`
- Create: `components/blocks/BlogVideoBlock.tsx`
- Create: `components/blocks/BlogCodeBlock.tsx`

- [ ] **Step 1: Create `BlogTextBlock.tsx`**

```typescript
// components/blocks/BlogTextBlock.tsx
import type { BlogTextBlock } from '@/types'

export default function BlogTextBlock({ block }: { block: BlogTextBlock }) {
  if (block.variant === 'h2') {
    return (
      <h2 className="font-inter font-bold text-[clamp(24px,3vw,48px)] tracking-tight leading-tight text-mine-shaft">
        {block.content}
      </h2>
    )
  }
  if (block.variant === 'h3') {
    return (
      <h3 className="font-inter font-bold text-[clamp(18px,2vw,28px)] tracking-tight leading-tight text-mine-shaft">
        {block.content}
      </h3>
    )
  }
  return (
    <p className="font-inter text-[17px] text-mine-shaft/50 leading-[1.8] whitespace-pre-wrap">
      {block.content}
    </p>
  )
}
```

- [ ] **Step 2: Create `BlogQuoteBlock.tsx`**

```typescript
// components/blocks/BlogQuoteBlock.tsx
import type { BlogQuoteBlock } from '@/types'

export default function BlogQuoteBlock({ block }: { block: BlogQuoteBlock }) {
  return (
    <blockquote className="pl-10 border-l-2 border-mine-shaft/10 italic text-[clamp(20px,2.5vw,36px)] font-inter text-mine-shaft/40 leading-tight">
      <p>{block.quote}</p>
      {block.attribution && (
        <cite className="block mt-4 font-inter not-italic text-sm text-mine-shaft/30">
          — {block.attribution}
        </cite>
      )}
    </blockquote>
  )
}
```

- [ ] **Step 3: Create `BlogDividerBlock.tsx`**

```typescript
// components/blocks/BlogDividerBlock.tsx
import type { BlogDividerBlock } from '@/types'

export default function BlogDividerBlock({ block }: { block: BlogDividerBlock }) {
  if (block.style === 'line') {
    return <hr className="border-t border-alto" />
  }
  return <div className="h-16" />
}
```

- [ ] **Step 4: Create `BlogLinkCardBlock.tsx`**

```typescript
// components/blocks/BlogLinkCardBlock.tsx
import type { BlogLinkCardBlock } from '@/types'

export default function BlogLinkCardBlock({ block }: { block: BlogLinkCardBlock }) {
  return (
    <a
      href={block.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex border border-alto hover:border-mine-shaft/30 transition-colors overflow-hidden group no-underline"
    >
      {block.ogImage && (
        <div className="w-32 h-24 flex-shrink-0 relative overflow-hidden bg-gallery">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.ogImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 flex flex-col justify-center gap-1 min-w-0">
        {block.ogSiteName && (
          <p className="font-inter text-[11px] text-mine-shaft/30 uppercase tracking-widest">
            {block.ogSiteName}
          </p>
        )}
        <p className="font-inter font-medium text-sm text-mine-shaft leading-tight truncate group-hover:underline underline-offset-2">
          {block.ogTitle || block.url}
        </p>
        {block.ogDescription && (
          <p className="text-xs text-mine-shaft/40 line-clamp-2 leading-relaxed">
            {block.ogDescription}
          </p>
        )}
      </div>
    </a>
  )
}
```

- [ ] **Step 5: Create `BlogVideoBlock.tsx`**

```typescript
// components/blocks/BlogVideoBlock.tsx
import type { BlogVideoBlock } from '@/types'

function getEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`
  return null
}

export default function BlogVideoBlock({ block }: { block: BlogVideoBlock }) {
  const embedUrl = getEmbedUrl(block.url)
  if (!embedUrl) return null

  return (
    <figure>
      <div className="relative w-full aspect-video bg-gallery overflow-hidden">
        <iframe
          src={embedUrl}
          title={block.caption ?? 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-3 font-inter text-xs text-mine-shaft/30 text-center">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}
```

- [ ] **Step 6: Create `BlogCodeBlock.tsx`**

```typescript
// components/blocks/BlogCodeBlock.tsx
'use client'

import { useState } from 'react'
import type { BlogCodeBlock } from '@/types'

export default function BlogCodeBlock({ block }: { block: BlogCodeBlock }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(block.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-alto overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-mine-shaft/[0.03] border-b border-alto">
        <span className="font-mono text-[11px] text-mine-shaft/30 uppercase tracking-widest">
          {block.language}
        </span>
        <button
          onClick={handleCopy}
          className="font-inter text-[11px] text-mine-shaft/30 hover:text-mine-shaft transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-6 bg-mine-shaft/[0.02]">
        <code className="font-mono text-sm text-mine-shaft/60 leading-relaxed">
          {block.code}
        </code>
      </pre>
    </div>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add components/blocks/BlogTextBlock.tsx components/blocks/BlogQuoteBlock.tsx components/blocks/BlogDividerBlock.tsx components/blocks/BlogLinkCardBlock.tsx components/blocks/BlogVideoBlock.tsx components/blocks/BlogCodeBlock.tsx
git commit -m "feat(blocks): add 6 blog-specific renderer components"
```

---

## Task 3: Register new blocks in `BlockRenderer.tsx`

**Files:**
- Modify: `components/blocks/BlockRenderer.tsx`

- [ ] **Step 1: Add imports**

After line 12 (`import BlockMotion from './BlockMotion'`), add:

```typescript
import BlogTextBlock from './BlogTextBlock'
import BlogQuoteBlock from './BlogQuoteBlock'
import BlogDividerBlock from './BlogDividerBlock'
import BlogLinkCardBlock from './BlogLinkCardBlock'
import BlogVideoBlock from './BlogVideoBlock'
import BlogCodeBlock from './BlogCodeBlock'
```

- [ ] **Step 2: Add cases to the switch statement**

After `case 'scroll-story':` (line 29), before `default:`, add:

```typescript
case 'blog-text':      return <BlogTextBlock key={block.id} block={block} />
case 'blog-quote':     return <BlogQuoteBlock key={block.id} block={block} />
case 'blog-divider':   return <BlogDividerBlock key={block.id} block={block} />
case 'blog-link-card': return <BlogLinkCardBlock key={block.id} block={block} />
case 'blog-video':     return <BlogVideoBlock key={block.id} block={block} />
case 'blog-code':      return <BlogCodeBlock key={block.id} block={block} />
```

The 6 new blog blocks have no `motion` property, so the existing `!('motion' in block)` check already bypasses `BlockMotion` for them. They are all standard-width (not full-width, not edge-full), so no changes to the wrapper logic are needed.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/sungyounghan/project/vinus_website && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/blocks/BlockRenderer.tsx
git commit -m "feat(blocks): register blog block types in BlockRenderer"
```

---

## Task 4: Create OG fetch API route

**Files:**
- Create: `app/api/admin/og/route.ts`

- [ ] **Step 1: Create the route**

```typescript
// app/api/admin/og/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 })

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return NextResponse.json({ error: 'fetch failed' }, { status: 502 })

    const html = await res.text()

    function getMeta(prop: string): string {
      const patterns = [
        new RegExp(`<meta[^>]+property=["']og:${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:${prop}["']`, 'i'),
        new RegExp(`<meta[^>]+name=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
      ]
      for (const re of patterns) {
        const m = html.match(re)
        if (m?.[1]) return m[1].trim()
      }
      return ''
    }

    const ogTitle =
      getMeta('title') ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ||
      ''

    let ogSiteName = getMeta('site_name')
    if (!ogSiteName) {
      try { ogSiteName = new URL(url).hostname.replace(/^www\./, '') } catch { ogSiteName = '' }
    }

    return NextResponse.json({
      ogTitle,
      ogDescription: getMeta('description'),
      ogImage: getMeta('image'),
      ogSiteName,
    })
  } catch {
    return NextResponse.json({ error: 'fetch failed' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Test the route manually**

Start the dev server (`npm run dev`) and test:

```bash
curl "http://localhost:3000/api/admin/og?url=https://www.naver.com" | python3 -m json.tool
```

Expected: JSON with `ogTitle`, `ogDescription`, `ogImage`, `ogSiteName` fields.

- [ ] **Step 3: Commit**

```bash
git add app/api/admin/og/route.ts
git commit -m "feat(api): add /api/admin/og route for OG metadata fetching"
```

---

## Task 5: Create `BlogBlockEditor` component

**Files:**
- Create: `components/admin/BlogBlockEditor.tsx`

This editor only shows the 6 blog block types. It has no motion selector. Spacing selector is shared. The link-card block has a URL fetch button that calls `/api/admin/og`.

- [ ] **Step 1: Create `BlogBlockEditor.tsx`**

```typescript
// components/admin/BlogBlockEditor.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import type { Block, BlogTextVariant, BlogDividerStyle, CodeLanguage } from '@/types'
import type { BlogTextBlock, BlogQuoteBlock, BlogDividerBlock, BlogLinkCardBlock, BlogVideoBlock, BlogCodeBlock } from '@/types'

type BlogBlock = BlogTextBlock | BlogQuoteBlock | BlogDividerBlock | BlogLinkCardBlock | BlogVideoBlock | BlogCodeBlock
type BlogBlockType = BlogBlock['type']

interface Props {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

const BLOG_BLOCK_TYPES: { value: BlogBlockType; label: string }[] = [
  { value: 'blog-text',      label: '텍스트' },
  { value: 'blog-quote',     label: '인용구' },
  { value: 'blog-divider',   label: '구분선' },
  { value: 'blog-link-card', label: '링크 카드' },
  { value: 'blog-video',     label: '동영상' },
  { value: 'blog-code',      label: '코드 블록' },
]

const CODE_LANGUAGES: CodeLanguage[] = ['javascript', 'typescript', 'css', 'html', 'bash', 'json', 'python', 'text']

function createBlogBlock(type: BlogBlockType): BlogBlock {
  const id = crypto.randomUUID()
  switch (type) {
    case 'blog-text':      return { id, type, variant: 'paragraph', content: '', spacing: 'md' }
    case 'blog-quote':     return { id, type, quote: '', attribution: '', spacing: 'md' }
    case 'blog-divider':   return { id, type, style: 'line', spacing: 'lg' }
    case 'blog-link-card': return { id, type, url: '', ogTitle: '', ogDescription: '', ogImage: '', ogSiteName: '', spacing: 'md' }
    case 'blog-video':     return { id, type, url: '', caption: '', spacing: 'md' }
    case 'blog-code':      return { id, type, code: '', language: 'javascript', spacing: 'md' }
  }
}

function isBlogBlock(b: Block): b is BlogBlock {
  return b.type === 'blog-text' || b.type === 'blog-quote' || b.type === 'blog-divider' ||
    b.type === 'blog-link-card' || b.type === 'blog-video' || b.type === 'blog-code'
}

function moveUp(blocks: Block[], index: number): Block[] {
  if (index === 0) return blocks
  const next = [...blocks]
  ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
  return next
}

function moveDown(blocks: Block[], index: number): Block[] {
  if (index === blocks.length - 1) return blocks
  const next = [...blocks]
  ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
  return next
}

function updateBlock(blocks: Block[], index: number, updated: Block): Block[] {
  return blocks.map((b, i) => (i === index ? updated : b))
}

function removeBlock(blocks: Block[], index: number): Block[] {
  return blocks.filter((_, i) => i !== index)
}

const BLOCK_LABELS: Record<BlogBlockType, string> = {
  'blog-text':      '텍스트',
  'blog-quote':     '인용구',
  'blog-divider':   '구분선',
  'blog-link-card': '링크 카드',
  'blog-video':     '동영상',
  'blog-code':      '코드 블록',
}

export default function BlogBlockEditor({ blocks, onChange }: Props) {
  const [addType, setAddType] = useState<BlogBlockType>('blog-text')
  const [fetchingOg, setFetchingOg] = useState<Record<string, boolean>>({})
  const blocksRef = useRef(blocks)
  useEffect(() => { blocksRef.current = blocks }, [blocks])

  function handleAdd() {
    onChange([...blocks, createBlogBlock(addType)])
  }

  async function fetchOg(blockId: string, index: number, url: string) {
    if (!url) return
    setFetchingOg(prev => ({ ...prev, [blockId]: true }))
    try {
      const res = await fetch(`/api/admin/og?url=${encodeURIComponent(url)}`)
      const json = await res.json() as { ogTitle?: string; ogDescription?: string; ogImage?: string; ogSiteName?: string; error?: string }
      if (!res.ok || json.error) {
        alert('OG 정보를 가져올 수 없습니다: ' + (json.error ?? '알 수 없는 오류'))
        return
      }
      const block = blocksRef.current[index]
      if (block.type === 'blog-link-card') {
        onChange(updateBlock(blocksRef.current, index, {
          ...block,
          ogTitle: json.ogTitle ?? '',
          ogDescription: json.ogDescription ?? '',
          ogImage: json.ogImage ?? '',
          ogSiteName: json.ogSiteName ?? '',
        }))
      }
    } catch {
      alert('OG 정보 fetch 중 오류가 발생했습니다.')
    } finally {
      setFetchingOg(prev => ({ ...prev, [blockId]: false }))
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {blocks.map((block, index) => {
          if (!isBlogBlock(block)) return null

          return (
            <div key={block.id} className="border border-gray-200 p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {BLOCK_LABELS[block.type as BlogBlockType]}
                  </span>
                  <select
                    value={block.spacing ?? 'md'}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, spacing: e.target.value as Block['spacing'] }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="none">간격 없음</option>
                    <option value="sm">간격 24px</option>
                    <option value="md">간격 48px</option>
                    <option value="lg">간격 80px</option>
                    <option value="xl">간격 120px</option>
                    <option value="2xl">간격 200px</option>
                    <option value="3xl">간격 240px</option>
                  </select>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => onChange(moveUp(blocks, index))} disabled={index === 0}
                    className="px-2 py-1 text-xs border border-gray-300 disabled:opacity-30 hover:bg-gray-100">↑</button>
                  <button type="button" onClick={() => onChange(moveDown(blocks, index))} disabled={index === blocks.length - 1}
                    className="px-2 py-1 text-xs border border-gray-300 disabled:opacity-30 hover:bg-gray-100">↓</button>
                  <button type="button" onClick={() => onChange(removeBlock(blocks, index))}
                    className="px-2 py-1 text-xs border border-red-300 text-red-500 hover:bg-red-50">삭제</button>
                </div>
              </div>

              {/* blog-text */}
              {block.type === 'blog-text' && (
                <div className="space-y-2">
                  <select
                    value={block.variant}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, variant: e.target.value as BlogTextVariant }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    <option value="paragraph">문단 (Paragraph)</option>
                    <option value="h2">제목 H2</option>
                    <option value="h3">소제목 H3</option>
                  </select>
                  <textarea
                    value={block.content}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, content: e.target.value }))}
                    rows={block.variant === 'paragraph' ? 5 : 2}
                    placeholder={block.variant === 'paragraph' ? '본문 텍스트 입력' : '제목 입력'}
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-none bg-transparent"
                  />
                </div>
              )}

              {/* blog-quote */}
              {block.type === 'blog-quote' && (
                <div className="space-y-2">
                  <textarea
                    value={block.quote}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, quote: e.target.value }))}
                    rows={3}
                    placeholder="인용문 내용"
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-none bg-transparent"
                  />
                  <input
                    type="text"
                    value={block.attribution ?? ''}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, attribution: e.target.value }))}
                    placeholder="출처 / 저자 (선택)"
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                  />
                </div>
              )}

              {/* blog-divider */}
              {block.type === 'blog-divider' && (
                <div className="flex gap-2">
                  {(['line', 'space'] as BlogDividerStyle[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onChange(updateBlock(blocks, index, { ...block, style: s }))}
                      className={`text-xs px-3 py-1 border ${block.style === s ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {s === 'line' ? '가로선' : '빈 공간'}
                    </button>
                  ))}
                </div>
              )}

              {/* blog-link-card */}
              {block.type === 'blog-link-card' && (
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={block.url}
                      onChange={(e) => onChange(updateBlock(blocks, index, { ...block, url: e.target.value }))}
                      placeholder="https://example.com"
                      className="flex-1 border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => fetchOg(block.id, index, block.url)}
                      disabled={!block.url || fetchingOg[block.id]}
                      className="border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-100 disabled:opacity-40 whitespace-nowrap"
                    >
                      {fetchingOg[block.id] ? '불러오는 중...' : 'OG 정보 가져오기'}
                    </button>
                  </div>
                  {block.ogTitle && (
                    <div className="border border-gray-100 p-3 space-y-1 bg-gray-50">
                      {block.ogImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={block.ogImage} alt="" className="w-full h-24 object-cover mb-2" />
                      )}
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">{block.ogSiteName}</p>
                      <p className="text-sm font-medium text-gray-800 leading-tight">{block.ogTitle}</p>
                      {block.ogDescription && (
                        <p className="text-xs text-gray-500 line-clamp-2">{block.ogDescription}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* blog-video */}
              {block.type === 'blog-video' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={block.url}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, url: e.target.value }))}
                    placeholder="YouTube 또는 Vimeo URL"
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                  />
                  <input
                    type="text"
                    value={block.caption ?? ''}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, caption: e.target.value }))}
                    placeholder="캡션 (선택)"
                    className="w-full border-b border-gray-300 py-2 text-sm text-gray-500 placeholder:text-gray-400 focus:outline-none focus:border-black bg-transparent"
                  />
                </div>
              )}

              {/* blog-code */}
              {block.type === 'blog-code' && (
                <div className="space-y-2">
                  <select
                    value={block.language}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, language: e.target.value as CodeLanguage }))}
                    className="text-xs border border-gray-200 px-2 py-1 text-gray-600 bg-transparent focus:outline-none focus:border-black"
                  >
                    {CODE_LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <textarea
                    value={block.code}
                    onChange={(e) => onChange(updateBlock(blocks, index, { ...block, code: e.target.value }))}
                    rows={8}
                    placeholder="코드 입력..."
                    className="w-full border border-gray-200 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-black resize-y bg-transparent font-mono"
                    spellCheck={false}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add block */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <select
          value={addType}
          onChange={(e) => setAddType(e.target.value as BlogBlockType)}
          className="border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-black bg-transparent"
        >
          {BLOG_BLOCK_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors"
        >
          + 블록 추가
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/sungyounghan/project/vinus_website && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/admin/BlogBlockEditor.tsx
git commit -m "feat(admin): add BlogBlockEditor for blog-specific block editing"
```

---

## Task 6: Wire `BlogForm` to use `BlogBlockEditor`

**Files:**
- Modify: `components/admin/BlogForm.tsx` (line 5, line 239)

- [ ] **Step 1: Swap the import**

Replace line 5:
```typescript
// BEFORE
import BlockEditor from './BlockEditor'

// AFTER
import BlogBlockEditor from './BlogBlockEditor'
```

- [ ] **Step 2: Swap the component usage**

On line 239, replace:
```tsx
// BEFORE
<BlockEditor blocks={blocks} onChange={setBlocks} />

// AFTER
<BlogBlockEditor blocks={blocks} onChange={setBlocks} />
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/sungyounghan/project/vinus_website && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/admin/BlogForm.tsx
git commit -m "feat(admin): wire BlogForm to BlogBlockEditor"
```

---

## Task 7: Push all changes

- [ ] **Step 1: Push to remote**

```bash
GH_TOKEN="" git push
```

Expected: all 6 commits pushed to the remote branch.

---

## Self-Review Checklist

- [x] **Spec coverage:** All 6 block types covered — blog-text, blog-quote, blog-divider, blog-link-card, blog-video, blog-code
- [x] **Placeholder scan:** No TBD / TODO in any code block
- [x] **Type consistency:** `BlogTextVariant`, `BlogDividerStyle`, `CodeLanguage` defined in Task 1 and used consistently in Tasks 2, 5
- [x] **OG fetch:** Stored at write time in admin, public renderer reads stored data — no runtime OG fetch
- [x] **BlockRenderer:** Blog blocks have no `motion` → `!('motion' in block)` already skips `BlockMotion` wrapper correctly
- [x] **BlogForm:** Only line 5 (import) and line 239 (usage) change — all other form fields untouched
