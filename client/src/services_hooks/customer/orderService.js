import toast from "react-hot-toast";
import {
  cancelOrderFailure,
  cancelOrderStart,
  cancelOrderSuccess,
  createOrderFailure,
  createOrderStart,
  createOrderSuccess,
  fetchOrderFailure,
  fetchOrdersFailure,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrderStart,
  fetchOrderSuccess,
} from "../../store/customer/orderSlice";
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

const InfoToastOptions = {
  duration: 3000,
  style: { background: "#60a5fa", color: "#fff" },
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

export const fetchUserOrders = async (params = {}, dispatch) => {
  try {
    console.log("Fetching user orders with params:", params);
    dispatch(fetchOrdersStart());

    const {
      filters = {},
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
      status = "",
    } = params;

    const query = new URLSearchParams();

    // Use filters from slice or params
    if (filters.status || status) {
      query.set("status", filters.status || status);
    }
    if (search) query.set("search", search);
    query.set("sortBy", filters.sortBy || sortBy);
    query.set("sortOrder", filters.sortOrder || sortOrder);

    const response = await api.get(`/orders?${query.toString()}`);
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    console.error("Fetch orders error:", error);
    dispatch(fetchOrdersFailure(error.message));
  }
};

export const fetchOrderById = async (dispatch, orderId) => {
  try {
    dispatch(fetchOrderStart());
    const res = await api.get(`/orders/${orderId}`);
    dispatch(fetchOrderSuccess(res.data.order));
    return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || error.message;
    dispatch(fetchOrderFailure(message));
    toast.error(`Failed to fetch order: ${message}`);
    return null;
  }
};
/// ✅ Create new order from cart
export const createOrder = async (dispatch, orderData) => {
  try {
    dispatch(createOrderStart());

    const { shippingAddress, useCartItems = true } = orderData;

    if (!shippingAddress) {
      throw new Error("Shipping address is required");
    }

    const payload = {
      shippingAddress,
      useCartItems,
    };

    const response = await api.post("/orders/create", payload); // ✅ Correct endpoint
    const createdOrder = response.data.order || response.data;

    dispatch(updateOrderSuccess(createdOrder));
    toast.success("Order placed successfully!", SuccessToastOptions);

    return response.success;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(updateOrderFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Request order return/refund
export const requestReturn = async (dispatch, orderId, returnData) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const {
      items,
      reason,
      description,
      returnType = "refund", // "refund" or "exchange"
    } = returnData;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Return items are required");
    }

    if (!reason) {
      throw new Error("Return reason is required");
    }

    const payload = {
      items,
      reason,
      description,
      returnType,
    };

    const response = await api.post(`/orders/${orderId}/return`, payload);
    const returnRequest = response.data.return || response.data;

    toast.success(
      "Return request submitted successfully!",
      SuccessToastOptions
    );

    return returnRequest;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Get order returns
export const getOrderReturns = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const response = await api.get(`/orders/${orderId}/returns`);
    const returnsData = response.data.returns || response.data;

    return returnsData;
  } catch (error) {
    const errorMessage = parseError(error);
    console.error("Error fetching returns:", errorMessage);
    return null;
  }
};

// ✅ Rate and review order items
export const submitOrderReview = async (orderId, reviewData) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const {
      items, // Array of { productId, rating, comment }
      overallRating,
      overallComment,
    } = reviewData;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Review items are required");
    }

    const payload = {
      items,
      overallRating,
      overallComment,
    };

    const response = await api.post(`/orders/${orderId}/review`, payload);
    const reviewResult = response.data;

    toast.success("Review submitted successfully!", SuccessToastOptions);

    return reviewResult;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Get order summary/statistics
export const getOrderSummary = async (params = {}) => {
  try {
    const { startDate, endDate, status } = params;

    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (status) queryParams.append("status", status);

    const response = await api.get(`/orders/summary?${queryParams}`);
    const summaryData = response.data.summary || response.data;

    return summaryData;
  } catch (error) {
    const errorMessage = parseError(error);
    console.error("Error fetching order summary:", errorMessage);
    return null;
  }
};

