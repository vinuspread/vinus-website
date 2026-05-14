# 외부 팀 코드 통합 가이드

## 배경

메인·서브 페이지는 외부 팀이 디자인·퍼블리싱한 코드를 그대로 사용한다.
Work 섹션의 데이터와 블록 렌더링은 우리 CMS(Supabase + BlockRenderer)가 담당한다.

## 핵심 원칙

- 외부 팀 제공 코드는 **수정 없이** 그대로 사용한다.
- 외부 팀의 work 레이아웃/스타일 안에 우리 CMS 데이터만 주입한다.
- CSS와 스크립트는 충돌 방지를 위해 **독립적으로** 처리한다.

---

## 폴더 구조 (예정)

```
app/
  (external)/              ← 외부 팀 제공 페이지
    layout.tsx             ← 외부 팀 CSS만 import (우리 글로벌 CSS 제외)
    page.tsx               (메인)
    about/page.tsx
    services/page.tsx
    ...
  (public)/                ← 우리 CMS work
    layout.tsx             ← 우리 Tailwind + 글로벌 CSS
    work/
      [slug]/page.tsx      ← Supabase 데이터 + BlockRenderer
```

---

## CSS 격리

**방법: Next.js App Router 라우트 그룹별 layout 분리**

- `(external)/layout.tsx` → 외부 팀 CSS 파일만 import
- `(public)/layout.tsx` → 우리 `globals.css` (Tailwind) import
- 각 그룹의 layout이 다르기 때문에 CSS가 해당 페이지에서만 로드됨
- 두 CSS가 동시에 로드되는 페이지가 없으므로 클래스명 충돌 없음

**주의사항**

- 외부 팀 CSS에 `*` 리셋이나 `body`, `html` 전역 선언이 있으면 확인 필요
- 충돌 위험이 있는 경우 외부 팀 CSS를 CSS Module로 변환하여 스코프 한정

---

## 스크립트 격리

**기본 격리**: React 컴포넌트 모델이 JS 스코프를 자동으로 격리

**추가 확인 필요**

- 외부 팀 코드가 `window.*` 전역 변수를 직접 사용하는 경우
- 동일한 라이브러리(예: GSAP, Swiper 등)를 각자 다른 버전으로 사용하는 경우
- 코드 수령 후 확인하여 필요시 대응

---

## Work 통합 방식

1. 외부 팀의 work 목록 페이지 레이아웃을 그대로 사용
2. 카드 데이터 부분만 Supabase 쿼리 결과로 교체
3. 상세 페이지 본문 영역에 `BlockRenderer` 연결
4. 외부 팀의 Hero, Meta Bar 등 레이아웃 구조는 유지

---

## 코드 수령 후 체크리스트

- [ ] 외부 팀 코드 형태 확인 (Next.js 컴포넌트 / 순수 HTML·CSS / 별도 저장소)
- [ ] 외부 팀 CSS 전역 선언 항목 검토
- [ ] 공통 라이브러리 버전 충돌 여부 확인
- [ ] 라우트 그룹 구조 설정
- [ ] 외부 팀 layout에 우리 CMS work 데이터 연결
