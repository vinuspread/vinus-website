# Admin CMS Implementation Design

**Goal:** `/admin` 경로에 Supabase Auth 기반 관리자 페이지를 구현한다. Work, Blog, FAQ, Settings 콘텐츠를 블록 에디터로 관리하고 관리자 계정을 초대/삭제할 수 있다.

**Architecture:** Next.js App Router의 `/admin` 라우트 그룹을 미들웨어로 보호. 어드민 전용 layout.tsx로 공개 사이트와 완전히 분리. 블록 에디터는 클라이언트 컴포넌트로 구현.

**Tech Stack:** Next.js 15 App Router, Supabase Auth (@supabase/ssr), Supabase Storage, Pretendard (next/font/local), Tailwind CSS v4

---

## 라우트 구조

```
app/
  admin/
    layout.tsx              어드민 전용 레이아웃 (Pretendard, 사이드바)
    page.tsx                대시보드 (콘텐츠 수 요약)
    login/
      page.tsx              로그인 페이지 (비보호)
    work/
      page.tsx              Work 목록
      new/page.tsx          Work 생성
      [id]/page.tsx         Work 편집
    blog/
      page.tsx              Blog 목록
      new/page.tsx          Blog 생성
      [id]/page.tsx         Blog 편집
    faq/
      page.tsx              FAQ 인라인 편집
    settings/
      page.tsx              Settings 키-값 편집
    admins/
      page.tsx              관리자 계정 목록 + 초대/삭제
  api/
    admin/
      invite/route.ts       관리자 초대 (service role key 사용)
      delete-user/route.ts  관리자 삭제 (service role key 사용)
      upload/route.ts       Supabase Storage 파일 업로드
middleware.ts               /admin/* 세션 확인 → 없으면 /admin/login 리다이렉트
```

---

## 1. 인증

### 미들웨어 (`middleware.ts`)
- `/admin/login` 제외한 모든 `/admin/*` 경로에서 Supabase 세션 확인
- 세션 없으면 `/admin/login`으로 리다이렉트
- 세션 있으면 통과, 쿠키 갱신

### 로그인 페이지 (`/admin/login`)
- 이메일 + 비밀번호 폼
- `supabase.auth.signInWithPassword()` 호출
- 성공 시 `/admin`으로 이동
- 실패 시 에러 메시지 표시

### 로그아웃
- 사이드바 하단 로그아웃 버튼
- `supabase.auth.signOut()` 호출 후 `/admin/login`으로 이동

---

## 2. 관리자 계정 관리 (`/admin/admins`)

### 목록
- `SUPABASE_SERVICE_ROLE_KEY`를 사용하는 서버 컴포넌트에서 `supabase.auth.admin.listUsers()` 호출
- 이메일, 생성일, 마지막 로그인 표시

### 초대 (`POST /api/admin/invite`)
- 요청 바디: `{ email: string }`
- `supabase.auth.admin.inviteUserByEmail(email)` 호출
- 초대 메일 발송 (Supabase 기본 이메일 템플릿)
- 초대받은 사람이 링크 클릭 → 비밀번호 설정 → 로그인 가능

### 삭제 (`POST /api/admin/delete-user`)
- 요청 바디: `{ userId: string }`
- `supabase.auth.admin.deleteUser(userId)` 호출
- 본인 계정 삭제 불가 (현재 세션 userId와 비교하여 차단)

### 환경변수
- `SUPABASE_SERVICE_ROLE_KEY` — 서버 전용, 클라이언트에 노출 금지

---

## 3. 블록 에디터

### 컴포넌트 위치
`components/admin/BlockEditor.tsx` — 클라이언트 컴포넌트

### Props
```ts
interface BlockEditorProps {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}
```

### 블록 조작
- 블록 타입 선택 드롭다운 + "추가" 버튼
- 각 블록 카드에 ↑ / ↓ / 삭제 버튼
- 첫 번째 블록의 ↑, 마지막 블록의 ↓ 비활성화

### 블록별 편집 UI

