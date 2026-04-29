# 바이너스프레드 웹사이트 — 퍼블리싱 가이드

> **대상:** UI 디자인 및 퍼블리싱 담당 (안티그래비티)  
> **목적:** 만들어진 퍼블리싱 코드를 개발자가 기능 연결 없이 바로 통합할 수 있도록 정확한 구조와 규칙을 정의합니다.

---

> ## ⚠️ 디자인 기준
>
> **기존 사이트 https://www.vinus.co.kr 을 기준으로 디자인하세요.**  
> 이번 작업은 완전히 새로운 디자인을 만드는 것이 아니라, 기존 디자인을 **최대한 유지하면서 리뉴얼**하는 것입니다.  
> 폰트·여백·색상·레이아웃 모두 기존 사이트를 기준으로 하되, 더 자연스러운 모션과 반응형을 추가해 주세요.  
> 페이지별 참고 URL → **섹션 9 참고**

---

## 0. 작업 방식 — HTML/CSS/JS → TSX 변환 흐름

안티그래비티는 **익숙한 HTML+CSS+JS로 먼저 작업** 후, 아래 규칙에 따라 파일을 정리해서 전달합니다.  
개발자가 이 파일을 받아 TSX로 변환하고 기능을 연결합니다.

```
안티그래비티 작업 흐름
────────────────────────────────────
1. HTML/CSS/JS로 UI 완성 (로컬에서 브라우저 확인)
2. 아래 폴더 구조 규칙에 맞게 파일 정리
3. GitHub PR 또는 ZIP으로 개발자에게 전달
4. 개발자가 TSX로 변환 + 데이터 연결
────────────────────────────────────
```

---

---

## 0-1. HTML/CSS/JS 파일 저장 구조

전달 패키지는 아래 구조를 **정확히** 따라야 합니다.

```
publish/                          ← 전달 루트 폴더
│
├── README.md                     ← 작업 내용 설명 (필수)
│
├── pages/                        ← 페이지 단위 HTML
│   ├── home.html                 ← 홈 (/)
│   ├── work-list.html            ← Work 목록 (/work)
│   ├── work-detail.html          ← Work 상세 (/work/슬러그)
│   ├── blog-list.html            ← Blog 목록 (/blog)
│   ├── blog-detail.html          ← Blog 상세 (/blog/슬러그)
│   ├── we.html                   ← We 페이지 (/we)
│   └── request.html              ← 문의 페이지 (/request)
│
├── components/                   ← 공통 UI 조각 HTML
│   ├── header.html               ← 헤더/네비게이션
│   ├── footer.html               ← 푸터
│   ├── work-card.html            ← Work 카드 1개 (목록에서 반복)
│   ├── blog-card.html            ← Blog 카드 1개 (목록에서 반복)
│   └── blocks/                   ← 콘텐츠 블록 UI
│       ├── block-text.html       ← 텍스트 블록
│       ├── block-image.html      ← 이미지 블록
│       ├── block-gallery.html    ← 갤러리 블록
│       ├── block-video.html      ← 영상 블록
│       ├── block-divider.html    ← 여백/구분선 블록
│       └── block-file.html       ← 파일 다운로드 블록
│
├── css/
│   ├── style.css                 ← 전체 공통 스타일
│   ├── header.css                ← 헤더 전용 (없으면 style.css에 통합)
│   └── pages/
│       ├── home.css
│       ├── work.css
│       ├── blog.css
│       ├── we.css
│       └── request.css
│
├── js/
│   ├── common.js                 ← 공통 인터랙션 (메뉴 열기/닫기 등)
│   └── pages/
│       ├── home.js
│       ├── work.js
│       └── request.js            ← 폼 유효성 검사 UI (제출 처리는 개발자)
│
└── assets/
    ├── images/                   ← 새로 추가된 이미지만 (기존 이미지 제외)
    │   └── new-icon.svg
    └── fonts/                    ← 추가 폰트 필요시만 (Pretendard는 불필요)
```

---

## 0-2. HTML 파일 작성 규칙

### 기본 템플릿

모든 HTML 파일은 아래 구조를 따릅니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>페이지 제목 | 바이너스프레드</title>

  <!-- Pretendard 폰트 (반드시 이 CDN 사용) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css" />

  <!-- 공통 CSS -->
  <link rel="stylesheet" href="../css/style.css" />

  <!-- 페이지별 CSS -->
  <link rel="stylesheet" href="../css/pages/home.css" />
