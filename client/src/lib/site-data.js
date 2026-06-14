// Shared content for the photography portfolio site.
const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroSlides = [
  {
    image: u("photo-1519741497674-611481863552", 2000),
    eyebrow: "A Story Told in Light",
    title: "The Most Cherished Day",
    subtitle: "Quietly observed. Beautifully kept.",
  },
  {
    image: u("photo-1606800052052-a08af7148866", 2000),
    eyebrow: "Editorial Weddings",
    title: "Nature & Love",
    subtitle: "Timeless imagery shot on film and digital.",
  },
  {
    image: u("photo-1583939003579-730e3918a45a", 2000),
    eyebrow: "Cinematic Portraits",
    title: "Light, Form, Feeling",
    subtitle: "Portraiture composed with intention.",
  },
];

export const services = [
  {
    title: "Wedding Photography",
    desc: "Documentary-style coverage of your full celebration.",
    image: u("photo-1519741497674-611481863552", 900),
  },
  {
    title: "Pre-Wedding Shoots",
    desc: "Intimate portraits at locations that mean something.",
    image: u("photo-1525258946800-98cfd641d0de", 900),
  },
  {
    title: "Event Photography",
    desc: "Galas, launches and private celebrations.",
    image: u("photo-1492684223066-81342ee5ff30", 900),
  },
  {
    title: "Portrait Photography",
    desc: "Editorial portraits for personal and professional use.",
    image: u("photo-1524504388940-b1c1722653e1", 900),
  },
  {
    title: "Product Photography",
    desc: "Commercial imagery with a refined editorial sensibility.",
    image: u("photo-1505740420928-5e560c06d30e", 900),
  },
  {
    title: "Cinematic Videography",
    desc: "Films shot in 4K and edited with patience.",
    image: u("photo-1500917293891-ef795e70e1f6", 900),
  },
];

export const portfolio = [
  {
    id: 1,
    category: "Weddings",
    image: u("photo-1519741497674-611481863552", 800),
    h: "tall",
  },
  {
    id: 2,
    category: "Portraits",
    image: u("photo-1524504388940-b1c1722653e1", 800),
    h: "short",
  },
  {
    id: 3,
    category: "Events",
    image: u("photo-1492684223066-81342ee5ff30", 800),
    h: "medium",
  },
  {
    id: 4,
    category: "Commercial",
    image: u("photo-1441986300917-64674bd600d8", 800),
    h: "tall",
  },
  {
    id: 5,
    category: "Products",
    image: u("photo-1505740420928-5e560c06d30e", 800),
    h: "medium",
  },
  {
    id: 6,
    category: "Weddings",
    image: u("photo-1606800052052-a08af7148866", 800),
    h: "tall",
  },
  {
    id: 7,
    category: "Portraits",
    image: u("photo-1488161628813-04466f872be2", 800),
    h: "medium",
  },
  {
    id: 8,
    category: "Events",
    image: u("photo-1464366400600-7168b8af9bc3", 800),
    h: "short",
  },
  {
    id: 9,
    category: "Commercial",
    image: u("photo-1483985988355-763728e1935b", 800),
    h: "tall",
  },
  {
    id: 10,
    category: "Products",
    image: u("photo-1523275335684-37898b6baf30", 800),
    h: "short",
  },
  {
    id: 11,
    category: "Weddings",
    image: u("photo-1583939003579-730e3918a45a", 800),
    h: "medium",
  },
  {
    id: 12,
    category: "Portraits",
    image: u("photo-1494790108377-be9c29b29330", 800),
    h: "tall",
  },
];

export const portfolioCategories = [
  "All",
  "Weddings",
  "Events",
  "Portraits",
  "Commercial",
  "Products",
];

export const categoryShowcase = [
  { name: "Weddings", image: u("photo-1519741497674-611481863552", 1400) },
  { name: "Events", image: u("photo-1492684223066-81342ee5ff30", 1400) },
  { name: "Portraits", image: u("photo-1524504388940-b1c1722653e1", 1400) },
  { name: "Fashion", image: u("photo-1483985988355-763728e1935b", 1400) },
  { name: "Commercial", image: u("photo-1441986300917-64674bd600d8", 1400) },
];