| 타입 | 편집 필드 |
|------|-----------|
| `text` | HTML textarea (직접 입력) |
| `image` | 파일 업로드 버튼 OR URL 직접 입력, alt 텍스트 |
| `gallery` | 이미지 추가(업로드/URL) + 각 이미지 삭제 버튼 |
| `video` | YouTube URL 입력 |
| `divider` | 높이(px) 숫자 입력 |
| `file` | 파일 업로드 버튼 OR URL 입력, 레이블 텍스트 |

### 이미지/파일 업로드 흐름
1. 클라이언트에서 `POST /api/admin/upload`로 FormData 전송
2. 서버에서 Supabase Storage `media` 버킷에 업로드
3. public URL 반환 → 블록 데이터에 저장

---

## 4. Work 관리

### 목록 (`/admin/work`)
- 테이블: 썸네일, 제목, 카테고리, 공개 여부, sort_order, 수정일
- 행 클릭 → 편집 페이지
- "새 Work" 버튼 → `/admin/work/new`

### 편집/생성 폼 필드
- 제목 (필수)
- 슬러그 (필수, 제목 입력 시 자동 생성, 수동 수정 가능)
- 카테고리 (텍스트 입력)
- 썸네일 이미지 (업로드 or URL)
- 썸네일 배경색 (hex color input)
- 공개 여부 (토글)
- sort_order (숫자)
- meta_title, meta_description
- 블록 에디터

### 저장
- `upsert` to `work` table
- 슬러그 중복 체크 (같은 slug가 다른 id로 존재하면 에러)

---

## 5. Blog 관리

### 목록 (`/admin/blog`)
- 테이블: 제목, 카테고리, 공개 여부, sort_order, 수정일
- 행 클릭 → 편집 페이지
- "새 Blog" 버튼 → `/admin/blog/new`

### 편집/생성 폼 필드
- 제목 (필수)
- 슬러그 (필수, 자동 생성)
- 카테고리: `Story` | `Download` (select)
- 공개 여부 (토글)
- sort_order (숫자)
- file_url (Download 카테고리일 때만 표시 — 파일 업로드 or URL)
- meta_title, meta_description
- 블록 에디터

---

## 6. FAQ 관리 (`/admin/faq`)

- 인라인 편집 테이블 (별도 편집 페이지 없음)
- 각 행: 질문, 답변, 공개 여부, ↑↓ 버튼, 삭제 버튼
- 하단 "새 FAQ 추가" 버튼 → 빈 행 추가
- "전체 저장" 버튼 하나로 변경사항 일괄 저장

---

## 7. Settings 관리 (`/admin/settings`)

- 키-값 테이블
- 키는 표시만 (수정 불가), 값만 인풋으로 편집
- "저장" 버튼으로 upsert

---

## 8. UI 스타일

### 레이아웃
- 좌측 고정 사이드바 (w-64) + 우측 콘텐츠 (`flex-1`)
- 모바일(< md): 사이드바 숨김, 상단 헤더 + 햄버거 메뉴로 전환
- 어드민 전용 `app/admin/layout.tsx` — 공개 사이트 Header/Footer/LenisProvider 미포함

### 폰트
- Pretendard, `next/font/local`로 로드
- 어드민 layout.tsx의 `<html>`에만 적용

### 컬러 & 타이포그래피
- 배경: 흰색
- 페이지 타이틀: text-4xl font-bold (현재 어드민과 동일)
- 섹션 구분: `<hr className="border-gray-200">`
- 라벨: text-sm text-gray-500

### 폼 인풋
- 하단 테두리만 있는 인풋 (공개 사이트 Request 폼 스타일 동일)
- `border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black`

### 버튼
- Save: `border border-[#FF3B5C] text-[#FF3B5C] px-6 py-2 text-sm hover:bg-[#FF3B5C] hover:text-white transition-colors`
- List/취소: `border border-black text-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-colors`
- 삭제: `border border-red-500 text-red-500 px-4 py-1 text-xs`

### 반응형
- 모든 폼: 모바일에서 라벨-인풋 상하 배치 (`flex-col`), 데스크탑에서 좌우 배치 (`grid grid-cols-[160px_1fr]`)
- 목록 테이블: 모바일에서 가로 스크롤

---

## 환경변수 추가 목록

```
SUPABASE_SERVICE_ROLE_KEY   # Supabase Dashboard > Settings > API > service_role key
```

기존 `.env.local`에 추가. Vercel에도 등록 필요.
