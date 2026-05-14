"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!imageRef.current) return;
    const container = imageRef.current.parentElement;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.fromTo(container, 
        { y: 100, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
          }
        }
      );

      // 2. Parallax
      gsap.fromTo(imageRef.current, 
        { y: 50 },
        {
          y: -50,
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

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref as any} className="anim-wrap py-[120px] px-page-padding bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_0.8fr_1.2fr] gap-12 items-start">
        
        {/* Left Side: Content (50% width) */}
        <div className="flex flex-col gap-12">
          
          <h2 className="anim-move-up display-heading text-[clamp(40px,5vw,72px)] text-mine-shaft">
            Brands we&apos;ve worked with.
          </h2>

        {/* Logo Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 border-t border-alto mb-24">
          {clientLogos.slice(0, 24).map((client, i) => (
            <div
              key={client.name}
              className={cn(
                "border-b border-r border-alto h-[100px] flex items-center justify-center p-5 transition-all duration-500 group",
                (i + 1) % 3 === 0 ? "border-r-0" : "",
                "md:border-r", 
                (i + 1) % 6 === 0 ? "md:border-r-0" : ""
              )}
            >
              <img
                src={client.src}
                alt={client.name}
                className="max-h-[28px] max-w-full object-contain opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Detailed Brand List */}
        <div className="flex flex-col border-t border-alto">
          {brands.map((brand, idx) => (
            <div
              key={brand.name}
              className="grid grid-cols-12 items-center py-[32px] border-b border-alto group transition-colors hover:bg-mine-shaft/[0.02]"
            >
              <div className="col-span-6 lg:col-span-4">
                <div className="anim-clip block">
                  <span className="anim-move-up font-inter font-medium text-[20px] lg:text-[22px] tracking-[-0.02em]" data-delay={idx * 30}>
                    {brand.name}
                  </span>
                </div>
              </div>
              <div className="col-span-5 lg:col-span-7">
                <div className="anim-clip block">
                  <span className="anim-move-up font-inter font-light text-[15px] leading-relaxed text-mine-shaft/40" data-delay={idx * 30 + 40}>
                    {brand.services}
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex justify-end">
                <span className="opacity-20 group-hover:opacity-100 transition-all duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
        </div>

        {/* Spacer (~20% width) */}
        <div className="hidden lg:block"></div>

        {/* Right Side: Image (~30% width) */}
        <div className="hidden lg:flex flex-col">
          <div className="sticky top-[120px] overflow-hidden aspect-[2/3] w-full">
            <div className="w-full h-full will-change-transform">
              <img 
                ref={imageRef}
                src="/brands_vertical.png" 
                alt="Brands Vinuspread"
                className="w-full h-full object-cover scale-125 will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
