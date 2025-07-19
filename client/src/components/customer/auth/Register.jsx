import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getGoogleAuthUrl,
  handleGoogleCallback,
  registerUser,
} from "../../../services_hooks/customer/userAuthApi";
import AuthLayout from "./AuthLayout";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { user, loading, error } = useSelector((state) => state.userAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle Google OAuth callback on component mount
  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const result = await handleGoogleCallback(dispatch);
        if (result) {
          // OAuth successful, redirect to products
          navigate("/products");
        }
      } catch (error) {
        // Error is already handled in the service
        console.log("OAuth callback handled");
      }
    };

    // Check if this is an OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("token") || urlParams.get("error")) {
      handleOAuthCallback();
    }
  }, [dispatch, navigate]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      // Call the register service - it handles dispatch internally
      await registerUser(dispatch, formData);

      // Success - redirect to products
      navigate("/products");
    } catch (error) {
      // Error is handled in the service (toast + dispatch)
      console.error("Registration failed:", error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      // Call the Google OAuth service - it handles dispatch internally
      await getGoogleAuthUrl(dispatch);

      // User will be redirected to Google, no need for further action
    } catch (error) {
      // Error is handled in the service (toast + dispatch)
      console.error("Google OAuth initiation failed:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F9F3EF] flex">
      {/* Left Side - Branding */}
      <AuthLayout />

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-7/12 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#D2C1B6]/30">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-[#456882] hover:text-[#1B3C53] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            {/* Welcome Section */}
            <div className="text-center mb-6">
              <div className="lg:hidden w-12 h-12 bg-gradient-to-r from-[#456882] to-[#1B3C53] rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-white">B</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1B3C53] mb-1">
                Create Account
              </h2>
              <p className="text-sm text-gray-600">
                Join thousands of satisfied customers
              </p>
            </div>

            {/* Google Register */}
            <button
              onClick={handleGoogleRegister}
              className="w-full mb-4 bg-white border border-[#D2C1B6] rounded-xl py-3 flex items-center justify-center gap-2 hover:border-[#456882] hover:shadow-sm transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Sign up with Google
              </span>
            </button>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D2C1B6]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#F9F3EF] text-gray-500">or</span>
              </div>
            </div>

            {/* Register Form */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent bg-white text-sm ${
                    errors.name ? "border-red-300" : "border-[#D2C1B6]"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent bg-white text-sm ${
                    errors.email ? "border-red-300" : "border-[#D2C1B6]"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent bg-white text-sm ${
                    errors.phone ? "border-red-300" : "border-[#D2C1B6]"
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent bg-white text-sm ${
                    errors.password ? "border-red-300" : "border-[#D2C1B6]"
                  }`}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent bg-white text-sm ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-[#D2C1B6]"
                  }`}
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <label className="flex items-start gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  className="rounded text-[#456882] focus:ring-[#456882] mt-0.5"
                  required
                />
                <span>
                  I agree to the{" "}
                  <button className="text-[#456882] hover:underline">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-[#456882] hover:underline">
                    Privacy Policy
                  </button>
                </span>
              </label>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 text-sm"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-[#D2C1B6]">
              <p className="text-xs text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={handleGoToLogin}
                  className="text-[#456882] hover:text-[#1B3C53] font-medium hover:underline"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