// ✅ Reorder (create new order from existing order)
export const reorder = async (dispatch, orderId) => {
  try {
    dispatch(createOrderStart());

    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const response = await api.post(`/orders/${orderId}/reorder`);
    const newOrder = response.data.order || response.data;

    dispatch(createOrderSuccess(newOrder));
    toast.success("Order placed successfully!", SuccessToastOptions);

    return newOrder;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(createOrderFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Add items to cart from order
export const addOrderToCart = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const response = await api.post(`/orders/${orderId}/add-to-cart`);
    const result = response.data;

    toast.success("Items added to cart successfully!", SuccessToastOptions);

    return result;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Update shipping address (if order not shipped)
export const updateShippingAddress = async (dispatch, orderId, newAddress) => {
  try {
    dispatch(updateOrderStart());

    if (!orderId) {
      throw new Error("Order ID is required");
    }

    if (!newAddress) {
      throw new Error("New shipping address is required");
    }

    const payload = { shippingAddress: newAddress };

    const response = await api.put(
      `/orders/${orderId}/shipping-address`,
      payload
    );
    const updatedOrder = response.data.order || response.data;

    dispatch(updateOrderSuccess(updatedOrder));
    toast.success(
      "Shipping address updated successfully!",
      SuccessToastOptions
    );

    return updatedOrder;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(updateOrderFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Get delivery estimates
export const getDeliveryEstimate = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const response = await api.get(`/orders/${orderId}/delivery-estimate`);
    const estimateData = response.data.estimate || response.data;

    return estimateData;
  } catch (error) {
    const errorMessage = parseError(error);
    console.error("Error fetching delivery estimate:", errorMessage);
    return null;
  }
};

// ✅ Confirm order receipt
export const confirmOrderReceipt = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const response = await api.post(`/orders/${orderId}/confirm-receipt`);
    const result = response.data;

    toast.success("Order receipt confirmed!", SuccessToastOptions);

    return result;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Get order notifications/updates
export const getOrderNotifications = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const response = await api.get(`/orders/${orderId}/notifications`);
    const notificationsData = response.data.notifications || response.data;

    return notificationsData;
  } catch (error) {
    const errorMessage = parseError(error);
    console.error("Error fetching notifications:", errorMessage);
    return null;
  }
};

// ✅ Subscribe to order updates
export const subscribeToOrderUpdates = async (orderId, preferences) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const payload = { preferences };

    const response = await api.post(
      `/orders/${orderId}/subscribe-updates`,
      payload
    );
    const result = response.data;

    toast.success("Subscribed to order updates!", InfoToastOptions);

    return result;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Calculate order total before placing
export const calculateOrderTotal = async (orderData) => {
  try {
    const payload = orderData;

    const response = await api.post("/orders/calculate-total", payload);
    const totalData = response.data.total || response.data;

    return totalData;
  } catch (error) {
    const errorMessage = parseError(error);
    console.error("Error calculating order total:", errorMessage);
    return null;
  }
};

// ✅ Validate order before placing
export const validateOrder = async (orderData) => {
  try {
    const payload = orderData;

    const response = await api.post("/orders/validate", payload);
    const validationResult = response.data;

    if (validationResult.hasIssues) {
      toast.warning(
        "Some issues found with your order. Please review.",
        ErrorToastOptions
      );
    }

    return validationResult;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Create order with specific items (not from cart)
export const createDirectOrder = async (dispatch, orderData) => {
  try {
    dispatch(createOrderStart());

    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      shippingMethod,
      notes,
    } = orderData;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Order items are required");
    }

    if (!shippingAddress) {
      throw new Error("Shipping address is required");
    }

    if (!paymentMethod) {
      throw new Error("Payment method is required");
    }

    const payload = {
      items,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      shippingMethod,
      notes,
    };

    const response = await api.post("/orders/direct", payload);
    const newOrder = response.data.order || response.data;

    dispatch(createOrderSuccess(newOrder));
    toast.success("Order placed successfully!", SuccessToastOptions);

    return newOrder;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(createOrderFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Update order (limited fields)
export const updateOrder = async (dispatch, orderId, updateData) => {
  try {
    dispatch(updateOrderStart());

    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const payload = updateData;

    const response = await api.put(`/orders/${orderId}`, payload);
    const updatedOrder = response.data.order || response.data;

    dispatch(updateOrderSuccess(updatedOrder));
    toast.success("Order updated successfully!", SuccessToastOptions);

    return updatedOrder;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(updateOrderFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Cancel order
export const cancelOrder = async (dispatch, orderId, reason = "") => {
  try {
    dispatch(cancelOrderStart());

    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const payload = { reason };

    const response = await api.post(`/orders/${orderId}/cancel`, payload);
    const cancelledOrder = response.data.order || response.data;

    dispatch(cancelOrderSuccess(cancelledOrder));
    toast.success("Order cancelled successfully!", SuccessToastOptions);

    return cancelledOrder;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(cancelOrderFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Track order
export const trackOrder = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const response = await api.get(`/orders/${orderId}/track`);
    const trackingData = response.data.tracking || response.data;

    return trackingData;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};

// ✅ Get order invoice
export const getOrderInvoice = async (orderId) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const response = await api.get(`/orders/${orderId}/invoice`, {
      responseType: "blob", // Important for file download
    });

    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success("Invoice downloaded successfully!", SuccessToastOptions);

    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return false;
  }
};
