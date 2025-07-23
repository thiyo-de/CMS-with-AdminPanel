const express = require("express");
const passport = require("passport");
const JWT = require("jsonwebtoken");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    // Issue JWT manually
    const token = JWT.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Redirect to frontend with token
    res.redirect(`http://localhost:5500/frontend/admin/dashboard.html?token=${token}&username=${req.user.username}`);
  }
);

module.exports = router;
