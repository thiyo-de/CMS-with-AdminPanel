// server.js

require("dotenv").config(); // Load .env first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

require("./config/passport"); // ⬅️ Google OAuth2 strategy

const authRoutes = require("./routes/auth");     // JWT-based auth
const postRoutes = require("./routes/posts");    // Posts
const oauthRoutes = require("./routes/oauth");   // Google OAuth routes

const app = express();
const PORT = process.env.PORT || 5000;

// 🛡 Middleware
app.use(cors());
app.use(express.json()); // Parse JSON

// 🔐 Session for OAuth2
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// 🔑 Passport
app.use(passport.initialize());
app.use(passport.session());

// 🌐 Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 📦 Routes
app.use("/api/auth", authRoutes);    // JWT Auth (login, register)
app.use("/api/posts", postRoutes);   // CRUD
app.use("/api/oauth", oauthRoutes);  // Google OAuth login/callback

// ✅ Health check
app.get("/", (req, res) => {
  res.send("📡 CMS Backend is running...");
});

// ❌ 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 🚀 Launch
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
