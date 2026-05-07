# Vinuspread2 — Gemma 작업 지시서

## 프로젝트 기본 정보

- **경로**: `d:/Work/vinuspread2/`
- **소스**: `src/` 하위 (App Router, `src/app/(public)/`)
- **스타일**: Tailwind CSS v4 + `src/app/globals.css` 토큰
- **애니메이션**: GSAP + 커스텀 클래스(`anim-wrap`, `anim-clip`, `anim-move-up`)
- **폰트**: `font-inter` (헤딩), Pretendard (본문)

### 핵심 CSS 토큰
```
bg-gallery     #f0f0f0   (페이지 기본 배경)
text-mine-shaft #2a2a2a  (기본 텍스트)
border-alto    #d6d6d6   (구분선)
px-page-padding  40px    (좌우 기본 패딩)
gap-column       38.4px  (그리드 gap)
```

### 공통 주의사항
1. 하드코딩 색상 금지 — 반드시 토큰 사용
2. `anim-clip { display: inline-block }` → 줄바꿈 필요 시 `block overflow-hidden` 사용
3. 모든 작업 완료 후 `report.md`에 기재
4. TypeScript 오류 없이 작성

---

## 서브페이지 공통 헤더 패턴 (모든 페이지 통일 필수)

아래가 표준. `/work` 페이지가 레퍼런스. **description div는 항상 `md:col-span-6` — `col-start-*` 오프셋 금지.**

```tsx
<section ref={...} className="anim-wrap pt-[140px] pb-[80px] px-page-padding border-b border-alto">
  <div className="grid grid-cols-1 md:grid-cols-8 gap-column">

    {/* 타이틀 — 항상 col-span-8 */}
    <div className="md:col-span-8 mb-[60px]">
      <h1 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase font-inter font-normal">
        {/* 단어 배치는 페이지마다 다르게, 스타일은 동일 */}
      </h1>
    </div>

    {/* 설명 — 항상 col-span-6, col-start 금지 */}
    <div className="md:col-span-6">
      <p className="text-[17px] font-medium leading-[1.4] tracking-[-0.3px] text-mine-shaft/60">
        {/* 설명 텍스트 */}
      </p>
    </div>

  </div>
</section>
```

**이 패턴이 적용돼야 할 모든 서브페이지:**
- `src/app/(public)/work/page.tsx` — 이미 적용됨 (기준)
- `src/app/(public)/services/page.tsx` — 작업 A에서 생성 시 반드시 이 패턴 사용
- `src/app/(public)/story/page.tsx` — 작업 B에서 생성 시 반드시 이 패턴 사용
- `src/app/(public)/contact/page.tsx` — 현재 `md:col-start-4` 오프셋 있음 → 제거하고 `md:col-span-6`으로 교체

> contact 페이지 수정 위치:
> ```tsx
> // 변경 전
> <div className="md:col-span-5 md:col-start-4">
> // 변경 후
> <div className="md:col-span-6">
> ```

---

## 작업 A — Services 페이지 신규 생성

레퍼런스: `https://dashdigital.studio/services`

---

### A-1: Header에 services, story 메뉴 추가 (`src/components/layout/Header.tsx`)

nav 배열을 아래로 교체:

```tsx
{ label: "experience", href: "/work" },
{ label: "services", href: "/services" },
{ label: "story", href: "/story" },
{ label: "vinuspread", href: "/about" },
{ label: "Contact", href: "/contact" },
```

---

### A-2: Services 페이지 생성 (`src/app/(public)/services/page.tsx`)

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";

