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
    heroImg: "/projects/branding_luxury.png",
    year: "2024",
    client: "Aura Parfums",
  },
  {
    slug: "tech-interface-design",
    title: "NextGen UI",
    category: "UI/UX",
    services: "Digital Design — Web Development",
    heroImg: "/projects/nextgen_ui_premium.png",
    year: "2024",
    client: "NextGen Labs",
  },
  {
    slug: "minimal-architectural-space",
    title: "Zenith Studio",
    category: "UI/UX",
    services: "Architectural Visualization",
    heroImg: "/projects/minimal_arch.png",
    year: "2023",
    client: "Zenith Architecture",
  },
  {
    slug: "futuristic-product-design",
    title: "Titanium Pods",
    category: "Branding",
    services: "Industrial Design — Branding",
    heroImg: "/projects/futuristic_product.png",
    year: "2023",
    client: "Titanium Audio",
  },
  {
    slug: "creative-agency-branding",
    title: "Loom Agency",
    category: "Branding",
    services: "Corporate Identity — Typography",
    heroImg: "/projects/creative_agency_id.png",
    year: "2023",
    client: "Loom Creative",
  },
  {
    slug: "abstract-glass-art",
    title: "Prism Art",
    category: "Character/Illustration",
    services: "3D Illustration — Digital Art",
    heroImg: "/projects/abstract_glass.png",
    year: "2022",
    client: "Prism Gallery",
  },
  {
    slug: "wealth-management-app",
    title: "FinGold UX",
    category: "UI/UX",
    services: "App Design — Fintech UX",
    heroImg: "/projects/fintech_app.png",
    year: "2023",
    client: "FinGold Partners",
  },
  {
    slug: "sustainable-fashion-editorial",
    title: "EcoVogue",
    category: "Branding",
    services: "Editorial Photography — Branding",
    heroImg: "/projects/sustainable_fashion.png",
    year: "2022",
    client: "EcoVogue Fashion",
  },
  {
    slug: "liquid-metal-art",
    title: "Mercury Sphere",
    category: "Character/Illustration",
    services: "3D Sculpture — Industrial Art",
    heroImg: "/projects/liquid_metal.png",
    year: "2022",
    client: "Mercury Studios",
  },
  {
    slug: "luxury-hotel-branding",
    title: "Regency Grand",
    category: "Branding",
    services: "Hospitality Branding — Identity",
    heroImg: "/projects/luxury_hotel.png",
    year: "2024",
    client: "Regency Hotels",
  },
  {
    slug: "crypto-dashboard-ux",
    title: "EtherFlow",
    category: "UI/UX",
    services: "Financial Dashboard — Crypto UI",
    heroImg: "/projects/crypto_dashboard.png",
    year: "2023",
    client: "EtherFlow Inc.",
  },
  {
    slug: "organic-lifestyle-brand",
    title: "Pure Linen",
    category: "Branding",
    services: "Lifestyle Branding — Photography",
    heroImg: "/projects/organic_lifestyle.png",
    year: "2022",
    client: "Pure Linen Co.",
  },
];
