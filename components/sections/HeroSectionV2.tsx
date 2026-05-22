"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowLink } from "@/components/common/ArrowLink";

const B1_LINES = [
  { text: "We are a product studio", bold: false },
  { text: "that plans, builds, and operates", bold: false },
  { text: "client products with AI.", bold: true },
];

export const HeroSectionV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef    = useRef<HTMLDivElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const b3ContentRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const timeDisplayRef = useRef<HTMLSpanElement>(null);

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

  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;

    if (isMobile) {
      gsap.fromTo(
        ".b1-word",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: { amount: 0.4, from: "random" }, duration: 0.8, delay: 0.4, ease: "power2.out" }
      );
      const stickyParent = containerRef.current?.parentElement;
      if (stickyParent) gsap.set(stickyParent, { zIndex: 10 });
      return;
    }

    const ctx = gsap.context(() => {
      const section = containerRef.current;
      if (!section) return;

      // 초기 상태 — B2/B3만 숨김, B1은 별도 로드 애니메이션으로 처리
      gsap.set(".b2-word, .b3-word", { opacity: 0, y: 30 });
      gsap.set(".b3-scroll-hint", { opacity: 0, y: 8 });
      gsap.set(sliderRef.current, { yPercent: 0 });

      // B1 로드 입장 (스크롤 무관, 페이지 진입 시 바로 실행)
      gsap.fromTo(".b1-word",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: { amount: 0.5, from: "random" }, duration: 1.0, delay: 0.6, ease: "power2.out" }
      );

      const tl = gsap.timeline();
      tl.to({}, { duration: 0.8 }); // B1 노출 상태 유지 구간

      // ── B1 → B2 ──
      tl.addLabel("t12");
      tl.to(".b1-word", { opacity: 0, y: -25, stagger: 0.03, duration: 0.6, ease: "power2.in" }, "t12");
      tl.to(sliderRef.current, { yPercent: -100, duration: 1.4, ease: "power3.inOut" }, "t12+=0.2");
      tl.to(".b2-word", {
        opacity: 1, y: 0,
        stagger: { amount: 0.4, from: "random" },
        duration: 0.9, ease: "power2.out",
      }, "t12+=1.0");
      tl.to({}, { duration: 0.6 });

      // ── B2 → B3 ──
      tl.addLabel("t23");
      tl.to(".b2-word", { opacity: 0, y: -25, stagger: 0.03, duration: 0.6, ease: "power2.in" }, "t23");
      tl.to(sliderRef.current, { yPercent: -200, duration: 1.4, ease: "power3.inOut" }, "t23+=0.2");
      tl.to(".b3-word", {
        opacity: 1, y: 0,
        stagger: { amount: 0.5, from: "random" },
        duration: 1.0, ease: "power2.out",
      }, "t23+=1.0");
      tl.to(".b3-scroll-hint", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "t23+=1.8");
      tl.to({}, { duration: 0.5 });

      const stickyParent = section.parentElement;
      if (stickyParent) gsap.set(stickyParent, { zIndex: 30 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=4000",
        pin: true,
        scrub: 1,
        animation: tl,
        invalidateOnRefresh: true,
      });
    }, containerRef);

    return () => ctx.revert();
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

      <div ref={sliderRef} className="relative w-full h-full will-change-transform">

        {/* Block 1 */}
        <div className="flex w-full h-full flex-col justify-center lg:justify-start pt-0 lg:pt-[25vh] px-page-padding gap-6 md:gap-8">
          <div className="font-inter leading-[1.05] md:leading-[0.8] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(58px,5.5vw,100px)]">
            {B1_LINES.map((line, i) => (
              <div key={i} className="py-0.5 md:py-1">
                {line.text.split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                    <span className={`b1-word inline-block translate-y-[100%] opacity-0 ${line.bold ? "font-bold" : "font-normal"}`}>
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
                      <span className="b1-word inline-block translate-y-[100%] opacity-0">{word}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* 모바일 전용 링크 */}
          <div className="lg:hidden py-2">
            <div className="flex flex-col gap-6 items-start">
              <span className="overflow-hidden">
                <span className="b1-word inline-block translate-y-[100%] opacity-0">
                  <ArrowLink href="/work" className="text-[20px] font-semibold gap-4">View Experience</ArrowLink>
                </span>
              </span>
              <span className="overflow-hidden">
                <span className="b1-word inline-block translate-y-[100%] opacity-0">
                  <ArrowLink href="/contact" className="text-[20px] font-semibold gap-4">Start a Project</ArrowLink>
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Block 2 — 데스크톱 전용 */}
        <div className="hidden lg:flex w-full h-full flex-col justify-start pt-[25vh] px-page-padding">
          <div className="font-inter leading-[1.05] md:leading-[0.8] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(58px,5.5vw,100px)]">
            <div className="py-0.5 md:py-1">
              {"We take responsibility for".split(" ").map((word, j) => (
                <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b2-word inline-block translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </div>
            <div className="py-0.5 md:py-1">
              {"design, planning, development,".split(" ").map((word, j) => (
                <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b2-word inline-block translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </div>
            <div className="py-0.5 md:py-1">
              {"operation, and consulting.".split(" ").map((word, k) => (
                <span key={k} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b2-word inline-block font-bold translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 md:mt-6">
            <p className="font-pretendard text-[14px] md:text-[16px] font-medium text-mine-shaft/40 leading-[1.6]">
              {"우리는 디자인과 기획, 개발과 운영 그리고 컨설팅을 책임집니다.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b2-word inline-block translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Block 3 — 데스크톱 전용 */}
        <div id="hero-b3-content" ref={b3ContentRef} className="hidden lg:flex w-full h-full flex-col justify-start pt-[25vh] px-page-padding gap-5 md:gap-6 will-change-transform">
          <div className="font-inter leading-[1.05] md:leading-[0.8] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(60px,5.5vw,90px)]">
            <div className="py-0.5 md:py-1">
              {"We work with our clients to design".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </div>
            <div className="py-0.5 md:py-1">
              {"sustainable growth on clear structure.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </div>
            <div className="py-0.5 md:py-1">
              {"We are VINUSPREAD.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b3-word inline-block font-bold translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="py-1">
            <div className="font-pretendard text-[14px] md:text-[16px] font-medium text-mine-shaft/40 max-w-[850px] leading-[1.5]">
              {["우리는 고객과 함께, 명확한 구조 위에서 지속 가능한 성장을 설계합니다."].map((line, i) => (
                <div key={i} className="py-0.5">
                  {line.split(" ").map((word, j) => (
                    <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                      <span className="b3-word inline-block translate-y-[100%] opacity-0">{word}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="py-2">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start">
              <span className="overflow-hidden">
                <span className="b3-word inline-block translate-y-[100%] opacity-0">
                  <ArrowLink href="/work" className="text-[20px] md:text-[24px] font-semibold gap-4 md:gap-6">View Experience</ArrowLink>
                </span>
              </span>
              <span className="overflow-hidden">
                <span className="b3-word inline-block translate-y-[100%] opacity-0">
                  <ArrowLink href="/contact" className="text-[20px] md:text-[24px] font-semibold gap-4 md:gap-6">Start a Project</ArrowLink>
                </span>
              </span>
            </div>
          </div>
          <div className="absolute bottom-10 left-page-padding flex items-center gap-3 b3-scroll-hint opacity-0">
            <span className="w-6 h-[1px] bg-mine-shaft/40 block" />
            <span className="font-inter text-[12px] uppercase tracking-widest text-mine-shaft/40">Scroll to explore</span>
          </div>
        </div>

      </div>
    </div>
  );
};
