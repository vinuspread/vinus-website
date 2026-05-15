"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const lastYRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const pageLabel = {
    "/": "Home",
    "/work": "Work",
    "/about": "About",
  }[pathname] || "Home";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsHidden(y > lastYRef.current && y > 100);
      lastYRef.current = y;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full h-[56px] bg-gallery z-[1000] border-b border-alto px-page-padding flex items-center justify-between transition-transform duration-1000 header-enter",
        isHidden && "nav-hidden"
      )}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-[17px] font-normal tracking-tight uppercase">
          DashDigital®
        </Link>
        <div className="hidden md:flex items-center gap-2 text-mine-shaft/40 text-[14px]">
          <span className="nav-dash bg-alto h-[1px]" />
          {pageLabel}
        </div>
      </div>

      {/* Right: Menu */}
      <div className="flex items-center gap-6 md:gap-10">
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Work", href: "/work" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "#" },
          ].map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              className="text-[12px] uppercase tracking-wider hover:opacity-50 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="text-[12px] tracking-wider font-normal group uppercase border border-mine-shaft/20 px-3 py-1 rounded-full hover:bg-mine-shaft hover:text-gallery transition-all">
          Menu +
        </button>
      </div>
    </header>
  );
};
