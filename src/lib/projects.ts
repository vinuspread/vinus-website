export type Project = {
  slug: string;
  title: string;
  services: string;
  year: string;
  client: string;
  awards?: number;
  heroImg: string;
  images: string[];
  challenge: string;
};

const commonImages = [
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&h=900&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=900&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1557264305-7e2764da873b?w=1600&h=900&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1541462608141-ad4d157ee78a?w=1600&h=900&fit=crop&auto=format&q=80",
];

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const projects: Project[] = [
  { 
    title: "Gavin Schneider Productions", 
    services: "Digital Design — Web Development",
    year: "2024",
    client: "Gavin Schneider",
    heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Gavin Schneider Productions reached out to us to create a new design system and conduct an overhaul of the brand's digital experience. The objective was to provide customers with seamless purchasing journeys and to showcase their high-end production capabilities."
  },
  { 
    title: "Freshman", 
    services: "Strategy — Brand Identity — Digital Design — Web Development — Creative Direction",
    year: "2023",
    client: "Freshman Co.",
    heroImg: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "A comprehensive brand identity and digital platform for Freshman, focusing on modern lifestyle and community engagement."
  },
  { 
    title: "Lo2s", 
    services: "Digital Design — Creative Direction",
    year: "2023",
    client: "Lo2s Studio",
    heroImg: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Creative direction and digital experience for Lo2s, emphasizing minimal aesthetics and fluid interactions."
  },
  { 
    title: "Studio PIC", 
    services: "Strategy — Digital Design — Creative Direction — Web Development",
    year: "2024",
    client: "PIC Studio",
    heroImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Developing a strategic digital presence for Studio PIC to highlight their portfolio of architectural photography."
  },
  { 
    title: "Inkfish", 
    services: "Strategy — Brand Identity — Creative Direction — Digital Design — Web Development",
    year: "2023",
    client: "Inkfish",
    awards: 3,
    heroImg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Transforming Inkfish into a modern digital powerhouse through a complete overhaul of their brand and online presence."
  },
  { 
    title: "Southern Guild", 
    services: "Strategy — Creative Direction — Digital Design — Web Development",
    year: "2024",
    client: "Southern Guild",
    heroImg: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "A premium digital gallery experience for Southern Guild, showcasing the best of African collectible design."
  },
  { 
    title: "Enpower Trading", 
    services: "Strategy — Brand Identity — Creative Direction — Digital Design — Web Development",
    year: "2023",
    client: "Enpower",
    heroImg: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Strategic branding and platform development for Enpower Trading, a leader in renewable energy solutions."
  },
  { 
    title: "Emma is Social", 
    services: "Strategy — Brand Identity — Digital Design — Web Development",
    year: "2023",
    client: "Emma Social",
    heroImg: "https://images.unsplash.com/photo-1557264305-7e2764da873b?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Building a social-first brand identity and website for Emma, focusing on digital storytelling."
  },
  { 
    title: "Fitsole", 
    services: "Strategy — Brand Identity — Creative Direction — Digital Design — Web Development",
    year: "2024",
    client: "Fitsole",
    heroImg: "https://images.unsplash.com/photo-1541462608141-ad4d157ee78a?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "E-commerce and branding for Fitsole, a premium footwear retailer."
  },
  { 
    title: "Banyana Ba Style", 
    services: "Brand Identity — Creative Direction — Digital Design",
    year: "2023",
    client: "Banyana Ba",
    heroImg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Creative direction and identity for Banyana Ba Style, celebrating African fashion."
  },
  { 
    title: "VANA", 
    services: "Strategy — Brand Identity — Creative Direction — Digital Design — Web Development",
    year: "2024",
    client: "VANA",
    heroImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Comprehensive digital transformation for VANA, a holistic wellness brand."
  },
  { 
    title: "Sneaker LAB", 
    services: "Creative Direction — Digital Design",
    year: "2023",
    client: "Sneaker LAB",
    heroImg: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Global digital presence for Sneaker LAB, the premium sneaker care brand."
  },
  { 
    title: "Swag", 
    services: "Creative Direction — Digital Design — Web Development",
    year: "2024",
    client: "Swag Co.",
    heroImg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Design and development for Swag, a curated streetwear marketplace."
  },
  { 
    title: "Blocklords", 
    services: "Strategy — Brand Identity — Creative Direction — Digital Design — Web Development",
    year: "2023",
    client: "Blocklords",
    heroImg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Branding and web experience for the grand strategy game Blocklords."
  },
  { 
    title: "MetaKing Studios", 
    services: "Strategy — Brand Identity — Creative Direction — Digital Design",
    year: "2024",
    client: "MetaKing",
    heroImg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Strategic design for MetaKing Studios, pushing the boundaries of web3 gaming."
  },
  { 
    title: "Web OGs_", 
    services: "Brand Identity — Creative Direction — Digital Design — Web Development",
    year: "2023",
    client: "Web OGs",
    heroImg: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Identity and platform for Web OGs, a digital collectibles community."
  },
  { 
    title: "Lemkus", 
    services: "Strategy — Brand Identity — Creative Direction — Digital Design — Web Development",
    year: "2024",
    client: "Lemkus",
    heroImg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Total digital overhaul for Lemkus, a landmark of South African sneaker culture."
  },
  { 
    title: "Sophie Dallamore", 
    services: "Brand Identity — Digital Design — Web Development",
    year: "2023",
    client: "Sophie Dallamore",
    heroImg: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Elegant personal branding and portfolio for high-end fashion photographer Sophie Dallamore."
  },
  { 
    title: "Kia", 
    services: "Strategy — Creative Direction — Digital Design — Web Development",
    year: "2024",
    client: "Kia Motors",
    heroImg: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Best-in-class e-commerce experience for Kia, validated by in-depth research."
  },
  { 
    title: "Tiger Wheel and Tyre", 
    services: "Strategy — Creative Direction — Digital Design — Web Development",
    year: "2023",
    client: "Tiger Wheel",
    heroImg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Refreshing the digital properties of Tiger Wheel & Tyre with a focus on e-commerce."
  },
  { 
    title: "Batoka", 
    services: "Strategy — Brand Identity — Creative Direction — Digital Design — Web Development",
    year: "2024",
    client: "Batoka",
    heroImg: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Evolving the digital brand for Batoka Hospitality, luxury safari destinations."
  },
  { 
    title: "The Last Dance", 
    services: "Concept Design",
    year: "2023",
    client: "Vinus Lab",
    heroImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Conceptual design exploration for The Last Dance, a documentary project."
  },
  { 
    title: "Alexis Christodoulou Studio", 
    services: "Concept Design",
    year: "2023",
    client: "ACS",
    heroImg: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Experimental concept design for the digital gallery of Alexis Christodoulou Studio."
  },
  { 
    title: "Picube", 
    services: "Brand Identity — Digital Design",
    year: "2024",
    client: "Picube",
    heroImg: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Identity and platform for Picube, a photography collective."
  },
  { 
    title: "Private Luxury", 
    services: "Brand Identity — Digital Design — Web Development",
    year: "2023",
    client: "Private Luxury",
    heroImg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Exclusive brand identity and concierge platform for Private Luxury."
  },
  { 
    title: "Afrisam", 
    services: "Strategy — Creative Direction — Digital Design — Web Development",
    year: "2024",
    client: "Afrisam",
    heroImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop&auto=format&q=80",
    images: commonImages,
    challenge: "Elevated digital experience for Afrisam, reflecting innovation and performance."
  },
].map(p => ({ ...p, slug: slugify(p.title) }));

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
