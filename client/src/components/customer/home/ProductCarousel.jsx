import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const ProductCarousel = ({ products }) => {
  // ✅ ALL HOOKS MUST BE AT THE TOP - CALLED EVERY RENDER
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Filter products but ensure it's always an array
  const validProducts =
    products?.filter(
      (product) => product && (product._id || product.id) && product.name
    ) || [];

  // ✅ ALWAYS call useEffect - no conditional logic in hook calls
  useEffect(() => {
    // Only set interval if we have multiple products
    if (validProducts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % validProducts.length);
      }, 10000);
      return () => clearInterval(interval);
    }
    // Always return cleanup function (even if empty)
    return () => {};
  }, [validProducts.length]);

  // ✅ ALWAYS call this useEffect - no conditional logic
  useEffect(() => {
    // Reset slide if current slide is out of bounds
    if (validProducts.length > 0 && currentSlide >= validProducts.length) {
      setCurrentSlide(0);
    }
  }, [validProducts.length, currentSlide]);

  // ✅ Define functions after hooks but before render logic
  const nextSlide = () => {
    if (validProducts.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % validProducts.length);
    }
  };

  const prevSlide = () => {
    if (validProducts.length > 0) {
      setCurrentSlide(
        (prev) => (prev - 1 + validProducts.length) % validProducts.length
      );
    }
  };

  // ✅ Conditional return AFTER all hooks
  if (!validProducts.length) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-br from-[#1B3C53] via-[#456882] to-[#1B3C53] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
      </div>

      {/* Reduced height significantly */}
      <div className="relative h-64 md:h-72 lg:h-80">
        {validProducts.map((product, index) => (
          <div
            key={product._id || product.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <div className="container mx-auto px-6 h-full flex items-center justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full max-w-5xl mx-20">
                {/* Left Content - Reduced spacing and better alignment */}
                <div className="space-y-3 flex flex-col justify-center pr-4">
                  <div>
                    <span className="bg-[#D2C1B6] text-[#1B3C53] px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge || "Featured"}
                    </span>
                  </div>

                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {product.name || "Product Name"}
                  </h1>

                  <p className="text-sm md:text-base text-[#D2C1B6] line-clamp-2 max-w-lg">
                    {product.description && product.description.length > 120
                      ? product.description.slice(0, 120) + "..."
                      : product.description ||
                        "Product description not available"}
                  </p>

                  {/* Size or SKU */}
                  {product.dimensions?.length && product.dimensions?.width && (
                    <p className="text-sm text-white/80">
                      Size: {product.dimensions.length} ×{" "}
                      {product.dimensions.width}
                    </p>
                  )}

                  <div className="flex items-center space-x-3">
                    <span className="text-xl md:text-2xl font-bold text-[#D2C1B6]">
                      ₹{product.price || "0"}
                    </span>
                    {product.originalPrice &&
                      product.originalPrice > (product.price || 0) && (
                        <span className="line-through text-base md:text-lg text-gray-300/80">
                          ₹{product.originalPrice}
                        </span>
                      )}
                  </div>

                  <button className="w-3/4 inline-flex  bg-[#D2C1B6] text-[#1B3C53] px-2 py-2.5 rounded-lg hover:bg-[#F9F3EF] transition-all duration-300 font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Product
                  </button>
                </div>

                {/* Product Image - Closer to content and centered */}
                <div className="relative flex items-center justify-center pl-4">
                  <div className="relative w-full max-w-xs">
                    <img
                      src={
                        product.primaryImage ||
                        product.images?.[0]?.url ||
                        "/api/placeholder/280/200"
                      }
                      alt={product.name}
                      className="w-full h-44 md:h-48 lg:h-52 object-cover rounded-lg shadow-xl"
                    />

                    {/* Slide number badge - repositioned */}
                    <div className="absolute -top-3 -right-3 bg-[#D2C1B6] text-[#1B3C53] px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                      {index + 1}/{validProducts.length}
                    </div>

                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show if more than 1 product */}
      {validProducts.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 group border border-white/20"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 group border border-white/20"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if more than 1 product */}
      {validProducts.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {validProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-[#D2C1B6] scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
