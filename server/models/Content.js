const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  { url: String, publicId: String },
  { _id: false },
);

const HeroSlide = mongoose.model(
  "HeroSlide",
  new mongoose.Schema(
    {
      image: ImageSchema,
      eyebrow: String,
      title: String,
      subtitle: String,
      order: { type: Number, default: 0 },
    },
    { timestamps: true },
  ),
);

const Service = mongoose.model(
  "Service",
  new mongoose.Schema(
    { title: String, desc: String, image: ImageSchema, order: { type: Number, default: 0 } },
    { timestamps: true },
  ),
);

const PortfolioItem = mongoose.model(
  "PortfolioItem",
  new mongoose.Schema(
    {
      category: {
        type: String,
        enum: ["Weddings", "Events", "Portraits", "Commercial", "Products"],
        required: true,
      },
      image: ImageSchema,
      h: { type: String, enum: ["tall", "short", "medium"], default: "medium" },
      order: { type: Number, default: 0 },
    },
    { timestamps: true },
  ),
);

const Testimonial = mongoose.model(
  "Testimonial",
  new mongoose.Schema(
    {
      name: String,
      event: String,
      rating: { type: Number, default: 5 },
      photo: ImageSchema,
      quote: String,
      order: { type: Number, default: 0 },
    },
    { timestamps: true },
  ),
);

const FeaturedProject = mongoose.model(
  "FeaturedProject",
  new mongoose.Schema(
    { name: String, location: String, story: String, image: ImageSchema, order: { type: Number, default: 0 } },
    { timestamps: true },
  ),
);

const Stat = mongoose.model(
  "Stat",
  new mongoose.Schema(
    { value: Number, label: String, order: { type: Number, default: 0 } },
    { timestamps: true },
  ),
);

const WhyChoose = mongoose.model(
  "WhyChoose",
  new mongoose.Schema(
    { title: String, desc: String, order: { type: Number, default: 0 } },
    { timestamps: true },
  ),
);

const InstagramPost = mongoose.model(
  "InstagramPost",
  new mongoose.Schema(
    { image: ImageSchema, order: { type: Number, default: 0 } },
    { timestamps: true },
  ),
);

const Category = mongoose.model(
  "Category",
  new mongoose.Schema(
    { name: String, image: ImageSchema, order: { type: Number, default: 0 } },
    { timestamps: true },
  ),
);

const SiteSetting = mongoose.model(
  "SiteSetting",
  new mongoose.Schema(
    {
      key: { type: String, unique: true, required: true }, // 'about' | 'contact' | 'photographer'
      data: mongoose.Schema.Types.Mixed,
    },
    { timestamps: true },
  ),
);

const ContactMessage = mongoose.model(
  "ContactMessage",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      phone: String,
      eventType: String,
      message: String,
      read: { type: Boolean, default: false },
    },
    { timestamps: true },
  ),
);

module.exports = {
  HeroSlide,
  Service,
  PortfolioItem,
  Testimonial,
  FeaturedProject,
  Stat,
  WhyChoose,
  InstagramPost,
  Category,
  SiteSetting,
  ContactMessage,
};
