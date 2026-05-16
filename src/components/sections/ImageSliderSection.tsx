"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const slides = [
  { src: "/images/slider_01.png", alt: "Project 1" },
  { src: "/images/slider_02.png", alt: "Project 2" },
  { src: "/images/slider_03.png", alt: "Project 3" },
  { src: "/images/slider_04.png", alt: "Project 4" },
  { src: "/images/slider_05.png", alt: "Project 5" },
  { src: "/images/slider_06.png", alt: "Project 6" },
];

// 무한 루프를 위해 두 벌 복제
const marqueeSlides = [...slides, ...slides];

export const ImageSliderSection = () => {
  const revealRef = useReveal();

  return (
    <section ref={revealRef as any} className="anim-wrap bg-white border-b border-alto overflow-hidden" style={{ height: "500px" }}>
      <div className="h-full overflow-hidden">
        <div
          className="flex gap-4 h-full w-max"
          style={{
            animation: "marquee-images 30s linear infinite",
          }}
        >
          {marqueeSlides.map((slide, i) => (
            <div key={i} className="min-w-[600px] h-full relative overflow-hidden flex-shrink-0">
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

      <style jsx>{`
        @keyframes marquee-images {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
