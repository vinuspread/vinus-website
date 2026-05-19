"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { Observer } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowLink } from "@/components/common/ArrowLink";
import { useFitText } from "@/hooks/useFitText";

const B1_LINES = [
  { text: "In a fast-changing world,", bold: false },
  { text: "we focus on the essential value of experience.", bold: false },
  { text: "We design and manage products with clarity, structure, and purpose.", bold: false },
  { text: "We are VINUSPREAD.", bold: true },
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
  const b2Line1Ref = useFitText();
  const b2Line2Ref = useFitText();
  const b2HighlightRef = useFitText();
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [, setIndexState] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);
  const exitTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit",
        timeZone: "Asia/Seoul",
      });
      setCurrentTime(timeStr.replace(/:/g, " : "));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Reveals
      gsap.to(metaRef.current, { opacity: 1, duration: 1, delay: 0.5 });
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
          // B2: 단어별로 훨씬 더 느리고 긴 호흡으로 등장
          tl.fromTo(
            ".b2-word",
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 2.0, // 더 느리게
              stagger: { amount: 1.5, from: "random" }, // 시간차 대폭 확장
              ease: "power2.out",
            },
            0.8 // 등장 딜레이 추가
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
  }, []);

  return (
    <div id="hero-section" ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden z-10">
      {mounted && createPortal(
        <div ref={metaRef} style={{ opacity: 0 }} className="fixed top-[70px] md:top-[80px] right-page-padding z-[9999] flex flex-col items-end pointer-events-none mix-blend-difference">
          <span className="font-inter font-bold text-[12px] tracking-normal uppercase text-white/50">Seoul, Korea</span>
          <span className="font-inter font-bold text-[24px] md:text-[32px] tabular-nums tracking-[-0.02em] uppercase text-white mt-1">{currentTime || "00 : 00 : 00"}</span>
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
                  <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
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
                "빠르게 변화하는 세상 속에서, 우리는 경험의 본질에 집중합니다.",
                "명확한 구조와 목적을 바탕으로 제품을 설계하고 관리합니다.",
                "우리는 VINUSPREAD 입니다."
              ].map((line, i) => (
                <div key={i} className="py-0.5">
                  {line.split(" ").map((word, j) => (
                    <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
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
          <div className="font-inter uppercase leading-[0.95] lg:leading-[0.85] tracking-[-0.03em] lg:tracking-[-0.06em] text-mine-shaft">
            {/* Line 1: "We focus on" */}
            <div className="py-1 md:py-2 overflow-hidden">
              <div ref={b2Line1Ref} className="inline-block whitespace-nowrap">
                {"We focus on".split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
                    <span className="b2-word inline-block translate-y-[100%] opacity-0">{word}</span>
                  </span>
                ))}
              </div>
            </div>
            {/* Line 2: "the essential value of" */}
            <div className="py-1 md:py-2 overflow-hidden">
              <div ref={b2Line2Ref} className="inline-block whitespace-nowrap">
                {"the essential value of".split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
                    <span className="b2-word inline-block translate-y-[100%] opacity-0">{word}</span>
                  </span>
                ))}
              </div>
            </div>
            {/* Line 3: "PRODUCT EXPERIENCE." highlight */}
            <div className="py-1 md:py-2 overflow-hidden">
              <div ref={b2HighlightRef} className="inline-block whitespace-nowrap">
                {"PRODUCT EXPERIENCE.".split(" ").map((word, k) => (
                  <span key={k} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
                    <span className="b2-word inline-block font-bold translate-y-[100%] opacity-0 text-mine-shaft">{word}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-6">
            <p className="font-pretendard text-[14px] md:text-[16px] font-medium text-mine-shaft/40 leading-[1.6]">
              {"우리는 의미 있는 제품 경험의 본질에 집중합니다.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
                  <span className="b2-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Block 3 - 화면 중앙에 배치, 간격 축소 */}
        <div id="hero-b3-content" ref={b3ContentRef} className="w-full h-full flex flex-col justify-center px-page-padding gap-5 md:gap-6 will-change-transform">
          <div className="font-inter leading-[1.2] md:leading-[1.05] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(32px,5.5vw,68px)]">
            <div className="py-0.5 md:py-1">
              {"We turn product thinking into experience.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </div>
            <div className="py-0.5 md:py-1">
              {"Structured for clarity and sustainable growth.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </div>
            <div className="py-0.5 md:py-1">
              {"VINUSPREAD.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
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
                "우리는 제품 관점을 경험으로 만듭니다. 명확한 구조 위에서, 지속 가능한 성장을 설계합니다.",
                "VINUSPREAD"
              ].map((line, i) => (
                <div key={i} className="py-0.5">
                  {line.split(" ").map((word, j) => (
                    <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip" }}>
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
