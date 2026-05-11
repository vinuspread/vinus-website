# Vinus — 코드 작업 참조 문서

**브랜치:** `ui-design` (main에 직접 push 금지)  
**기준 피그마:** https://www.figma.com/design/Ub9BjTviP441WaFb6ZMe1N/Untitled?node-id=1-150  
**기준일:** 2026-05-08

---

## 🔴 젬마 — 현재 작업 대기 목록

| 우선순위 | 작업 | 상태 |
|----------|------|------|
| 1 | **스택 카드 인터랙션** — 히어로 하단 섹션 전환 효과 구현 (아래 상세 스펙 참고) | ✅ 완료 (2026-05-08) |
| 2 | **스택 카드 롤백** — 스택 카드 인터랙션 제거, 원래 방식으로 복구 (아래 상세 스펙 참고) | ✅ 완료 (2026-05-11) |
| 3 | **Motto 스타일 UI 적용** — wearemotto.com 디자인 레퍼런스 기반 사이트 전반 UI 고도화 (아래 상세 스펙 참고) | ✅ 완료 (2026-05-11) |

> 각 작업 완료 후 이 표의 상태를 ✅로 변경하고 완료 목록에 추가할 것.

---

---

## Motto 스타일 UI 적용 지시 — 젬마

**레퍼런스:** https://wearemotto.com/  
**목표:** 현재 사이트의 UI를 motto 스타일로 고도화. 버튼 제거 → 언더라인 텍스트 링크로 전환, 타이포그래피 정제, 섹션 레이아웃 클린업.

---

### 1. 텍스트 링크 컴포넌트 생성 — `src/components/common/ArrowLink.tsx`

motto.com의 CTA는 버튼이 아니라 언더라인+화살표 텍스트 링크.

```tsx
"use client";
import Link from "next/link";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export const ArrowLink = ({ href, children, className = "", external }: ArrowLinkProps) => {
  const classes = `group inline-flex items-center gap-3 border-b border-mine-shaft/30 pb-3 
    font-inter text-[15px] font-medium tracking-[-0.01em] text-mine-shaft 
    hover:border-mine-shaft transition-colors duration-300 ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <span>{children}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
};
```

---

### 2. 서비스 섹션 — `src/components/sections/ServicesSection.tsx` 신규 생성

motto.com의 "(CHOOSE YOUR PURPOSE)" 스타일. 섹션 레이블 + 대형 텍스트 링크 3개.

```tsx
"use client";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";

export const ServicesSection = () => {
  const ref = useReveal();

  return (
    <section ref={ref as any} className="anim-wrap py-[120px] px-page-padding bg-gallery">
      
      {/* 섹션 레이블 */}
      <p className="anim-move-up font-inter text-[11px] font-bold tracking-[0.2em] uppercase text-mine-shaft/40 mb-[80px]">
        ( Choose Your Purpose )
      </p>

      {/* 대형 링크 목록 */}
      <div className="flex flex-col gap-0 border-t border-alto">
        {[
          { label: "Explore our services", href: "/services" },
          { label: "See our case studies", href: "/work" },
          { label: "Discover our methodology", href: "/about" },
        ].map(({ label, href }, i) => (
          <div key={href} className="border-b border-alto group">
            <ArrowLink
              href={href}
              className="anim-move-up w-full justify-between border-none pb-0 py-[28px]
                font-inter text-[clamp(22px,3vw,40px)] font-medium tracking-[-0.02em]"
            >
              {label}
            </ArrowLink>
          </div>
        ))}
      </div>

    </section>
  );
};
```

---

### 3. 홈 `page.tsx`에 ServicesSection 추가

HeroSectionV2 바로 다음, WorkGrid 위에 삽입:

```tsx
<HeroSectionV2 />
<ServicesSection />
<WorkGrid limit={4} />
...
```

import 추가:
```tsx
import { ServicesSection } from "@/components/sections/ServicesSection";
```

---

### 4. 기존 `DoubleButton` CTA 텍스트 링크로 교체

WorkGrid 하단 "View All Work" 버튼을 `ArrowLink`로 교체:

```tsx
// 기존
<DoubleButton labelFront="View All Work" href="/work" />

