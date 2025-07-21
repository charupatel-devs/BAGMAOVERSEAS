const express = require("express");
const {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderTracking,
  processPayment,
  verifyPayment,
  downloadInvoice,
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  calculateShipping,
  applyDiscount,
  getOrdersByStatus,
  getOrderManagementData,
} = require("../controllers/orderController");

const {
  isAuthenticated,
  requireVerifiedEmail,
  requireCompleteProfile,
  canModifyOrder,
  canViewOrder,
  logActivity,
  isAdmin,
} = require("../middlewares/auth");

const router = express.Router();

// ===========================================
// ALL ROUTES REQUIRE AUTHENTICATION
// ===========================================
router.use(isAuthenticated);

// ===========================================
// SHOPPING CART MANAGEMENT
// ===========================================
router.get("/cart", getCartItems);
router.post("/cart/add", addToCart);
router.put("/cart/update/:itemId", updateCartItem);
router.delete("/cart/remove/:itemId", removeFromCart);
router.delete("/cart/clear", clearCart);

// ===========================================
// ORDER CALCULATION & DISCOUNTS
// ===========================================
router.post("/calculate-shipping", calculateShipping);
router.post("/apply-discount", applyDiscount);

// ===========================================
// ORDER CREATION & MANAGEMENT
// ===========================================
router.post(
  "/create",
  // requireVerifiedEmail,
  // requireCompleteProfile,
  logActivity("create_order"),
  createOrder
);

router.get("/management", isAdmin, getOrderManagementData);
router.get("/", getUserOrders);

// Must be after more specific routes
router.get("/:id/tracking", canViewOrder, getOrderTracking);
router.get("/:id/invoice", canViewOrder, downloadInvoice);

router.put(
  "/:id/cancel",
  canModifyOrder,
  logActivity("cancel_order"),
  cancelOrder
);

// Payments
router.post(
  "/:id/payment",
  canModifyOrder,
  logActivity("process_payment"),
  processPayment
);
router.post("/:id/verify-payment", canViewOrder, verifyPayment);

// Admin: Get orders by status
router.get(
  "/orders/:status",
  isAdmin,
  logActivity("get_orders_by_status"),
  getOrdersByStatus
);

// MUST BE LAST - catches dynamic orderId
router.get("/:id", canViewOrder, getOrderById);

module.exports = router;
