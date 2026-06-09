"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const slides = [
  { src: "/images/projects/abstract_glass.png", alt: "Abstract glass identity study", wide: false },
  { src: "/images/projects/nextgen_ui_premium.png", alt: "Premium digital product dashboard", wide: true },
  { src: "/images/projects/creative_agency_id.png", alt: "Creative agency identity system", wide: false },
  { src: "/images/projects/tech_interface.png", alt: "Technology interface concept", wide: true },
  { src: "/images/projects/branding_luxury.png", alt: "Luxury brand system direction", wide: false },
  { src: "/images/projects/futuristic_product.png", alt: "Futuristic product experience concept", wide: true },
];

const marqueeSlides = [...slides, ...slides];

export const ImageSliderSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(section, { clipPath: "inset(100% 0 0 0)" });

    gsap.to(section, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.2, ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white border-b border-alto overflow-hidden h-[240px] md:h-[547px] lg:h-[720px] group/slider"
    >
      <div className="h-full overflow-hidden">
        <div className="flex gap-4 h-full w-max marquee-images group-hover/slider:[animation-play-state:paused]">
          {marqueeSlides.map((slide, i) => (
            <div
              key={i}
              className={`${slide.wide ? "min-w-[75vw] md:min-w-[79.2vw] lg:min-w-[66.24vw]" : "min-w-[65vw] md:min-w-[54.72vw] lg:min-w-[36vw]"} h-full relative overflow-hidden flex-shrink-0`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={slide.wide ? "(min-width: 1024px) 66vw, (min-width: 768px) 79vw, 75vw" : "(min-width: 1024px) 36vw, (min-width: 768px) 55vw, 65vw"}
                className="object-cover"
                data-pin-nopin="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
