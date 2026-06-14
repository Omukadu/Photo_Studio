const mongoose = require("mongoose");

async function connectDB() {
  // console.log(process.env, "7777");

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("[db] MONGODB_URI not set — skipping DB connection.");
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log("[db] MongoDB connected");
  } catch (err) {
    console.error("[db] Connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
