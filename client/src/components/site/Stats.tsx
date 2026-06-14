import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useSiteData } from "@/hooks/use-site-data";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{n.toLocaleString()}</span>;
}

export function Stats() {
  const { stats } = useSiteData();
  return (
    <section className="border-y border-border bg-secondary/40 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-serif text-5xl text-foreground sm:text-6xl">
              <Counter to={s.value} />
              {s.value >= 1000 && "+"}
            </p>
            <span className="gold-rule mt-3" />
            <p className="mt-3 text-xs tracking-[0.3em] uppercase text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
