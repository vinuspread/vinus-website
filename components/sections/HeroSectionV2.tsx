"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { ArrowLink } from "@/components/common/ArrowLink";

const B1_LINES = [
  { text: "We are a product studio", bold: false },
  { text: "that plans, builds, and operates", bold: false },
  { text: "client products with AI.", bold: true },
];

export const HeroSectionV2 = () => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const metaRef        = useRef<HTMLDivElement>(null);
  const timeDisplayRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 시계
  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      if (!timeDisplayRef.current) return;
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
      timeDisplayRef.current.textContent =
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // meta 입장
  useEffect(() => {
    if (!mounted || !metaRef.current) return;
    gsap.set(metaRef.current, { opacity: 0, y: -14 });
    gsap.to(metaRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.4 });
  }, [mounted]);

  // 텍스트 입장
  useEffect(() => {
    gsap.fromTo(
      ".b1-word",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: { amount: 0.5, from: "random" }, duration: 1.0, delay: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <div id="hero-section" ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden z-10">

      {/* 시계 포탈 */}
      {mounted && createPortal(
        <div
          ref={metaRef}
          className="fixed top-[70px] md:top-[80px] right-page-padding z-[9999] flex flex-col items-end pointer-events-none mix-blend-difference"
        >
          <span className="font-inter font-bold text-[12px] tracking-normal uppercase text-white/50">Seoul, Korea</span>
          <span ref={timeDisplayRef} className="font-inter font-bold text-[20px] md:text-[28px] tabular-nums tracking-[-0.02em] uppercase text-white mt-1">00:00:00</span>
        </div>,
        document.body
      )}

      <div className="flex w-full h-full flex-col justify-center lg:justify-start pt-0 lg:pt-[25vh] px-page-padding gap-6 md:gap-8">
        <div className="font-inter leading-[1.05] md:leading-[0.8] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(58px,5.5vw,100px)]">
          {B1_LINES.map((line, i) => (
            <div key={i} className="py-0.5 md:py-1">
              {line.text.split(" ").map((word, j) => (
                <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className={`b1-word inline-block opacity-0 ${line.bold ? "font-bold" : "font-normal"}`}>
                    {word}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 md:mt-4">
          <div className="font-pretendard text-[14px] md:text-[16px] font-medium text-mine-shaft/40 leading-[1.6] max-w-[900px]">
            {["우리는 AI를 활용하여, 고객의 제품을 기획하고 만들고 운영하는 매니징 기업입니다."].map((line, i) => (
              <div key={i} className="py-0.5">
                {line.split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                    <span className="b1-word inline-block opacity-0">{word}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="py-2">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
            <span className="overflow-hidden">
              <span className="b1-word inline-block opacity-0">
                <ArrowLink href="/work" className="text-[20px] md:text-[24px] font-semibold gap-4 md:gap-6">View Experience</ArrowLink>
              </span>
            </span>
            <span className="overflow-hidden">
              <span className="b1-word inline-block opacity-0">
                <ArrowLink href="/contact" className="text-[20px] md:text-[24px] font-semibold gap-4 md:gap-6">Start a Project</ArrowLink>
              </span>
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
