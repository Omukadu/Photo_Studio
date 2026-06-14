import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

export function Hero() {
  const { heroSlides, photographer } = useSiteData();
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % heroSlides.length), 6500);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  const slide = heroSlides[i];

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-3xl"
          >
            <p className="eyebrow text-[var(--gold-soft)]">{slide.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-5 text-base font-light text-white/85 sm:text-lg">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a href="#portfolio" className="border border-white/80 px-8 py-3.5 text-xs tracking-[0.3em] uppercase text-white transition hover:bg-white hover:text-foreground">
            View Portfolio
          </a>
          <a href="#contact" className="bg-[var(--gold)] px-8 py-3.5 text-xs tracking-[0.3em] uppercase text-white transition hover:bg-[var(--gold-soft)]">
            Book a Session
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[0.65rem] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 right-8 hidden gap-2 md:flex">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-px transition-all ${idx === i ? "w-10 bg-[var(--gold)]" : "w-6 bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 -rotate-90 origin-left lg:block">
        <span className="text-[0.65rem] tracking-[0.5em] uppercase text-white/70">
          {photographer.name} — Studio
        </span>
      </div>
    </section>
  );
}
