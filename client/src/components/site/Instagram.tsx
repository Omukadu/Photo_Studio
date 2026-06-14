import { motion } from "framer-motion";
import { Instagram as IgIcon } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

export function InstagramGrid() {
  const { instagram } = useSiteData();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="eyebrow">@ariavance.studio</p>
        <h2 className="mt-4 font-serif text-4xl sm:text-5xl">From the feed</h2>
        <span className="gold-rule mt-6" />

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {instagram.map((src, i) => (
            <motion.a
              key={src}
              href="#"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative aspect-square overflow-hidden bg-muted"
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                <IgIcon className="h-5 w-5 text-white" />
              </div>
            </motion.a>
          ))}
        </div>

        <a
          href="#"
          className="mt-10 inline-flex items-center gap-3 border-b border-[var(--gold)] pb-1 text-xs tracking-[0.3em] uppercase text-foreground hover:text-[var(--gold)]"
        >
          <IgIcon className="h-4 w-4" />
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}
