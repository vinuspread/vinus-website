# 바이너스프레드 웹사이트 — 퍼블리싱 가이드

> **대상:** UI 디자인 및 퍼블리싱 담당 (안티그래비티)  
> **목적:** Next.js 레포에서 TSX + Tailwind CSS로 직접 UI를 구현하고, 개발자가 데이터만 연결합니다.

---

> ## 전체 작업 프로세스
>
> ```
> 1. 바이너스프레드가 이 문서(PUBLISHING_GUIDE.md)를 안티그래비티에 전달
>           ↓
> 2. 안티그래비티가 GitHub에서 레포지토리 다운로드 (clone)
>           ↓
> 3. ui-design 브랜치에서 UI 작업 진행
>           ↓
> 4. 작업 완료 후 GitHub에 다시 업로드 (push) + Pull Request 생성
>           ↓
> 5. 바이너스프레드가 내용 확인 후 사이트에 반영 (merge → 자동 배포)
> ```

---

> ## 🚨 브랜치 필독 — 반드시 지켜주세요
>
> **작업 브랜치: `ui-design`**
>
> ```bash
> git checkout ui-design   # 작업 시작 전 반드시 실행
> ```
>
> - **`main` 브랜치에는 절대 직접 push하지 마세요.** 사이트가 즉시 배포되는 브랜치입니다.
> - 모든 작업은 `ui-design` 브랜치에서 진행하고, 완성 후 PR(Pull Request)로 제출합니다.
> - 현재 브랜치 확인: `git branch` (앞에 `*` 표시된 브랜치가 현재 위치)
>
> **잘못된 브랜치에서 작업했다면 개발자에게 즉시 연락하세요.**

---



## 0. 작업 방식

**안티그래비티는 Next.js 레포에서 바로 TSX + Tailwind CSS로 작업합니다.**  
별도 `publish/` 폴더나 HTML → TSX 변환 단계는 없습니다.

```
작업 흐름
────────────────────────────────────
1. 레포 클론 → npm install → npm run dev
2. app/(public)/ 경로에 TSX로 UI 직접 구현
3. 더미 데이터로 UI 완성 (데이터 연결은 개발자 담당)
4. 컴포넌트 단위로 브랜치 생성 → GitHub PR 제출
5. 개발자가 Supabase 데이터 연결
────────────────────────────────────
```

### 역할 분담

| 안티그래비티 (퍼블리셔) | 개발자 |
|---|---|
| TSX + Tailwind로 UI 구현 | Supabase 데이터 연결 |
| 더미 데이터로 레이아웃 완성 | 폼 제출 처리 (이메일 등) |
| 반응형 구현 | Admin CMS 연동 |
| hover/scroll 인터랙션 | 인증/세션 관리 |

---

## 0-1. 더미 데이터 표기 방법

개발자가 실제 데이터로 교체할 부분은 **주석으로 명확히 표시**합니다.

```tsx
// Work 카드 — 실제로는 DB에서 반복 생성됨
// {/* [DATA: work.thumbnail_url] */}
// {/* [DATA: work.thumbnail_color] */}
// {/* [DATA: work.title] */}
// {/* [DATA: work.category] */}

const dummyWorks = [
  {
    id: '1',
    slug: 'project-a',
    title: '프로젝트 제목이 들어갑니다',
    category: 'Web Design',
    thumbnail_url: '/images/dummy-thumbnail.png',
    thumbnail_color: 'rgba(214,48,255,0.9)',
  },
  // ... 12개 정도
]
```

### 데이터 표기 키 목록

| 표기 | 실제 데이터 | 설명 |
|---|---|---|
| `[DATA: work.title]` | Work 제목 | 문자열 |
| `[DATA: work.slug]` | URL 슬러그 | `/work/{slug}` 링크에 사용 |
| `[DATA: work.thumbnail_url]` | 썸네일 이미지 URL | Image src에 사용 |
| `[DATA: work.thumbnail_color]` | 썸네일 배경색 | 예: `rgba(214,48,255,0.9)` |
| `[DATA: work.category]` | 카테고리 | 문자열 |
| `[DATA: blog.title]` | Blog 제목 | 문자열 |
| `[DATA: blog.category]` | `Story` 또는 `Download` | 탭 필터에 사용 |
| `[DATA: blog.created_at]` | 날짜 | 예: `2024-03-15` |
| `[DATA: settings.address]` | 회사 주소 | 푸터/We 페이지 |
| `[DATA: settings.tel]` | 전화번호 | 푸터/We 페이지 |
| `[DATA: settings.instagram]` | Instagram URL | 외부 링크 |

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
Branch: main     ← 배포 브랜치, 직접 push 금지
작업 브랜치: ui-design  ← 모든 UI 작업은 여기서
```

### 작업 시작 순서

```bash
git clone https://github.com/vinuspread/vinus-website.git
cd vinus-website
git checkout ui-design   # ← 이 브랜치에서 작업
npm install
npm run dev
```

### 작업 완료 후 제출

```bash
git add .
git commit -m "feat: 작업 내용 요약"
git push origin ui-design   # ui-design 브랜치로 push
# GitHub에서 ui-design → main 으로 Pull Request 생성
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
| https://www.vinus.co.kr | **기존 사이트** |
| https://vinus-website.vercel.app | 현재 개발 중인 새 사이트 (기능 구조 참고용) |

---

