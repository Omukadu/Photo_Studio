import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Categories } from "@/components/site/Categories";
import { About } from "@/components/site/About";
import { WhyChoose } from "@/components/site/WhyChoose";
import { FeaturedProjects } from "@/components/site/FeaturedProjects";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { InstagramGrid } from "@/components/site/Instagram";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Categories />
      <About />
      <WhyChoose />
      <FeaturedProjects />
      <Testimonials />
      <InstagramGrid />
      <Contact />
      <Footer />
    </main>
  );
}
