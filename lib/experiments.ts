export type ExpType = "interactive" | "film" | "download" | "research";

export type Experiment = {
  id: string;
  title: string;
  type: ExpType;
  tags: string[];
  desc: string;
  status: "ongoing" | "available" | "archived";
  year: string;
  href?: string;
  // detail page fields
  subtitle?: string;
  heroImage?: string;
  content?: string; // HTML
  sections?: {
    label?: string;
    heading?: string;
    body?: string;
    image?: string;
    imageAlt?: string;
    imageAspect?: string;
  }[];
};

export const experiments: Experiment[] = [
  {
    id: "01",
    title: "Motion Studies",
    type: "interactive",
    tags: ["GSAP", "WebGL", "Interaction"],
    desc: "스크롤과 커서의 움직임을 기반으로 한 모션 실험. 인터랙션이 어떻게 감정을 만드는지 탐구합니다.",
    status: "ongoing",
    year: "2025",
    href: "/lab/01",
    subtitle: "How does motion create emotion?",
    heroImage: "/images/story_ui_design.png",
    sections: [
      {
        label: "Overview",
        heading: "움직임이 만드는 감정",
        body: "스크롤, 커서, 속도 — 이 세 가지 변수가 어떻게 감정적 경험을 형성하는지 탐구하는 실험입니다. GSAP와 WebGL을 기반으로 구성된 인터랙티브 캔버스에서 사용자의 입력이 시각적 언어로 변환됩니다.",
      },
      {
        label: "Concept",
        heading: "The Physics of Feeling",
        body: "우리는 흔히 디자인을 시각적 결과물로만 이해합니다. 하지만 움직임은 그 자체로 메시지를 전달합니다. 가속도, 감속, 무게감 — 이러한 물리적 속성들이 사용자의 감정 반응에 직접적인 영향을 미친다는 가설을 중심으로 실험을 설계했습니다.",
        image: "/images/story_branding.png",
        imageAlt: "Motion concept study",
        imageAspect: "aspect-[16/9]",
      },
      {
        label: "Method",
        heading: "실험 방법론",
        body: "총 3가지 프로토타입을 통해 동일한 콘텐츠에 다른 모션 언어를 적용하고, 사용자 반응을 측정했습니다. 빠르고 선형적인 움직임, 느리고 탄성 있는 움직임, 그리고 무작위적인 움직임이 각각 어떤 감정을 유도하는지 관찰합니다.",
      },
    ],
  },
  {
    id: "02",
    title: "Brand in Motion — Film",
    type: "film",
    tags: ["Interactive Film", "Narrative", "Brand"],
    desc: "브랜드 아이덴티티를 인터랙티브 무비 형식으로 탐구한 실험적 프로젝트. 선택에 따라 이야기가 달라집니다.",
    status: "available",
    year: "2025",
    href: "/lab/02",
    subtitle: "A brand story that changes with your choices.",
    heroImage: "/images/story_studio.png",
    sections: [
      {
        label: "Overview",
        heading: "선택이 만드는 브랜드 서사",
        body: "이 프로젝트는 브랜드 아이덴티티를 정적인 가이드라인이 아닌, 살아있는 이야기로 표현하는 시도입니다. 사용자의 선택에 따라 브랜드의 다른 면이 드러나는 인터랙티브 필름 형식을 탐구했습니다.",
      },
      {
        label: "Concept",
        heading: "브랜드는 하나의 이야기다",
        body: "강력한 브랜드는 단순한 로고나 컬러를 넘어서 사람들이 공감할 수 있는 이야기를 가집니다. 우리는 이 이야기를 인터랙티브 무비라는 새로운 형식으로 전달할 수 있다고 믿습니다.",
        image: "/images/story_studio.png",
        imageAlt: "Brand film storyboard",
        imageAspect: "aspect-[21/9]",
      },
    ],
  },
  {
    id: "03",
    title: "Design System Kit",
    type: "download",
    tags: ["Figma", "Free Download", "System"],
    desc: "실무에서 사용하는 디자인 시스템 구성 요소를 정리한 Figma 키트. 누구나 무료로 사용할 수 있습니다.",
    status: "available",
    year: "2025",
    href: "/lab/03",
    subtitle: "A practical Figma kit built for real projects.",
    heroImage: "/images/story_ui_design.png",
    sections: [
      {
        label: "Overview",
        heading: "실무 기반 디자인 시스템",
        body: "수십 개의 실제 프로젝트를 통해 검증된 디자인 시스템 구성 요소를 Figma 키트 형태로 정리했습니다. 컬러 토큰, 타이포그래피 스케일, 공통 컴포넌트, 아이콘 세트를 포함합니다.",
      },
      {
        label: "What's Included",
        heading: "구성 내용",
        body: "Color Tokens · Typography Scale · Spacing System · Button Variants · Form Components · Icon Set (200+) · Layout Templates · Dark Mode Support",
      },
    ],
  },
  {
    id: "04",
    title: "AI × Visual Identity",
    type: "research",
    tags: ["Generative", "AI", "Research"],
    desc: "AI와 브랜드 아이덴티티의 접점을 탐색합니다. 생성형 이미지와 디자인 시스템의 결합 가능성을 실험합니다.",
    status: "ongoing",
    year: "2025",
    href: "/lab/04",
    subtitle: "Can AI understand brand personality?",
    heroImage: "/images/story_branding.png",
    sections: [
      {
        label: "Research Question",
        heading: "AI는 브랜드 개성을 이해할 수 있는가",
        body: "생성형 AI가 단순히 이미지를 만드는 것을 넘어, 특정 브랜드의 시각적 언어를 학습하고 일관된 아이덴티티를 유지하며 새로운 콘텐츠를 생성할 수 있는지 탐구합니다.",
      },
    ],
  },
  {
    id: "05",
    title: "Typography Specimen",
    type: "download",
    tags: ["Variable Font", "PDF", "Type"],
    desc: "바이너스프레드가 선정한 타이포그래피 스페시멘. 폰트 선택 기준과 사용 가이드를 담은 PDF 자료입니다.",
    status: "available",
    year: "2024",
    href: "/lab/05",
    subtitle: "Fonts we love, and how we use them.",
    heroImage: "/images/story_studio.png",
    sections: [
      {
        label: "Overview",
        heading: "타이포그래피 선택의 기준",
        body: "바이너스프레드가 실제 프로젝트에서 사용한 타이포그래피를 정리했습니다. 각 폰트의 특성, 사용 상황, 페어링 가이드를 담은 PDF 스페시멘입니다.",
      },
    ],
  },
];

export const typeConfig: Record<ExpType, { label: string; icon: string }> = {
  interactive: { label: "Interactive",      icon: "↗" },
  film:        { label: "Interactive Film", icon: "▶" },
  download:    { label: "Download",         icon: "↓" },
  research:    { label: "Research",         icon: "○" },
};

export const statusConfig: Record<string, { label: string; className: string }> = {
  ongoing:   { label: "Ongoing",   className: "text-white/40" },
  available: { label: "Available", className: "text-white" },
  archived:  { label: "Archived",  className: "text-white/20" },
};
