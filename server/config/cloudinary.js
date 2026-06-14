const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Aspect ratio presets used across the site.
 * Cloudinary will crop uploaded images to these targets on upload.
 */
const ASPECT_PRESETS = {
  hero: { w: 2400, h: 1350 }, // 16:9
  featured: { w: 2000, h: 1125 }, // 16:9
  service: { w: 1200, h: 1500 }, // 4:5
  about: { w: 1200, h: 1600 }, // 3:4
  portrait: { w: 1200, h: 1600 }, // 3:4 (portfolio tall)
  square: { w: 1200, h: 1200 }, // 1:1 (portfolio square, testimonial, instagram)
  landscape: { w: 1600, h: 1200 }, // 4:3 (portfolio short)
  category: { w: 1200, h: 1600 }, // 3:4
};

function makeStorage(preset = "square") {
  const { w, h } = ASPECT_PRESETS[preset] || ASPECT_PRESETS.square;
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: process.env.CLOUDINARY_FOLDER || "photography-portfolio",
      resource_type: "image",
      format: "jpg",
      transformation: [
        { width: w, height: h, crop: "fill", gravity: "auto", quality: "auto:good" },
      ],
    },
  });
}

const upload = (preset) => multer({ storage: makeStorage(preset), limits: { fileSize: 15 * 1024 * 1024 } });

module.exports = { cloudinary, upload, ASPECT_PRESETS };
