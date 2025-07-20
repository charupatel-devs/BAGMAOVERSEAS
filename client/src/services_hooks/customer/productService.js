// client/src/services_hooks/customer/productService.js

import {
  FetchProductsFailure,
  FetchProductsStart,
  FetchProductsSuccess,
} from "../../store/customer/productSlice";
import api from "../api";

// Fetch categories
export const getCategories = () =>
  api.get("/categories").then((res) => {
    const data = Array.isArray(res.data) ? res.data : res.data.data || [];
    return { data };
  });

// Fetch products list
export const getProducts = async (dispatch, filters = {}) => {
  try {
    dispatch(FetchProductsStart());
    // ...build your URL as before
    const response = await api.get("/products", { params: filters });
    dispatch(
      FetchProductsSuccess({
        products: response.data.products,
        pagination: response.data.pagination,
        stats: response.data.stats,
        mode: "list",
      })
    );
  } catch (error) {
    dispatch(
      FetchProductsFailure(
        error?.response?.data?.message || "Failed to fetch products"
      )
    );
  }
};

// Fetch single product
export const getProductById = async (dispatch, productId) => {
  try {
    dispatch(FetchProductsStart());
    const response = await api.get(`/products/${productId}`);
    dispatch(
      FetchProductsSuccess({
        product: response.data.product,
        mode: "single",
      })
    );
  } catch (error) {
    dispatch(
      FetchProductsFailure(
        error?.response?.data?.message || "Failed to fetch product"
      )
    );
  }
};
