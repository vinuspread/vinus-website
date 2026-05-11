# VINUSPREAD — Design System
**레퍼런스:** https://wearemotto.com/  
**방향:** 극도로 절제된 편집 디자인. 장식 없음. 타이포그래피와 여백이 전부.  
**적용 원칙:** 기존 서브페이지 구조 유지 — 스타일만 교체.

---

## 1. Color Tokens

`globals.css` `@theme` 블록을 아래로 교체:

```css
@theme {
  /* ── Core ── */
  --color-base:       #f2f2f0;   /* 페이지 배경 (motto 특유의 따뜻한 오프화이트) */
  --color-ink:        #0a0a0a;   /* 본문 텍스트 */
  --color-ink-muted:  #0a0a0a66; /* 40% 투명 — 레이블, 메타 텍스트 */
  --color-border:     #0a0a0a1a; /* 10% 투명 — 구분선 */
  --color-surface:    #ffffff;   /* 카드, 오버레이 */

  /* ── Legacy aliases (기존 코드 호환) ── */
  --color-mine-shaft: #0a0a0a;
  --color-gallery:    #f2f2f0;
  --color-alto:       #0a0a0a1a;
  --color-ash:        #ccc4b9;

  /* ── Fonts ── */
  --font-inter:       var(--font-inter), "Inter", sans-serif;
  --font-pretendard:  "Pretendard Variable", Pretendard, sans-serif;

  /* ── Spacing ── */
  --spacing-page-padding: 40px;
  --spacing-column:       38.4px;

  /* ── Easing ── */
  --ease-expo-out: cubic-bezier(.075, .82, .165, 1);
  --ease-image:    cubic-bezier(.4, .4, .1, 1);
  --ease-fill:     cubic-bezier(.3, .3, 0, 1);
}
```

**교체 규칙:**
- `bg-gallery` → `bg-base` 또는 `bg-[#f2f2f0]`
- `text-mine-shaft` → `text-ink` 또는 `text-[#0a0a0a]`
- `border-alto` → `border-border` 또는 `border-[#0a0a0a]/10`
- 흰 배경 카드: `bg-surface` 또는 `bg-white`

---

## 2. Typography

### 스케일

| 역할 | 크기 | Weight | Tracking | Line-height |
|------|------|--------|----------|-------------|
| Display XL | `clamp(60px, 8vw, 120px)` | 700 | -0.04em | 1.0 |
| Display L | `clamp(40px, 5vw, 72px)` | 700 | -0.03em | 1.05 |
| Heading | `clamp(28px, 3vw, 48px)` | 600 | -0.02em | 1.1 |
| Subheading | `20px–24px` | 500 | -0.01em | 1.3 |
| Body | `15px–17px` | 400 | -0.01em | 1.7 |
| Label | `11px` | 700 | 0.18em | 1.4 |
| Caption | `12px–13px` | 400 | 0.05em | 1.6 |

### 패턴

```tsx
{/* Display — 섹션 타이틀 */}
<h2 className="font-inter font-bold leading-[1.05] tracking-[-0.03em]
  text-[clamp(40px,5vw,72px)] text-ink">
  Section Title
</h2>

{/* Label — 섹션 상단 레이블 */}
<p className="font-inter font-bold text-[11px] tracking-[0.18em] uppercase text-ink-muted">
  ( Section Label )
</p>

{/* Body */}
<p className="font-pretendard font-light text-[16px] leading-[1.7] tracking-[-0.01em] text-ink/70">
  본문 텍스트
</p>

{/* Meta — 날짜, 카테고리 */}
<span className="font-inter text-[12px] tracking-[0.05em] uppercase text-ink/40">
  2024 — Branding
</span>
```

### 폰트 적용 범위

- `font-inter`: 모든 헤딩, 레이블, 버튼, 내비게이션, 숫자
- `font-pretendard`: 본문 단락, 한글 텍스트

---

## 3. Layout

```
최대 너비: 없음 (full-bleed)
콘텐츠 패딩: px-[40px] (모바일: px-[20px])
섹션 수직 패딩: py-[100px] ~ py-[140px]
그리드: 기본 8컬럼 (md:grid-cols-8)
```

### 섹션 구조 템플릿

```tsx
<section className="px-page-padding py-[120px] bg-base">
  
  {/* 섹션 레이블 — 항상 상단 */}
  <p className="font-inter font-bold text-[11px] tracking-[0.18em] uppercase 
    text-ink/40 mb-[60px]">
    ( Label )
  </p>

  {/* 구분선 */}
  <div className="w-full h-px bg-ink/10 mb-[48px]" />

  {/* 콘텐츠 */}
  ...

</section>
```

---

## 4. Navigation (Header.tsx)

**motto 스타일 특징:**
- 배경 없음, 완전 투명
- 로고 좌측 (텍스트 또는 아이콘)
- 우측: 텍스트 링크 2개 ("Work with us", "Menu" 스타일)
- 스크롤해도 배경 채움 없음 — 다크 섹션 위에서는 `text-white`, 라이트 섹션에서는 `text-ink`
- 폰트: `font-inter font-bold text-[11px] tracking-[0.15em] uppercase`

```tsx
{/* Header 내비게이션 링크 스타일 */}
<Link 
  href="/contact" 
  className="font-inter font-bold text-[11px] tracking-[0.15em] uppercase
    border-b border-current pb-[2px] hover:opacity-60 transition-opacity"
>
  Work with us
</Link>
```

---

## 5. Text Link CTA (ArrowLink)

버튼 사용 금지. 모든 CTA는 텍스트 링크 + 화살표.