// 변경
<ArrowLink href="/work">View All Work</ArrowLink>
```

AboutSection CTA도 동일하게 교체.

---

### 5. 타이포그래피 정제 — 전역 적용

`globals.css`에 추가:

```css
/* Motto Style — Display Heading */
.display-heading {
  font-family: var(--font-inter);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

/* Motto Style — Section Label */
.section-label {
  font-family: var(--font-inter);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgb(42 42 42 / 0.4);
}
```

`ClientsBrandsSection`, `AwardsSection` 등 섹션 제목에 `display-heading` 클래스 적용.  
섹션 레이블(Clients, Awards 등)에 `section-label` 적용.

---

### 6. 주의사항

- `ArrowLink` 내부에서 `ArrowLink`를 중첩 사용 금지
- `border-none` 오버라이드 사용 시 Tailwind `!` prefix 대신 className 순서 조정으로 해결
- `data-delay` 순서: 각 링크에 `data-delay={i * 80}` 적용
- `HeroSectionV2` 수정 금지

완료 후 커밋 (브랜치: ui-design).

---

## 스택 카드 롤백 지시 — 젬마

스택 카드 인터랙션을 제거하고 원래 방식으로 복구한다.

1. `src/hooks/useStackCards.ts` 파일 삭제
2. `src/app/(public)/page.tsx`에서 `useStackCards` import 및 훅 호출 제거, `stack-container` div와 `stack-card` section 래퍼 제거 — 각 섹션을 원래처럼 직접 나열
3. `src/app/globals.css`에서 `.stack-container`, `.stack-card`, `.stack-card.is-stacking` 블록 제거
4. `page.tsx` 최종 구조:

```tsx
"use client";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSectionV2 />
      <WorkGrid limit={4} />
      <AboutSection />
      <VideoSection />
      <ClientsBrandsSection />
      <AwardsSection />
      <LatestNewsSection />
      <ImageSliderSection />
    </div>
  );
}
```

완료 후 커밋 (브랜치: ui-design).

---

## 섹션 전환 인터랙션 — 스택 카드 방식 구현 지시 — 젬마

히어로 이후 섹션들이 카드처럼 아래에서 밀려 올라오며 이전 섹션을 덮는 스택 전환 효과를 구현한다.  
스크롤 시 현재 섹션은 서서히 스케일 다운 + 페이드, 다음 섹션이 위로 슬라이드되어 덮는 방식.

**GSAP ScrollTrigger 사용 금지.** CSS `position: sticky` + scroll 이벤트 + CSS custom property로 구현.

---

### 1. 구조 원리

```
page.tsx
  └── <div class="stack-container">   ← 스택 래퍼
        ├── <section class="stack-card" data-index="0">WorkGrid</section>
        ├── <section class="stack-card" data-index="1">AboutSection</section>
        ├── <section class="stack-card" data-index="2">VideoSection</section>
        ├── <section class="stack-card" data-index="3">ClientsBrands</section>
        └── <section class="stack-card" data-index="4">AwardsSection</section>
```

각 카드는 `position: sticky; top: 0`으로 고정.  
스크롤이 진행될수록 현재 카드는 `scale(0.96)` + `opacity 0.6`으로 뒤로 물러나고,  
다음 카드가 위로 올라와 덮는다.

---

### 2. CSS

`globals.css`에 추가:

```css
.stack-container {
  position: relative;
}

.stack-card {
  position: sticky;
  top: 0;
  min-height: 100vh;
  transform-origin: top center;
  will-change: transform, opacity;
  transition: transform 0.1s linear, opacity 0.1s linear;
  border-radius: 0;
}

/* 카드가 뒤로 밀릴 때 모서리 둥글게 */
.stack-card.is-stacking {
  border-radius: 16px;
  overflow: hidden;
}
```

---

### 3. `src/hooks/useStackCards.ts` 생성

```ts
"use client";

import { useEffect } from "react";