</head>
<body>

  <!-- 헤더 (공통) -->
  <!-- @@include('../components/header.html') -->
  <header class="site-header">
    <!-- header.html 내용 복사 -->
  </header>

  <!-- 페이지 본문 -->
  <main class="page-main">
    <!-- 이 부분이 TSX 변환 시 page.tsx가 됩니다 -->
  </main>

  <!-- 푸터 (공통) -->
  <!-- @@include('../components/footer.html') -->
  <footer class="site-footer">
    <!-- footer.html 내용 복사 -->
  </footer>

  <!-- JS -->
  <script src="../js/common.js"></script>
  <script src="../js/pages/home.js"></script>
</body>
</html>
```

---

## 0-3. 더미 데이터 표기 방법

개발자가 실제 데이터로 교체할 부분은 **주석으로 명확히 표시**합니다.

```html
<!-- Work 카드 — 실제로는 DB에서 반복 생성됨 -->
<article class="work-card">
  <!-- [DATA: work.thumbnail_url] -->
  <img src="../assets/images/dummy-thumbnail.png" alt="프로젝트 썸네일" />

  <!-- [DATA: work.thumbnail_color] — 배경색으로 사용 -->
  <div class="work-card__overlay" style="background-color: rgba(214,48,255,0.9);">

    <!-- [DATA: work.title] -->
    <h2 class="work-card__title">프로젝트 제목이 들어갑니다</h2>

    <!-- [DATA: work.category] -->
    <p class="work-card__category">Web Design</p>

  </div>
</article>
<!-- /Work 카드 반복 끝 -->
```

### 데이터 표기 키 목록

| 표기 | 실제 데이터 | 설명 |
|---|---|---|
| `[DATA: work.title]` | Work 제목 | 문자열 |
| `[DATA: work.slug]` | URL 슬러그 | `/work/{slug}` 링크에 사용 |
| `[DATA: work.thumbnail_url]` | 썸네일 이미지 URL | img src에 사용 |
| `[DATA: work.thumbnail_color]` | 썸네일 배경색 | 예: `rgba(214,48,255,0.9)` |
| `[DATA: work.category]` | 카테고리 | 문자열 |
| `[DATA: blog.title]` | Blog 제목 | 문자열 |
| `[DATA: blog.category]` | `Story` 또는 `Download` | 탭 필터에 사용 |
| `[DATA: blog.created_at]` | 날짜 | 예: `2024-03-15` |
| `[DATA: settings.address]` | 회사 주소 | 푸터/We 페이지 |
| `[DATA: settings.tel]` | 전화번호 | 푸터/We 페이지 |
| `[DATA: settings.instagram]` | Instagram URL | 외부 링크 |

---

## 0-4. CSS 작성 규칙

### 클래스 네이밍 — BEM 방식 권장

```css
/* 블록__요소--상태 */
.work-card { }
.work-card__title { }
.work-card__overlay { }
.work-card--featured { }   /* 변형 */
.work-card:hover { }
```

### 절대 사용 금지

```css
/* ❌ ID 선택자 — 재사용 불가 */
#main-title { }

/* ❌ !important */
.title { color: red !important; }

/* ❌ 외부 라이브러리 import */
@import url("https://cdn.example.com/bootstrap.css");
```

### 색상 변수 — CSS Custom Property 사용

```css
/* style.css 최상단에 선언 */
:root {
  --color-accent: #FF3B5C;      /* 포인트 컬러 */
  --color-text: #333333;        /* 기본 텍스트 */
  --color-text-muted: #888888;  /* 보조 텍스트 */
  --color-bg: #ffffff;          /* 배경 */
  --color-border: #e5e5e5;      /* 구분선 */
  --font-main: "Pretendard Variable", Pretendard, sans-serif;
}

