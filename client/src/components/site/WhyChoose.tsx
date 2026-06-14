import { motion } from "framer-motion";
import { Camera, Sparkles, Clock, Plane, Compass, Heart } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { SectionHeader } from "./SectionHeader";

const icons = [Camera, Sparkles, Clock, Plane, Compass, Heart];

export function WhyChoose() {
  const { whyChoose } = useSiteData();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Why Choose The Studio" title="A standard, not a service" />

        <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((w, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group bg-background p-10 transition-colors hover:bg-secondary/60"
              >
                <Icon className="h-7 w-7 text-[var(--gold)]" strokeWidth={1.2} />
                <h3 className="mt-6 font-serif text-2xl">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
