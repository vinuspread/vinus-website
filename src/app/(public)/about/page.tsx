"use client";

import React from "react";
import Image from "next/image";
import { ServiceRow } from "@/components/sections/ServiceRow";
import { useReveal } from "@/hooks/useReveal";
import { PageHeader } from "@/components/common/PageHeader";

const services = [
  { title: "Research", items: ["Customer Research", "User Testing", "Competitive Analysis", "Trends Analysis", "Brand Audit"] },
  { title: "Strategy", items: ["Brand Strategy", "Digital Strategy", "Content Strategy", "Go-to-Market", "Product Roadmap"] },
  { title: "Design", items: ["Brand Identity", "UI/UX Design", "Motion Design", "Design System", "Concept Design"] },
  { title: "Development", items: ["Web Development", "React / Next.js", "E-Commerce", "CMS Integration", "Performance Optimization"] },
  { title: "Content", items: ["Copywriting", "Photography Direction", "Video Production", "Social Content", "SEO"] },
];

const team = [
  { 
    name: "Jin Woo", 
    role: "Founder & Creative Director", 
    interest: "Design Strategy — Brand Identity", 
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format&q=80&grayscale" 
  },
  { 
    name: "Hye Min", 
    role: "Design Lead", 
    interest: "UX/UI Design — Motion Graphics", 
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop&auto=format&q=80&grayscale" 
  },
  { 
    name: "Sung Ho", 
    role: "Strategy Director", 
    interest: "Market Research — Business Development", 
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop&auto=format&q=80&grayscale" 
  },
  { 
    name: "Ji Won", 
    role: "Account Manager", 
    interest: "Client Relations — Project Management", 
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop&auto=format&q=80&grayscale" 
  },
];

export default function AboutPage() {
  const imageBreakRef = useReveal();
  const servicesRef = useReveal();
  const statsRef = useReveal();
  const teamRef = useReveal();
  const collabRef = useReveal();
  const infoRef = useReveal();

  return (
    <main className="bg-white">
      {/* 1. Page Header */}
      <PageHeader
        breadcrumb="Vinuspread"
        title={<>Spread the <span className="font-bold">Beautiful</span> Things</>}
        description={
          <>
            <span className="block">아름다운 바이러스를 세상에 퍼뜨립니다.</span>
            <span className="block mt-[4px]">우리가 창조하는 시각적인 결과물이 오늘보다 내일을 더 아름답게 만들거라 믿습니다.</span>
          </>
        }
      />

      {/* 1-1. Location & Image */}
      <section ref={infoRef as any} className="anim-wrap px-page-padding pb-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-column">
          <div className="md:col-span-5" />
          <div className="md:col-span-3">
            <div className="aspect-[4/5] relative overflow-hidden anim-clip">
              <div className="anim-move-up-img w-full h-full relative" data-delay="200">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop&auto=format&q=80"
                  alt="Studio atmosphere"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1-2. Large Image Break */}
      <section ref={imageBreakRef as any} className="anim-wrap px-page-padding pb-[120px]">
        <div className="w-full aspect-[21/9] relative overflow-hidden anim-clip">
          <div className="anim-move-up-img w-full h-full relative" data-delay="0">
            <Image 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop&auto=format&q=80" 
              alt="Workspace" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </section>

      {/* 2. Services 아코디언 섹션 */}
      <section ref={servicesRef as any} className="anim-wrap px-page-padding border-t border-alto">
        <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40 py-[40px] anim-clip block">
          <span className="anim-move-up">Services</span>
        </p>
        <div className="pb-[80px]">
          {services.map((service, i) => (
            <ServiceRow key={service.title} index={i} service={service} />
          ))}
          <div className="border-t border-alto" />
        </div>
      </section>

      {/* 3. Stats 섹션 */}
      <section ref={statsRef as any} className="anim-wrap px-page-padding py-[120px] border-t border-alto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-alto">
        {[
          { number: "08", label: "Team Members" },
          { number: "60+", label: "Projects Delivered" },
          { number: "02", label: "Office Locations" },
        ].map(({ number, label }, i) => (
          <div key={label} className="px-0 md:px-[60px] py-8 md:py-0 first:pl-0 last:pr-0">
            <p className="text-[82.5px] leading-none tracking-[-3px] mb-4 anim-clip block">
              <span className="anim-move-up" data-delay={i * 100}>{number}</span>
            </p>
            <p className="text-[15px] font-light text-mine-shaft/60 uppercase tracking-wider anim-clip block">
              <span className="anim-move-up" data-delay={i * 100 + 50}>{label}</span>
            </p>
          </div>
        ))}
      </section>

      {/* 4. Team 섹션 */}
      <section ref={teamRef as any} className="anim-wrap px-page-padding py-[80px] border-t border-alto">
        <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40 mb-[60px] anim-clip block">
          <span className="anim-move-up">Team</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[24px] md:gap-x-[38.4px] gap-y-[60px]">
          {team.map((member, i) => (
            <div key={member.name} className="group">
              <div className="aspect-[4/5] relative mb-6 overflow-hidden bg-alto anim-clip w-full">
                <div className="anim-move-up-img w-full h-full relative" data-delay={i * 100}>
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="anim-clip block">
                  <h3 className="text-[20px] md:text-[24px] tracking-[-0.5px] uppercase leading-none anim-move-up" data-delay={i * 100 + 100}>
                    {member.name}
                  </h3>
                </div>
                <div className="anim-clip block">
                  <p className="text-[13px] text-mine-shaft/50 uppercase tracking-wider anim-move-up" data-delay={i * 100 + 150}>
                    {member.role}
                  </p>
                </div>
                <div className="anim-clip block mt-1">
                  <p className="text-[12px] text-mine-shaft/30 anim-move-up leading-tight" data-delay={i * 100 + 200}>
                    {member.interest}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Collaboration 섹션 */}
      <section ref={collabRef as any} className="anim-wrap px-page-padding py-[160px] border-t border-alto">
        <div className="flex flex-col gap-8 max-w-[700px]">
          <p className="text-[46.8px] leading-none tracking-[-1.5px] uppercase font-inter font-bold">
            <span className="anim-clip block">
              <span className="anim-move-up">We turn ideas into real products.</span>
            </span>
          </p>
          <p className="text-[18px] font-medium leading-[1.6] tracking-[-0.3px] text-mine-shaft/60">
            <span className="anim-clip block">
              <span className="anim-move-up" data-delay="100">
                기획·디자인·개발·AI를 하나의 흐름으로 연결하여,<br />
                사용자와 비즈니스 모두에게 가치 있는 경험을 만듭니다.
              </span>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
