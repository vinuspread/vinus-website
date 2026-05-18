export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  services: string;
  heroImg: string;
  images?: string[];
  overview?: string;
  background?: string;
  approach?: string;
  goal?: string;
  vision?: {
    text: string;
    subtext: string;
  };
  concept?: {
    text: string;
    subtext: string;
    items: { title: string; desc: string; img: string }[];
  };
  year?: string;
  client?: string;
  awards?: string;
}

export const projects: Project[] = [
  {
    slug: "luxury-fragrance-branding",
    title: "Aura Fragrance",
    category: "Branding",
    services: "Brand Identity — Packaging Design",
    heroImg: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80",
    year: "2024",
    client: "Aura Parfums",
  },
  {
    slug: "tech-interface-design",
    title: "NextGen UI",
    subtitle: "Redefining digital interactions for the next generation of users.",
    category: "UI/UX",
    services: "Digital Design — Web Development",
    heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    overview: "NextGen UI는 차세대 사용자들을 위한 디지털 인터페이스의 기준을 새롭게 정의하는 프로젝트입니다.",
    background: "기존의 테크 인터페이스들은 기능 중심의 투박한 디자인에 머물러 있었습니다. 우리는 기술력과 심미성이 완벽하게 조화를 이루는 프리미엄 인터페이스의 필요성을 느꼈습니다. 복잡한 데이터를 직관적으로 시각화하고, 매끄러운 사용자 경험을 제공하는 것에 초점을 맞추었습니다.",
    approach: "사용자 중심의 경험 설계와 고품질의 비주얼 디자인을 결합했습니다. 글래스모피즘과 다크 모드를 적극 활용하여 현대적이면서도 고급스러운 분위기를 연출했습니다.",
    year: "2024",
    client: "NextGen Labs",
    images: [
      "/images/nextgen_ui_01.png",
      "/images/projects/nextgen_ui_premium.png",
      "/images/studio_korean.png"
    ]
  },
  {
    slug: "minimal-architectural-space",
    title: "Zenith Studio",
    category: "UI/UX",
    services: "Architectural Visualization",
    heroImg: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    year: "2023",
    client: "Zenith Architecture",
  },
  {
    slug: "futuristic-product-design",
    title: "Titanium Pods",
    category: "Branding",
    services: "Industrial Design — Branding",
    heroImg: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    year: "2023",
    client: "Titanium Audio",
  },
  {
    slug: "creative-agency-branding",
    title: "Loom Agency",
    category: "Branding",
    services: "Corporate Identity — Typography",
    heroImg: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    year: "2023",
    client: "Loom Creative",
  },
  {
    slug: "abstract-glass-art",
    title: "Prism Art",
    category: "Character/Illustration",
    services: "3D Illustration — Digital Art",
    heroImg: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80",
    year: "2022",
    client: "Prism Gallery",
  },
  {
    slug: "wealth-management-app",
    title: "FinGold UX",
    category: "UI/UX",
    services: "App Design — Fintech UX",
    heroImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    year: "2023",
    client: "FinGold Partners",
  },
  {
    slug: "sustainable-fashion-editorial",
    title: "EcoVogue",
    category: "Branding",
    services: "Editorial Photography — Branding",
    heroImg: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    year: "2022",
    client: "EcoVogue Fashion",
  },
  {
    slug: "liquid-metal-art",
    title: "Mercury Sphere",
    category: "Character/Illustration",
    services: "3D Sculpture — Industrial Art",
    heroImg: "https://images.unsplash.com/photo-1581092160562-40aa08e32b0f?w=800&q=80",
    year: "2022",
    client: "Mercury Studios",
  },
  {
    slug: "luxury-hotel-branding",
    title: "Regency Grand",
    category: "Branding",
    services: "Hospitality Branding — Identity",
    heroImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    year: "2024",
    client: "Regency Hotels",
  },
  {
    slug: "crypto-dashboard-ux",
    title: "EtherFlow",
    category: "UI/UX",
    services: "Financial Dashboard — Crypto UI",
    heroImg: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
    year: "2023",
    client: "EtherFlow Inc.",
  },
  {
    slug: "organic-lifestyle-brand",
    title: "Pure Linen",
    category: "Branding",
    services: "Lifestyle Branding — Photography",
    heroImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    year: "2022",
    client: "Pure Linen Co.",
  },
  {
    slug: "aliot-brand-identity",
    title: "Aliot",
    subtitle: "Connecting the world through seamless IoT solutions.",
    category: "Branding",
    services: "Brand Identity — System Design",
    heroImg: "/images/projects/branding_luxury.png",
    goal: "Aliot은 복잡한 IoT 환경을 유기적으로 연결하여 사용자에게 편리함을 제공하는 것을 목표로 합니다. 우리는 이 핵심 가치를 'Together, Connect, Convenience, Expansion'이라는 키워드로 정의했습니다.",
    vision: {
      text: "Connectivity & Flow",
      subtext: "우리는 모든 사물이 유기적으로 연결되어 흐르는 세상을 꿈꿉니다. Aliot의 비전은 단순한 기술을 넘어, 사람과 사물 사이의 끊김 없는 대화를 완성하는 것입니다."
    },
    concept: {
      text: "Line, Connection, Flow",
      subtext: "브랜드의 핵심 철학을 세 가지 키워드로 시각화했습니다. 부드러운 곡선은 유연한 연결을 의미하며, 끊김 없는 선은 정보의 흐름을 상징합니다.",
      items: [
        { title: "Line", desc: "유연한 연결의 시작", img: "/images/section_full.png" },
        { title: "Connection", desc: "사물과 사람의 대화", img: "/images/projects/branding_luxury.png" },
        { title: "Flow", desc: "끊김 없는 정보의 흐름", img: "/images/studio_korean.png" }
      ]
    },
    overview: "사물인터넷(IoT) 통합 솔루션 브랜드 Aliot의 브랜드 아이덴티티 구축 및 시스템 설계 프로젝트입니다. 선과 연결, 흐름을 핵심 컨셉으로 하여 기술이 일상에 스며드는 모습을 시각화했습니다.",
    background: "Aliot은 복잡한 IoT 환경을 유기적으로 연결하여 사용자에게 편리함을 제공하는 것을 목표로 합니다. 우리는 이 핵심 가치를 Together, Connect, Convenience, Expansion이라는 키워드로 정의했습니다.",
    approach: "부드러운 달걀 형태의 심볼과 곡선미가 강조된 워드마크를 통해 영역과 연결을 표현했습니다. 또한 서비스 영역별 고유 컬러 시스템을 구축하여 확장성을 확보했습니다.",
    year: "2018",
    client: "Grecter",
    images: [
      "/images/section_full.png",
      "/images/projects/branding_luxury.png",
      "/images/studio_korean.png"
    ]
  }
];
