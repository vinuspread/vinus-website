"use client";

import { useEffect } from "react";

export function useStackCards(containerSelector: string) {
  useEffect(() => {
    // Lenis 전역 참조 시도 (feedback.md 주의사항 §4.36 반영)
    const lenis = (window as any).__lenis;
    
    const cards = document.querySelectorAll<HTMLElement>(`${containerSelector} .stack-card`);
    if (!cards.length) return;

    const updateStack = () => {
      cards.forEach((card, i) => {
        const nextCard = cards[i + 1];
        if (!nextCard) return;

        const nextRect = nextCard.getBoundingClientRect();
        // 다음 카드가 올라오는 비율 (0 ~ 1)
        const progress = Math.max(0, Math.min(1, 1 - nextRect.top / window.innerHeight));

        if (progress > 0) {
          const scale = 1 - progress * 0.04;      // 최대 scale(0.96)
          const opacity = 1 - progress * 0.4;     // 최대 opacity 0.6
          card.style.transform = `scale(${scale})`;
          card.style.opacity = `${opacity}`;
          card.classList.add("is-stacking");
          card.style.borderRadius = "16px";
          card.style.overflow = "hidden";
        } else {
          card.style.transform = "scale(1)";
          card.style.opacity = "1";
          card.classList.remove("is-stacking");
          card.style.borderRadius = "0";
        }
      });
    };

    if (lenis) {
      lenis.on("scroll", updateStack);
      return () => lenis.off("scroll", updateStack);
    } else {
      window.addEventListener("scroll", updateStack, { passive: true });
      return () => window.removeEventListener("scroll", updateStack);
    }
  }, [containerSelector]);
}
