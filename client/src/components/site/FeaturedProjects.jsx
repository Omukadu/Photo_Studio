import { motion } from "framer-motion";
import { useSiteData } from "@/hooks/use-site-data";

export function FeaturedProjects() {
  const { featuredProjects } = useSiteData();
  return (
    <section id="projects" className="bg-foreground py-24 text-background md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="eyebrow">Featured Projects</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Stories worth keeping</h2>
          <span className="gold-rule mt-6" />
        </div>

        <div className="mt-20 space-y-24">
          {featuredProjects.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <div key={p.name} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className={`overflow-hidden md:col-span-7 ${reversed ? "md:order-2" : ""}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, delay: 0.15 }}
                  className="md:col-span-5"
                >
                  <p className="eyebrow text-[var(--gold-soft)]">{p.location}</p>
                  <h3 className="mt-4 font-serif text-3xl sm:text-4xl">{p.name}</h3>
                  <span className="gold-rule mt-5 block" />
                  <p className="mt-6 leading-relaxed text-background/70">{p.story}</p>
                  <a href="#portfolio" className="mt-8 inline-block border-b border-[var(--gold)] pb-1 text-xs tracking-[0.3em] uppercase text-background hover:text-[var(--gold-soft)]">
                    View Gallery
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
