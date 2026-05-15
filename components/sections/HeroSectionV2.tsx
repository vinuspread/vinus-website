"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLink } from "@/components/common/ArrowLink";

const B1_LINES = [
  { text: "In a fast-changing world,", bold: false },
  { text: "we focus on the essential value of experience.", bold: false },
  { text: "We design and manage products with clarity, structure, and purpose.", bold: false },
  { text: "We are VINUSPREAD.", bold: true },
];

const B2_LINES = [
  { text: "We focus on", size: "calc((100vw - 320px) / 15)" },
  {
    text: "the essential value of",
    size: "calc((100vw - 320px) / 15)",
    highlight: "PRODUCT EXPERIENCE.",
    highlightSize: "calc((100vw - 320px) / 14)"
  },
];

export const HeroSectionV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const b3ContentRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [, setIndexState] = useState(0);
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
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    gsap.registerPlugin(Observer, ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(metaRef.current, { opacity: 1, duration: 1, delay: 0.5 });
      gsap.fromTo(
        ".b1-word",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          stagger: { amount: 0.8, from: "random" },
          duration: 1.2, delay: 0.8, ease: "power2.out",
        }
      );

      const registerExitTrigger = () => {
        if (exitTriggerRef.current) { exitTriggerRef.current.kill(); exitTriggerRef.current = null; }
        if (!b3ContentRef.current) return;
        gsap.set(b3ContentRef.current, { y: 0, opacity: 1 });
        const exitAnim = gsap.to(b3ContentRef.current, {
          y: -window.innerHeight, opacity: 1, ease: "none", paused: true,
        });
        exitTriggerRef.current = ScrollTrigger.create({
          id: "hero-b3-exit",
          start: 0, end: window.innerHeight, scrub: 1, animation: exitAnim,
          onUpdate: (self) => {
            if (self.progress === 0) gsap.set(b3ContentRef.current!, { y: 0, opacity: 1 });
          },
        });
      };

      const killExitTrigger = () => {
        if (exitTriggerRef.current) { exitTriggerRef.current.kill(); exitTriggerRef.current = null; }
        if (b3ContentRef.current) gsap.set(b3ContentRef.current, { y: 0, opacity: 1 });
      };

      const animateTo = (newIndex: number) => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        const lenis = (window as any).__lenis;
        if (lenis && newIndex < 2) lenis.stop();
        if (currentIndex.current === 2 && newIndex < 2) killExitTrigger();

        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating.current = false;
            currentIndex.current = newIndex;
            setIndexState(newIndex);
            if (lenis && newIndex === 2) { lenis.start(); registerExitTrigger(); }
          }
        });

        tl.to(sliderRef.current, { yPercent: -newIndex * 100, duration: 1.5, ease: "power4.inOut" }, 0);
        tl.to(".b1-word, .b2-word, .b3-word", { opacity: 0, y: -20, duration: 0.4 }, 0);

        if (newIndex === 0) {
          tl.fromTo(".b1-word", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, stagger: { amount: 0.6, from: "random" }, ease: "power2.out" }, 0.4);
        } else if (newIndex === 1) {
          tl.fromTo(".b2-word", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2.0, stagger: { amount: 1.5, from: "random" }, ease: "power2.out" }, 0.8);
        } else if (newIndex === 2) {
          tl.fromTo(".b3-word", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.0, stagger: { amount: 0.6, from: "random" }, ease: "power2.out" }, 0.4);
        }

        const stickyParent = containerRef.current?.parentElement;
        if (stickyParent) gsap.set(stickyParent, { zIndex: newIndex === 2 ? 10 : 30 });
      };

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
      const lenis = (window as any).__lenis;
      if (lenis) lenis.start();
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
          <div className="font-inter leading-[1.1] tracking-[-0.04em] text-mine-shaft text-[clamp(32px,3.5vw,48px)]">
            {B1_LINES.map((line, i) => (
              <div key={i} className="py-1">
                {line.text.split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.3em] overflow-hidden">
                    <span className={`b1-word inline-block translate-y-[100%] opacity-0 ${line.bold ? "font-bold" : "font-normal"}`}>{word}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="font-pretendard text-[16px] font-medium text-mine-shaft/40 leading-[1.5] max-w-[900px]">
              {["빠르게 변화하는 세상 속에서, 우리는 경험의 본질에 집중합니다.", "명확한 구조와 목적을 바탕으로 제품을 설계하고 관리합니다.", "우리는 VINUSPREAD 입니다."].map((line, i) => (
                <div key={i} className="py-0.5">
                  {line.split(" ").map((word, j) => (
                    <span key={j} className="inline-block mr-[0.3em] overflow-hidden">
                      <span className="b1-word inline-block translate-y-[100%] opacity-0">{word}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Block 2 */}
        <div className="w-full h-full flex flex-col justify-start pt-[25vh] px-page-padding">
          <div className="font-inter uppercase leading-[0.85] tracking-[-0.06em] text-mine-shaft">
            {B2_LINES.map((line, i) => (
              <div key={i} className="py-2 whitespace-nowrap overflow-hidden" style={{ fontSize: line.size }}>
                {line.text.split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.3em] overflow-hidden">
                    <span className="b2-word inline-block translate-y-[100%] opacity-0">{word}</span>
                  </span>
                ))}
                {line.highlight && (
                  <div className="w-full mt-2 whitespace-nowrap overflow-hidden" style={{ fontSize: line.highlightSize }}>
                    {line.highlight.split(" ").map((word, k) => (
                      <span key={k} className="inline-block mr-[0.3em] overflow-hidden">
                        <span className="b2-word inline-block font-black translate-y-[100%] opacity-0 text-mine-shaft">{word}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="font-pretendard text-[16px] font-medium text-mine-shaft/40 leading-[1.5]">
              {"우리는 의미 있는 제품 경험의 본질에 집중합니다.".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] overflow-hidden">
                  <span className="b2-word inline-block translate-y-[100%] opacity-0">{word}</span>
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Block 3 */}
        <div id="hero-b3-content" ref={b3ContentRef} className="w-full h-full flex flex-col justify-center px-page-padding gap-6 will-change-transform">
          <div className="font-inter leading-[1.1] tracking-[-0.04em] text-mine-shaft text-[clamp(32px,3.5vw,48px)]">
            {["We turn product thinking into experience.", "Structured for clarity and sustainable growth.", "VINUSPREAD."].map((line, i) => (
              <div key={i} className="py-1">
                {line.split(" ").map((word, j) => (
                  <span key={j} className="inline-block mr-[0.3em] overflow-hidden">
                    <span className={`b3-word inline-block translate-y-[100%] opacity-0 ${i === 2 ? "font-black" : ""}`}>{word}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="py-1">
            <div className="font-pretendard text-[16px] font-medium text-mine-shaft/40 max-w-[850px] leading-[1.5]">
              {["우리는 제품 관점을 경험으로 만듭니다. 명확한 구조 위에서, 지속 가능한 성장을 설계합니다.", "VINUSPREAD"].map((line, i) => (
                <div key={i} className="py-0.5">
                  {line.split(" ").map((word, j) => (
                    <span key={j} className="inline-block mr-[0.3em] overflow-hidden">
                      <span className="b3-word inline-block translate-y-[100%] opacity-0">{word}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="py-2">
            <div className="flex gap-12">
              {[{ href: "/work", label: "View Experience" }, { href: "/request", label: "Start a Project" }].map(({ href, label }) => (
                <span key={href} className="overflow-hidden">
                  <span className="b3-word inline-block translate-y-[100%] opacity-0">
                    <ArrowLink href={href} className="text-[24px] font-semibold gap-6">{label}</ArrowLink>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
