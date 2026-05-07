"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const lastYRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsHidden(y > lastYRef.current && y > 100);
      setIsTop(y < 10);
      lastYRef.current = y;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = isHome && isTop;

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full h-[56px] z-[1000] px-page-padding flex items-center justify-between transition-all duration-500 header-enter",
        transparent ? "bg-transparent border-b border-transparent" : "bg-gallery border-b border-alto",
        isHidden && "nav-hidden"
      )}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <img
            src="/logo.svg"
            alt="Vinuspread"
            className={cn("h-[22px] w-auto transition-all duration-500", transparent && "brightness-0 invert")}
          />
        </Link>
      </div>

      {/* Right: Nav */}
      <nav className="flex items-center gap-8">
        {[
          { label: "vinuspread", href: "/about" },
          { label: "experience", href: "/work" },
          { label: "services", href: "/services" },
          { label: "story", href: "/story" },
          { label: "Contact", href: "/contact" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "text-[12px] uppercase tracking-wider transition-all duration-500 font-inter font-bold",
              transparent
                ? pathname === item.href ? "text-white opacity-100" : "text-white opacity-50 hover:opacity-100"
                : pathname === item.href ? "opacity-100" : "opacity-40 hover:opacity-100"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
