import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currentProduct: null, // Use null for single object
  currentCategory: null,
  stockAdjustments: [],
  stats: {
    totalProducts: 0,
    categories: 0,
    lowStockItems: 0,
    outOfStock: 0,
  },
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
    limit: 5,
    hasNextPage: false,
    hasPrevPage: false,
  },
  filters: {
    search: "",
    category: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  isFetching: false,
  error: false,
  errMsg: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ProductActionStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.errMsg = "";
    },
    ProductActionFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errMsg = action.payload;
    },
    ProductActionSuccess: (state, action) => {
      const { type, payload } = action.payload;
      state.isFetching = false;
      state.error = false;
      state.errMsg = "";

      switch (type) {
        case "GET_PRODUCTS":
          state.products = payload.products;
          state.stats = payload.stats;
          state.pagination = payload.pagination;
          break;
        case "GET_PRODUCT_NAMES":
          console.log(payload.products);
          state.products = payload.products;
          break;
        case "GET_SINGLE_PRODUCT":
          state.currentProduct = payload.product;
          state.currentCategory = payload.category;
          break;

        case "ADD_PRODUCT":
          state.products.unshift(payload);
          state.stats.totalProducts += 1;
          break;

        case "UPDATE_PRODUCT":
          {
            const updateIndex = state.products.findIndex(
              (product) => product._id === payload._id
            );
            if (updateIndex !== -1) {
              state.products[updateIndex] = payload;
            }
            if (
              state.currentProduct &&
              state.currentProduct._id === payload._id
            ) {
              state.currentProduct = payload;
            }
          }
          break;

        case "DELETE_PRODUCT":
          state.products = state.products.filter(
            (product) => product._id !== payload
          );
          state.stats.totalProducts = Math.max(
            0,
            state.stats.totalProducts - 1
          );
          if (state.currentProduct && state.currentProduct._id === payload) {
            state.currentProduct = null;
          }
          break;

        case "BULK_IMPORT":
        case "EXPORT_PRODUCTS":
          break;

        default:
          break;
      }
    },
    SetProductFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    ClearProductFilters: (state) => {
      state.filters = {
        search: "",
        category: "",
        status: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      };
    },
    ClearProductError: (state) => {
      state.error = false;
      state.errMsg = "";
      state.isFetching = false;
    },
    ResetProductsState: () => initialState,
  },
});

export const {
  ProductActionStart,
  ProductActionSuccess,
  ProductActionFailure,
  SetProductFilters,
  ClearProductFilters,
  ClearProductError,
  ResetProductsState,
} = productSlice.actions;

export default productSlice.reducer;
