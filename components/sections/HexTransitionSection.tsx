"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const HEX_W = 200;
const HEX_H = Math.round(HEX_W * 47 / 41); // 229px — 로고 비율
const FINAL_HEX_WIDTH_EM = 0.75;
const FINAL_HEX_GAP_DESKTOP_EM = 0.12;
const FINAL_HEX_GAP_MOBILE_EM = 0.1;
const FINAL_HEX_TOP_OFFSET_EM = 0.35;
const TEXT_HIDDEN_CLEARANCE_EM = 0.4;

const getRotatedHexClipPath = (degrees: number) => {
  const radians = degrees * Math.PI / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const centerX = HEX_W / 2;
  const centerY = HEX_H / 2;
  const points = [
    [HEX_W * 0.5, 0],
    [HEX_W, HEX_H * 0.25],
    [HEX_W, HEX_H * 0.75],
    [HEX_W * 0.5, HEX_H],
    [0, HEX_H * 0.75],
    [0, HEX_H * 0.25],
  ].map(([x, y]) => {
    const centeredX = x - centerX;
    const centeredY = y - centerY;
    return [
      centerX + centeredX * cos - centeredY * sin,
      centerY + centeredX * sin + centeredY * cos,
    ];
  });
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const fitScale = Math.min(
    HEX_W / (maxX - minX),
    HEX_H / (maxY - minY)
  );
  const fittedPoints = points.map(([x, y]) => [
    centerX + (x - centerX) * fitScale,
    centerY + (y - centerY) * fitScale,
  ]);

  return `polygon(${fittedPoints.map(([x, y]) => `${(x / HEX_W * 100).toFixed(3)}% ${(y / HEX_H * 100).toFixed(3)}%`).join(", ")})`;
};

