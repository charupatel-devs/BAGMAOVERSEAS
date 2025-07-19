// routes/userRoutes.js
// Updated user routes with complete authentication
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  logoutUser,
  getUserOrders,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getGoogleAuthUrl,
  googleCallback,
  getDefaultAddress,
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  setDefaultAddress,
  deleteUserAddress,
} = require("../controllers/userController");
const passport = require("passport"); // ✅ ADD THIS LINE

const {
  isAuthenticated,
  requireVerifiedEmail,
  requireCompleteProfile,
  logActivity,
} = require("../middlewares/auth");
const router = express.Router();

// ===========================================
// PUBLIC ROUTES (No authentication required)
// ===========================================

// User authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Password management
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
// ===========================================
// GOOGLE OAUTH ROUTES
// ===========================================

// Get Google OAuth URL for frontend
router.get("/auth/google/url", getGoogleAuthUrl);

// Initiate Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed`,
    session: false,
  }),
  googleCallback
);

// ===========================================
// PROTECTED ROUTES (Authentication required)
// ===========================================

// User profile management
router.get("/profile", isAuthenticated, getUserProfile);

router.put("/profile", isAuthenticated, updateUserProfile);

router.put(
  "/change-password",
  isAuthenticated,
  logActivity("password_change"),
  changePassword
);

// ===========================================
// ORDER RELATED ROUTES
// ===========================================

// User orders (requires complete profile for order history)
router.get("/orders", isAuthenticated, getUserOrders);

// ===========================================
// WISHLIST MANAGEMENT
// ===========================================

// Get wishlist
router.get("/wishlist", isAuthenticated, getWishlist);

// Add to wishlist
router.post("/wishlist/add/:productId", isAuthenticated, addToWishlist);

// Remove from wishlist
router.delete(
  "/wishlist/remove/:productId",
  isAuthenticated,
  removeFromWishlist
);

// ===========================================
// ADDRESS MANAGEMENT
// ===========================================

// Get default address (most commonly used)
router.get("/addresses/default", isAuthenticated, getDefaultAddress);

// Get all user addresses
router.get("/addresses", isAuthenticated, getUserAddresses);

// Add new address
router.post("/addresses", isAuthenticated, addUserAddress);

// Update specific address
router.put("/addresses/:addressId", isAuthenticated, updateUserAddress);

// Set address as default
router.put("/addresses/:addressId/default", isAuthenticated, setDefaultAddress);

// Delete address
router.delete("/addresses/:addressId", isAuthenticated, deleteUserAddress);

module.exports = router;
