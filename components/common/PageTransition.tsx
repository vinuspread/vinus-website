"use client";

// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// · 오버레이 DOM 등록 (setOverlay)
// · 최초 진입 시 오버레이 퇴장 (revealOnLoad)
// · pathname 변경 후 새 페이지 DOM 커밋 확인 → OUT 트리거 (onNavigated)
//
// OUT을 pathname useEffect 에서 하는 이유:
//   router.push() 는 React concurrent renderer를 통해 비동기 처리.
//   실제 새 페이지가 DOM에 있는 시점은 useEffect([pathname]) 실행 후.
//   이 시점 이전에 OUT을 시작하면 구 페이지가 노출되어 깜박임 발생.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { setOverlay, revealOnLoad, onNavigated } from "@/lib/pageTransition";

export const PageTransition = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);

  // 마운트: 오버레이 등록 + 초기 퇴장
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    setOverlay(el);
    revealOnLoad();
    return () => setOverlay(null);
  }, []);

  // pathname 변경 = 새 페이지 DOM 커밋 완료 → OUT 시작
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    onNavigated();
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      style={{ transform: "scaleY(1)" }}
      className="fixed inset-0 z-[9000] bg-mine-shaft pointer-events-none"
    />
  );
};
