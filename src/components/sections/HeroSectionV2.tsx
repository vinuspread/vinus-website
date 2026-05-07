"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG_IMAGE = "/images/hero-bg.jpg";

export const HeroSectionV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLParagraphElement>(null);
  const line4Ref = useRef<HTMLParagraphElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 진입 애니메이션 ──
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(bgRef.current, {
        scale: 1.08,
        duration: 2.2,
        ease: "power3.out",
      })
      .from(overlayRef.current, {
        opacity: 0,
        duration: 1.4,
      }, "<")
      .from(topRowRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.8,
        ease: "power2.out",
      }, "-=1.6")
      .from(
        [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current],
        {
          yPercent: 115,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=1.2"
      )
      .from(subcopyRef.current, {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
      .from(ctaRef.current, {
        y: 14,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      }, "-=0.5");

      // ── 스크롤: 이미지 위로 올라가며 세로 이미지 전체 reveal ──
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

      // ── 스크롤: 텍스트 살짝 위로 페이드 ──
      gsap.to(textBlockRef.current, {
        yPercent: -12,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "25% top",
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // 250vh — 스크롤 여유 공간
    <section ref={sectionRef} className="relative h-[250vh]">

      {/* sticky 내부 — 항상 뷰포트를 채움 */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between px-page-padding pt-[120px] pb-0"
      >
        {/* 배경 이미지 — 세로형이므로 h-[150vh]로 명시 */}
        <div
          ref={bgRef}
          className="absolute inset-x-0 top-0 h-[150vh] z-0 will-change-transform"
        >
          <Image
            src={BG_IMAGE}
            alt=""
            fill
            className="object-cover object-top"
            priority
          />
          <div ref={overlayRef} className="absolute inset-0 bg-black/55" />
        </div>

        {/* 상단 레이블 */}
        <div ref={topRowRef} className="relative z-10 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-inter">
            Design Studio — Seoul
          </span>
          <span className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-inter">
            Est. 2015
          </span>
        </div>

        {/* 메인 타이포그래피 */}
        <div ref={textBlockRef} className="relative z-10 -mt-[4vh] will-change-transform">
          <div className="block overflow-hidden">
            <p
              ref={line1Ref}
              className="font-inter font-normal uppercase leading-[0.88] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(48px, 9.5vw, 148px)" }}
            >
              We focus on
            </p>
          </div>
          <div className="block overflow-hidden">
            <p
              ref={line2Ref}
              className="font-inter font-bold uppercase leading-[0.88] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(48px, 9.5vw, 148px)" }}
            >
              the essential
            </p>
          </div>
          <div className="block overflow-hidden">
            <p
              ref={line3Ref}
              className="font-inter uppercase leading-[0.88] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(48px, 9.5vw, 148px)" }}
            >
              <span className="font-bold">values</span>
              <span className="font-normal"> of your</span>
            </p>
          </div>
          <div className="block overflow-hidden">
            <p
              ref={line4Ref}
              className="font-inter font-normal uppercase leading-[0.88] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(48px, 9.5vw, 148px)" }}
            >
              brand.
            </p>
          </div>

          <p
            ref={subcopyRef}
            className="mt-[32px] text-white/70 font-light leading-[1.5] tracking-[-0.3px] break-keep"
            style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}
          >
            리서치와 전략을 바탕으로{" "}
            <span className="font-bold text-white">브랜드와 사용자를 잇는 디지털 경험</span>을 설계합니다.
          </p>

          <div ref={ctaRef} className="mt-[28px]">
            <Link href="/work" className="inline-flex items-center gap-3 group">
              <span className="text-[13px] uppercase tracking-[0.15em] font-inter border-b border-white/40 pb-[2px] text-white/70 group-hover:text-white group-hover:border-white transition-all duration-300">
                Scroll down
              </span>
              <span className="text-[16px] text-white/50 group-hover:translate-y-1 transition-transform duration-300">
                ↓
              </span>
            </Link>
          </div>
        </div>

        <div className="pb-[40px]" />
      </div>
    </section>
  );
};
