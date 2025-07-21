import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
  orderStats: {},

  // State flags
  isFetching: false,
  isFetchingOrders: false,
  isCreating: false,
  isUpdating: false,
  isCancelling: false,

  // Errors
  error: null,
  orderError: null,

  // Filters
  filters: {
    status: "",
    startDate: "",
    endDate: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },

  // Metadata
  totalOrders: 0,
  lastUpdated: null,
};

const orderSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    // === FETCH ALL ORDERS ===
    fetchOrdersStart(state) {
      state.isFetchingOrders = true;
      state.error = null;
    },
    fetchOrdersSuccess(state, action) {
      state.isFetchingOrders = false;
      state.orders = action.payload.orders || [];
      state.totalOrders = action.payload.results || 0;
      state.orderStats = action.payload.stats || {};
      state.lastUpdated = new Date().toISOString();
      state.error = null;
    },
    fetchOrdersFailure(state, action) {
      state.isFetchingOrders = false;
      state.error = action.payload;
    },

    // === FETCH SINGLE ORDER ===
    fetchOrderStart(state) {
      state.isFetching = true;
      state.orderError = null;
    },
    fetchOrderSuccess(state, action) {
      state.isFetching = false;
      state.currentOrder = action.payload;
      state.orderError = null;
    },
    fetchOrderFailure(state, action) {
      state.isFetching = false;
      state.orderError = action.payload;
    },

    // === CREATE ORDER ===
    createOrderStart(state) {
      state.isCreating = true;
      state.error = null;
    },
    createOrderSuccess(state, action) {
      state.isCreating = false;
      state.currentOrder = action.payload;
      state.orders.unshift(action.payload);
      state.totalOrders += 1;
      state.error = null;
    },
    createOrderFailure(state, action) {
      state.isCreating = false;
      state.error = action.payload;
    },

    // === CANCEL ORDER ===
    cancelOrderStart(state) {
      state.isCancelling = true;
      state.error = null;
    },
    cancelOrderSuccess(state, action) {
      const cancelledOrder = action.payload;
      state.isCancelling = false;

      // Update in list & currentOrder
      const index = state.orders.findIndex((o) => o._id === cancelledOrder._id);
      if (index !== -1) {
        state.orders[index] = cancelledOrder;
      }
      if (state.currentOrder?._id === cancelledOrder._id) {
        state.currentOrder = cancelledOrder;
      }
      state.error = null;
    },
    cancelOrderFailure(state, action) {
      state.isCancelling = false;
      state.error = action.payload;
    },

    // === FILTERS ===
    setOrderFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearOrderFilters(state) {
      state.filters = {
        status: "",
        startDate: "",
        endDate: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      };
    },

    // === MISC ===
    clearCurrentOrder(state) {
      state.currentOrder = null;
      state.orderError = null;
    },
    clearOrderError(state) {
      state.error = null;
      state.orderError = null;
    },
    resetOrderLoading(state) {
      state.isFetching = false;
      state.isFetchingOrders = false;
      state.isCreating = false;
      state.isUpdating = false;
      state.isCancelling = false;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  cancelOrderStart,
  cancelOrderSuccess,
  cancelOrderFailure,
  setOrderFilters,
  clearOrderFilters,
  clearCurrentOrder,
  clearOrderError,
  resetOrderLoading,
} = orderSlice.actions;

export default orderSlice.reducer;
