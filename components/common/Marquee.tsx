"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

export const Marquee = ({ text, speed = 50, className = "" }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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

    return () => {
      tl.kill();
    };
  }, [text, speed]);

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden whitespace-nowrap w-full bg-transparent ${className}`}
    >
      <div ref={textRef} className="inline-block bg-transparent">
        <span className="inline-block px-4">{text}</span>
        <span className="inline-block px-4">{text}</span>
        <span className="inline-block px-4">{text}</span>
        <span className="inline-block px-4">{text}</span>
      </div>
    </div>
  );
};
