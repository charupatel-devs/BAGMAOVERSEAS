import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemCount: 0,
  totalItems: 0,
  subtotal: 0,
  gstAmount: 0,
  totalAmount: 0,
  // Loading states
  isFetching: false,
  isUpdating: false,
  isAdding: false,
  isRemoving: false,
  isClearing: false,
  error: null,
  lastUpdated: null,
};

const cartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    // Fetch cart actions
    fetchCartStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    fetchCartSuccess: (state, action) => {
      state.isFetching = false;
      const cartData = action.payload.cart || action.payload;

      state.items = cartData.items || [];
      state.itemCount = cartData.itemCount || 0;
      state.totalItems = cartData.totalItems || 0;
      state.subtotal = cartData.subtotal || 0;
      state.gstAmount = cartData.gstAmount || 0;
      state.totalAmount = cartData.totalAmount || 0;
      state.lastUpdated = new Date().toISOString();
      state.error = null;
    },
    fetchCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // Add to cart actions
    addToCartStart: (state) => {
      state.isAdding = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      state.isAdding = false;
      const cartData = action.payload.cart || action.payload;

      // ✅ Update with new cart data
      state.items = cartData.items || [];
      state.itemCount = cartData.itemCount || 0;
      state.totalItems = cartData.totalItems || 0;
      state.subtotal = cartData.subtotal || 0;
      state.gstAmount = cartData.gstAmount || 0;
      state.totalAmount = cartData.totalAmount || 0;
      state.lastUpdated = new Date().toISOString();
      state.error = null;
    },
    addToCartFailure: (state, action) => {
      state.isAdding = false;
      state.error = action.payload;
    },

    // Update cart actions
    updateCartStart: (state) => {
      state.isUpdating = true;
      state.error = null;
    },
    updateCartSuccess: (state, action) => {
      state.isUpdating = false;
      const cartData = action.payload.cart || action.payload;

      // ✅ Update with new cart data
      state.items = cartData.items || [];
      state.itemCount = cartData.itemCount || 0;
      state.totalItems = cartData.totalItems || 0;
      state.subtotal = cartData.subtotal || 0;
      state.gstAmount = cartData.gstAmount || 0;
      state.totalAmount = cartData.totalAmount || 0;
      state.lastUpdated = new Date().toISOString();
      state.error = null;
    },
    updateCartFailure: (state, action) => {
      state.isUpdating = false;
      state.error = action.payload;
    },

    // Remove from cart actions
    removeFromCartStart: (state) => {
      state.isRemoving = true;
      state.error = null;
    },
    removeFromCartSuccess: (state, action) => {
      state.isRemoving = false;
      const cartData = action.payload.cart || action.payload;

      // ✅ Update with new cart data
      state.items = cartData.items || [];
      state.itemCount = cartData.itemCount || 0;
      state.totalItems = cartData.totalItems || 0;
      state.subtotal = cartData.subtotal || 0;
      state.gstAmount = cartData.gstAmount || 0;
      state.totalAmount = cartData.totalAmount || 0;
      state.lastUpdated = new Date().toISOString();
      state.error = null;
    },
    removeFromCartFailure: (state, action) => {
      state.isRemoving = false;
      state.error = action.payload;
    },

    // Clear cart actions
    clearCartStart: (state) => {
      state.isClearing = true;
      state.error = null;
    },
    clearCartSuccess: (state) => {
      state.isClearing = false;
      // ✅ Reset to empty cart state
      state.items = [];
      state.itemCount = 0;
      state.totalItems = 0;
      state.subtotal = 0;
      state.gstAmount = 0;
      state.totalAmount = 0;
      state.lastUpdated = new Date().toISOString();
      state.error = null;
    },
    clearCartFailure: (state, action) => {
      state.isClearing = false;
      state.error = action.payload;
    },

    // ✅ Local cart actions (for optimistic updates - now using new structure)
    updateItemQuantityLocal: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === itemId);

      if (item) {
        const oldQuantity = item.quantity;
        item.quantity = quantity;

        // ✅ Recalculate item totals
        item.itemSubtotal = Math.round(item.unitPrice * quantity * 100) / 100;
        item.gstAmount =
          Math.round(item.itemSubtotal * (item.gstRate / 100) * 100) / 100;
        item.itemTotal =
          Math.round((item.itemSubtotal + item.gstAmount) * 100) / 100;

        // ✅ Update cart totals
        state.totalItems = state.totalItems - oldQuantity + quantity;
        state.subtotal = state.items.reduce(
          (total, item) => total + item.itemSubtotal,
          0
        );
        state.gstAmount = state.items.reduce(
          (total, item) => total + item.gstAmount,
          0
        );
        state.totalAmount =
          Math.round((state.subtotal + state.gstAmount) * 100) / 100;
      }
    },

    removeItemLocal: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.productId === itemId
      );

      if (itemIndex !== -1) {
        const removedItem = state.items[itemIndex];

        // ✅ Update totals before removing
        state.totalItems -= removedItem.quantity;
        state.subtotal -= removedItem.itemSubtotal;
        state.gstAmount -= removedItem.gstAmount;
        state.totalAmount =
          Math.round((state.subtotal + state.gstAmount) * 100) / 100;

        // ✅ Remove item and update item count
        state.items.splice(itemIndex, 1);
        state.itemCount = state.items.length;
      }
    },

    // ✅ Add item locally (for optimistic add)
    addItemLocal: (state, action) => {
      const {
        productId,
        name,
        sku,
        image,
        quantity,
        unitPrice,
        originalPrice,
        gstRate,
        stock,
      } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        // ✅ Update existing item
        const existingItem = state.items[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;

        existingItem.quantity = newQuantity;
        existingItem.itemSubtotal =
          Math.round(unitPrice * newQuantity * 100) / 100;
        existingItem.gstAmount =
          Math.round(existingItem.itemSubtotal * (gstRate / 100) * 100) / 100;
        existingItem.itemTotal =
          Math.round(
            (existingItem.itemSubtotal + existingItem.gstAmount) * 100
          ) / 100;
      } else {
        // ✅ Add new item
        const itemSubtotal = Math.round(unitPrice * quantity * 100) / 100;
        const itemGstAmount =
          Math.round(itemSubtotal * (gstRate / 100) * 100) / 100;

        state.items.push({
          productId,
          name,
          sku,
          image,
          quantity,
          unitPrice,
          originalPrice,
          gstRate,
          itemSubtotal,
          gstAmount: itemGstAmount,
          itemTotal: Math.round((itemSubtotal + itemGstAmount) * 100) / 100,
          stock,
          addedAt: new Date().toISOString(),
        });

        state.itemCount = state.items.length;
      }

      // ✅ Recalculate totals
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.subtotal = state.items.reduce(
        (total, item) => total + item.itemSubtotal,
        0
      );
      state.gstAmount = state.items.reduce(
        (total, item) => total + item.gstAmount,
        0
      );
      state.totalAmount =
        Math.round((state.subtotal + state.gstAmount) * 100) / 100;
    },

    // Reset error
    clearCartError: (state) => {
      state.error = null;
    },

    // Reset all loading states
    resetCartLoading: (state) => {
      state.isFetching = false;
      state.isUpdating = false;
      state.isAdding = false;
      state.isRemoving = false;
      state.isClearing = false;
    },

    // ✅ Recalculate totals (utility action)
    recalculateCartTotals: (state) => {
      state.itemCount = state.items.length;
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.subtotal = state.items.reduce(
        (total, item) => total + item.itemSubtotal,
        0
      );
      state.gstAmount = state.items.reduce(
        (total, item) => total + item.gstAmount,
        0
      );
      state.totalAmount =
        Math.round((state.subtotal + state.gstAmount) * 100) / 100;
    },
  },
});

export const {
  fetchCartStart,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
  removeFromCartStart,
  removeFromCartSuccess,
  removeFromCartFailure,
  clearCartStart,
  clearCartSuccess,
  clearCartFailure,
  updateItemQuantityLocal,
  removeItemLocal,
  addItemLocal,
  clearCartError,
  resetCartLoading,
  recalculateCartTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
