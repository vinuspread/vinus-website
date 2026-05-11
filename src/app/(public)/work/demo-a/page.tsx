import Image from "next/image";
import Link from "next/link";

const project = {
  title: "Freshman",
  client: "Freshman",
  year: "2024",
  services: "Strategy — Brand Identity — Digital Design — Web Development — Creative Direction",
  challenge:
    "Freshman approached us to create a digital brand system that would resonate with a new generation of sneaker culture enthusiasts. The objective was to build a cohesive identity across all digital touchpoints while maintaining an authentic street-level aesthetic.",
  images: [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1800&h=1200&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1800&h=1200&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&h=700&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&h=700&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1800&h=1000&fit=crop&auto=format&q=80",
  ],
};

export default function DemoA() {
  return (
    <div className="bg-white min-h-screen">

      {/* Demo Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        <span className="bg-mine-shaft text-gallery text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider">A — Editorial</span>
        <Link href="/work/demo-b" className="bg-white/80 backdrop-blur text-mine-shaft text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-white transition-colors">B — Grid</Link>
        <Link href="/work/demo-c" className="bg-white/80 backdrop-blur text-mine-shaft text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-white transition-colors">C — Immersive</Link>
      </div>

      {/* Hero — 대형 타이포그래피 */}
      <section className="pt-[56px] px-page-padding">
        <div className="border-b border-alto py-[80px]">
          <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40 mb-8">
            {project.services}
          </p>
          <h1
            className="uppercase leading-[0.88] tracking-[-4px] font-normal"
            style={{ fontSize: "clamp(64px, 11vw, 160px)" }}
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* 풀블리드 히어로 이미지 */}
      <div className="w-full aspect-[16/7] relative">
        <Image src={project.images[0]} alt={project.title} fill className="object-cover" />
      </div>

      {/* 메타 + 챌린지 — 비대칭 */}
      <section className="px-page-padding py-[120px] grid grid-cols-8 gap-column">
        <div className="col-span-2 flex flex-col gap-8">
          {[
            { label: "Client", value: project.client },
            { label: "Year", value: project.year },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mb-1">{label}</p>
              <p className="text-[15px]">{value}</p>
            </div>
          ))}
        </div>
        <div className="col-span-5 col-start-4">
          <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40 mb-6">Challenge</p>
          <p className="text-[26px] font-light leading-[1.35] tracking-[-0.5px]">
            {project.challenge}
          </p>
        </div>
      </section>

      {/* 이미지 + 텍스트 교차 — 비대칭 잡지 레이아웃 */}
      <section className="px-page-padding grid grid-cols-8 gap-column gap-y-4 pb-[120px]">
        {/* 큰 이미지 왼쪽 */}
        <div className="col-span-5 aspect-[5/4] relative">
          <Image src={project.images[1]} alt="" fill className="object-cover" />
        </div>
        <div className="col-span-3 flex flex-col justify-end pb-8 gap-4">
          <p className="text-[10px] uppercase tracking-widest text-mine-shaft/40">Brand Identity</p>
          <p className="text-[17px] font-light leading-[1.5] tracking-[-0.3px]">
            We developed a visual language rooted in movement and texture — drawing from the raw energy of street culture and translating it into a refined digital aesthetic.
          </p>
        </div>

        {/* 작은 이미지 2개 오른쪽 정렬 */}
        <div className="col-span-3 col-start-3 aspect-[4/3] relative">
          <Image src={project.images[2]} alt="" fill className="object-cover" />
        </div>
        <div className="col-span-3 aspect-[4/3] relative">
          <Image src={project.images[3]} alt="" fill className="object-cover" />
        </div>
      </section>

      {/* 풀너비 이미지 */}
      <div className="w-full aspect-[21/9] relative">
        <Image src={project.images[4]} alt="" fill className="object-cover" />
      </div>

      {/* Next Project */}
      <section className="px-page-padding py-[100px] border-t border-alto flex justify-between items-end">
        <p className="text-[11px] uppercase tracking-widest text-mine-shaft/40">Next Project</p>
        <Link href="/work/demo-a" className="group flex items-center gap-6 hover:opacity-60 transition-opacity">
          <span className="text-[46px] leading-none tracking-[-1.5px] uppercase">Lo2s</span>
          <span className="text-[28px]">→</span>
        </Link>
      </section>
    </div>
  );
}
