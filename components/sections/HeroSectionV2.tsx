"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, Observer } from "@/lib/gsap";
import { ArrowLink } from "@/components/common/ArrowLink";

const SECTIONS = [
  {
    lines: [
      { text: "We are a product studio",        bold: false },
      { text: "that plans, builds, and operates", bold: false },
      { text: "client products with AI.",         bold: true  },
    ],
    ko: "우리는 AI를 활용하여, 고객의 제품을 기획하고 만들고 운영하는 매니징 기업입니다.",
    fontSize: "clamp(58px,5.5vw,100px)",
  },
  {
    lines: [
      { text: "We take responsibility for",      bold: false },
      { text: "design, planning, development,",  bold: false },
      { text: "operation, and consulting.",       bold: true  },
    ],
    ko: "우리는 디자인과 기획, 개발과 운영 그리고 컨설팅을 책임집니다.",
    fontSize: "clamp(58px,5.5vw,100px)",
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
      panel.querySelectorAll<HTMLElement>(".h-line").forEach((line) => {
        gsap.set(line, { y: "110%" });
      });
    });

    const enterSection = (idx: number, delay = 0, onComplete?: () => void) => {
      const panel = panels[idx];
      const lines = panel.querySelectorAll<HTMLElement>(".h-line");
      gsap.set(panel, { visibility: "visible" });

      const tl = gsap.timeline({ onComplete });
      tl.to(panel, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
      tl.to(lines,  {
        y: "0%",
        stagger: 0.13,
        duration: 0.75, ease: "power3.out",
      }, delay > 0 ? delay : 0.05);
    };

    const exitSection = (idx: number, onComplete: () => void) => {
      const panel = panels[idx];
      const lines = panel.querySelectorAll<HTMLElement>(".h-line");
      const tl = gsap.timeline({ onComplete });
      tl.to(lines, { y: "-30%", opacity: 0, stagger: 0.05, duration: 0.3, ease: "power2.in" }, 0);
      tl.to(panel, { opacity: 0, duration: 0.35, ease: "power2.inOut" }, 0.1);
      tl.set(panel, { visibility: "hidden" });
      tl.set(lines, { y: "110%", opacity: 1 }); // 다음 등장을 위해 리셋
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
          className="hero-panel absolute inset-0 flex flex-col justify-center lg:justify-start pt-0 lg:pt-[25vh] px-page-padding gap-6 md:gap-8"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          {/* 영문 타이포 */}
          <div
            className="font-inter leading-[1.05] md:leading-[0.8] tracking-[-0.02em] md:tracking-[-0.04em] text-mine-shaft"
            style={{ fontSize: section.fontSize }}
          >
            {section.lines.map((line, j) => (
              <div key={j} className="overflow-hidden py-0.5 md:py-1">
                <span
                  className={`h-line inline-block ${line.bold ? "font-bold" : "font-normal"}`}
                  style={{ transform: "translateY(110%)" }}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </div>

          {/* 국문 */}
          <div className="overflow-hidden">
            <p
              className="h-line font-pretendard text-[14px] md:text-[16px] font-medium text-mine-shaft/40 leading-[1.6] max-w-[900px]"
              style={{ transform: "translateY(110%)" }}
            >
              {section.ko}
            </p>
          </div>

          {/* 섹션 1: 모바일 링크 */}
          {i === 0 && (
            <div className="lg:hidden overflow-hidden">
              <div className="h-line flex flex-col gap-6 items-start" style={{ transform: "translateY(110%)" }}>
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
