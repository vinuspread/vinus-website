"use client";

import { useReveal } from "@/hooks/useReveal";

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

  return (
    <section ref={ref as any} className="anim-wrap px-page-padding py-[120px] bg-white">

      {/* 클라이언트 로고 */}
      <div className="mb-[140px]">
        <p className="anim-move-up font-inter font-bold text-[11px] tracking-[0.2em] uppercase text-mine-shaft/40 mb-[60px]">
          ( Clients )
        </p>
        <div className="grid grid-cols-4 md:grid-cols-7 border-t border-l border-mine-shaft/10">
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="border-b border-r border-mine-shaft/10 h-[88px] flex items-center justify-center p-5
                grayscale hover:grayscale-0 transition-all duration-500 group"
            >
              <img
                src={client.src}
                alt={client.name}
                className="max-h-[28px] max-w-full object-contain opacity-35 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 브랜드 리스트 */}
      <div>
        <p className="anim-move-up font-inter font-bold text-[11px] tracking-[0.2em] uppercase text-mine-shaft/40 mb-[60px]">
          ( Brands We&apos;ve Worked With )
        </p>
        <div className="border-t border-mine-shaft/10">
          {brands.map((brand, idx) => (
            <div
              key={brand.name}
              className="grid grid-cols-12 items-center h-[72px] border-b border-mine-shaft/10 group hover:bg-gallery/30 transition-colors"
            >
              <div className="col-span-1 font-inter text-[12px] text-mine-shaft/25 tabular-nums">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="col-span-5">
                <span className="anim-clip">
                  <span className="anim-move-up font-inter font-medium text-[16px] tracking-[-0.01em]" data-delay={idx * 30}>
                    {brand.name}
                  </span>
                </span>
              </div>
              <div className="col-span-5">
                <span className="anim-clip block">
                  <span className="anim-move-up font-inter font-light text-[14px] text-mine-shaft/50" data-delay={idx * 30 + 40}>
                    {brand.services}
                  </span>
                </span>
              </div>
              <div className="col-span-1 text-right font-inter text-[12px] text-mine-shaft/25 group-hover:text-mine-shaft/60 transition-colors">
                →
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
