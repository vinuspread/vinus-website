"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const RING_SIZE = 32;
const RING_HOVER_SIZE = 72;  // hover 시 실제 px — border 두께 영향 없음

export const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // OS 커서 숨김
    const style = document.createElement("style");
    style.textContent = "* { cursor: none !important; }";
    document.head.appendChild(style);

    // Tailwind -translate-x-1/2 대신 GSAP xPercent/yPercent 사용
    // → width/height 변경 시에도 항상 커서 위치에 정확히 센터링
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power3.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power3.out" });
    };

    const onEnterLink = (e: Event) => {
      if ((e.currentTarget as Element).closest("[data-magnet]")) return;
      // width/height 애니메이션: scale 미사용 → border 두께 1px 유지
      gsap.to(ring, { width: RING_HOVER_SIZE, height: RING_HOVER_SIZE, opacity: 0.5, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      gsap.to(dot,  { scale: 0, duration: 0.3, overwrite: "auto" });
    };

    const onLeaveLink = (e: Event) => {
      if ((e.currentTarget as Element).closest("[data-magnet]")) return;
      gsap.to(ring, { width: RING_SIZE, height: RING_SIZE, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      gsap.to(dot,  { scale: 1, duration: 0.3, overwrite: "auto" });
    };

    window.addEventListener("mousemove", onMove);

    const registered = new WeakSet<Element>();

    const addLinkEvents = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        if (registered.has(el)) return;
        registered.add(el);
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    addLinkEvents();
    const observer = new MutationObserver(addLinkEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[32px] h-[32px] border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
    </>
  );
};
