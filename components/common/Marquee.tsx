"use client";

import { Fragment, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
  scrollReactive?: boolean;
}

export const Marquee = ({ text, speed = 50, className = "", scrollReactive = false }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const segments = text.split("•").map((segment) => segment.trim());

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const textWidth = textRef.current.offsetWidth;
    
    // Create an infinite loop using GSAP
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(textRef.current, {
      x: -textWidth / 2,
      duration: textWidth / speed,
      ease: "none",
    });

    let resetTimeScale: gsap.core.Tween | null = null;
    const boostTimeScale = (amount: number) => {
      const boost = Math.min(amount, 6);
      tl.timeScale(1 + boost);
      resetTimeScale?.kill();
      resetTimeScale = gsap.to(tl, {
        timeScale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.08,
      });
    };

    const scrollTrigger = scrollReactive
      ? ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            boostTimeScale(Math.abs(self.getVelocity()) / 450);
          },
        })
      : null;

    const handleWheel = (event: WheelEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      boostTimeScale(Math.abs(event.deltaY) / 80);
    };

    if (scrollReactive) {
      window.addEventListener("wheel", handleWheel, { passive: true });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      resetTimeScale?.kill();
      scrollTrigger?.kill();
      tl.kill();
    };
  }, [text, speed, scrollReactive]);

  const marqueeText = (
    <>
      {segments.map((segment, index) => (
        <Fragment key={`${segment}-${index}`}>
          {index > 0 && (
            <span className="mx-[0.34em] inline-flex items-center text-[0.3em] leading-none">
              •
            </span>
          )}
          <span>{segment}</span>
        </Fragment>
      ))}
    </>
  );

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden whitespace-nowrap w-full bg-transparent ${className}`}
    >
      <div ref={textRef} className="inline-block bg-transparent">
        <span className="inline-flex items-center px-4">{marqueeText}</span>
        <span className="inline-flex items-center px-4">{marqueeText}</span>
        <span className="inline-flex items-center px-4">{marqueeText}</span>
        <span className="inline-flex items-center px-4">{marqueeText}</span>
      </div>
    </div>
  );
};
