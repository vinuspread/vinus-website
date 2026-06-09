"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowLink } from "@/components/common/ArrowLink";

const SECTIONS = [
  {
    mainCopy: ["THE PRODUCT", "PRACTICE."],
    subCopy: "We plan and develop products with AI,\nstrengthening competitiveness through continuous improvement.",
    ko: "바이너스는 AI를 활용하여, 고객의 제품을 기획하고 개발하고 운영합니다.",
    lines: [] as { text: string; bold: boolean }[],
    fontSize: "clamp(68px, 11vw, 240px)",
  },
  {
    mainCopy: ["WE OWN", "EVERY STAGE."],
    subCopy: "We cover every stage of bringing products to life,\nand support stable operations long after launch.",
    ko: "제품화를 위한 모든 단계를 아우르며 출시 이후 안정적인 운영을 지원합니다.",
    lines: [] as { text: string; bold: boolean }[],
    fontSize: "clamp(68px, 11vw, 240px)",
  },
];

const HERO_2_CENTER_DETACH_PROGRESS = 0.1;

export const HeroSectionV2 = () => {
  const containerRef   = useRef<HTMLDivElement>(null);
  const metaRef        = useRef<HTMLDivElement>(null);
  const timeDisplayRef = useRef<HTMLSpanElement>(null);
  const sharedHexRef   = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

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

    const panels = Array.from(
      container.querySelectorAll<HTMLElement>(".hero-panel")
    );
    const sharedHex = sharedHexRef.current;

    const ctx = gsap.context(() => {
      panels.forEach((panel, idx) => {
        const words = panel.querySelectorAll<HTMLElement>(".h-word");
        const hexThe = panel.querySelectorAll<HTMLElement>(".h-hex-the");
        const hexPractice = panel.querySelectorAll<HTMLElement>(".h-hex-practice");
        const hexOwn = panel.querySelectorAll<HTMLElement>(".h-hex-own");
        const sub = panel.querySelectorAll<HTMLElement>(".h-sub");
        const ko = panel.querySelectorAll<HTMLElement>(".h-ko");
        const scrollHint = panel.querySelector<HTMLElement>(".scroll-hint");
        const movingEls = panel.querySelectorAll<HTMLElement>(".h-line, .h-word, .h-hex-the, .h-hex-practice, .h-hex-own, .h-sub, .h-ko");

        gsap.set(panel, { opacity: 1, visibility: "visible" });
        if (idx > 0) {
          gsap.set(panel, { yPercent: 4 });
        }
        gsap.set(movingEls, { y: "200%", opacity: 1 });

        ScrollTrigger.create({
          trigger: panel,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const fadeIn = idx === 0 ? 1 : Math.min(1, progress / 0.35);
            const fadeOut = Math.min(1, (1 - progress) / 0.35);
            const enterY = idx === 0 ? 0 : 4 * (1 - fadeIn);
            const exitY = -4 * (1 - fadeOut);
            gsap.set(panel, { yPercent: enterY + exitY });
          },
        });

        const start = idx === 0 ? 0.35 : 0.05;
        const dur = 1.2;
        const lastWordStart = start + Math.max(words.length - 1, 0) * 0.15;
        const subStart = lastWordStart + dur * 0.75;
        const koStart = subStart + dur * 0.9 * 0.5;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: idx === 0 ? "top 80%" : "top 62%",
            once: true,
          },
        });

        if (words.length) tl.to(words, { y: "0%", stagger: 0.15, duration: dur, ease: "power3.out" }, start);
        if (hexThe.length) tl.to(hexThe, { y: "0%", duration: dur, ease: "power3.out" }, start + 0.2);
        if (hexPractice.length) tl.to(hexPractice, { y: "0%", duration: dur, ease: "power3.out" }, lastWordStart + 0.25);
        if (hexOwn.length) tl.to(hexOwn, { y: "0%", duration: dur, ease: "power3.out" }, start + 0.3);
        if (sub.length) tl.to(sub, { y: "0%", duration: dur * 0.9, ease: "power3.out" }, subStart);
        if (ko.length) tl.to(ko, { y: "0%", duration: dur * 0.8, ease: "power3.out" }, koStart);

        if (scrollHint) {
          gsap.to(scrollHint, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "bottom center",
              scrub: true,
            },
          });
        }
      });

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sourceHex = container.querySelector<HTMLElement>('[data-hero-hex="practice"]');
      const targetHex = container.querySelector<HTMLElement>('[data-hero-hex="own"]');
      const staticHexes = container.querySelectorAll<HTMLElement>(".h-hex-practice, .h-hex-own");
      const fillHex = sharedHex?.querySelector<SVGPolygonElement>(".hero-shared-hex-fill");

      if (!reducedMotion && panels[1] && sharedHex && sourceHex && targetHex && fillHex) {
        const clamp = gsap.utils.clamp(0, 1);
        let frozenBoxes: {
          from: { left: number; top: number; width: number; height: number };
          to: { left: number; top: number; width: number; height: number };
        } | null = null;
        let centerBoxes: {
          from: { left: number; top: number; width: number; height: number };
          to: { left: number; top: number; width: number; height: number };
        } | null = null;
        const smooth = (value: number) => {
          const t = clamp(value);
          return t * t * t * (t * (t * 6 - 15) + 10);
        };
        const setStaticVisibility = (visible: boolean) => {
          gsap.set(staticHexes, { visibility: visible ? "visible" : "hidden" });
          if (visible && document.documentElement.dataset.heroVideoHexActive === "true") {
            gsap.set(container.querySelectorAll<HTMLElement>(".h-hex-own"), { visibility: "hidden" });
          }
        };
        const measureMotion = () => {
          const sourceWrapper = sourceHex.closest<HTMLElement>(".h-hex-practice");
          const targetWrapper = targetHex.closest<HTMLElement>(".h-hex-own");
          const previousSourcePanelTransform = panels[0]?.style.transform;
          const previousTargetPanelTransform = panels[1]?.style.transform;
          const previousSourceTransform = sourceWrapper?.style.transform;
          const previousTargetTransform = targetWrapper?.style.transform;

          if (panels[0]) panels[0].style.transform = "none";
          if (panels[1]) panels[1].style.transform = "none";
          if (sourceWrapper) sourceWrapper.style.transform = "translateY(0%)";
          if (targetWrapper) targetWrapper.style.transform = "translateY(0%)";

          const sourceVisual = sourceHex.querySelector<SVGSVGElement>("svg") ?? sourceHex;
          const targetVisual = targetHex.querySelector<SVGSVGElement>("svg") ?? targetHex;
          const sourceRect = sourceVisual.getBoundingClientRect();
          const targetRect = targetVisual.getBoundingClientRect();
          const sourcePanelRect = panels[0].getBoundingClientRect();
          const sourceDocumentTop = sourceRect.top + window.scrollY;
          const targetDocumentTop = targetRect.top + window.scrollY;
          const targetDocumentCenter = targetDocumentTop + targetRect.height / 2;
          const startScroll = sourcePanelRect.top + window.scrollY + window.innerHeight * 0.3 - 1;
          const endScroll = Math.max(startScroll + 1, targetDocumentCenter - window.innerHeight * 0.653);
          const boxes = {
            from: {
              left: sourceRect.left,
              top: sourceDocumentTop - startScroll,
              width: sourceRect.width,
              height: sourceRect.height,
            },
            to: {
              left: targetRect.left,
              top: targetDocumentTop - endScroll + window.innerHeight * 0.016,
              width: targetRect.width,
              height: targetRect.height,
            },
          };

          if (panels[0]) panels[0].style.transform = previousSourcePanelTransform ?? "";
          if (panels[1]) panels[1].style.transform = previousTargetPanelTransform ?? "";
          if (sourceWrapper) sourceWrapper.style.transform = previousSourceTransform ?? "";
          if (targetWrapper) targetWrapper.style.transform = previousTargetTransform ?? "";

          return { boxes, startScroll, endScroll };
        };
        const measureCenterMotion = () => {
          const targetWrapper = targetHex.closest<HTMLElement>(".h-hex-own");
          const previousTargetPanelTransform = panels[1]?.style.transform;
          const previousTargetTransform = targetWrapper?.style.transform;

          if (panels[1]) panels[1].style.transform = "none";
          if (targetWrapper) targetWrapper.style.transform = "translateY(0%)";

          const targetVisual = targetHex.querySelector<SVGSVGElement>("svg") ?? targetHex;
          const targetRect = targetVisual.getBoundingClientRect();
          const targetDocumentTop = targetRect.top + window.scrollY;
          const panel2Rect = panels[1].getBoundingClientRect();
          const startScroll = panel2Rect.top + window.scrollY + window.innerHeight * HERO_2_CENTER_DETACH_PROGRESS - 1;
          const endScroll = Math.max(startScroll + 1, panel2Rect.top + window.scrollY + panels[1].offsetHeight);
          const boxes = {
            from: {
              left: targetRect.left,
              top: targetDocumentTop - startScroll + window.innerHeight * 0.016,
              width: targetRect.width,
              height: targetRect.height,
            },
            to: {
              left: document.documentElement.clientWidth / 2 - targetRect.width / 2,
              top: window.innerHeight / 2 - targetRect.height / 2,
              width: targetRect.width,
              height: targetRect.height,
            },
          };

          if (panels[1]) panels[1].style.transform = previousTargetPanelTransform ?? "";
          if (targetWrapper) targetWrapper.style.transform = previousTargetTransform ?? "";

          return { boxes, startScroll, endScroll };
        };
        const renderSharedHex = (progress: number) => {
          const travel = smooth(progress);
          const scaleProgress = Math.sin(travel * Math.PI);
          const scale = 1 + scaleProgress;
          const active = progress > 0.001 && progress < 0.999;

          if (!active) {
            gsap.set(sharedHex, { autoAlpha: 0 });
            setStaticVisibility(true);
            if (progress <= 0.001) {
              frozenBoxes = null;
            }
            return;
          }

          frozenBoxes ??= measureMotion().boxes;
          const { from, to } = frozenBoxes;
          setStaticVisibility(false);
          gsap.set(sharedHex, {
            autoAlpha: 1,
            x: from.left + (to.left - from.left) * travel,
            y: from.top + (to.top - from.top) * travel,
            width: from.width + (to.width - from.width) * travel,
            height: from.height + (to.height - from.height) * travel,
            scale,
            transformOrigin: "50% 50%",
          });
          gsap.set(fillHex, { autoAlpha: 1 });
        };

        ScrollTrigger.create({
          trigger: container,
          start: () => measureMotion().startScroll,
          end: () => measureMotion().endScroll,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            frozenBoxes = null;
            renderSharedHex(self.progress);
          },
          onUpdate: (self) => renderSharedHex(self.progress),
        });

        const renderCenterHex = (progress: number) => {
          if (document.documentElement.dataset.heroVideoHexActive === "true") {
            gsap.set(sharedHex, { autoAlpha: 0 });
            return;
          }

          const travel = smooth(progress);
          const active = progress > 0.001 && progress < 0.999;

          if (!active) {
            gsap.set(sharedHex, { autoAlpha: 0 });
            setStaticVisibility(true);
            if (progress <= 0.001) {
              centerBoxes = null;
            }
            return;
          }

          centerBoxes ??= measureCenterMotion().boxes;
          const { from, to } = centerBoxes;
          setStaticVisibility(false);
          gsap.set(sharedHex, {
            autoAlpha: 1,
            x: from.left + (to.left - from.left) * travel,
            y: from.top + (to.top - from.top) * travel,
            width: from.width,
            height: from.height,
            scale: 1,
            transformOrigin: "50% 50%",
          });
          gsap.set(fillHex, { autoAlpha: 1 });
        };

        ScrollTrigger.create({
          trigger: container,
          start: () => measureCenterMotion().startScroll,
          end: () => measureCenterMotion().endScroll,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            centerBoxes = null;
            renderCenterHex(self.progress);
          },
          onUpdate: (self) => renderCenterHex(self.progress),
        });
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="hero-section"
      ref={containerRef}
      className="relative w-full bg-white z-10"
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
      <div
        ref={sharedHexRef}
        className="hero-shared-hex pointer-events-none fixed left-0 top-0 z-[25] hidden lg:block text-mine-shaft"
        style={{ opacity: 0, visibility: "hidden", width: 0, height: 0 }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 41 47"
          className="w-full h-full overflow-visible"
          style={{ transformOrigin: "50% 50%" }}
        >
          <polygon
            className="hero-shared-hex-fill animate-[spin_8s_linear_infinite]"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            points="20.5 0, 41 11.75, 41 35.25, 20.5 47, 0 35.25, 0 11.75"
            fill="currentColor"
          />
        </svg>
      </div>

      {SECTIONS.map((section, i) => (
        <div
          key={i}
          className="hero-panel relative min-h-screen flex flex-col justify-center px-page-padding gap-4 lg:gap-8"
          style={{ opacity: 0, visibility: "hidden" }}
        >

          {/* 영문 타이포 */}
          {section.mainCopy ? (
            <>
              {(() => {
                const line1 = section.mainCopy[0] || "";
                const line2 = section.mainCopy[1] || "";
                const words1 = line1.split(" ");
                const words2 = line2.split(" ");
                return (
                  <div className="flex flex-col gap-0">
                    {/* 1행 */}
                    <div
                      className="font-inter font-semibold lg:font-medium leading-[0.85] lg:leading-none tracking-[-0.04em] text-mine-shaft flex flex-wrap"
                      style={{ fontSize: section.fontSize }}
                    >
                      {words1.map((word, k) => (
                        <div key={k} className="pb-[0.15em] mr-[0.22em] overflow-hidden whitespace-nowrap" style={{ clipPath: "inset(0 -200px -25% -200px)" }}>
                          <span className="h-word inline-block" style={{ transform: "translateY(200%)" }}>
                            {word}
                          </span>
                          {word === "OWN" && section.mainCopy[0] === "WE OWN" && (
                            <span
                              className="h-hex-own hidden lg:inline-flex items-center justify-center overflow-visible fill-current ml-[0.034em]"
                              style={{
                                width: "1.30em",
                                height: "0.86em",
                                transform: "translateY(200%)",
                                verticalAlign: "middle"
                              }}
                            >
                              <span
                                className="inline-block"
                                data-hero-hex="own"
                                style={{ width: "0.75em", height: "0.86em", transform: "translateY(-0.14em)" }}
                              >
                                <svg
                                  viewBox="0 0 41 47"
                                  className="w-full h-full overflow-visible fill-current"
                                  style={{ transformOrigin: "50% 50%" }}
                                >
                                  <polygon
                                    className="animate-[spin_8s_linear_infinite]"
                                    style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
                                    points="20.5 0, 41 11.75, 41 35.25, 20.5 47, 0 35.25, 0 11.75"
                                  />
                                </svg>
                              </span>
                            </span>
                          )}
                          {word === "THE" && section.mainCopy[1] === "PRACTICE." && (
                            <span
                              className="h-hex-the inline-flex lg:hidden items-center justify-center overflow-visible fill-current ml-[0.224em]"
                              style={{
                                width: "1.30em",
                                height: "0.86em",
                                transform: "translateY(200%)",
                                verticalAlign: "middle"
                              }}
                            >
                              <span
                                className="inline-block"
                                style={{ width: "0.75em", height: "0.86em" }}
                              >
                                  <svg
                                    viewBox="0 0 41 47"
                                    className="w-full h-full overflow-visible fill-current"
                                    style={{
                                      transform: "translateY(-0.07em)",
                                      transformOrigin: "50% 50%"
                                    }}
                                  >
                                  <polygon
                                    className="animate-[spin_8s_linear_infinite]"
                                    style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
                                    points="20.5 0, 41 11.75, 41 35.25, 20.5 47, 0 35.25, 0 11.75"
                                  />
                              </svg>
                              </span>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* 2행 & 서브카피 */}
                    <div className="flex mt-0 lg:-mt-[0.33em] flex-wrap lg:flex-nowrap">
                      <div className="flex flex-col gap-10 lg:gap-[0.03em] w-full lg:w-auto">
                        <div
                          className="font-inter font-semibold lg:font-medium leading-[0.85] lg:leading-none tracking-[-0.04em] text-mine-shaft flex flex-wrap"
                          style={{ fontSize: section.fontSize }}
                        >
                          {words2.map((word, k) => (
                            <div key={k} className="pb-[0.2em] mr-[0.22em] overflow-hidden whitespace-nowrap" style={{ clipPath: "inset(0 -200px -25% -200px)" }}>
                              <span
                                className="h-word font-inter font-semibold lg:font-medium leading-[0.85] lg:leading-none tracking-[-0.04em] text-mine-shaft inline-block"
                                style={{ transform: "translateY(200%)" }}
                              >
                                {word}
                              </span>
                              {word === "PRACTICE." && (
                                <span
                                  className="h-hex-practice hidden lg:inline-flex items-center justify-center overflow-visible fill-current ml-[-0.006em]"
                                  style={{
                                    width: "1.30em",
                                    height: "0.86em",
                                    transform: "translateY(200%)",
                                    verticalAlign: "middle"
                                  }}
                                >
                                  <span
                                    className="inline-block"
                                    data-hero-hex="practice"
                                    style={{ width: "0.75em", height: "0.86em" }}
                                  >
                                  <svg
                                    viewBox="0 0 41 47"
                                    className="w-full h-full overflow-visible fill-current"
                                    style={{
                                      transform: "translateY(-0.13em)",
                                      transformOrigin: "50% 50%"
                                    }}
                                  >
                                    <polygon
                                      className="animate-[spin_8s_linear_infinite]"
                                      style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
                                      points="20.5 0, 41 11.75, 41 35.25, 20.5 47, 0 35.25, 0 11.75"
                                    />
                                  </svg>
                                  </span>
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="overflow-hidden lg:-mt-[0.1em]">
                          <p
                            className="h-sub font-inter font-medium text-[22px] lg:text-[32px] leading-[1.5] tracking-[-0.03em] text-mine-shaft text-left whitespace-normal lg:whitespace-pre-line"
                            style={{ transform: "translateY(200%)" }}
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
          ) : null}

          {/* 한글카피 */}
          <div className="overflow-hidden mt-10">
            <p
              className="h-ko font-pretendard text-[18px] md:text-[24px] font-medium text-mine-shaft leading-[1.6] max-w-[900px]"
              style={{ transform: "translateY(200%)" }}
            >
              {section.ko}
            </p>
          </div>

          {i === 0 && (
            <>
              <div className="lg:hidden absolute bottom-[96px] left-0 right-0 px-page-padding overflow-hidden">
                <div className="h-sub flex flex-col gap-4 items-start" style={{ transform: "translateY(200%)" }}>
                  <ArrowLink href="/work"    className="text-[22px] font-semibold gap-4" hoverUnderline>View Experience</ArrowLink>
                  <ArrowLink href="/contact" className="text-[22px] font-semibold gap-4" hoverUnderline>Start a Project</ArrowLink>
                </div>
              </div>
              <div className="scroll-hint absolute bottom-10 left-page-padding hidden lg:flex items-center gap-3">
                <span className="w-6 h-[1px] bg-mine-shaft/40 block" />
                <span className="font-inter text-[12px] uppercase tracking-widest text-mine-shaft/40">Scroll to explore</span>
              </div>
            </>
          )}

          {i === 1 && (
            <div className="absolute bottom-[100px] left-page-padding hidden lg:block overflow-hidden">
              <div className="h-sub flex flex-row gap-12 items-start" style={{ transform: "translateY(200%)" }}>
                <ArrowLink href="/work"    className="text-[20px] md:text-[24px] font-semibold gap-4 md:gap-6" hoverUnderline>View Experience</ArrowLink>
                <ArrowLink href="/contact" className="text-[20px] md:text-[24px] font-semibold gap-4 md:gap-6" hoverUnderline>Start a Project</ArrowLink>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
