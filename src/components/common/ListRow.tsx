"use client";

interface ListRowProps {
  label: string;
  detail: string;
  delay?: number;
}

export const ListRow = ({ label, detail, delay = 0 }: ListRowProps) => (
  <div className="flex flex-col md:grid md:grid-cols-12 md:items-center gap-2 md:gap-0 py-[28px] md:py-[32px] border-b border-alto group transition-colors hover:bg-mine-shaft/[0.02]">
    {/* Label + arrow (mobile: same line) */}
    <div className="md:col-span-4 flex items-center justify-between md:block">
      <span className="block overflow-hidden">
        <span className="anim-move-up block text-[20px] lg:text-[24px] font-inter !text-mine-shaft font-medium tracking-[-0.02em]" data-delay={delay}>
          {label}
        </span>
      </span>
      <span className="md:hidden opacity-20 group-hover:opacity-100 transition-all duration-300">→</span>
    </div>

    {/* Detail */}
    <div className="md:col-span-7">
      <span className="block overflow-hidden">
        <span className="anim-move-up block font-inter font-medium text-[13px] uppercase tracking-normal leading-relaxed text-mine-shaft/60" data-delay={delay + 40}>
          {detail}
        </span>
      </span>
    </div>

    {/* Arrow (desktop only) */}
    <div className="hidden md:flex col-span-1 justify-end">
      <span className="opacity-20 group-hover:opacity-100 transition-all duration-300">→</span>
    </div>
  </div>
);
