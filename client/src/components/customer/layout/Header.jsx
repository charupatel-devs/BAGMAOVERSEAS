import {
  Award,
  Bell,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Search,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ Added useLocation
import { logoutUser } from "../../../services_hooks/customer/userAuthApi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current location
  const { user, token, loading } = useSelector((state) => state.userAuth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Check if user is logged in
  const isLoggedIn = !!(user && token);

  // ✅ Helper function to check if route is active
  const isActiveRoute = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // ✅ Function to get active navigation classes
  const getNavLinkClass = (path, isMobile = false) => {
    const isActive = isActiveRoute(path);

    if (isMobile) {
      return `flex items-center space-x-3 font-medium py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl transition-all duration-300 ${
        isActive
          ? "text-white bg-gradient-to-r from-[#456882] to-[#1B3C53] shadow-lg"
          : "text-[#456882] hover:text-[#1B3C53] hover:bg-[#F9F3EF]"
      }`;
    }

    return `relative font-medium px-6 py-3 rounded-xl transition-all duration-300 group ${
      isActive
        ? "text-white bg-gradient-to-r from-[#456882] to-[#1B3C53] shadow-lg"
        : "text-[#456882] hover:text-[#1B3C53] hover:bg-[#F9F3EF]"
    }`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      logoutUser(dispatch);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    }
  };

  return (
    <header className="bg-white shadow-xl top-0 z-50 border-b-2 border-[#D2C1B6]">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white py-1 md:py-2">
        <div className="container mx-auto px-2 md:px-4 flex justify-between items-center text-xs md:text-sm">
          <div className="flex items-center space-x-2 md:space-x-6">
            <span className="flex items-center hover:text-[#D2C1B6] transition-colors cursor-pointer">
              <Phone className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">+91-9810735041</span>
              <span className="sm:hidden">+91-9810735041</span>
            </span>
            <span className="hidden sm:flex items-center hover:text-[#D2C1B6] transition-colors cursor-pointer">
              <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              bagmaoverseas@gmail.com
            </span>
            <span className="hidden md:flex items-center hover:text-[#D2C1B6] transition-colors">
              <MapPin className="w-4 h-4 mr-2" />
              Panipat, Haryana
            </span>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <span className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              GST: 06AJVPP1131B1ZG
            </span>
          </div>
          <div className="lg:hidden flex items-center">
            <span className="flex items-center text-xs">
              <Star className="w-3 h-3 mr-1 text-yellow-400" />
              4.4(61)
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-2 md:px-4 py-1 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 md:space-x-4 group"
          >
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dthnv9dxb/image/upload/v1752674781/PHOTO-2025-07-16-19-33-26_jkyevh.jpg"
                alt="Bagma Overseas Logo"
                className="w-40"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-3xl font-bold text-[#1B3C53] group-hover:text-[#456882] transition-colors">
                BAGMA OVERSEAS
              </h1>
              <p className="text-xs md:text-sm text-gray-600 font-medium">
                Premium Home Textiles Since 2013
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bath mats, door mats, carpets..."
                  className="w-full pl-12 pr-24 py-3 border-2 border-[#D2C1B6] rounded-xl focus:outline-none focus:border-[#456882] focus:ring-2 focus:ring-[#456882]/20 transition-all duration-300 text-[#1B3C53] placeholder-gray-500 bg-[#F9F3EF]/50"
                />
                <Search className="absolute left-4 top-4 h-6 w-6 text-[#456882]" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-[#456882] hover:bg-[#1B3C53] text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-1"
                >
                  <span className="font-medium">Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative p-2 md:p-3 text-[#456882] hover:text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg md:rounded-xl transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </Link>

            {/* Notifications */}
            {isLoggedIn && (
              <button className="hidden md:flex relative p-3 text-[#456882] hover:text-[#1B3C53] hover:bg-[#F9F3EF] rounded-xl transition-all duration-300 group">
                <Bell className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full animate-ping"></span>
              </button>
            )}

            {/* User Account */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 md:space-x-2 p-2 md:p-3 text-[#456882] hover:text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg md:rounded-xl transition-all duration-300 group"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                  {isLoggedIn && user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  )}
                </div>
                {isLoggedIn && (
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium text-left">
                      {user?.name}
                    </p>
                  </div>
                )}
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-[#D2C1B6] z-50">
                  <div className="p-4 border-b border-[#D2C1B6]">
                    {isLoggedIn ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-full flex items-center justify-center overflow-hidden">
                          {user?.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1B3C53]">
                            {user?.name}
                          </p>
                          <p className="text-sm text-gray-600">{user?.email}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-[#1B3C53] font-medium mb-2">
                          Welcome to BAGMA!
                        </p>
                        <p className="text-sm text-gray-600">
                          Please login to access your account
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    {isLoggedIn ? (
                      <div>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/my-orders"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4" />
                          <span>My Orders</span>
                        </Link>
                        <div className="border-t border-[#D2C1B6] my-2"></div>
                        <button
                          onClick={handleLogout}
                          disabled={loading}
                          className="flex items-center space-x-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{loading ? "Logging out..." : "Logout"}</span>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg font-bold transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          LOGIN
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-[#456882] hover:bg-[#F9F3EF] rounded-lg font-medium transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          REGISTER
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 md:p-3 text-[#456882] hover:text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg md:rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* ✅ Enhanced Navigation with Dynamic Highlighting */}
        <nav className="hidden lg:flex mt-1 space-x-8 border-t border-[#D2C1B6] pt-1">
          <Link to="/" className={getNavLinkClass("/")}>
            <span className="relative z-10">Home</span>
            {isActiveRoute("/") && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C53] to-[#456882] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            {!isActiveRoute("/") && (
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#456882] group-hover:w-full transition-all duration-300"></div>
            )}
          </Link>

          <Link to="/products" className={getNavLinkClass("/products")}>
            <span className="relative z-10">Our Products</span>
            {isActiveRoute("/products") && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C53] to-[#456882] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            {!isActiveRoute("/products") && (
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#456882] group-hover:w-full transition-all duration-300"></div>
            )}
          </Link>

          <Link to="/about" className={getNavLinkClass("/about")}>
            <span className="relative z-10">About Us</span>
            {isActiveRoute("/about") && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C53] to-[#456882] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            {!isActiveRoute("/about") && (
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#456882] group-hover:w-full transition-all duration-300"></div>
            )}
          </Link>

          <Link to="/contact" className={getNavLinkClass("/contact")}>
            <span className="relative z-10">Contact Us</span>
            {isActiveRoute("/contact") && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C53] to-[#456882] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            {!isActiveRoute("/contact") && (
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#456882] group-hover:w-full transition-all duration-300"></div>
            )}
          </Link>
        </nav>

        {/* ✅ Enhanced Mobile Menu with Dynamic Highlighting */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 md:mt-6 border-t border-[#D2C1B6] pt-4 md:pt-6">
            <div className="flex flex-col space-y-3 md:space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-3 md:mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 border-2 border-[#D2C1B6] rounded-lg md:rounded-xl focus:outline-none focus:border-[#456882] bg-[#F9F3EF]/50 text-sm md:text-base"
                />
                <Search className="absolute left-3 md:left-4 top-2.5 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-[#456882]" />
              </form>

              {/* Mobile Navigation Links with Dynamic Highlighting */}
              <Link
                to="/"
                className={getNavLinkClass("/", true)}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={getNavLinkClass("/products", true)}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Products
              </Link>
              <Link
                to="/about"
                className={getNavLinkClass("/about", true)}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={getNavLinkClass("/contact", true)}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Mobile Auth Actions */}
              {isLoggedIn ? (
                <div className="border-t border-[#D2C1B6] pt-4 space-y-2">
                  <Link
                    to="/profile"
                    className={getNavLinkClass("/profile", true)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/my-orders"
                    className={getNavLinkClass("/my-orders", true)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package className="w-4 h-4" />
                    <span>My Orders</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    disabled={loading}
                    className="flex items-center space-x-3 w-full text-left text-red-600 hover:text-red-700 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{loading ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-[#D2C1B6] pt-4 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center bg-[#456882] hover:bg-[#1B3C53] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center border-2 border-[#456882] text-[#456882] hover:bg-[#456882] hover:text-white font-medium py-3 px-4 rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    REGISTER
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