export const HexTransitionSection = () => {
  const sectionRef        = useRef<HTMLElement>(null);
  const hexRef            = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const designSpanRef     = useRef<HTMLDivElement>(null);
  const subtitleRef       = useRef<HTMLDivElement>(null);

  // 스크롤 기반 확장 및 반응형 리사이즈 처리
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hex     = hexRef.current;
    if (!section || !hex) return;

    let ctx: gsap.Context;

    // "WE DESIGN " 텍스트 중 "DESIGN"의 시작 위치를 측정해 서브텍스트의 left를 'd'에서 10px 우측에 정렬하는 함수 (em 단위 변환)
    const updateSubtitleIndent = () => {
      if (titleContainerRef.current && designSpanRef.current && subtitleRef.current) {
        const isDesktop = window.innerWidth >= 1024;
        if (isDesktop) {
          const titleEl = titleContainerRef.current;
          const titleRect = titleEl.getBoundingClientRect();
          const designRect = designSpanRef.current.getBoundingClientRect();
          const fontSize = parseFloat(window.getComputedStyle(titleEl).fontSize);
          const indentEm = (designRect.left - titleRect.left) / fontSize + 0.04; // 10px -> 0.04em 보정
          subtitleRef.current.style.paddingLeft = `${indentEm}em`;
        } else {
          subtitleRef.current.style.paddingLeft = "";
        }
      }
    };

    const initAnimation = () => {
      if (ctx) ctx.revert();

      // 원래의 큰 크기를 유지하도록 가로/세로 중 최대로 뷰포트 80%를 덮는 스케일 타겟 복원
      const scaleTarget = Math.max(
        (window.innerWidth  * 0.8) / HEX_W,
        (window.innerHeight * 0.8) / HEX_H
      );

      // scale-down 테크닉을 위한 실제 요소 크기 및 마진 조절 (크기가 커졌을 때의 해상도 깨짐 방지)
      const maxW = HEX_W * scaleTarget;
      const maxH = HEX_H * scaleTarget;
      hex.style.width = `${maxW}px`;
      hex.style.height = `${maxH}px`;
      hex.style.marginLeft = `${-maxW / 2}px`;
      hex.style.marginTop = `${-maxH / 2}px`;

      ctx = gsap.context(() => {
        const textBlock = section.querySelector(".brand-text-block") as HTMLElement;
        const overlay = hex.querySelector(".hex-overlay") as HTMLElement;
        const video = hex.querySelector("video");
        const clipState = { angle: 0 };

        const isDesktop = window.innerWidth >= 1024;
        const setHeroOwnHexVisibility = (visible: boolean) => {
          const heroOwnWrapper = document.querySelector<HTMLElement>(".h-hex-own");
          const heroSharedHex = document.querySelector<HTMLElement>(".hero-shared-hex");
          if (visible) {
            delete document.documentElement.dataset.heroVideoHexActive;
          } else {
            document.documentElement.dataset.heroVideoHexActive = "true";
          }
          if (heroOwnWrapper) {
            gsap.set(heroOwnWrapper, { visibility: visible ? "visible" : "hidden" });
          }
          if (heroSharedHex && !visible) {
            gsap.set(heroSharedHex, { autoAlpha: 0 });
          }
        };
        const setVideoHexVisibility = (visible: boolean) => {
          gsap.set(hex, { autoAlpha: visible ? 1 : 0 });
          if (visible) {
            video?.play().catch(() => undefined);
          }
        };
        const setTransitionVisibility = (active: boolean) => {
          setHeroOwnHexVisibility(!active);
          setVideoHexVisibility(active);
        };

        setTransitionVisibility(false);

        if (textBlock) {
          const desiredTop = isDesktop ? window.innerHeight * 0.3 + 89 : window.innerHeight * 0.3 + 190;
          const viewportSafeTop = window.innerHeight - textBlock.offsetHeight - 48;
          const textTop = isDesktop ? Math.max(48, Math.min(desiredTop, viewportSafeTop)) : desiredTop;
          textBlock.style.top = `${textTop}px`;
        }

        const getHero2ExitScroll = () => {
          const heroPanel = document.querySelectorAll<HTMLElement>(".hero-panel")[1];
          return heroPanel ? heroPanel.getBoundingClientRect().bottom + window.scrollY : section.getBoundingClientRect().top + window.scrollY + 1;
        };
        const getHero2ExitOffset = () => Math.max(
          1,
          getHero2ExitScroll() - (section.getBoundingClientRect().top + window.scrollY)
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${getHero2ExitOffset()} top`,
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => setTransitionVisibility(true),
            onEnterBack: () => setTransitionVisibility(true),
            onLeave: () => setTransitionVisibility(true),
            onLeaveBack: () => setTransitionVisibility(false),
            onUpdate: () => {
              setTransitionVisibility(window.scrollY >= getHero2ExitScroll());
            },
          },
        });

        const getTitleFontSize = () => {
          if (!titleContainerRef.current) return 0;
          return parseFloat(window.getComputedStyle(titleContainerRef.current).fontSize);
        };
        const getFinalHexWidth = () => getTitleFontSize() * FINAL_HEX_WIDTH_EM;
        const getFinalHexGap = () => {
          const gapEm = window.innerWidth >= 1024 ? FINAL_HEX_GAP_DESKTOP_EM : FINAL_HEX_GAP_MOBILE_EM;
          return getTitleFontSize() * gapEm;
        };
        const getCenterHexMetrics = () => {
          const heroOwnHex = document.querySelector<HTMLElement>('[data-hero-hex="own"]');
          const heroOwnVisual = heroOwnHex?.querySelector<SVGSVGElement>("svg") ?? heroOwnHex;
          const heroOwnWrapper = heroOwnHex?.closest<HTMLElement>(".h-hex-own");
          const heroPanel = heroOwnHex?.closest<HTMLElement>(".hero-panel");

          if (!heroOwnVisual) {
            return { x: 0, y: 0, scale: getFinalHexWidth() / maxW };
          }

          const previousPanelTransform = heroPanel?.style.transform;
          const previousWrapperTransform = heroOwnWrapper?.style.transform;

          if (heroPanel) heroPanel.style.transform = "none";
          if (heroOwnWrapper) heroOwnWrapper.style.transform = "translateY(0%)";

          const sourceRect = heroOwnVisual.getBoundingClientRect();

          if (heroPanel) heroPanel.style.transform = previousPanelTransform ?? "";
          if (heroOwnWrapper) heroOwnWrapper.style.transform = previousWrapperTransform ?? "";

          return {
            x: 0,
            y: 0,
            scale: sourceRect.width / maxW,
          };
        };
        const finalScale = getFinalHexWidth() / maxW;
        const stopDuration = 0;
        const growDuration = 1.1;
        const holdDuration = 0.35;
        const settleStart = stopDuration + growDuration + holdDuration;
        const settleDuration = 1.25;
        const textDuration = 1.45;
        const textStart = settleStart + settleDuration - textDuration;
        const getHiddenTextY = () => {
          if (!textBlock) return window.innerHeight;
          return window.innerHeight - textBlock.offsetTop + getTitleFontSize() * TEXT_HIDDEN_CLEARANCE_EM;
        };
        const setHexClipAngle = () => {
          const clipPath = getRotatedHexClipPath(clipState.angle);
          gsap.set(hex, { clipPath, WebkitClipPath: clipPath });
        };

        setHexClipAngle();

        tl.fromTo(
          hex,
          {
            x: () => getCenterHexMetrics().x,
            y: () => getCenterHexMetrics().y,
            scale: () => getCenterHexMetrics().scale,
          },
          {
            x: 0,
            y: 0,
            scale: () => getCenterHexMetrics().scale,
            force3D: true,
            ease: "power4.out",
            duration: stopDuration,
          },
          0
        );
        tl.to(clipState, { angle: 0, ease: "none", duration: stopDuration, onUpdate: setHexClipAngle }, 0);
        if (overlay) {
          tl.fromTo(overlay, { opacity: 1 }, { opacity: 1, ease: "none", duration: stopDuration }, 0);
        }

        tl.to(hex, { scale: 1, force3D: true, ease: "power2.out", duration: growDuration }, stopDuration);
        tl.to(clipState, { angle: 0, ease: "none", duration: growDuration, onUpdate: setHexClipAngle }, stopDuration);
        tl.to(hex, { y: 0, ease: "power3.inOut", duration: growDuration }, stopDuration);
        if (overlay) {
          tl.to(overlay, { opacity: 0, ease: "power2.inOut", duration: growDuration * 0.72 }, stopDuration + growDuration * 0.18);
        }

        tl.to(hex, { scale: 1, force3D: true, ease: "none", duration: holdDuration });
        tl.to(clipState, { angle: 0, ease: "none", duration: holdDuration, onUpdate: setHexClipAngle }, stopDuration + growDuration);
        tl.to(hex, { y: 0, ease: "none", duration: holdDuration }, stopDuration + growDuration);

        tl.to(hex, { scale: finalScale, force3D: true, ease: "power3.inOut", duration: settleDuration }, settleStart);
        tl.to(clipState, { angle: 0, ease: "power3.inOut", duration: settleDuration, onUpdate: setHexClipAngle }, settleStart);
        tl.to(hex, {
          y: () => {
            if (!textBlock || !titleContainerRef.current) return 0;

            const titleTopY =
              textBlock.offsetTop +
              titleContainerRef.current.offsetTop -
              getTitleFontSize() * FINAL_HEX_TOP_OFFSET_EM;

            return titleTopY - window.innerHeight / 2;
          },
          x: () => {
            const centerX = document.documentElement.clientWidth / 2;
            if (designSpanRef.current) {
              const designRect = designSpanRef.current.getBoundingClientRect();
              return designRect.right + getFinalHexGap() + getFinalHexWidth() / 2 - centerX;
            }
            return 0;
          },
          force3D: true,
          ease: "power3.inOut",
          duration: settleDuration
        }, settleStart);
        if (overlay) {
          tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, ease: "power2.inOut", duration: 0.55 }, settleStart + settleDuration * 0.58);
        }

        // 영문 카피 상승 애니메이션 (투명도 조절 없이 화면 하단에서 상승, 3단계와 동시 진행, xOffset은 0)
        if (textBlock) {
          tl.fromTo(
            textBlock,
            { y: getHiddenTextY, x: 0 },
            { y: 0, x: 0, ease: "power3.out", duration: textDuration },
            textStart
          );
        }
      }, section);

      // 서브카피 패딩 동적 적용
      updateSubtitleIndent();
    };

    let disposed = false;

    initAnimation();

    document.fonts?.ready.then(() => {
      if (!disposed) {
        ScrollTrigger.refresh();
      }
    });

    const handleResize = () => {
      initAnimation();
      // ScrollTrigger 갱신 강제
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const ro = new ResizeObserver(updateSubtitleIndent);
    if (designSpanRef.current) ro.observe(designSpanRef.current);

    return () => {
      disposed = true;
      delete document.documentElement.dataset.heroVideoHexActive;
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "350vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <div
          style={{
            width: HEX_W,
            height: HEX_H,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            flexShrink: 0,
          }}
        >
          <div
            ref={hexRef}
            style={{
              width: HEX_W,
              height: HEX_H,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              WebkitClipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              position: "absolute",
              left: "50%",
              top: "50%",
              marginLeft: -HEX_W / 2,
              marginTop: -HEX_H / 2,
              transform: "translateY(calc(50vh + 165px)) scale(1)",
              willChange: "transform",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                transform: "translate3d(0, 0, 0)",
              }}
            >
              <source src="/videos/hex-reel.mp4" type="video/mp4" />
            </video>
            {/* 축소 완료 시 검정색으로 변환하기 위한 오버레이 */}
            <div
              className="hex-overlay absolute inset-0 bg-mine-shaft pointer-events-none"
              style={{ opacity: 0 }}
            />
          </div>
        </div>

        {/* 영문 카피 블록 */}
        <div
          className="brand-text-block flex flex-col text-left px-page-padding pointer-events-none w-full text-mine-shaft"
          style={{
            position: "absolute",
            left: 0,
            top: "var(--hex-title-top, calc(30vh + 190px))",
            transform: "translateY(60vh)",
            willChange: "transform",
          }}
        >
          <div
            ref={titleContainerRef}
            className="hex-title-container font-inter font-semibold lg:font-medium leading-[0.85] lg:leading-none tracking-[-0.04em] text-mine-shaft flex flex-col w-fit"
            style={{ fontSize: "var(--hex-title-font-size, clamp(68px, 11vw, 240px))" }}
          >
            {/* 1행 (데스크톱: WE DESIGN, 모바일: WE 와 DESIGN이 개행됨) */}
            <div className="flex flex-col lg:flex-row lg:flex-nowrap">
              <div className="pb-[0.15em] mr-[0.22em]">
                <span className="hex-title-text inline-block">WE</span>
              </div>
              <div ref={designSpanRef} className="pb-[0.15em] mr-[0.22em] lg:mr-0">
                <span className="hex-title-text inline-block">DESIGN</span>
              </div>
            </div>
            {/* 2행 */}
            <div className="pb-[0.2em] lg:-mt-[0.20em]">
              <span className="hex-title-text inline-block">GROWTH.</span>
            </div>
          </div>
          <div ref={subtitleRef} className="mt-24 lg:mt-[3.75rem] text-mine-shaft break-keep">
            <div className="font-inter text-[clamp(24px,4vw,64px)] font-semibold leading-[1.4] tracking-[-0.02em] whitespace-normal lg:whitespace-pre-line">
              {`We design sustainable growth\ntogether with our clients.`}
            </div>
            <div className="mt-6 pb-[0.12em] font-pretendard text-[clamp(18px,2vw,30px)] font-normal leading-[1.75] tracking-[-0.01em] text-mine-shaft">
              우리는 고객과 함께 지속 가능한 성장을 설계합니다.
            </div>
          </div>
        </div>
      </div>

      {/* SVG ClipPath for smooth, anti-aliased hexagon edges */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          <clipPath id="hex-clip" clipPathUnits="objectBoundingBox">
            <polygon points="0.5 0, 1 0.25, 1 0.75, 0.5 1, 0 0.75, 0 0.25" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};
