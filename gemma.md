# Vinuspread — Gemma 인수인계서

> 이 문서는 Claude가 작업한 내용을 Gemma에게 인계하는 문서입니다.
> 브랜치: `ui-design` / 경로: `d:/Work/vinuspread2/`

---

## 프로젝트 스택

- **Next.js 16** App Router (`src/app/(public)/`)
- **React 19** + TypeScript 5
- **Tailwind CSS v4** (커스텀 토큰은 `src/app/globals.css` `@theme` 블록)
- **GSAP 3** + ScrollTrigger (히어로 애니메이션, 스크롤 패럴랙스)
- **Lenis** (스무스 스크롤 — `src/components/common/SmoothScroll.tsx`)
- **Inter** (font-inter, 헤딩), **Pretendard** (본문)

### 핵심 CSS 토큰
```
bg-gallery      #f0f0f0   페이지 기본 배경
text-mine-shaft #2a2a2a   기본 텍스트
border-alto     #d6d6d6   구분선
px-page-padding 40px      좌우 기본 패딩
gap-column      38.4px    그리드 gap
```

### 공통 주의사항
- 하드코딩 색상 금지 — 반드시 토큰 사용
- `anim-clip { display: inline-block }` → 줄바꿈 필요 시 `block overflow-hidden` 사용
- TypeScript 오류 없이 작성

---

## 현재 완료된 작업 목록

| 파일 | 상태 |
|------|------|
| `src/components/layout/Header.tsx` | ✅ 투명 헤더, 메뉴 순서, 스크롤 hide/show |
| `src/components/layout/Footer.tsx` | ✅ 슬림, 로고, 소셜링크, 연락처, Next Page 동적 |
| `src/components/common/PageHeader.tsx` | ✅ 모든 서브페이지 공통 헤더 컴포넌트 |
| `src/components/common/ProjectCard.tsx` | ✅ 링크 클릭 작동 |
| `src/components/common/CustomCursor.tsx` | ✅ GSAP dot+ring 커서 |
| `src/components/common/SmoothScroll.tsx` | ✅ Lenis 스무스 스크롤 |
| `src/components/sections/HeroSectionV2.tsx` | ⚠️ 미완성 — 아래 작업 1 참조 |
| `src/components/sections/WorkGrid.tsx` | ✅ filter/limit prop |
| `src/components/sections/ClientsBrandsSection.tsx` | ✅ 로고 그리드 (logo01~28.svg) |
| `src/components/sections/LatestNewsSection.tsx` | ✅ stories 데이터 연동 |
| `src/components/sections/AboutSection.tsx` | ✅ 서브카피 2줄 |
| `src/app/(public)/page.tsx` | ✅ HeroV2 + WorkGrid(4) + 나머지 섹션 |
| `src/app/(public)/work/page.tsx` | ✅ PageHeader + 카테고리 필터 |
| `src/app/(public)/services/page.tsx` | ✅ PageHeader + 서비스 목록 + 아코디언 |
| `src/app/(public)/story/page.tsx` | ✅ PageHeader + 카테고리 필터 + 리스트 |
| `src/app/(public)/contact/page.tsx` | ✅ PageHeader + 문의 폼 |
| `src/app/(public)/about/page.tsx` | ✅ PageHeader + 팀/통계/서비스 섹션 |
| `src/lib/projects.ts` | ✅ slug, category, heroImg 중복 수정 |
| `src/lib/stories.ts` | ✅ 정적 스토리 데이터 |
| `public/logo.svg` | ✅ 로고 SVG |
| `public/logos/logo01~28.svg` | ✅ 클라이언트 로고 |
| `public/images/hero-bg.jpg` | ✅ 히어로 배경 이미지 (세로형) |

---

## 작업 1 — 히어로 섹션 스크롤 패럴랙스 수정 (최우선)

**파일**: `src/components/sections/HeroSectionV2.tsx`

**현재 증상**: 섹션이 `h-[300vh]`인데 이미지 컨테이너 높이 문제로 스크롤 중 흰 공간이 보임.

**원인**: 이미지를 담는 `div`가 sticky 컨테이너(`h-screen`)의 300%로 설정되어 있어서 실제 이미지가 채우는 영역보다 div가 커서 흰 공간 발생.

**수정 방법**:

세로형 이미지(`/images/hero-bg.jpg`)를 스크롤하면 위로 이동하며 아래 부분이 드러나는 효과. 구조:

```tsx
// 섹션: h-[250vh] (스크롤 여유)
// sticky 내부: h-screen overflow-hidden
// 이미지 컨테이너: absolute, w-full, 높이는 auto 또는 고정 px값
//   → object-cover + object-top
//   → GSAP yPercent: -30 (스크롤 시 위로)
```

핵심: 이미지 컨테이너 높이를 `h-[200vh]` 대신 실제 뷰포트 기준 픽셀로 설정하거나, `aspect-ratio`를 유지하면서 `min-h-screen`으로 설정.