const primaryServices = [
  {
    index: "01",
    title: "UI/UX",
    main: "Intuitive Digital Experience",
    description:
      "사용자의 행동과 경험의 흐름을 깊이 이해하고,\n새롭지만 직관적인 인터페이스를 통해 브랜드와 사용자가 자연스럽게 연결되는 디지털 경험을 설계합니다.",
    tags: ["UI/UX Design", "Design System", "Prototyping"],
  },
  {
    index: "02",
    title: "Character / Illustration",
    main: "Characters With Identity",
    description:
      "단순한 비주얼을 넘어 브랜드의 성격과 감정을 담아,\n사용자에게 오래 기억되고 다양한 경험 속에서 확장될 수 있는 캐릭터와 일러스트를 만듭니다.",
    tags: ["Character Design", "Illustration", "Brand Mascot"],
  },
  {
    index: "03",
    title: "Branding",
    main: "Brands With Meaning",
    description:
      "브랜드의 본질과 방향성을 바탕으로 전략과 디자인을 유기적으로 연결하여,\n사용자에게 더 가치 있게 기억될 수 있는 브랜드 경험을 구축합니다.",
    tags: ["Brand Identity", "Visual System", "Art Direction"],
  },
];

const serviceDetails = [
  {
    category: "Research",
    items: ["사용자 리서치", "트렌드 분석", "경쟁사 검토", "사용성 테스트", "시장 조사"],
  },
  {
    category: "Strategy",
    items: ["브랜드 포지셔닝", "네이밍", "오디언스 정의", "저니 매핑", "정보 구조 설계"],
  },
  {
    category: "Design",
    items: ["아트 디렉션", "브랜드 아이덴티티", "디자인 시스템", "UI/UX", "모션 디자인", "캐릭터 디자인", "프로토타이핑"],
  },
  {
    category: "Development",
    items: ["기술 전략", "React / Next.js", "Webflow", "WordPress", "SEO 최적화"],
  },
  {
    category: "Content",
    items: ["카피라이팅", "콘텐츠 전략", "SNS 디자인", "키워드 리서치"],
  },
];

