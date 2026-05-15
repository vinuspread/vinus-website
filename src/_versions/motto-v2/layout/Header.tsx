"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const lastYRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsHidden(isHome ? false : y > lastYRef.current && y > 100);
      lastYRef.current = y;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) { setIsPastHero(true); return; }
    const hero = document.querySelector("#hero-section");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, [isHome]);

  const transparent = isHome && !isPastHero;

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full h-[80px] z-[1000] px-page-padding flex items-center justify-between transition-all duration-500 header-enter",
        transparent ? "bg-white/80 backdrop-blur-sm border-b border-transparent" : "bg-white border-b border-transparent",
        isHidden && "nav-hidden"
      )}
    >
      {/* Left: Logo */}
      <div className="flex-1 flex items-center">
        <Link href="/" className="flex items-center">
          <img
            src="/images/logo.svg"
            alt="Vinuspread"
            className="h-[22px] w-auto"
          />
        </Link>
      </div>



      {/* Right: Nav */}
      <nav className="flex-1 flex items-center justify-end gap-10">
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
              pathname === item.href ? "text-mine-shaft opacity-100" : "text-mine-shaft opacity-40 hover:opacity-100"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
