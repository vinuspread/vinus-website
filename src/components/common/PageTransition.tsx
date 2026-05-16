"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export const PageTransition = () => {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Initial page load: just reveal
      gsap.fromTo(overlay,
        { scaleY: 1 },
        { scaleY: 0, duration: 0.8, ease: "power4.inOut", transformOrigin: "top" }
      );
      return;
    }

    // Route change: sweep in then out
    const tl = gsap.timeline();
    tl.fromTo(overlay,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.5, ease: "power4.inOut" }
    ).fromTo(overlay,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 0.6, ease: "power4.inOut" },
      "+=0.1"
    );
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9000] bg-mine-shaft pointer-events-none origin-top"
    />
  );
};
