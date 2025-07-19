import { configureStore } from "@reduxjs/toolkit";

import userAuthReducer from "../store/customer/userAuthSlice";

// Admin slices
import adminAuthReducer from "../store/admin/adminAuthSlice";
import adminCategoriesReducer from "./admin/adminCategorySlice";
import adminCustReducer from "./admin/adminCustomerSlice";
import adminOrderReducer from "./admin/adminOrderSlice";
import adminProductReducer from "./admin/adminProductSlice";
import adminStockReducer from "./admin/adminStockSlice";
// Customer product slice

export default configureStore({
  reducer: {
    // Admin-related state
    adminAuth: adminAuthReducer,
    categories: adminCategoriesReducer,
    products: adminProductReducer,
    orders: adminOrderReducer,
    customers: adminCustReducer,
    stocks: adminStockReducer,
    //customer

    // Customer-related state
    userAuth: userAuthReducer,
  },
});
