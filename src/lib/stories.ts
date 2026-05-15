export type Story = {
  slug: string;
  title: string;
  category: "Story" | "Notice" | "Etc";
  date: string;
  summary: string;
  thumbnail?: string;
  content?: string; // HTML or Markdown content
};

export const stories: Story[] = [
  {
    slug: "first-story",
    title: "바이너스프레드를 소개합니다",
    category: "Story",
    date: "2025.01.10",
    summary: "디자인 스튜디오 바이너스프레드의 첫 번째 이야기입니다.",
    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&h=1080&fit=crop&auto=format&q=80",
    content: `
      <h2>시작하는 이야기</h2>
      <p>바이너스프레드는 단순한 디자인 에이전시를 넘어, 브랜드의 본질을 탐구하고 디지털 환경에서의 새로운 가치를 창출하는 크리에이티브 파트너입니다.</p>
      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&q=80" alt="Studio" />
      <p>우리는 비즈니스의 문제를 디자인의 시각에서 정의하고, 사용자의 경험을 통해 해결책을 제시합니다. 모든 프로젝트는 깊은 리서치와 전략적 사고에서 시작됩니다.</p>
      <blockquote>
        "디자인은 단순한 장식이 아니라, 브랜드와 사용자가 만나는 가장 강력한 언어입니다."
      </blockquote>
      <p>앞으로 이 공간을 통해 우리의 작업 과정, 고민, 그리고 우리가 세상을 바라보는 시선을 공유하고자 합니다.</p>
    `,
  },
  {
    slug: "design-philosophy",
    title: "우리가 디자인을 대하는 방식",
    category: "Story",
    date: "2025.02.03",
    summary: "본질에 집중하고 아름다움을 더하는 바이너스프레드의 디자인 철학을 공유합니다.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=1080&fit=crop&auto=format&q=80",
    content: `
      <h2>본질(Essence)에 대하여</h2>
      <p>우리는 디자인을 할 때 가장 먼저 '왜(Why)'를 묻습니다. 이 브랜드가 왜 존재해야 하는지, 이 기능이 왜 필요한지를 정의하지 않은 디자인은 힘을 잃기 때문입니다.</p>
      <h3>1. 복잡함을 덜어내는 일</h3>
      <p>좋은 디자인은 더하는 것이 아니라 빼는 과정에서 완성됩니다. 사용자가 핵심 가치에 집중할 수 있도록 불필요한 노이즈를 제거하는 것이 우리의 첫 번째 원칙입니다.</p>
      <h3>2. 감각적인 경험의 전달</h3>
      <p>논리적인 구조 위에 감각적인 아름다움을 더합니다. 시각적인 즐거움은 사용자가 브랜드를 신뢰하고 사랑하게 만드는 강력한 요소입니다.</p>
      <p>우리는 지속 가능한 가치를 믿습니다. 유행을 따르기보다 시간이 흘러도 변하지 않는 클래식한 가치를 디지털 환경에 녹여내고자 노력합니다.</p>
    `,
  },
  {
    slug: "2025-open",
    title: "2025년 프로젝트 문의 오픈",
    category: "Notice",
    date: "2025.01.02",
    summary: "2025년 신규 프로젝트 문의를 받습니다.",
    content: `
      <p>안녕하세요, 바이너스프레드입니다.</p>
      <p>2025년 상반기 신규 프로젝트 협업 문의를 받기 시작했습니다. 브랜딩, UI/UX 디자인, 웹 개발 등 다양한 분야에서의 파트너십을 환영합니다.</p>
      <p>문의는 상단 Contact 메뉴 또는 아래 이메일을 통해 전달해 주시기 바랍니다.</p>
      <p><strong>Email: vinus@vinus.co.kr</strong></p>
      <p>보내주신 소중한 제안은 검토 후 영업일 기준 2~3일 이내에 답변드리겠습니다. 감사합니다.</p>
    `,
  },
];
