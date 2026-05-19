"use client";

import { useRouter, usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

const OVERLAY_IN_DURATION = 420; // ms — overlay-in 완료까지 대기 후 navigate

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TransitionLink = ({ href, children, className, onClick }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // 같은 페이지 클릭 시 무시
    if (href === pathname) return;

    onClick?.();

    // PageTransition에 신호 전달
    window.dispatchEvent(new Event("page-transition:start"));

    // 오버레이가 화면을 덮은 후 이동
    setTimeout(() => {
      router.push(href);
    }, OVERLAY_IN_DURATION);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
