"use client";

// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 클릭 시 lib/pageTransition.ts 의 transition() 을 호출합니다.
// 비동기 없이 동기 핸들러 — async/await·setTimeout 사용 안 함.
// 전환 타이밍 전체는 GSAP 타임라인이 담당합니다.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { transition } from "@/lib/pageTransition";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const shouldUseDefaultNavigation = (event: MouseEvent<HTMLAnchorElement>, href: string) =>
  event.metaKey ||
  event.ctrlKey ||
  event.shiftKey ||
  event.altKey ||
  event.button !== 0 ||
  href.startsWith("#") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:") ||
  href.startsWith("http://") ||
  href.startsWith("https://") ||
  event.currentTarget.target === "_blank" ||
  event.currentTarget.hasAttribute("download");

export const TransitionLink = ({ href, children, className, onClick, ...props }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || shouldUseDefaultNavigation(e, href)) return;

    e.preventDefault();
    if (href === pathname) return;
    sessionStorage.setItem(`scroll:${pathname}`, String(window.scrollY));
    transition(() => router.push(href));
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};
