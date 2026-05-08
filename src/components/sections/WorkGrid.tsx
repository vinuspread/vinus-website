"use client";

import { useReveal } from "@/hooks/useReveal";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/common/ProjectCard";

type Category = "All" | "UI/UX" | "Character/Illustration" | "Branding" | "Etc";

interface WorkGridProps {
  filter?: Category;
  limit?: number;
}

export const WorkGrid = ({ filter = "All", limit }: WorkGridProps) => {
  const revealRef = useReveal();

  const filtered = (filter === "All" ? projects : projects.filter((p) => p.category === filter))
    .slice(0, limit);

  return (
    <div ref={revealRef as any} className="anim-wrap grid grid-cols-1 md:grid-cols-2">
      {filtered.map((project, i) => (
        <ProjectCard
          key={project.slug}
          src={project.heroImg}
          alt={project.title}
          category={project.services}
          title={project.title}
          href={`/work/${project.slug}`}
          index={i}
          className=""
        />
      ))}
    </div>
  );
};
