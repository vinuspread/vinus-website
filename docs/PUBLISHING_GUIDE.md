# 바이너스프레드 웹사이트 — 퍼블리싱 가이드

> **대상:** UI 디자인 및 퍼블리싱 담당 (안티그래비티)  
> **목적:** 만들어진 퍼블리싱 코드를 개발자가 기능 연결 없이 바로 통합할 수 있도록 정확한 구조와 규칙을 정의합니다.

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

## 9. 참고: 현재 사이트 디자인

| URL | 설명 |
|---|---|
| https://www.vinus.co.kr | 기존 사이트 (디자인 기준) |
| https://vinus-website.vercel.app | 현재 개발 중인 새 사이트 |

**디자인 방향:** 기존 vinus.co.kr의 레이아웃·느낌을 최대한 유지하면서, 모션과 CMS 기능을 추가하는 방향.
