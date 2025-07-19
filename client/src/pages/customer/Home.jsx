import {
  ArrowRight,
  Award,
  CheckCircle,
  Eye,
  Factory,
  Globe,
  Heart,
  Shield,
  Star,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCarousel from "../../components/customer/home/ProductCarousel.jsx";
import ProductSidebar from "../../components/customer/home/ProductSidebar.jsx";
// Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <ProductSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Product Carousel */}
          <ProductCarousel />
          {/* Our Products Section */}
          <section className="px-4 md:px-8 py-8 md:py-16 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1B3C53] mb-3 md:mb-4">
                  Our Products
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                  Discover our extensive range of premium home textiles
                  manufactured with precision and exported globally.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                {[
                  {
                    name: "Door Mats",
                    description: "Micro Polyester Flower Door Mat",
                    image: "/api/placeholder/300/200",
                    products: "42 products available",
                    category: "door-mats",
                  },
                  {
                    name: "Tufted Bath Mats",
                    description: "Cotton Deluxe Bath Mat",
                    image: "/api/placeholder/300/200",
                    products: "34 products available",
                    category: "tufted-bath-mats",
                  },
                  {
                    name: "Hotel Bath Rugs",
                    description: "Designer Hotel Bath Mat",
                    image: "/api/placeholder/300/200",
                    products: "32 products available",
                    category: "hotel-bath-rugs",
                  },
                  {
                    name: "Door Mats - ANTI SLIP",
                    description: "PVC Welcome Mat 9 mm",
                    image: "/api/placeholder/300/200",
                    products: "28 products available",
                    category: "door-mats-anti-slip",
                  },
                  {
                    name: "Door Mats - Handloom",
                    description: "Traditional Handwoven Mats",
                    image: "/api/placeholder/300/200",
                    products: "25 products available",
                    category: "door-mats-handloom",
                  },
                  {
                    name: "Runners - ANTI SLIP",
                    description: "Water Absorb Runners",
                    image: "/api/placeholder/300/200",
                    products: "15 products available",
                    category: "runners-anti-slip",
                  },
                  {
                    name: "Microfiber Cleaning Cloth",
                    description: "Premium Cleaning Solutions",
                    image: "/api/placeholder/300/200",
                    products: "12 products available",
                    category: "microfiber-cleaning-cloth",
                  },
                  {
                    name: "Carpets",
                    description: "Chenille Floor Mat (Carpet)",
                    image: "/api/placeholder/300/200",
                    products: "12 products available",
                    category: "carpets",
                  },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-lg border border-[#D2C1B6]/30 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-square bg-[#F9F3EF] relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-[#456882] text-white px-2 py-1 rounded-full text-xs font-medium">
                        New
                      </div>
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-bold text-[#1B3C53] text-sm md:text-base mb-1 group-hover:text-[#456882] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 mb-2">
                        {product.description}
                      </p>
                      <p className="text-xs text-[#456882] font-medium mb-3">
                        {product.products}
                      </p>
                      <Link
                        to={`/products?category=${product.category}`}
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

          {/* Trust Indicators */}
          <section className="px-4 md:px-8 py-8 md:py-12 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#456882] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Factory className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1B3C53] mb-1">
                    100K+
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Monthly Production
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#456882] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1B3C53] mb-1">
                    15+
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Export Countries
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#456882] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1B3C53] mb-1">
                    12+
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Years Experience
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#456882] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1B3C53] mb-1">
                    4.4★
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Customer Rating
                  </p>
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {[
                    {
                      id: 1,
                      name: "Premium Cotton Hotel Bath Mat",
                      price: 240,
                      originalPrice: 300,
                      image: "/api/placeholder/300/300",
                      rating: 4.8,
                      reviews: 124,
                      size: "65x75 cm",
                      material: "100% Cotton",
                      badge: "Best Seller",
                    },
                    {
                      id: 2,
                      name: "Anti-Slip Latex Bath Rug",
                      price: 285,
                      originalPrice: 350,
                      image: "/api/placeholder/300/300",
                      rating: 4.9,
                      reviews: 89,
                      size: "60x90 cm",
                      material: "Microfiber + Latex",
                      badge: "New",
                    },
                    {
                      id: 3,
                      name: "Handloom Cotton Door Mat",
                      price: 90,
                      originalPrice: 120,
                      image: "/api/placeholder/300/300",
                      rating: 4.7,
                      reviews: 156,
                      size: "40x60 cm",
                      material: "Cotton Handloom",
                      badge: "Popular",
                    },
                    {
                      id: 4,
                      name: "Quilted Prayer Mat",
                      price: 115,
                      originalPrice: 150,
                      image: "/api/placeholder/300/300",
                      rating: 4.6,
                      reviews: 78,
                      size: "24x72 inches",
                      material: "Cotton Quilted",
                      badge: "Traditional",
                    },
                    {
                      id: 5,
                      name: "High Pile Door Mat",
                      price: 90,
                      originalPrice: 110,
                      image: "/api/placeholder/300/300",
                      rating: 4.5,
                      reviews: 92,
                      size: "40x60 cm",
                      material: "High Pile Cotton",
                      badge: "Durable",
                    },
                    {
                      id: 6,
                      name: "Micro Polyester Bath Mat",
                      price: 195,
                      originalPrice: 250,
                      image: "/api/placeholder/300/300",
                      rating: 4.6,
                      reviews: 112,
                      size: "50x80 cm",
                      material: "Micro Polyester",
                      badge: "Quick Dry",
                    },
                  ].map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#D2C1B6]/30"
                    >
                      <div className="relative overflow-hidden bg-[#F9F3EF] aspect-square">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#456882] text-white px-2 py-1 rounded-full text-xs font-medium">
                            {product.badge}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="bg-white/90 p-2 rounded-full hover:bg-white">
                            <Heart size={16} className="text-gray-600" />
                          </button>
                        </div>
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        ) > 0 && (
                          <div className="absolute top-3 left-3 mt-8">
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              {Math.round(
                                ((product.originalPrice - product.price) /
                                  product.originalPrice) *
                                  100
                              )}
                              % OFF
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-[#456882] uppercase tracking-wide">
                            {product.material}
                          </span>
                          <div className="flex items-center">
                            <Star
                              className="text-yellow-400 fill-current"
                              size={14}
                            />
                            <span className="text-xs text-gray-600 ml-1">
                              {product.rating}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-sm md:text-base font-semibold text-[#1B3C53] mb-2 group-hover:text-[#456882] transition-colors">
                          {product.name}
                        </h3>

                        <div className="text-xs text-gray-600 mb-3">
                          <p>Size: {product.size}</p>
                          <p>Reviews: {product.reviews}</p>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-[#1B3C53]">
                              ₹{product.price}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex-1 bg-[#456882] hover:bg-[#1B3C53] text-white py-2 px-3 rounded-lg font-medium transition-colors text-sm">
                            Add to Cart
                          </button>
                          <button className="p-2 border-2 border-[#D2C1B6] hover:border-[#456882] rounded-lg transition-colors">
                            <Eye size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
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
          <section className="px-4 md:px-8 py-8 md:py-16 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1B3C53] mb-4 md:mb-6">
                    About BAGMA Overseas
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
                    Established in 2013, BAGMA Overseas is a
                    government-recognized export firm specializing in premium
                    home textiles and hospitality products. From our
                    state-of-the-art facility in Panipat, Haryana, we serve
                    global markets with uncompromising quality and innovative
                    designs.
                  </p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="text-center p-3 md:p-4 bg-[#F9F3EF] rounded-lg border border-[#D2C1B6]/30">
                      <div className="text-lg md:text-2xl font-bold text-[#456882]">
                        90%
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        Export Business
                      </div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-[#F9F3EF] rounded-lg border border-[#D2C1B6]/30">
                      <div className="text-lg md:text-2xl font-bold text-[#456882]">
                        15+
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        Countries Served
                      </div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-[#F9F3EF] rounded-lg border border-[#D2C1B6]/30">
                      <div className="text-lg md:text-2xl font-bold text-[#456882]">
                        100K+
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        Monthly Production
                      </div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-[#F9F3EF] rounded-lg border border-[#D2C1B6]/30">
                      <div className="text-lg md:text-2xl font-bold text-[#456882]">
                        4.4★
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        Customer Rating
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/about"
                    className="inline-flex items-center text-[#456882] hover:text-[#1B3C53] font-medium text-sm md:text-base transition-colors"
                  >
                    Learn More About Us
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-xl p-6 md:p-8">
                    <img
                      src="/api/placeholder/500/400"
                      alt="BAGMA Overseas Manufacturing Facility"
                      className="rounded-lg shadow-lg w-full h-48 md:h-64 object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[#D2C1B6] text-[#1B3C53] px-3 md:px-4 py-2 rounded-lg font-bold text-sm md:text-base shadow-lg">
                    Since 2013
                  </div>
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
              <p className="text-sm md:text-lg text-[#D2C1B6] mb-6 md:mb-8">
                Get in touch with our team for custom quotes and bulk orders
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#D2C1B6] text-[#1B3C53] px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#F9F3EF] transition-colors text-sm md:text-base">
                  Get Quote Now
                </button>
                <button className="border-2 border-[#D2C1B6] text-[#D2C1B6] px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#D2C1B6] hover:text-[#1B3C53] transition-colors text-sm md:text-base">
                  Call: +91-804-580-3379
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
