"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { Marquee } from "@/components/common/Marquee";
import { DetailNavBar } from "@/components/common/DetailNavBar";
import type { Project } from "@/lib/projects";

interface ProjectDetailProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

export function ProjectDetail({ project, prevProject, nextProject }: ProjectDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.from(".reveal-img", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      ScrollTrigger.batch(".scroll-reveal", {
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", overwrite: true }
          );
        },
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-white selection:bg-mine-shaft selection:text-white">
      <section data-header-dark className="relative w-full h-[90vh] min-h-[700px] overflow-hidden bg-black">
        <Image
          src={project.heroImg}
          alt={project.title}
          fill
          className="object-cover opacity-90 reveal-img"
          priority
          data-pin-nopin="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        <div className="absolute inset-0 flex flex-col justify-end pb-[10vh] px-page-padding">
          <div className="max-w-[1920px] mx-auto w-full">
            <div className="overflow-hidden">
              <h1 className="reveal-text leading-[0.85] tracking-[-0.05em] text-white uppercase font-inter font-bold" style={{ fontSize: "clamp(50px, 8vw, 140px)" }}>
                {project.title}
              </h1>
            </div>
            {project.subtitle && (
              <div className="overflow-hidden mt-8 max-w-[800px]">
                <p className="reveal-text text-[18px] md:text-[24px] text-white/70 font-inter font-light leading-relaxed">
                  {project.subtitle}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-alto bg-white">
        <div className="max-w-[1920px] mx-auto px-page-padding py-12 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
            {[
              { label: "Client", value: project.client },
              { label: "Category", value: project.category },
              { label: "Services", value: project.services },
              { label: "Awards", value: project.awards || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-4 scroll-reveal">
                <span className="text-[12px] uppercase tracking-normal text-mine-shaft/30 font-inter font-bold">
                  {label}
                </span>
                <span className="text-[20px] md:text-[24px] text-mine-shaft font-medium leading-tight">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[1920px] mx-auto px-page-padding py-24 md:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-20">
            <div className="lg:col-span-4 scroll-reveal">
              <div className="mb-8">
                <span className="text-[12px] uppercase font-bold text-mine-shaft/40 font-inter tracking-normal">Overview</span>
              </div>
            </div>
            <div className="lg:col-span-8 scroll-reveal">
              <h2 className="text-[32px] md:text-[54px] font-medium leading-[1.1] tracking-[-0.04em] text-mine-shaft mb-12 break-keep">
                {project.overview}
              </h2>
              <div className="h-[1px] w-full bg-alto mb-12" />
            </div>

            {(project.background || project.goal) && (
              <>
                <div className="lg:col-span-4 scroll-reveal">
                  <div className="mb-8">
                    <span className="text-[12px] uppercase font-bold text-mine-shaft/40 font-inter tracking-normal">
                      {project.goal ? "Goal" : "Background"}
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-7 scroll-reveal">
                  <p className="text-[18px] md:text-[24px] font-normal leading-[1.5] text-mine-shaft/80 break-keep">
                    {project.goal || project.background}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {project.vision && (
        <section className="bg-gallery py-24 md:py-48">
          <div className="max-w-[1920px] mx-auto px-page-padding">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-[clamp(40px,8vw,120px)] font-bold uppercase tracking-[-0.05em] text-mine-shaft mb-12 leading-none scroll-reveal">
                {project.vision.text}
              </h3>
              <p className="max-w-[800px] text-[18px] md:text-[22px] text-mine-shaft/60 leading-relaxed break-keep scroll-reveal">
                {project.vision.subtext}
              </p>
            </div>
          </div>
        </section>
      )}

      {project.concept && (
        <section className="bg-white py-24 md:py-48 border-b border-alto">
          <div className="max-w-[1920px] mx-auto px-page-padding">
            <div className="mb-24 md:mb-48 max-w-[1000px]">
              <span className="text-[12px] uppercase font-bold text-mine-shaft/30 tracking-normal block mb-8 scroll-reveal">
                Design Concept
              </span>
              <h3 className="text-[32px] md:text-[64px] font-medium tracking-[-0.04em] text-mine-shaft leading-[1.1] break-keep scroll-reveal">
                {project.concept.text}
              </h3>
              <p className="mt-8 text-[18px] md:text-[22px] text-mine-shaft/50 max-w-[700px] break-keep scroll-reveal">
                {project.concept.subtext}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              {project.concept.items.map((item, i) => (
                <div key={i} className="scroll-reveal group">
                  <div className="aspect-[3/4] relative bg-gallery overflow-hidden mb-8">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h4 className="text-[20px] md:text-[24px] font-bold text-mine-shaft mb-4 uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[15px] md:text-[17px] text-mine-shaft/60 break-keep">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="py-12 md:py-24 border-t border-b border-alto overflow-hidden">
        <Marquee
          text={`${project.title.toUpperCase()} • ${project.category.toUpperCase()} • `}
          speed={100}
          className="text-[clamp(60px,10vw,180px)] font-bold text-mine-shaft/5 tracking-tighter"
        />
      </div>

      <section className="bg-white py-24 md:py-48">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-24 md:gap-48">
            {(project.images ?? []).map((img, i) => (
              <div key={i} className="scroll-reveal px-page-padding md:px-0">
                {i % 3 === 0 ? (
                  <div className="relative w-full aspect-[21/9] bg-gallery overflow-hidden">
                    <Image
                      src={img}
                      alt={`${project.title} detail ${i}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
                      data-pin-nopin="true"
                    />
                  </div>
                ) : i % 3 === 1 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 max-w-[1600px] mx-auto">
                    <div className="relative aspect-[4/5] bg-gallery overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.title} detail ${i}`}
                        fill
                        className="object-cover"
                        data-pin-nopin="true"
                      />
                    </div>
                    {project.images?.[i + 1] && (
                      <div className="relative aspect-[4/5] bg-gallery overflow-hidden mt-20 md:mt-40">
                        <Image
                          src={project.images[i + 1]!}
                          alt={`${project.title} detail ${i + 1}`}
                          fill
                          className="object-cover"
                          data-pin-nopin="true"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="max-w-[1400px] mx-auto relative aspect-[16/10] bg-gallery overflow-hidden">
                    <Image
                      src={img}
                      alt={`${project.title} detail ${i}`}
                      fill
                      className="object-cover"
                      data-pin-nopin="true"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <DetailNavBar
        prev={{ slug: `/work/${prevProject.slug}`, title: prevProject.title }}
        next={{ slug: `/work/${nextProject.slug}`, title: nextProject.title }}
        listHref="/work"
        listLabel="All Work"
      />
    </main>
  );
}
