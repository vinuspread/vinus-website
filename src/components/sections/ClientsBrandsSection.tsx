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
    <section ref={revealRef as any} className="anim-wrap py-[80px] px-page-padding bg-gallery">

      {/* 클라이언트 로고 그리드 */}
      <div className="mb-[80px]">
        <h2 className="text-[46.8px] leading-none mb-[48px] uppercase font-inter">
          <span className="block overflow-hidden">
            <span className="anim-move-up block">Clients</span>
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
        <h2 className="text-[46.8px] leading-none mb-[40px] uppercase font-inter">
          <span className="block overflow-hidden">
            <span className="anim-move-up block">Brands We&apos;ve Worked With</span>
          </span>
        </h2>

        <div className="border-t border-alto">
          {brands.map((brand, idx) => (
            <div key={brand.name} className="grid grid-cols-8 items-center h-[73px] border-b border-alto group hover:bg-white/30 transition-colors">
              <div className="col-span-4 text-[17px]">
                <span className="anim-clip">
                  <span className="anim-move-up" data-delay={idx * 50}>{brand.name}</span>
                </span>
              </div>
              <div className="col-span-3 text-[15px] font-light">
                <span className="anim-clip block">
                  <span className="anim-move-up" data-delay={idx * 50 + 20}>{brand.services}</span>
                </span>
              </div>
              <div className="col-span-1 text-right text-[14px] text-mine-shaft/40">
                MORE +
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
