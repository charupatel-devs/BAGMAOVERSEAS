import {
  ArrowLeft,
  Clock,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  getCartItems,
  removeFromCart,
  updateCartItem,
} from "../../services_hooks/customer/cartService";

const ViewCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Updated to match new Redux state structure
  const {
    items: cartItems = [],
    itemCount = 0,
    totalItems = 0,
    subtotal = 0,
    gstAmount = 0,
    totalAmount = 0,
    isFetching = false,
    isUpdating = false,
    isRemoving = false,
    error = null,
  } = useSelector((state) => state.userCart || {});

  console.log("Cart Items:", cartItems);

  // Local loading states for individual items
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [removingItems, setRemovingItems] = useState(new Set());

  // Fetch cart items on component mount
  useEffect(() => {
    getCartItems(dispatch);
  }, [dispatch]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    // ✅ Updated to use productId directly (new structure)
    const item = cartItems.find((item) => item.productId === itemId);

    if (!item) return;

    setUpdatingItems((prev) => new Set(prev).add(itemId));

    try {
      await updateCartItem(dispatch, itemId, newQuantity);
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (itemId) => {
    // ✅ Updated to use productId directly
    const item = cartItems.find((item) => item.productId === itemId);

    if (!item) return;

    setRemovingItems((prev) => new Set(prev).add(itemId));

    try {
      await removeFromCart(dispatch, itemId);
    } finally {
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      await clearCart(dispatch);
    }
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  // ✅ Calculate totals on frontend for verification
  const calculateFrontendTotals = () => {
    let frontendSubtotal = 0;
    let frontendGSTAmount = 0;
    let frontendTotalItems = 0;

    cartItems.forEach((item) => {
      frontendSubtotal += item.itemSubtotal;
      frontendGSTAmount += item.gstAmount;
      frontendTotalItems += item.quantity;
    });

    return {
      subtotal: Math.round(frontendSubtotal * 100) / 100,
      gstAmount: Math.round(frontendGSTAmount * 100) / 100,
      totalAmount:
        Math.round((frontendSubtotal + frontendGSTAmount) * 100) / 100,
      totalItems: frontendTotalItems,
    };
  };

  const frontendTotals = calculateFrontendTotals();

  // ✅ Verify totals match backend
  const totalsMatch = Math.abs(frontendTotals.totalAmount - totalAmount) < 0.01;

  const handleProceedToCheckout = () => {
    if (!totalsMatch) {
      alert("Cart totals don't match. Please refresh and try again.");
      return;
    }

    navigate("/checkout");
  };

  // Loading state
  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Error Loading Cart
            </h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => getCartItems(dispatch)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleContinueShopping}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-3xl font-bold text-gray-800">Order Cart</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-gray-600">
              <span className="font-medium">{totalItems}</span> item
              {totalItems !== 1 ? "s" : ""} in cart
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              // ✅ Use productId directly (new structure)
              const itemId = item.productId;
              const isItemUpdating = updatingItems.has(itemId);
              const isItemRemoving = removingItems.has(itemId);

              return (
                <div
                  key={itemId}
                  className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-opacity ${
                    isItemRemoving ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1584622781564-1d987ce3d4d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                        }
                        alt={item.name || "Product"}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            {item.name || "Product Name"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            SKU: {item.sku || "N/A"}
                          </p>
                          {/* ✅ Display GST rate */}
                          <div className="text-xs text-gray-500 mt-1">
                            GST: {item.gstRate}%
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(itemId)}
                          disabled={isItemRemoving}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors group disabled:opacity-50"
                        >
                          {isItemRemoving ? (
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                          )}
                        </button>
                      </div>

                      {/* ✅ Display GST rate prominently */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                          GST: {item.gstRate}%
                        </span>
                        <span
                          className={`font-medium ${
                            item.stock > 10
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          {item.stock > 10
                            ? "In Stock"
                            : `Only ${item.stock} left!`}
                        </span>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(itemId, item.quantity - 1)
                              }
                              disabled={isItemUpdating || item.quantity <= 1}
                              className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-4 py-2 font-medium min-w-[60px] text-center">
                              {isItemUpdating ? (
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(itemId, item.quantity + 1)
                              }
                              disabled={
                                isItemUpdating || item.quantity >= item.stock
                              }
                              className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* ✅ Updated price display with GST breakdown */}
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-800">
                              ₹{item.itemTotal.toLocaleString()}
                            </span>
                            {item.originalPrice &&
                              item.originalPrice > item.unitPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹
                                  {(
                                    item.originalPrice * item.quantity
                                  ).toLocaleString()}
                                </span>
                              )}
                          </div>

                          {/* ✅ Show GST breakdown clearly */}
                          <div className="text-xs text-gray-600 space-y-0.5">
                            <div>
                              ₹{item.unitPrice} × {item.quantity} = ₹
                              {item.itemSubtotal.toLocaleString()}
                            </div>
                            <div className="text-blue-600 font-medium">
                              GST ({item.gstRate}%): +₹
                              {item.gstAmount.toFixed(2)}
                            </div>
                            <div className="text-gray-800 font-semibold border-t border-gray-200 pt-0.5">
                              Total: ₹{item.itemTotal.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* ✅ Updated Order Breakdown - NO FREE SHIPPING */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{frontendTotals.subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>GST (Total)</span>
                  <span>₹{frontendTotals.gstAmount.toLocaleString()}</span>
                </div>

                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <span>₹{frontendTotals.totalAmount.toLocaleString()}</span>
                </div>

                {/* ✅ Show verification status */}
                {!totalsMatch && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                    ⚠️ Cart totals need verification. Please refresh.
                  </div>
                )}
              </div>
              {/* ✅ Bank Details Section */}
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Payment Information
                  </span>
                </div>
                <div className="text-xs text-green-700 space-y-2">
                  <div className="bg-white p-3 rounded border border-green-200 font-bold">
                    <div className="font-semibold text-green-800 mb-2">
                      Bank Details(For NEFT/IMPS/RTGS):
                    </div>
                    <div className="space-y-1">
                      <div>
                        <span className="font-medium">Account Name:</span> BAGMA
                        OVERSEAS
                      </div>
                      <div>
                        <span className="font-medium">Current A/C No.</span>{" "}
                        510101004343696
                      </div>

                      <div>
                        <span className="font-medium">Bank:</span> UNION BANK of
                        INDIA,
                      </div>
                      <div>
                        <span className="font-medium">IFSC Code:</span>{" "}
                        UBIN0905496
                      </div>
                      <div>
                        <span className="font-medium">Branch:</span> Gujranwala
                        Branch Delhi -9.
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200 font-bold">
                    <div className="font-semibold text-green-800 mb-2">
                      UPI:
                    </div>
                    <div className="space-y-1">
                      <div>
                        <span className="font-medium">Mobile ID:</span>{" "}
                        9810735041
                      </div>
                      <div>
                        <span className="font-medium">Upi ID:</span>{" "}
                        dhargdprasad@oksbi
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <div className="font-semibold text-green-800 mb-2">
                      After Order/Payment you can call at:
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">📞 Call:</span>
                      <a
                        href="tel:+918178211858"
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        +91-9810735041
                      </a>
                    </div>
                    {/* <div className="text-xs text-gray-600 mt-1">
                      Your Order will be shared via Email
                    </div> */}
                    {/* <div className="text-xs text-gray-600 mt-1">
                      Share payment screenshot
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Delivery Info - NO FREE SHIPPING MENTION */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Delivery Information
                  </span>
                </div>
                <div className="text-xs text-blue-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>Contact the SELLER</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    <span>Secure packaging and handling</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() =>
                  navigate("/select-address", {
                    state: {
                      orderSummary: {
                        items: cartItems,
                        subtotal: frontendTotals.subtotal,
                        gstAmount: frontendTotals.gstAmount,
                        totalAmount: frontendTotals.totalAmount,
                        totalItems: frontendTotals.totalItems,
                      },
                    },
                  })
                }
                className="bg-blue-600 text-white w-full py-4 rounded-lg font-bold"
              >
                Proceed to Address Selection
              </button>

              {/* Security Badges */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
