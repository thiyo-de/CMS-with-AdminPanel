const express = require("express");
const passport = require("passport");
const router = express.Router();

// Step 1: Redirect to Google
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

// Step 2: Google redirects here
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed" }),
  (req, res) => {
    // ✅ Google login success
    // You can redirect or send token here
    res.send("✅ Google OAuth Success!");
  }
);

module.exports = router;
