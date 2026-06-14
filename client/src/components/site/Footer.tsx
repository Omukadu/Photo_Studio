import { Instagram, Facebook, Twitter } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

export function Footer() {
  const { instagram } = useSiteData();
  return (
    <footer className="bg-foreground text-background">
      {/* image strip */}
      <div className="grid grid-cols-4 md:grid-cols-8">
        {instagram.map((src) => (
          <div key={src} className="aspect-square overflow-hidden grayscale opacity-70 hover:opacity-100 transition">
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3 md:items-center">
          <div className="flex gap-6 text-xs tracking-[0.3em] uppercase text-background/70 md:justify-self-start">
            <a href="#" className="hover:text-[var(--gold)]">Privacy</a>
            <a href="#" className="hover:text-[var(--gold)]">Legal</a>
            <a href="#" className="hover:text-[var(--gold)]">Cookies</a>
          </div>

          <p className="font-serif text-sm tracking-[0.35em] text-center md:justify-self-center">
            OMKAR CHAVAN
          </p>

          <div className="flex gap-5 md:justify-self-end">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-background/70 hover:text-[var(--gold)]">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-[0.65rem] tracking-[0.3em] uppercase text-background/40">
          © {new Date().getFullYear()} Omkar Chavan Studio — All photographs are property of the studio.
        </p>
      </div>
    </footer>
  );
}
