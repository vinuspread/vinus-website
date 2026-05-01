"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Hide on scroll down, show on scroll up
      setIsHidden(y > lastY && y > 100);
      setLastY(y);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full h-[56px] bg-gallery z-[1000] border-b border-alto px-page-padding flex items-center justify-between transition-transform duration-1000",
        isHidden && "nav-hidden"
      )}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-[17px] font-normal tracking-tight anim-wrap ready">
          <span className="anim-clip">
            <span className="anim-move-up" style={{ "--delay": "0s" } as any}>DashDigital®</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-2 text-mine-shaft/40 text-[14px] anim-wrap ready">
          <span className="anim-fill-width bg-alto h-[1px] w-4" />
          <span className="anim-clip">
            <span className="anim-move-up" style={{ "--delay": "0.1s" } as any}>Home</span>
          </span>
        </div>
      </div>

      {/* Right: Menu */}
      <div className="flex items-center gap-8 anim-wrap ready">
        <button className="text-[10.5px] tracking-wider font-normal group">
          <span className="anim-clip">
            <span className="anim-move-up" style={{ "--delay": "0.2s" } as any}>Menu +</span>
          </span>
        </button>
      </div>
    </header>
  );
};
