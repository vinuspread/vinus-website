import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply stagger delays from data-delay attribute
    el.querySelectorAll<HTMLElement>("[data-delay]").forEach((child) => {
      child.style.transitionDelay = `${child.getAttribute("data-delay")}ms`;
    });

    const trigger = () => {
      el.classList.add("ready");
      obs.disconnect();
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) trigger();
      },
      { threshold: 0, rootMargin: "0px 0px -48px 0px" }
    );

    obs.observe(el);

    // Fire immediately if already visible on mount
    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) trigger();
    });

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
