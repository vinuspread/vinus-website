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
        {/* 좌하단 오버레이 */}
        <div className="absolute bottom-0 left-0 p-page-padding pb-[60px] z-10 w-full bg-gradient-to-t from-black/50 to-transparent">
          <p className="text-[13px] text-white/70 uppercase tracking-[-0.3px] mb-3">
            {project.services}
          </p>
          <h1 className="text-[48px] md:text-[64px] leading-none tracking-[-2px] text-white uppercase max-w-[800px]">
            {project.title}
          </h1>
        </div>
      </section>

      {/* 2. Meta Bar 섹션 */}
      <section className="px-page-padding py-[48px] border-b border-alto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Client", value: project.client },
          { label: "Year", value: project.year },
          { label: "Services", value: project.services },
          { label: "Awards", value: project.awards ? `${project.awards} Awards` : "—" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40 mb-2">{label}</p>
            <p className="text-[15px] leading-snug">{value}</p>
          </div>
        ))}
      </section>

      {/* 3. Challenge (텍스트 섹션) */}
      <section className="px-page-padding py-[80px] md:py-[120px] grid grid-cols-1 md:grid-cols-8 gap-column">
        <div className="md:col-span-2 mb-8 md:mb-0">
          <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Challenge</p>
        </div>
        <div className="md:col-span-5">
          <p className="text-[22px] md:text-[26px] font-light leading-[1.4] tracking-[-0.4px]">
            {project.challenge}
          </p>
        </div>
      </section>

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

      {/* 5. Next Project 섹션 */}
      <section className="px-page-padding py-[80px] md:py-[120px] border-t border-alto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40">Next Project</p>
        <Link 
          href={`/work/${nextProject.slug}`} 
          className="group flex items-center gap-4 w-full md:w-auto"
        >
          <span className="text-[32px] md:text-[46px] tracking-[-1.5px] uppercase group-hover:opacity-60 transition-opacity leading-none">
            {nextProject.title}
          </span>
          <span className="text-[24px] group-hover:translate-x-2 transition-transform">→</span>
        </Link>
      </section>
    </main>
  );
}
