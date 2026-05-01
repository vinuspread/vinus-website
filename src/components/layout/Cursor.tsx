"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverData = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      
      if (hoverData) {
        setHoverText(hoverData);
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={cn(
        "cursor",
        isHovering && "cursor-hover"
      )}
    >
      {isHovering && (
        <span className="anim-clip">
          <span className="anim-move-up text-white">{hoverText}</span>
        </span>
      )}
    </div>
  );
};
