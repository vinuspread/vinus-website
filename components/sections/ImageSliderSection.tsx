"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const slides = [
  { src: "/images/slider_01.png", alt: "Project 1", wide: false },
  { src: "/images/slider_02.png", alt: "Project 2", wide: true },
  { src: "/images/slider_03.png", alt: "Project 3", wide: false },
  { src: "/images/slider_04.png", alt: "Project 4", wide: true },
  { src: "/images/slider_05.png", alt: "Project 5", wide: false },
  { src: "/images/slider_06.png", alt: "Project 6", wide: true },
];

const marqueeSlides = [...slides, ...slides];

export const ImageSliderSection = () => {
  const revealRef = useReveal();

  return (
    <section ref={revealRef as any} className="anim-wrap bg-white border-b border-alto overflow-hidden h-[500px] group/slider">
      <div className="h-full overflow-hidden">
        <div className="flex gap-4 h-full w-max marquee-images group-hover/slider:[animation-play-state:paused]">
          {marqueeSlides.map((slide, i) => (
            <div
              key={i}
              className={`${slide.wide ? "min-w-[780px]" : "min-w-[420px]"} h-full relative overflow-hidden flex-shrink-0`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
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
