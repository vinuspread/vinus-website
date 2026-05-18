"use client";

import Link from "next/link";

interface NavItem {
  slug: string;
  title: string;
}

interface DetailNavBarProps {
  prev: NavItem;
  next: NavItem;
  listHref: string;
  listLabel: string;
}

export const DetailNavBar = ({ prev, next, listHref, listLabel }: DetailNavBarProps) => (
  <nav className="border-t border-b border-alto bg-white">
    <div className="px-page-padding grid grid-cols-3 divide-x divide-alto">
      <Link href={prev.slug} className="group flex items-center gap-5 py-10 md:py-14 transition-colors duration-300">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mine-shaft/20 group-hover:text-mine-shaft transition-colors shrink-0">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="font-inter font-bold text-[18px] md:text-[22px] text-mine-shaft tracking-tight truncate group-hover:underline underline-offset-4">{prev.title}</span>
      </Link>

      <Link href={listHref} className="group flex items-center justify-center gap-3 py-10 md:py-14 transition-colors duration-300">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mine-shaft/20 group-hover:text-mine-shaft transition-colors shrink-0">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
        <span className="font-inter font-bold text-[22px] text-mine-shaft/30 group-hover:text-mine-shaft transition-colors">{listLabel}</span>
      </Link>

      <Link href={next.slug} className="group flex items-center justify-end gap-5 py-10 md:py-14 transition-colors duration-300">
        <span className="font-inter font-bold text-[18px] md:text-[22px] text-mine-shaft tracking-tight truncate group-hover:underline underline-offset-4">{next.title}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-mine-shaft/20 group-hover:text-mine-shaft transition-colors shrink-0">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </nav>
);
