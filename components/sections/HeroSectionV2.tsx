"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, Observer } from "@/lib/gsap";
import { ArrowLink } from "@/components/common/ArrowLink";

const SECTIONS = [
  {
    mainCopy: "The product practice.",
    subCopy: "Using AI, we plan and develop our clients' products, strengthening their competitiveness and operating them toward continuous improvement.",
    ko: "바이너스는 AI를 활용하여, 고객의 제품을 기획하고 개발하고 운영합니다.",
    lines: [] as { text: string; bold: boolean }[],
    fontSize: "clamp(72px,11vw,240px)",
  },
  {
    lines: [
      { text: "We take responsibility for",      bold: false },
      { text: "design, planning, development,",  bold: false },
      { text: "operation, and consulting.",       bold: true  },
    ],
    ko: "우리는 디자인과 기획, 개발과 운영 그리고 컨설팅을 책임집니다.",
    fontSize: "clamp(58px,13vw,240px)",
  },
  {
    lines: [
      { text: "We work with our clients to design",    bold: false },
      { text: "sustainable growth on clear structure.", bold: false },
      { text: "We are VINUSPREAD.",                     bold: true  },
    ],
    ko: "우리는 고객과 함께, 명확한 구조 위에서 지속 가능한 성장을 설계합니다.",
    fontSize: "clamp(60px,5.5vw,90px)",
  },
];

