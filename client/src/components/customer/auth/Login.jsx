import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleEmailLogin = () => {
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      console.log("Email login:", { email, password });
      setIsLoading(false);
      // Redirect to dashboard or previous page
      navigate(-1);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    if (disabled) return;
    initiateGoogleLogin();
  };
  const handleGuestContinue = () => {
    console.log("Continue as guest");
    navigate("/products");
  };

  const handleGoBack = () => {
    navigate(-1);
    console.log("Go back");
  };

  const handleGoToRegister = () => {
    navigate("/register");
    console.log("Go to register");
  };

  return (
    <div className="min-h-screen bg-[#F9F3EF] flex">
      <AuthLayout />

      {/* Right Side - Login Form */}
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
                Welcome Back
              </h2>
              <p className="text-sm text-gray-600">Sign in to your account</p>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full mb-4 bg-white border border-[#D2C1B6] rounded-xl py-3 flex items-center justify-center gap-2 hover:border-[#456882] hover:shadow-sm transition-all group"
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
                Continue with Google
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

            {/* Email Login Form */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#D2C1B6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent bg-white text-sm"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-[#D2C1B6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent bg-white text-sm"
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
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1 text-gray-600">
                  <input
                    type="checkbox"
                    className="rounded text-[#456882] focus:ring-[#456882]"
                  />
                  Remember me
                </label>
                <button className="text-[#456882] hover:text-[#1B3C53] hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleEmailLogin}
                disabled={isLoading || !email || !password}
                className="w-full bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 text-sm"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            {/* Guest Continue */}
            <div className="text-center border-t border-[#D2C1B6] pt-4">
              <p className="text-xs text-gray-600 mb-2">
                Don't want to create an account?
              </p>
              <button
                onClick={handleGuestContinue}
                className="text-[#456882] hover:text-[#1B3C53] font-medium hover:underline text-sm"
              >
                Continue as Guest →
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-4 pt-3 border-t border-[#D2C1B6]/50">
              <p className="text-xs text-gray-600">
                New to BAGMA?{" "}
                <button
                  onClick={handleGoToRegister}
                  className="text-[#456882] hover:text-[#1B3C53] font-medium hover:underline"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