권장 구조:
```tsx
{/* 이미지 컨테이너 — 세로형 이미지가 충분히 담기도록 */}
<div
  ref={bgRef}
  className="absolute inset-x-0 top-0 w-full will-change-transform"
  style={{ height: "140vh" }}   // ← 고정 픽셀 기반으로 명시
>
  <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover object-top" priority />
  <div ref={overlayRef} className="absolute inset-0 bg-black/55" />
</div>
```

GSAP ScrollTrigger는 유지:
```tsx
gsap.to(bgRef.current, {
  yPercent: -30,        // 이미지가 위로 이동 → 아래 부분 reveal
  ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom top",
    scrub: 1.5,
  },
});
```

섹션 높이는 `h-[250vh]`로 유지.

---

## 작업 2 — 카테고리 필터 UI 개선

**파일**: `src/app/(public)/work/page.tsx`, `src/app/(public)/story/page.tsx`

**현재 상태**: 박스 보더 버튼 스타일. 사용자가 "영 맘에 안 든다"고 함.

**목표**: 미니멀한 텍스트 탭 스타일로 변경.

**권장 디자인**:

```tsx
{/* 텍스트 탭 — 박스 없음, 활성 탭만 밑줄 */}
<div className="px-page-padding border-b border-alto flex items-center gap-[32px] py-[20px]">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setActive(cat)}
      className={`text-[12px] uppercase tracking-[0.1em] font-inter pb-[2px] transition-all duration-300 ${
        active === cat
          ? "text-mine-shaft border-b border-mine-shaft"
          : "text-mine-shaft/40 hover:text-mine-shaft"
      }`}
    >
      {cat}
    </button>
  ))}
</div>
```

work 페이지와 story 페이지 동일하게 적용. story 페이지 카운트 숫자는 유지해도 됨.

---

## 작업 3 — 개별 작업 상세 페이지 (`/work/[slug]`) 디자인 개선

**파일**: `src/app/(public)/work/[slug]/page.tsx`

현재 상세 페이지 디자인이 부족함. 아래 항목 개선:

1. **히어로 타이포그래피**: 타이틀 크기를 `text-[83.5px] md:text-[120px]`로 키우고, subtitle은 `text-[17px] text-mine-shaft/60`
2. **메타 바**: `bg-white` 배경, `border-b border-alto`, 4열 그리드 (Year / Client / Services / Awards)
3. **Overview 텍스트**: `text-[22px] md:text-[28px]` 볼드하게
4. **Background / Approach 텍스트**: `text-[15px]` 작게
5. **섹션 번호**: 각 섹션 앞에 `01`, `02`, `03` 넘버링
6. **Next Project**: 다음 프로젝트로 이동하는 링크 (이미지 프리뷰 포함)

---

## 파일 구조 요약

```
src/
├── app/
│   └── (public)/
│       ├── layout.tsx          ← SmoothScroll + CustomCursor + Header + Footer
│       ├── page.tsx            ← 홈 (HeroV2 + WorkGrid(4) + About + ...)
│       ├── work/
│       │   ├── page.tsx        ← experience 목록 + 카테고리 필터
│       │   └── [slug]/page.tsx ← 프로젝트 상세
│       ├── services/page.tsx
│       ├── story/page.tsx
│       ├── contact/page.tsx
│       └── about/page.tsx
├── components/
│   ├── common/
│   │   ├── PageHeader.tsx      ← 모든 서브페이지 공통 헤더
│   │   ├── ProjectCard.tsx     ← 프로젝트 카드
│   │   ├── CustomCursor.tsx    ← GSAP 커스텀 커서
│   │   └── SmoothScroll.tsx    ← Lenis 스무스 스크롤
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSectionV2.tsx   ← GSAP 히어로 (⚠️ 작업 1 필요)
│       ├── WorkGrid.tsx
│       ├── AboutSection.tsx
│       ├── ClientsBrandsSection.tsx
│       └── LatestNewsSection.tsx
├── lib/
│   ├── projects.ts
│   └── stories.ts
└── hooks/
    └── useReveal.ts            ← IntersectionObserver 기반 reveal
```

---

## 오류 이력 — 반복하지 말 것

| 오류 | 교훈 |
|------|------|
| `anim-clip` + `block` 충돌 | `.anim-clip { display: inline-block }` → `block overflow-hidden` 사용 |
| 이미지 컨테이너 `h-[300%]` | sticky 안에서 % 높이는 부모 기준 → 실제 px 또는 vh 단위 사용 |
| `text-white` 상속 + `background-clip: text` 충돌 | 그라디언트 텍스트 span은 부모에서 color 제거 |
| `nav-hidden` 자체 transition | 헤더 기본 `transition-all`과 충돌 → `nav-hidden`에서 transition 제거 |
| `anim-move-up` opacity 0 | hero처럼 즉시 보여야 하는 곳은 GSAP 직접 제어, useReveal 의존 금지 |
