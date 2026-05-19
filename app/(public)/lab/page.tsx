"use client";

import { useReveal } from "@/hooks/useReveal";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { PageHeaderDescription } from "@/components/common/PageHeaderDescription";
import { experiments, typeConfig, statusConfig } from "@/lib/experiments";
import { ArrowIcon } from "@/components/common/ArrowIcon";

export default function LabPage() {
  const listRef = useReveal();

  return (
    <main className="bg-mine-shaft min-h-screen" data-header-dark>

      {/* Header — white text on dark */}
      <div className="[&_*]:!text-white [&_.breadcrumb-label]:!text-white/40 [&_.body-text]:!text-white/50 [&_.body-text-ko]:!text-white/50">
        <PageHeader
          breadcrumb="Lab"
          noBorder
          title={<>Experiments &amp; <span className="font-bold">Explorations</span></>}
          description={
            <PageHeaderDescription
              en="A space for ideas that don't fit anywhere else - yet."
              ko="정해진 형식에 머무르지 않습니다. 완성되지 않았더라도 가장 솔직한 우리의 탐구를 이어갑니다."
            />
          }
        />
      </div>

      {/* Filter bar */}
      <div className="px-page-padding py-[20px] border-b border-white/10 flex items-center gap-4">
        <span className="section-label !text-white/30">{experiments.length} Experiments</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span className="section-label !text-white/30">2024 — 2025</span>
      </div>

      {/* List */}
      <section ref={listRef} className="anim-wrap px-page-padding py-[80px] md:py-[120px]">
        <div className="flex flex-col divide-y divide-white/10">
          {experiments.map((exp, i) => {
            const type = typeConfig[exp.type];
            const status = statusConfig[exp.status];
            const isAvailable = exp.status === "available";

            const inner = (
              <div
                className="anim-move-up group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-[48px] md:py-[56px] items-center"
                data-delay={i * 60}
              >
                {/* Type icon */}
                <div className="md:col-span-1 flex items-center gap-2">
                  <span className="font-inter text-[20px] text-white/20 group-hover:text-white/60 transition-all duration-200">
                    {type.icon}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-4 flex flex-col gap-3">
                  <p className="font-inter text-[11px] uppercase tracking-widest text-white/30">{type.label}</p>
                  <h2 className="font-inter font-bold text-[clamp(20px,2.2vw,32px)] tracking-tight text-white leading-tight group-hover:opacity-60 transition-opacity duration-200">
                    {exp.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className={`font-inter font-bold text-[12px] uppercase tracking-wide ${status.className}`}>
                      {status.label}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="font-inter text-[12px] text-white/20">{exp.year}</span>
                  </div>
                </div>

                {/* Desc */}
                <div className="md:col-span-6">
                  <p className="body-text-ko !text-[15px] !text-white/50 leading-relaxed">{exp.desc}</p>
                </div>

                {/* Action */}
                <div className="md:col-span-1 flex items-center justify-end">
                  {isAvailable && (
                    <ArrowIcon className="text-white/30 group-hover:text-white transition-colors duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" size={16} />
                  )}
                </div>
              </div>
            );

            return exp.href ? (
              <Link key={exp.id} href={exp.href}>{inner}</Link>
            ) : (
              <div key={exp.id}>{inner}</div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