export default function ServicesPage() {
  const headerRef = useReveal();
  const primaryRef = useReveal();
  const detailRef = useReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main className="bg-gallery">

      {/* ── Page Header ── */}
      <section
        ref={headerRef as any}
        className="anim-wrap pt-[140px] pb-[80px] px-page-padding border-b border-alto"
      >
        <div className="grid grid-cols-1 md:grid-cols-8 gap-column">
          <div className="md:col-span-8 mb-[60px]">
            <h1 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase font-inter font-normal">
              <span className="block overflow-hidden">
                <span className="anim-move-up block">Strategic</span>
              </span>
              <span className="block overflow-hidden">
                <span className="anim-move-up block" data-delay="80">
                  <span className="font-bold">Creative</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="anim-move-up block" data-delay="160">Partner</span>
              </span>
            </h1>
          </div>
          <div className="md:col-span-6">
            <p className="text-[17px] font-medium leading-[1.4] tracking-[-0.3px] text-mine-shaft/60">
              <span className="block overflow-hidden">
                <span className="anim-move-up block" data-delay="200">
                  리서치와 전략을 바탕으로 브랜드 아이덴티티, 디지털 디자인,
                </span>
              </span>
              <span className="block overflow-hidden mt-[4px]">
                <span className="anim-move-up block" data-delay="280">
                  웹 개발까지 — 처음부터 끝까지 함께합니다.
                </span>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Primary Services ── */}
      <section ref={primaryRef as any} className="anim-wrap border-b border-alto">
        {primaryServices.map((svc, i) => (
          <div
            key={svc.index}
            className={`px-page-padding py-[72px] grid grid-cols-1 md:grid-cols-8 gap-column ${
              i < primaryServices.length - 1 ? "border-b border-alto" : ""
            }`}
          >
            {/* 번호 + 서비스명 + Main 카피 */}
            <div className="md:col-span-3 flex flex-col gap-3 mb-8 md:mb-0">
              <p className="text-[11px] text-mine-shaft/30 font-inter">{svc.index}</p>
              <p className="text-[12px] uppercase tracking-[0.1em] text-mine-shaft/50 font-inter">{svc.title}</p>
              <h2 className="text-[32px] md:text-[40px] leading-[1.1] tracking-[-1.5px] font-inter">
                <span className="block overflow-hidden">
                  <span className="anim-move-up block" data-delay={i * 80}>
                    {svc.main.split(" ").slice(0, -1).join(" ")}
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="anim-move-up block font-bold" data-delay={i * 80 + 60}>
                    {svc.main.split(" ").slice(-1)[0]}
                  </span>
                </span>
              </h2>
            </div>

            {/* 설명 + 태그 */}
            <div className="md:col-span-4 md:col-start-5 flex flex-col justify-between gap-8">
              <p className="text-[17px] font-light leading-[1.7] tracking-[-0.3px] text-mine-shaft/70 whitespace-pre-line">
                <span className="block overflow-hidden">
                  <span className="anim-move-up block" data-delay={i * 80 + 100}>
                    {svc.description}
                  </span>
                </span>
              </p>
              <div className="flex flex-wrap gap-[8px]">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-[14px] py-[6px] text-[11px] uppercase tracking-[0.08em] border border-alto text-mine-shaft/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Full Capabilities Accordion ── */}
      <section ref={detailRef as any} className="anim-wrap px-page-padding py-[80px] md:py-[120px]">
        <div className="mb-[60px]">
          <h2 className="text-[36px] md:text-[56px] leading-none tracking-[-2px] uppercase font-inter">
            <span className="block overflow-hidden">
              <span className="anim-move-up block">Full</span>
            </span>
            <span className="block overflow-hidden">
              <span className="anim-move-up block font-bold" data-delay="80">Capabilities</span>
            </span>
          </h2>
        </div>

        <div className="border-t border-alto">
          {serviceDetails.map((detail, i) => (
            <div key={detail.category} className="border-b border-alto">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-[28px] text-left group"
              >
                <div className="flex items-center gap-[48px]">
                  <span className="text-[11px] text-mine-shaft/30 font-inter w-[24px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[22px] md:text-[28px] tracking-[-0.8px] uppercase font-inter group-hover:opacity-50 transition-opacity">
                    {detail.category}
                  </span>
                </div>
                <span
                  className="text-[22px] text-mine-shaft/40 transition-transform duration-300 inline-block"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-[36px] pl-[72px] flex flex-wrap gap-x-[40px] gap-y-[12px]">
                  {detail.items.map((item) => (
                    <span key={item} className="text-[15px] font-light text-mine-shaft/60 tracking-[-0.2px]">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
```

---

## 작업 B — Story 페이지 신규 생성

관리자가 직접 콘텐츠를 업데이트하는 구조. 지금은 `src/lib/stories.ts`에 정적 데이터 배열로 관리.

---

### B-1: 데이터 파일 생성 (`src/lib/stories.ts`)

```ts
export type Story = {
  slug: string;
  title: string;
  category: "Story" | "Notice" | "Etc";
  date: string;      // "2025.01.15" 형식
  summary: string;
  thumbnail?: string;
};

export const stories: Story[] = [
  {
    slug: "first-story",
    title: "바이너스프레드를 소개합니다",
    category: "Story",
    date: "2025.01.10",
    summary: "디자인 스튜디오 바이너스프레드의 첫 번째 이야기입니다.",
    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=500&fit=crop&auto=format&q=80",
  },
  {
    slug: "design-philosophy",
    title: "우리가 디자인을 대하는 방식",
    category: "Story",
    date: "2025.02.03",
    summary: "본질에 집중하고 아름다움을 더하는 바이너스프레드의 디자인 철학을 공유합니다.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop&auto=format&q=80",
  },
  {
    slug: "2025-open",
    title: "2025년 프로젝트 문의 오픈",
    category: "Notice",
    date: "2025.01.02",
    summary: "2025년 신규 프로젝트 문의를 받습니다.",
  },
];
```

---

### B-2: Story 목록 페이지 생성 (`src/app/(public)/story/page.tsx`)

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";
import { stories } from "@/lib/stories";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const categories = ["All", "Story", "Notice", "Etc"] as const;
type Category = (typeof categories)[number];

export default function StoryPage() {
  const headerRef = useReveal();
  const listRef = useReveal();
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? stories : stories.filter((s) => s.category === active);

  const count = (cat: Category) =>
    cat === "All" ? stories.length : stories.filter((s) => s.category === cat).length;

  return (
    <main className="bg-gallery">

      {/* ── Page Header ── */}
      <section
        ref={headerRef as any}
        className="anim-wrap pt-[140px] pb-[80px] px-page-padding border-b border-alto"
      >
        <div className="grid grid-cols-1 md:grid-cols-8 gap-column">
          <div className="md:col-span-8 mb-[60px]">
            <h1 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase font-inter font-normal">
              <span className="block overflow-hidden">
                <span className="anim-move-up block font-bold">Story</span>
              </span>
            </h1>
          </div>
          <div className="md:col-span-5">
            <p className="text-[17px] font-medium leading-[1.4] tracking-[-0.3px] text-mine-shaft/60">
              <span className="block overflow-hidden">
                <span className="anim-move-up block" data-delay="150">
                  바이너스프레드의 생각과 소식을 전합니다.
                </span>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <div className="px-page-padding border-b border-alto flex items-center gap-[4px] py-[20px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-[16px] py-[7px] text-[12px] uppercase tracking-[0.08em] border transition-colors ${
              active === cat
                ? "bg-mine-shaft text-gallery border-mine-shaft"
                : "bg-transparent text-mine-shaft/50 border-alto hover:border-mine-shaft hover:text-mine-shaft"
            }`}
          >
            {cat}
            <span className="ml-[6px] opacity-50">{count(cat)}</span>
          </button>
        ))}
      </div>

      {/* ── Story List ── */}
      <section ref={listRef as any} className="anim-wrap px-page-padding">
        {filtered.length === 0 ? (
          <div className="py-[120px] text-center text-[15px] text-mine-shaft/40">
            등록된 글이 없습니다.
          </div>
        ) : (
          <div className="border-t border-alto">
            {filtered.map((story, i) => (
              <Link
                key={story.slug}
                href={`/story/${story.slug}`}
                className="flex items-start gap-[40px] py-[40px] border-b border-alto group hover:bg-white/40 transition-colors px-0"
              >
                {/* 썸네일 */}
                {story.thumbnail ? (
                  <div className="flex-shrink-0 w-[160px] h-[100px] relative overflow-hidden">
                    <Image
                      src={story.thumbnail}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-[160px] h-[100px] bg-alto/40 flex items-center justify-center">
                    <span className="text-[11px] uppercase tracking-wider text-mine-shaft/30">No Image</span>
                  </div>
                )}

                {/* 텍스트 */}
                <div className="flex-1 flex flex-col gap-[12px]">
                  <div className="flex items-center gap-[16px]">
                    <span className="text-[11px] uppercase tracking-[0.1em] text-mine-shaft/40 font-inter">{story.category}</span>
                    <span className="text-[11px] text-mine-shaft/30">{story.date}</span>
                  </div>
                  <h2 className="text-[20px] md:text-[24px] tracking-[-0.5px] leading-snug group-hover:opacity-60 transition-opacity">
                    {story.title}
                  </h2>
                  <p className="text-[14px] font-light text-mine-shaft/50 leading-[1.5] line-clamp-2">
                    {story.summary}
                  </p>
                </div>

                {/* 화살표 */}
                <span className="flex-shrink-0 text-[20px] text-mine-shaft/30 group-hover:translate-x-1 transition-transform mt-[4px]">→</span>
              </Link>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
```

---

### 완료 기준

1. `src/components/layout/Header.tsx` — services, story 메뉴 추가
2. `src/app/(public)/services/page.tsx` — 생성
3. `src/lib/stories.ts` — 생성
4. `src/app/(public)/story/page.tsx` — 생성
5. `http://localhost:3000/services` 및 `http://localhost:3000/story` 접속 확인
6. TypeScript 오류 0개
7. `report.md` 업데이트

---

## 작업 C — Experience 카테고리 필터 추가

---

### C-1: Project 타입에 category 필드 추가 (`src/lib/projects.ts`)

타입에 필드 추가:
```ts
export type Project = {
  // ... 기존 필드 유지 ...
  category: "UI/UX" | "Character/Illustration" | "Branding" | "Etc";
};
```

기존 프로젝트 데이터에 `category` 필드 일괄 추가. 규칙:
- `macadamia` → `"UI/UX"`
- 나머지 모든 프로젝트 → `"Etc"` (실제 데이터 교체 전 임시값)

`slugify`로 slug를 생성하는 `.map()` 안에서 category는 이미 지정돼 있으므로 그냥 spread됨. 문제없음.

---

### C-2: Work 페이지에 카테고리 필터 추가 (`src/app/(public)/work/page.tsx`)

`"use client"` 유지. `useState` import 추가.

페이지 헤더 섹션 아래, `<WorkGrid />` 위에 필터 바 삽입:

```tsx
"use client";

import { useState } from "react";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { useReveal } from "@/hooks/useReveal";

const categories = ["All", "UI/UX", "Character/Illustration", "Branding", "Etc"] as const;
type Category = (typeof categories)[number];

export default function WorkPage() {
  const revealRef = useReveal();
  const [active, setActive] = useState<Category>("All");

  return (
    <main className="bg-gallery">
      {/* Page Header */}
      <section ref={revealRef as any} className="anim-wrap pt-[140px] pb-[80px] px-page-padding border-b border-alto">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-column">
          <div className="md:col-span-8 mb-[60px]">
            <h1 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase font-inter font-normal">
              <span className="anim-clip block">
                <span className="anim-move-up">Seamless new{" "}<span className="font-bold">experiences</span></span>
              </span>
            </h1>
          </div>
          <div className="md:col-span-6">
            <p className="text-[17px] font-medium leading-[1.4] tracking-[-0.3px] text-mine-shaft/60">
              <span className="block overflow-hidden">
                <span className="anim-move-up block" data-delay="200">
                  우리는 치밀한 리서치와 전략을 바탕으로 브랜드와 사용자의 경험을 설계하며, 새롭지만 직관적인 디지털 경험으로 더 가치 있는 브랜드를 만들어갑니다.
                </span>
              </span>
              <span className="block overflow-hidden mt-[8px]">
                <span className="anim-move-up block" data-delay="300">
                  아래는 바이너스프레드가 함께 만들어온 프로젝트들입니다.
                </span>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="px-page-padding border-b border-alto flex items-center gap-[4px] py-[20px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-[16px] py-[7px] text-[12px] uppercase tracking-[0.08em] border transition-colors ${
              active === cat
                ? "bg-mine-shaft text-gallery border-mine-shaft"
                : "bg-transparent text-mine-shaft/50 border-alto hover:border-mine-shaft hover:text-mine-shaft"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <WorkGrid filter={active} />
    </main>
  );
}
```

---

### C-3: WorkGrid에 filter prop 추가 (`src/components/sections/WorkGrid.tsx`)

```tsx
"use client";

import { useReveal } from "@/hooks/useReveal";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/common/ProjectCard";

type Category = "All" | "UI/UX" | "Character/Illustration" | "Branding" | "Etc";

interface WorkGridProps {
  filter?: Category;
}

export const WorkGrid = ({ filter = "All" }: WorkGridProps) => {
  const revealRef = useReveal();

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div ref={revealRef as any} className="anim-wrap grid grid-cols-1 md:grid-cols-2">
      {filtered.map((project, i) => (
        <ProjectCard
          key={project.slug}
          src={project.heroImg}
          alt={project.title}
          category={project.services}
          title={project.title}
          href={`/work/${project.slug}`}
          index={i}
          className="border-b border-alto md:even:border-l"
        />
      ))}
    </div>
  );
};
```

---

### C 완료 기준

1. `src/lib/projects.ts` — `category` 필드 타입 및 데이터 추가
2. `src/app/(public)/work/page.tsx` — 필터 바 + `filter` prop 전달
3. `src/components/sections/WorkGrid.tsx` — `filter` prop 수신 및 필터링 적용
4. All 클릭 시 전체 표시, 카테고리 클릭 시 해당 항목만 표시 확인
5. TypeScript 오류 0개
6. `report.md` 업데이트

---

## 오류 이력 — 반복하지 말 것

| 오류 | 교훈 |
|------|------|
| `anim-clip block` 두 줄 안 됨 | `.anim-clip { display: inline-block }` CSS가 `block` 덮어씀 → `block overflow-hidden` 사용 |
| 하드코딩 색상 | 토큰 쓰기 전 globals.css 확인 필수 |
| 보고 누락 | 모든 파일 수정 후 report.md 기재 |
