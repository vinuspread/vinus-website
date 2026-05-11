"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroSectionV2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const metaRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 초기 상태 ──
      gsap.set(block1Ref.current, { opacity: 0, y: 40 });
      gsap.set([block2Ref.current, block3Ref.current], { opacity: 0, y: 60 });
      gsap.set(metaRef.current, { opacity: 0 });

      // ── 로드 애니메이션 ──
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(metaRef.current, { opacity: 1, duration: 0.7 }, 0.2)
        .to(block1Ref.current, { opacity: 1, y: 0, duration: 1.0 }, 0.4)
        .fromTo(
          block1Ref.current?.querySelectorAll(".hero-line") ?? [],
          { yPercent: 105 },
          { yPercent: 0, stagger: 0.1, duration: 1.0, ease: "power3.out" },
          0.4
        );

      // ── 스크롤 타임라인 ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // Block1 퇴장
      tl.to(block1Ref.current, { opacity: 0, y: -100, duration: 4, ease: "power2.inOut" }, "+=1")
        // Block2 등장
        .to(block2Ref.current, { opacity: 1, y: 0, duration: 4, ease: "power2.out" }, "-=2")
        .fromTo(
          block2Ref.current?.querySelectorAll(".hero-line") ?? [],
          { yPercent: 100, skewY: 2 },
          { yPercent: 0, skewY: 0, stagger: 0.2, duration: 4, ease: "power2.out" },
          "<"
        )
        // Block2 퇴장 + Block3 등장
        .to(block2Ref.current, { opacity: 0, y: -100, duration: 4, ease: "power2.inOut" }, "+=2")
        .to(block3Ref.current, { opacity: 1, y: 0, duration: 4, ease: "power2.out" }, "-=2")
        .fromTo(
          block3Ref.current?.querySelectorAll(".hero-line") ?? [],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.3, duration: 3, ease: "power2.out" },
          "<+1"
        );

      // 레이아웃 계산 강제 새로고침
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
    >
      {/* 메타 레이블 */}
      <div
        ref={metaRef}
        className="absolute top-0 inset-x-0 z-10 px-page-padding py-[48px] flex items-center justify-between pointer-events-none"
      >
        <span className="font-inter font-bold text-[11px] tracking-[0.18em] uppercase text-mine-shaft/40">
          Design Studio — Seoul
        </span>
        <span className="font-inter font-bold text-[11px] tracking-[0.18em] uppercase text-mine-shaft/40">
          Est. 2015
        </span>
      </div>

      {/* 인터랙션 스테이지 */}
      <div className="relative h-screen w-full px-page-padding flex items-center">

        {/* Block 1 — 인트로 단락 */}
        <div ref={block1Ref} className="absolute w-full max-w-[1800px] flex flex-col gap-14">
          <div
            className="font-inter leading-[1.1] tracking-[-0.04em] text-mine-shaft"
            style={{ fontSize: "clamp(34px, 4.2vw, 64px)" }}
          >
            {[
              { text: "Even in the intensity of a fast-changing world,", bold: false },
              { text: "we focus on the enduring value of what truly matters,", bold: false },
              { text: "striving to create beautiful designs that transcend", bold: true, target: "beautiful designs that transcend" },
              { text: "structural and physical boundaries.", bold: true, target: "structural and physical boundaries." },
            ].map(({ text, bold, target }, i) => (
              <div key={i} className="overflow-hidden py-2">
                <p className={`hero-line font-normal`}>
                  {bold && target ? (
                    <>
                      {text.replace(target, "")}
                      <span className="font-bold">{target}</span>
                    </>
                  ) : text}
                </p>
              </div>
            ))}
          </div>
          <p className="font-pretendard font-light text-[15px] leading-[1.8] text-mine-shaft/50 max-w-[680px] break-keep">
            빠르게 변화하는 세상의 격랑 속에서도 우리는 진정으로 중요한 것의 영속적인 가치에 집중하며,
            구조적·물리적 경계를 초월하는 아름다운 디자인을 만들기 위해 노력합니다.
          </p>
        </div>

        {/* Block 2 — 핵심 스테이트먼트 */}
        <div ref={block2Ref} className="absolute w-full pointer-events-none">
          <div
            className="font-inter uppercase leading-[1.0] tracking-[-0.05em] text-mine-shaft"
            style={{ fontSize: "clamp(64px, 10.5vw, 172px)" }}
          >
            {[
              { text: "We focus on", size: "clamp(64px, 10.5vw, 172px)" },
              { text: "the essential values of", size: "clamp(64px, 10.5vw, 172px)" },
              { text: "your brand.", size: "clamp(100px, 16vw, 280px)" },
            ].map(({ text, size }, i) => (
              <div key={i} className="overflow-hidden py-4">
                <p 
                  className={`hero-line font-normal`}
                  style={{ fontSize: size }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3 — 철학 + CTA */}
        <div ref={block3Ref} className="absolute w-full max-w-[1400px] flex flex-col gap-12 pointer-events-none">
          <div
            className="hero-line font-inter font-normal leading-[1.1] tracking-[-0.04em] text-mine-shaft"
            style={{ fontSize: "clamp(34px, 4.2vw, 64px)" }}
          >
            {[
              { text: "More than just creators,", bold: false },
              { text: "VINUSPREAD is a Product Management Group.", bold: true, target: "Product Management" },
            ].map(({ text, bold, target }, i) => (
              <div key={i} className="overflow-hidden py-2">
                <p className="font-normal">
                  {bold && target ? (
                    <>
                      {text.split(target)[0]}
                      <span className="font-bold">{target}</span>
                      {text.split(target)[1]}
                    </>
                  ) : text}
                </p>
              </div>
            ))}
          </div>
          <p className="hero-line font-pretendard font-light text-[16px] leading-[1.8] text-mine-shaft/55 max-w-[680px] break-keep">
            브랜드와 사용자 모두에게 의미 있는 경험을 만드는 것. 우리는 브랜드의 핵심 본질을 포착하고,
            최적의 방향을 설계하며, 진정으로 마음에 울리는 디지털 경험을 구현합니다.
          </p>
          <div className="hero-line pointer-events-auto">
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 font-inter font-medium text-[13px] tracking-[0.1em] uppercase
                border-b border-mine-shaft/30 pb-[5px] hover:border-mine-shaft transition-colors duration-300"
            >
              <span>Company Brief</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
