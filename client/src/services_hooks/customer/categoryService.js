import toast from "react-hot-toast";

import {
  FetchCategoriesFailure,
  FetchCategoriesStart,
  FetchCategoriesSuccess,
} from "../../store/customer/categorySlice";
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

// ✅ User category fetch
export const fetchCategories = async (dispatch) => {
  try {
    dispatch(FetchCategoriesStart());

    const response = await api.get("/categories");
    const categories = response.data.categories || response.data;

    dispatch(FetchCategoriesSuccess(categories));

    return categories;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(FetchCategoriesFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return null;
  }
};
