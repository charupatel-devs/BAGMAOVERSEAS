// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
      state: false, // Disable state parameter if causing issues
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("=== Google OAuth Success ===");
        console.log("Profile received:", {
          id: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
        });

        const user = await User.findOrCreateOAuthUser(profile, "google");
        console.log("User found/created:", user._id);

        return done(null, user);
      } catch (error) {
        console.error("Google OAuth Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);

// Important: Disable sessions since you're using JWT
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-password");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
