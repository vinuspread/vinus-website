"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";


export const SmoothScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    (window as any).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Route change: scroll to top and restart lenis
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
};
