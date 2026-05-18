"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const AboutSection = () => {
  const ref = useReveal();
  const sectionRef = useRef<HTMLElement>(null);

  // desktop refs
  const clip1Ref  = useRef<HTMLDivElement>(null);
  const scale1Ref = useRef<HTMLDivElement>(null);
  const clip2Ref  = useRef<HTMLDivElement>(null);
  const scale2Ref = useRef<HTMLDivElement>(null);

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
      gsap.set(clip1Ref.current,  { clipPath: "inset(100% 0 0 0)" });
      gsap.set(scale1Ref.current, { scale: 1.2 });
      gsap.set(clip2Ref.current,  { clipPath: "inset(100% 0 0 0)" });
      gsap.set(scale2Ref.current, { scale: 1.2 });
      gsap.set(".about-text-item", { opacity: 0, y: 50 });

      // 1. 이미지 1 리빌
      tl.to(clip1Ref.current,  { clipPath: "inset(0% 0 0 0)", duration: 1.2 }, 0)
        .to(scale1Ref.current, { scale: 1, duration: 1.2 }, 0);

      // 2. 텍스트 순차 등장
      tl.to(".about-text-item", { opacity: 1, y: 0, stagger: 0.18, duration: 0.9 }, 0.6);

      // 3. 이미지 2 리빌
      tl.to(clip2Ref.current,  { clipPath: "inset(0% 0 0 0)", duration: 1.2 }, 1.0)
        .to(scale2Ref.current, { scale: 1, duration: 1.2 }, 1.0);

      // 4. 잠시 멈춤 (빈 구간)
      tl.to({}, { duration: 0.6 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=2800",
        scrub: 1.0,
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
        (sectionRef as any).current = el;
        (ref as any).current = el;
      }}
      className="anim-wrap section-pad bg-white overflow-visible z-[10] relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

        {/* Left: desktop */}
        <div className="hidden lg:block relative">
          {/* 이미지 1 */}
          <div ref={clip1Ref} className="overflow-hidden aspect-[4/5] w-[65%] bg-gallery" style={{ clipPath: "inset(100% 0 0 0)" }}>
            <div ref={scale1Ref} className="w-full h-full" style={{ scale: "1.2" }}>
              <img src="/images/about_vertical.png" alt="About Vinuspread" className="w-full h-full object-cover" data-pin-nopin="true" />
            </div>
          </div>

          {/* 이미지 2 */}
          <div ref={clip2Ref} className="absolute bottom-[-120px] right-0 overflow-hidden aspect-[3/4] w-[58%] bg-white" style={{ clipPath: "inset(100% 0 0 0)" }}>
            <div ref={scale2Ref} className="w-full h-full" style={{ scale: "1.2" }}>
              <div className="absolute inset-x-0 will-change-transform" style={{ height: "190%", top: "-45%" }}>
                <img src="/images/about_vertical_glass.png" alt="About Vinuspread 2" className="w-full h-full object-cover" data-pin-nopin="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Left: mobile */}
        <div className="lg:hidden">
          <div ref={clip1MRef} className="overflow-hidden aspect-[4/5] w-full bg-gallery" style={{ clipPath: "inset(100% 0 0 0)" }}>
            <div ref={scale1MRef} className="w-full h-full" style={{ scale: "1.2" }}>
              <img src="/images/about_vertical.png" alt="About Vinuspread" className="w-full h-full object-cover" data-pin-nopin="true" />
            </div>
          </div>
        </div>

        {/* Right: 텍스트 */}
        <div className="flex flex-col gap-12">
          <h2 className="about-text-item display-heading text-mine-shaft">
            Focusing on the enduring value of what truly matters.
          </h2>
          <p className="about-text-item body-text break-keep">
            VINUSPREAD partners with visionary leaders to capture the essential essence at the core of their brand.
            By transforming strategic insights into beautiful design systems and digital ecosystems, we help
            organizations transcend physical and structural boundaries. Our work translates bold vision into
            scalable impact, creating experiences that resonate deeply and carry forward into the world.
          </p>
          <p className="about-text-item body-text-ko mt-4">
            바이너스프레드는 브랜드의 본질적 가치를 포착하고, 전략적 인사이트를 아름다운 디자인 시스템과 디지털 생태계로 전환합니다.
            우리는 조직이 물리적·구조적 한계를 넘어설 수 있도록 돕고,
            깊은 울림을 남기는 경험으로 브랜드의 비전을 세상에 확장시킵니다.
          </p>
          <div className="about-text-item mt-12">
            <div className="flex flex-col border-t border-mine-shaft/10">
              {[
                { label: "Explore our services", href: "/services" },
                { label: "See our work", href: "/work" },
                { label: "Discover our story", href: "/story" },
              ].map(({ label, href }) => (
                <div key={href} className="border-b border-mine-shaft/10 group">
                  <ArrowLink
                    href={href}
                    className="flex flex-row items-center justify-between w-full border-none py-[32px] font-inter text-[20px] lg:text-[24px] font-medium tracking-[-0.02em] whitespace-nowrap"
                  >
                    {label}
                  </ArrowLink>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
