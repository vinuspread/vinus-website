import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ProjectDetail } from "./ProjectDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <ProjectDetail
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
