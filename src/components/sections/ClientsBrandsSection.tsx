"use client";

import { useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const clientLogos = Array.from({ length: 28 }, (_, i) => ({
  name: `client-${String(i + 1).padStart(2, "0")}`,
  src: `/logos/logo${String(i + 1).padStart(2, "0")}.svg`,
}));

const brands = [
  { name: "DongA Onbook",       services: "Branding — Digital Design — Web Development" },
  { name: "Samyang",            services: "Digital Design — Web Development" },
  { name: "Lotte Cinema",       services: "UX/UI Design — App Development" },
  { name: "Samsung Electronics",services: "Digital Design — Creative Direction" },
  { name: "Seoul Paik Hospital",services: "Digital Design — Web Development" },
  { name: "Realty 114",         services: "Strategy — UX/UI Design — App Development" },
  { name: "Macadamia",          services: "Strategy — UX/UI Design" },
  { name: "Smart City Jungnang",services: "Strategy — Digital Design" },
  { name: "CJ CheilJedang",     services: "Digital Design — Creative Direction" },
  { name: "Hankook Tire",       services: "Digital Design — Web Development" },
  { name: "Nexon",              services: "Brand Identity — Digital Design" },
  { name: "LG Electronics",     services: "Digital Design — UX/UI" },
];

export const ClientsBrandsSection = () => {
  const ref = useReveal();

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref as any} className="anim-wrap py-[120px] px-page-padding bg-white border-t border-mine-shaft/10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
        
        {/* Left Side: Side Label */}
        <div className="hidden lg:block">
          <p className="anim-move-up font-inter text-[11px] font-bold tracking-[0.2em] uppercase text-mine-shaft/40 sticky top-[120px]">
            (Clients & Brands)
          </p>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col gap-12">
          
          {/* Main Heading */}
          <h2 className="anim-move-up font-inter text-[clamp(40px,5vw,72px)] font-bold leading-[1.05] tracking-[-0.04em] text-mine-shaft">
            Brands we&apos;ve worked with.
          </h2>

          {/* Logo Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 border-t border-mine-shaft/10 mb-24">
            {clientLogos.slice(0, 20).map((client, i) => (
              <div
                key={client.name}
                className={cn(
                  "border-b border-r border-mine-shaft/10 h-[88px] flex items-center justify-center p-5 transition-all duration-500 group",
                  // 3열 모드(모바일)에서 3의 배수(우측 끝) 테두리 제거
                  (i + 1) % 3 === 0 ? "border-r-0" : "",
                  // 5열 모드(데스크탑)에서 5의 배수(우측 끝) 테두리 제거 및 이전 규칙 초기화
                  "md:border-r", 
                  (i + 1) % 5 === 0 ? "md:border-r-0" : ""
                )}
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-h-[26px] max-w-full object-contain opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          {/* Detailed Brand List */}
          <div className="flex flex-col border-t border-mine-shaft/10">
            {brands.map((brand, idx) => (
              <div
                key={brand.name}
                className="grid grid-cols-12 items-center py-[40px] border-b border-mine-shaft/10 group transition-colors hover:bg-mine-shaft/[0.02]"
              >
                <div className="col-span-6 lg:col-span-4">
                  <div className="anim-clip block">
                    <span className="anim-move-up font-inter font-medium text-[20px] lg:text-[24px] tracking-[-0.02em]" data-delay={idx * 30}>
                      {brand.name}
                    </span>
                  </div>
                </div>
                <div className="col-span-5 lg:col-span-7">
                  <div className="anim-clip block">
                    <span className="anim-move-up font-inter font-light text-[14px] lg:text-[15px] leading-relaxed text-mine-shaft/40" data-delay={idx * 30 + 40}>
                      {brand.services}
                    </span>
                  </div>
                </div>
                <div className="col-span-1 flex justify-end">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 15.5L15.5 4.5M15.5 4.5H6.5M15.5 4.5V13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
