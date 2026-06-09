"use client";

import Image from "next/image";
import { ArrowIcon } from "@/components/common/ArrowIcon";

const clientLogos = Array.from({ length: 28 }, (_, i) => ({
  name: `client-${String(i + 1).padStart(2, "0")}`,
  src: `/images/logos/logo${String(i + 1).padStart(2, "0")}.png`,
}));

const visibleClientLogos = clientLogos.slice(0, 24);
const marqueeClientLogos = [...visibleClientLogos, ...visibleClientLogos];

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
  return (
    <section
      className="bg-mine-shaft mt-[80px] md:mt-[120px] z-[10] relative overflow-hidden"
      data-header-dark
    >
      <div className="px-page-padding pt-[clamp(80px,10vw,120px)] text-center">
        <div className="mx-auto max-w-[920px]">
          <h2 className="brands-item display-heading text-white text-center">
            Clients we&apos;ve partnered with.
          </h2>
        </div>
      </div>

      <div className="brands-logo-marquee relative left-1/2 mt-14 md:mt-20 w-screen -translate-x-1/2 py-[52px] md:py-[72px] overflow-hidden">
        <div className="client-logo-marquee-track flex w-max items-center">
          {marqueeClientLogos.map((client, i) => {
            const duplicate = i >= visibleClientLogos.length;

            return (
              <div
                key={`${client.name}-${i}`}
                aria-hidden={duplicate}
                className="flex h-[88px] w-[196px] md:h-[112px] md:w-[320px] shrink-0 items-center justify-center px-8 md:px-12"
              >
                <div className="relative h-[24px] w-[124px] md:h-[40px] md:w-[200px]">
                  <Image
                    src={client.src}
                    alt={duplicate ? "" : client.name}
                    fill
                    sizes="(min-width: 768px) 200px, 124px"
                    className="object-contain opacity-40 grayscale"
                    data-pin-nopin="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch px-page-padding pb-[clamp(80px,10vw,120px)] pt-[clamp(72px,9vw,120px)]">

        {/* Left */}
        <div className="flex flex-col gap-12">

          <div className="flex flex-col border-t border-white/15">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="brands-list-row group grid grid-cols-1 md:grid-cols-12 md:items-center gap-2 md:gap-0 py-[28px] md:py-[32px] border-b border-white/15 transition-colors hover:bg-white/[0.04]"
              >
                <div className="md:col-span-4 flex items-center justify-between md:block">
                  <span className="font-inter text-[18px] md:text-[20px] lg:text-[24px] font-medium tracking-[-0.02em] text-white">
                    {brand.name}
                  </span>
                  <ArrowIcon className="md:hidden text-white opacity-25 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                </div>
                <div className="md:col-span-7">
                  <span className="font-inter font-medium text-[16px] uppercase tracking-normal leading-relaxed text-white/55">
                    {brand.services}
                  </span>
                </div>
                <div className="hidden md:flex col-span-1 justify-end">
                  <ArrowIcon className="text-white opacity-25 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:flex flex-col justify-between gap-8">
          <div className="relative overflow-hidden w-[80%] self-end" style={{ height: "44vw" }}>
            <Image
              src="/brands_vertical.png"
              alt="Corporate glass facade representing Vinuspread client work"
              fill
              sizes="40vw"
              loading="eager"
              className="object-cover scale-125 will-change-transform"
              data-pin-nopin="true"
            />
          </div>
          <div className="relative overflow-hidden aspect-[2/3] w-[60%] self-start">
            <Image
              src="/about_vertical.png"
              alt="Vinuspread workspace facade"
              fill
              sizes="30vw"
              className="object-cover"
              data-pin-nopin="true"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
