import toast from "react-hot-toast";
import {
  addToCartFailure,
  addToCartStart,
  addToCartSuccess,
  clearCartFailure,
  clearCartStart,
  clearCartSuccess,
  fetchCartFailure,
  fetchCartStart,
  fetchCartSuccess,
  removeFromCartFailure,
  removeFromCartStart,
  removeFromCartSuccess,
  updateCartFailure,
  updateCartStart,
  updateCartSuccess,
} from "../../store/customer/cartSlice";
import api from "../api";

// Toast Options
const ErrorToastOptions = {
  duration: 4000,
  style: { background: "#f87171", color: "#fff" },
};

const SuccessToastOptions = {
  duration: 3000,
  style: { background: "#4ade80", color: "#000" },
};

const WarningToastOptions = {
  duration: 3000,
  style: { background: "#fbbf24", color: "#000" },
};

// Parse error messages
const parseError = (error) => {
  if (error.response) {
    return error.response.data.message || "Invalid response from server.";
  } else if (error.request) {
    return "Network error. Please check your internet connection.";
  } else {
    return "Something went wrong.";
  }
};

// ✅ Get cart items
export const getCartItems = async (dispatch) => {
  try {
    dispatch(fetchCartStart());

    const response = await api.get("/cart");
    const cartData = response.data.cart || response.data;

    dispatch(fetchCartSuccess(cartData));

    return cartData;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(fetchCartFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Add item to cart
export const addToCart = async (dispatch, productData) => {
  try {
    dispatch(addToCartStart());

    const { productId, quantity = 1, specifications = {} } = productData;

    if (!productId) {
      throw new Error("Product ID is required");
    }

    const payload = {
      productId,
      quantity,
      specifications,
    };

    const response = await api.post("/cart/add", payload);
    const cartData = response.data.cart || response.data;

    dispatch(addToCartSuccess(cartData));
    toast.success("Product added to cart successfully!", SuccessToastOptions);

    return cartData;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(addToCartFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Update cart item quantity
export const updateCartItem = async (dispatch, itemId, quantity) => {
  try {
    dispatch(updateCartStart());

    if (!itemId) {
      throw new Error("Item ID is required");
    }

    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    const payload = { quantity };

    const response = await api.put(`/cart/update/${itemId}`, payload);
    const cartData = response.data.cart || response.data;

    dispatch(updateCartSuccess(cartData));
    toast.success("Cart updated successfully!", SuccessToastOptions);

    return cartData;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(updateCartFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Remove item from cart
export const removeFromCart = async (dispatch, itemId) => {
  try {
    dispatch(removeFromCartStart());

    if (!itemId) {
      throw new Error("Item ID is required");
    }

    const response = await api.delete(`/cart/remove/${itemId}`);
    const cartData = response.data.cart || response.data;

    dispatch(removeFromCartSuccess(cartData));
    toast.success("Item removed from cart!", SuccessToastOptions);

    return cartData;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(removeFromCartFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Clear entire cart
export const clearCart = async (dispatch) => {
  try {
    dispatch(clearCartStart());

    const response = await api.delete("/cart/clear");
    const result = response.data;

    dispatch(clearCartSuccess());
    toast.success("Cart cleared successfully!", SuccessToastOptions);

    return result;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(clearCartFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Add multiple items to cart (bulk add)
export const addMultipleToCart = async (dispatch, items) => {
  try {
    dispatch(addToCartStart());

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Items array is required");
    }

    // Validate each item
    items.forEach((item, index) => {
      if (!item.productId) {
        throw new Error(`Product ID is required for item ${index + 1}`);
      }
    });

    const payload = { items };

    const response = await api.post("/cart/add-multiple", payload);
    const cartData = response.data.cart || response.data;

    dispatch(addToCartSuccess(cartData));
    toast.success(`${items.length} items added to cart!`, SuccessToastOptions);

    return cartData;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(addToCartFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Get cart summary (totals, counts, etc.)
export const getCartSummary = async (dispatch) => {
  try {
    const response = await api.get("/cart/summary");
    const summaryData = response.data.summary || response.data;

    return summaryData;
  } catch (error) {
    const errorMessage = parseError(error);
    console.error("Error fetching cart summary:", errorMessage);
    return null;
  }
};

// ✅ Validate cart items (check stock, prices, etc.)
export const validateCart = async (dispatch) => {
  try {
    const response = await api.post("/cart/validate");
    const validationResult = response.data;

    if (validationResult.hasIssues) {
      toast.warning(
        "Some items in your cart have changed. Please review.",
        WarningToastOptions
      );
    }

    return validationResult;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Apply coupon/discount code
export const applyCoupon = async (dispatch, couponCode) => {
  try {
    if (!couponCode || couponCode.trim() === "") {
      throw new Error("Coupon code is required");
    }

    const payload = { couponCode: couponCode.trim().toUpperCase() };

    const response = await api.post("/cart/apply-coupon", payload);
    const cartData = response.data.cart || response.data;

    dispatch(updateCartSuccess(cartData));
    toast.success("Coupon applied successfully!", SuccessToastOptions);

    return cartData;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Remove coupon/discount code
export const removeCoupon = async (dispatch) => {
  try {
    const response = await api.post("/cart/remove-coupon");
    const cartData = response.data.cart || response.data;

    dispatch(updateCartSuccess(cartData));
    toast.success("Coupon removed successfully!", SuccessToastOptions);

    return cartData;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Save cart for later (wishlist functionality)
export const saveCartForLater = async (dispatch) => {
  try {
    const response = await api.post("/cart/save-for-later");
    const result = response.data;

    toast.success("Cart saved for later!", SuccessToastOptions);

    return result;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Restore saved cart
export const restoreSavedCart = async (dispatch) => {
  try {
    dispatch(fetchCartStart());

    const response = await api.post("/cart/restore-saved");
    const cartData = response.data.cart || response.data;

    dispatch(fetchCartSuccess(cartData));
    toast.success("Saved cart restored!", SuccessToastOptions);

    return cartData;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(fetchCartFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Calculate shipping costs
export const calculateShipping = async (dispatch, shippingAddress) => {
  try {
    if (!shippingAddress) {
      throw new Error("Shipping address is required");
    }

    const payload = { shippingAddress };

    const response = await api.post("/cart/calculate-shipping", payload);
    const shippingData = response.data.shipping || response.data;

    return shippingData;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Estimate delivery date
export const estimateDelivery = async (dispatch, shippingMethod, address) => {
  try {
    const payload = { shippingMethod, address };

    const response = await api.post("/cart/estimate-delivery", payload);
    const deliveryData = response.data.delivery || response.data;

    return deliveryData;
  } catch (error) {
    const errorMessage = parseError(error);
    console.error("Error estimating delivery:", errorMessage);
    return null;
  }
};

// ✅ Update cart item specifications
export const updateCartItemSpecs = async (dispatch, itemId, specifications) => {
  try {
    dispatch(updateCartStart());

    if (!itemId) {
      throw new Error("Item ID is required");
    }

    const payload = { specifications };

    const response = await api.put(`/cart/update-specs/${itemId}`, payload);
    const cartData = response.data.cart || response.data;

    dispatch(updateCartSuccess(cartData));
    toast.success("Item specifications updated!", SuccessToastOptions);

    return cartData;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(updateCartFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Check product availability before adding to cart
export const checkProductAvailability = async (productId, quantity) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    const response = await api.get(`/products/${productId}/availability`, {
      params: { quantity },
    });

    return response.data;
  } catch (error) {
    const errorMessage = parseError(error);
    console.error("Error checking availability:", errorMessage);
    return { available: false, message: errorMessage };
  }
};

// ✅ Quick add to cart with minimal data
export const quickAddToCart = async (dispatch, productId, quantity = 1) => {
  try {
    // Check availability first
    const availability = await checkProductAvailability(productId, quantity);

    if (!availability.available) {
      toast.error(
        availability.message || "Product not available",
        ErrorToastOptions
      );
      return null;
    }

    // Add to cart
    return await addToCart(dispatch, { productId, quantity });
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};