export const testimonials = [
  {
    name: "Isabelle & Marc",
    event: "Wedding · Provence",
    rating: 5,
    photo: u("photo-1494790108377-be9c29b29330", 200),
    quote:
      "Aria captured our day with such quiet grace. The images feel like the day itself — only better.",
  },
  {
    name: "Olivia Hart",
    event: "Portrait Session",
    rating: 5,
    photo: u("photo-1438761681033-6461ffad8d80", 200),
    quote:
      "I have never felt so seen in front of a camera. The portraits are heirlooms.",
  },
  {
    name: "Maison Lyra",
    event: "Brand Campaign",
    rating: 5,
    photo: u("photo-1500648767791-00dcc994a43e", 200),
    quote:
      "Editorial caliber, delivered ahead of schedule. We have not worked with anyone better.",
  },
];

export const featuredProjects = [
  {
    name: "A Tuscan Vow",
    location: "Val d'Orcia, Italy",
    story:
      "Two days, four locations, and a private ceremony beneath olive trees at golden hour. We shot on a mix of medium format film and digital to keep the romance and the resolution.",
    image: u("photo-1606800052052-a08af7148866", 1600),
  },
  {
    name: "Maison Lyra — SS Campaign",
    location: "Paris, France",
    story:
      "A spring campaign for a quiet-luxury fashion house. Soft north light, hand-printed backdrops, and a single model across nine looks.",
    image: u("photo-1483985988355-763728e1935b", 1600),
  },
  {
    name: "The Hartfield Gala",
    location: "Kensington, London",
    story:
      "A black-tie evening for 240 guests. Documentary coverage paired with formal portraits in the conservatory.",
    image: u("photo-1492684223066-81342ee5ff30", 1600),
  },
];

export const whyChoose = [
  {
    title: "Professional Equipment",
    desc: "Medium-format digital, prime cinema lenses, and lighting for any condition.",
  },
  {
    title: "Premium Editing",
    desc: "Every frame hand-graded — never batch-processed.",
  },
  {
    title: "Fast Delivery",
    desc: "Sneak peeks within 48 hours; full galleries within four weeks.",
  },
  {
    title: "Drone Coverage",
    desc: "Licensed aerial cinematography included where permitted.",
  },
  {
    title: "Creative Direction",
    desc: "We help plan moments and locations that photograph beautifully.",
  },
  {
    title: "Personalized Experience",
    desc: "A small, intentional client list. You are never one of many.",
  },
];

export const stats = [
  { value: 246, label: "Happy Clients" },
  { value: 380, label: "Events Covered" },
  { value: 12, label: "Years Experience" },
  { value: 38000, label: "Photos Delivered" },
];

export const instagram = [
  u("photo-1519741497674-611481863552", 500),
  u("photo-1524504388940-b1c1722653e1", 500),
  u("photo-1606800052052-a08af7148866", 500),
  u("photo-1492684223066-81342ee5ff30", 500),
  u("photo-1488161628813-04466f872be2", 500),
  u("photo-1494790108377-be9c29b29330", 500),
  u("photo-1505740420928-5e560c06d30e", 500),
  u("photo-1483985988355-763728e1935b", 500),
];

export const contact = {
  phone: "+44 20 7946 0917",
  email: "studio@ariavance.com",
  address: "12 Cromwell Mews, South Kensington, London SW7",
  socials: { instagram: "#", facebook: "#", twitter: "#", pinterest: "#" },
};

export const photographer = {
  name: "Omkar Chavan",
  tagline: "Cinematic Wedding & Portrait Photography",
  intro:
    "A boutique studio in London. Editorial, quiet, and honest imagery for those who want their story remembered well.",
  portrait: u("photo-1544005313-94ddf0286df2", 1000),
};
