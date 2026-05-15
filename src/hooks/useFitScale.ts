import { useEffect, useRef } from "react";

export const useFitScale = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const containerWidth = parent.offsetWidth;
      if (containerWidth === 0) return;

      // Reset scale to measure natural width
      el.style.transform = "none";
      el.style.transformOrigin = "left center";
      const naturalWidth = el.scrollWidth;
      if (naturalWidth === 0) return;

      const ratio = containerWidth / naturalWidth;
      // Only scale down (never scale up beyond natural size)
      el.style.transform = `scaleX(${ratio})`;
    };

    const observer = new ResizeObserver(fit);
    observer.observe(el.parentElement!);
    fit();

    return () => observer.disconnect();
  }, []);

  return ref;
};
