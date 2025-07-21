import toast from "react-hot-toast";
import {
  AddAddressFailure,
  AddAddressStart,
  AddAddressSuccess,
  ClearUserError,
  DeleteAddressSuccess,
  FetchAddressesFailure,
  FetchAddressesStart,
  FetchAddressesSuccess,
  SetDefaultAddressSuccess,
  UpdateAddressSuccess,
  UserLoginFailure,
  UserLoginStart,
  UserLoginSuccess,
  UserLogoutStart,
  UserLogoutSuccess,
  UserProfileFailure,
  UserProfileStart,
  UserProfileSuccess,
  UserRegisterFailure,
  UserRegisterStart,
  UserRegisterSuccess,
} from "../../store/customer/userAuthSlice";
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
    return error.response.data.message || "Invalid credentials.";
  } else if (error.request) {
    return "Network error. Please check your connection.";
  } else {
    return "Something went wrong.";
  }
};

// Helper: retry with exponential backoff on 429
async function postWithRetry(endpoint, payload, maxRetries = 3, delay = 1000) {
  let attempt = 0;
  while (true) {
    try {
      return await api.post(endpoint, payload);
    } catch (err) {
      if (err.response?.status === 429 && attempt < maxRetries) {
        const backoff = delay * 2 ** attempt;
        await new Promise((res) => setTimeout(res, backoff));
        attempt++;
        continue;
      }
      throw err;
    }
  }
}

// Register User Service
export const registerUser = async (dispatch, userData) => {
  dispatch(UserRegisterStart());

  try {
    // Validate required fields
    const { name, email, phone, password, confirmPassword } = userData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Prepare payload (exclude confirmPassword from API call)
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
      confirmPassword, // Backend expects this for validation
    };

    console.log("Registering user with payload:", {
      ...payload,
      password: "[HIDDEN]",
      confirmPassword: "[HIDDEN]",
    });

    // Make API call
    const { data } = await postWithRetry("/user/register", payload);
    const userData = {
      user: data.user,
      token: token,
    };

    // Success handling
    dispatch(UserRegisterSuccess(userData));
    toast.success("Account created successfully!", {
      id: "user-register",
      ...SuccessToastOptions,
    });

    console.log("Registration successful:", data);
    return data;
  } catch (error) {
    const errorMsg = parseError(error);
    console.error("Registration failed:", errorMsg);

    dispatch(UserRegisterFailure(errorMsg));
    toast.error(errorMsg, {
      id: "user-register",
      ...ErrorToastOptions,
    });

    throw error;
  }
};

// Login User Service
export const loginUser = async (dispatch, credentials) => {
  dispatch(UserLoginStart());

  try {
    // Validate required fields
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Prepare payload
    const payload = {
      email: email.trim().toLowerCase(),
      password,
    };

    console.log("Logging in user with email:", payload.email);

    // Make API call
    const { data } = await api.post("/user/login", payload);
    const userData = {
      user: data.user,
      token: token,
    };

    // Success handling
    dispatch(UserLoginSuccess(userData));
    toast.success(`Welcome back, ${data.user?.name || "User"}!`, {
      id: "user-login",
      ...SuccessToastOptions,
    });

    console.log("Login successful:", data);
    return data;
  } catch (error) {
    const errorMsg = parseError(error);
    console.error("Login failed:", errorMsg);

    dispatch(UserLoginFailure(errorMsg));
    toast.error(errorMsg, {
      id: "user-login",
      ...ErrorToastOptions,
    });

    throw error;
  }
};

