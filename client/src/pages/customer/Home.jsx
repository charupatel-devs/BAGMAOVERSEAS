import {
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProductCarousel from "../../components/customer/home/ProductCarousel.jsx";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductSidebar from "../../components/customer/home/ProductSidebar.jsx";
import { fetchCategories } from "../../services_hooks/customer/categoryService.js";
import { getFeaturedProducts } from "../../services_hooks/customer/productService.js";

// Main Home Component
const Home = () => {
  const trimText = (text, maxChars = 60) => {
    if (!text || typeof text !== "string") return null;
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars).trim() + "...";
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading } = useSelector(
    (state) => state.userCategories || {}
  );
  const { products } = useSelector((state) => state.userProducts || {});
  // Fetch categories on mount
  useEffect(() => {
    fetchCategories(dispatch);
  }, [dispatch]);
  // Fetch products function
  const fetchProducts = async () => {
    await getFeaturedProducts(dispatch);
  };
  const handleViewProduct = ({ productId }) => {
    navigate(`/products/${productId}`);
  };
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <ProductSidebar categories={categories} loading={loading} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Product Carousel */}
          <ProductCarousel products={products} />
          {/* Our Products Section */}
          <section className="px-4 md:px-8 py-8 md:py-16 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1B3C53] mb-3 md:mb-4">
                  Our Categories
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                  Discover our extensive range of premium home textiles
                  manufactured with precision and exported globally.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                {categories.map((category, index) => (
                  <div
                    key={category?._id || index}
                    className="group bg-white rounded-lg border border-[#D2C1B6]/30 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-3 md:p-4">
                      <h3 className="font-bold text-[#1B3C53] text-xl md:text-base mb-1 group-hover:text-[#456882] transition-colors">
                        {category?.name}
                      </h3>
                      {category.description &&
                        category.description.length > 10 && (
                          <p className="text-xs md:text-sm text-gray-600 mb-2">
                            {trimText(category.description, 70)}
                          </p>
                        )}
                      <p className="text-xs text-[#456882] font-medium mb-3">
                        {category?.productCount
                          ? `${category?.productCount} products available`
                          : "0 products available"}
                      </p>
                      <Link
                        to={`/products?category=${category?.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-xs md:text-sm bg-[#456882] text-white px-3 py-1 rounded-lg hover:bg-[#1B3C53] transition-colors inline-block"
                      >
                        View Products →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/products"
                  className="bg-[#1B3C53] text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-[#456882] transition-colors inline-flex items-center text-sm md:text-base"
                >
                  View All Products
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="px-4 md:px-8 py-8 md:py-16 bg-[#F9F3EF]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1B3C53] mb-3 md:mb-4">
                  Why Choose BAGMA Overseas?
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                  Your trusted partner for premium home textiles with global
                  reach and uncompromising quality.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    icon: (
                      <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#456882]" />
                    ),
                    title: "Quality Assurance",
                    description:
                      "Eco-friendly, formaldehyde-free products with strict quality control and REACH compliance",
                  },
                  {
                    icon: (
                      <Globe className="w-6 h-6 md:w-8 md:h-8 text-[#456882]" />
                    ),
                    title: "Global Reach",
                    description:
                      "Serving 15+ countries including USA, UAE, Australia, UK, and European markets",
                  },
                  {
                    icon: (
                      <Truck className="w-6 h-6 md:w-8 md:h-8 text-[#456882]" />
                    ),
                    title: "Fast Delivery",
                    description:
                      "Timely shipments with excellent packaging, serving both domestic and international markets",
                  },
                  {
                    icon: (
                      <Users className="w-6 h-6 md:w-8 md:h-8 text-[#456882]" />
                    ),
                    title: "Expert Support",
                    description:
                      "Professional team with 12+ years of experience in home textiles manufacturing",
                  },
                  {
                    icon: (
                      <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-[#456882]" />
                    ),
                    title: "Certified Quality",
                    description:
                      "TEXPROCIL member with government recognition and export quality standards",
                  },
                  {
                    icon: (
                      <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[#456882]" />
                    ),
                    title: "Competitive Pricing",
                    description:
                      "Best-in-class pricing for bulk orders without compromising on quality",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 md:p-6 rounded-xl border border-[#D2C1B6]/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-center mb-3 md:mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F9F3EF] rounded-lg flex items-center justify-center mr-3 md:mr-4 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-[#1B3C53] group-hover:text-[#456882] transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products Carousel */}
          <section className="px-4 md:px-8 py-8 md:py-16 bg-[#F9F3EF]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1B3C53] mb-3 md:mb-4">
                  Featured Products
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                  Explore our best-selling products trusted by customers
                  worldwide.
                </p>
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div
                      key={product._id || product.id}
                      className="bg-white rounded-lg border border-[#D2C1B6]/30 shadow hover:shadow-md transition p-3 flex flex-col"
                    >
                      {/* Image - compact but covers area */}
                      {/* <div className="relative rounded-t-md bg-gray-100 h-40 w-full flex items-center justify-center overflow-hidden"> */}
                      <img
                        src={product.images[0]?.url || "/placeholder.png"}
                        alt={product.name}
                        className="w-full h-52 md:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* </div> */}
                      {/* Main Info */}
                      <div className="flex-1 flex flex-col px-1 pt-2">
                        <span className="uppercase text-[10px] tracking-wider text-[#456882] font-semibold">
                          {product.category?.name || ""}
                        </span>
                        <h3
                          className="text-base font-semibold text-[#1B3C53] truncate"
                          title={product.name}
                        >
                          {product.name}
                        </h3>
                        {product.dimensions?.length &&
                          product.dimensions?.width && (
                            <span className="text-xs text-gray-500 mb-1">
                              Size: {product.dimensions.length}X
                              {product.dimensions.width}
                            </span>
                          )}
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-lg font-bold text-[#456882]">
                            ₹{product.price}
                          </span>
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProduct({
                            productId: product._id || product.id,
                          });
                        }}
                        className="mt-2 w-full py-2 bg-[#456882] text-white border border-[#456882] rounded text-sm font-medium hover:bg-white hover:text-[#456882] transition"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8 md:mt-12">
                  <Link
                    to="/products"
                    className="bg-[#1B3C53] text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-[#456882] transition-colors inline-flex items-center text-sm md:text-base"
                  >
                    View All Products
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="px-4 md:px-8 py-8 md:py-16 bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                Ready to Start Your Order?
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="bg-[#D2C1B6] text-[#1B3C53] px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#F9F3EF] transition-colors text-sm md:text-base text-center"
                >
                  Start Shopping Now
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
