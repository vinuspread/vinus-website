"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export const AboutSection = () => {
  const ref = useReveal();
  // 이미지1: clip → scale → parallax (레이어 분리)
  const clip1Ref  = useRef<HTMLDivElement>(null);
  const scale1Ref = useRef<HTMLDivElement>(null);
  const para1Ref  = useRef<HTMLDivElement>(null);
  // 이미지2
  const clip2Ref  = useRef<HTMLDivElement>(null);
  const scale2Ref = useRef<HTMLDivElement>(null);
  const para2Ref  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reveal = (
        clip: HTMLDivElement,
        scale: HTMLDivElement,
        delay = 0,
      ) => {
        gsap.fromTo(clip,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.4, delay,
            ease: "power4.out",
            scrollTrigger: { trigger: clip, start: "top 88%", toggleActions: "play none none none" },
          }
        );
        gsap.fromTo(scale,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.4, delay,
            ease: "power4.out",
            scrollTrigger: { trigger: clip, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      };

      if (clip1Ref.current && scale1Ref.current) reveal(clip1Ref.current, scale1Ref.current, 0);
      if (clip2Ref.current && scale2Ref.current) reveal(clip2Ref.current, scale2Ref.current, 0.25);

      // 스크롤 패럴랙스 (별도 레이어)
      if (para1Ref.current) {
        gsap.fromTo(para1Ref.current, { y: 60 }, {
          y: -60, ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
      if (para2Ref.current) {
        gsap.fromTo(para2Ref.current, { y: -40 }, {
          y: 40, ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    });

    return () => ctx.revert();
  }, [ref]);

  return (
    <section ref={ref as any} className="anim-wrap section-pad bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left: 두 이미지 겹침 */}
        <div className="flex flex-col mb-12 lg:mb-[280px]">
          <div className="lg:sticky lg:top-[120px] relative w-full">

            {/* 이미지 1 — clip → scale → parallax */}
            <div ref={clip1Ref} className="overflow-hidden aspect-[4/5] lg:aspect-[2/3] w-[65%] bg-gallery" style={{ clipPath: "inset(100% 0 0 0)" }}>
              <div ref={scale1Ref} className="w-full h-full" style={{ scale: "1.2" }}>
                <div ref={para1Ref} className="w-full h-full will-change-transform">
                  <img src="/images/about_vertical.png" alt="About Vinuspread" className="w-full h-full object-cover" data-pin-nopin="true" />
                </div>
              </div>
            </div>

            {/* 이미지 2 — clip → scale → parallax */}
            <div ref={clip2Ref} className="absolute bottom-[-200px] right-0 overflow-hidden aspect-[3/4] w-[58%] bg-gallery" style={{ clipPath: "inset(100% 0 0 0)" }}>
              <div ref={scale2Ref} className="w-full h-full" style={{ scale: "1.2" }}>
                <div ref={para2Ref} className="w-full h-full will-change-transform">
                  <img src="/images/about_vertical2.png" alt="About Vinuspread 2" className="w-full h-full object-cover object-[60%_center]" data-pin-nopin="true" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right: 텍스트 */}
        <div className="flex flex-col gap-12">
          <h2 className="anim-move-up display-heading text-mine-shaft">
            Focusing on the enduring value of what truly matters.
          </h2>
          <p className="anim-move-up body-text break-keep" data-delay="150">
            VINUSPREAD partners with visionary leaders to capture the essential essence at the core of their brand.
            By transforming strategic insights into beautiful design systems and digital ecosystems, we help
            organizations transcend physical and structural boundaries. Our work translates bold vision into
            scalable impact, creating experiences that resonate deeply and carry forward into the world.
          </p>
          <p className="anim-move-up body-text-ko mt-4" data-delay="200">
            바이너스프레드는 브랜드의 본질적 가치를 포착하고, 전략적 인사이트를 아름다운 디자인 시스템과 디지털 생태계로 전환합니다.
            우리는 조직이 물리적·구조적 한계를 넘어설 수 있도록 돕고,
            깊은 울림을 남기는 경험으로 브랜드의 비전을 세상에 확장시킵니다.
          </p>
          <div className="mt-12">
            <div className="flex flex-col border-t border-mine-shaft/10">
              {[
                { label: "Explore our services", href: "/services" },
                { label: "See our work", href: "/work" },
                { label: "Discover our story", href: "/story" },
              ].map(({ label, href }, i) => (
                <div key={href} className="border-b border-mine-shaft/10 group">
                  <ArrowLink
                    href={href}
                    className="anim-move-up flex flex-row items-center justify-between w-full border-none py-[32px] font-inter text-[20px] lg:text-[24px] font-medium tracking-[-0.02em] whitespace-nowrap"
                    data-delay={200 + i * 80}
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
