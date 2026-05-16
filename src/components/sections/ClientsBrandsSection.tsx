"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import { useReveal } from "@/hooks/useReveal";
import { ListRow } from "@/components/common/ListRow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const clientLogos = Array.from({ length: 28 }, (_, i) => ({
  name: `client-${String(i + 1).padStart(2, "0")}`,
  src: `/images/logos/logo${String(i + 1).padStart(2, "0")}.svg`,
}));

const brands = [
  { name: "DongA Onbook",       services: "Branding - Digital Design - Web Development" },
  { name: "Samyang",            services: "Digital Design - Web Development" },
  { name: "Lotte Cinema",       services: "UX/UI Design - App Development" },
  { name: "Samsung Electronics",services: "Digital Design - Creative Direction" },
  { name: "Seoul Paik Hospital",services: "Digital Design - Web Development" },
  { name: "Realty 114",         services: "Strategy - UX/UI Design - App Development" },
  { name: "Macadamia",          services: "Strategy - UX/UI Design" },
  { name: "Smart City Jungnang",services: "Strategy - Digital Design" },
  { name: "CJ CheilJedang",     services: "Digital Design - Creative Direction" },
  { name: "Hankook Tire",       services: "Digital Design - Web Development" },
  { name: "Nexon",              services: "Brand Identity - Digital Design" },
  { name: "LG Electronics",     services: "Digital Design - UX/UI" },
];

export const ClientsBrandsSection = () => {
  const ref = useReveal();
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
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
    <section ref={ref as any} className="anim-wrap bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
        
        {/* Left Side: Content (50% width) */}
        <div className="flex flex-col gap-12">
          
          <h2 className="anim-move-up display-heading text-mine-shaft">
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
                data-pin-nopin="true"
              />
            </div>
          ))}
        </div>

        {/* Detailed Brand List */}
        <div className="flex flex-col border-t border-alto">
          {brands.map((brand, idx) => (
            <ListRow
              key={brand.name}
              label={brand.name}
              detail={brand.services}
              delay={idx * 30}
            />
          ))}
        </div>
        </div>

        {/* Right Side: Images */}
        <div className="hidden lg:flex flex-col justify-between">
          {/* First image — top, narrower to create breathing room */}
          <div className="overflow-hidden w-[80%] self-end" style={{ height: "calc(42vw + 50px)" }}>
            <div className="w-full h-full will-change-transform">
              <img
                ref={imageRef}
                src="/images/brands_vertical.png"
                alt="Brands Vinuspread"
                className="w-full h-full object-cover scale-125 will-change-transform"
                data-pin-nopin="true"
              />
            </div>
          </div>
          {/* Second image — bottom, contained within column */}
          <div className="overflow-hidden aspect-[2/3] w-[60%] self-start">
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
