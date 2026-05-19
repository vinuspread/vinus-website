"use client";

// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 오버레이 DOM 요소를 lib/pageTransition.ts 싱글톤에 등록하고
// 최초 진입 시 오버레이를 퇴장시키는 역할만 담당합니다.
// 전환 타이밍 로직은 lib/pageTransition.ts 참고.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { setOverlay, revealOnLoad } from "@/lib/pageTransition";

export const PageTransition = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    setOverlay(el);
    revealOnLoad();
    return () => setOverlay(null);
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{ transform: "scaleY(1)" }}
      className="fixed inset-0 z-[9000] bg-mine-shaft pointer-events-none"
    />
  );
};
