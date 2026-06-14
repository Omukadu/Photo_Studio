import { motion } from "framer-motion";
import { useSiteData } from "@/hooks/use-site-data";

export function About() {
  const { photographer } = useSiteData();
  return (
    <section id="about" className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:gap-20 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img src={photographer.portrait} alt={photographer.name} className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden border border-[var(--gold)] bg-background p-6 md:block">
            <p className="font-serif text-5xl leading-none">7</p>
            <p className="mt-1 text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">Years of Craft</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">About the Photographer</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
            Hello. I'm {photographer.name.split(" ")[0]}.
          </h2>
          <span className="gold-rule mt-6 block" />

          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              I have spent the last seven years quietly photographing weddings, portraits and editorial campaigns across Europe. My work lives somewhere between documentary and fine art — observed, never staged; refined, never overworked.
            </p>
            <p>
              I believe a great photograph is one you keep returning to. That is the only brief I care about.
            </p>
          </div>

          {/* <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
            <div>
              <dt className="eyebrow">Featured In</dt>
              <dd className="mt-2 font-serif text-lg">Vogue · Kinfolk · British Journal of Photography</dd>
            </div>
            <div>
              <dt className="eyebrow">Philosophy</dt>
              <dd className="mt-2 font-serif text-lg italic">"Light is the only honest narrator."</dd>
            </div>
          </dl> */}
        </motion.div>
      </div>
    </section>
  );
}
