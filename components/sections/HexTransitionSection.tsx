"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const IMAGES = [
  "https://picsum.photos/seed/hex1/900/900",
  "https://picsum.photos/seed/hex2/900/900",
  "https://picsum.photos/seed/hex3/900/900",
  "https://picsum.photos/seed/hex4/900/900",
  "https://picsum.photos/seed/hex5/900/900",
];

const HEX_W = 300;
const HEX_H = Math.round(HEX_W * 47 / 41); // 344px — 로고 비율

export const HexTransitionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hexRef    = useRef<HTMLDivElement>(null);
  const imgsRef   = useRef<(HTMLDivElement | null)[]>([]);

  // 시간 기반 이미지 교차 전환
  useEffect(() => {
    const imgs = imgsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!imgs.length) return;

    gsap.set(imgs, { opacity: 0 });
    gsap.set(imgs[0], { opacity: 1 });

    let current = 0;
    const id = setInterval(() => {
      const next = (current + 1) % imgs.length;
      gsap.to(imgs[current], { opacity: 0, duration: 0.15, ease: "none" });
      gsap.to(imgs[next],    { opacity: 1, duration: 0.15, ease: "none" });
      current = next;
    }, 200);

    return () => clearInterval(id);
  }, []);

  // 스크롤 기반 확장
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hex     = hexRef.current;
    if (!section || !hex) return;

    const scaleTarget =
      Math.ceil(Math.max(window.innerWidth / HEX_W, window.innerHeight / HEX_H)) * 1.4;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        hex,
        { scale: 1 },
        {
          scale: scaleTarget,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom", // 섹션이 뷰포트 진입 즉시 시작
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
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
          {IMAGES.map((src, i) => (
            <div
              key={i}
              ref={(el) => { imgsRef.current[i] = el; }}
              style={{ position: "absolute", inset: 0, opacity: i === 0 ? 1 : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
