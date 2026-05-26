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

    // 헥사곤 형태가 보이는 최대 크기 (뷰포트 80% 커버)
    const scaleTarget = Math.max(
      (window.innerWidth  * 0.8) / HEX_W,
      (window.innerHeight * 0.8) / HEX_H
    );

    // 헥사곤이 progress ~15% 시점에 화면 진입 → 이미 1.4x 크기로 등장해 성장이 체감됨
    const yStart = window.innerHeight * 0.4;
    const yEnd   = -(window.innerHeight * 0.1);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // scale: power2.out — 스크롤 초반에 빠르게 성장 (화면에 등장하자마자 커지는 효과)
      tl.fromTo(hex, { scale: 1 }, { scale: scaleTarget, ease: "power2.out", duration: 1 }, 0);
      // y: 일정 속도로 상승
      tl.fromTo(hex, { y: yStart }, { y: yEnd, ease: "none", duration: 1 }, 0);
      // 최대 사이즈 유지
      tl.to(hex, { scale: scaleTarget, ease: "none", duration: 1 });
      // 원래 사이즈로 축소
      tl.to(hex, { scale: 1, ease: "none", duration: 1 });
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
