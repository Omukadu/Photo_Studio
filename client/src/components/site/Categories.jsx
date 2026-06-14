import { motion } from "framer-motion";
import { useSiteData } from "@/hooks/use-site-data";
import { SectionHeader } from "./SectionHeader";

export function Categories() {
  const { categoryShowcase } = useSiteData();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Disciplines" title="Categories of work" />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {categoryShowcase.map((c, i) => (
            <motion.a
              key={c.name}
              href="#portfolio"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative block overflow-hidden bg-muted ${
                i === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 flex items-end justify-center pb-10">
                <div className="text-center text-white">
                  <span className="gold-rule mb-4 bg-[var(--gold-soft)]" />
                  <h3 className="font-serif text-3xl tracking-wide sm:text-5xl">{c.name}</h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
