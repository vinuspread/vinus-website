"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/common/TransitionLink";

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
      setIsHidden(y > lastYRef.current && y > 120);
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
    { label: "lab", href: "/lab" },
    { label: "story", href: "/story" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 w-full h-[60px] md:h-[80px] z-[9999] px-page-padding flex items-center justify-between transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] header-enter",
          "bg-transparent",
          isHidden && !isMenuOpen && "nav-hidden"
        )}
      >
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <TransitionLink href="/" className="flex items-center">
            <img
              src="/images/h1_logo2.png"
              alt="Vinuspread"
              className={cn("h-[24px] md:h-[28px] w-auto transition-all duration-500", isDark && "invert")}

              data-pin-nopin="true"
            />
          </TransitionLink>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-end gap-10">
          {navItems.map((item) => (
            <TransitionLink
              key={item.label}
              href={item.href}
              className={cn(
                "text-[14px] uppercase tracking-normal transition-all duration-300 font-inter font-bold",
                isDark
                  ? pathname === item.href ? "text-white opacity-100" : "text-white opacity-50 hover:opacity-100"
                  : pathname === item.href ? "text-mine-shaft opacity-100" : "text-mine-shaft opacity-40 hover:opacity-100"
              )}
            >
              {item.label}
            </TransitionLink>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[2000] w-10 h-10 flex items-center justify-end focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-6">
              {/* Closed State SVG (Asymmetric 3-bar menu) */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isDark ? "text-white" : "text-mine-shaft",
                  isMenuOpen ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
                )}
              >
                <rect x="12" y="2" width="12" height="2" fill="currentColor" />
                <rect x="12" y="20" width="12" height="2" fill="currentColor" />
                <rect y="11" width="24" height="2" fill="currentColor" />
              </svg>

              {/* Open State SVG (Perfect Close X) */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isDark ? "text-white" : "text-mine-shaft",
                  isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                )}
              >
                <rect
                  x="4.22266"
                  y="2.80762"
                  width="24"
                  height="2"
                  transform="rotate(45 4.22266 2.80762)"
                  fill="currentColor"
                />
                <rect
                  x="21.1934"
                  y="4.22168"
                  width="24"
                  height="2"
                  transform="rotate(135 21.1934 4.22168)"
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[9998] bg-white opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center px-page-padding",
        isMenuOpen ? "translate-y-0 visible" : "translate-y-[-100%] invisible pointer-events-none"
      )}>
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <TransitionLink
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-[40px] md:text-[64px] uppercase font-inter font-bold tracking-tighter transition-all duration-500 py-[24px] md:py-[32px] border-b border-alto/30 last:border-0",
                pathname === item.href ? "text-mine-shaft opacity-100" : "text-mine-shaft opacity-20 hover:opacity-100"
              )}
            >
              {item.label}
            </TransitionLink>
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
