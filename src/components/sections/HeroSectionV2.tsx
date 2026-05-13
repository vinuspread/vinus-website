"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ArrowLink } from "@/components/common/ArrowLink";

const B1_LINES = [
  { text: "Even in the intensity of a fast-changing world,",       bold: false },
  { text: "we focus on the enduring value of what truly matters,", bold: false },
  { text: "striving to create beautiful designs that transcend",    bold: true  },
  { text: "structural and physical boundaries.",                    bold: true  },
];

const B2_LINES = [
  { text: "We focus on",             size: "clamp(50px, 6.5vw, 150px)" },
  { text: "the essential values of", size: "clamp(50px, 6.5vw, 150px)" },
  { text: "your brand.",             size: "clamp(100px, 12vw, 320px)" },
];

/**
 * HeroSectionV2 - Stable Stepped Version
 * Uses Observer for the premium "stepped" feel requested by the user.
 * Features a seamless "stacking" transition to the portfolio.
 */
export const HeroSectionV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [indexState, setIndexState] = useState(0);
  const currentIndex = useRef(0);
  const isAnimating = useRef(false);

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
    gsap.registerPlugin(Observer);
    const ctx = gsap.context(() => {
      // 1. Initial Reveals
      gsap.to(metaRef.current, { opacity: 1, duration: 1, delay: 0.5 });
      gsap.fromTo(".b1-line", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.1, duration: 1, delay: 0.8 });

      const animateTo = (newIndex: number) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const lenis = (window as any).__lenis;
        if (lenis && newIndex < 2) lenis.stop();

        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating.current = false;
            currentIndex.current = newIndex;
            setIndexState(newIndex);
            
            // ONLY release scroll after Slide 3 (index 2) is fully arrived
            if (lenis && newIndex === 2) {
              lenis.start();
            }
          }
        });

        tl.to(sliderRef.current, { yPercent: -newIndex * 100, duration: 1.5, ease: "power4.inOut" }, 0);
        tl.to(`.b${currentIndex.current + 1}-line`, { opacity: 0, y: -20, duration: 0.5 }, 0);
        tl.fromTo(`.b${newIndex + 1}-line`, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.1, duration: 1.2, ease: "power3.out" }, 0.6);

        // Stacking Sync: Manage the sticky parent's z-index to allow Portfolio to cover at the right time
        const stickyParent = containerRef.current?.parentElement;
        if (stickyParent) {
          if (newIndex === 2) {
            // Drop z-index exactly when we start moving to Slide 3
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
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden z-10">
      <div ref={metaRef} style={{ opacity: 0 }} className="absolute top-[80px] inset-x-0 z-30 px-page-padding py-[20px] flex flex-col items-end pointer-events-none">
        <span className="font-inter font-bold text-[11px] tracking-[0.18em] uppercase text-mine-shaft/40">Seoul, Korea</span>
        <span className="font-inter font-black text-[32px] tabular-nums tracking-[-0.02em] uppercase text-mine-shaft mt-1">{currentTime || "00 : 00 : 00"}</span>
      </div>

      <div ref={sliderRef} className="relative w-full h-full will-change-transform">
        {/* Block 1 */}
        <div className="w-full h-full flex flex-col justify-start pt-[25vh] px-page-padding gap-8">
          <div className="font-inter leading-[1.1] tracking-[-0.04em] text-mine-shaft" style={{ fontSize: "clamp(28px, 3.6vw, 58px)" }}>
            {B1_LINES.map((line, i) => (
              <div key={i} className="overflow-hidden py-0.5"><p className={`b1-line ${line.bold ? "font-bold" : "font-normal"}`}>{line.text}</p></div>
            ))}
          </div>
          <div className="overflow-hidden py-0.5">
            <p className="b1-line font-pretendard text-[20px] text-mine-shaft/70 max-w-[800px]">
              빠르게 변화하는 세상의 격랑 속에서도 우리는 진정으로 중요한 것의 영속적인 가치에 집중하며,<br />
              구조적·물리적 경계를 초월하는 아름다운 디자인을 만들기 위해 노력합니다.
            </p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="w-full h-full flex flex-col justify-start pt-[25vh] px-page-padding">
          <div className="font-inter uppercase leading-[0.85] tracking-[-0.06em] text-mine-shaft">
            {B2_LINES.map((line, i) => (
              <div key={i} className="overflow-hidden py-0.5"><p className="b2-line" style={{ fontSize: line.size }}>{line.text}</p></div>
            ))}
          </div>
        </div>

        {/* Block 3 */}
        <div className="w-full h-full flex flex-col justify-start pt-[25vh] px-page-padding gap-8">
          <div className="font-inter leading-[1.1] tracking-[-0.04em] text-mine-shaft" style={{ fontSize: "clamp(28px, 3.6vw, 58px)" }}>
            <div className="overflow-hidden py-0.5"><p className="b3-line">More than just creators,</p></div>
            <div className="overflow-hidden py-0.5"><p className="b3-line">VINUSPREAD is a <span className="font-bold">Product Management Group.</span></p></div>
          </div>
          <div className="overflow-hidden py-0.5">
            <p className="b3-line font-pretendard text-[20px] text-mine-shaft/70 max-w-[850px]">
              브랜드와 사용자 모두에게 의미 있는 경험을 만드는 것.<br />
              우리는 브랜드의 핵심 본질을 포착하고, 최적의 방향을 설계하며,<br />
              진정으로 마음에 울리는 디지털 경험을 구현합니다.
            </p>
          </div>
          <div className="overflow-hidden py-1">
            <div className="flex gap-12">
              <div className="b3-line"><ArrowLink href="/work" className="text-[24px] font-semibold gap-6">View Experience</ArrowLink></div>
              <div className="b3-line"><ArrowLink href="/contact" className="text-[24px] font-semibold gap-6">Start a Project</ArrowLink></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
