import { motion } from "framer-motion";
import { useSiteData } from "@/hooks/use-site-data";
import { SectionHeader } from "./SectionHeader";

export function Services() {
  const { services } = useSiteData();
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="My Services"
          title="A complete photography studio"
          subtitle="From the most personal moments to the most public — six disciplines, one consistent standard."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover hover-zoom-img group-hover:scale-110"
                />
              </div>
              <div className="mt-6">
                <p className="eyebrow">0{i + 1}</p>
                <h3 className="mt-2 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
