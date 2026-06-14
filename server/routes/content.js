const express = require("express");
const { requireAuth } = require("../middleware/auth");
const M = require("../models/Content");

const router = express.Router();

const MODELS = {
  "hero-slides": M.HeroSlide,
  services: M.Service,
  portfolio: M.PortfolioItem,
  testimonials: M.Testimonial,
  "featured-projects": M.FeaturedProject,
  stats: M.Stat,
  "why-choose": M.WhyChoose,
  instagram: M.InstagramPost,
  categories: M.Category,
};

// ---------- Singletons (about / contact / photographer) ----------
// MUST be defined before generic routes to match first
const SINGLETONS = new Set(["about", "contact", "photographer"]);

router.get("/settings/:key", async (req, res) => {
  if (!SINGLETONS.has(req.params.key))
    return res.status(404).json({ error: "Unknown setting" });
  const found = await M.SiteSetting.findOne({ key: req.params.key });
  res.json(found?.data || {});
});

router.put("/settings/:key", requireAuth, async (req, res) => {
  if (!SINGLETONS.has(req.params.key))
    return res.status(404).json({ error: "Unknown setting" });
  const updated = await M.SiteSetting.findOneAndUpdate(
    { key: req.params.key },
    { key: req.params.key, data: req.body },
    { upsert: true, new: true },
  );
  res.json(updated.data);
});

// ---------- Collections (CRUD) ----------
router.get("/:resource", async (req, res) => {
  const Model = MODELS[req.params.resource];
  if (!Model) return res.status(404).json({ error: "Unknown resource" });
  const items = await Model.find().sort({ order: 1, createdAt: 1 });
  res.json(items);
});

router.post("/:resource", requireAuth, async (req, res) => {
  const Model = MODELS[req.params.resource];
  if (!Model) return res.status(404).json({ error: "Unknown resource" });
  const item = await Model.create(req.body);
  res.status(201).json(item);
});

router.put("/:resource/:id", requireAuth, async (req, res) => {
  const Model = MODELS[req.params.resource];
  if (!Model) return res.status(404).json({ error: "Unknown resource" });
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
});

router.delete("/:resource/:id", requireAuth, async (req, res) => {
  const Model = MODELS[req.params.resource];
  if (!Model) return res.status(404).json({ error: "Unknown resource" });
  await Model.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ---------- Contact messages ----------
router.post("/messages", async (req, res) => {
  const msg = await M.ContactMessage.create(req.body);
  res.status(201).json({ ok: true, id: msg._id });
});

router.get("/messages", requireAuth, async (_req, res) => {
  const items = await M.ContactMessage.find().sort({ createdAt: -1 });
  res.json(items);
});

router.delete("/messages/:id", requireAuth, async (req, res) => {
  await M.ContactMessage.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ---------- Aggregate (public site bootstrap) ----------
router.get("/site/all", async (_req, res) => {
  const [
    heroSlides,
    services,
    portfolio,
    testimonials,
    featuredProjects,
    stats,
    whyChoose,
    instagram,
    categories,
    aboutDoc,
    contactDoc,
    photographerDoc,
  ] = await Promise.all([
    M.HeroSlide.find().sort({ order: 1 }),
    M.Service.find().sort({ order: 1 }),
    M.PortfolioItem.find().sort({ order: 1 }),
    M.Testimonial.find().sort({ order: 1 }),
    M.FeaturedProject.find().sort({ order: 1 }),
    M.Stat.find().sort({ order: 1 }),
    M.WhyChoose.find().sort({ order: 1 }),
    M.InstagramPost.find().sort({ order: 1 }),
    M.Category.find().sort({ order: 1 }),
    M.SiteSetting.findOne({ key: "about" }),
    M.SiteSetting.findOne({ key: "contact" }),
    M.SiteSetting.findOne({ key: "photographer" }),
  ]);
  res.json({
    heroSlides,
    services,
    portfolio,
    testimonials,
    featuredProjects,
    stats,
    whyChoose,
    instagram,
    categories,
    about: aboutDoc?.data || {},
    contact: contactDoc?.data || {},
    photographer: photographerDoc?.data || {},
  });
});

module.exports = router;