export function useStackCards(containerSelector: string) {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(`${containerSelector} .stack-card`);
    if (!cards.length) return;

    const onScroll = () => {
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const nextCard = cards[i + 1];

        if (!nextCard) return;

        const nextRect = nextCard.getBoundingClientRect();
        // 다음 카드가 올라오는 비율 (0 ~ 1)
        const progress = Math.max(0, Math.min(1, 1 - nextRect.top / window.innerHeight));

        if (progress > 0) {
          const scale = 1 - progress * 0.04;      // 최대 scale(0.96)
          const opacity = 1 - progress * 0.4;     // 최대 opacity 0.6
          card.style.transform = `scale(${scale})`;
          card.style.opacity = `${opacity}`;
          card.classList.add("is-stacking");
        } else {
          card.style.transform = "scale(1)";
          card.style.opacity = "1";
          card.classList.remove("is-stacking");
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
```

---

### 4. `page.tsx` 수정

```tsx
"use client";

import { useStackCards } from "@/hooks/useStackCards";

export default function Home() {
  useStackCards("#stack-container");

  return (
    <div className="min-h-screen">
      <HeroSectionV2 />

      <div id="stack-container" className="stack-container">
        <section className="stack-card bg-gallery">
          <WorkGrid limit={4} />
        </section>
        <section className="stack-card bg-mine-shaft">
          <AboutSection />
        </section>
        <section className="stack-card bg-gallery">
          <VideoSection />
        </section>
        <section className="stack-card bg-gallery">
          <ClientsBrandsSection />
        </section>
        <section className="stack-card bg-gallery">
          <AwardsSection />
        </section>
        <section className="stack-card bg-gallery">
          <LatestNewsSection />
        </section>
      </div>
    </div>
  );
}
```

`AboutSection`은 `bg-mine-shaft`(다크)로 색상 대비를 줘서 전환감을 강조.  
AboutSection 내부 텍스트 색상도 흰색 계열로 조정 필요.

---

### 5. 주의사항

- `min-height: 100vh` — 카드 높이가 뷰포트보다 작으면 sticky가 조기에 풀림. 각 섹션이 최소 100vh를 채워야 함
- Lenis와 충돌: `window.addEventListener("scroll")` 대신 Lenis의 `lenis.on("scroll", ...)` 콜백 사용 권장. `SmoothScroll.tsx`에서 lenis 인스턴스를 외부로 export하거나 `window.__lenis` 방식으로 접근
- `ImageSliderSection`과 `WorkGrid limit=4` — 내부에 드래그/가로 스크롤이 있으면 sticky와 충돌 가능. 이 두 섹션은 스택에서 제외하거나 드래그 이벤트 `stopPropagation` 처리
- HeroSectionV2는 이미 GSAP pin을 사용하므로 스택 컨테이너 **밖에** 위치해야 함

---

## 스택

- **Next.js 16** App Router (`src/app/(public)/`)
- **React 19** + TypeScript 5
- **Tailwind CSS v4** (토큰: `src/app/globals.css` `@theme` 블록)
- **GSAP 3** — HeroSectionV2 진입 애니메이션 전용. 다른 섹션에 GSAP 추가 금지
- **Lenis 1.x** — 스무스 스크롤 (`SmoothScroll.tsx`)
- **Inter** (`--font-inter`, 헤딩) / **Pretendard** (본문)

---

## CSS 토큰

```
bg-gallery        #f0f0f0   페이지 기본 배경
text-mine-shaft   #2a2a2a   기본 텍스트
border-alto       #d6d6d6   구분선
bg-ash            #ccc4b9   보조 버튼
px-page-padding   40px      좌우 기본 패딩
gap-column        38.4px    그리드 gap
```

---

## 공통 규칙

- 하드코딩 색상 절대 금지 — 토큰만 사용
- TypeScript 오류 없이 작성
- `"use client"` — 애니메이션·훅·이벤트 핸들러 쓰는 컴포넌트에 필수
- 이미지: `next/image` 사용 (`<img>` 금지)
- 링크: `next/link` 사용 (`<a>` 금지, 외부 링크 제외)
- 인라인 `style=""` 금지 — Tailwind 또는 CSS 클래스 사용
- `uppercase`는 display 헤딩(40px 이상)에만. 섹션/컨테이너 레벨 전체 적용 금지
- `font-light` 긴 문장에 `uppercase` 금지

---

## 파일 구조

```
src/
├── app/(public)/
│   ├── layout.tsx              ← SmoothScroll + CustomCursor + Header + Footer
│   ├── page.tsx                ← 홈 (HeroSectionV2 포함)
│   ├── work/
│   │   ├── page.tsx            ← 포트폴리오 목록 (카테고리 필터)
│   │   └── [slug]/page.tsx     ← 포트폴리오 상세
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── story/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── common/
│   │   ├── PageHeader.tsx      ← 모든 서브페이지 공통 헤더
│   │   ├── ProjectCard.tsx     ← 포트폴리오 카드 (호버 슬라이드업)
│   │   ├── DoubleButton.tsx    ← 단일 다크 버튼 (btn-front)
│   │   ├── CustomCursor.tsx    ← GSAP 커스텀 커서
│   │   └── SmoothScroll.tsx    ← Lenis 스무스 스크롤
│   ├── layout/
│   │   ├── Header.tsx          ← 투명→불투명, 스크롤 hide/show
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSectionV2.tsx   ← 수정 금지
│       ├── WorkGrid.tsx
│       ├── AboutSection.tsx
│       ├── AwardsSection.tsx
│       ├── VideoSection.tsx
│       ├── ClientsBrandsSection.tsx
│       ├── ImageSliderSection.tsx
│       ├── LatestNewsSection.tsx
│       └── ServiceRow.tsx      ← 아코디언 행 (use client)
├── lib/
│   ├── projects.ts             ← 포트폴리오 데이터 (26개)
│   └── stories.ts
└── hooks/
    └── useReveal.ts            ← IntersectionObserver 기반 reveal 훅 (수정 금지)
```

---

## 애니메이션 시스템

```
useReveal() 훅
  └── IntersectionObserver로 anim-wrap 요소 감지
        └── 뷰포트 진입 시 → .ready 클래스 추가
              └── CSS transition 실행
```

### 사용법

```tsx
const ref = useReveal();

<section ref={ref as any} className="anim-wrap ...">
  {/* 텍스트 — 줄바꿈 불필요 */}
  <span className="anim-clip">
    <span className="anim-move-up" data-delay="0">텍스트</span>
  </span>

  {/* 텍스트 — 줄바꿈 필요 */}
  <div className="anim-clip block">
    <div className="anim-move-up" data-delay="100">긴 텍스트</div>
  </div>

  {/* 이미지 */}
  <div className="anim-clip w-full h-full">
    <div className="anim-move-up-img w-full h-full relative" data-delay="0">
      <Image fill ... />
    </div>
  </div>

  {/* 구분선 */}
  <div className="w-full h-px bg-alto anim-fill-width" />
</section>
```

### 주의사항

- `data-delay`는 ms 단위 (`data-delay="200"` = 0.2초)
- `anim-clip`은 `inline-block` → 줄바꿈 필요하면 `block` 추가
- `anim-wrap` 없이 `anim-move-up`만 쓰면 영구 숨김
- **useReveal을 GSAP으로 교체 금지** (Lenis 타이밍 충돌로 전체 콘텐츠 invisible 발생 전례 있음)

---

## HeroSectionV2 — 최종 수정 금지 (Exo Ape Style)

현재 적용된 버전은 **7단계 스토리텔링 시퀀스**와 **초장거리 패럴랙스**가 결합된 최종 고도화 버전입니다.

```
section.relative.bg-[#0a0a0a]
  ├── bgRef (h-[350%], yPercent 0 → -85)  ← 수직 웅장함 확보
  ├── overlayRef (bg-black/45)
  └── Interaction Stage (h-screen, sticky pin)
        ├── Stage 1: Intro (Block 1) - 즉시 노출
        ├── Stage 2: Intro Fade / BG Start
        ├── Stage 3: Main Statement (Block 2) - Reveal
        ├── Stage 4: Main Statement Exit / Deep Parallax
        ├── Stage 5: Detailed Description (Block 3) - Reveal
        ├── Stage 6: Block 3 Clean Exit (텍스트 완전 소멸)
        └── Stage 7: Final BG Tail & Unpin
```

**절대 준수 사항:**
- `end: "+=1000%"` 변경 금지 (인터랙션 호흡 유지)
- 배경 높이 `h-[350%]` 및 `yPercent: -85` 고정 (검은 띠 방지)
- 모든 `ease: "none"` 유지 (스크롤 선형 동기화)
- 텍스트가 완전히 사라진 후 섹션이 종료되는 `Sequence 5/6` 로직 보존
- GSAP은 오직 이 섹션에서만 사용 (하단 섹션은 `useReveal` 사용)

---

## DoubleButton (확정)

이중 버튼 제거 완료. **검은 버튼(btn-front) 하나만** 사용:

```tsx
<DoubleButton labelFront="VIEW CASE STUDY" href="/work/slug" />
```

`labelBack` prop은 interface에 optional로 남아 있으나 렌더링하지 않음.

---

## 반복 금지 오류 이력

| 오류 | 교훈 |
|------|------|
| HeroSectionV2 구조 변경 | `h-[220vh]` + `sticky top-0 h-screen` 고정 |
| 이미지 파일명 오기입 | `/images/hero-bg.jpg` 고정 |
| useReveal → GSAP 교체 | IntersectionObserver 유지 필수 |
| CSS opacity:0 + GSAP 충돌 | CSS 초기 상태와 GSAP fromTo 함께 관리 |
| anim-clip 줄바꿈 안됨 | 줄바꿈 필요 시 `block overflow-hidden` 사용 |
| nav-hidden transition 충돌 | nav-hidden에 별도 transition 금지 |
| 하드코딩 색상 | 토큰 사용 (`text-mine-shaft`, `bg-gallery` 등) |
| `text-transform: uppercase` 전역 적용 | 큰 디스플레이 폰트만 uppercase — 전역 적용 금지 |
| `framer-motion` 사용 | 금지. `anim-clip > anim-move-up` 패턴으로 대체 |
| 인라인 `style={{ "--delay": ... }}` | `data-delay="100"` (ms 정수)로 교체 |

---

## 완료 목록

| 파일 | 상태 |
|------|------|
| `layout.tsx` | ✅ |
| `Header.tsx` | ✅ |
| `Footer.tsx` | ✅ |
| `PageHeader.tsx` | ✅ |
| `ProjectCard.tsx` | ✅ |
| `DoubleButton.tsx` | ✅ 단순화 완료 |
| `CustomCursor.tsx` | ✅ |
| `SmoothScroll.tsx` | ✅ |
| `HeroSectionV2.tsx` | ✅ 수정 금지 |
| `WorkGrid.tsx` | ✅ |
| `ServiceRow.tsx` | ✅ |
| `AboutSection.tsx` | ✅ |
| `AwardsSection.tsx` | ✅ |
| `ClientsBrandsSection.tsx` | ✅ |
| `ImageSliderSection.tsx` | ✅ |
| `LatestNewsSection.tsx` | ✅ |
| `VideoSection.tsx` | ✅ |
| `useReveal.ts` | ✅ 수정 금지 |
| `globals.css` | ✅ 수정 금지 |
| `page.tsx` (홈) | ✅ |
| `work/page.tsx` | ✅ 카테고리 필터 |
| `work/[slug]/page.tsx` | ✅ 메타바 + Next Project |
| `about/page.tsx` | ✅ |
| `services/page.tsx` | ✅ |
| `story/page.tsx` | ✅ |
| `contact/page.tsx` | ✅ |
| `lib/projects.ts` | ✅ |
| `lib/stories.ts` | ✅ |
| `useStackCards.ts` | ✅ 신규 생성 |

---

## 🟢 최근 업데이트 내역 (2026-05-08)

### 스택 카드 인터랙션 구현 완료 — 젬마
- **구현 방식**: CSS `sticky` + `useStackCards` 커스텀 훅 기반의 스택 전환 시스템 구축.
- **주요 수정 사항**:
  - `src/hooks/useStackCards.ts`: Lenis 스무스 스크롤과 완벽 동기화되는 스크롤 인터랙션 로직 구현.
  - `src/app/globals.css`: 카드 스케일 다운(0.96) 및 페이드(0.6), 모서리 둥글게(16px) 처리 스타일 추가.
  - `src/app/(public)/page.tsx`: 섹션 래핑 및 `ImageSliderSection` 제외 처리로 레이아웃 안정성 확보.
  - `AboutSection.tsx`: 다크 배경 대응을 위한 텍스트 컬러 최적화 및 배경 투명화.
  - 기타 모든 섹션 배경 투명화 처리로 스택 컨테이너 배경색이 투과되도록 조정.
- **특이사항**: Lenis 인스턴스를 `window.__lenis`를 통해 전역 참조하여 스크롤 타이밍 오차 제거.
