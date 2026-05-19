"use client";

// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// · 오버레이·로고 DOM 등록 (setOverlay / setLogo)
// · 최초 진입 시 오버레이 퇴장 (revealOnLoad)
// · pathname 변경 후 새 페이지 DOM 커밋 확인 → OUT 트리거 (onNavigated)
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { setOverlay, setLogo, revealOnLoad, onNavigated } from "@/lib/pageTransition";

export const PageTransition = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);
  const pathname   = usePathname();
  const isFirst    = useRef(true);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    setOverlay(el);
    setLogo(logoRef.current);
    revealOnLoad();
    return () => { setOverlay(null); setLogo(null); };
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
      className="fixed inset-0 z-[9000] bg-mine-shaft pointer-events-none flex items-center justify-center"
    >
      <img
        ref={logoRef}
        src="/images/h1_logo2.png"
        alt=""
        aria-hidden="true"
        data-pin-nopin="true"
        style={{ opacity: 0 }}
        className="h-7 md:h-9 w-auto invert"
      />
    </div>
  );
};
