import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { portfolioCategories } from "@/lib/site-data";
import { useSiteData } from "@/hooks/use-site-data";
import { SectionHeader } from "./SectionHeader";

const STEP = 9;

export function Portfolio() {
  const { portfolio } = useSiteData();
  const [filter, setFilter] = useState<(typeof portfolioCategories)[number]>("All");
  const [shown, setShown] = useState(STEP);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = portfolio.filter((p) => filter === "All" || p.category === filter);
  const visible = filtered.slice(0, shown);

  return (
    <section id="portfolio" className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Photography Portfolio"
          title="Selected work"
          subtitle="A curated edit of recent commissions across weddings, portraiture, and commercial."
        />

        {/* Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {portfolioCategories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setFilter(c);
                setShown(STEP);
              }}
              className={`text-xs tracking-[0.3em] uppercase pb-1.5 border-b transition ${
                filter === c
                  ? "text-foreground border-[var(--gold)]"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence>
            {visible.map((item) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                onClick={() => setLightbox(item.image)}
                className="group mb-5 block w-full overflow-hidden bg-muted"
              >
                <img
                  src={item.image}
                  alt={item.category}
                  loading="lazy"
                  className={`w-full object-cover hover-zoom-img group-hover:scale-105 ${
                    item.h === "tall" ? "aspect-[3/4]" : item.h === "short" ? "aspect-[4/3]" : "aspect-square"
                  }`}
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {shown < filtered.length && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setShown((s) => s + STEP)}
              className="border border-foreground px-10 py-3.5 text-xs tracking-[0.3em] uppercase transition hover:bg-foreground hover:text-background"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              src={lightbox}
              alt=""
              className="max-h-[88vh] max-w-[92vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
