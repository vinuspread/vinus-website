import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

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
      <section className="relative w-full h-[80vh] overflow-hidden bg-[#0a0a0a]">
        <Image 
          src={project.heroImg} 
          alt={project.title} 
          fill 
          className="object-cover opacity-80" 
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 p-page-padding pb-[80px] z-10 w-full">
          <p className="text-[14px] text-white/70 uppercase tracking-[0.2em] mb-6 font-inter">
            {project.services}
          </p>
          <h1 className="leading-[0.9] tracking-[-0.04em] text-white uppercase max-w-[1400px] font-inter font-light" style={{ fontSize: "clamp(60px, 8vw, 120px)" }}>
            {project.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? "font-bold" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          {project.subtitle && (
            <p className="text-[17px] text-white/60 uppercase tracking-[0.1em] mt-8 font-inter max-w-[800px] leading-relaxed">
              {project.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* 2. Meta Bar 섹션 */}
      <section className="px-page-padding bg-white border-b border-alto grid grid-cols-2 md:grid-cols-4">
        {[
          { label: "Year", value: project.year },
          { label: "Client", value: project.client },
          { label: "Services", value: project.services },
          { label: "Awards", value: project.awards ? `${project.awards} Awards` : "—" },
        ].map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex flex-col gap-4 py-[48px] ${i < 3 ? "border-r border-alto" : ""} ${i > 0 ? "pl-[40px]" : ""}`}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-mine-shaft/40 font-inter font-medium">{label}</p>
            <p className="text-[16px] leading-snug tracking-[-0.02em] font-medium text-mine-shaft">{value}</p>
          </div>
        ))}
      </section>

      {/* 3. Overview 섹션 */}
      <section className="px-page-padding py-[100px] md:py-[160px] grid grid-cols-1 md:grid-cols-12 gap-column border-b border-alto">
        <div className="md:col-span-3 mb-8 md:mb-0">
          <p className="text-[11px] text-mine-shaft/30 mb-3 font-inter font-bold tracking-widest">01</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-mine-shaft/40 font-inter font-bold">Overview</p>
        </div>
        <div className="md:col-span-9">
          <p className="text-[22px] md:text-[28px] font-semibold leading-[1.3] tracking-[-0.03em] text-mine-shaft break-keep max-w-[1000px]">
            {project.overview}
          </p>
        </div>
      </section>

      {/* 4. Background 섹션 */}
      {project.background && (
        <section className="px-page-padding py-[100px] md:py-[140px] grid grid-cols-1 md:grid-cols-12 gap-column border-b border-alto">
          <div className="md:col-span-3 mb-8 md:mb-0">
            <p className="text-[11px] text-mine-shaft/30 mb-3 font-inter font-bold tracking-widest">02</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-mine-shaft/40 font-inter font-bold">Background</p>
          </div>
          <div className="md:col-span-7">
            <p className="text-[15px] font-normal leading-[1.7] tracking-[-0.01em] text-mine-shaft/70 break-keep">
              {project.background}
            </p>
          </div>
        </section>
      )}

      {/* 5. Approach 섹션 */}
      {project.approach && (
        <section className="px-page-padding py-[100px] md:py-[140px] grid grid-cols-1 md:grid-cols-12 gap-column border-b border-alto">
          <div className="md:col-span-3 mb-8 md:mb-0">
            <p className="text-[11px] text-mine-shaft/30 mb-3 font-inter font-bold tracking-widest">03</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-mine-shaft/40 font-inter font-bold">Approach</p>
          </div>
          <div className="md:col-span-7">
            <p className="text-[15px] font-normal leading-[1.7] tracking-[-0.01em] text-mine-shaft/70 break-keep">
              {project.approach}
            </p>
          </div>
        </section>
      )}

      {/* 6. 이미지 갤러리 */}
      <div className="flex flex-col gap-4 py-[40px] md:py-[80px]">
        {project.images.map((img, i) => (
          <div key={i} className={`w-full relative ${i % 3 === 0 ? "aspect-[16/9]" : "px-page-padding"}`}>
             {i % 3 === 0 ? (
                <Image src={img} alt="" fill className="object-cover" />
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="aspect-[4/3] relative">
                      <Image src={img} alt="" fill className="object-cover" />
                   </div>
                   {project.images[i+1] && (
                      <div className="aspect-[4/3] relative">
                        <Image src={project.images[i+1]} alt="" fill className="object-cover" />
                      </div>
                   )}
                </div>
             )}
          </div>
        ))}
      </div>

      {/* 7. Next Project 섹션 */}
      <section className="px-page-padding pt-[120px] pb-[40px] border-t border-alto">
         <p className="text-[11px] uppercase tracking-wider text-mine-shaft/40 font-inter mb-12 text-center">Next Project</p>
         <Link
            href={`/work/${nextProject.slug}`}
            className="block relative w-full h-[60vh] md:h-[80vh] overflow-hidden group rounded-lg"
         >
            <Image
               src={nextProject.heroImg}
               alt={nextProject.title}
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-page-padding">
               <h2 className="text-[60px] md:text-[100px] leading-tight tracking-[-4px] text-white uppercase font-inter font-bold">
                  {nextProject.title}
               </h2>
               <span className="mt-8 text-[14px] uppercase tracking-[0.2em] text-white/80 border border-white/40 px-8 py-3 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                  View Project
               </span>
            </div>
         </Link>
      </section>
    </main>
  );
}
