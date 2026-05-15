"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { ServiceRow } from "@/components/sections/ServiceRow";

const serviceCards = [
  {
    title: "Branding",
    description:
      "Branding is arguably the most important part of any business — big or small. We craft memorable identities that build trust, emotional connection, and lasting recognition across every touchpoint.",
    tags: ["Brand Identity", "Creative Direction", "Digital Design"],
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&h=1000&fit=crop&auto=format&q=80",
  },
  {
    title: "E-Commerce",
    description:
      "We create experiences that retain customers through strategy-driven direction grounded in UX principles — resulting in solutions that are both beautiful and functional, converting browsers into buyers.",
    tags: ["Strategy", "UX Design", "Development", "Shopify"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&h=1000&fit=crop&auto=format&q=80",
  },
  {
    title: "Websites",
    description:
      "We design and develop digital experiences with meaningful interactions that drive change — combining utility, intuitive design, and storytelling to connect brands with their audiences.",
    tags: ["UI/UX Design", "Web Development", "Motion Design"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1000&fit=crop&auto=format&q=80",
  },
];

const services = [
  {
    title: "Research",
    items: ["Customer Research", "Trends Analysis", "Competitor Review", "Best Practice Review", "Usability Research & Testing", "Market Research", "Analytics Reports"],
  },
  {
    title: "Strategy",
    items: ["Product Ideation", "Brand Positioning & Architecture", "Brand Naming & Strategy", "Target Audience Discovery", "Customer Journey Mapping", "Feature Definition", "Information Architecture", "Usability Audit & Review", "Post-Launch Strategy"],
  },
  {
    title: "Design",
    items: ["Art Direction", "Brand Identity Design", "Design Systems", "Graphic Design", "Wireframing", "UI Design", "UX Design", "Interaction Design", "3D Design", "Motion Design", "Digital Product Design", "Prototyping", "Packaging", "Quality Assurance"],
  },
  {
    title: "Development",
    items: ["Technical Strategy", "Technical Consulting", "CMS Implementation", "React / Next.js Development", "WebGL / 3D Development", "Shopify Development", "WordPress Development", "Webflow Development", "Cross-browser Testing", "Cross-device Testing", "SEO & Performance Optimisation", "Quality Assurance"],
  },
  {
    title: "Content",
    items: ["Copywriting", "SEO Copy Analysis & Refinement", "Thematic Keyword Research", "Social Media Design", "Content Management"],
  },
];

const awards = [
  { count: "45", name: "Awwwards" },
  { count: "10", name: "The FWA" },
  { count: "73", name: "CSS Design Awards" },
];

export default function ServicesPage() {
  const heroRef = useReveal();
  const cardsRef = useReveal();
  const accordionRef = useReveal();
  const awardsRef = useReveal();

  return (
    <div className="min-h-screen bg-gallery">

      {/* 1. Hero */}
      <section ref={heroRef as any} className="anim-wrap pt-[140px] pb-[120px] px-page-padding border-b border-alto">
        <div className="grid grid-cols-8 gap-column items-end">
          <div className="col-span-6">
            <h1 className="text-[82.5px] leading-none tracking-[-2.8px] uppercase">
              <div className="anim-clip overflow-hidden">
                <div className="anim-move-up" data-delay="0">Transforming ideas</div>
              </div>
              <div className="anim-clip overflow-hidden">
                <div className="anim-move-up" data-delay="100">into digital experiences</div>
              </div>
            </h1>
          </div>
          <div className="col-span-2 pb-2 flex flex-col gap-2">
            <div className="anim-clip overflow-hidden">
              <p className="anim-move-up text-[15px] font-light text-mine-shaft/60" data-delay="200">Creatively Driven</p>
            </div>
            <div className="anim-clip overflow-hidden">
              <p className="anim-move-up text-[15px] font-light text-mine-shaft/60" data-delay="300">Solution Orientated</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Cards — 풀너비 세로 스택 */}
      <section ref={cardsRef as any} className="anim-wrap">
        {serviceCards.map((card, i) => (
          <div key={card.title} className="border-b border-alto">
            {/* 이미지 */}
            <div className="w-full aspect-[16/7] relative anim-clip overflow-hidden">
              <div className="anim-move-up-img w-full h-full" data-delay={i * 100}>
                <Image src={card.img} alt={card.title} fill className="object-cover" />
              </div>
            </div>

            {/* 텍스트 */}
            <div className="px-page-padding py-[60px] grid grid-cols-8 gap-column">
              <div className="col-span-2">
                <div className="anim-clip overflow-hidden">
                  <h2 className="anim-move-up text-[46.8px] leading-none tracking-[-1.5px] uppercase" data-delay="0">
                    {card.title}
                  </h2>
                </div>
              </div>
              <div className="col-span-4 col-start-4">
                <div className="anim-clip overflow-hidden mb-6">
                  <p className="anim-move-up text-[17px] font-light leading-[1.6] tracking-[-0.3px]" data-delay="100">
                    {card.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="btn-front text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Services Unpacked 아코디언 */}
      <section ref={accordionRef as any} className="anim-wrap px-page-padding border-b border-alto">
        <div className="py-[60px] flex items-center justify-between border-b border-alto">
          <div className="anim-clip overflow-hidden">
            <h2 className="anim-move-up text-[46.8px] leading-none tracking-[-1.5px] uppercase">
              Services Unpacked
            </h2>
          </div>
        </div>
        <div className="pb-[80px]">
          {services.map((service, i) => (
            <ServiceRow key={service.title} index={i} service={service} />
          ))}
          <div className="border-t border-alto" />
        </div>
      </section>

      {/* 4. Awards */}
      <section ref={awardsRef as any} className="anim-wrap px-page-padding py-[120px] border-b border-alto">
        <div className="anim-clip overflow-hidden mb-[60px]">
          <p className="anim-move-up text-[11px] uppercase tracking-widest text-mine-shaft/40">
            Recognition
          </p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-alto">
          {awards.map(({ count, name }, i) => (
            <div key={name} className="px-[60px] first:pl-0 last:pr-0">
              <div className="anim-clip overflow-hidden">
                <p className="anim-move-up text-[82.5px] leading-none tracking-[-3px] mb-3" data-delay={i * 80}>
                  {count}
                </p>
              </div>
              <div className="anim-clip overflow-hidden">
                <p className="anim-move-up text-[15px] font-light text-mine-shaft/60" data-delay={i * 80 + 60}>
                  {name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="px-page-padding py-[160px]">
        <p className="text-[46.8px] leading-none tracking-[-1.5px] uppercase">
          <div className="anim-clip overflow-hidden">
            <div className="anim-move-up">Ready to build something</div>
          </div>
          <div className="anim-clip overflow-hidden">
            <div className="anim-move-up" data-delay="100">remarkable together?</div>
          </div>
        </p>
      </section>

    </div>
  );
}
