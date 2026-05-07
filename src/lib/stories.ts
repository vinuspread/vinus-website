export type Story = {
  slug: string;
  title: string;
  category: "Story" | "Notice" | "Etc";
  date: string;      // "2025.01.15" 형식
  summary: string;
  thumbnail?: string;
};

export const stories: Story[] = [
  {
    slug: "first-story",
    title: "바이너스프레드를 소개합니다",
    category: "Story",
    date: "2025.01.10",
    summary: "디자인 스튜디오 바이너스프레드의 첫 번째 이야기입니다.",
    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=500&fit=crop&auto=format&q=80",
  },
  {
    slug: "design-philosophy",
    title: "우리가 디자인을 대하는 방식",
    category: "Story",
    date: "2025.02.03",
    summary: "본질에 집중하고 아름다움을 더하는 바이너스프레드의 디자인 철학을 공유합니다.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop&auto=format&q=80",
  },
  {
    slug: "2025-open",
    title: "2025년 프로젝트 문의 오픈",
    category: "Notice",
    date: "2025.01.02",
    summary: "2025년 신규 프로젝트 문의를 받습니다.",
  },
];
