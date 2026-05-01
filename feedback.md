# Vinus — 피그마 → 코드 작업 지시서

**작업자: 젬마, 카리나**
**기준 피그마:** https://www.figma.com/design/Ub9BjTviP441WaFb6ZMe1N/Untitled?node-id=1-150
**작성일:** 2026-05-01

---

## 작업 목적 및 개요

피그마 디자인(dashdigital.studio 레이아웃 기반)을 Next.js + Tailwind CSS로 구현한다.
전체 페이지는 단일 스크롤 랜딩이며 총 9개 섹션으로 구성된다.

**스택:** Next.js 16 (App Router) / React 19 / Tailwind CSS v4 / TypeScript
**폰트:** Pretendard Variable (CDN 자동 로드, 별도 선언 불필요)
**작업 브랜치:** `ui-design` (main에 직접 push 금지)

---

## 폴더 구조 (PUBLISHING_GUIDE 기준)

```
src/
├── app/
│   └── (public)/             ← 공개 사이트 (이 안에만 작업)
│       ├── layout.tsx
│       ├── page.tsx           ← 홈 (9개 섹션 전체)
│       └── ...
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/             ← 각 섹션 컴포넌트
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       └── ...
└── hooks/
    └── useReveal.ts          ← IntersectionObserver 훅
```

**규칙:**
- 인터랙션 있는 컴포넌트 → 파일 최상단 `'use client'` 필수
- 이미지 → `next/image` 사용 (`<img>` 금지)
- 링크 → `next/link` 사용 (`<a>` 금지, 외부 링크 제외)
- 인라인 `style=""` 금지 → Tailwind 클래스 또는 CSS 클래스 사용
- jQuery / 외부 CSS 프레임워크 사용 금지

---

## 디자인 토큰 (전역 공통)

| 이름 | 값 | 용도 |
|------|----|------|
| Mine Shaft | `#2A2A2A` | 기본 텍스트, 버튼 배경(dark) |
| Gallery | `#F0F0F0` | 페이지 배경, Nav 배경 |
| Alto | `#D6D6D6` | 구분선, 비디오 컨테이너 배경 |
| Ash | `#CCC4B9` | 보조 버튼 배경 |

**폰트:** Inter (Regular 400 / Light 300), 전체 UPPERCASE 사용
**레이아웃:** 8컬럼 그리드, 좌우 padding `40px`, 컬럼 간격 `38.4px`

---

## 버튼 컴포넌트 (공통)

