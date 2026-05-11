"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLink } from "@/components/common/ArrowLink";

gsap.registerPlugin(ScrollTrigger);

const B1_LINES = [
  { text: "Even in the intensity of a fast-changing world,",       bold: false },
  { text: "we focus on the enduring value of what truly matters,", bold: false },
  { text: "striving to create beautiful designs that transcend",    bold: true  },
  { text: "structural and physical boundaries.",                    bold: true  },
];

const B2_LINES = [
  { text: "We focus on",             size: "clamp(58px, 9vw, 152px)"  },
  { text: "the essential values of", size: "clamp(58px, 9vw, 152px)"  },
  { text: "your brand.",             size: "clamp(88px, 14vw, 248px)" },
];

/**
 * Refactored HeroSectionV2
 * - Strategy: Single vertical column for perfect synchronization.
 * - Logic: Animate the parent container (Inner Slider) for a cohesive flow.
 */
export const HeroSectionV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;
      const b1Lines = gsap.utils.toArray(".b1-line");
      const meta = metaRef.current;
      const counter = counterRef.current;

      // 1. Initial Load: B1 Lines Fade In
      gsap.set(b1Lines, { opacity: 0, y: 20 });
      gsap.set(meta, { opacity: 0 });

      const loadTl = gsap.timeline();
      loadTl.to(meta, { opacity: 1, duration: 1, ease: "power2.out" })
            .to(b1Lines, { 
              opacity: 1, 
              y: 0, 
              stagger: 0.1, 
              duration: 1, 
              ease: "sine.out" 
            }, "-=0.5");

      // 2. Scroll Timeline: Slider Moves Up
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", 
          pin: true,
          scrub: 2.2, // Heavy inertial feel
          invalidateOnRefresh: true,
        },
      });

      // Move to B2
      tl.to(slider, {
        yPercent: -100, // Moves B1 out, B2 in
        duration: 2,
        ease: "sine.inOut",
        onStart: () => { if (counter) counter.textContent = "( 02 — 03 )"; },
        onReverseComplete: () => { if (counter) counter.textContent = "( 01 — 03 )"; }
      });

      // Stay on B2 for a moment (Breathing room)
      tl.to({}, { duration: 0.5 });

      // Move to B3
      tl.to(slider, {
        yPercent: -200, // Moves B2 out, B3 in
        duration: 2,
        ease: "sine.inOut",
        onStart: () => { if (counter) counter.textContent = "( 03 — 03 )"; },
        onReverseComplete: () => { if (counter) counter.textContent = "( 02 — 03 )"; }
      });

      // Stay on B3
      tl.to({}, { duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      <section className="h-screen w-full flex flex-col items-center justify-center px-page-padding overflow-hidden">
        
        {/* Top Meta Bar */}
        <div
          ref={metaRef}
          style={{ opacity: 0 }}
          className="absolute top-[80px] inset-x-0 z-10 px-page-padding py-[20px] flex items-center justify-between pointer-events-none"
        >
          <span
            ref={counterRef}
            className="font-inter font-bold text-[11px] tracking-[0.2em] uppercase text-mine-shaft/40"
          >
            ( 01 — 03 )
          </span>
          <span className="font-inter font-bold text-[11px] tracking-[0.18em] uppercase text-mine-shaft/40">
            Design Studio — Seoul · Est. 2015
          </span>
        </div>

        {/* The Slider Container */}
        <div 
          ref={sliderRef}
          className="relative w-full h-full will-change-transform"
        >
          {/* Block 1 (B1) */}
          <div className="w-full h-full flex flex-col justify-center gap-10">
            <div className="font-inter leading-[1.1] tracking-[-0.04em] text-mine-shaft" style={{ fontSize: "clamp(28px, 3.6vw, 58px)" }}>
              {B1_LINES.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <p className={`b1-line ${line.bold ? "font-bold" : "font-normal"}`}>
                    {line.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="overflow-hidden">
              <p className="b1-line font-pretendard font-light text-[13px] leading-[2] text-mine-shaft/40 max-w-[560px] break-keep">
                빠르게 변화하는 세상의 격랑 속에서도 우리는 진정으로 중요한 것의 영속적인 가치에 집중하며,
                구조적·물리적 경계를 초월하는 아름다운 디자인을 만들기 위해 노력합니다.
              </p>
            </div>
          </div>

          {/* Block 2 (B2) */}
          <div className="w-full h-full flex flex-col justify-center">
            <div className="font-inter uppercase leading-[0.92] tracking-[-0.05em] text-mine-shaft">
              {B2_LINES.map((line, i) => (
                <div key={i} className="overflow-hidden py-1">
                  <p className="font-normal" style={{ fontSize: line.size }}>
                    {line.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 3 (B3) */}
          <div className="w-full h-full flex flex-col justify-center gap-10">
            <div className="font-inter leading-[1.1] tracking-[-0.04em] text-mine-shaft" style={{ fontSize: "clamp(28px, 3.6vw, 58px)" }}>
              <p className="font-normal">
                More than just creators, <br />
                VINUSPREAD is a <span className="font-bold">Product Management Group.</span>
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="font-pretendard font-light text-[14px] leading-[2] text-mine-shaft/45 max-w-[600px] break-keep">
                브랜드와 사용자 모두에게 의미 있는 경험을 만드는 것. 우리는 브랜드의 핵심 본질을 포착하고,
                최적의 방향을 설계하며, 진정으로 마음에 울리는 디지털 경험을 구현합니다.
              </p>
            </div>
            <div className="flex gap-8 pointer-events-auto">
              <ArrowLink href="/work">View Experience</ArrowLink>
              <ArrowLink href="/contact">Start a Project</ArrowLink>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};
