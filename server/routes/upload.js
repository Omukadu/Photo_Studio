const express = require("express");
const { upload, ASPECT_PRESETS } = require("../config/cloudinary");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/presets", (_req, res) => res.json(ASPECT_PRESETS));

// POST /api/upload/:preset  (multipart, field name: "image")
router.post("/:preset", requireAuth, (req, res) => {
  const preset = req.params.preset;
  if (!ASPECT_PRESETS[preset]) return res.status(400).json({ error: "Unknown preset" });
  upload(preset).single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No file" });
    res.json({ url: req.file.path, publicId: req.file.filename });
  });
});

module.exports = router;
