import { useEffect, useRef } from "react";

export const useFitText = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const targetWidth = parent.offsetWidth;
      if (targetWidth === 0) return;

      // 현재 폰트 크기에서 텍스트 실제 렌더링 폭 측정
      el.style.whiteSpace = "nowrap";
      el.style.fontSize = "100px"; // 기준 크기로 초기화
      const baseWidth = el.scrollWidth;
      if (baseWidth === 0) return;

      // 비율 계산으로 정확한 폰트 크기 산출
      const ratio = targetWidth / baseWidth;
      el.style.fontSize = `${100 * ratio * 0.99}px`; // 0.99 안전 마진
    };

    const observer = new ResizeObserver(fit);
    observer.observe(el.parentElement!);
    fit();

    return () => observer.disconnect();
  }, []);

  return ref;
};
