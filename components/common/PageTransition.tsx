"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const PageTransition = () => {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    const main = document.querySelector("main") as HTMLElement | null;
    if (!main) return;

    if (isFirst.current) {
      isFirst.current = false;
      main.style.opacity = "1";
      return;
    }

    // 새 페이지 렌더 직후 opacity 0에서 fade-in
    main.style.transition = "none";
    main.style.opacity = "0";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        main.style.transition = "opacity 0.3s ease";
        main.style.opacity = "1";
      });
    });
  }, [pathname]);

  return null;
};
