"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DoubleButton } from "@/components/common/DoubleButton";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroSectionV2: Exo Ape Style Editorial Interaction
 * Features: 7-Stage storytelling, long-vertical parallax, and seamless text reveals.
 */
export const HeroSectionV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── 1. Page Refresh Initialization ──
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // ── 2. Unified Scroll Timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000%", // Extended for smooth storytelling
          scrub: 1.5,
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      // [Initial State]
      gsap.set(bgRef.current, { yPercent: 0 });
      gsap.set(block1Ref.current, { opacity: 1, y: 0 });
      gsap.set([block2Ref.current, block3Ref.current], { opacity: 0, y: 80 });

      // [Sequence 1: Intro Fade & BG Start]
      tl.to(block1Ref.current, { y: -100, opacity: 0, duration: 4, ease: "none" }, "+=1.5")
        .to(bgRef.current, { yPercent: -25, duration: 8, ease: "none" }, "-=3")

      // [Sequence 2: Main Statement Reveal]
        .to(block2Ref.current, { opacity: 1, y: 0, duration: 4, ease: "none" }, "-=3")
        .fromTo(block2Ref.current.querySelectorAll(".reveal-line"), 
          { yPercent: 100 }, 
          { yPercent: 0, stagger: 0.15, duration: 3, ease: "none" }, "-=3")

      // [Sequence 3: Main Statement Exit & Deep Parallax]
        .to(block2Ref.current, { y: -100, opacity: 0, duration: 4, ease: "none" }, "+=0.5")
        .to(bgRef.current, { yPercent: -70, duration: 12, ease: "none" }, "-=4")

      // [Sequence 4: Final Detail Reveal]
        .to(block3Ref.current, { opacity: 1, y: 0, duration: 4, ease: "none" }, "-=3")
        .fromTo(block3Ref.current.querySelectorAll(".reveal-line"), 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, stagger: 0.2, duration: 3, ease: "none" }, "-=3")

      // [Sequence 5: Final Exit & Clean Background]
        .to(block3Ref.current, { opacity: 0, y: -100, duration: 4, ease: "none" }, "+=2")
        .to(bgRef.current, { yPercent: -85, duration: 5, ease: "none" }, "-=4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero-section" ref={sectionRef} className="relative overflow-hidden">
      
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div ref={bgRef} className="absolute top-0 left-0 w-full h-[350%] will-change-transform">
          <NextImage 
            src="/images/hero-bg.jpg" 
            alt="Hero Background" 
            fill 
            className="object-cover object-top" 
            priority 
          />
        </div>
        <div className="absolute inset-0 bg-black/45 z-[1]" />
      </div>

      {/* ── Interaction Stage ── */}
      <div className="relative z-10 h-screen w-full px-page-padding flex items-center justify-start text-white">
        
        {/* Stage 1: Intro */}
        <div ref={block1Ref} className="absolute w-full max-w-[1500px] flex flex-col items-start text-left">
          <div className="font-inter leading-[1.25] tracking-[-0.03em]" style={{ fontSize: "clamp(26px, 3.5vw, 46px)" }}>
            {["Even in the intensity of a fast-changing world,", 
              "we focus on the enduring value of what truly matters,", 
              "striving to create beautiful designs that transcend", 
              "structural and physical boundaries."].map((line, i) => (
              <div key={i} className="overflow-hidden py-1">
                <p className={`${i >= 2 ? 'font-bold' : 'font-light opacity-85'}`}>{line}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-white/40 font-light leading-[1.7] tracking-tight max-w-[900px] break-keep" style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}>
            <p>빠르게 변화하는 세상의 격랑 속에서도 우리는 진정으로 중요한 것의 영속적인 가치에 집중하며,</p>
            <p>구조적·물리적 경계를 초월하는 아름다운 디자인을 만들기 위해 노력합니다.</p>
          </div>
        </div>

        {/* Stage 2: Main Statement */}
        <div ref={block2Ref} className="absolute w-full max-w-[1600px] flex flex-col items-start text-left opacity-0 pointer-events-none">
          <div className="font-inter uppercase leading-[1.05] tracking-[-0.05em]" style={{ fontSize: "clamp(48px, 9vw, 140px)" }}>
            <div className="overflow-hidden"><p className="reveal-line font-light">We focus on</p></div>
            <div className="overflow-hidden"><p className="reveal-line font-bold">the essential</p></div>
            <div className="overflow-hidden"><p className="reveal-line font-light"><span className="font-bold">values</span> of your brand.</p></div>
          </div>
        </div>

        {/* Stage 3: Detailed Description & CTA */}
        <div ref={block3Ref} className="absolute w-full max-w-[1400px] flex flex-col items-start text-left opacity-0 pointer-events-none">
          <div className="font-light leading-[1.65] tracking-[-0.01em] max-w-[1000px] mb-16 text-white/60 break-keep" style={{ fontSize: "clamp(18px, 1.7vw, 23px)" }}>
            <p className="reveal-line">
              More than just creators, VINUSPREAD is a Product Management Group that bridges the gap between business objectives and user needs. 
              Rooted in our philosophy that &apos;it all begins with people,&apos; we capture the core essence that remains steadfast amidst shifting trends. 
              We define the optimal trajectory for your brand, craft digital experiences that truly resonate with the human heart.
            </p>
          </div>
          <div className="reveal-line pointer-events-auto">
            <DoubleButton 
              labelFront="Company Brief" 
              href="/about" 
              className="!bg-black !text-white px-20 py-6.5 text-[14.5px] tracking-[0.15em] border border-white/10 hover:!bg-white hover:!text-black transition-all duration-800" 
            />
          </div>
        </div>

      </div>

      {/* ── Global Header Presence ── */}
      <div className="absolute top-0 inset-x-0 z-[100] px-page-padding py-[60px] flex items-center justify-between text-white/30 font-inter font-bold tracking-[0.2em] text-[10px] uppercase pointer-events-none">
        <span>Design Studio — Seoul</span>
        <span>Est. 2015</span>
      </div>

    </section>
  );
};
