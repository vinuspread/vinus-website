# Vinuspread — Gemma 인수인계서

> 브랜치: `ui-design` / 경로: `d:/Work/vinuspread2/`
> 마지막 업데이트: 2026-05-08 (Claude)

---

## ⚠️ 절대 건드리지 말 것

아래 파일은 완성 상태입니다. 이유 불문 수정 금지.

| 파일 | 이유 |
|------|------|
| `src/components/sections/HeroSectionV2.tsx` | GSAP 패럴랙스 구조 완성. 세 번 파괴된 전적 있음 |
| `src/components/common/SmoothScroll.tsx` | Lenis + GSAP ticker 연동 완성 |
| `src/components/common/CustomCursor.tsx` | GSAP dot+ring 커서 완성 |
| `src/components/layout/Header.tsx` | 투명→불투명, 스크롤 hide/show 완성 |
| `src/components/layout/Footer.tsx` | 소셜링크, 연락처, Next Page 동적 완성 |
| `src/components/common/PageHeader.tsx` | 모든 서브페이지 공통 헤더 완성 |
| `src/hooks/useReveal.ts` | IntersectionObserver 기반 안정 버전. GSAP으로 교체 시도했다가 전체 콘텐츠 invisible 사태 발생 — 절대 GSAP으로 바꾸지 말 것 |
| `src/app/globals.css` | 애니메이션 시스템, 토큰 완성 |

---

## 프로젝트 스택

- **Next.js 16** App Router (`src/app/(public)/`)
- **React 19** + TypeScript 5
- **Tailwind CSS v4** (토큰은 `src/app/globals.css` `@theme` 블록)
- **GSAP 3** + ScrollTrigger — **히어로 섹션 전용**. 다른 곳에 GSAP 애니메이션 추가 금지
- **Lenis 1.x** — 스무스 스크롤 (`SmoothScroll.tsx`)
- **Inter** (font-inter, 헤딩) / **Pretendard** (본문)

### 핵심 CSS 토큰
```
bg-gallery        #f0f0f0   페이지 기본 배경
text-mine-shaft   #2a2a2a   기본 텍스트
border-alto       #d6d6d6   구분선
px-page-padding   40px      좌우 기본 패딩
gap-column        38.4px    그리드 gap
```

### 공통 규칙
- 하드코딩 색상 절대 금지 — 토큰만 사용
- TypeScript 오류 없이 작성
- `"use client"` — 애니메이션·훅 쓰는 컴포넌트에 반드시 선언

---

## 현재 완료 목록

| 파일 | 상태 |
|------|------|
| `src/components/layout/Header.tsx` | ✅ |
| `src/components/layout/Footer.tsx` | ✅ |
| `src/components/common/PageHeader.tsx` | ✅ |
| `src/components/common/ProjectCard.tsx` | ✅ 호버 시 텍스트 슬라이드업 |
| `src/components/common/CustomCursor.tsx` | ✅ |
| `src/components/common/SmoothScroll.tsx` | ✅ |
| `src/components/sections/HeroSectionV2.tsx` | ✅ 수정 금지 |
| `src/components/sections/WorkGrid.tsx` | ✅ |
| `src/components/sections/AboutSection.tsx` | ✅ |
| `src/components/sections/ClientsBrandsSection.tsx` | ✅ |
| `src/components/sections/LatestNewsSection.tsx` | ✅ |
| `src/hooks/useReveal.ts` | ✅ 수정 금지 |
| `src/app/globals.css` | ✅ 수정 금지 |
| `src/app/(public)/page.tsx` | ✅ |
| `src/app/(public)/work/page.tsx` | ✅ 카테고리 필터 텍스트 탭 |
| `src/app/(public)/work/[slug]/page.tsx` | ✅ 메타바, 섹션 넘버, Next Project |
| `src/app/(public)/services/page.tsx` | ✅ |
| `src/app/(public)/story/page.tsx` | ✅ |
| `src/app/(public)/contact/page.tsx` | ✅ |
| `src/app/(public)/about/page.tsx` | ✅ |
| `src/lib/projects.ts` | ✅ |
| `src/lib/stories.ts` | ✅ |

---

## 애니메이션 시스템 — 작동 원리

### 구조 (건드리지 말 것)

```
useReveal() 훅
  └── IntersectionObserver로 anim-wrap 요소 감지
        └── 뷰포트 진입 시 anim-wrap에 .ready 클래스 추가
              └── CSS transition이 아래 클래스들을 애니메이션

CSS:
  .anim-move-up           → translateY(36px) + opacity:0 → 0 + opacity:1
  .anim-move-up-img       → scale(1.04) + opacity:0     → 1 + opacity:1
  .anim-fill-width        → width:0                      → width:100%
```

### 사용법

```tsx
// 섹션 컴포넌트에서
const ref = useReveal();
return (
  <section ref={ref as any} className="anim-wrap ...">
    {/* 텍스트 reveal */}
    <span className="anim-clip">
      <span className="anim-move-up" data-delay="0">텍스트</span>
    </span>
    <span className="anim-clip">
      <span className="anim-move-up" data-delay="100">두 번째 줄</span>
    </span>

    {/* 이미지 reveal */}
    <div className="anim-clip w-full h-full">
      <div className="anim-move-up-img w-full h-full relative" data-delay="0">
        <Image fill ... />
      </div>
    </div>

    {/* 구분선 reveal */}
    <div className="w-full h-px bg-alto anim-fill-width" />
  </section>
);
```

