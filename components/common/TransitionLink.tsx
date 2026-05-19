"use client";

// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 페이지 전환 오버레이용 링크 컴포넌트. 삭제하거나 덮어쓰지 마세요.
// PageTransition.tsx와 세트로 동작합니다.
//
// 전환 타이밍 전체를 이 컴포넌트가 제어합니다:
//   1. page-transition:start 이벤트 → PageTransition이 오버레이 IN 시작
//   2. OVERLAY_IN_DURATION ms 대기  → 오버레이가 화면을 완전히 덮을 때까지
//   3. router.push(href)            → 새 페이지 이동 (오버레이가 가리므로 안 보임)
//   4. PAGE_LOAD_BUFFER ms 대기     → 새 페이지 렌더 완료 대기
//   5. page-transition:end 이벤트  → PageTransition이 오버레이 OUT 시작
//
// pathname 변경이 아닌 이 이벤트 쌍으로 제어하는 이유:
//   Next.js는 router.push() 직후 URL을 즉시 바꾸지만 페이지 컨텐츠는
//   아직 렌더 전 → pathname 감지로 OUT 하면 구/신 페이지가 섞여 깜박임 발생
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

const OVERLAY_IN_DURATION = 550; // ms — IN(0.50s=500ms) + 50ms 여유
const PAGE_LOAD_BUFFER    = 200; // ms — 새 페이지 렌더 대기 (캐시 기준 충분한 값)

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TransitionLink = ({ href, children, className, onClick }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioning = useRef(false);

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // 같은 페이지이거나 전환 중이면 무시
    if (href === pathname || isTransitioning.current) return;
    isTransitioning.current = true;

    onClick?.();

    // 1. 오버레이 IN 시작
    window.dispatchEvent(new Event("page-transition:start"));

    // 2. 오버레이가 화면을 완전히 덮을 때까지 대기
    await new Promise<void>(r => setTimeout(r, OVERLAY_IN_DURATION));

    // 3. 페이지 이동 (오버레이가 가리므로 깜박임 없음)
    router.push(href);

    // 4. 새 페이지 렌더 완료 대기
    await new Promise<void>(r => setTimeout(r, PAGE_LOAD_BUFFER));

    // 5. 오버레이 OUT 시작
    window.dispatchEvent(new Event("page-transition:end"));

    isTransitioning.current = false;
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
