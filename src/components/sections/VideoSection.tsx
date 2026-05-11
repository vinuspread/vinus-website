"use client";

import { useState, useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export const VideoSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const revealRef = useReveal();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded && progressRef.current) {
      progressRef.current.style.width = "100%";
    }
  }, [isLoaded]);

  return (
    <section ref={revealRef as any} className="anim-wrap bg-white border-b border-alto w-full">
      <div className="relative w-full aspect-video bg-alto overflow-hidden">
        {/* Loading Overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center z-10 bg-alto transition-opacity duration-500",
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <div className="w-[192px] h-[1px] bg-mine-shaft/10 relative">
            <div 
              ref={progressRef}
              className="absolute left-0 top-0 h-full bg-[#949494] transition-[width] duration-1000 ease-out" 
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Video */}
        <video
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsLoaded(true)}
          data-cursor="PLAY"
        />
      </div>
    </section>
  );
};
