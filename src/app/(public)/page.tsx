import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Video } from "@/components/sections/Video";
import { ClientsBrands } from "@/components/sections/ClientsBrands";
import { ImageSlider } from "@/components/sections/ImageSlider";
import { Awards } from "@/components/sections/Awards";
import { LatestNews } from "@/components/sections/LatestNews";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Video />
      <ClientsBrands />
      <ImageSlider />
      <Awards />
      <LatestNews />
      <Footer />
    </main>
  );
}
