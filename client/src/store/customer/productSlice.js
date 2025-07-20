import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currentProduct: null,
  pagination: {},
  stats: {},
  loading: false,
  error: null,
  filters: {},
};

const userProductsSlice = createSlice({
  name: "userProducts",
  initialState,
  reducers: {
    FetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    FetchProductsSuccess: (state, action) => {
      state.loading = false;
      // "mode" can help determine list vs single
      switch (action.payload.mode) {
        case "single":
          state.currentProduct = action.payload.product || null;
          break;
        case "list":
        default:
          state.products = action.payload.products || [];
          state.pagination = action.payload.pagination || {};
          state.stats = action.payload.stats || {};
          break;
      }
    },
    FetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong.";
    },
    ClearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
});

export const {
  FetchProductsStart,
  FetchProductsSuccess,
  FetchProductsFailure,
  ClearCurrentProduct,
} = userProductsSlice.actions;

export default userProductsSlice.reducer;
