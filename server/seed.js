require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

(async () => {
  await connectDB();
  const email = (process.env.ADMIN_EMAIL || "admin@studio.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`[seed] admin already exists: ${email}`);
    process.exit(0);
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash, role: "admin" });
  console.log(`[seed] created admin ${email} / ${password}`);
  process.exit(0);
})();
