"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSectionV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  
  const stage1TitleRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 1. 진입 애니메이션 (Entry Animation) ──
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(bgRef.current, {
        scale: 1.08,
        duration: 2.2,
        ease: "power3.out",
      })
      .from(topRowRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.8,
        ease: "power2.out",
      }, "-=1.6")
      .from(stage1TitleRefs.current, {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
      }, "-=1.2")
      .from(stage1Ref.current?.querySelectorAll(".subcopy"), {
        opacity: 0,
        y: 10,
        duration: 0.8,
      }, "-=0.6");

      // ── 2. 배경 패럴랙스 (Background Parallax) ──
      gsap.to(bgRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ── 3. 텍스트 스테이지 전환 (Fixed Position - No Out Animation) ──
      
      // Stage 1 - No Out
      gsap.set(stage1Ref.current, { opacity: 1, y: 0 });

      // Stage 2 In (No Out)
      gsap.fromTo(stage2Ref.current, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "35% top",
            end: "60% top",
            scrub: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[150vh] bg-[#0a0a0a] overflow-hidden">
      {/* Background & Overlay: Extra tall for parallax safety */}
      <div 
        ref={bgRef} 
        className="absolute inset-x-0 top-0 w-full h-[150%] will-change-transform z-0"
      >
        <NextImage
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
      </div>
      <div ref={overlayRef} className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Sticky Viewport for Text Content */}
      <div ref={stickyRef} className="sticky top-0 h-screen will-change-transform z-10">
        
        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col px-page-padding pt-[120px] pb-[60px] text-white">
          
          {/* Top Label */}
          <div ref={topRowRef} className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-inter font-bold">
              Design Studio — Seoul
            </span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-inter font-bold">
              Est. 2015
            </span>
          </div>

          {/* Text Stage 1 (New Long Text, Duplicated) */}
          <div ref={stage1Ref} className="absolute inset-0 flex flex-col pt-[450px] px-page-padding pointer-events-none">
            <div className="max-w-[1400px] flex flex-col gap-[300px]">
              {/* Block 1 */}
              <div>
                <div className="font-inter leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(24px, 3.2vw, 42px)" }}>
                  <p ref={el => { stage1TitleRefs.current[0] = el; }} className="font-normal overflow-hidden break-keep">
                    Even in the intensity of a fast-changing world,
                  </p>
                  <p ref={el => { stage1TitleRefs.current[1] = el; }} className="font-normal overflow-hidden break-keep">
                    we focus on the enduring value of what truly matters,
                  </p>
                  <p ref={el => { stage1TitleRefs.current[2] = el; }} className="font-bold overflow-hidden break-keep">
                    striving to create beautiful designs that transcend
                  </p>
                  <p ref={el => { stage1TitleRefs.current[3] = el; }} className="font-bold overflow-hidden break-keep">
                    structural and physical boundaries.
                  </p>
                </div>
              </div>

              {/* Block 2 (Original Text Kept) */}
              <div>
                <div className="font-inter uppercase leading-[0.88] tracking-[-0.04em]" style={{ fontSize: "clamp(60px, 12vw, 180px)" }}>
                  <p className="font-normal">We focus on</p>
                  <p className="font-bold">the essential</p>
                  <p className="font-normal"><span className="font-bold">values</span> of your brand.</p>
                </div>
                <p className="mt-[24px] text-white/70 font-light leading-[1.5] tracking-[-0.3px] break-keep text-[16px] max-w-[800px]">
                  바이너스프레드는 고객사와 함께 성장하며 지속 가능한 가치를 창출하는 디지털 파트너입니다.
                </p>
              </div>
            </div>
          </div>

          {/* Text Stage 2 */}
          <div ref={stage2Ref} className="absolute inset-0 flex flex-col pt-[450px] px-page-padding pointer-events-none opacity-0">
            <div className="max-w-[1200px]">
              <div className="font-inter uppercase leading-[0.88] tracking-[-0.04em]" style={{ fontSize: "clamp(48px, 9.5vw, 148px)" }}>
                <p className="font-normal">Digital</p>
                <p className="font-bold">Innovation</p>
                <p className="font-normal">for your Future.</p>
              </div>
              <p className="mt-[32px] text-white/70 font-light leading-[1.5] tracking-[-0.3px] break-keep text-[20px] max-w-[600px]">
                우리는 브랜드의 내일이 될 수 있는 창의적인 솔루션을 제안합니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