export const HeroSectionV2 = () => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const metaRef        = useRef<HTMLDivElement>(null);
  const timeDisplayRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const currentIndex = useRef(0);
  const isAnimating  = useRef(false);

  useEffect(() => setMounted(true), []);

  // 시계
  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      if (!timeDisplayRef.current) return;
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
      timeDisplayRef.current.textContent =
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // meta 입장
  useEffect(() => {
    if (!mounted || !metaRef.current) return;
    gsap.set(metaRef.current, { opacity: 0, y: -14 });
    gsap.to(metaRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.4 });
  }, [mounted]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile    = window.matchMedia("(max-width: 1024px)").matches;
    const lenis       = window.__lenis;
    const stickyParent = container.parentElement;

    const panels = Array.from(
      container.querySelectorAll<HTMLElement>(".hero-panel")
    );

    // 초기 상태: 전체 숨김
    panels.forEach((panel) => {
      gsap.set(panel, { opacity: 0, visibility: "hidden" });
      panel.querySelectorAll<HTMLElement>(".h-line, .h-word, .h-sub, .h-ko").forEach((el) => {
        gsap.set(el, { y: "110%" });
      });
    });

    const enterSection = (idx: number, delay = 0, onComplete?: () => void) => {
      const panel = panels[idx];
      gsap.set(panel, { visibility: "visible" });

      const tl = gsap.timeline({ onComplete });
      tl.to(panel, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);

      const start = delay > 0 ? delay : 0.05;

      if (idx === 0) {
        // B1: THE → PRODUCT → PRACTICE. (same stagger) → sub-copy → Korean copy
        const words = panel.querySelectorAll<HTMLElement>(".h-word");
        const sub   = panel.querySelectorAll<HTMLElement>(".h-sub");
        const ko    = panel.querySelectorAll<HTMLElement>(".h-ko");

        const dur = 1.2;
        const lastWordStart = start + (words.length - 1) * 0.15;
        const subStart = lastWordStart + dur * 0.75;
        const koStart  = subStart + dur * 0.9 * 0.50;

        tl.to(words, { y: "0%", stagger: 0.15, duration: dur, ease: "power3.out" }, start);
        tl.to(sub,   { y: "0%", duration: dur * 0.9, ease: "power3.out" }, subStart);
        tl.to(ko,    { y: "0%", duration: dur * 0.8, ease: "power3.out" }, koStart);
      } else {
        const lines = panel.querySelectorAll<HTMLElement>(".h-line");
        tl.to(lines, { y: "0%", stagger: 0.15, duration: 1.2, ease: "power3.out" }, start);
      }
    };

    const exitSection = (idx: number, onComplete: () => void) => {
      const panel = panels[idx];
      const allEls = panel.querySelectorAll<HTMLElement>(".h-line, .h-word, .h-sub, .h-ko");
      const tl = gsap.timeline({ onComplete });
      tl.to(allEls, { y: "-30%", opacity: 0, stagger: 0.05, duration: 0.3, ease: "power2.in" }, 0);
      tl.to(panel, { opacity: 0, duration: 0.35, ease: "power2.inOut" }, 0.1);
      tl.set(panel, { visibility: "hidden" });
      tl.set(allEls, { y: "110%", opacity: 1 });
    };

    const animateTo = (newIdx: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const oldIdx = currentIndex.current;
      currentIndex.current = newIdx;

      // B3 → 이전: lenis 다시 멈춤
      if (oldIdx === 2 && newIdx < 2) {
        if (lenis) lenis.stop();
        if (stickyParent) gsap.set(stickyParent, { zIndex: 30 });
      }

      exitSection(oldIdx, () => {
        enterSection(newIdx, 0, () => {
          isAnimating.current = false;
          if (newIdx === 2) {
            if (lenis) lenis.start();
            if (stickyParent) gsap.set(stickyParent, { zIndex: 10 });
          }
        });
      });
    };

    // B1 초기 입장
    enterSection(0, 0.5);

    if (isMobile) return;

    // 데스크톱: lenis 멈추고 Observer 등록
    if (lenis) lenis.stop();
    if (stickyParent) gsap.set(stickyParent, { zIndex: 30 });

    const obs = Observer.create({
      target: window,
      type: "wheel,touch",
      onDown: () => {
        if (currentIndex.current < 2) animateTo(currentIndex.current + 1);
      },
      onUp: () => {
        if (currentIndex.current > 0 && window.scrollY < 5) {
          animateTo(currentIndex.current - 1);
        }
      },
      tolerance: 10,
      preventDefault: false,
    });

    return () => {
      obs.kill();
      if (lenis) lenis.start();
    };
  }, []);

  return (
    <div
      id="hero-section"
      ref={containerRef}
      className="relative w-full h-screen bg-white z-10 overflow-hidden"
    >
      {/* 시계 포탈 */}
      {mounted && createPortal(
        <div
          ref={metaRef}
          className="fixed top-[70px] md:top-[80px] right-page-padding z-[9999] flex flex-col items-end pointer-events-none mix-blend-difference"
        >
          <span className="font-inter font-bold text-[12px] tracking-normal uppercase text-white/50">Seoul, Korea</span>
          <span ref={timeDisplayRef} className="font-inter font-bold text-[20px] md:text-[28px] tabular-nums tracking-[-0.02em] uppercase text-white mt-1">00:00:00</span>
        </div>,
        document.body
      )}

      {/* 섹션 패널 */}
      {SECTIONS.map((section, i) => (
        <div
          key={i}
          className="hero-panel absolute inset-0 flex flex-col justify-start pt-[300px] lg:pt-[25vh] px-page-padding gap-6 md:gap-8"
          style={{ opacity: 0, visibility: "hidden" }}
        >

          {/* 영문 타이포 */}
          {i === 0 && "mainCopy" in section ? (
            <>
              {/* 메인카피: 왼쪽(The product) + 오른쪽(practice. + 서브카피) */}
              {(() => {
                const words = (section.mainCopy ?? "").split(" ");
                const leftWords = words.slice(0, -1);
                const rightWord = words[words.length - 1];
                return (
                  <div className="flex flex-col gap-0">
                    {/* 1행: THE PRODUCT */}
                    <div
                      className="font-inter font-extrabold lg:font-medium leading-none tracking-[-0.04em] text-mine-shaft flex flex-wrap uppercase"
                      style={{ fontSize: section.fontSize }}
                    >
                      {leftWords.map((word, k) => (
                        <div key={k} className="pb-[0.15em] mr-[0.22em]" style={{ clipPath: "inset(0 -200px 0 -200px)" }}>
                          <span className="h-word inline-block" style={{ transform: "translateY(110%)" }}>
                            {word}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* 2행: PRACTICE. & 서브카피 */}
                    <div className="flex mt-0 lg:-mt-[40px]">
                      <div className="flex flex-col gap-[40px]">
                        <div className="pb-[0.2em]" style={{ clipPath: "inset(0 -200px 0 -200px)" }}>
                          <span
                            className="h-word font-inter font-extrabold lg:font-medium leading-none tracking-[-0.04em] text-mine-shaft inline-block uppercase"
                            style={{ fontSize: section.fontSize, transform: "translateY(110%)" }}
                          >
                            {rightWord}
                          </span>
                        </div>
                        <div className="overflow-hidden">
                          <p
                            className="h-sub font-inter font-normal text-[22px] lg:text-[32px] leading-[1.5] tracking-[-0.01em] text-mine-shaft text-left max-w-[42em]"
                            style={{ transform: "translateY(110%)" }}
                          >
                            {section.subCopy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          ) : (
            <div
              className="font-inter leading-[1.1] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft"
              style={{ fontSize: section.fontSize }}
            >
              {section.lines.map((line, j) => (
                <div key={j} className="flex flex-wrap">
                  {line.text.split(" ").map((word, k) => (
                    <div key={k} className="pb-[0.2em] mr-[0.22em]" style={{ clipPath: "inset(0 -200px 0 -200px)" }}>
                      <span
                        className={`h-line inline-block ${line.bold ? "font-medium" : "font-normal"}`}
                        style={{ transform: "translateY(110%)" }}
                      >
                        {word}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* 한글카피 */}
          <div className="overflow-hidden">
            <p
              className={`${i === 0 ? "h-ko" : "h-line"} font-pretendard text-[16px] md:text-[22px] font-medium text-mine-shaft/40 leading-[1.6] max-w-[900px]`}
              style={{ transform: "translateY(110%)" }}
            >
              {section.ko}
            </p>
          </div>

          {/* 섹션 1: 모바일 링크 */}
          {i === 0 && (
            <div className="lg:hidden overflow-hidden mt-auto pb-10">
              <div className="h-sub flex flex-col gap-6 items-start" style={{ transform: "translateY(110%)" }}>
                <ArrowLink href="/work"    className="text-[20px] font-semibold gap-4">View Experience</ArrowLink>
                <ArrowLink href="/contact" className="text-[20px] font-semibold gap-4">Start a Project</ArrowLink>
              </div>
            </div>
          )}

          {/* 섹션 3: 링크 + 스크롤 힌트 */}
          {i === 2 && (
            <>
              <div className="hidden lg:block overflow-hidden">
                <div className="h-line flex flex-col sm:flex-row gap-6 sm:gap-12 items-start" style={{ transform: "translateY(110%)" }}>
                  <ArrowLink href="/work"    className="text-[20px] md:text-[24px] font-semibold gap-4 md:gap-6">View Experience</ArrowLink>
                  <ArrowLink href="/contact" className="text-[20px] md:text-[24px] font-semibold gap-4 md:gap-6">Start a Project</ArrowLink>
                </div>
              </div>
              <div className="absolute bottom-10 left-page-padding hidden lg:flex items-center gap-3">
                <span className="w-6 h-[1px] bg-mine-shaft/40 block" />
                <span className="font-inter text-[12px] uppercase tracking-widest text-mine-shaft/40">Scroll to explore</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
