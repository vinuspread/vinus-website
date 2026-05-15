"use client";

import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/common/ArrowLink";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutSection = () => {
  const ref = useReveal();
  const wrap1Ref = useRef<HTMLDivElement>(null);
  const wrap2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrap1Ref.current || !wrap2Ref.current) return;

    const ctx = gsap.context(() => {
      // 첫 번째 이미지 래퍼: 빠르게 위로
      gsap.fromTo(wrap1Ref.current,
        { y: 80 },
        {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
      // 두 번째 이미지 래퍼: 같은 방향, 느리게 (속도차로 시간차 효과)
      gsap.fromTo(wrap2Ref.current,
        { y: 30 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    return () => ctx.revert();
  }, [ref]);

  return (
    <section ref={ref as any} className="anim-wrap py-[80px] md:py-[120px] px-page-padding bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start" style={{ gridTemplateColumns: "1fr 1fr" }}>

        {/* Left Side: Two overlapping images */}
        <div className="flex flex-col mb-12 lg:mb-0">
          <div className="lg:sticky lg:top-[120px] relative w-full">
            {/* 첫 번째 이미지 */}
            <div className="overflow-hidden aspect-[4/5] lg:aspect-[2/3] w-[80%] bg-gallery">
              <div ref={wrap1Ref} className="w-full h-full will-change-transform scale-125">
                <img
                  src="/images/about_vertical.png"
                  alt="About Vinuspread"
                  className="w-full h-full object-cover"
                  data-pin-nopin="true"
                />
              </div>
            </div>
            {/* 두 번째 이미지: 우측 하단에 겹침 */}
            <div className="absolute bottom-[-8%] right-0 overflow-hidden aspect-[3/4] w-[58%] bg-gallery">
              <div ref={wrap2Ref} className="w-full h-full will-change-transform scale-110">
                <img
                  src="/images/about_vertical2.png"
                  alt="About Vinuspread 2"
                  className="w-full h-full object-cover object-[60%_center]"
                  data-pin-nopin="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
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
                    className="anim-move-up flex flex-row items-center justify-between w-full border-none py-[32px]
                      font-inter text-[20px] lg:text-[24px] font-medium tracking-[-0.02em] whitespace-nowrap"
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
