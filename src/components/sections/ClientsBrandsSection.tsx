"use client";

import { useReveal } from "@/hooks/useReveal";

const clientLogos = Array.from({ length: 28 }, (_, i) => ({
  name: `client-${String(i + 1).padStart(2, "0")}`,
  src: `/logos/logo${String(i + 1).padStart(2, "0")}.svg`,
}));


const brands = [
  { name: "DongA Onbook", services: "Branding — Digital Design — Web Development" },
  { name: "Samyang", services: "Digital Design — Web Development" },
  { name: "Lotte Cinema", services: "UX/UI Design — App Development" },
  { name: "Samsung Electronics", services: "Digital Design — Creative Direction" },
  { name: "Seoul Paik Hospital", services: "Digital Design — Web Development" },
  { name: "Realty 114", services: "Strategy — UX/UI Design — App Development" },
  { name: "Macadamia", services: "Strategy — UX/UI Design" },
  { name: "Smart City Jungnang", services: "Strategy — Digital Design" },
  { name: "CJ CheilJedang", services: "Digital Design — Creative Direction" },
  { name: "Hankook Tire", services: "Digital Design — Web Development" },
  { name: "Nexon", services: "Brand Identity — Digital Design" },
  { name: "LG Electronics", services: "Digital Design — UX/UI" },
];

export const ClientsBrandsSection = () => {
  const revealRef = useReveal();

  return (
    <section ref={revealRef as any} className="anim-wrap px-page-padding py-[100px] bg-gallery">

      {/* 클라이언트 로고 그리드 */}
      <div className="mb-[80px]">
        <p className="section-label mb-10">( Clients )</p>
        <h2 className="display-heading text-[clamp(40px,5vw,82px)] mb-[48px] uppercase">
          <span className="block overflow-hidden">
            <span className="anim-move-up block">OUR PARTNERS</span>
          </span>
        </h2>

        <div className="grid grid-cols-4 md:grid-cols-8 border-t border-l border-alto">
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="border-b border-r border-alto h-[100px] flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500 group"
            >
              <img
                src={client.src}
                alt={client.name}
                className="max-h-[36px] max-w-full object-contain opacity-40 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Brands We've Worked With */}
      <div>
        <p className="section-label mb-10">( Brands )</p>
        <h2 className="display-heading text-[clamp(40px,5vw,82px)] mb-[40px] uppercase">
          <span className="block overflow-hidden">
            <span className="anim-move-up block">Brands We&apos;ve Worked With</span>
          </span>
        </h2>

        <div className="border-t border-alto grid grid-cols-1 md:grid-cols-2">
          {brands.map((brand, idx) => (
            <div 
              key={brand.name} 
              className={`flex flex-col justify-center py-8 border-b border-alto group hover:bg-white/30 transition-colors relative px-4 ${idx % 2 === 0 ? 'md:border-r md:pr-16' : 'md:pl-16'}`}
            >
              <div className="text-[22px] font-bold mb-2">
                <span className="anim-clip">
                  <span className="anim-move-up" data-delay={idx * 30}>{brand.name}</span>
                </span>
              </div>
              <div className="text-[15px] font-light opacity-60">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay={idx * 30 + 50}>{brand.services}</span>
                </span>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-right text-[11px] tracking-widest text-mine-shaft/20 font-bold group-hover:text-mine-shaft transition-colors">
                MORE +
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
