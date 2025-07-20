import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("authToken");
const userFromStorage = localStorage.getItem("authUser");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    // Login actions
    UserLoginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    UserLoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;

      // Save to localStorage
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
    },
    UserLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Register actions
    UserRegisterStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    UserRegisterSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    UserRegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout actions
    UserLogoutStart: (state) => {
      state.loading = true;
    },
    UserLogoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      // Clear from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },

    // Clear error (optional utility reducer)
    ClearUserError: (state) => {
      state.error = null;
      state.loading = false;
    },
    // Profile actions
    UserProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    UserProfileSuccess: (state, action) => {
      state.loading = false;
      console.log("User profile fetched:", action.payload.user.user);
      state.user = action.payload.user.user;

      state.error = null;

      // Update localStorage
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
    },
    UserProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  UserLoginStart,
  UserLoginSuccess,
  UserLoginFailure,
  UserRegisterStart,
  UserRegisterSuccess,
  UserRegisterFailure,
  UserLogoutStart,
  UserLogoutSuccess,
  ClearUserError,
  UserProfileStart,
  UserProfileSuccess,
  UserProfileFailure,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
