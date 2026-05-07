import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { DoubleButton } from "@/components/common/DoubleButton";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found — DashDigital®" };
  return { title: `${project.title} — DashDigital®` };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="bg-gallery">
      {/* 1. Hero 섹션 */}
      <section className="relative w-full h-screen overflow-hidden">
        <Image 
          src={project.heroImg} 
          alt={project.title} 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute bottom-0 left-0 p-page-padding pb-[60px] z-10 w-full bg-gradient-to-t from-black/50 to-transparent">
          <p className="text-[13px] text-white/70 uppercase tracking-[-0.3px] mb-3">
            {project.services}
          </p>
          <h1 className="text-[56px] md:text-[96px] leading-[0.9] tracking-[-3px] text-white uppercase max-w-[900px]">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-[15px] text-white/50 uppercase tracking-wider mt-2">
              {project.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* 2. Meta Bar 섹션 */}
      <section className="px-page-padding bg-white border-b border-alto grid grid-cols-2 md:grid-cols-4">
        {[
          { label: "Client", value: project.client },
          { label: "Year", value: project.year },
          { label: "Services", value: project.services },
          { label: "Awards", value: project.awards ? `${project.awards} Awards` : "—" },
        ].map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex flex-col gap-3 py-[40px] pr-[40px] ${i < 3 ? "border-r border-alto" : ""} ${i > 0 ? "pl-[40px] pr-0 md:pr-[40px]" : ""}`}
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-mine-shaft/40 font-inter">{label}</p>
            <p className="text-[16px] leading-snug tracking-[-0.3px]">{value}</p>
          </div>
        ))}
      </section>

      {/* 3. Overview 섹션 */}
      <section className="px-page-padding py-[80px] md:py-[120px] grid grid-cols-1 md:grid-cols-8 gap-column border-b border-alto">
        <div className="md:col-span-2 mb-8 md:mb-0">
          <p className="text-[11px] text-mine-shaft/30 mb-2 font-inter">01</p>
          <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Overview</p>
        </div>
        <div className="md:col-span-5">
          <p className="text-[22px] md:text-[26px] font-medium leading-[1.45] tracking-[-0.5px]">
            {project.overview}
          </p>
        </div>
      </section>

      {/* 4. Background 섹션 */}
      {project.background && (
        <section className="px-page-padding py-[80px] md:py-[120px] grid grid-cols-1 md:grid-cols-8 gap-column border-b border-alto">
          <div className="md:col-span-2 mb-8 md:mb-0">
            <p className="text-[11px] text-mine-shaft/30 mb-2 font-inter">02</p>
            <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Background</p>
          </div>
          <div className="md:col-span-5">
            <p className="text-[17px] md:text-[19px] font-light leading-[1.6] tracking-[-0.3px]">
              {project.background}
            </p>
          </div>
        </section>
      )}

      {/* 5. Approach 섹션 */}
      {project.approach && (
        <section className="px-page-padding py-[80px] md:py-[120px] grid grid-cols-1 md:grid-cols-8 gap-column border-b border-alto">
          <div className="md:col-span-2 mb-8 md:mb-0">
            <p className="text-[11px] text-mine-shaft/30 mb-2 font-inter">03</p>
            <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Approach</p>
          </div>
          <div className="md:col-span-5">
            <p className="text-[17px] md:text-[19px] font-light leading-[1.6] tracking-[-0.3px]">
              {project.approach}
            </p>
          </div>
        </section>
      )}

      {/* 4. 이미지 섹션 (반복 패턴) */}
      <div className="flex flex-col gap-4 pb-[120px]">
        {/* Full Width 1 */}
        <div className="w-full aspect-[16/9] relative">
          <Image src={project.images[0]} alt="" fill className="object-cover" />
        </div>

        {/* 2 Column Grid */}
        <div className="px-page-padding grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="aspect-[4/3] relative">
            <Image src={project.images[1]} alt="" fill className="object-cover" />
          </div>
          <div className="aspect-[4/3] relative">
            <Image src={project.images[2]} alt="" fill className="object-cover" />
          </div>
        </div>

        {/* Full Width 2 */}
        <div className="w-full aspect-[16/9] relative">
          <Image src={project.images[3]} alt="" fill className="object-cover" />
        </div>
      </div>

      {/* 6. Next Project 섹션 */}
      <Link
        href={`/work/${nextProject.slug}`}
        className="block relative w-full h-[50vh] md:h-[60vh] overflow-hidden group border-t border-alto"
      >
        <Image
          src={nextProject.heroImg}
          alt={nextProject.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
        <div className="absolute inset-0 flex flex-col justify-between p-page-padding py-[48px]">
          <p className="text-[11px] uppercase tracking-wider text-white/60">Next Project</p>
          <div className="flex items-end justify-between">
            <h2 className="text-[40px] md:text-[72px] leading-none tracking-[-2px] text-white uppercase max-w-[700px]">
              {nextProject.title}
            </h2>
            <span className="text-[32px] text-white group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </div>
      </Link>
    </main>
  );
}
