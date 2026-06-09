"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const AboutSection = () => {
  const revealRef = useReveal<HTMLElement>();
  const sectionRef = useRef<HTMLElement>(null);

  // desktop refs
  const clip1Ref   = useRef<HTMLDivElement>(null);
  const scale1Ref  = useRef<HTMLDivElement>(null);
  const clip2Ref   = useRef<HTMLDivElement>(null);
  const scale2Ref  = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // mobile refs
  const clip1MRef  = useRef<HTMLDivElement>(null);
  const scale1MRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isDesktop = () => window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      // ── 모바일: 기존 단순 reveal ──
      const revealSimple = (clip: HTMLDivElement | null, scale: HTMLDivElement | null) => {
        if (!clip || !scale) return;
        gsap.fromTo(clip,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "power4.out",
            scrollTrigger: { trigger: clip, start: "top 88%", toggleActions: "play none none none" } }
        );
        gsap.fromTo(scale, { scale: 1.2 }, { scale: 1, duration: 1.4, ease: "power4.out",
          scrollTrigger: { trigger: clip, start: "top 88%", toggleActions: "play none none none" } }
        );
      };
      revealSimple(clip1MRef.current, scale1MRef.current);

      if (!isDesktop()) return;

      // ── 데스크톱: 순차 pin 시퀀스 ──
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 초기 상태 세팅
      gsap.set(clip1Ref.current,  { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(scale1Ref.current, { scale: 1.2 });
      gsap.set(clip2Ref.current,  { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(scale2Ref.current, { scale: 1.2 });
      gsap.set(".about-text-item", { opacity: 0, y: 50 });

      // 1. 이미지 1 입장
      tl.to(clip1Ref.current,  { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, 0)
        .to(scale1Ref.current, { scale: 1, duration: 1.2 }, 0);

      // 2. 이미지 2 입장
      tl.to(clip2Ref.current,  { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, 1.0)
        .to(scale2Ref.current, { scale: 1, duration: 1.2 }, 1.0);

      // 3. 텍스트 순차 등장 (이미지2 절반 노출 후)
      tl.to(".about-text-item", { opacity: 1, y: 0, stagger: 0.18, duration: 0.9 }, 1.6);

      // 4. 잠시 멈춤
      tl.to({}, { duration: 0.4 });

      // 5. 이미지1 퇴장
      tl.to(clip1Ref.current, { clipPath: "inset(0% 0% 100% 0%)", y: "-40%", duration: 1.3, ease: "power3.in" });

      // 6. 이미지2 퇴장: 이미지1 시작 0.2 후 오버랩
      tl.to(clip2Ref.current, { clipPath: "inset(0% 0% 100% 0%)", y: "-40%", duration: 1.3, ease: "power3.in" }, "<0.2");

      // 7. 텍스트 입장 순서와 동일하게 퇴장: 제목 → 영문 → 한글 → 링크
      const textItems = gsap.utils.toArray<HTMLElement>(".about-text-item");
      tl.to(textItems, {
        opacity: 0,
        y: -40,
        stagger: 0.18,
        duration: 0.7,
        ease: "power3.in",
      });

      // 8. 마무리
      tl.to({}, { duration: 0.3 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=2000",
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        animation: tl,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        revealRef.current = el;
      }}
      className="anim-wrap section-pad bg-white overflow-visible z-[10] relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

        {/* Left: desktop */}
        <div ref={leftColRef} className="hidden lg:block relative self-start">
          {/* 이미지 1 */}
          <div ref={clip1Ref} className="overflow-hidden aspect-[4/5] w-[65%] bg-gallery" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
            <div ref={scale1Ref} className="relative w-full h-full" style={{ scale: "1.2" }}>
              <Image src="/about_vertical.png" alt="Vinuspread workspace facade" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" data-pin-nopin="true" />
            </div>
          </div>

          {/* 이미지 2 */}
          <div ref={clip2Ref} className="absolute bottom-[-50%] right-0 overflow-hidden aspect-[3/4] w-[58%] bg-white" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
            <div ref={scale2Ref} className="w-full h-full" style={{ scale: "1.2" }}>
              <div className="absolute inset-x-0 will-change-transform" style={{ height: "190%", top: "-45%" }}>
                <Image src="/about_img.png" alt="Vinuspread architectural project facade" fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" data-pin-nopin="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Left: mobile */}
        <div className="lg:hidden">
          <div ref={clip1MRef} className="overflow-hidden aspect-[4/5] w-full bg-gallery" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
            <div ref={scale1MRef} className="relative w-full h-full" style={{ scale: "1.2" }}>
              <Image src="/about_vertical.png" alt="Vinuspread workspace facade" fill sizes="(max-width: 1023px) 100vw, 1px" className="object-cover" data-pin-nopin="true" />
            </div>
          </div>
        </div>

        {/* Right: 텍스트 */}
        <div ref={rightColRef} className="flex flex-col gap-12">
          <h2 className="about-text-item display-heading text-mine-shaft">
            Always there.
            <br />
            From the first idea to the last detail.
          </h2>
          <p className="about-text-item body-text break-keep">
            Vinuspread is a product management group that partners with clients from the very first idea through
            to completion and beyond. We don&apos;t just deliver outcomes. We help define the direction. Working with AI
            as our methodology, we bring a faster, more experimental approach to every project backed by over 20
            years of experience in UI/UX, branding, and product design.
          </p>
          <p className="about-text-item body-text-ko mt-4">
            바이너스프레드는 프로젝트의 기획부터 완성까지, 전 과정을 함께하는 프로덕트 매니지먼트 그룹입니다.
            단순히 결과물을 만드는 것을 넘어, 브랜드가 나아갈 방향을 함께 설계합니다. AI를 방법론으로 삼아 더 빠르고
            실험적인 방식으로 일하며, 20여 년의 경험 위에서 클라이언트의 제품이 더 나은 방향으로 성장할 수 있도록 돕습니다.
          </p>
          <div className="about-text-item mt-12">
            <div className="flex flex-col items-start gap-[1em]">
              {[
                { label: "Explore our Services", href: "/services" },
                { label: "See our Work", href: "/work" },
              ].map(({ label, href }) => (
                <ArrowLink
                  key={href}
                  href={href}
                  className="text-[20px] md:text-[24px] font-semibold gap-4 md:gap-6"
                  hoverUnderline
                >
                  {label}
                </ArrowLink>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
