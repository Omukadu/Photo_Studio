import { useEffect, useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Journal" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border/60" : "bg-transparent"}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5 md:py-6">
        <a
          href="#contact"
          aria-label="Email"
          className="justify-self-start text-foreground/80 hover:text-[var(--gold)] transition"
        >
          <Mail className="h-5 w-5" />
        </a>
        <a
          href="#top"
          className="justify-self-center font-serif text-lg tracking-[0.35em] text-foreground"
        >
          OMKAR CHAVAN
        </a>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="justify-self-end text-foreground/80 hover:text-[var(--gold)] transition"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="flex items-center justify-between px-6 py-5 md:py-6">
              <span className="font-serif text-lg tracking-[0.35em]">
                OMKAR CHAVAN
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mx-auto mt-16 flex max-w-md flex-col items-center gap-8 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                  className="font-serif text-4xl tracking-tight hover:text-[var(--gold)] transition"
                >
                  {l.label}
                </motion.a>
              ))}
              <span className="gold-rule mt-6" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
