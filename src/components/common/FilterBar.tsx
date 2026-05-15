"use client";

interface FilterBarProps<T extends string> {
  categories: readonly T[];
  active: T;
  onSelect: (cat: T) => void;
  count: (cat: T) => number;
  total: number;
  totalLabel: string;
}

export function FilterBar<T extends string>({
  categories,
  active,
  onSelect,
  count,
  total,
  totalLabel,
}: FilterBarProps<T>) {
  return (
    <div className="px-page-padding border-b border-alto flex items-center justify-between py-[20px]">
      <div className="flex items-center gap-[24px] md:gap-[32px] overflow-x-auto no-scrollbar flex-nowrap pr-10 md:pr-0 min-w-0 flex-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`text-[12px] uppercase tracking-[0.1em] font-inter font-medium pb-[2px] transition-all duration-300 whitespace-nowrap ${
              active === cat
                ? "text-mine-shaft border-b border-mine-shaft"
                : "text-mine-shaft/40 hover:text-mine-shaft"
            }`}
          >
            {cat}
            <span className="ml-[6px] opacity-50">{count(cat)}</span>
          </button>
        ))}
      </div>
      <span className="hidden md:block text-[12px] uppercase tracking-[0.1em] font-inter font-bold text-mine-shaft">
        {total} {totalLabel}
      </span>
    </div>
  );
}
