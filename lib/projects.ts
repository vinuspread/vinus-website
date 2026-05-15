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
  },
  {
    slug: "tech-interface-design",
    title: "NextGen UI",
    category: "UI/UX",
    services: "Digital Design — Web Development",
    heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    slug: "minimal-architectural-space",
    title: "Zenith Studio",
    category: "UI/UX",
    services: "Architectural Visualization",
    heroImg: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  },
  {
    slug: "futuristic-product-design",
    title: "Titanium Pods",
    category: "Branding",
    services: "Industrial Design — Branding",
    heroImg: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    slug: "creative-agency-branding",
    title: "Loom Agency",
    category: "Branding",
    services: "Corporate Identity — Typography",
    heroImg: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
  },
  {
    slug: "abstract-glass-art",
    title: "Prism Art",
    category: "Character/Illustration",
    services: "3D Illustration — Digital Art",
    heroImg: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80",
  },
  {
    slug: "wealth-management-app",
    title: "FinGold UX",
    category: "UI/UX",
    services: "App Design — Fintech UX",
    heroImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
  {
    slug: "sustainable-fashion-editorial",
    title: "EcoVogue",
    category: "Branding",
    services: "Editorial Photography — Branding",
    heroImg: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
  },
  {
    slug: "liquid-metal-art",
    title: "Mercury Sphere",
    category: "Character/Illustration",
    services: "3D Sculpture — Industrial Art",
    heroImg: "https://images.unsplash.com/photo-1581092160562-40aa08e32b0f?w=800&q=80",
  },
  {
    slug: "luxury-hotel-branding",
    title: "Regency Grand",
    category: "Branding",
    services: "Hospitality Branding — Identity",
    heroImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    slug: "crypto-dashboard-ux",
    title: "EtherFlow",
    category: "UI/UX",
    services: "Financial Dashboard — Crypto UI",
    heroImg: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
  },
  {
    slug: "organic-lifestyle-brand",
    title: "Pure Linen",
    category: "Branding",
    services: "Lifestyle Branding — Photography",
    heroImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
];
