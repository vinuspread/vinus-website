"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";


export const SmoothScroll = () => {
  const pathname = usePathname();
  const isPopNavigationRef = useRef(false);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      window.__lenis = undefined;
      return;
    }

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    const saveCurrentScroll = () => {
      sessionStorage.setItem(`scroll:${location.pathname}`, String(window.scrollY));
    };
    document.addEventListener("click", saveCurrentScroll, true);
    window.addEventListener("beforeunload", saveCurrentScroll);
    return () => {
      document.removeEventListener("click", saveCurrentScroll, true);
      window.removeEventListener("beforeunload", saveCurrentScroll);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      isPopNavigationRef.current = true;
      if (location.pathname === "/") {
        sessionStorage.setItem("restore-pop:/", "1");
      }
      setTimeout(() => {
        if (location.pathname === "/") {
          sessionStorage.setItem("restore-pop:/", "1");
        }
      }, 0);
      setTimeout(() => {
        sessionStorage.removeItem("restore-pop:/");
      }, 2500);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    const restoredY = isPopNavigationRef.current
      ? Number(sessionStorage.getItem(`scroll:${pathname}`) ?? 0)
      : 0;
    isPopNavigationRef.current = false;

    if (lenis) {
      lenis.start();
      lenis.scrollTo(restoredY, { immediate: true });
    }

    window.scrollTo(0, restoredY);
    if (pathname === "/") {
      sessionStorage.removeItem("restore-pop:/");
    }
  }, [pathname]);

  return null;
};
