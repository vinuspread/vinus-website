# vinus.co.kr 리뉴얼 설계 문서

**작성일:** 2026-04-28  
**프로젝트:** 디자인스튜디오 바이너스프레드 웹사이트 리뉴얼  
**도메인:** vinus.co.kr

---

## 배경 및 목표

- 현재: 카페24 PHP 호스팅 + Bootstrap 3 + jQuery + Summernote CMS
- 목표:
  1. 현재 사이트 형태 최대한 유지 (큰 변화 X)
  2. 디자인 에이전시 수준의 모션 강화
  3. 블록 기반 CMS로 콘텐츠 관리 편의성 향상
  4. SEO / AI 검색 최적화 최우선

---

## 기술 스택

| 역할 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 호스팅 | Vercel |
| DB / Storage | Supabase (PostgreSQL + Storage) |
| 인증 | Supabase Auth |
| 모션 | Framer Motion + GSAP + ScrollTrigger + Lenis |
| 스타일 | Tailwind CSS |

---

## 사이트 구조

### 라우트

```
/                   메인 (포트폴리오 그리드)
/we                 회사 소개
/work               포트폴리오 목록
/work/[slug]        포트폴리오 상세
/blog               블로그 목록 (Story / Download 탭)
/blog/[slug]        블로그 상세
/request            프로젝트 의뢰
/admin              CMS 관리자 (로그인 필요)
  /admin/work
  /admin/work/new
  /admin/work/[id]
  /admin/blog
  /admin/blog/new
  /admin/blog/[id]
  /admin/faq
  /admin/settings
```

### 메뉴 구조 (현재 → 변경)

| 현재 | 변경 후 |
|------|---------|
| We | We |
| Work | Work |
| Download | ~~삭제~~ |
| Story | Blog (하위: Story / Download) |
| Request | Request |

### 렌더링 전략

| 페이지 유형 | 전략 | 이유 |
|------------|------|------|
| 포트폴리오/블로그 상세 | SSG | SEO 최적화, 최고 속도 |
| 목록 페이지 | ISR | 콘텐츠 추가 시 자동 재생성 |
| 관리자 페이지 | CSR | SEO 불필요 |

---

## 데이터베이스 스키마 (Supabase)

```sql
-- 포트폴리오
work (
  id              uuid primary key,
  slug            text unique not null,
  title           text not null,
  category        text,
  thumbnail_url   text,
  thumbnail_color text,         -- 카드 배경색 (현재 사이트 특징 유지)
  blocks          jsonb,        -- 블록 기반 본문
  meta_title      text,         -- SEO 제목 (없으면 title 사용)
  meta_description text,        -- SEO 설명
  is_published    boolean default false,
  sort_order      integer,
  created_at      timestamptz default now()
)

-- 블로그
blog (
  id              uuid primary key,
  slug            text unique not null,
  title           text not null,
  category        text,         -- 'Story' | 'Download'
  thumbnail_url   text,
  blocks          jsonb,
  file_url        text,         -- Download 카테고리 첨부파일
  meta_title      text,
  meta_description text,
  is_published    boolean default false,
  sort_order      integer,
  created_at      timestamptz default now()
)

-- FAQ
faq (
  id          uuid primary key,
  question    text not null,
  answer      text not null,
  sort_order  integer,
  is_published boolean default false
)

-- 사이트 설정 (We 페이지, 연락처 등)
settings (
  key   text primary key,
  value text
)
```

---

## 블록 시스템

### 블록 타입

| 타입 | 설명 |
|------|------|
| `text` | 제목/본문 텍스트 |
| `image` | 단일 이미지 |
| `gallery` | 이미지 여러 장 |
| `video` | 영상 임베드 (YouTube 등) |
| `divider` | 구분선/여백 |
| `file` | 다운로드 파일 첨부 |

### 블록 JSON 구조

```json
[
  { "type": "text", "content": "...", "motion": "textReveal" },
  { "type": "image", "src": "...", "alt": "...", "motion": "curtainReveal" },
  { "type": "gallery", "images": ["...", "..."], "motion": "stagger" },
  { "type": "video", "url": "https://youtube.com/...", "motion": "fadeIn" },
  { "type": "divider", "height": 40 },
  { "type": "file", "url": "...", "label": "파일명", "motion": "fadeIn" }
]
```

### CMS 블록 편집 UX

- [+ 블록 추가] → 타입 선택 → 내용 입력 → 모션 선택
- [↑] [↓] 버튼으로 순서 변경 (드래그앤드롭은 2단계에서 추가)
- [삭제] 버튼
- 공개/비공개 토글
- meta_title, meta_description 입력

---

## 모션 시스템

### 라이브러리

| 라이브러리 | 역할 |
|-----------|------|
| Framer Motion | 페이지 전환, 호버 인터랙션, 레이아웃 애니메이션 |
| GSAP + ScrollTrigger | 스크롤 기반 애니메이션, Text/Image Reveal |
| Lenis | 전체 페이지 부드러운 스크롤 (관성 스크롤) |

### 모션 패턴 (디자인 에이전시 표준)

| 모션 | 설명 | 적용 위치 |
|------|------|-----------|
| Text Line Reveal | 텍스트가 클립마스크로 아래에서 위로 등장 | 제목, 본문 |
| Image Curtain Reveal | 색상 커튼이 슬라이드하며 이미지 등장 | 포트폴리오 썸네일 |
| Portfolio Card Hover | 호버 시 이미지 확대 + 오버레이 텍스트 슬라이드업 | 포트폴리오 그리드 |
| Smooth Scroll | Lenis 관성 스크롤 | 전체 페이지 |
| Stagger | 그리드 카드 순차 등장 | 목록 페이지 |
| Parallax | 스크롤 속도 차이로 깊이감 | 히어로 섹션 |
| Page Transition | AnimatePresence 페이지 전환 | 모든 페이지 이동 |

---

## SEO / AI 검색 최적화

### 기술적 SEO

- 모든 페이지 `<title>`, `<meta description>` 자동 생성 (Next.js Metadata API)
- Open Graph 태그 (SNS 공유 미리보기)
- `/sitemap.xml` 자동 생성 (콘텐츠 추가 시 자동 업데이트)
- `/robots.txt` 설정
- 기존 카페24 URL → 새 URL 301 리다이렉트

### 구조화 데이터 (JSON-LD)

| 페이지 | 스키마 |
|--------|--------|
| 메인 / We | `Organization` |
| 포트폴리오 상세 | `CreativeWork` |
| 블로그 상세 | `BlogPosting` |
| FAQ 페이지 | `FAQPage` → Google 검색 결과 직접 노출 |

### AI 검색 최적화

- `/llms.txt` 파일 생성 (Perplexity, ChatGPT 등 AI 크롤러 안내)
- 시맨틱 HTML 마크업 (AI 크롤러가 읽기 좋은 구조)

---

## 마이그레이션 전략

- DB 데이터 및 이미지: 작업 완료 후 카페24에서 수작업으로 이전
- Work 포트폴리오 본문: 새 블록 시스템에서 재구성 (수동)
- Story/Download: 새 Blog 구조로 재편

---

## 2단계 (나중에 추가)

- 블록 편집기 드래그앤드롭 순서 변경
- 외부 플랫폼 자동 게시 (Instagram, Facebook, Tistory)

---

## 구현 우선순위

1. 사이트 퍼블리싱 (레이아웃, 라우팅, 모션)
2. CMS 관리자 기본 (Work, Blog CRUD)
3. 모션 시스템 연동
4. FAQ + 구조화 데이터
5. AI 최적화 (llms.txt, 시맨틱 마크업)
