"use client";

// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 페이지 전환 오버레이 컴포넌트. 삭제하거나 덮어쓰지 마세요.
// TransitionLink.tsx와 세트로 동작합니다.
//
// 오버레이 모션 방향: 항상 아래 → 위
//   · IN  (화면 덮음): 아래서 자라 올라와 전체 화면을 덮음  (scaleY 0→1, origin: bottom)
//   · OUT (화면 열림): 위쪽으로 올라가 사라짐              (scaleY 1→0, origin: top)
// 이징: expo.out — 처음 빠르고 나중 느려지는 율동감
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const OVERLAY_IN  = 0.55;  // 오버레이 덮음 (아래→전체), expo.out
const OVERLAY_OUT = 0.80;  // 오버레이 열림 (전체→위로 퇴장), expo.out
const OVERLAY_OUT_DELAY = 0.06; // 완전히 덮힌 직후 짧은 정지 후 열림

export const PageTransition = () => {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  // 초기 진입: 오버레이 위로 퇴장 (아래→위 방향)
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.to(overlay, {
      scaleY: 0,
      transformOrigin: "top",
      duration: OVERLAY_OUT,
      ease: "expo.out",
      delay: OVERLAY_OUT_DELAY,
    });
  }, []);

  // 라우트 변경 완료 → 오버레이 위로 퇴장
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      scaleY: 0,
      transformOrigin: "top",
      duration: OVERLAY_OUT,
      ease: "expo.out",
      delay: OVERLAY_OUT_DELAY,
    });
  }, [pathname]);

  // TransitionLink 신호 수신 → 오버레이 아래서 올라와 화면 덮음
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleStart = () => {
      gsap.killTweensOf(overlay);
      gsap.fromTo(
        overlay,
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: OVERLAY_IN, ease: "expo.out" }
      );
    };

    window.addEventListener("page-transition:start", handleStart);
    return () => window.removeEventListener("page-transition:start", handleStart);
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{ transform: "scaleY(1)" }}
      className="fixed inset-0 z-[9000] bg-mine-shaft pointer-events-none"
    />
  );
};
