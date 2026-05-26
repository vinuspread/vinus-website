"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const HEX_W = 300;
const HEX_H = Math.round(HEX_W * 47 / 41); // 344px — 로고 비율

export const HexTransitionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hexRef    = useRef<HTMLDivElement>(null);

  // 스크롤 기반 확장
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hex     = hexRef.current;
    if (!section || !hex) return;

    const scaleTarget = Math.max(
      (window.innerWidth * 0.8) / HEX_W,
      (window.innerHeight * 0.8) / HEX_H
    );

    const yStart = (window.innerHeight - HEX_H) / 2;   // 헥사곤 하단 = 뷰포트 하단
    const yEnd   = -(window.innerHeight * 0.1);          // 중앙을 지나 10% 위까지

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 전반부: 올라오며 80%까지 성장
      tl.fromTo(hex,
        { scale: 1, y: yStart },
        { scale: scaleTarget, y: yEnd, ease: "none", duration: 1 }
      );
      // 후반부: 제자리에서 원래 사이즈로 축소
      tl.to(hex,
        { scale: 1, ease: "none", duration: 1 }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "350vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div
          ref={hexRef}
          style={{
            width: HEX_W,
            height: HEX_H,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src="/videos/hex-reel.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};
