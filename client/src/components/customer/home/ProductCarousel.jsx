import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselProducts = [
    {
      id: 1,
      name: "Premium Bath Mats Collection",
      description:
        "High-quality bath mats in various designs and materials for hotels and homes",
      price: 240,
      originalPrice: 300,
      image: "/api/placeholder/600/400",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Anti-Slip Door Mats",
      description:
        "Safety-focused door mats with superior grip technology and durability",
      price: 90,
      originalPrice: 120,
      image: "/api/placeholder/600/400",
      rating: 4.9,
      reviews: 87,
      badge: "New Arrival",
    },
    {
      id: 3,
      name: "Handloom Door Mats",
      description:
        "Traditional handcrafted door mats with authentic designs and premium quality",
      price: 66,
      originalPrice: 85,
      image: "/api/placeholder/600/400",
      rating: 4.7,
      reviews: 203,
      badge: "Premium",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#1B3C53] via-[#456882] to-[#1B3C53] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
      </div>

      <div className="relative h-80 md:h-96 lg:h-[500px]">
        {carouselProducts.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                <div className="space-y-4 md:space-y-6">
                  <div className="inline-block">
                    <span className="bg-[#D2C1B6] text-[#1B3C53] px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                      {product.badge}
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    {product.name}
                  </h1>

                  <p className="text-sm md:text-base lg:text-lg text-[#D2C1B6] leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[#D2C1B6] text-sm">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#D2C1B6]">
                      ₹{product.price}
                    </span>
                    <span className="text-base md:text-lg text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-[#D2C1B6] text-[#1B3C53] px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#F9F3EF] transition-colors flex items-center justify-center text-sm md:text-base"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      View Product
                    </Link>
                    <button className="border-2 border-[#D2C1B6] text-[#D2C1B6] px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#D2C1B6] hover:text-[#1B3C53] transition-colors text-sm md:text-base">
                      Get Quote
                    </button>
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative hidden lg:block">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>

                  <div className="absolute -top-2 -right-2 bg-[#D2C1B6] text-[#1B3C53] px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                    #{currentSlide + 1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 group"
      >
        <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#D2C1B6] scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductCarousel;
