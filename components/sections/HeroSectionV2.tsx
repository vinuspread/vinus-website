"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { Observer } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowLink } from "@/components/common/ArrowLink";

const B1_LINES = [
  { text: "We are a product studio", bold: false },
  { text: "that plans, builds, and operates", bold: false },
  { text: "client products with AI.", bold: true },
];


/**
 * HeroSectionV2 - Stable Stepped Version
 * Uses Observer for the premium "stepped" feel requested by the user.
 * Features a seamless "stacking" transition to the portfolio.
 * B3 exit: ScrollTrigger scrub animates B3 text upward as portfolio slides in.
 */
export const HeroSectionV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const b3ContentRef = useRef<HTMLDivElement>(null);
  const [, setIndexState] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timeDisplayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => setMounted(true), []);

  // 시계 portal이 렌더된 후 초기 숨김 → 슬라이드 다운 + 페이드인
  // gsap.set으로 초기 상태 설정 (React inline style 없이) → 리렌더에 영향받지 않음
  useEffect(() => {
    if (!mounted || !metaRef.current) return;
    gsap.set(metaRef.current, { opacity: 0, y: -14 });
    gsap.to(metaRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.4 });
  }, [mounted]);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const exitTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const updateTime = () => {
      if (!timeDisplayRef.current) return;
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
      timeDisplayRef.current.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches || ('ontouchstart' in window);

    // 모바일: stepped navigation 없이 B3 상태로 바로 시작 + lenis 유지
    if (isMobile) {
      const lenis = window.__lenis;
      if (lenis) lenis.start();
      gsap.set(sliderRef.current, { yPercent: -200 });
      gsap.fromTo(".b3-word", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: { amount: 0.4, from: "random" }, duration: 0.8, delay: 0.4, ease: "power2.out" });
      const stickyParent = containerRef.current?.parentElement;
      if (stickyParent) gsap.set(stickyParent, { zIndex: 10 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial Reveals
      gsap.fromTo(
        ".b1-word",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: { amount: 0.6, from: "random" },
          duration: 1.0,
          delay: 0.6,
          ease: "power2.out",
        }
      );

      // B3 exit ScrollTrigger: syncs with window scroll 0 → 100vh
      // As the portfolio rises from below, B3 text rises and fades out simultaneously
      const registerExitTrigger = () => {
        if (exitTriggerRef.current) {
          exitTriggerRef.current.kill();
          exitTriggerRef.current = null;
        }
        if (!b3ContentRef.current) return;

        // Reset position before registering
        gsap.set(b3ContentRef.current, { y: 0, opacity: 1 });
        if (metaRef.current) gsap.set(metaRef.current, { y: 0, opacity: 1 });

        const exitAnim = gsap.timeline({ paused: true });
        exitAnim.to(b3ContentRef.current, {
          y: -window.innerHeight, // 포트폴리오가 올라오는 만큼 똑같이 위로 이동
          opacity: 1, // 사라지지 않고 포트폴리오에 가려질 때까지 유지
          ease: "none",
        }, 0);

        // Trigger-less: directly watches scroll position 0 → 100vh
        // Hero is sticky so at scrollY=0 portfolio is just below viewport,
        // at scrollY=100vh portfolio top reaches viewport top
        exitTriggerRef.current = ScrollTrigger.create({
          id: "hero-b3-exit",
          start: 0,
          end: window.innerHeight, // 100vh 구간 동안 텍스트 퇴장 및 포트폴리오 진입 동기화
          scrub: 1,
          animation: exitAnim,
          onUpdate: (self) => {
            // Safety: if user hasn't scrolled yet, keep B3 visible
            if (self.progress === 0) {
              gsap.set(b3ContentRef.current!, { y: 0, opacity: 1 });
              if (metaRef.current) gsap.set(metaRef.current, { y: 0, opacity: 1 });
            }
          },
        });
      };

      const killExitTrigger = () => {
        if (exitTriggerRef.current) {
          exitTriggerRef.current.kill();
          exitTriggerRef.current = null;
        }
        // Reset visual state
        if (b3ContentRef.current) {
          gsap.set(b3ContentRef.current, { y: 0, opacity: 1 });
        }
        if (metaRef.current) {
          gsap.set(metaRef.current, { y: 0, opacity: 1 });
        }
      };

      const animateTo = (newIndex: number) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const lenis = window.__lenis;
        if (lenis && newIndex < 2) lenis.stop();

        // If going back from B3, kill exit trigger
        if (currentIndex.current === 2 && newIndex < 2) {
          killExitTrigger();
        }

        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating.current = false;
            currentIndex.current = newIndex;
            setIndexState(newIndex);

            // B3 도달 → lenis 시작, content-container가 자연스럽게 올라오며 B3를 덮음
            if (lenis && newIndex === 2) {
              lenis.start();
              registerExitTrigger();
            }
          }
        });

        tl.to(sliderRef.current, { yPercent: -newIndex * 100, duration: 1.5, ease: "power4.inOut" }, 0);
        
        // 이전 모든 슬라이드 텍스트 일괄 퇴장 처리
        tl.to(".b1-word, .b2-word, .b3-word", { opacity: 0, y: -20, duration: 0.4 }, 0);
        tl.to(".b3-scroll-hint", { opacity: 0, duration: 0.2 }, 0);

        const isB1 = newIndex === 0;
        const isB2 = newIndex === 1;
        const isB3 = newIndex === 2;

        if (isB1) {
          // B1: 단어별로 랜덤하게 등장
          tl.fromTo(
            ".b1-word",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              stagger: { amount: 0.6, from: "random" },
              ease: "power2.out",
            },
            0.4
          );
        } else if (isB2) {
          tl.fromTo(
            ".b2-word",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: { amount: 0.4, from: "random" },
              ease: "power2.out",
            },
            0.4
          );
        } else if (isB3) {
          // B3: 단어별로 랜덤하게 등장
          tl.fromTo(
            ".b3-word",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              stagger: { amount: 0.6, from: "random" },
              ease: "power2.out",
            },
            0.4
          );
          // Scroll hint fade in (타임라인 밖 — isAnimating 해제에 영향 없음)
          gsap.fromTo(
            ".b3-scroll-hint",
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.0 }
          );
        }

        // Stacking Sync: Manage the sticky parent's z-index to allow Portfolio to cover at the right time
        const stickyParent = containerRef.current?.parentElement;
        if (stickyParent) {
          if (newIndex === 2) {
            gsap.set(stickyParent, { zIndex: 10 });
          } else {
            gsap.set(stickyParent, { zIndex: 30 });
          }
        }
      };

      // Initial Parent Z-Index
      const stickyParent = containerRef.current?.parentElement;
      if (stickyParent) gsap.set(stickyParent, { zIndex: 30 });

      Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onDown: (self) => {
          if (!isAnimating.current && currentIndex.current < 2) {
            self.event.preventDefault();
            animateTo(currentIndex.current + 1);
          }
        },
        onUp: (self) => {
          if (!isAnimating.current && currentIndex.current > 0 && window.scrollY < 10) {
            self.event.preventDefault();
            animateTo(currentIndex.current - 1);
          }
        },
        tolerance: 5,
        preventDefault: false,
      });
    }, containerRef);
    return () => {
      exitTriggerRef.current?.kill();
      ctx.revert();
      const lenis = window.__lenis;
      if (lenis) lenis.start();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="hero-section" ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden z-10">
      {mounted && createPortal(
        <div
          ref={metaRef}
          className="fixed top-[70px] md:top-[80px] right-page-padding z-[9999] flex flex-col items-end pointer-events-none mix-blend-difference"
        >
          <span className="font-inter font-bold text-[12px] tracking-normal uppercase text-white/50">Seoul, Korea</span>
          <span ref={timeDisplayRef} className="font-inter font-bold text-[20px] md:text-[28px] lg:text-[28px] tabular-nums tracking-[-0.02em] uppercase text-white mt-1">00:00:00</span>
        </div>,
        document.body
      )}

      <div ref={sliderRef} className="relative w-full h-full will-change-transform">
        {/* Block 1 */}
        <div className="w-full h-full flex flex-col justify-center lg:justify-start pt-0 lg:pt-[25vh] px-page-padding gap-6 md:gap-8">
          <div className="font-inter leading-[1.2] md:leading-[1.05] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(32px,5.5vw,68px)]">
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
              {[
                "우리는 AI를 활용하여, 고객의 제품을 기획하고 만들고 운영하는 매니징 기업입니다."
              ].map((line, i) => (
                <div key={i} className="py-0.5">
                  {line.split(" ").map((word, j) => (
                    <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                      <span className="b1-word inline-block translate-y-[100%] opacity-0">
                        {word}
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="w-full h-full flex flex-col justify-center lg:justify-start pt-0 lg:pt-[25vh] px-page-padding">
          <div className="font-inter leading-[1.2] md:leading-[1.05] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(32px,5.5vw,68px)]">
            {/* Line 1 */}
            <div className="py-0.5 md:py-1">
              {"We take responsibility for".split(" ").map((word, j) => (
                <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b2-word inline-block translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </div>
            {/* Line 2 */}
            <div className="py-0.5 md:py-1">
              {"design, planning, development,".split(" ").map((word, j) => (
                <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b2-word inline-block translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </div>
            {/* Line 3 */}
            <div className="py-0.5 md:py-1">
              {"operation, and consulting.".split(" ").map((word, k) => (
                <span key={k} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b2-word inline-block font-bold translate-y-[100%] opacity-0 text-mine-shaft">{word}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 md:mt-6">
            <p className="font-pretendard text-[14px] md:text-[16px] font-medium text-mine-shaft/40 leading-[1.6]">
              {"우리는 디자인과 기획, 개발과 운영 그리고 컨설팅을 책임집니다.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b2-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Block 3 - 화면 중앙에 배치, 간격 축소 */}
        <div id="hero-b3-content" ref={b3ContentRef} className="w-full h-full flex flex-col justify-center lg:justify-start pt-0 lg:pt-[25vh] px-page-padding gap-5 md:gap-6 will-change-transform">
          <div className="font-inter leading-[1.2] md:leading-[1.05] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(32px,5.5vw,68px)]">
            <div className="py-0.5 md:py-1">
              {"We work alongside our clients, designing".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </div>
            <div className="py-0.5 md:py-1">
              {"sustainable growth on a foundation of clarity.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </div>
            <div className="py-0.5 md:py-1">
              {"We are VINUSPREAD.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b3-word inline-block font-bold translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="py-1">
            <div className="font-pretendard text-[14px] md:text-[16px] font-medium text-mine-shaft/40 max-w-[850px] leading-[1.5]">
              {[
                "우리는 고객과 함께, 명확한 구조 위에서 지속 가능한 성장을 설계합니다."
              ].map((line, i) => (
                <div key={i} className="py-0.5">
                  {line.split(" ").map((word, j) => (
                    <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                      <span className="b3-word inline-block translate-y-[100%] opacity-0">
                        {word}
                      </span>
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

          {/* Scroll hint */}
          <div className="absolute bottom-10 left-page-padding flex items-center gap-3 b3-scroll-hint opacity-0">
            <span className="w-6 h-[1px] bg-mine-shaft/40 block" />
            <span className="font-inter text-[12px] uppercase tracking-widest text-mine-shaft/40">Scroll to explore</span>
          </div>
        </div>
      </div>
    </div>
  );
};
