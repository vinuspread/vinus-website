"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const lastYRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsHidden(false);
      lastYRef.current = y;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    setIsDark(false);
    const darkSections = document.querySelectorAll("[data-header-dark]");
    if (!darkSections.length) return;
    const headerHeight = 80;
    const obs = new IntersectionObserver(
      (entries) => {
        const anyDark = entries.some((e) => e.isIntersecting);
        setIsDark(anyDark);
      },
      { rootMargin: `0px 0px -${window.innerHeight - headerHeight}px 0px`, threshold: 0 }
    );
    darkSections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

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
          "bg-transparent",
          isHidden && !isMenuOpen && "nav-hidden"
        )}
      >
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.svg"
              alt="Vinuspread"
              className={cn("h-[20px] md:h-[28px] w-auto transition-all duration-500", isDark && "invert")}

              data-pin-nopin="true"
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
                "text-[14px] uppercase tracking-normal transition-all duration-500 font-inter font-bold",
                isDark
                  ? pathname === item.href ? "text-white opacity-100" : "text-white opacity-50 hover:opacity-100"
                  : pathname === item.href ? "text-mine-shaft opacity-100" : "text-mine-shaft opacity-40 hover:opacity-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[2000] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={cn(
              "w-8 h-[2px] transition-all duration-300",
              isDark ? "bg-white" : "bg-mine-shaft",
              isMenuOpen && "rotate-[-45deg] translate-y-[8px]"
            )} />
            <span className={cn(
              "w-8 h-[2px] transition-all duration-300",
              isDark ? "bg-white" : "bg-mine-shaft",
              isMenuOpen && "opacity-0"
            )} />
            <span className={cn(
              "w-8 h-[2px] transition-all duration-300",
              isDark ? "bg-white" : "bg-mine-shaft",
              isMenuOpen && "rotate-[45deg] translate-y-[-8px]"
            )} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[1050] bg-white opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center px-page-padding",
        isMenuOpen ? "translate-y-0 visible" : "translate-y-[-100%] invisible pointer-events-none"
      )}>
        <nav className="flex flex-col">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-[40px] md:text-[64px] uppercase font-inter font-bold tracking-tighter transition-all duration-500 py-[24px] md:py-[32px] border-b border-alto/30 last:border-0",
                pathname === item.href ? "text-mine-shaft opacity-100" : "text-mine-shaft opacity-20 hover:opacity-100"
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
