import Image from "next/image";
import Link from "next/link";

const project = {
  title: "Freshman",
  client: "Freshman",
  year: "2024",
  number: "002",
  services: ["Strategy", "Brand Identity", "Digital Design", "Web Development", "Creative Direction"],
  challenge:
    "Freshman approached us to create a digital brand system that would resonate with a new generation of sneaker culture enthusiasts. The objective was to build a cohesive identity across all digital touchpoints while maintaining an authentic street-level aesthetic.",
  deliverables: ["Design System", "E-Commerce", "Brand Identity", "Motion"],
  images: [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1800&h=1200&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=700&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&h=700&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1800&h=1200&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=700&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&h=700&fit=crop&auto=format&q=80",
  ],
};

export default function DemoB() {
  return (
    <div className="bg-white min-h-screen">

      {/* Demo Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        <Link href="/work/demo-a" className="bg-white/80 backdrop-blur text-mine-shaft text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-white transition-colors">A — Editorial</Link>
        <span className="bg-mine-shaft text-gallery text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider">B — Grid</span>
        <Link href="/work/demo-c" className="bg-white/80 backdrop-blur text-mine-shaft text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-white transition-colors">C — Immersive</Link>
      </div>

      {/* 히어로 이미지 풀스크린 */}
      <div className="relative w-full h-screen">
        <Image src={project.images[0]} alt={project.title} fill className="object-cover" />
        {/* 좌하단 */}
        <div className="absolute bottom-0 left-0 right-0 px-page-padding pb-[48px] flex items-end justify-between">
          <h1 className="text-[80px] leading-none tracking-[-2.5px] text-white uppercase">
            {project.title}
          </h1>
          <p className="text-[13px] text-white/60 uppercase tracking-wider mb-2">{project.number}</p>
        </div>
      </div>

      {/* 고정 메타 바 */}
      <section className="px-page-padding border-b border-alto grid grid-cols-12 divide-x divide-alto">
        {[
          { label: "Client", value: project.client },
          { label: "Year", value: project.year },
          { label: "Services", value: project.services.join(" — ") },
          { label: "Deliverables", value: project.deliverables.join(" — ") },
        ].map(({ label, value }, i) => (
          <div
            key={label}
            className={`py-6 px-6 ${i === 0 ? "col-span-2 pl-0" : i === 2 ? "col-span-4" : "col-span-3"}`}
          >
            <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mb-2">{label}</p>
            <p className="text-[13px] leading-snug">{value}</p>
          </div>
        ))}
      </section>

      {/* 챌린지 텍스트 — 8열 그리드 */}
      <section className="px-page-padding py-[100px] grid grid-cols-8 gap-column">
        <div className="col-span-1">
          <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mt-1">01</p>
        </div>
        <div className="col-span-1">
          <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mt-1">Challenge</p>
        </div>
        <div className="col-span-5 col-start-4">
          <p className="text-[20px] font-light leading-[1.5] tracking-[-0.3px]">
            {project.challenge}
          </p>
        </div>
      </section>

      {/* 이미지 그리드 — 엄격한 2열 */}
      <div className="px-page-padding grid grid-cols-2 gap-4 pb-4">
        <div className="aspect-[4/3] relative">
          <Image src={project.images[1]} alt="" fill className="object-cover" />
        </div>
        <div className="aspect-[4/3] relative">
          <Image src={project.images[2]} alt="" fill className="object-cover" />
        </div>
      </div>

      {/* 풀너비 이미지 */}
      <div className="px-page-padding pb-4">
        <div className="w-full aspect-[16/7] relative">
          <Image src={project.images[3]} alt="" fill className="object-cover" />
        </div>
      </div>

      {/* 텍스트 + 이미지 구분선 섹션 */}
      <section className="px-page-padding py-[100px] grid grid-cols-8 gap-column border-t border-alto">
        <div className="col-span-1">
          <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mt-1">02</p>
        </div>
        <div className="col-span-1">
          <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mt-1">Brand Identity</p>
        </div>
        <div className="col-span-5 col-start-4">
          <p className="text-[20px] font-light leading-[1.5] tracking-[-0.3px]">
            We developed a visual language rooted in movement and texture — drawing from the raw energy of street culture and translating it into a refined digital aesthetic.
          </p>
        </div>
      </section>

      {/* 3열 이미지 그리드 */}
      <div className="px-page-padding grid grid-cols-3 gap-4 pb-[120px]">
        {[project.images[4], project.images[5], project.images[1]].map((src, i) => (
          <div key={i} className="aspect-[4/3] relative">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Next Project */}
      <section className="px-page-padding py-[80px] border-t border-alto grid grid-cols-8 gap-column items-center">
        <div className="col-span-2">
          <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40">Next Project</p>
          <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40">003</p>
        </div>
        <Link href="/work/demo-b" className="col-span-6 flex items-center justify-between group hover:opacity-60 transition-opacity">
          <span className="text-[46px] leading-none tracking-[-1.5px] uppercase">Lo2s</span>
          <span className="text-[28px]">→</span>
        </Link>
      </section>
    </div>
  );
}
