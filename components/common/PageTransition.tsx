"use client";

// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 페이지 전환 오버레이 컴포넌트. 삭제하거나 덮어쓰지 마세요.
// TransitionLink.tsx와 세트로 동작합니다.
//
// 이벤트 기반 설계 — pathname 감지 없음, TransitionLink가 전체 타이밍 제어:
//   page-transition:start → 오버레이 IN  (아래서 올라와 화면 덮음, expo.out)
//   page-transition:end   → 오버레이 OUT (꽉 찬 상태에서 위로 쓸려나감, power4.in)
//
// pathname 변경을 쓰지 않는 이유:
//   Next.js App Router는 router.push() 직후 URL을 즉시 바꾸지만
//   새 페이지 컨텐츠는 아직 렌더 전이므로 OUT을 너무 일찍 시작하면 깜박임 발생
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const OVERLAY_IN_DURATION  = 0.50; // expo.out  — 아래서 빠르게 올라와 부드럽게 착지
const OVERLAY_OUT_DURATION = 0.75; // power4.in — 꽉 찬 상태 유지 후 위로 빠르게 퇴장
const OVERLAY_OUT_DELAY    = 0.05; // OUT 시작 전 짧은 정지

export const PageTransition = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // 최초 진입: 오버레이 위로 퇴장
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.to(overlay, {
      scaleY: 0,
      transformOrigin: "top",
      duration: OVERLAY_OUT_DURATION,
      ease: "power4.in",
      delay: 0.10,
    });
  }, []);

  // page-transition:start → 오버레이 아래서 올라와 화면 덮음
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const handleStart = () => {
      gsap.killTweensOf(overlay);
      gsap.fromTo(
        overlay,
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: OVERLAY_IN_DURATION, ease: "expo.out" }
      );
    };
    window.addEventListener("page-transition:start", handleStart);
    return () => window.removeEventListener("page-transition:start", handleStart);
  }, []);

  // page-transition:end → 새 페이지 렌더 완료 후 오버레이 위로 퇴장
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const handleEnd = () => {
      gsap.killTweensOf(overlay);
      gsap.to(overlay, {
        scaleY: 0,
        transformOrigin: "top",
        duration: OVERLAY_OUT_DURATION,
        ease: "power4.in",
        delay: OVERLAY_OUT_DELAY,
      });
    };
    window.addEventListener("page-transition:end", handleEnd);
    return () => window.removeEventListener("page-transition:end", handleEnd);
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{ transform: "scaleY(1)" }}
      className="fixed inset-0 z-[9000] bg-mine-shaft pointer-events-none"
    />
  );
};