/* 사용 */
.work-card__title {
  color: var(--color-text);
  font-family: var(--font-main);
}
```

### 반응형 — 모바일 우선

```css
/* 기본: 모바일 */
.work-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* 태블릿 이상 */
@media (min-width: 768px) {
  .work-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 데스크탑 이상 */
@media (min-width: 1280px) {
  .work-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 0-5. JS 작성 규칙

### 기본 원칙

- **jQuery 사용 금지** — 순수 JavaScript(Vanilla JS)만 사용
- DOM 조작은 클래스 토글 위주로 (style 직접 변경 최소화)
- 이벤트는 `addEventListener` 사용

### 올바른 작성 예시

```js
// common.js

// 헤더 메뉴 열기/닫기
const menuBtn = document.querySelector('.header__menu-btn');
const nav = document.querySelector('.header__nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}
```

```css
/* CSS에서 상태 제어 */
.header__nav {
  display: none;
}
.header__nav.is-open {
  display: block;
}
```

### 폼 처리 — UI까지만 담당

```js
// request.js
// 폼 유효성 검사 UI만 작성 — 실제 제출은 개발자가 연결

const form = document.querySelector('.request-form');
const submitBtn = document.querySelector('.request-form__submit');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // 제출 막기 (개발자가 이 부분을 교체)

    // [개발자 연결 필요] 이 아래에 실제 API 호출 코드가 들어갑니다
    console.log('폼 제출 — 개발자 연결 필요');
  });
}
```

### 애니메이션 — CSS transition 우선, JS는 트리거만

```js
// 스크롤 진입 시 애니메이션
const animTargets = document.querySelectorAll('[data-anim]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.15 });

animTargets.forEach(el => observer.observe(el));
```

```html
<!-- HTML에서 data-anim 속성으로 표시 -->
<div class="work-card" data-anim="fadeIn">...</div>
```

```css
/* CSS에서 실제 애니메이션 정의 */
[data-anim] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
[data-anim].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 0-6. TSX 변환 매핑 참고표

개발자가 HTML을 TSX로 변환할 때 아래 규칙을 따릅니다.  
퍼블리셔는 이 표를 참고해 HTML을 작성하면 변환이 쉬워집니다.

| HTML | TSX 변환 | 비고 |
|---|---|---|
| `<img src="...">` | `<Image src="..." fill />` | next/image |
| `<a href="/work">` | `<Link href="/work">` | next/link |
| `class="..."` | `className="..."` | 자동 치환 |
| `for="..."` | `htmlFor="..."` | label 속성 |
| `style="color:red"` | `className="text-red-500"` | Tailwind 변환 |
| `<!-- [DATA: x] -->` | `{data.x}` | 개발자가 연결 |
| JS 이벤트 함수 | `onClick`, `onChange` 핸들러 | 개발자가 변환 |
| `data-anim` 스크롤 | `<BlockMotion motion="fadeIn">` | 개발자가 변환 |

---

## 1. 기술 스택 (변경 불가)

| 항목 | 기술 | 비고 |
|---|---|---|
| 프레임워크 | **Next.js 16 (App Router)** | Pages Router 아님 |
| 언어 | **TypeScript (.tsx)** | JS 아님 |
| 스타일링 | **Tailwind CSS v4** | 외부 CSS 라이브러리 금지 |
| 폰트 | **Pretendard Variable** | CDN 자동 로드됨, 별도 선언 불필요 |
| 이미지 | **next/image 컴포넌트** | `<img>` 태그 직접 사용 금지 |
| 링크 | **next/link 컴포넌트** | `<a>` 태그 직접 사용 금지 (외부 링크 제외) |

### 절대 사용 금지
- jQuery
- Bootstrap, Bulma 등 외부 CSS 프레임워크
- 인라인 `style=""` (Tailwind 클래스로 대체)
- `<script>` 태그 직접 삽입
- `document.getElementById`, `window.onload` 등 DOM 직접 조작

---

## 2. 프로젝트 폴더 구조

```
vinus_website/
├── app/
│   └── (public)/               ← 공개 사이트 영역 (이 안에만 작업)
│       ├── layout.tsx          ← 공통 레이아웃 (Header + Footer 포함)
│       ├── template.tsx        ← 페이지 전환 애니메이션 (수정 금지)
│       ├── page.tsx            ← 홈 페이지 (/)
│       ├── we/
│       │   └── page.tsx        ← /we 페이지
│       ├── work/
│       │   ├── page.tsx        ← /work 목록
│       │   └── [slug]/
│       │       └── page.tsx    ← /work/상세
│       ├── blog/
│       │   ├── page.tsx        ← /blog 목록
│       │   └── [slug]/
│       │       └── page.tsx    ← /blog/상세
│       └── request/
│           └── page.tsx        ← /request 문의 페이지
│
├── components/                 ← 재사용 컴포넌트
│   ├── layout/
│   │   ├── Header.tsx          ← 헤더/네비게이션
│   │   └── Footer.tsx          ← 푸터
│   ├── work/
│   │   └── WorkCard.tsx        ← Work 목록에서 사용하는 카드
│   ├── blog/
│   │   └── BlogCard.tsx        ← Blog 목록에서 사용하는 카드
│   └── blocks/                 ← 콘텐츠 블록 컴포넌트 (수정 금지)
│       ├── BlockRenderer.tsx
│       ├── TextBlock.tsx
│       ├── ImageBlock.tsx
│       └── ...
│
└── public/
    └── images/                 ← 정적 이미지 (로고, 아이콘 등)
```

---

## 3. 페이지별 작업 요청 목록

아래 파일들을 새로 만들어주시면 됩니다. **데이터 연결은 개발자가 처리**하므로, 더미 데이터로 UI만 완성하세요.

---

### 3-1. 공통 레이아웃 — `components/layout/Header.tsx` / `Footer.tsx`

**Header 조건:**
- `'use client'` 선언 필수 (파일 맨 첫 줄)
- 현재 경로에 따라 active 스타일 적용 → `usePathname()` 훅 사용
- 메뉴 open/close 상태 → `useState` 사용
- 네비게이션 항목은 아래 배열을 그대로 사용:
  ```ts
  const navItems = [
    { label: 'We',      href: '/we' },
    { label: 'Work',    href: '/work' },
    { label: 'Blog',    href: '/blog' },
    { label: 'Request', href: '/request' },
  ]
  ```
- 로고 이미지: `<Image src="/images/h1_logo2.png" alt="바이너스프레드" width={56} height={56} />`

**Footer 조건:**
- 회사 정보는 추후 CMS에서 주입되므로 더미 텍스트로 작업
- Instagram / Pinterest 링크 포함

---

### 3-2. 홈 (`app/(public)/page.tsx`)

**데이터 형태:**
```ts
// 개발자가 주입할 데이터 타입 (props로 받는 것이 아니라 내부에서 사용)
type WorkItem = {
  id: string
  slug: string         // URL: /work/{slug}
  title: string
  category: string | null
  thumbnail_url: string | null   // 이미지 URL
  thumbnail_color: string | null // 썸네일 배경색 (예: "rgba(214,48,255,0.9)")
}
```

**UI 조건:**
- Work 아이템들을 그리드로 표시
- 각 아이템 클릭 → `/work/{slug}` 이동
- hover 시 `thumbnail_color` 배경으로 오버레이 + 제목 표시
- 더미 데이터 예시:
  ```ts
  const dummyWorks = [
    { id: '1', slug: 'project-a', title: 'Project A', category: 'Web', thumbnail_url: '/images/sample.png', thumbnail_color: 'rgba(214,48,255,0.9)' },
    // ... 12개 정도
  ]
  ```

---

### 3-3. Work 목록 (`app/(public)/work/page.tsx`)

홈과 동일한 `WorkItem` 타입. 필터(카테고리) UI가 있다면 추가 가능.

---

### 3-4. Work 상세 (`app/(public)/work/[slug]/page.tsx`)

**데이터 형태:**
```ts
type WorkDetail = {
  title: string
  category: string | null
  thumbnail_url: string | null
  blocks: Block[]      // 아래 섹션 참고
}
```

**UI 조건:**
- 상단 타이틀 영역
- `<BlockRenderer blocks={blocks} />` 컴포넌트를 본문에 삽입 (이미 개발 완료)
- `BlockRenderer`는 `@/components/blocks/BlockRenderer`에서 import

---

### 3-5. Blog 목록 (`app/(public)/blog/page.tsx`)

**데이터 형태:**
```ts
type BlogItem = {
  id: string
  slug: string
  title: string
  category: 'Story' | 'Download'
  thumbnail_url: string | null
  created_at: string   // ISO 날짜 문자열
}
```

**UI 조건:**
- Story / Download 탭 필터 (URL 쿼리스트링 `?category=Story`)
- 목록 클릭 → `/blog/{slug}`

---

### 3-6. Blog 상세 (`app/(public)/blog/[slug]/page.tsx`)

Work 상세와 동일 구조. `<BlockRenderer blocks={blocks} />` 사용.

---

### 3-7. We (`app/(public)/we/page.tsx`)

**데이터 형태:**
```ts
type Settings = {
  company_name_en?: string   // 예: 'VINUSPREAD'
  we_intro?: string          // 회사 소개 문구
  address?: string
  tel?: string
  email?: string
  instagram?: string
  pinterest?: string
}
```

**UI 조건:**
- 기존 vinus.co.kr `/we.php?md=info` 페이지 디자인 기준으로 작업
- 이미지: `/images/img_we1.png`, `/images/img_we2.png`, `/images/img_we3.png` 사용
- 클라이언트 로고: `/images/we_logo1.png` ~ `/images/we_logo28.png` (28개)

---

### 3-8. Request (`app/(public)/request/page.tsx`)

**UI 조건:**
- `'use client'` 선언 필수
- `<form>` 태그 사용 (submit 핸들러는 개발자가 연결)
- 필드: 이름, 연락처, 이메일, 프로젝트 유형, 예산, 내용, 파일 첨부
- submit 버튼의 `onSubmit` 함수명은 `handleSubmit`으로 지정

---

## 4. 컴포넌트 작성 규칙

### 서버 컴포넌트 vs 클라이언트 컴포넌트

| 구분 | 파일 첫 줄 | 사용 가능 |
|---|---|---|
| **서버 컴포넌트** (기본) | 선언 없음 | DB 데이터, 비동기 fetch |
| **클라이언트 컴포넌트** | `'use client'` | useState, useEffect, 이벤트 핸들러, 애니메이션 |

- **레이아웃/페이지 파일은 서버 컴포넌트**로 (데이터 주입은 개발자가 처리)
- **인터랙션이 있는 UI**는 별도 컴포넌트로 분리 후 `'use client'` 선언

예시:
```tsx
// app/(public)/work/page.tsx — 서버 컴포넌트 (선언 없음)
import WorkGrid from '@/components/work/WorkGrid'

export default async function WorkPage() {
  // 더미 데이터 (개발자가 실제 DB 쿼리로 교체)
  const works = [
    { id: '1', slug: 'project-a', title: 'Project A', ... },
  ]
  return <WorkGrid works={works} />
}

// components/work/WorkGrid.tsx — 클라이언트 컴포넌트 (hover 등 인터랙션)
'use client'
export default function WorkGrid({ works }) { ... }
```

---

### Image 컴포넌트 사용법

```tsx
import Image from 'next/image'

// 크기가 고정된 이미지
<Image src="/images/logo.png" alt="로고" width={56} height={56} />

// 부모 컨테이너에 꽉 채우는 이미지
<div className="relative w-full aspect-[4/3]">
  <Image src={item.thumbnail_url} alt={item.title} fill className="object-cover" />
</div>
```

---

### Link 컴포넌트 사용법

```tsx
import Link from 'next/link'

<Link href="/work/project-a">프로젝트 보기</Link>

// 외부 링크는 일반 <a> 태그 사용
<a href="https://instagram.com/vinuspread" target="_blank" rel="noopener noreferrer">
  Instagram
</a>
```

---

## 5. 스타일링 규칙

### Tailwind CSS 사용

```tsx
// ✅ 올바른 방법
<div className="flex items-center gap-4 px-8 py-6">

// ❌ 잘못된 방법
<div style={{ display: 'flex', alignItems: 'center' }}>
```

### 반응형

```tsx
// 모바일 우선 → 데스크탑 확장
<div className="grid grid-cols-2 md:grid-cols-4">
```

### 색상 / 브랜드 컬러

| 용도 | 값 |
|---|---|
| 포인트 컬러 | `#FF3B5C` |
| 텍스트 기본 | `#333333` |
| 배경 | `#ffffff` |
| 보조 텍스트 | `text-gray-500` |
| 구분선 | `border-gray-200` |

---

## 6. 블록 시스템 (수정 금지 영역)

Work/Blog 상세 페이지의 본문은 **블록 시스템**으로 구성됩니다.  
아래 컴포넌트들은 **개발자가 이미 완성**했으므로 레이아웃에서 import해서 사용만 하면 됩니다.

```tsx
import BlockRenderer from '@/components/blocks/BlockRenderer'

// 사용
<BlockRenderer blocks={work.blocks} />
```

블록 종류: `text`, `image`, `gallery`, `video`, `divider`, `file`  
각 블록에는 `motion` 속성이 있어 스크롤 진입 시 애니메이션이 자동 적용됩니다.

---

## 7. 파일 전달 방식

1. **GitHub 레포지토리에 PR(Pull Request)으로 제출**
   - 브랜치명: `design/[작업명]` (예: `design/header-footer`)
   - 한 번에 전체가 아닌 **컴포넌트 단위로 PR 분리**

2. **PR 설명에 포함할 내용:**
   - 작업한 파일 목록
   - 더미 데이터로 작업한 부분 표시
   - 개발자 연결 필요 항목 명시

3. **개발자 처리 범위 (퍼블리셔가 신경 쓰지 않아도 되는 것):**
   - Supabase 데이터 연결
   - 폼 제출 처리 (이메일 발송 등)
   - 인증/세션
   - Admin CMS 연동

---

## 8. 레포지토리 정보

```
GitHub: https://github.com/vinuspread/vinus-website
Branch: main (보호됨)
작업 브랜치: design/* 로 생성 후 PR
```

### 로컬 개발 환경 실행

```bash
npm install
npm run dev
# http://localhost:3000 에서 확인
```

> `.env.local` 파일이 없으면 Supabase 연결 오류가 나지만, **UI 확인에는 영향 없음** (더미 데이터로 작업하기 때문)

---

## 9. 디자인 기준 — 기존 사이트 참고

> **핵심 원칙:** 기존 vinus.co.kr의 레이아웃·타이포그래피·여백·색감을 **최대한 유사하게** 유지합니다.  
> 새 사이트는 디자인을 바꾸는 것이 아니라, 기존 디자인에 **모션과 CMS 기능을 추가**하는 리뉴얼입니다.

---

### 9-1. 기준 URL

| URL | 설명 |
|---|---|
| https://www.vinus.co.kr | **기존 사이트 — 디자인 기준** |
| https://vinus-website.vercel.app | 현재 개발 중인 새 사이트 (기능 구조 참고용) |

---

### 9-2. 페이지별 참고 URL

각 페이지 작업 시 아래 URL을 브라우저에서 직접 확인하면서 디자인하세요.

| 작업 페이지 | 기존 사이트 참고 URL |
|---|---|
| 홈 (`home.html`) | https://www.vinus.co.kr |
| We (`we.html`) | https://www.vinus.co.kr/we.php?md=info |
| Work 목록 (`work-list.html`) | https://www.vinus.co.kr/portfolio.php |
| Work 상세 (`work-detail.html`) | https://www.vinus.co.kr/portfolio.php?md=view&pcode=1 |
| Blog 목록 (`blog-list.html`) | https://www.vinus.co.kr/story.php |
| Blog 상세 (`blog-detail.html`) | https://www.vinus.co.kr/story.php?md=view&idx=1 |
| Request (`request.html`) | https://www.vinus.co.kr/request.php |
| 헤더/네비 (`header.html`) | https://www.vinus.co.kr (공통) |
| 푸터 (`footer.html`) | https://www.vinus.co.kr (공통) |

---

### 9-3. 반드시 유지해야 할 디자인 요소

기존 사이트를 보고 아래 항목을 그대로 따릅니다.

#### 전체 공통
- **폰트:** Pretendard Variable — 기존 사이트와 동일하게 이미 설정됨
- **기본 텍스트 색상:** `#333333`
- **배경:** `#ffffff`
- **여백·간격:** 기존 사이트의 섹션 간 여백, 폰트 크기, 행간(line-height)을 그대로 따를 것

#### 헤더/네비게이션
- 기존 사이트의 헤더 스타일(위치, 높이, 로고 크기, 메뉴 배치)을 기준으로 작업
- 모바일에서 full-screen 오버레이 네비게이션 방식 등 기존 동작 참고

#### 홈 페이지
- 기존 사이트의 포트폴리오 그리드 레이아웃 기준
- 썸네일 hover 시 오버레이 색상 + 제목 표시 인터랙션 유지

#### Work / Blog 목록
- 기존 사이트의 카드 배치, 여백, 타이포그래피 기준

#### We 페이지
- 기존 사이트의 섹션 구성, 이미지 배치, 클라이언트 로고 그리드 기준

#### Request 페이지
- 기존 사이트의 폼 레이아웃, 필드 스타일, 버튼 디자인 기준

---

### 9-4. 새로 추가하는 것 (기존에 없는 것)

기존 사이트에는 없지만 새 사이트에 추가되는 기능입니다. 디자인은 기존 스타일에 맞게 자연스럽게 녹여주세요.

- **페이지 전환 애니메이션** — 개발자가 처리, 별도 작업 불필요
- **스크롤 진입 애니메이션** — `data-anim` 속성으로 표시, JS/CSS 패턴은 섹션 0-5 참고
- **Work/Blog 상세 블록 시스템** — `<BlockRenderer>` 컴포넌트 삽입 위치만 지정, 실제 블록 UI는 개발 완료
- **CMS 연동** — 개발자가 처리, 퍼블리셔는 더미 데이터로 작업
