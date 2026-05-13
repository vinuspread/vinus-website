"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLink } from "@/components/common/ArrowLink";

const B1_LINES = [
  { text: "Even in the intensity of a fast-changing world,",       bold: false },
  { text: "we focus on the enduring value of what truly matters,", bold: false },
  { text: "striving to create beautiful designs that transcend",    bold: true  },
  { text: "structural and physical boundaries.",                    bold: true  },
];

const B2_LINES = [
  { text: "We focus on the", size: "clamp(50px, 7vw, 160px)" },
  { 
    text: "essential values of", 
    size: "clamp(50px, 7vw, 160px)",
    highlight: "YOUR BRAND.",
    highlightSize: "clamp(70px, 10vw, 240px)"
  },
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
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [indexState, setIndexState] = useState(0);
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
    gsap.registerPlugin(Observer, ScrollTrigger);
    const ctx = gsap.context(() => {
      // 1. Initial Reveals
      gsap.to(metaRef.current, { opacity: 1, duration: 1, delay: 0.5 });
      gsap.fromTo(
        ".b1-word",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: { amount: 0.8, from: "random" },
          duration: 1.2,
          delay: 0.8,
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

        const exitAnim = gsap.to(b3ContentRef.current, {
          y: -window.innerHeight, // 포트폴리오가 올라오는 만큼 똑같이 위로 이동
          opacity: 1, // 사라지지 않고 포트폴리오에 가려질 때까지 유지
          ease: "none",
          paused: true,
        });

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
      };

      const animateTo = (newIndex: number) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const lenis = (window as any).__lenis;
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
            }
          }
        });

        tl.to(sliderRef.current, { yPercent: -newIndex * 100, duration: 1.5, ease: "power4.inOut" }, 0);
        
        // 이전 모든 슬라이드 텍스트 일괄 퇴장 처리
        tl.to(".b1-word, .b2-word, .b3-word", { opacity: 0, y: -20, duration: 0.4 }, 0);

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
        tolerance: 10,
        preventDefault: false,
      });
    }, containerRef);
    return () => {
      exitTriggerRef.current?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div id="hero-section" ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden z-10">
      <div ref={metaRef} style={{ opacity: 0 }} className="fixed top-[80px] right-page-padding z-[100] flex flex-col items-end pointer-events-none">
        <span className="font-inter font-bold text-[11px] tracking-[0.18em] uppercase text-mine-shaft/40">Seoul, Korea</span>
        <span className="font-inter font-black text-[32px] tabular-nums tracking-[-0.02em] uppercase text-mine-shaft mt-1">{currentTime || "00 : 00 : 00"}</span>
      </div>

      <div ref={sliderRef} className="relative w-full h-full will-change-transform">
        {/* Block 1 */}
        <div className="w-full h-full flex flex-col justify-start pt-[25vh] px-page-padding gap-8">
          <div className="font-inter leading-[1.1] tracking-[-0.04em] text-mine-shaft" style={{ fontSize: "clamp(28px, 3.6vw, 58px)" }}>
            {B1_LINES.map((line, i) => (
              <div key={i} className="py-1">
                {line.text.split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.3em] overflow-hidden">
                    <span className={`b1-word inline-block translate-y-[100%] opacity-0 ${line.bold ? "font-bold" : "font-normal"}`}>
                      {word}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="py-1">
            <p className="font-pretendard text-[20px] text-mine-shaft/70 max-w-[800px] leading-relaxed">
              {"빠르게 변화하는 세상의 격랑 속에서도 우리는 진정으로 중요한 것의 영속적인 가치에 집중하며, 구조적·물리적 경계를 초월하는 아름다운 디자인을 만들기 위해 노력합니다.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] overflow-hidden">
                  <span className="b1-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="w-full h-full flex flex-col justify-start pt-[25vh] px-page-padding">
          <div className="font-inter uppercase leading-[0.85] tracking-[-0.06em] text-mine-shaft">
            {B2_LINES.map((line, i) => (
              <div key={i} className="py-2 flex flex-wrap items-baseline" style={{ fontSize: line.size }}>
                {line.text.split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.3em] overflow-hidden">
                    <span className="b2-word inline-block translate-y-[100%] opacity-0">
                      {word}
                    </span>
                  </span>
                ))}
                {line.highlight && (
                  <div className="w-full mt-2" style={{ fontSize: line.highlightSize }}>
                    {line.highlight.split(" ").map((word, k) => (
                      <span key={k} className="inline-block mr-[0.3em] overflow-hidden">
                        <span className="b2-word inline-block font-black translate-y-[100%] opacity-0 text-mine-shaft">
                          {word}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Block 3 - 화면 중앙에 배치, 간격 축소 */}
        <div id="hero-b3-content" ref={b3ContentRef} className="w-full h-full flex flex-col justify-center px-page-padding gap-4 will-change-transform">
          <div className="font-inter leading-[1.1] tracking-[-0.04em] text-mine-shaft" style={{ fontSize: "clamp(28px, 3.6vw, 58px)" }}>
            <div className="py-1">
              {"More than just creators,".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] overflow-hidden">
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </div>
            <div className="py-1">
              {"VINUSPREAD is a".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] overflow-hidden">
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
              <span className="inline-block mr-[0.3em] overflow-hidden">
                <span className="b3-word inline-block font-bold translate-y-[100%] opacity-0">Product</span>
              </span>
              <span className="inline-block mr-[0.3em] overflow-hidden">
                <span className="b3-word inline-block font-bold translate-y-[100%] opacity-0">Management</span>
              </span>
              <span className="inline-block mr-[0.3em] overflow-hidden">
                <span className="b3-word inline-block font-bold translate-y-[100%] opacity-0">Group.</span>
              </span>
            </div>
          </div>
          <div className="py-1">
            <p className="font-pretendard text-[20px] text-mine-shaft/70 max-w-[850px] leading-relaxed">
              {"브랜드와 사용자 모두에게 의미 있는 경험을 만드는 것. 우리는 브랜드의 핵심 본질을 포착하고, 최적의 방향을 설계하며, 진정으로 마음에 울리는 디지털 경험을 구현합니다.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] overflow-hidden">
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">
                    {word}
                  </span>
                </span>
              ))}
            </p>
          </div>
          <div className="py-2">
            <div className="flex gap-12">
              <span className="overflow-hidden">
                <span className="b3-word inline-block translate-y-[100%] opacity-0">
                  <ArrowLink href="/work" className="text-[24px] font-semibold gap-6">View Experience</ArrowLink>
                </span>
              </span>
              <span className="overflow-hidden">
                <span className="b3-word inline-block translate-y-[100%] opacity-0">
                  <ArrowLink href="/contact" className="text-[24px] font-semibold gap-6">Start a Project</ArrowLink>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
