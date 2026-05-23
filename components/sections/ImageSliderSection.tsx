"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const slides = [
  { src: "https://picsum.photos/seed/s1/800/600", alt: "Project 1", wide: false },
  { src: "https://picsum.photos/seed/s2/1200/800", alt: "Project 2", wide: true },
  { src: "https://picsum.photos/seed/s3/800/600", alt: "Project 3", wide: false },
  { src: "https://picsum.photos/seed/s4/1200/800", alt: "Project 4", wide: true },
  { src: "https://picsum.photos/seed/s5/800/600", alt: "Project 5", wide: false },
  { src: "https://picsum.photos/seed/s6/1200/800", alt: "Project 6", wide: true },
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
      className="bg-white border-b border-alto overflow-hidden h-[240px] md:h-[380px] lg:h-[500px] group/slider"
    >
      <div className="h-full overflow-hidden">
        <div className="flex gap-4 h-full w-max marquee-images group-hover/slider:[animation-play-state:paused]">
          {marqueeSlides.map((slide, i) => (
            <div
              key={i}
              className={`${slide.wide ? "min-w-[75vw] md:min-w-[55vw] lg:min-w-[46vw]" : "min-w-[65vw] md:min-w-[38vw] lg:min-w-[25vw]"} h-full relative overflow-hidden flex-shrink-0`}
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
