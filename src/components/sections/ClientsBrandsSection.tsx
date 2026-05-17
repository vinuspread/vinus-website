"use client";

import React, { useRef, useLayoutEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import { ListRow } from "@/components/common/ListRow";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const clientLogos = Array.from({ length: 28 }, (_, i) => ({
  name: `client-${String(i + 1).padStart(2, "0")}`,
  src: `/images/logos/logo${String(i + 1).padStart(2, "0")}.svg`,
}));

const brands = [
  { name: "DongA Onbook",        services: "Branding - Digital Design - Web Development" },
  { name: "Samyang",             services: "Digital Design - Web Development" },
  { name: "Lotte Cinema",        services: "UX/UI Design - App Development" },
  { name: "Samsung Electronics", services: "Digital Design - Creative Direction" },
  { name: "Seoul Paik Hospital", services: "Digital Design - Web Development" },
  { name: "Realty 114",          services: "Strategy - UX/UI Design - App Development" },
  { name: "Macadamia",           services: "Strategy - UX/UI Design" },
  { name: "Smart City Jungnang", services: "Strategy - Digital Design" },
  { name: "CJ CheilJedang",      services: "Digital Design - Creative Direction" },
  { name: "Hankook Tire",        services: "Digital Design - Web Development" },
  { name: "Nexon",               services: "Brand Identity - Digital Design" },
  { name: "LG Electronics",      services: "Digital Design - UX/UI" },
];

export const ClientsBrandsSection = () => {
  const sectionRef = useReveal() as React.RefObject<HTMLElement>;
  const clipImg1Ref  = useRef<HTMLDivElement>(null);
  const clipImg2Ref  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 초기 상태
      gsap.set(".brands-item", { opacity: 0, y: 50 });
      gsap.set(".brands-logo-grid", { opacity: 0, y: 30 });
      gsap.set(".brands-list-row", { opacity: 0, y: 20 });
      gsap.set(clipImg1Ref.current, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(clipImg2Ref.current, { clipPath: "inset(100% 0 0 0)" });

      // 1. 헤딩
      tl.to(".brands-item", { opacity: 1, y: 0, stagger: 0.15, duration: 0.9 }, 0);

      // 2. 로고 그리드
      tl.to(".brands-logo-grid", { opacity: 1, y: 0, duration: 0.9 }, 0.3);

      // 3. 우측 이미지 1
      tl.to(clipImg1Ref.current, { clipPath: "inset(0% 0 0 0)", duration: 1.2 }, 0.5);

      // 4. 브랜드 리스트
      tl.to(".brands-list-row", { opacity: 1, y: 0, stagger: 0.06, duration: 0.7 }, 0.8);

      // 5. 우측 이미지 2
      tl.to(clipImg2Ref.current, { clipPath: "inset(0% 0 0 0)", duration: 1.2 }, 1.0);

      // 6. 잠시 멈춤
      tl.to({}, { duration: 0.6 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 30%",
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
      ref={sectionRef as any}
      className="anim-wrap section-pad bg-white mt-[80px] md:mt-[120px] rounded-t-[32px] z-[10] relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

        {/* Left */}
        <div className="flex flex-col gap-12">
          <h2 className="brands-item display-heading text-mine-shaft">
            Brands we&apos;ve worked with.
          </h2>

          <div className="brands-logo-grid grid grid-cols-3 md:grid-cols-6 border-t border-alto mb-24">
            {clientLogos.slice(0, 24).map((client, i) => (
              <div
                key={client.name}
                className={cn(
                  "border-b border-r border-alto h-[100px] flex items-center justify-center p-5 transition-all duration-500",
                  (i + 1) % 3 === 0 ? "border-r-0" : "",
                  "md:border-r",
                  (i + 1) % 6 === 0 ? "md:border-r-0" : ""
                )}
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-h-[28px] max-w-full object-contain"
                  data-pin-nopin="true"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col border-t border-alto">
            {brands.map((brand) => (
              <div key={brand.name} className="brands-list-row">
                <ListRow label={brand.name} detail={brand.services} />
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:flex flex-col justify-between gap-8">
          <div ref={clipImg1Ref} className="overflow-hidden w-[80%] self-end" style={{ height: "calc(42vw + 50px)", clipPath: "inset(100% 0 0 0)" }}>
            <img
              src="/images/brands_vertical.png"
              alt="Brands Vinuspread"
              className="w-full h-full object-cover scale-125 will-change-transform"
              data-pin-nopin="true"
            />
          </div>
          <div ref={clipImg2Ref} className="overflow-hidden aspect-[2/3] w-[60%] self-start" style={{ clipPath: "inset(100% 0 0 0)" }}>
            <img
              src="/images/about_vertical.png"
              alt=""
              className="w-full h-full object-cover"
              data-pin-nopin="true"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
