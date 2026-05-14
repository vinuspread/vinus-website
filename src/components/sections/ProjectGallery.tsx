"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectGalleryProps {
  images: string[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".gallery-item");
      
      items?.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
            clipPath: "inset(10% 0 10% 0)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [images]);

  return (
    <div ref={containerRef} className="flex flex-col gap-10 md:gap-20 py-[40px] md:py-[80px]">
      {images.map((img, i) => (
        <div 
          key={i} 
          className={`gallery-item w-full relative`}
        >
          {i % 3 === 0 ? (
            <div className="w-full aspect-[16/9] relative overflow-hidden">
              <Image 
                src={img} 
                alt="" 
                fill 
                sizes="100vw"
                className="object-cover" 
              />
            </div>
          ) : (
            <div className="max-w-[1920px] mx-auto px-page-padding">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image 
                    src={img} 
                    alt="" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover" 
                  />
                </div>
                {images[i + 1] && (
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image 
                      src={images[i + 1]!} 
                      alt="" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover" 
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
