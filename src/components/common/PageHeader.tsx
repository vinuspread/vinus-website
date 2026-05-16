"use client";

import { useReveal } from "@/hooks/useReveal";

interface PageHeaderProps {
  /** 브레드크럼 레이블 (예: "Experience") */
  breadcrumb: string;
  /** h1 타이틀 노드 — JSX 허용 (볼드, 줄바꿈 등) */
  title: React.ReactNode;
  /** 설명 노드 — JSX 허용 */
  description?: React.ReactNode;
  /** 우측 상단 레이블 (예: "26 Projects") */
  sideLabel?: string;
  /** 하단 border 제거 여부 (work 페이지처럼 필터가 바로 붙는 경우) */
  noBorder?: boolean;
}

export const PageHeader = ({
  breadcrumb,
  title,
  description,
  sideLabel,
  noBorder = false,
}: PageHeaderProps) => {
  const ref = useReveal();

  return (
    <section
      ref={ref as any}
      className={`anim-wrap pt-[100px] md:pt-[140px] pb-[60px] md:pb-[80px] px-page-padding${
        noBorder ? "" : " border-b border-alto"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-8 gap-x-column">
        {/* 브레드크럼 + 우측 레이블 */}
        <div className="md:col-span-8 mb-6 flex items-center justify-between">
          <span className="breadcrumb-label">
            {breadcrumb}
          </span>
          {sideLabel && (
            <span className="hidden md:block text-[15px] text-mine-shaft/50 font-inter font-medium mb-1">
              {sideLabel}
            </span>
          )}
        </div>

        {/* 타이틀 */}
        <div className="md:col-span-8 mb-6">
          <h1 className="text-[clamp(40px,10vw,120px)] leading-[1.1] md:leading-[1.0] tracking-[-1px] md:tracking-[-4px] uppercase font-inter font-normal">
            <span className="block overflow-hidden">
              <span className="anim-move-up block">{title}</span>
            </span>
          </h1>
        </div>

        {/* 설명 */}
        {description && (
          <div className="md:col-span-6">
            <div className="body-text break-keep">
              <span className="block overflow-hidden">
                <span className="anim-move-up block" data-delay="200">
                  {description}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
