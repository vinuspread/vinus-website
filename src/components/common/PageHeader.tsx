"use client";

import { useReveal } from "@/hooks/useReveal";

interface PageHeaderProps {
  /** 브레드크럼 레이블 (예: "Experience") */
  breadcrumb: string;
  /** h1 타이틀 노드 — JSX 허용 (볼드, 줄바꿈 등) */
  title: React.ReactNode;
  /** 설명 노드 — JSX 허용 */
  description?: React.ReactNode;
  /** 하단 border 제거 여부 (work 페이지처럼 필터가 바로 붙는 경우) */
  noBorder?: boolean;
}

export const PageHeader = ({
  breadcrumb,
  title,
  description,
  noBorder = false,
}: PageHeaderProps) => {
  const ref = useReveal();

  return (
    <section
      ref={ref as any}
      className={`anim-wrap pt-[140px] pb-[80px] px-page-padding${
        noBorder ? "" : " border-b border-alto"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-8 gap-x-column">
        {/* 브레드크럼 */}
        <div className="md:col-span-8 mb-6">
          <span className="text-[12px] uppercase tracking-wider font-inter opacity-40">
            {breadcrumb}
          </span>
        </div>

        {/* 타이틀 */}
        <div className="md:col-span-8 mb-6">
          <h1 className="text-[83.5px] md:text-[120px] leading-[0.89] tracking-[-4px] uppercase font-inter font-normal">
            <span className="block overflow-hidden">
              <span className="anim-move-up block">{title}</span>
            </span>
          </h1>
        </div>

        {/* 설명 */}
        {description && (
          <div className="md:col-span-6">
            <p className="text-[17px] font-medium leading-[1.4] tracking-[-0.3px] text-mine-shaft/60 break-keep">
              <span className="block overflow-hidden">
                <span className="anim-move-up block" data-delay="200">
                  {description}
                </span>
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
