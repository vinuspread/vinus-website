"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const OVERLAY_IN  = 0.42;  // seconds
const OVERLAY_OUT = 0.45;  // seconds

export const PageTransition = () => {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  // 초기 진입: 오버레이 열림 (위로 사라짐)
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.fromTo(
      overlay,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 0.55, ease: "power4.inOut" }
    );
  }, []);

  // 라우트 변경 완료 → 오버레이 열림
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    gsap.fromTo(
      overlay,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: OVERLAY_OUT, ease: "power4.inOut" }
    );
  }, [pathname]);

  // TransitionLink 신호 수신 → 오버레이 닫힘 (아래에서 위로 덮음)
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleStart = () => {
      gsap.fromTo(
        overlay,
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, duration: OVERLAY_IN, ease: "power4.inOut" }
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
