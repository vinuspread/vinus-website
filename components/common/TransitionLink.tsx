"use client";

// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 페이지 전환 오버레이용 링크 컴포넌트. 삭제하거나 덮어쓰지 마세요.
// PageTransition.tsx와 세트로 동작합니다.
//
// 동작 순서:
//   1. 클릭 → page-transition:start 이벤트 → PageTransition이 오버레이 IN 시작
//   2. OVERLAY_IN_DURATION(ms) 대기 → 오버레이가 완전히 화면을 덮은 뒤 navigate
//   3. pathname 변경 → PageTransition이 오버레이 OUT 시작
//
// OVERLAY_IN_DURATION은 PageTransition.tsx의 OVERLAY_IN(초) × 1000 + 여유 50ms
// ─────────────────────────────────────────────────────────────────────────────

import { useRouter, usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

const OVERLAY_IN_DURATION = 600; // ms — OVERLAY_IN(0.55s=550ms) + 50ms 여유

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TransitionLink = ({ href, children, className, onClick }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // 같은 페이지 클릭 시 무시
    if (href === pathname) return;

    onClick?.();

    // PageTransition에 신호 전달 → 오버레이 IN 시작
    window.dispatchEvent(new Event("page-transition:start"));

    // 오버레이가 화면을 완전히 덮은 후 이동
    setTimeout(() => {
      router.push(href);
    }, OVERLAY_IN_DURATION);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