// Handle Google OAuth Callback (when user returns from Google)
export const handleGoogleCallback = async (dispatch) => {
  dispatch(UserLoginStart());

  try {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const provider = urlParams.get("provider");
    const error = urlParams.get("error");

    // Check for errors first
    if (error) {
      let errorMessage = "Google authentication failed";

      switch (error) {
        case "oauth_failed":
          errorMessage = "Google authentication failed. Please try again.";
          break;
        case "oauth_callback_failed":
          errorMessage = "Authentication callback failed. Please try again.";
          break;
        default:
          errorMessage = "Authentication error occurred.";
      }

      dispatch(UserLoginFailure(errorMessage));
      toast.error(errorMessage, {
        id: "google-oauth-callback",
        ...ErrorToastOptions,
      });

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      throw new Error(errorMessage);
    }

    // Check for successful token
    if (token && provider === "google") {
      console.log("Google OAuth successful, processing token...");

      // Validate token with backend and get user data
      const { data } = await api.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Success - user data received
      const userData = {
        user: data.user,
        token: token,
      };

      dispatch(UserLoginSuccess(userData));
      toast.success(`Welcome, ${data.user?.name || "User"}!`, {
        id: "google-oauth-success",
        ...SuccessToastOptions,
      });

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);

      console.log("Google OAuth login successful:", userData);
      return userData;
    }

    // If we reach here, no token or error found
    console.log("No OAuth callback data found in URL");
    return null;
  } catch (error) {
    const errorMsg = parseError(error);
    console.error("Google OAuth callback failed:", errorMsg);

    dispatch(UserLoginFailure(errorMsg));
    toast.error(errorMsg, {
      id: "google-oauth-callback",
      ...ErrorToastOptions,
    });

    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
    throw error;
  }
};

// ===== PASSWORD MANAGEMENT FOR OAUTH USERS =====

