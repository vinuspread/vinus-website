"use client";

// ─── [개발팀 생성 파일] ui-design 브랜치에 없는 파일 ─────────────────────────
// 클릭 시 lib/pageTransition.ts 의 transition() 을 호출합니다.
// 비동기 없이 동기 핸들러 — async/await·setTimeout 사용 안 함.
// 전환 타이밍 전체는 GSAP 타임라인이 담당합니다.
// ─────────────────────────────────────────────────────────────────────────────

import { useRouter, usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { transition } from "@/lib/pageTransition";

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
    if (href === pathname) return;
    onClick?.();
    transition(() => router.push(href));
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
