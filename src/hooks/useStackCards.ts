"use client";

import { useEffect } from "react";

export function useStackCards(containerSelector: string) {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(`${containerSelector} .stack-card`);
    if (!cards.length) return;

    const onScroll = () => {
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
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
        } else {
          card.style.transform = "scale(1)";
          card.style.opacity = "1";
          card.classList.remove("is-stacking");
        }
      });
    };

    // Lenis와 동기화를 위해 Lenis 인스턴스가 있으면 lenis.on('scroll') 사용, 없으면 window scroll 사용
    const lenis = (window as any).__lenis;
    
    if (lenis) {
      lenis.on("scroll", onScroll);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    
    // 초기 상태 반영을 위해 한 번 실행
    onScroll();

    return () => {
      if (lenis) {
        lenis.off("scroll", onScroll);
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, [containerSelector]);
}