### 9-2. 페이지별 참고 URL

각 페이지 작업 시 아래 URL을 브라우저에서 직접 확인하면서 디자인하세요.

| 작업 파일 | 기존 사이트 참고 URL |
|---|---|
| `app/(public)/page.tsx` (홈) | https://www.vinus.co.kr |
| `app/(public)/we/page.tsx` | https://www.vinus.co.kr/we.php?md=info |
| `app/(public)/work/page.tsx` | https://www.vinus.co.kr/portfolio.php |
| `app/(public)/work/[slug]/page.tsx` | https://www.vinus.co.kr/portfolio.php?md=view&pcode=1 |
| `app/(public)/blog/page.tsx` | https://www.vinus.co.kr/story.php |
| `app/(public)/blog/[slug]/page.tsx` | https://www.vinus.co.kr/story.php?md=view&idx=1 |
| `app/(public)/request/page.tsx` | https://www.vinus.co.kr/request.php |
| `components/layout/Header.tsx` | https://www.vinus.co.kr (공통) |
| `components/layout/Footer.tsx` | https://www.vinus.co.kr (공통) |

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
- **스크롤 진입 애니메이션** — 필요한 요소에 `<BlockMotion motion="fadeIn">` 등 적용 (컴포넌트 이미 개발 완료)
- **Work/Blog 상세 블록 시스템** — `<BlockRenderer>` 컴포넌트 삽입 위치만 지정, 실제 블록 UI는 개발 완료
- **CMS 연동** — 개발자가 처리, 퍼블리셔는 더미 데이터로 작업

---

## 10. ui-design 업데이트 반영 워크플로

> **배경:** 안티그래비티는 작업을 `ui-design` 브랜치에 계속 업데이트한다.  
> 업데이트가 생길 때마다 개발자(바이너스프레드)가 `main` 브랜치에 반영해야 한다.

### 10-1. 파일 분류 (반영 방식 결정에 핵심)

| 분류 | 파일 예시 | 업데이트 방식 |
|---|---|---|
| **External-only** (안티그래비티가 100% 소유) | `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/sections/*`, `app/(public)/page.tsx`, `app/(public)/we/page.tsx`, `app/(public)/services/page.tsx` | 그대로 덮어쓰기 가능 |
| **Hybrid** (레이아웃은 안티그래비티, 데이터는 개발자) | `app/(public)/work/page.tsx`, `app/(public)/work/[slug]/page.tsx` | 수동 merge 필요 |
| **Dev-only** (개발자가 100% 소유) | `components/blocks/*`, `lib/supabase/*`, `types/*`, `app/admin/*` | 절대 sync 금지 |

### 10-2. 업데이트 반영 절차

```bash
# 1. ui-design 브랜치에서 변경 내용 확인
git fetch origin ui-design
git diff main...origin/ui-design -- "ui design/src/"

# 2. External-only 파일: 로컬 ui design/ 폴더를 업데이트 후 복사
# (외부 팀이 ui design/ 폴더를 새 버전으로 교체했을 때)
cp "ui design/src/components/layout/Header.tsx"     components/layout/Header.tsx
cp "ui design/src/components/layout/Footer.tsx"     components/layout/Footer.tsx
cp "ui design/src/components/sections/*.tsx"        components/sections/
cp "ui design/src/app/(public)/page.tsx"            app/(public)/page.tsx
cp "ui design/src/app/(public)/about/page.tsx"      app/(public)/we/page.tsx
cp "ui design/src/app/(public)/services/page.tsx"   app/(public)/services/page.tsx
cp "ui design/src/app/globals.css"                  # → globals.css의 해당 섹션만 병합

# 3. Hybrid 파일: diff 확인 후 수동 반영
git diff origin/ui-design -- "ui design/src/app/(public)/work/page.tsx"
# → 레이아웃 변경 부분만 선별하여 적용 (Supabase 데이터 주입 코드는 유지)

# 4. CSS 업데이트: ui-design globals.css에서 애니메이션·토큰 변경분만 병합
# app/globals.css의 "ui-design Animation System" 섹션을 업데이트

# 5. 빌드 확인
npm run build

# 6. 커밋 & 배포
git add .
git commit -m "sync: ui-design 업데이트 반영 (날짜)"
GH_TOKEN="" git push
```

### 10-3. Hybrid 파일 merge 가이드

Hybrid 파일에서 **개발자가 추가한 코드**는 아래 주석으로 표시되어 있다.  
안티그래비티의 업데이트를 반영할 때, 이 주석 블록을 보존하고 나머지만 교체한다.

```tsx
// [VINUS-CMS-START] — 개발자 추가 영역
import { createClient } from '@/lib/supabase/server'
// ... Supabase 쿼리, BlockRenderer 등
// [VINUS-CMS-END]
```

### 10-4. 주의사항

- **globals.css**: 우리가 추가한 `@theme inline` 토큰과 block spacing 규칙은 절대 삭제 금지  
  안티그래비티의 `@theme {}` 섹션(색상·spacing·easing)과 애니메이션 클래스만 업데이트
- **Header**: nav 항목(`We/Work/Blog/Request`)과 로고 이미지(`/images/h1_logo2.png`)는 항상 유지
- **Footer**: 바이너스프레드 연락처·SNS·Copyright는 항상 유지
- 빌드가 실패하면 커밋하지 말 것 (`npm run build` 성공 후 push)
