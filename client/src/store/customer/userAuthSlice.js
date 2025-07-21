import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("authToken");
const userFromStorage = localStorage.getItem("authUser");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  addresses: [],
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
    // Address actions
    FetchAddressesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    FetchAddressesSuccess: (state, action) => {
      state.loading = false;
      state.addresses = action.payload.data; // array of address objects
      state.error = null;
    },
    FetchAddressesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    AddAddressStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    AddAddressSuccess: (state, action) => {
      state.loading = false;
      state.addresses.push(action.payload);
      state.error = null;
    },
    AddAddressFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    UpdateAddressSuccess: (state, action) => {
      const idx = state.addresses.findIndex(
        (a) => a._id === action.payload._id
      );
      if (idx !== -1) {
        state.addresses[idx] = action.payload;
      }
    },
    DeleteAddressSuccess: (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr._id !== action.payload
      );
    },
    SetDefaultAddressSuccess: (state, action) => {
      state.addresses = state.addresses.map((addr) => ({
        ...addr,
        isDefault: addr._id === action.payload._id,
      }));
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
  FetchAddressesStart,
  FetchAddressesSuccess,
  FetchAddressesFailure,
  AddAddressStart,
  AddAddressSuccess,
  AddAddressFailure,
  UpdateAddressSuccess,
  DeleteAddressSuccess,
  SetDefaultAddressSuccess,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
