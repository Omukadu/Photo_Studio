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

const pickUrl = (img) => (typeof img === "string" ? img : img?.url || "");

function normalize(payload) {
  if (!payload || typeof payload !== "object") return null;
  const arr = (a) => (Array.isArray(a) ? a : []);
  return {
    heroSlides: arr(payload.heroSlides).map((s) => ({ ...s, image: pickUrl(s.image) })),
    services: arr(payload.services).map((s) => ({ ...s, image: pickUrl(s.image) })),
    portfolio: arr(payload.portfolio).map((p) => ({
      id: p._id || p.id,
      category: p.category,
      h: p.h || "medium",
      image: pickUrl(p.image),
    })),
    testimonials: arr(payload.testimonials).map((t) => ({
      ...t, photo: pickUrl(t.photo), rating: t.rating || 5,
    })),
    featuredProjects: arr(payload.featuredProjects).map((p) => ({ ...p, image: pickUrl(p.image) })),
    stats: arr(payload.stats),
    whyChoose: arr(payload.whyChoose),
    instagram: arr(payload.instagram).map((i) => pickUrl(i.image)),
    categoryShowcase: arr(payload.categories).map((c) => ({ name: c.name, image: pickUrl(c.image) })),
    contact: { ...defaultContact, ...(payload.contact || {}) },
    photographer: { ...defaultPhotographer, ...(payload.photographer || {}) },
  };
}

const fallback = {
  heroSlides: defaultHeroSlides,
  services: defaultServices,
  portfolio: defaultPortfolio,
  testimonials: defaultTestimonials,
  featuredProjects: defaultFeaturedProjects,
  stats: defaultStats,
  whyChoose: defaultWhyChoose,
  instagram: defaultInstagram,
  categoryShowcase: defaultCategoryShowcase,
  contact: defaultContact,
  photographer: defaultPhotographer,
};

export function useSiteData() {
  const { data } = useQuery({
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
          featuredProjects: norm.featuredProjects.length ? norm.featuredProjects : fallback.featuredProjects,
          stats: norm.stats.length ? norm.stats : fallback.stats,
          whyChoose: norm.whyChoose.length ? norm.whyChoose : fallback.whyChoose,
          instagram: norm.instagram.length ? norm.instagram : fallback.instagram,
          categoryShowcase: norm.categoryShowcase.length ? norm.categoryShowcase : fallback.categoryShowcase,
          contact: norm.contact,
          photographer: norm.photographer,
        };
      } catch {
        return fallback;
      }
    },
    staleTime: 60_000,
    retry: false,
  });
  return data ?? fallback;
}
