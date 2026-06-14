import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

export function Contact() {
  const { contact, photographer } = useSiteData();
  return (
    <section id="contact" className="bg-foreground py-24 text-background md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="aspect-[4/5] overflow-hidden"
        >
          <img src={photographer.portrait} alt="" className="h-full w-full object-cover grayscale" loading="lazy" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="eyebrow text-[var(--gold-soft)]">Contact</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl">
            With me
          </h2>
          <span className="gold-rule mt-6 block" />

          <p className="mt-8 max-w-md leading-relaxed text-background/70">
            Commissions are accepted for a limited number of weddings and editorial projects each year. Reach out — I attend every call personally.
          </p>

          <dl className="mt-10 space-y-5">
            <a href={`tel:${contact.phone}`} className="flex items-center gap-4 hover:text-[var(--gold-soft)]">
              <Phone className="h-4 w-4 text-[var(--gold)]" strokeWidth={1.5} />
              <span className="font-serif text-lg">{contact.phone}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-4 hover:text-[var(--gold-soft)]">
              <Mail className="h-4 w-4 text-[var(--gold)]" strokeWidth={1.5} />
              <span className="font-serif text-lg">{contact.email}</span>
            </a>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1.5 h-4 w-4 text-[var(--gold)]" strokeWidth={1.5} />
              <span className="font-serif text-lg">{contact.address}</span>
            </div>
          </dl>

          <div className="mt-10 flex gap-5 border-t border-background/20 pt-8">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="rounded-full border border-background/30 p-3 transition hover:border-[var(--gold)] hover:text-[var(--gold)]">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <p className="mt-10 font-serif text-2xl italic text-background/80">— {photographer.name}</p>
        </motion.div>
      </div>
    </section>
  );
}
