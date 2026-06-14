import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeader({ eyebrow, title, subtitle, align = "center" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`mx-auto max-w-2xl ${align === "center" ? "text-center" : "text-left"}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 text-muted-foreground">{subtitle}</p>}
      <span className={`gold-rule mt-6 ${align === "center" ? "" : "block"}`} />
    </motion.div>
  );
}
