import {
  Award,
  Bell,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on auth state
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(3);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  return (
    <header className="bg-white shadow-xl  top-0 z-50 border-b-2 border-[#D2C1B6] ">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white py-1 md:py-2">
        <div className="container mx-auto px-2 md:px-4 flex justify-between items-center text-xs md:text-sm">
          <div className="flex items-center space-x-2 md:space-x-6">
            <span className="flex items-center hover:text-[#D2C1B6] transition-colors cursor-pointer">
              <Phone className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">+91-8178211858</span>
              <span className="sm:hidden">+91-8178211858</span>
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
          {/* Mobile - Show only rating */}
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
          {/* Enhanced Logo - Responsive */}
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
              {/* <div className="hidden md:flex items-center space-x-4 mt-1">
                <span className="text-xs bg-[#F9F3EF] text-[#456882] px-2 py-1 rounded-full font-medium">
                  100K+ Monthly Production
                </span>
                <span className="text-xs bg-[#F9F3EF] text-[#456882] px-2 py-1 rounded-full font-medium">
                  Export Quality
                </span>
              </div> */}
            </div>
          </Link>

          {/* Enhanced Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
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
                  type="button"
                  onClick={handleSearch}
                  className="absolute right-2 top-2 bg-[#456882] hover:bg-[#1B3C53] text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-1"
                >
                  <span className="font-medium">Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Actions - Mobile Optimized */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative p-2 md:p-3 text-[#456882] hover:text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg md:rounded-xl transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#456882] text-white text-xs rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-bold animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Notifications - Hidden on mobile */}
            <button className="hidden md:flex relative p-3 text-[#456882] hover:text-[#1B3C53] hover:bg-[#F9F3EF] rounded-xl transition-all duration-300 group">
              <Bell className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full animate-ping"></span>
            </button>

            {/* User Account - Simplified for mobile */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 md:space-x-2 p-2 md:p-3 text-[#456882] hover:text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg md:rounded-xl transition-all duration-300 group"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                {isLoggedIn && (
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">Premium Customer</p>
                  </div>
                )}
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-[#D2C1B6] z-50">
                  <div className="p-4 border-b border-[#D2C1B6]">
                    {isLoggedIn ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1B3C53]">
                            John Doe
                          </p>
                          <p className="text-sm text-gray-600">
                            john@example.com
                          </p>
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
                          className="block px-4 py-2 text-sm text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg"
                        >
                          My Orders
                        </Link>

                        <div className="border-t border-[#D2C1B6] my-2"></div>
                        <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-[#1B3C53] hover:bg-[#F9F3EF] rounded-lg font-medium font-bold"
                        >
                          LOGIN
                        </Link>
                        {/* <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-[#456882] hover:bg-[#F9F3EF] rounded-lg font-medium"
                        >
                          Register
                        </Link> */}
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

        {/* Enhanced Navigation */}
        <nav className="hidden lg:flex mt-1 space-x-8 border-t border-[#D2C1B6] pt-1">
          <Link
            to="/"
            className="relative text-white bg-gradient-to-r from-[#456882] to-[#1B3C53] px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group"
          >
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B3C53] to-[#456882] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            to="/products"
            className="relative text-[#456882] hover:text-[#1B3C53] font-medium px-6 py-3 rounded-xl hover:bg-[#F9F3EF] transition-all duration-300 group"
          >
            Our Products
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#456882] group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            to="/bulk-order"
            className="relative text-[#456882] hover:text-[#1B3C53] font-medium px-6 py-3 rounded-xl hover:bg-[#F9F3EF] transition-all duration-300 group"
          >
            Bulk Orders
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#456882] group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            to="/about"
            className="relative text-[#456882] hover:text-[#1B3C53] font-medium px-6 py-3 rounded-xl hover:bg-[#F9F3EF] transition-all duration-300 group"
          >
            About Us
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#456882] group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link
            to="/contact"
            className="relative text-[#456882] hover:text-[#1B3C53] font-medium px-6 py-3 rounded-xl hover:bg-[#F9F3EF] transition-all duration-300 group"
          >
            Contact Us
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#456882] group-hover:w-full transition-all duration-300"></div>
          </Link>
        </nav>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 md:mt-6 border-t border-[#D2C1B6] pt-4 md:pt-6">
            <div className="flex flex-col space-y-3 md:space-y-4">
              {/* Mobile Search */}
              <div className="relative mb-3 md:mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 border-2 border-[#D2C1B6] rounded-lg md:rounded-xl focus:outline-none focus:border-[#456882] bg-[#F9F3EF]/50 text-sm md:text-base"
                />
                <Search className="absolute left-3 md:left-4 top-2.5 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-[#456882]" />
              </div>

              {/* Mobile Actions Row - Only on small screens */}
              <div className="flex items-center justify-around py-3 bg-[#F9F3EF] rounded-lg sm:hidden">
                <Link
                  to="/cart"
                  className="flex flex-col items-center space-y-1 text-[#456882]"
                >
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#456882] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">Cart</span>
                </Link>
                <div className="flex flex-col items-center space-y-1 text-[#456882]">
                  <div className="relative">
                    <User className="w-6 h-6" />
                  </div>
                  <span className="text-xs">Account</span>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <Link
                to="/"
                className="flex items-center space-x-3 text-[#456882] hover:text-[#1B3C53] font-medium py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-[#F9F3EF] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="flex items-center space-x-3 text-[#456882] hover:text-[#1B3C53] font-medium py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-[#F9F3EF] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Products
              </Link>
              <Link
                to="/bulk-order"
                className="flex items-center space-x-3 text-[#456882] hover:text-[#1B3C53] font-medium py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-[#F9F3EF] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Bulk Orders
              </Link>
              <Link
                to="/about"
                className="flex items-center space-x-3 text-[#456882] hover:text-[#1B3C53] font-medium py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-[#F9F3EF] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-3 text-[#456882] hover:text-[#1B3C53] font-medium py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl hover:bg-[#F9F3EF] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
