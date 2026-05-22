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

export const HeroSectionV2 = () => {
  const containerRef    = useRef<HTMLDivElement>(null);
  const sliderRef       = useRef<HTMLDivElement>(null);
  const metaRef         = useRef<HTMLDivElement>(null);
  const b3ContentRef    = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const video1Ref       = useRef<HTMLVideoElement>(null);
  const video2Ref       = useRef<HTMLVideoElement>(null);

  const [, setIndexState] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timeDisplayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !metaRef.current) return;
    gsap.set(metaRef.current, { opacity: 0, y: -14 });
    gsap.to(metaRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.4 });
  }, [mounted]);

  const currentIndex  = useRef(0);
  const isAnimating   = useRef(false);
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

    if (isMobile) {
      const lenis = window.__lenis;
      if (lenis) lenis.start();
      gsap.fromTo(".b1-word", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: { amount: 0.4, from: "random" }, duration: 0.8, delay: 0.4, ease: "power2.out" });
      const stickyParent = containerRef.current?.parentElement;
      if (stickyParent) gsap.set(stickyParent, { zIndex: 10 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".b1-word",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: { amount: 0.6, from: "random" }, duration: 1.0, delay: 0.6, ease: "power2.out" }
      );

      const registerExitTrigger = () => {
        if (exitTriggerRef.current) { exitTriggerRef.current.kill(); exitTriggerRef.current = null; }
        if (!b3ContentRef.current) return;
        gsap.set(b3ContentRef.current, { y: 0, opacity: 1 });
        if (metaRef.current) gsap.set(metaRef.current, { y: 0, opacity: 1 });
        const exitAnim = gsap.timeline({ paused: true });
        exitAnim.to(b3ContentRef.current, { y: -window.innerHeight, opacity: 1, ease: "none" }, 0);
        exitTriggerRef.current = ScrollTrigger.create({
          id: "hero-b3-exit",
          start: 0,
          end: window.innerHeight,
          scrub: 1,
          animation: exitAnim,
          onUpdate: (self) => {
            if (self.progress === 0) {
              gsap.set(b3ContentRef.current!, { y: 0, opacity: 1 });
              if (metaRef.current) gsap.set(metaRef.current, { y: 0, opacity: 1 });
            }
          },
        });
      };

      const killExitTrigger = () => {
        if (exitTriggerRef.current) { exitTriggerRef.current.kill(); exitTriggerRef.current = null; }
        if (b3ContentRef.current) gsap.set(b3ContentRef.current, { y: 0, opacity: 1 });
        if (metaRef.current) gsap.set(metaRef.current, { y: 0, opacity: 1 });
      };

      const animateTo = (newIndex: number) => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        const lenis = window.__lenis;
        if (lenis && newIndex < 2) lenis.stop();
        if (currentIndex.current === 2 && newIndex < 2) killExitTrigger();

        const oldIndex  = currentIndex.current;
        const isForward = newIndex > oldIndex;

        const onDone = () => {
          isAnimating.current = false;
          currentIndex.current = newIndex;
          setIndexState(newIndex);
          if (lenis && newIndex === 2) { lenis.start(); registerExitTrigger(); }
        };

        const stickyParent = containerRef.current?.parentElement;
        if (stickyParent) gsap.set(stickyParent, { zIndex: newIndex === 2 ? 10 : 30 });

        // ── We 전환 + 비디오 (전진 시만) ──────────────────────────────
        if (isForward && videoOverlayRef.current) {
          const weFromEl = document.querySelector(`[data-we="${oldIndex + 1}"]`) as HTMLElement | null;
          const weToEl   = document.querySelector(`[data-we="${newIndex + 1}"]`) as HTMLElement | null;

          if (weFromEl && weToEl) {
            const fromRect = weFromEl.getBoundingClientRect();
            const toRect   = weToEl.getBoundingClientRect();

            // 슬라이더 이동 후 target "We"의 실제 화면 좌표
            const targetX = toRect.left;
            const targetY = toRect.top - (newIndex - oldIndex) * window.innerHeight;

            // 플로팅 "We" 생성
            const computed  = window.getComputedStyle(weFromEl);
            const floatingWe = document.createElement("div");
            floatingWe.textContent = "We";
            floatingWe.setAttribute("data-floating-we", "true");
            Object.assign(floatingWe.style, {
              position:      "fixed",
              top:           "0",
              left:          "0",
              fontFamily:    computed.fontFamily,
              fontSize:      computed.fontSize,
              fontWeight:    computed.fontWeight,
              letterSpacing: computed.letterSpacing,
              color:         computed.color,
              lineHeight:    "1",
              zIndex:        "5001",
              pointerEvents: "none",
              whiteSpace:    "nowrap",
            });
            document.body.appendChild(floatingWe);
            gsap.set(floatingWe, {
              x: fromRect.left,
              y: fromRect.top,
              transformPerspective: 900,
              rotationY: 0,
              filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
            });

            gsap.set(weFromEl, { opacity: 0 });
            gsap.set(weToEl,   { opacity: 0 });

            // 화면 중앙 좌표 (We 크기 기준)
            const cx = window.innerWidth  / 2 - fromRect.width  / 2;
            const cy = window.innerHeight / 2 - fromRect.height / 2;

            // 비디오 준비
            const videoEl      = newIndex === 1 ? video1Ref.current : video2Ref.current;
            const otherVideoEl = newIndex === 1 ? video2Ref.current : video1Ref.current;
            if (videoEl) {
              videoEl.style.display = "block";
              if (otherVideoEl) otherVideoEl.style.display = "none";
              videoEl.currentTime = 0;
              videoEl.play().catch(() => {});
            }

            const tl = gsap.timeline({ onComplete: onDone });

            // 슬라이더 이동
            tl.to(sliderRef.current, { yPercent: -newIndex * 100, duration: 1.5, ease: "power4.inOut" }, 0);

            // We 외 단어 퇴장
            tl.to(`.b${oldIndex + 1}-word:not([data-we="${oldIndex + 1}"])`, { opacity: 0, y: -20, duration: 0.35 }, 0);
            tl.to(".b3-scroll-hint", { opacity: 0, duration: 0.2 }, 0);

            // We → 화면 중앙 (3D 회전 + 그림자 강조)
            tl.to(floatingWe, {
              x: cx, y: cy, scale: 1.15,
              rotationY: 14,
              filter: "drop-shadow(10px 22px 32px rgba(0,0,0,0.38))",
              duration: 0.5, ease: "power2.in",
            }, 0.08);

            // 비디오 열림
            tl.fromTo(
              videoOverlayRef.current,
              { clipPath: "circle(0% at 50% 50%)" },
              { clipPath: "circle(40% at 50% 50%)", duration: 0.38, ease: "power2.out" },
              0.18
            );

            // We → 착지 (3D 복귀 + 그림자 소멸)
            tl.to(floatingWe, {
              x: targetX, y: targetY, scale: 1,
              rotationY: 0,
              filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
              duration: 0.5, ease: "power2.out",
              onComplete: () => {
                gsap.set(weToEl, { opacity: 1 });
                if (document.body.contains(floatingWe)) document.body.removeChild(floatingWe);
              }
            }, 0.62);

            // 비디오 닫힘
            tl.to(videoOverlayRef.current, {
              clipPath: "circle(0% at 50% 50%)",
              duration: 0.38, ease: "power2.in",
              onComplete: () => { if (videoEl) videoEl.pause(); }
            }, 0.62);

            // 새 섹션 단어 등장 (We 제외)
            const staggerAmt = newIndex === 1 ? 0.4 : 0.6;
            const dur        = newIndex === 1 ? 0.9 : 1.0;
            tl.fromTo(
              `.b${newIndex + 1}-word:not([data-we="${newIndex + 1}"])`,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: dur, stagger: { amount: staggerAmt, from: "random" }, ease: "power2.out" },
              0.85
            );

            if (newIndex === 2) {
              gsap.fromTo(".b3-scroll-hint", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.0 });
            }

            return;
          }
        }

        // ── 일반 전환 (후진 or fallback) ──────────────────────────────
        const tl = gsap.timeline({ onComplete: onDone });
        tl.to(sliderRef.current, { yPercent: -newIndex * 100, duration: 1.5, ease: "power4.inOut" }, 0);
        tl.to(".b1-word, .b2-word, .b3-word", { opacity: 0, y: -20, duration: 0.4 }, 0);
        tl.to(".b3-scroll-hint", { opacity: 0, duration: 0.2 }, 0);

        const staggerAmt = newIndex === 1 ? 0.4 : 0.6;
        const dur        = newIndex === 1 ? 0.9 : 1.0;
        tl.fromTo(
          `.b${newIndex + 1}-word`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: dur, stagger: { amount: staggerAmt, from: "random" }, ease: "power2.out" },
          0.4
        );

        if (newIndex === 2) {
          gsap.fromTo(".b3-scroll-hint", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.0 });
        }
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
        tolerance: 5,
        preventDefault: false,
      });
    }, containerRef);

    return () => {
      exitTriggerRef.current?.kill();
      ctx.revert();
      document.querySelectorAll("[data-floating-we]").forEach(el => el.remove());
      const lenis = window.__lenis;
      if (lenis) lenis.start();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <span ref={timeDisplayRef} className="font-inter font-bold text-[20px] md:text-[28px] lg:text-[28px] tabular-nums tracking-[-0.02em] uppercase text-white mt-1">00:00:00</span>
        </div>,
        document.body
      )}

      {/* 비디오 오버레이 포탈 */}
      {mounted && createPortal(
        <div
          ref={videoOverlayRef}
          className="fixed inset-0 pointer-events-none z-[500]"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        >
          <video
            ref={video1Ref}
            src="/videos/videos_01.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
          />
          <video
            ref={video2Ref}
            src="/videos/videos_02.mp4"
            className="w-full h-full object-cover"
            style={{ display: "none" }}
            muted
            playsInline
            preload="auto"
          />
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
                    <span
                      className={`b1-word inline-block translate-y-[100%] opacity-0 ${line.bold ? "font-bold" : "font-normal"}`}
                      {...(i === 0 && j === 0 ? { "data-we": "1" } : {})}
                    >
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

        {/* Block 2 - 데스크톱 전용 */}
        <div className="hidden lg:flex w-full h-full flex-col justify-start pt-[25vh] px-page-padding">
          <div className="font-inter leading-[1.05] md:leading-[0.8] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(58px,5.5vw,100px)]">
            <div className="py-0.5 md:py-1">
              {"We take responsibility for".split(" ").map((word, j) => (
                <span key={j} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b2-word inline-block translate-y-[100%] opacity-0" {...(j === 0 ? { "data-we": "2" } : {})}>{word}</span>
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
                  <span className="b2-word inline-block font-bold translate-y-[100%] opacity-0 text-mine-shaft">{word}</span>
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

        {/* Block 3 - 데스크톱 전용 */}
        <div id="hero-b3-content" ref={b3ContentRef} className="hidden lg:flex w-full h-full flex-col justify-start pt-[25vh] px-page-padding gap-5 md:gap-6 will-change-transform">
          <div className="font-inter leading-[1.05] md:leading-[0.8] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft text-[clamp(60px,5.5vw,90px)]">
            <div className="py-0.5 md:py-1">
              {"We work with our clients to design".split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em]" style={{ overflow: "clip", paddingBottom: "0.2em" }}>
                  <span className="b3-word inline-block translate-y-[100%] opacity-0" {...(i === 0 ? { "data-we": "3" } : {})}>{word}</span>
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
