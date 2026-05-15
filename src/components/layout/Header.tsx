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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const navItems = [
    { label: "vinuspread", href: "/about" },
    { label: "experience", href: "/work" },
    { label: "services", href: "/services" },
    { label: "story", href: "/story" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 w-full h-[60px] md:h-[80px] z-[1000] px-page-padding flex items-center justify-between transition-all duration-500 header-enter",
          transparent ? "bg-white/80 backdrop-blur-sm" : "bg-white",
          isHidden && !isMenuOpen && "nav-hidden"
        )}
      >
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Vinuspread"
              className="h-[20px] md:h-[28px] w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-end gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-[14px] uppercase tracking-wider transition-all duration-500 font-inter font-bold",
                pathname === item.href ? "text-mine-shaft opacity-100" : "text-mine-shaft opacity-40 hover:opacity-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex-1 flex justify-end items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[1100] w-8 h-8 flex flex-col items-end justify-center gap-1.5"
            aria-label="Toggle Menu"
          >
            <span className={cn(
              "w-8 h-[2px] bg-mine-shaft transition-all duration-300 origin-right",
              isMenuOpen && "rotate-[-45deg] translate-x-[4px] translate-y-[-2px]"
            )} />
            <span className={cn(
              "w-5 h-[2px] bg-mine-shaft transition-all duration-300",
              isMenuOpen && "opacity-0"
            )} />
            <span className={cn(
              "w-8 h-[2px] bg-mine-shaft transition-all duration-300 origin-right",
              isMenuOpen && "rotate-[45deg] translate-x-[4px] translate-y-[2px]"
            )} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[1050] bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center px-page-padding",
        isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[-100%] opacity-0 pointer-events-none"
      )}>
        <nav className="flex flex-col gap-4">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-[40px] md:text-[64px] uppercase font-inter font-bold tracking-tighter transition-all duration-500 py-[20px]",
                pathname === item.href ? "text-mine-shaft opacity-100" : "text-mine-shaft opacity-20"
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-20 pt-10 border-t border-alto flex flex-col gap-4">
          <span className="section-label opacity-30">Seoul, Korea</span>
          <span className="body-text-ko !text-[16px] text-mine-shaft/60">© 2025 Vinuspread. All rights reserved.</span>
        </div>
      </div>
    </>
  );
};
