import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  heroSlides as defaultHeroSlides,
  services as defaultServices,
  portfolio as defaultPortfolio,
  testimonials as defaultTestimonials,
  featuredProjects as defaultFeaturedProjects,
  stats as defaultStats,
  whyChoose as defaultWhyChoose,
  instagram as defaultInstagram,
  categoryShowcase as defaultCategoryShowcase,
  contact as defaultContact,
  photographer as defaultPhotographer,
} from "@/lib/site-data";

// API images come as { url, publicId } — components expect string.
const pickUrl = (img: any): string => (typeof img === "string" ? img : img?.url || "");

function normalize(payload: any) {
  if (!payload || typeof payload !== "object") return null;
  const arr = (a: any) => (Array.isArray(a) ? a : []);
  return {
    heroSlides: arr(payload.heroSlides).map((s: any) => ({ ...s, image: pickUrl(s.image) })),
    services: arr(payload.services).map((s: any) => ({ ...s, image: pickUrl(s.image) })),
    portfolio: arr(payload.portfolio).map((p: any) => ({
      id: p._id || p.id,
      category: p.category,
      h: p.h || "medium",
      image: pickUrl(p.image),
    })),
    testimonials: arr(payload.testimonials).map((t: any) => ({
      ...t,
      photo: pickUrl(t.photo),
      rating: t.rating || 5,
    })),
    featuredProjects: arr(payload.featuredProjects).map((p: any) => ({
      ...p,
      image: pickUrl(p.image),
    })),
    stats: arr(payload.stats),
    whyChoose: arr(payload.whyChoose),
    instagram: arr(payload.instagram).map((i: any) => pickUrl(i.image)),
    categoryShowcase: arr(payload.categories).map((c: any) => ({
      name: c.name,
      image: pickUrl(c.image),
    })),
    contact: { ...defaultContact, ...(payload.contact || {}) },
    photographer: { ...defaultPhotographer, ...(payload.photographer || {}) },
  };
}

type SiteData = {
  heroSlides: { image: string; eyebrow: string; title: string; subtitle: string }[];
  services: { title: string; desc: string; image: string }[];
  portfolio: { id: string | number; category: string; image: string; h: "tall" | "short" | "medium" }[];
  testimonials: { name: string; event: string; rating: number; photo: string; quote: string }[];
  featuredProjects: { name: string; location: string; story: string; image: string }[];
  stats: { value: number; label: string }[];
  whyChoose: { title: string; desc: string }[];
  instagram: string[];
  categoryShowcase: { name: string; image: string }[];
  contact: typeof defaultContact;
  photographer: typeof defaultPhotographer;
};

const fallback: SiteData = {
  heroSlides: defaultHeroSlides as any,
  services: defaultServices as any,
  portfolio: defaultPortfolio as any,
  testimonials: defaultTestimonials as any,
  featuredProjects: defaultFeaturedProjects as any,
  stats: defaultStats as any,
  whyChoose: defaultWhyChoose as any,
  instagram: defaultInstagram as any,
  categoryShowcase: defaultCategoryShowcase as any,
  contact: defaultContact,
  photographer: defaultPhotographer,
};

export function useSiteData(): SiteData {
  const { data } = useQuery<SiteData>({
    queryKey: ["site-all"],
    queryFn: async () => {
      try {
        const res = await api.get("/site/all");
        const norm = normalize(res);
        if (!norm) return fallback;
        return {
          heroSlides: norm.heroSlides.length ? norm.heroSlides : fallback.heroSlides,
          services: norm.services.length ? norm.services : fallback.services,
          portfolio: norm.portfolio.length ? norm.portfolio : fallback.portfolio,
          testimonials: norm.testimonials.length ? norm.testimonials : fallback.testimonials,
          featuredProjects: norm.featuredProjects.length
            ? norm.featuredProjects
            : fallback.featuredProjects,
          stats: norm.stats.length ? norm.stats : fallback.stats,
          whyChoose: norm.whyChoose.length ? norm.whyChoose : fallback.whyChoose,
          instagram: norm.instagram.length ? norm.instagram : fallback.instagram,
          categoryShowcase: norm.categoryShowcase.length
            ? norm.categoryShowcase
            : fallback.categoryShowcase,
          contact: norm.contact,
          photographer: norm.photographer,
        } as SiteData;
      } catch {
        return fallback;
      }
    },
    staleTime: 60_000,
    retry: false,
  });
  return data ?? fallback;
}
