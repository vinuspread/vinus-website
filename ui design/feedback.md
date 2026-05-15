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

### 8. Latest News (1:744) — 피그마 확인 완료, 전면 재작업

현재 구현("COMING SOON" 텍스트)은 피그마 디자인과 다름. 아래 스펙으로 전면 교체.

**레이아웃:** `pt-[80px] px-[40px]`, 배경 Gallery(#f0f0f0)

#### 8-1. 헤더 행

- 좌: "Latest news" — 46.5px, tracking -1.6px, uppercase
- 우: `<DoubleButton labelFront="View All" labelBack="View All" />` (우측 정렬)
- 같은 행에 flex justify-between

#### 8-2. 구분선

헤더 행 아래 1px border (#ccc4b9 30%) `w-full`

#### 8-3. 아티클 카드 2개 (가로 2열, gap 48px)

각 카드: `pt-[38.4px]` 시작, 2컬럼 내부 그리드 (이미지 좌 / 텍스트 우)

**카드 구조:**
```tsx
<a className="flex-1 grid grid-cols-2 gap-column h-[411px] pt-[38.4px]">
  {/* 좌: 이미지 */}
  <div className="aspect-[429/371] relative overflow-hidden">
    <Image src="..." alt="..." fill className="object-cover" />
  </div>
  {/* 우: 메타 + 제목 */}
  <div className="flex flex-col gap-3">
    {/* 메타: Article • 3 Feb 2024 • 4 Min Read */}
    <p className="text-[16px] uppercase tracking-[-0.38px]">
      Article <span>•</span> 3 Feb 2024 <span>•</span> 4 Min Read
    </p>
    {/* 제목: anim-move-up 단어별 reveal */}
    <h3 className="text-[26.9px] tracking-[-0.86px] uppercase leading-[25.92px]">
      Why Strong Brand Identity Is Important in Web Design
    </h3>
  </div>
</a>
```

**아티클 데이터:**
```js
[
  {
    image: "/images/news-01.jpg", // Unsplash로 대체
    tag: "Article",
    date: "3 Feb 2024",
    readTime: "4 Min Read",
    title: "Why Strong Brand Identity Is Important in Web Design",
  },
  {
    image: "/images/news-02.jpg",
    tag: "Article",
    date: "3 Mar 2024",
    readTime: "4 Min Read",
    title: "The Benefits of Aligning Your Team with Your Business Objectives",
  }
]
```

**이미지:** Unsplash에서 소싱. 브랜딩/팀워크 계열 사진 2장.
- news-01: `https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=860&h=742&fit=crop&auto=format&q=80`
- news-02: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=860&h=742&fit=crop&auto=format&q=80`

---

### 9. Footer (27:344) — 피그마 확인 완료, 전면 재작업

현재 구현(어두운 배경, "DASHDIGITAL®" 대형 텍스트)은 피그마 디자인과 다름. 아래 스펙으로 전면 교체.

**배경:** #fafafa (Alabaster), 전체 높이 ~1200px

#### 9-1. Footer Nav 상단 바 (h-[56px])

- 4컬럼 그리드, col 3-4에 메뉴 링크 6개 justify-between
- 링크 텍스트는 현재 비어있음 → 실제 메뉴명 확보 후 채울 것 (현재 빈 상태 유지)

#### 9-2. Footer Inner (메인 컨텐츠, h-[1123px] justify-center)

8컬럼 그리드:

**Next Page 영역 (col 1-4, row 1):**
```tsx
<div>
  <p className="text-[17.1px] uppercase tracking-[-0.38px]">Next Page</p>
  <a className="flex items-start gap-2">
    <span className="text-[83.5px] tracking-[-2.8px] uppercase leading-[74.65px]">Work</span>
    <sup className="text-[24.1px] tracking-[-0.86px] mt-2">26</sup>
  </a>
</div>
```

**Contact 영역 (col 1-2, row 2):**
```tsx
<div>
  <p className="text-[25.1px] tracking-[-0.86px] uppercase">
    We would love to hear from you. Let's work — together.
  </p>
  <DoubleButton labelFront="Contact us" labelBack="Get in touch" />
</div>
```

**Business Enquiries (col 5-6, row 2):**
```tsx
<div>
  <p className="text-[14.9px] text-[#757575] uppercase">Business enquiries</p>
  <p className="text-[16.9px] uppercase">hello@dashdigital.io</p>
  <p className="text-[16.9px] uppercase">+27 72 611 3343</p>
</div>
```

**Open Positions (col 7-8, row 2):**
```tsx
<div>
  <p className="text-[15px] text-[#757575] uppercase">Open Positions</p>
  <a className="text-[16.9px] uppercase">careers@dashdigital.io</a>
</div>
```

**Business Hours (col 5-6, row 3):**
```tsx
<div>
  <p className="text-[15px] text-[#757575] uppercase">Business Hours</p>
  <p className="text-[16.8px] uppercase">Monday to Friday</p>
  <p className="text-[16.7px] uppercase">08:00 AM – 18:00 PM</p>
  <p className="text-[16.5px] uppercase">GMT (+2)</p>
</div>
```

**Cape Town 주소 (col 7-8, row 3):**
```tsx
<div>
  <p className="text-[15.1px] text-[#757575] uppercase">Cape Town</p>
  <address className="text-[16.5px] uppercase not-italic">
    14 Upper Pepper Street<br/>
    Cape Town CBD, 8001<br/>
    South Africa
  </address>
</div>
```

#### 9-3. Footer Meta 하단 바 (border-t, h-[77px])

8컬럼 그리드:
- col 1-2: `DashDigital® ©2026` (14.7px, uppercase)
- col 5-7: Dribbble / Instagram / LinkedIn 링크 (15.5px, uppercase, gap 38.4px)
- col 8: `Back to top` 버튼 (15.1px, uppercase, 우정렬, 클릭 시 `window.scrollTo(0,0)`)

**주의:** Footer 전체에 `uppercase` 클래스 사용 금지. 각 요소에 개별 적용.

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

---

## 검수 결과 — 2026-05-01

### 🔴 즉시 수정 필요 (규칙 위반)

**1. `framer-motion` 사용 금지**
- `src/components/common/RevealText.tsx`에서 `framer-motion` import 중
- `package.json`에 `"framer-motion": "^11.0.0"` 추가되어 있음
- 조치: `RevealText.tsx` 삭제, `package.json`에서 제거 후 `npm install`
- 대체: 기존 `anim-clip` + `anim-move-up` 조합으로 동일 효과 구현

**2. 인라인 `style` 전면 사용 — 규칙 위반**
- 전체 파일에 `style={{ "--delay": "0.1s" } as any}` 패턴 사용 중
- PUBLISHING_GUIDE §5: 인라인 `style=""` 금지
- 조치: `data-delay="100"` (ms 단위 정수) 속성으로 교체
- `useReveal.ts`에 아래 코드 추가해야 stagger 작동:
```ts
el.querySelectorAll<HTMLElement>("[data-delay]").forEach((child) => {
  child.style.transitionDelay = (child.dataset.delay ?? "0") + "ms";
});
```

**3. `next: canary` 버전 사용**
- `package.json`: `"next": "canary"` → `"next": "16.2.4"` 로 고정
- canary는 불안정 버전

**4. `text-transform: uppercase` 남발**
- `globals.css`의 `html, body`에 `text-transform: uppercase` 전역 적용됨
- 이로 인해 `AboutSection`에서 `lowercase`로 override하는 충돌 발생
- 조치: `globals.css`에서 `text-transform: uppercase` 전역 선언 제거
- uppercase가 필요한 곳에만 Tailwind `uppercase` 클래스 개별 적용

---

### 🟡 디자인 불일치 수정

**5. `Header` — `.ready` 하드코딩**
- `className="anim-wrap ready"` 로 JSX에서 바로 ready 상태로 시작 → 애니메이션 없음
- 조치: `ready` 제거, `useEffect`로 마운트 후 짧은 delay 뒤 `.ready` 추가
```tsx
useEffect(() => {
  const timer = setTimeout(() => ref.current?.classList.add("ready"), 100);
  return () => clearTimeout(timer);
}, []);
```

**6. `Cursor` 모양 오류**
- 현재: 원형 dot (`border-radius: 50%`, `width/height: 12px`)
- 실측: 직사각형 border box (`border: 1px solid #2a2a2a`, `padding: 3px 6px`, `background: #0f0f0f`, `color: #fafafa`)
- 텍스트("DRAG", "PLAY")가 항상 보이는 구조, opacity 0→1 토글
- `globals.css`의 `.cursor` 정의가 올바름 — 컴포넌트가 CSS를 따르지 않은 것
- 조치: Cursor 컴포넌트를 `globals.css` 정의에 맞게 수정

**7. `DoubleButton` 구조 오류**
- 현재: hover 시 뒤 버튼 텍스트가 나타나는 인터랙션
- 실제: 두 pill 항상 표시, 뒤 pill이 앞 pill보다 넓어 오른쪽으로 돌출
- 조치:
```tsx
<div className="btn-double">
  <span className="btn-front">{labelFront}</span>
  <span className="btn-back">{labelBack}</span>
</div>
```
- `globals.css`에 `.btn-double`, `.btn-front`, `.btn-back` 이미 정의됨

**8. `AwardsSection` — 피그마와 레이아웃 다름**
- 현재: 어워드 카테고리명 왼쪽, 항목 오른쪽 정렬 (`text-right`)
- 실제: 카테고리명 왼쪽, 항목 리스트도 왼쪽 정렬 (같은 열 내)
- 구분선: 각 카테고리 **위**에 border-top, 마지막 항목은 border 없음
- 설명 텍스트: 피그마 원문 사용
  > "Our passion for technology drives us to excel in research, strategy, branding, UX/UI, and development. Our focus is on creating impactful experiences that bring value to our clients and their customers. While we don't chase awards, it's always gratifying to receive recognition for our work."

**9. `ClientsBrandsSection` — 슬라이더 미구현**
- 현재: `overflow-x-auto` CSS 스크롤만 적용
- 지시: GSAP Draggable 사용 (`npm install gsap`)
- 조치: `data-cursor="DRAG"` 는 올바름. Draggable만 추가

**10. `ClientsBrandsSection` — 로고 이미지 위치**
- 현재: 회색 박스(placeholder)
- 조치: `public/logos/` 폴더에 SVG 파일 배치 후 `next/image`로 교체
- 파일명: `lemkus.svg`, `tiger.svg`, `kia.svg`, `afrisam.svg`

**11. `VideoSection` — 로딩 바 anim-wrap 미적용**
- 로딩 바 `anim-fill-width` 가 `anim-wrap` 없이 단독 사용됨 → 동작 안 함
- 조치: VideoSection 자체가 `anim-wrap`이므로 로딩 바를 `anim-fill-width`로 쓰려면 별도 처리 필요
- 대안: 비디오 로드 시 JS로 로딩바 width 직접 조절 (CSS transition 유지)

---

### 🟢 잘된 부분

- `useReveal.ts` 기본 구조 올바름 (data-delay 처리만 추가하면 완성)
- `ClientsBrandsSection` 브랜드 데이터 피그마와 일치
- `AwardsSection` 어워드 데이터 피그마와 일치
- `VideoSection` autoPlay/muted/loop/playsInline 속성 올바름
- `Header` 스크롤 hide/show 로직 방향 올바름
- 폴더 구조 `app/(public)/`, `components/` 가이드 준수

---

수정 완료 후 이 파일 하단에 **"재검수 요청 — [작업자명] [날짜]"** 기재.

---

## 3차 검수 — 2026-05-01

### ✅ 해결된 항목 (잘 수정됨)

- `framer-motion` 제거 완료
- `next: "16.2.4"` 버전 고정 완료
- `data-delay` 전면 교체 완료 (인라인 style 제거)
- `globals.css`에서 `transition-delay: var(--delay, 0s)` 삭제 완료 → **애니메이션 이제 정상 작동**
- `Header`: `ready` 하드코딩 제거, `useEffect` + setTimeout 100ms로 올바르게 수정
- `Cursor`: `.cursor-active` 클래스 올바르게 적용
- `DoubleButton`: `.btn-double / .btn-front / .btn-back` CSS 클래스 사용, `next/link` 적용
- `HeroSection`: Work Grid에 `anim-clip` 래퍼 추가
- `ImageSliderSection`: `anim-clip` 래퍼 추가
- `AboutSection`: `lowercase` 제거, 피그마 원문 본문 텍스트 적용
- `AwardsSection`: `text-right` 제거(좌정렬), 피그마 원문 설명 텍스트, `border-t` 상단 구분선 적용
- `ClientsBrandsSection`: GSAP Draggable 적용, 브랜드 목록 border 구조 정리
- `globals.css`: `nav-dash`, `anim-fill-height` 클래스 추가

---

### 🔴 즉시 수정 필요

**1. `globals.css` — 중복/오류 선언 다수**

아래 문제들을 직접 수정하라. 파일 전체를 깔끔하게 정리할 것:

```css
/* ❌ .anim-fill-width에 transform이 잘못 들어있음 */
.anim-fill-width {
  transform: translateY(0);  ← 삭제
  width: 0;
  transition: width 1s var(--ease-fill);
}

/* ❌ .nav-hidden에 transform 중복 */
.nav-hidden {
  transform: translateY(-56px);
  transform: translateY(-56px);  ← 중복 삭제
  transition: transform 1s cubic-bezier(.215,.61,.355,1);
}

/* ❌ .cursor에 pointer-events: none 3번 중복 */
.cursor {
  pointer-events: none;   ← 1개만 남기고 나머지 삭제
  pointer-events: none;
  pointer-events: none;
}

/* ❌ @utility no-scrollbar 내부 속성 중복 */
@utility no-scrollbar {
  -ms-overflow-style: none;
  -ms-overflow-style: none;  ← 삭제
  scrollbar-width: none;
  scrollbar-width: none;     ← 삭제
  &::-webkit-scrollbar { display: none; }
  &::-webkit-scrollbar { display: none; }  ← 삭제
}
```

**2. `Header.tsx` — scroll handler 성능 문제**

현재 `useEffect` 의존성 배열에 `[lastY]`가 있어서 스크롤할 때마다 이벤트 핸들러가 해제/재등록됨. `lastY`를 `useState` 대신 `useRef`로 교체:

```tsx
// ❌ 현재
const [lastY, setLastY] = useState(0);
// useEffect dependency: [lastY] → 스크롤마다 listener 재등록

// ✅ 수정
const lastYRef = useRef(0);

useEffect(() => {
  const timer = setTimeout(() => navRef.current?.classList.add("ready"), 100);

  const handleScroll = () => {
    const y = window.scrollY;
    setIsHidden(y > lastYRef.current && y > 100);
    lastYRef.current = y;
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    clearTimeout(timer);
  };
}, []); // 의존성 배열 비워도 됨
```

**3. `package.json` — 중복 및 불필요 패키지**

```json
// ❌ postcss가 devDependencies에 2번 선언됨 → 하나 삭제
"postcss": "^8",
"postcss": "^8",

// ❌ lucide-react 사용처 없음 → 삭제
"lucide-react": "^0.344.0"
```

삭제 후 `npm install` 재실행.

---

### 🟡 마무리 필요 항목

**4. `ClientsBrandsSection.tsx` — 로고 이미지 미적용**

`next/image` import는 되어 있으나 실제로는 `<div className="absolute inset-0 bg-alto" />` placeholder 그대로임. 이미지 지시 섹션 참조하여 `public/logos/` 폴더에 SVG 배치 후:

```tsx
import Image from "next/image";

// 현재 placeholder div 대신:
<Image src={client.logo} alt={client.name} width={128} height={48} className="object-contain" />
```

**5. `VideoSection.tsx` — 인라인 style 예외 처리**

```tsx
style={{ width: "0%" }}
```
이 한 줄은 JS 애니메이션 시작값이므로 인라인 style 금지 규칙의 예외로 허용. 현 상태 유지.

**6. `Footer.tsx` — 브랜드명**

현재 "DASHDIGITAL®" 로 하드코딩됨. 실제 클라이언트명으로 교체 예정 시 별도 지시.  
현재는 그대로 유지.

---

수정 완료 후 이 파일 하단에 **"3차 수정 완료 — [작업자명] [날짜]"** 기재.

---

## uppercase 남용 수정 지시 — 2026-05-01

현재 `uppercase`가 과도하게 적용되어 있음. 피그마 디자인 기준으로 **실제 대문자 처리가 명시된 곳에만** 적용하고 나머지는 제거할 것.

### 제거 대상

| 파일 | 위치 | 조치 |
|------|------|------|
| `LatestNewsSection.tsx` | `<section>` 태그에 `uppercase` | **제거** — 섹션 전체 강제 적용 |
| `Footer.tsx` | `<footer>` 태그에 `uppercase` | **제거** — 섹션 전체 강제 적용 |
| `AboutSection.tsx` | 컨테이너 `<div>`에 `uppercase` | **제거** — 개별 요소에만 적용할 것 |
| `ClientsBrandsSection.tsx` | 브랜드 행 `<div>`에 `uppercase` | **제거** — 브랜드명은 고유명사 |
| `AwardsSection.tsx` | `<ul>` 항목에 `uppercase` | **제거** — 어워드 항목은 문장형 텍스트 |
| 모든 파일 | `font-light`가 붙은 본문/설명 텍스트 | **제거** — 긴 문장에 uppercase 금지 |

### 유지 대상

**display 사이즈 헤딩 (대형 타이포)은 uppercase 유지:**
- Hero 헤드라인 `h1` (120px)
- 섹션 타이틀: "ABOUT", "FEATURED CLIENTS", "BRANDS WE'VE WORKED WITH", "AWARDS & RECOGNITIONS", "LATEST NEWS" (46px~83px)
- About 서브헤딩 (25.3px) — 디자인 명시
- "DESIGNED TO ENGAGE / BUILT TO CONNECT" (16.9px) — UI 레이블성
- DoubleButton 텍스트 (`btn-double`에 이미 포함)
- Header 로고, "Menu +"

### 원칙

- **섹션/컨테이너 레벨** `uppercase` 금지 — 하위의 본문까지 강제 적용됨
- **display 헤딩 (대략 40px 이상)** → `uppercase` 유지
- **소형 폰트 (20px 미만) 본문/설명/리스트** → `uppercase` 제거 — 가독성 저하
- `font-light` 긴 문장에는 절대 `uppercase` 금지
- DoubleButton, "Menu +" 같은 **명시적 UI 레이블**은 소형이어도 예외 허용

수정 완료 후 **"uppercase 수정 완료 — [작업자명] [날짜]"** 기재.

---

## 2차 심층 검수 — 2026-05-01 (애니메이션 미작동 원인 분석)

> 작업자 분들이 제출한 코드를 직접 읽고 각 파일별로 문제를 특정함.  
> **특히 "텍스트 애니메이션이 적용이 안된다"는 문제의 근본 원인을 하단에 명시함.**

---

### ❗ 애니메이션 미작동 — 근본 원인 (반드시 읽을 것)

현재 애니메이션이 **전혀 작동하지 않는** 이유는 두 가지가 동시에 충돌하기 때문임.

#### 원인 1 — `globals.css`의 `transition-delay: var(--delay, 0s)` 문제

현재 `globals.css`:
```css
.anim-move-up {
  transition-delay: var(--delay, 0s);  ← 이게 문제
}
```

`var(--delay)`는 CSS 커스텀 프로퍼티. 이 값은 **인라인 style로만 주입 가능** (`style={{ "--delay": "0.1s" }}`).  
그런데 PUBLISHING_GUIDE §5에서 **인라인 style 금지**.  
결과: `--delay`가 설정되지 않으니 기본값 `0s`로 통일 — stagger 없음.

**수정:** `globals.css`에서 `transition-delay: var(--delay, 0s)` 줄을 **삭제**하라.  
delay는 `useReveal.ts`가 JS로 `element.style.transitionDelay`를 직접 주입하는 방식으로 이미 처리됨 (data-delay 속성 읽어서). CSS에 `var(--delay)` 없어도 작동함.

```css
/* 수정 전 */
.anim-move-up {
  display: block;
  transform: translateY(120%);
  transition: transform 1.5s var(--ease-expo-out);
  transition-delay: var(--delay, 0s);  ← 삭제
}

/* 수정 후 */
.anim-move-up {
  display: block;
  transform: translateY(120%);
  transition: transform 1.5s var(--ease-expo-out);
}
```

`anim-move-up-img`, `anim-fill-width` 등 다른 animation 클래스에도 `transition-delay: var(--delay, 0s)`가 있으면 동일하게 삭제.

#### 원인 2 — 컴포넌트들이 `data-delay` 대신 `style={{ "--delay": ... }}`를 여전히 사용 중

`useReveal.ts`는 `[data-delay]` 속성을 읽어서 `style.transitionDelay`를 설정하도록 이미 구현됨.  
하지만 **모든 컴포넌트가 여전히 `style={{ "--delay": "0.1s" } as any}`** 사용 중 → `useReveal`이 delay를 읽지 못함.

**전체 파일에서 아래 패턴 전수 교체:**
```tsx
// ❌ 잘못된 방식 (인라인 style + CSS 변수 — 규칙 위반, data-delay와 충돌)
<span className="anim-move-up" style={{ "--delay": "0.1s" } as any}>

// ✅ 올바른 방식 (data-delay 속성, ms 단위 정수)
<span className="anim-move-up" data-delay="100">
```

delay 값 변환: `"0s"` → `0`, `"0.1s"` → `100`, `"0.2s"` → `200`, `"0.3s"` → `300`

---

### 파일별 문제 목록

#### `src/components/layout/Header.tsx` — 🔴 심각

1. **`className="anim-wrap ready"` 하드코딩** — 페이지 로드 직후부터 ready 상태라 애니메이션이 한 번도 실행되지 않음  
   수정:
   ```tsx
   // ref로 DOM 접근 후 setTimeout으로 ready 추가
   const navRef = useRef<HTMLElement>(null);
   useEffect(() => {
     const t = setTimeout(() => navRef.current?.classList.add("ready"), 100);
     return () => clearTimeout(t);
   }, []);
   // JSX
   <header ref={navRef} className="anim-wrap fixed top-0 ...">
   ```

2. **`style={{ "--delay": "0s" } as any}` 사용** → `data-delay="0"` 으로 교체

3. **`nav-hidden` CSS 오류** — `globals.css`에서 `.nav-hidden`이 `translateY(-56px)`로 정의되어 있으나 스크롤 로직이 header element가 아닌 다른 element에 클래스를 적용 중인지 확인 필요. Header `ref`가 같은 element인지 재확인.

---

#### `src/components/sections/HeroSection.tsx` — 🔴 심각

1. **`style={{ "--delay": ... } as any}` 전면 사용** — 모두 `data-delay`로 교체
2. **Work Grid 이미지 reveal 구조 오류** — `anim-move-up-img` 클래스가 있는 div에 `anim-clip` 래퍼가 없음
   ```tsx
   // ❌ 현재 (anim-clip 없음)
   <div className="anim-move-up-img" data-delay={i * 100} />

   // ✅ 올바른 구조 (anim-clip으로 overflow 차단해야 clip 효과)
   <div className="anim-clip w-full h-full">
     <div className="anim-move-up-img w-full h-full bg-alto" data-delay={i * 100} />
   </div>
   ```
3. **Hero 헤드라인 애니메이션 구조**: 단어별로 `anim-clip > anim-move-up` 구조 확인 필요. `anim-clip`이 `display: inline-block`이라 줄바꿈 처리 주의.

---

#### `src/components/sections/AboutSection.tsx` — 🟡

1. **`style={{ "--delay": ... } as any}` 전면 사용** → `data-delay` 교체
2. **본문 텍스트에 `lowercase` 클래스** — 삭제. 피그마 텍스트는 일반 케이스(uppercase도 lowercase도 아님).
3. **본문 텍스트** 피그마 원문으로 교체:
   > "We are a global digital design studio dedicated to crafting world-class digital experiences. We bridge strategy and design to build connected brand ecosystems that create lasting value for brands and their customers."

---

#### `src/components/sections/VideoSection.tsx` — 🟡

1. **로딩 바 `anim-fill-width` 작동 안 함** — VideoSection 자체가 `anim-wrap`이지만, 스크롤 threshold(10%) 도달 전까지 로딩 바가 펼쳐지지 않음. 로딩 바는 페이지 로드 즉시 실행되어야 함.  
   수정 방법:
   ```tsx
   // VideoSection mount 후 JS로 직접 width 조절
   const barRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
     const t = setTimeout(() => {
       if (barRef.current) barRef.current.style.width = "192px";
     }, 300);
     return () => clearTimeout(t);
   }, []);
   // CSS: transition: width 1s var(--ease-fill) (globals.css 그대로)
   // JSX: <div ref={barRef} className="h-px bg-[#949494]" style={{ width: 0 }} />
   // (width 0 초기값은 인라인 style 금지 규칙 예외 — JS 애니메이션 시작값)
   ```
   단, 더 간단하게: `anim-fill-width`를 쓰되 VideoSection에 별도 useReveal을 붙이지 말고 mount 시 바로 `.ready` 추가하는 별도 ref 사용.

---

#### `src/components/sections/AwardsSection.tsx` — 🟡

1. **`style={{ "--delay": ... } as any}` 전면 사용** → `data-delay` 교체
2. **어워드 항목 텍스트 정렬** — `text-right` 제거. 항목 리스트는 left-align.
3. **설명 텍스트** 피그마 원문으로 교체 (1차 검수 참조)
4. **구분선 위치**: 각 카테고리 상단에 `border-t border-alto` (현재 하단에 있으면 수정)

---

#### `src/components/sections/ClientsBrandsSection.tsx` — 🟡

1. **`style={{ "--delay": ... } as any}` 전면 사용** → `data-delay` 교체
2. **슬라이더 GSAP Draggable 미구현** — `overflow-x-auto` CSS 스크롤로만 구현됨. GSAP Draggable 적용 필요 (ImageSliderSection과 동일 패턴).
3. **Brands 그리드 `pl-4`** — 브랜드명 열에 `pl-4` 제거. 8컬럼 그리드 첫 열이 이미 40px padding 안에 있으므로 추가 들여쓰기 불필요.
4. **서비스 텍스트 `opacity-50`** — 피그마에 없음. 제거.
5. **로고 이미지** — 현재 회색 박스. 아래 이미지 지시 섹션 참조.

---

#### `src/components/sections/ImageSliderSection.tsx` — 🟡

1. **`anim-move-up-img` 요소에 `anim-clip` 래퍼 없음**
   ```tsx
   // ❌ 현재
   <div className="anim-move-up-img w-full h-full bg-alto" data-delay={i * 100} />

   // ✅ 수정
   <div className="anim-clip w-full h-full">
     <div className="anim-move-up-img w-full h-full bg-alto" data-delay={i * 100} />
   </div>
   ```
2. **`data-delay`를 `anim-move-up-img` 요소 자체에 붙여야 함** — 현재 container div에 붙어있으면 `useReveal`이 찾지 못함. `[data-delay]` 선택자는 `anim-move-up-img` 클래스를 가진 요소에 직접 있어야 함.

---

#### `src/components/layout/Cursor.tsx` — 🔴

1. **클래스명 불일치** — `globals.css`는 `.cursor-active` 정의, 컴포넌트는 `.cursor-hover` 적용 → 커서가 절대 표시되지 않음
   ```tsx
   // ❌ 현재
   cn("cursor", isHovering && "cursor-hover")

   // ✅ 수정
   cn("cursor", isHovering && "cursor-active")
   ```
2. **커서 내부에 `anim-move-up` 사용** — 커서는 마우스 위치를 따라다니는 fixed element. 여기에 scroll-based animation class를 사용하면 안 됨. 커서 내부 텍스트("DRAG", "PLAY")는 단순 텍스트로만 렌더링.
3. **`hoverText` 상태 관리**: `data-cursor` 속성을 가진 element에 mouseenter/mouseleave 이벤트로 텍스트 업데이트하는 방식 확인.

---

#### `src/components/common/DoubleButton.tsx` — 🟡

1. **`globals.css` 정의된 클래스 미사용** — `.btn-double`, `.btn-front`, `.btn-back` 클래스가 globals.css에 이미 정의되어 있음. 컴포넌트의 ad-hoc 스타일을 삭제하고 CSS 클래스 사용:
   ```tsx
   <div className="btn-double">
     <span className="btn-front">{labelFront}</span>
     <span className="btn-back">{labelBack}</span>
   </div>
   ```
2. **`<a href="#">`** → `next/link`의 `<Link href="...">` 사용

---

#### `src/components/common/RevealText.tsx` — 🔴

- `framer-motion` import 확인. 해당 파일 삭제 및 `package.json`에서 `framer-motion` 제거.
- 텍스트 reveal은 `anim-clip > anim-move-up` 패턴으로 직접 JSX 작성.

---

#### `package.json` — 🔴

```json
// ❌ 현재
"next": "canary"
"framer-motion": "^11.0.0"
"lucide-react": "^0.344.0"

// ✅ 수정
"next": "16.2.4"
// framer-motion 삭제
// lucide-react 삭제 (사용 안 하면)
```

---

### 이미지 placeholder 처리 지시

현재 gray box로 처리된 모든 이미지(Work Grid, Image Slider, Client Logos 등)를 실제 이미지로 교체.  
이미지 생성/소싱 방법 (택 1):

- **ImageFX** (구글): https://labs.google/fx/tools/image-fx — AI 이미지 생성, 고해상도 PNG 다운로드
- **Nanobanana**: https://nanobanana.io — 빠른 placeholder/mock 이미지
- **Unsplash** (https://unsplash.com): 무료 고퀄 스톡 사진 (라이선스 무료)

생성 후 `public/images/` 폴더에 저장하고 `next/image`로 연결:
```tsx
import Image from "next/image";
<Image src="/images/work-01.jpg" alt="Work 01" fill className="object-cover" />
```

Work Grid (Hero): 1840×1280px 2:1 비율 이미지 4장 (`work-01.jpg` ~ `work-04.jpg`)  
Image Slider: 600×461px 가로형 이미지 6장 (`slide-01.jpg` ~ `slide-06.jpg`)  
Client Logos: SVG 벡터 — 실제 클라이언트 로고는 확보 불가하면 유사한 스타일로 Unsplash wordmark 검색 또는 placeholder SVG 생성

---

수정 완료 후 이 파일 하단에 **"재검수 요청 — [작업자명] [날짜]"** 기재.

---

---

## 포트폴리오 썸네일 오버레이 텍스트 줄바꿈 수정 지시

### 문제

썸네일 이미지 위 오버레이 텍스트(서비스 태그, 프로젝트명)가 줄바꿈되지 않음.

### 원인

`anim-clip` 클래스가 `display: inline-block`으로 정의되어 있어, 텍스트를 감쌌을 때 컨테이너 너비가 콘텐츠 크기로 수축함. 그 결과 긴 텍스트가 부모 블록 너비를 무시하고 한 줄로 이어짐.

```css
/* 현재 — 문제 */
.anim-clip {
  display: inline-block; /* ← 너비가 콘텐츠에 맞게 수축 */
  overflow: hidden;
}
```

### 수정

`anim-clip` + `anim-move-up` 구조를 메인 타이틀과 서브 텍스트(서비스 태그 등) 모두 **동일하게** 사용. 줄바꿈이 필요한 경우 `anim-clip`에 `block` 추가:

```tsx
{/* 서비스 태그 (줄바꿈 필요) */}
<span className="anim-clip block">
  <span className="anim-move-up">{project.services}</span>
</span>

{/* 프로젝트명 */}
<span className="anim-clip block">
  <span className="anim-move-up">{project.title}</span>
</span>
```

메인/서브 구분 없이 `anim-clip > anim-move-up` 패턴을 통일. 단어별 stagger가 필요한 제목은 단어마다 각각 `anim-clip`으로 감싸되 동일 구조 유지.

---

## 헤더 & 히어로 애니메이션 버그 수정 지시

### 문제

- 페이지 최초 로드 시 **헤더(로고, 메뉴 텍스트)가 보이지 않음** — 영역(56px 공간)은 있으나 내용이 숨겨진 상태
- 원인: Header가 `anim-wrap` 패턴(`.ready` 클래스 추가 전까지 `translateY(120%)`)을 사용하는데, `setTimeout 100ms` 타이머가 React 19 / Next.js 16 환경에서 불안정하게 동작

### 수정 1 — Header.tsx: anim-wrap 패턴 제거

헤더는 페이지 진입과 동시에 보여야 한다. `anim-clip / anim-move-up` 구조를 제거하고 텍스트를 바로 렌더링:

```tsx
// 수정 전
<span className="anim-clip">
  <span className="anim-move-up" data-delay="0">DashDigital®</span>
</span>

// 수정 후 — 텍스트 직접 렌더
DashDigital®
```

`navRef`의 `setTimeout` + `classList.add("ready")` 코드도 삭제. 스크롤 hide/show 로직(`isHidden`, `handleScroll`)은 유지.

헤더 페이드인 효과가 필요하면 `globals.css`에 keyframe 추가:
```css
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.header-enter {
  animation: fade-in 0.6s ease forwards;
}
```
헤더 `<header>` 태그에 `header-enter` 클래스 추가.

### 수정 2 — useReveal.ts: 뷰포트 내 요소 즉시 트리거

`threshold: 0.1` → `threshold: 0` 으로 변경, `requestAnimationFrame` 폴백 추가:

```ts
const trigger = () => {
  el.classList.add("ready");
  obs.disconnect();
};

const obs = new IntersectionObserver(
  ([entry]) => { if (entry.isIntersecting) trigger(); },
  { threshold: 0, rootMargin: "0px" }
);

obs.observe(el);

// 이미 뷰포트 안에 있으면 rAF 후 강제 트리거
const raf = requestAnimationFrame(() => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) trigger();
});

return () => { obs.disconnect(); cancelAnimationFrame(raf); };
```

---

**재검수 요청 — Karina 2026-05-01**
- `framer-motion` 제거 및 `package.json` 정리 완료
- 모든 인라인 `style`을 `data-delay` 및 `useReveal.ts` 로직으로 교체 완료
- `next` 버전 `16.2.4` 고정 완료
- 전역 `uppercase` 제거 및 필요한 곳에 개별 적용 완료
- `Header` 초기 진입 애니메이션 및 `nav-dash` 수정 완료
- `Cursor` 모양 및 인터랙션 로직(classes) 수정 완료
- `DoubleButton` CSS 클래스 기반으로 구조 및 스타일 수정 완료
- `AwardsSection` 레이아웃, 정렬, 구분선 위치 수정 완료
- `ClientsBrandsSection` GSAP Draggable 및 그리드 레이아웃 수정 완료
- `HeroSection` 헤드라인 단어별 stagger 애니메이션 및 Work Grid 구조 수정 완료
- `VideoSection` 로딩 바 및 페이드아웃 로직 개선 완료
- `ImageSliderSection` 이미지 reveal 구조(`anim-clip`) 수정 완료

---

### DoubleButton 단순화 지시

DoubleButton을 이중 버튼(앞+뒤 겹침)에서 **단일 검은 버튼**으로 단순화한다.

**변경 내용:**
- `btn-back` (베이지 배경 버튼) 완전 제거
- 호버 시 슬라이드 인터랙션 제거
- `btn-front` (검은 pill 버튼)만 표시

**globals.css**: `.btn-double`, `.btn-back`, `.btn-double:hover .btn-back` 규칙 모두 삭제.  
`.btn-front`만 단독으로 남김:
```css
.btn-front {
  display: inline-flex;
  align-items: center;
  background: #2a2a2a;
  color: #f0f0f0;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 10.5px;
  white-space: nowrap;
  text-transform: uppercase;
  cursor: pointer;
}
```

**DoubleButton.tsx**: `labelBack` prop 제거 (optional로만 유지), `btn-back` span 제거:
```tsx
export const DoubleButton = ({ labelFront, href = "#", className }) => (
  <Link href={href} className={cn("btn-front inline-flex", className)}>
    {labelFront}
  </Link>
);
```

---

## About 페이지 구현 지시 — 젬마

**파일 생성 위치:** `src/app/(public)/about/page.tsx`

dashdigital.studio/about 구성 기반. Header/Footer는 layout.tsx 자동 포함.

---

### 섹션 구성

```
1. Hero          — 스튜디오 소개 대제목 + 위치
2. Services      — 5개 서비스 아코디언 (Research / Strategy / Design / Development / Content)
3. Stats         — 수치 강조 (팀원 수, 오피스 수, 프로젝트 수)
4. Team          — 팀원 카드 그리드
5. Collaboration — 협업 메시지
```

---

### 1. Hero 섹션

```tsx
<section className="pt-[140px] pb-[120px] px-page-padding grid grid-cols-8 gap-column">
  <div className="col-span-8 mb-[80px]">
    <h1 className="text-[82.5px] leading-none tracking-[-2.8px] uppercase">
      <span className="anim-clip block"><span className="anim-move-up" data-delay="0">Designed to engage</span></span>
      <span className="anim-clip block"><span className="anim-move-up" data-delay="100">Built to connect</span></span>
    </h1>
  </div>
  <div className="col-span-2">
    <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40 mb-3">Location</p>
    <p className="text-[15px] leading-snug">Seoul — Korea<br />Working Worldwide</p>
  </div>
  <div className="col-span-4 col-start-4">
    <p className="text-[20px] font-light leading-[1.5] tracking-[-0.3px]">
      바이너스는 리서치와 전략을 기반으로 브랜드의 디지털 경험을 설계합니다.
      깊이 있는 사용자 연구와 치밀한 전략, 그리고 정교한 디자인과 개발로
      브랜드와 사람 사이의 진정한 연결을 만들어냅니다.
    </p>
  </div>
</section>
```

---

### 2. Services 아코디언 섹션

```tsx
<section className="px-page-padding border-t border-alto">
  <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40 py-[40px]">Services</p>

  {services.map((service, i) => (
    <ServiceRow key={service.title} index={i} service={service} />
  ))}
</section>
```

`ServiceRow`는 클라이언트 컴포넌트로 분리 (`"use client"`). 클릭 시 서브 서비스 목록 토글:

```tsx
// 닫힌 상태
<div className="border-t border-alto py-[28px] flex justify-between items-center cursor-pointer group">
  <div className="flex items-center gap-8">
    <span className="text-[11px] text-mine-shaft/40">{String(index + 1).padStart(2, '0')}</span>
    <span className="text-[32px] tracking-[-0.8px] uppercase">{service.title}</span>
  </div>
  <span className="text-[20px] transition-transform duration-300 group-hover:rotate-45">+</span>
</div>

// 열린 상태 (클릭 후 펼쳐짐)
<div className="pb-[40px] pl-[72px] grid grid-cols-3 gap-4">
  {service.items.map(item => (
    <p key={item} className="text-[15px] font-light text-mine-shaft/60">{item}</p>
  ))}
</div>
```

서비스 데이터:
```tsx
const services = [
  { title: "Research", items: ["Customer Research", "User Testing", "Competitive Analysis", "Trends Analysis", "Brand Audit"] },
  { title: "Strategy", items: ["Brand Strategy", "Digital Strategy", "Content Strategy", "Go-to-Market", "Product Roadmap"] },
  { title: "Design", items: ["Brand Identity", "UI/UX Design", "Motion Design", "Design System", "Concept Design"] },
  { title: "Development", items: ["Web Development", "React / Next.js", "E-Commerce", "CMS Integration", "Performance Optimization"] },
  { title: "Content", items: ["Copywriting", "Photography Direction", "Video Production", "Social Content", "SEO"] },
];
```

---

### 3. Stats 섹션

```tsx
<section className="px-page-padding py-[120px] border-t border-alto grid grid-cols-3 divide-x divide-alto">
  {[
    { number: "08", label: "Team Members" },
    { number: "60+", label: "Projects Delivered" },
    { number: "02", label: "Office Locations" },
  ].map(({ number, label }) => (
    <div key={label} className="px-[60px] first:pl-0 last:pr-0">
      <p className="text-[82.5px] leading-none tracking-[-3px] mb-4">{number}</p>
      <p className="text-[15px] font-light text-mine-shaft/60 uppercase tracking-wider">{label}</p>
    </div>
  ))}
</section>
```

---

### 4. Team 섹션

```tsx
<section className="px-page-padding py-[80px] border-t border-alto">
  <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40 mb-[60px]">Team</p>
  <div className="grid grid-cols-4 gap-8">
    {team.map((member) => (
      <div key={member.name} className="group">
        <div className="aspect-[3/4] relative mb-4 overflow-hidden bg-alto">
          <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <p className="text-[17px] tracking-[-0.3px]">{member.name}</p>
        <p className="text-[13px] text-mine-shaft/50">{member.role}</p>
        <p className="text-[12px] text-mine-shaft/30 mt-1">{member.interest}</p>
      </div>
    ))}
  </div>
</section>
```

팀 데이터 (이미지는 Unsplash 인물 사진 사용):
```tsx
const team = [
  { name: "이름", role: "Founder & Creative Director", interest: "Music Enthusiast", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format&q=80" },
  // ... 나머지 팀원
];
```

---

### 5. Collaboration 섹션

```tsx
<section className="px-page-padding py-[160px] border-t border-alto">
  <p className="text-[46.8px] leading-none tracking-[-1.5px] uppercase max-w-[700px]">
    <span className="anim-clip block"><span className="anim-move-up">We work together —</span></span>
    <span className="anim-clip block"><span className="anim-move-up" data-delay="100">with the shared vision</span></span>
    <span className="anim-clip block"><span className="anim-move-up" data-delay="200">of transforming your brand.</span></span>
  </p>
</section>
```

---

### 파일 구조

```
src/app/(public)/about/page.tsx           ← 서버 컴포넌트
src/components/sections/ServiceRow.tsx    ← "use client" 아코디언
```

`useReveal` 적용: 각 섹션 ref에 `anim-wrap` 클래스와 함께 사용.  
`anim-clip block > anim-move-up` 패턴 통일 적용.

---

## Work 상세 페이지 구현 지시 — 젬마

**파일 생성 위치:** `src/app/(public)/work/[slug]/page.tsx`

dashdigital.studio/case-studies/inkfish 구성 기반. Header/Footer는 layout.tsx 자동 포함.

---

### 1. 라우트 & 데이터

slug는 프로젝트 title을 kebab-case로 변환 (예: "Gavin Schneider Productions" → `gavin-schneider-productions`).

`src/lib/projects.ts` 파일을 생성해 프로젝트 데이터를 중앙 관리:

```ts
export type Project = {
  slug: string;
  title: string;
  services: string;
  year: string;
  client: string;
  awards?: number;
  heroImg: string;
  images: string[]; // 본문 이미지 배열
  challenge: string; // 프로젝트 소개/도전 텍스트
};

export const projects: Project[] = [ /* Work 페이지와 동일한 26개 데이터 */ ];
export const getProject = (slug: string) => projects.find(p => p.slug === slug);
```

WorkGrid에서도 이 파일을 import해 데이터 중복 제거.

---

### 2. 레이아웃 구조

```
[Hero]          ← 풀스크린 이미지 + 좌하단 프로젝트명
[Meta Bar]      ← 클라이언트 / 연도 / 서비스 / 수상 가로 나열
[Challenge]     ← 좌: 섹션 레이블, 우: 본문 텍스트 (2열)
[Image Grid]    ← 풀너비 이미지 또는 2열 이미지 그리드 (반복)
[Next Project]  ← 다음 프로젝트 링크
```

---

### 3. Hero 섹션

```tsx
<section className="relative w-full h-screen">
  <Image src={project.heroImg} alt={project.title} fill className="object-cover" />
  {/* 좌하단 오버레이 */}
  <div className="absolute bottom-0 left-0 p-page-padding pb-[60px]">
    <p className="text-[13px] text-white/70 uppercase tracking-[-0.3px] mb-3">
      <span className="anim-clip block"><span className="anim-move-up">{project.services}</span></span>
    </p>
    <h1 className="text-[64px] leading-none tracking-[-2px] text-white uppercase">
      <span className="anim-clip block"><span className="anim-move-up">{project.title}</span></span>
    </h1>
  </div>
</section>
```

---

### 4. Meta Bar 섹션

```tsx
<section className="px-page-padding py-[48px] border-b border-alto grid grid-cols-4 gap-8">
  {[
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Services", value: project.services },
    { label: "Awards", value: project.awards ? `${project.awards} Awards` : "—" },
  ].map(({ label, value }) => (
    <div key={label}>
      <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40 mb-2">{label}</p>
      <p className="text-[15px] leading-snug">{value}</p>
    </div>
  ))}
</section>
```

---

### 5. Challenge (텍스트 섹션)

```tsx
<section className="px-page-padding py-[120px] grid grid-cols-8 gap-column">
  <div className="col-span-2">
    <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Challenge</p>
  </div>
  <div className="col-span-5">
    <p className="text-[22px] font-light leading-[1.4] tracking-[-0.4px]">
      {project.challenge}
    </p>
  </div>
</section>
```

---

### 6. 이미지 섹션 (반복 패턴)

풀너비:
```tsx
<div className="w-full aspect-[16/9] relative">
  <Image src={project.images[0]} alt="" fill className="object-cover" />
</div>
```

2열 그리드:
```tsx
<div className="px-page-padding grid grid-cols-2 gap-4 py-4">
  <div className="aspect-[4/3] relative"><Image src={img} alt="" fill className="object-cover" /></div>
  <div className="aspect-[4/3] relative"><Image src={img} alt="" fill className="object-cover" /></div>
</div>
```

이미지는 프로젝트당 4~6장. 본문 이미지도 Unsplash 사용 (heroImg와 다른 사진으로).

---

### 7. Next Project 섹션

```tsx
<section className="px-page-padding py-[120px] border-t border-alto flex justify-between items-end">
  <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Next Project</p>
  <Link href={`/work/${nextProject.slug}`} className="group flex items-center gap-4">
    <span className="text-[46px] tracking-[-1.5px] uppercase group-hover:opacity-60 transition-opacity">
      {nextProject.title}
    </span>
    <span className="text-[24px]">→</span>
  </Link>
</section>
```

---

### 8. WorkGrid 수정

기존 WorkGrid의 각 카드 `<Link>` href를 `/work/${slug}`로 변경:

```tsx
<Link href={`/work/${project.slug}`} ...>
```

---

## Work 페이지 구현 지시 — 젬마

**파일 생성 위치:** `src/app/(public)/work/page.tsx`

dashdigital.studio/work 구성 기반. Header/Footer는 layout.tsx에서 자동 포함.

---

### 1. 페이지 헤더

`pt-[140px]`로 고정 헤더(56px) 아래 여백 확보. 우측에 프로젝트 수 표기.

```tsx
<section className="pt-[140px] pb-[40px] px-page-padding border-b border-alto">
  <div className="flex items-end justify-between">
    <h1 className="text-[82.5px] leading-none tracking-[-2.8px] uppercase">
      <span className="anim-clip"><span className="anim-move-up">WORK</span></span>
    </h1>
    <p className="text-[15px] text-mine-shaft/50 mb-2">26 Projects</p>
  </div>
</section>
```

---

### 2. 프로젝트 데이터 (26개)

아래 순서대로 `projects` 배열 구성. 각 항목은 `{ title, services, img }`.  
이미지는 Unsplash (`?w=920&h=640&fit=crop&auto=format&q=80`). HeroSection 4개와 겹치지 않게 배정.

1. Gavin Schneider Productions — Digital Design — Web Development
2. Freshman — Strategy — Brand Identity — Digital Design — Web Development — Creative Direction
3. Lo2s — Digital Design — Creative Direction
4. Studio PIC — Strategy — Digital Design — Creative Direction — Web Development
5. Inkfish — Strategy — Brand Identity — Creative Direction — Digital Design — Web Development
6. Southern Guild — Strategy — Creative Direction — Digital Design — Web Development
7. Enpower Trading — Strategy — Brand Identity — Creative Direction — Digital Design — Web Development
8. Emma is Social — Strategy — Brand Identity — Digital Design — Web Development
9. Fitsole — Strategy — Brand Identity — Creative Direction — Digital Design — Web Development
10. Banyana Ba Style — Brand Identity — Creative Direction — Digital Design
11. VANA — Strategy — Brand Identity — Creative Direction — Digital Design — Web Development
12. Sneaker LAB — Creative Direction — Digital Design
13. Swag — Creative Direction — Digital Design — Web Development
14. Blocklords — Strategy — Brand Identity — Creative Direction — Digital Design — Web Development
15. MetaKing Studios — Strategy — Brand Identity — Creative Direction — Digital Design
16. Web OGs_ — Brand Identity — Creative Direction — Digital Design — Web Development
17. Lemkus — Strategy — Brand Identity — Creative Direction — Digital Design — Web Development
18. Sophie Dallamore — Brand Identity — Digital Design — Web Development
19. Kia — Strategy — Creative Direction — Digital Design — Web Development
20. Tiger Wheel and Tyre — Strategy — Creative Direction — Digital Design — Web Development
21. Batoka — Strategy — Brand Identity — Creative Direction — Digital Design — Web Development
22. The Last Dance — Concept Design
23. Alexis Christodoulou Studio — Concept Design
24. Picube — Brand Identity — Digital Design
25. Private Luxury — Brand Identity — Digital Design — Web Development
26. Afrisam — Strategy — Creative Direction — Digital Design — Web Development

---

### 3. 그리드 (WorkGrid 클라이언트 컴포넌트)

파일: `src/components/sections/WorkGrid.tsx`

- `"use client"` 선언
- 2열 그리드, gap 없음
- 각 카드: `aspect-[920/640] overflow-hidden relative group`
- `data-cursor="VIEW"` 속성 카드에 추가
- 이미지 reveal: `anim-clip` 래퍼 + `anim-move-up-img` 자식, `data-delay={i * 60}`
- hover: `group-hover:scale-105 transition-transform duration-700`
- 오버레이 (좌하단 `absolute bottom-0 left-0 p-[40px]`):
  - 서비스 태그: `text-[13px] text-white/70 uppercase tracking-[-0.3px]`
  - 프로젝트명: `text-[24px] text-white uppercase tracking-[-0.7px]`

---

### 4. 파일 구조

**page.tsx** (서버 컴포넌트, metadata export):

```
export const metadata = { title: "Work — DashDigital®" };
export default function WorkPage() { ... }
```

WorkGrid를 import해서 삽입.

---

### 5. Header breadcrumb 동적 처리

`Header.tsx`의 현재 페이지명("Home")을 `usePathname()`으로 동적 처리:

```tsx
import { usePathname } from "next/navigation";
const pathname = usePathname();
const pageLabel = { "/": "Home", "/work": "Work", "/about": "About" }[pathname] ?? "";
```

span 텍스트를 `{pageLabel}`로 교체.