// Set password for OAuth users
export const setPassword = async (passwordData) => {
  try {
    const { password, confirmPassword } = passwordData;

    if (!password || !confirmPassword) {
      throw new Error("Please provide both password and confirmation");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const { data } = await api.post("/user/set-password", {
      password,
      confirmPassword,
    });

    toast.success("Password set successfully!", {
      id: "set-password",
      ...SuccessToastOptions,
    });

    console.log("Password set successfully");
    return data;
  } catch (error) {
    const errorMsg = parseError(error);
    console.error("Set password failed:", errorMsg);

    toast.error(errorMsg, {
      id: "set-password-error",
      ...ErrorToastOptions,
    });

    throw error;
  }
};

// Get user's authentication methods
export const getAuthMethods = async () => {
  try {
    const { data } = await api.get("/user/auth-methods");
    console.log("Auth methods fetched:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch auth methods:", parseError(error));
    throw error;
  }
};

// ===== EXISTING SERVICES (Updated) =====

// Logout User Service
export const logoutUser = async (dispatch) => {
  dispatch(UserLogoutStart());

  try {
    toast.loading("Signing out...", { id: "user-logout" });

    // Make API call
    await api.post("/user/logout");

    dispatch(UserLogoutSuccess());
    toast.success("Logged out successfully", {
      id: "user-logout",
      ...SuccessToastOptions,
    });

    console.log("Logout successful");
    return true;
  } catch (error) {
    // Even if API fails, we still log out locally
    console.warn("Logout API failed, but clearing local session:", error);
    dispatch(UserLogoutSuccess());
    toast.success("Logged out successfully", {
      id: "user-logout",
      ...SuccessToastOptions,
    });

    return true;
  }
};

// Clear Auth Error Service
export const clearAuthError = (dispatch) => {
  dispatch(ClearUserError());
};

// Guest Continue Service (for apps that allow guest access)
export const continueAsGuest = (dispatch) => {
  try {
    console.log("Continuing as guest...");

    // Set a guest user state
    const guestUser = {
      isGuest: true,
      name: "Guest User",
      email: null,
      id: "guest",
    };

    dispatch(UserLoginSuccess({ user: guestUser }));
    toast.success("Continuing as guest", {
      id: "guest-continue",
      ...SuccessToastOptions,
    });

    return guestUser;
  } catch (error) {
    console.error("Guest continue failed:", error);
    toast.error("Failed to continue as guest", {
      id: "guest-continue",
      ...ErrorToastOptions,
    });
  }
};

// Get User Profile Service
export const getUserProfile = async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    dispatch(UserProfileStart());

    const { data } = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User profile fetched:", data);
    dispatch(UserProfileSuccess({ user: data }));
  } catch (error) {
    const errorMsg = parseError(error);
    dispatch(UserProfileFailure(errorMsg));
    toast.error(errorMsg, {
      ...ErrorToastOptions,
    });
  }
};
// Edit User Profile Service (corrected version)
export const editUserProfile = async (dispatch, userData) => {
  const token = localStorage.getItem("authToken");
  try {
    dispatch(UserProfileStart());
    const { data } = await api.put("/user/profile", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(UserProfileSuccess({ user: data }));

    toast.success("Profile updated successfully!", {
      ...SuccessToastOptions,
    });

    return data;
  } catch (error) {
    const errorMsg = parseError(error);
    dispatch(UserProfileFailure(errorMsg));
    toast.error(errorMsg, {
      ...ErrorToastOptions,
    });
    throw error; // Re-throw so the component can handle it
  }
};
// Validate User Token Service (if you implement this endpoint)
export const validateUserToken = async () => {
  try {
    const { data } = await api.get("/user/auth/status");
    console.log("Token validated:", data);
    return data;
  } catch (error) {
    console.error("Token validation failed:", parseError(error));
    throw error;
  }
};

// ===== ADDRESS MANAGEMENT SERVICES =====

export const getUserAddresses = async (dispatch) => {
  dispatch(FetchAddressesStart());
  try {
    const { data } = await api.get("/user/addresses");
    dispatch(FetchAddressesSuccess(data.addresses || data));
    return data;
  } catch (error) {
    const errorMsg = parseError(error);
    dispatch(FetchAddressesFailure(errorMsg));
    toast.error(errorMsg, {
      id: "fetch-address",
      ...ErrorToastOptions,
    });
    throw error;
  }
};

export const addUserAddress = async (dispatch, addressData) => {
  dispatch(AddAddressStart());
  try {
    const { data } = await api.post("/user/addresses", addressData);
    dispatch(AddAddressSuccess(data.address || data));
    toast.success("Address added successfully!", {
      id: "add-address",
      ...SuccessToastOptions,
    });
    return data;
  } catch (error) {
    const errorMsg = parseError(error);
    dispatch(AddAddressFailure(errorMsg));
    toast.error(errorMsg, {
      id: "add-address-error",
      ...ErrorToastOptions,
    });
    throw error;
  }
};

export const updateUserAddress = async (dispatch, addressId, addressData) => {
  try {
    const { data } = await api.put(`/user/addresses/${addressId}`, addressData);
    dispatch(UpdateAddressSuccess(data.address || data));
    toast.success("Address updated successfully!", {
      id: "update-address",
      ...SuccessToastOptions,
    });
    return data;
  } catch (error) {
    const errorMsg = parseError(error);
    toast.error(errorMsg, {
      id: "update-address-error",
      ...ErrorToastOptions,
    });
    throw error;
  }
};

export const deleteUserAddress = async (dispatch, addressId) => {
  try {
    await api.delete(`/user/addresses/${addressId}`);
    dispatch(DeleteAddressSuccess(addressId));
    toast.success("Address deleted successfully!", {
      id: "delete-address",
      ...SuccessToastOptions,
    });
    return addressId;
  } catch (error) {
    const errorMsg = parseError(error);
    toast.error(errorMsg, {
      id: "delete-address-error",
      ...ErrorToastOptions,
    });
    throw error;
  }
};

export const setDefaultAddress = async (dispatch, addressId) => {
  try {
    const { data } = await api.put(`/user/addresses/${addressId}/default`);
    dispatch(SetDefaultAddressSuccess(data.address || data));
    toast.success("Default address updated!", {
      id: "set-default-address",
      ...SuccessToastOptions,
    });
    return data;
  } catch (error) {
    const errorMsg = parseError(error);
    toast.error(errorMsg, {
      id: "set-default-error",
      ...ErrorToastOptions,
    });
    throw error;
  }
};

// Export all services
export default {
  // Auth services
  registerUser,
  loginUser,
  logoutUser,
  clearAuthError,
  // OAuth services,
  handleGoogleCallback,
  // Password management
  setPassword,
  getAuthMethods,

  // User services
  continueAsGuest,
  getUserProfile,
  validateUserToken,

  // Address services
  getUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setDefaultAddress,
};