### 주의사항
- `anim-clip`은 `display: inline-block; overflow: hidden` — 줄바꿈이 필요하면 `block overflow-hidden` 사용
- `data-delay`는 ms 단위 (예: `data-delay="200"` = 0.2초 지연)
- `anim-wrap` 없이 `anim-move-up`만 쓰면 영구적으로 숨겨짐 — 반드시 함께 사용

---

## HeroSectionV2 — 절대 변경 금지

네 번 파괴된 이력이 있습니다. 현재 구조를 정확히 기록합니다.

```
section.relative.h-[220vh]               ← 섹션 전체 높이 (배경 포함)
  ├── div.absolute.inset-0               ← 이미지가 220vh 전체를 커버
  │     └── Image src="/images/hero-bg.jpg"
  │           object-cover object-top
  ├── overlayRef  (absolute inset-0, bg-black/30)  ← 오버레이도 220vh 전체
  └── div.sticky.top-0.h-screen.z-10    ← 콘텐츠만 sticky
        └── div.h-full.flex.flex-col
              ├── topRowRef  (Design Studio — Seoul / Est. 2015)
              ├── 4줄 타이틀  (TITLE_LINES 상수, clamp 148px)
              ├── subcopyRef  (브랜드와 사용자를 잇는 디지털 경험 <strong>)
              └── ctaRef  (<Link href="#work"> Scroll down for projects)
```

**왜 이 구조인가:**  
이미지를 sticky div 안에 두면 sticky 영역(100vh) 아래 스크롤 공간이 section 배경색(검정)으로 노출된다.  
이미지를 section에 absolute로 두면 220vh 전체를 이미지가 덮어, 스크롤해도 항상 이미지가 보인다.

**GSAP (진입 애니메이션만, 스크롤 패럴랙스 없음):**
- overlay: opacity 1→0.3 (이미지 reveal)
- topRow: opacity 0→1, y -8→0
- titles: yPercent 110→0, stagger 0.08
- subcopy, cta: opacity 0→1

**절대 하지 말 것:**
- `stage1` / `stage2` / `backgroundImage` props 추가 금지
- 이미지를 sticky div 안으로 옮기지 말 것 (검정 공간 재발)
- 섹션에 `bg-[#0d0d0d]` 등 배경색 추가 금지 (이미지가 가려짐)
- 이미지 파일명 변경 금지 (`/images/hero-bg.jpg` 고정)
- "Digital Innovation for your Future" 블록 추가 금지 (요청된 적 없음)
- `h-[300vh]` 등으로 높이 변경 금지 (220vh 고정)

---

## 파일 구조

```
src/
├── app/(public)/
│   ├── layout.tsx          ← SmoothScroll + CustomCursor + Header + Footer
│   ├── page.tsx            ← 홈
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── services/page.tsx
│   ├── story/page.tsx
│   ├── contact/page.tsx
│   └── about/page.tsx
├── components/
│   ├── common/
│   │   ├── PageHeader.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── CustomCursor.tsx
│   │   └── SmoothScroll.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSectionV2.tsx   ← 수정 금지
│       ├── WorkGrid.tsx
│       ├── AboutSection.tsx
│       ├── AwardsSection.tsx
│       ├── VideoSection.tsx
│       ├── ClientsBrandsSection.tsx
│       ├── ImageSliderSection.tsx
│       └── LatestNewsSection.tsx
├── lib/
│   ├── projects.ts
│   └── stories.ts
└── hooks/
    └── useReveal.ts            ← 수정 금지
```

---

## 오류 이력 — 절대 반복하지 말 것

| 오류 | 교훈 |
|------|------|
| HeroSectionV2 sticky 구조 제거 (3회) | `h-[220vh]` + `sticky top-0 h-screen` 구조 고정. min-h-screen으로 바꾸면 패럴랙스 파괴 |
| 이미지 파일명 오기입 (3회) | `/images/hero-bg.jpg` — premium·webp 등 변형 없음 |
| stage2 블록 재추가 (3회) | "Digital Innovation" 블록은 요청된 적 없음. 추가 금지 |
| useReveal을 GSAP ScrollTrigger로 교체 | Lenis + ScrollTrigger 타이밍 불일치로 전체 섹션 콘텐츠 invisible — IntersectionObserver 유지 필수 |
| CSS opacity:0 + GSAP 충돌 | CSS로 숨긴 요소를 GSAP이 못 살리면 영구 invisible. CSS 초기 상태와 GSAP fromTo는 함께 관리할 것 |
| `anim-clip` + `block` 충돌 | anim-clip은 inline-block. 줄바꿈 필요 시 `block overflow-hidden` 따로 사용 |
| `nav-hidden` transition 충돌 | nav-hidden에 transition 넣으면 헤더 transition-all과 충돌 |
| dangerouslySetInnerHTML 남용 | 일반 텍스트에 사용 금지 |
| 불필요한 props 추가 | 요청하지 않은 props/interface 추가 금지. 단순하게 유지 |
