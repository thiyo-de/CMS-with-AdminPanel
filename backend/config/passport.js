const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/oauth/google/callback", // ✅ Must match Google Console
    },
    (accessToken, refreshToken, profile, done) => {
      // Save user logic here if needed
      return done(null, profile);
    }
  )
);