```tsx
// src/components/common/ArrowLink.tsx

export const ArrowLink = ({ href, children, size = "md", className = "" }) => {
  const sizes = {
    sm: "text-[13px] tracking-[-0.005em]",
    md: "text-[15px] tracking-[-0.01em]",
    lg: "text-[clamp(20px,2.5vw,32px)] tracking-[-0.02em]",
  };

  return (
    <Link 
      href={href}
      className={`group inline-flex items-center gap-3 font-inter font-medium
        border-b border-ink/25 pb-[6px]
        hover:border-ink transition-colors duration-200
        ${sizes[size]} ${className}`}
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
    </Link>
  );
};
```

### 대형 링크 목록 (Services / Choose Your Purpose 스타일)

```tsx
<div className="border-t border-ink/10">
  {links.map(({ label, href }, i) => (
    <div key={href} className="border-b border-ink/10 group">
      <Link
        href={href}
        className="flex items-center justify-between w-full 
          py-[22px] font-inter font-medium
          text-[clamp(18px,2.8vw,38px)] tracking-[-0.02em]
          hover:opacity-60 transition-opacity duration-200"
      >
        <span>{label}</span>
        <span className="text-[20px] transition-transform duration-300 group-hover:translate-x-2">→</span>
      </Link>
    </div>
  ))}
</div>
```

---

## 6. Cards (ProjectCard.tsx)

**motto 카드 특징:**
- 이미지: aspect-ratio 유지, 호버 시 미세 스케일 업 (1.03)
- 텍스트: 이미지 아래 (오버레이 없음)
- 메타: 카테고리 + 연도 — `text-ink/40`
- 제목: 폰트 medium, 약간 큰 사이즈
- 구분선 없음, 카드 배경 없음

```tsx
{/* 카드 레이아웃 */}
<div className="group cursor-pointer">
  
  {/* 이미지 */}
  <div className="overflow-hidden aspect-[4/3] mb-5">
    <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(.4,.4,.1,1)]
      group-hover:scale-[1.03]">
      <Image fill className="object-cover" ... />
    </div>
  </div>
  
  {/* 텍스트 */}
  <div className="flex items-start justify-between gap-4">
    <h3 className="font-inter font-medium text-[17px] tracking-[-0.01em] leading-[1.3]">
      {title}
    </h3>
    <span className="font-inter text-[12px] tracking-[0.05em] uppercase text-ink/40 
      shrink-0 mt-[3px]">
      {year}
    </span>
  </div>
  <p className="font-inter text-[12px] tracking-[0.05em] uppercase text-ink/40 mt-1">
    {category}
  </p>

</div>
```

---

## 7. 서브페이지 공통 스타일 변경 지침

기존 구조 유지. 아래 스타일만 교체.

### PageHeader.tsx

```tsx
{/* 현재 → 변경 */}
- 배경: bg-mine-shaft → bg-base
- 제목: text-white → text-ink, 폰트 크기 동일 유지
- 메타 텍스트: text-white/40 → text-ink/40
- 구분선: border-white/10 → border-ink/10
```

### work/page.tsx (포트폴리오 목록)

```tsx
{/* 카테고리 필터 탭 */}
- 배경 없음, 텍스트만
- 활성: font-bold, border-b border-ink
- 비활성: text-ink/40 hover:text-ink

{/* 그리드 간격 */}
- gap-x-[32px] gap-y-[60px]
- 하단 여백: mb-[160px]
```

### work/[slug]/page.tsx (포트폴리오 상세)

```tsx
{/* 메타바 */}
- bg-white → bg-surface (border-b border-ink/10)
- 레이블: text-[11px] tracking-[0.15em] uppercase text-ink/40
- 값: text-[14px] font-medium

{/* Next Project */}
- "Next Project" 레이블: section-label 스타일
- 이미지 호버 스케일 유지
```

### about/page.tsx

```tsx
{/* 히어로 */}
- 배경: bg-base (어두운 배경 제거)
- 텍스트: text-ink
- Display 텍스트 크기 유지

{/* 본문 섹션들 */}
- 구분선: border-ink/10
- 섹션 레이블: ( About ) 형식으로 변경
```

### contact/page.tsx

```tsx
{/* 폼 */}
- input border: border-ink/15 focus:border-ink
- placeholder: text-ink/30
- submit 버튼 → ArrowLink 스타일로 교체
```

---

## 8. 간격 시스템

```
섹션 내부 상하 패딩:   py-[100px] (기본) / py-[140px] (크게)
섹션 레이블 → 제목:   mb-[48px]
제목 → 본문:          mb-[32px]
항목 간격 (리스트):   gap-[16px] ~ gap-[24px]
카드 그리드 gap:       gap-x-[32px] gap-y-[64px]
구분선 상하 여백:      my-[40px] ~ my-[60px]
```

---

## 9. 적용 우선순위

| 우선순위 | 대상 | 작업 |
|----------|------|------|
| 1 | `globals.css` | Color token 교체 |
| 2 | `Header.tsx` | 투명 배경 + 텍스트 링크 스타일 |
| 3 | `ArrowLink.tsx` | 신규 생성 |
| 4 | `ProjectCard.tsx` | 이미지 아래 텍스트 레이아웃 |
| 5 | `PageHeader.tsx` | 밝은 배경으로 전환 |
| 6 | 서브페이지 전체 | 섹션 레이블 + 간격 적용 |

---

## 10. 절대 금지

- `rounded-*` — 모서리 둥글림 없음 (버튼, 카드, 이미지 모두 직각)
- `shadow-*` — 그림자 없음
- `btn-front`, `DoubleButton` — 버튼 UI 사용 금지. ArrowLink로 대체
- 컬러풀한 accent color — base/ink/muted 3가지만
- 애니메이션 추가 — 기존 useReveal 시스템 그대로 유지
- `HeroSectionV2.tsx`, `useReveal.ts`, `SmoothScroll.tsx` — 수정 금지
