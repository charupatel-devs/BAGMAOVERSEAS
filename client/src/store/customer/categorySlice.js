import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
  lastFetch: null, // keep if you want to know when it was fetched (optional)
};

const categoriesSlice = createSlice({
  name: "userCategories",
  initialState,
  reducers: {
    // Fetch all categories
    FetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    FetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
      state.lastFetch = new Date().toISOString();
      state.error = null;
    },
    FetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  FetchCategoriesStart,
  FetchCategoriesSuccess,
  FetchCategoriesFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
