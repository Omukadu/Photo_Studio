import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

export function Testimonials() {
  const { testimonials } = useSiteData();
  const [i, setI] = useState(0);
  const t = testimonials[Math.min(i, testimonials.length - 1)] || testimonials[0];

  const go = (d: number) => setI((p) => (p + d + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="eyebrow">Testimonials</p>
        <span className="gold-rule mt-4" />

        <div className="relative mt-12 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={t.photo}
                alt={t.name}
                className="mx-auto h-20 w-20 rounded-full object-cover ring-1 ring-border"
              />
              <div className="mt-5 flex justify-center gap-0.5 text-[var(--gold)]">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 font-serif text-2xl italic leading-snug sm:text-3xl">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-serif text-lg">{t.name}</p>
                <p className="mt-1 text-xs tracking-[0.25em] uppercase text-muted-foreground">{t.event}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous" className="text-muted-foreground hover:text-[var(--gold)]">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-px transition-all ${idx === i ? "w-8 bg-[var(--gold)]" : "w-4 bg-border"}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next" className="text-muted-foreground hover:text-[var(--gold)]">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