두 개의 pill 버튼이 겹쳐서 표시됨. 앞: 어두운 버튼(#2A2A2A, 흰 텍스트), 뒤: 베이지 버튼(#CCC4B9, 어두운 텍스트).
뒤 버튼이 앞 버튼보다 넓어 오른쪽으로 살짝 튀어나옴. border-radius: 999px. 텍스트: ~10.5px uppercase.

```tsx
// 재사용 가능한 DoubleButton 컴포넌트로 분리 권장
<DoubleButton labelFront="View case study" labelBack="Read about Lemkus" />
```

---

## 섹션별 코딩 지시

### 1. Nav (header)
**높이:** 56px, **배경:** #F0F0F0, 고정(sticky top-0)

- 왼쪽: "DashDigital®" 로고 링크 + "— HOME" 현재 페이지 표시
- 오른쪽: 데스크탑에서 메뉴 링크 6개 (숨김 처리 가능), "Menu +" 버튼
- 메뉴 링크는 피그마상 숨김 상태(overflow hidden)이므로 토글 기능 구현 필요
- 전체 grid: 4컬럼, 로고 col-1, 메뉴/버튼 col-4

---

### 2. Hero (header 섹션)
**노드 id:** `1:155`, 전체 높이 ~1852px (intro 572px + work grid 1280px)

#### 2-1. Hero Intro (1:156)
- 8컬럼 그리드, padding top ~115px bottom ~77px
- **메인 헤드라인:** "A DIGITAL DESIGN STUDIO DRIVEN BY RESEARCH & STRATEGY"
  - 단어별로 `<div class="overflow-clip">` + 내부 텍스트로 마스크 애니메이션 (위에서 아래로 reveal)
  - 텍스트 크기: ~120px, letter-spacing: -4px, line-height: 107.52px, Inter Regular, #2A2A2A
  - 단어 배치: 1행 "A digital design studio", 2행 "driven by research &", 3행 "strategy"
- **서브 텍스트 (col 1-2, row 2):**
  - "DESIGNED TO ENGAGE" / "BUILT TO CONNECT"
  - 16.9px, letter-spacing: -0.38px, overflow-clip 애니메이션

#### 2-2. Work Grid (1:198)
- 2열 2행 이미지 그리드 (각 920×640px)
- 총 4개 작업물 이미지 표시
- 이미지 소스는 실제 이미지로 교체 예정 (현재 placeholder)

---

### 3. About / TextButton (1:354)
**높이:** 417px

- 8컬럼 그리드, padding: top 80px left 40px
- **헤딩 (col 1-8, row 1):** "ABOUT" — ~83px, letter-spacing: -2.8px
- **서브헤딩 (col 1-3, row 2):** "AN INTERNATIONAL DIGITAL DESIGN STUDIO REIMAGINING HOW PEOPLE CONNECT WITH BRANDS." — 25.3px, uppercase
- **본문 단락 (col 5-7, row 2):** 17.3px, Inter Light, 6줄 텍스트
- **버튼 (col 5, row 2 하단):** DoubleButton — "ABOUT US" + "GET TO KNOW US"

---

### 4. Video (1:389)
**높이:** 1080px

- 전체 중앙 정렬 flex
- 902×1080px 회색(#D6D6D6) 컨테이너 안에 비디오
- 로딩 중: 중앙에 192px 수평선 (bg: #949494, h: 1px)
- 비디오 재생 시 로딩 overlay 사라짐
- 실제 비디오 파일 연결 필요 (file.mp4)

---

### 5. Featured Clients + Brands (1:398)
**전체 높이:** ~1889px, padding: 80px 40px

#### 5-1. Featured Clients 슬라이더
- **헤딩:** "FEATURED CLIENTS" — 82.5px, letter-spacing: -2.8px
- 가로 스크롤 슬라이더, 슬라이드 4개 (각 ~421px 너비, gap 48px)
- 각 슬라이드 구성:
  - 클라이언트 로고 (SVG, 높이 62px)
  - 설명 텍스트 (17.3px, Inter Light)
  - DoubleButton: "VIEW CASE STUDY" + "READ ABOUT [클라이언트명]"

**슬라이드 데이터:**
```js
[
  { logo: "lemkus_logo.svg", text: "Lemkus reached out to us to create a new design system and conduct an overhaul of the brand's digital experience. The objective was to provide customers with seamless purchasing journeys..." },
  { logo: "tiger_logo.svg", text: "We were brought in to refresh their primary digital properties with a particular focus on building a robust eCommerce capability..." },
  { logo: "kia_logo.svg", text: "In collaboration with Kia's development partner +OneX, we created a 'best-in-class' eCommerce experience underpinned and validated by an in-depth research study..." },
  { logo: "afrisam_logo.svg", text: "In collaboration with Promise Brand Specialists, we were tasked to create an elevated digital experience to reflect the innovative and performance-oriented nature of the brand..." }
]
```

#### 5-2. Brands We've Worked With 아코디언
- **헤딩:** "BRANDS WE'VE WORKED WITH" — 46.8px
- 각 행: 8컬럼 그리드, h-73px, py-26.88px
  - col 1-4: 브랜드명 (17px, uppercase)
  - col 5-7: 서비스 태그 (15px, uppercase) — `hidden md:block`
  - col 8: "More +" 버튼
  - 행 하단: 구분선 1px (#D6D6D6)
- 아코디언 클릭 시 상세 내용 expand (현재 디자인은 collapsed 상태만 표시)

**브랜드 데이터:**
```js
[
  { name: "Woolworths", services: "Research — Strategy" },
  { name: "Sneaker LAB", services: "Design" },
  { name: "HKLM", services: "Research — Strategy — Design — Development" },
  { name: "Digitas Liquorice", services: "Design" },
  { name: "Batoka Hospitality", services: "Research — Strategy — Design — Development" },
  { name: "Sendmarc", services: "Strategy — Design — Development" },
  { name: "VANA", services: "Research — Strategy — Design — Development" },
  { name: "Fairways to Africa", services: "Design — Development" },
  { name: "Fincheck", services: "Research — Strategy — Design — Development" },
  { name: "Parrot Print", services: "Research — Design" },
  { name: "Sophie Dallamore", services: "Design — Development" },
  { name: "& Tomorrow", services: "Strategy — Design — Development" }
]
```

---

### 6. Image Slider (1:652)
**높이:** 538px (viewport: 461px)

- 가로 스크롤 이미지 슬라이더
- 슬라이드: 각 461px 높이, 너비 가변
- 자동 슬라이드 또는 드래그 가능하게 구현
- 실제 포트폴리오 이미지 삽입 예정

---

### 7. Awards & Recognitions (1:668)
**높이:** 928px, padding: top 77px, 좌우 40px

- 8컬럼 그리드
- **헤딩 (col 1-4):** "AWARDS & RECOGNITIONS" — 82.4px, 2줄
- **설명 (col 1-4):** 17.1px, Inter Light, 4줄
- **어워드 목록 (col 5-8):** 4개 카테고리, 각 카테고리 하단에 구분선(#D6D6D6)
  - 좌: 카테고리명 (25.7px), 우: 항목 리스트 (16.5px, `<ul>`)

**어워드 데이터:**
```js
[
  { name: "Awwwards", items: [
    "1x Studio of the Year Nominee",
    "2x E-commerce of the Year Nominee",
    "1x Site of the Month",
    "1x Honours Awards",
    "13x Site of the Day",
    "12x Developer Award",
    "21x Honourable Mention"
  ]},
  { name: "The FWA", items: ["10x FWA of the Day"] },
  { name: "CSS Design Awards", items: [
    "1x Website of the Year Nominee",
    "1x Website of the Month",
    "11x Website of the Day",
    "15x Innovation",
    "15x UX Design",
    "15x UI Design"
  ]},
  { name: "Webby", items: ["1x Webby nominee"] }
]
```

---

### 8. Latest News / Coming Soon (1:744)
**높이:** 605px

- 전체 padding 80px 40px
- 헤딩 + 컨텐츠 영역 확인 필요 (피그마 클래스명: `LatestNews_comingSoon`)
- "Coming Soon" 처리 또는 뉴스 카드 레이아웃
- 추가 피그마 확인 후 별도 지시 예정

---

### 9. Footer (27:344)
**높이:** 1200px

- 전체 padding 확인 후 구현
- 추가 피그마 확인 후 별도 지시 예정

---

## 공통 주의사항

1. **피그마 이미지 URL 사용 금지:** Figma asset URL은 7일 후 만료됨. 로컬 이미지/public 폴더 사용.
2. **반응형:** 피그마는 1920px 기준. 모바일 대응은 `md:` 브레이크포인트 사용.
3. **폰트:** `layout.tsx`에서 Inter 300/400 이미 등록됨. `--font-inter` CSS 변수로 연결.

---

## 인터랙션 지시 (dashdigital.studio 실측 분석)

> dashdigital.studio 소스를 직접 분석한 실측값 기반. 모든 수치는 실제 CSS에서 추출.

### A. 애니메이션 시스템 구조

**globals.css에 이미 정의된 클래스 사용.** 직접 CSS 작성 금지.

```
부모 (anim-wrap) → IntersectionObserver가 .ready 추가
└─ 자식 (anim-move-up 등) → .ready 붙으면 CSS transition 발동
```

**IntersectionObserver 유틸 (공통 훅으로 분리):**
```ts
// src/hooks/useReveal.ts
import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("ready"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
```

**사용 패턴:**
```tsx
const ref = useReveal();
// data-delay 속성으로 stagger 지정 (인라인 style 금지 규칙 준수)
<div ref={ref} className="anim-wrap">
  <div className="anim-clip">
    <span className="anim-move-up" data-delay="0">텍스트 1</span>
  </div>
  <div className="anim-clip">
    <span className="anim-move-up" data-delay="100">텍스트 2</span>
  </div>
</div>
```

**useReveal 훅에서 data-delay 처리:**
```ts
// hooks/useReveal.ts
el.querySelectorAll("[data-delay]").forEach((child) => {
  const ms = child.getAttribute("data-delay") || "0";
  (child as HTMLElement).style.transitionDelay = ms + "ms";
});
```
*(transition-delay 주입은 JS에서 한 번만 처리 — 이후 인라인 style 수정 없음)*

### B. 애니메이션 클래스 종류 (globals.css 정의)

| 클래스 | 초기 상태 | duration | 용도 |
|--------|-----------|----------|------|
| `anim-move-up` | translateY(120%) | 1.5s | 텍스트 기본 reveal |
| `anim-move-up-img` | translateY(120%) | 2.4s | 이미지 reveal (느림) |
| `anim-move-up-mobi` | translateY(120%) | 1.5s | 모바일 전용 |
| `anim-move-up-desk` | translateY(0) 숨김 | 1.5s | 데스크탑 전용 |
| `anim-move-down` | translateY(-120%) | 1.5s | 위에서 내려오는 reveal |
| `anim-fade-up` | opacity:0 + Y(80%) | 1.5s | 페이드+위로 |
| `anim-fade-rotate` | scale(1.3) rotate(8deg) opacity:0 | 1.5s | 이미지 카드 |
| `anim-fill-width` | width:0 | 1s | 구분선 width 채우기 |
| `anim-fill-height` | height:0 | 6s | 세로 채우기 |

**easing 실측값:**
- 텍스트: `cubic-bezier(.075, .82, .165, 1)` (Expo Out)
- 이미지: `cubic-bezier(.4, .4, .1, 1)`
- fill: `cubic-bezier(.3, .3, 0, 1)`

**stagger delay 패턴:** `style={{ "--delay": "0.1s" }}` (각 단어/줄 0.05~0.1s씩 증가)

### C. Nav 인터랙션

**실측 CSS:** `position: fixed`, `height: 56px`, `padding: 0 2vw`

1. **초기 진입 애니메이션 (페이지 로드):**
   - "DashDigital®" 로고: 초기 표시
   - "— HOME" 대시(`nav-dash`): `width: 0` → `width: auto` (0.6s Ease Out)
   - 페이지명(`nav-page-name`): `translateY(120%)` → 0 (1.5s)
   - "Menu +"(`nav-menu-text`): `translateY(120%)` → 0 (1.5s)

2. **스크롤 숨김/표시:**
   - 스크롤 다운 → `.nav-hidden` 추가 → `translateY(-370px)` (1s cubic-bezier(.215,.61,.355,1))
   - 스크롤 업 → `.nav-hidden` 제거 → 원위치

3. **메뉴 열기 (Menu + 클릭):** 풀스크린 메뉴 overlay (별도 구현)

**Nav 스크롤 감지 JS 패턴:**
```ts
let lastY = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  nav.classList.toggle("nav-hidden", y > lastY && y > 100);
  lastY = y;
});
```

### D. 슬라이더 (Featured Clients, Image Slider)

**라이브러리:** GSAP Draggable (실측 확인)

```bash
npm install gsap
```

- `Draggable.create(sliderEl, { type: "x", bounds: containerEl, inertia: true })`
- 드래그로 좌우 슬라이드, 모바일 터치 지원
- 슬라이드 간격 `gap: 48px`

### E. 커스텀 커서

**실측 CSS (globals.css에 이미 정의):** `.cursor`, `.cursor.cursor-hover`

- 마우스 따라 이동: `position: fixed`, JS로 `left`/`top` 업데이트
- 특정 요소(슬라이더, 비디오) 호버 시 텍스트 표시 ("DRAG", "PLAY")
- 표시: `.cursor-hover` 클래스 토글 → opacity 0→1 (0.3s)

```ts
// src/components/Cursor.tsx
const cursor = useRef<HTMLDivElement>(null);
useEffect(() => {
  const move = (e: MouseEvent) => {
    cursor.current!.style.left = e.clientX + "px";
    cursor.current!.style.top = e.clientY + "px";
  };
  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);
```

### F. 비디오 섹션

- 초기: 로딩 바 표시 (192px 수평선, bg: #949494)
- 비디오 로드 완료 → 로딩 overlay 페이드 아웃
- 자동 재생 (`autoPlay muted loop playsInline`)
- 실제 비디오 파일 → `public/videos/reel.mp4`

### G. 아코디언 (Brands)

- 클릭 시 `max-height` 또는 `height` transition으로 expand
- "More +" → "Less -" 텍스트 토글
- 구분선(`.accordion-divider`)은 항상 표시

### H. 섹션별 애니메이션 타이밍 요약

| 섹션 | 애니메이션 |
|------|-----------|
| Hero 헤드라인 | `anim-move-up` 단어별 stagger 0.05s |
| Hero 서브텍스트 | `anim-move-up-mobi` delay 0.3s |
| Work Grid 이미지 | `anim-fade-rotate` |
| About 헤딩 | `anim-move-up` |
| About 본문 | `anim-fade-up` delay 0.2s |
| Clients 로고 | `anim-fade-up` |
| Awards 구분선 | `anim-fill-width` |
| Footer 진입 | `anim-move-up` |

---

## 완료 기입란

섹션별 작업 완료 시 아래에 기입하고 검수 요청:

| 섹션 | 담당자 | 완료일 | 비고 |
|------|--------|--------|------|
| 1. Nav | | | |
| 2. Hero | | | |
| 3. About | | | |
| 4. Video | | | |
| 5. Clients + Brands | | | |
| 6. Image Slider | | | |
| 7. Awards | | | |
| 8. Latest News | | | |
| 9. Footer | | | |

완료 후 이 파일 하단에 **"검수 요청 — [작업자명] [날짜]"** 기재.
