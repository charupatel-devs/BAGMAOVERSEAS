import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Mail,
  MessageCircle,
  Minus,
  Package,
  Phone,
  Plus,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductViewPage = () => {
  const { productId } = useParams(); // Get productId from URL
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(250);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("specifications");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const productDatabase = {
    "cotton-tufted-bath-mats-50x80": {
      id: "cotton-tufted-bath-mats-50x80",
      name: "Cotton Tufted Bath Mats",
      price: 450,
      originalPrice: 600,
      rating: 4.5,
      reviews: 28,
      description:
        "100% Cotton Tufted Bath Mats, GSM 1800, Size 50x80 cm. Anti-slip hot melt latex backing.",
      features: [
        "Anti-slip backing",
        "100% Cotton",
        "GSM 1800",
        "Machine washable",
      ],
      inStock: true,
      discount: 25,
      category: "Bath Mats",
      attributes: {
        Material: "100% Cotton",
        "Usage/Application": "Bathroom",
        Pattern: "Tufted",
        Thickness: "12 mm",
        Size: "50 x 80 cm",
        Brand: "Bagma",
        Color: "Multi Coloured",
        Type: "Bath Mats",
        Shape: "Rectangle",
        "Wash Care": "Machine Washable",
        "Water Resistant": "Water Absorbent",
        "Packaging Type": "Polybags and Corrugated Boxes",
        Weight: "720 Grams approx",
        GSM: "1800",
        "Production Capacity": "100000 Bath Mats per Month",
        "Delivery Time(Approx)": "7 Days",
        "Minimum Order": "50 Pieces",
      },
    },
    "micro-polyester-flower-door-mat": {
      id: "micro-polyester-flower-door-mat",
      name: "Micro Polyester Flower Door Mat",
      price: 55,
      originalPrice: 75,
      rating: 4.3,
      reviews: 15,
      description:
        "Beautiful Micro Polyester Door Mat with floral design. Size 16x24 inches, perfect for bedroom use.",
      features: [
        "Micro Polyester",
        "Floral Design",
        "16x24 inches",
        "Multi Colored",
      ],
      inStock: true,
      discount: 27,
      category: "Door Mats",
      attributes: {
        Material: "Micro Polyester",
        "Usage/Application": "Bedroom",
        Pattern: "Floral",
        Thickness: "8 mm",
        Size: "16 x 24 inch",
        Brand: "Bagma",
        Color: "Multi Coloured",
        Type: "Door Mats",
        Shape: "Rectangle",
        "Wash Care": "Handwash",
        "Water Resistant": "Non Water Resistant",
        "Packaging Type": "Polybags and PP Bales",
        "Packaging Size": "80 Kg",
        Weight: "350 Grams approx",
        "Production Capacity": "10000 Door Mats per Month",
        "Delivery Time(Approx)": "5 Days",
        "Minimum Order": "250 Pieces",
      },
    },
    "hotel-bath-rugs-60x88": {
      id: "hotel-bath-rugs-60x88",
      name: "Hotel Bath Rugs",
      price: 750,
      originalPrice: 900,
      rating: 4.7,
      reviews: 42,
      description:
        "Luxurious Hotel Bath Rugs, White, Size 60x88 cm, GSM 1700. Perfect for hospitality sector.",
      features: [
        "Luxurious quality",
        "Hotel grade",
        "Anti-slip latex",
        "GSM 1700",
      ],
      inStock: true,
      discount: 17,
      category: "Bath Mats",
      attributes: {
        Material: "100% Cotton",
        "Usage/Application": "Hotel/Hospitality",
        Pattern: "Plain Tufted",
        Thickness: "15 mm",
        Size: "60 x 88 cm",
        Brand: "Bagma",
        Color: "White",
        Type: "Hotel Bath Rugs",
        Shape: "Rectangle",
        "Wash Care": "Machine Washable",
        "Water Resistant": "Highly Absorbent",
        "Packaging Type": "Polybags and Corrugated Boxes",
        Weight: "898 Grams approx",
        GSM: "1700",
        "Production Capacity": "50000 Bath Rugs per Month",
        "Delivery Time(Approx)": "10 Days",
        "Minimum Order": "100 Pieces",
      },
    },
    "kids-colorful-bath-mats": {
      id: "kids-colorful-bath-mats",
      name: "Kids Colorful Bath Mats",
      price: 280,
      originalPrice: 350,
      rating: 4.8,
      reviews: 35,
      description:
        "Car design Kids Bath Mats, Size 40x60 cm. Attractive and colorful for children.",
      features: [
        "Kid-friendly design",
        "Car patterns",
        "Soft and safe",
        "Vibrant colors",
      ],
      inStock: true,
      discount: 20,
      category: "Kids Mats",
      attributes: {
        Material: "Cotton Mix",
        "Usage/Application": "Kids Bathroom",
        Pattern: "Car Design",
        Thickness: "10 mm",
        Size: "40 x 60 cm",
        Brand: "Bagma",
        Color: "Multi Coloured",
        Type: "Kids Bath Mats",
        Shape: "Rectangle",
        "Wash Care": "Machine Washable",
        "Water Resistant": "Water Absorbent",
        "Packaging Type": "Polybags",
        Weight: "400 Grams approx",
        GSM: "1400-1600",
        "Production Capacity": "20000 Kids Mats per Month",
        "Delivery Time(Approx)": "5 Days",
        "Minimum Order": "100 Pieces",
      },
    },
  };

  // Load product data
  useEffect(() => {
    const loadProduct = () => {
      setLoading(true);
      console.log("Loading product:", productId); // Debug log

      // Simulate API call delay
      setTimeout(() => {
        const productData = productDatabase[productId];
        console.log("Found product:", productData); // Debug log

        if (productData) {
          setProduct(productData);
          // Set minimum quantity based on product
          setQuantity(
            parseInt(productData.attributes["Minimum Order"].split(" ")[0])
          );
        }
        setLoading(false);
      }, 500);
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const productImages = [
    "https://images.unsplash.com/photo-1584622781564-1d987ce3d4d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [productImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F3EF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#456882] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1B3C53] font-medium text-lg">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F3EF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#D2C1B6] rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-[#456882]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1B3C53] mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            Product ID: "{productId}" not found in our database.
          </p>
          <p className="text-gray-600 mb-8">
            Available products: cotton-tufted-bath-mats-50x80,
            micro-polyester-flower-door-mat, hotel-bath-rugs-60x88,
            kids-colorful-bath-mats
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const minQuantity = parseInt(
    product.attributes["Minimum Order"].split(" ")[0]
  );

  const additionalInfo = [
    { label: "Item Code", value: product.id.toUpperCase() },
    {
      label: "Production Capacity",
      value: product.attributes["Production Capacity"],
    },
    {
      label: "Delivery Time(Approx)",
      value: product.attributes["Delivery Time(Approx)"],
    },
    { label: "Packaging Details", value: product.attributes["Packaging Type"] },
  ];

  return (
    <div className="min-h-screen bg-[#F9F3EF] px-20">
      {/* Header */}
      <div className="bg-[#F9F3EF] border-b border-[#D2C1B6]/30 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-[#456882] hover:text-[#1B3C53] transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="hidden md:inline">Share</span>
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 transition-colors ${
                  isFavorite
                    ? "text-red-500"
                    : "text-[#456882] hover:text-red-500"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                />
                <span className="hidden md:inline">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Home className="w-4 h-4" />
          <button
            onClick={() => navigate("/")}
            className="hover:text-[#456882]"
          >
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <button
            onClick={() => navigate("/products")}
            className="hover:text-[#456882]"
          >
            Products
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-[#456882] cursor-pointer">
            {product.category}
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#456882] font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white border border-[#D2C1B6]/30">
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  -{product.discount}% OFF
                </div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-[#1B3C53]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
              >
                <ChevronRight className="w-6 h-6 text-[#1B3C53]" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {productImages.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-[#456882] ring-2 ring-[#456882]/20"
                      : "border-[#D2C1B6] hover:border-[#456882]/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-[#1B3C53] mb-1">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-0"></div>
              {/* <p className="text-gray-700 leading-relaxed w-3/4 font-bold">
                {product.description}
              </p> */}
            </div>

            {/* Price */}
            <div className="bg-white rounded-xl p-2 border border-[#D2C1B6]/30 ">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-[#1B3C53]">
                  ₹{product.price}{" "}
                  <span className="text-2xl font-bold text-[#1B3C53]">
                    Per Piece
                  </span>
                </span>
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                <span className="font-medium"> 5% GST</span> will be additional
                <p>
                  <span>
                    Minimum Order: {product.attributes["Minimum Order"]}
                  </span>
                </p>
              </p>

              <p className="text-xs text-[#456882] font-medium">
                ✓ Best Price Guaranteed • ✓ Quality Assured • ✓ Fast Delivery
              </p>
            </div>

            {/* Key Features - Compact */}
            <div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-3">
                Product Details :
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {product.description}
                {/* {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-[#F9F3EF] border border-[#D2C1B6]/30 rounded-lg p-2"
                  >
                    <div className="w-2 h-2 bg-[#456882] rounded-full"></div>
                    <span className="text-sm font-medium text-[#1B3C53]">
                      {feature}
                    </span>
                  </div>
                ))} */}
              </div>
            </div>

            {/* Quantity Selector - Compact */}
            <div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-3">
                Order Quantity
              </h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center border-2 border-[#456882] rounded-lg bg-white">
                  <button
                    onClick={() =>
                      setQuantity(Math.max(minQuantity, quantity - 1))
                    }
                    className="p-2 hover:bg-[#F9F3EF] transition-colors rounded-l-lg"
                  >
                    <Minus className="w-4 h-4 text-[#456882]" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(
                          minQuantity,
                          parseInt(e.target.value) || minQuantity
                        )
                      )
                    }
                    className="px-4 py-2 font-bold text-lg text-center min-w-[80px] focus:outline-none"
                    min={minQuantity}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-[#F9F3EF] transition-colors rounded-r-lg"
                  >
                    <Plus className="w-4 h-4 text-[#456882]" />
                  </button>
                </div>
                <div className="text-gray-600 text-xl">
                  <div className="font-medium">
                    Total: ₹{(quantity * product.price).toLocaleString()}
                  </div>
                  <div className="text-xs font-bold">
                    including GST <br />
                    Ex-Mill Price
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2 font-bold">
                *Transportation Cost will be paid by Buyer at Destination
              </p>
            </div>

            {/* Action Buttons - Simplified */}
            <div className="space-y-3 ">
              <button className=" w-1/2 bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Trust Badges - Compact */}
            {/* <div className="grid grid-cols-4 gap-3 py-4 border-t border-[#D2C1B6]/30">
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="w-8 h-8 bg-[#456882]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#456882]" />
                </div>
                <span className="text-xs font-medium text-gray-700">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="w-8 h-8 bg-[#456882]/10 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 text-[#456882]" />
                </div>
                <span className="text-xs font-medium text-gray-700">
                  Easy Returns
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="w-8 h-8 bg-[#456882]/10 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-[#456882]" />
                </div>
                <span className="text-xs font-medium text-gray-700">
                  Quality Assured
                </span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="bg-[#F9F3EF] rounded-2xl border border-[#D2C1B6]/30 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-[#D2C1B6]/30">
              <button
                onClick={() => setActiveTab("specifications")}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === "specifications"
                    ? "bg-[#456882] text-white"
                    : "text-[#456882] hover:bg-[#D2C1B6]/20"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === "description"
                    ? "bg-[#456882] text-white"
                    : "text-[#456882] hover:bg-[#D2C1B6]/20"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === "reviews"
                    ? "bg-[#456882] text-white"
                    : "text-[#456882] hover:bg-[#D2C1B6]/20"
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </div>
            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-2xl font-bold text-[#1B3C53] mb-4">
                    Product Specifications
                  </h3>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Main Specifications */}
                    <div className="bg-white rounded-xl border border-[#D2C1B6]/30 overflow-hidden">
                      <div className="bg-[#456882] text-white px-4 py-2 font-semibold text-center">
                        Main Specifications
                      </div>
                      <table className="w-full border-collapse">
                        <tbody>
                          {Object.entries(product.attributes)
                            .slice(
                              0,
                              Math.ceil(
                                Object.entries(product.attributes).length / 2
                              )
                            )
                            .map(([key, value], index) => (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 === 0 ? "bg-white" : "bg-[#F9F3EF]"
                                } hover:bg-[#D2C1B6]/20 transition-colors`}
                              >
                                <td className="border-r border-[#D2C1B6]/30 px-3 py-2 font-medium text-[#1B3C53] text-sm w-1/2">
                                  {key}
                                </td>
                                <td className="px-3 py-2 text-gray-700 text-sm">
                                  {value}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Right Column - Additional Specifications */}
                    <div className="bg-white rounded-xl border border-[#D2C1B6]/30 overflow-hidden">
                      <div className="bg-[#456882] text-white px-4 py-2 font-semibold text-center">
                        Additional Details
                      </div>
                      <table className="w-full border-collapse">
                        <tbody>
                          {Object.entries(product.attributes)
                            .slice(
                              Math.ceil(
                                Object.entries(product.attributes).length / 2
                              )
                            )
                            .map(([key, value], index) => (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 === 0 ? "bg-white" : "bg-[#F9F3EF]"
                                } hover:bg-[#D2C1B6]/20 transition-colors`}
                              >
                                <td className="border-r border-[#D2C1B6]/30 px-3 py-2 font-medium text-[#1B3C53] text-sm w-1/2">
                                  {key}
                                </td>
                                <td className="px-3 py-2 text-gray-700 text-sm">
                                  {value}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Additional Information - Compact */}
                  <div className="mt-6 bg-[#F9F3EF] rounded-xl p-4 border border-[#D2C1B6]/30">
                    <h4 className="text-lg font-bold text-[#1B3C53] mb-3">
                      Order Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {additionalInfo.map((info, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Package className="w-4 h-4 text-[#456882] flex-shrink-0" />
                          <span className="font-medium text-[#1B3C53]">
                            {info.label}:
                          </span>
                          <span className="text-gray-700">{info.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "description" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1B3C53]">
                    Product Description
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong>{product.name}</strong> - {product.description}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      These premium quality {product.category.toLowerCase()} are
                      crafted with precision using high-grade{" "}
                      {product.attributes.Material} material. The{" "}
                      {product.attributes.Pattern.toLowerCase()} design adds
                      elegance to any space while providing excellent
                      functionality.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Perfect for{" "}
                      {product.attributes["Usage/Application"].toLowerCase()}{" "}
                      use, these products offer durability, comfort, and style.
                      Available in {product.attributes.Color.toLowerCase()} and
                      provides excellent value for money with our quality
                      guarantee.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#1B3C53]">
                      Customer Reviews
                    </h3>
                    <button className="bg-[#456882] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1B3C53] transition-colors">
                      Write a Review
                    </button>
                  </div>

                  <div className="bg-[#F9F3EF] rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl font-bold text-[#1B3C53]">
                        {product.rating}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-gray-600">
                          Based on {product.reviews} reviews
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="bg-white border border-[#D2C1B6]/30 rounded-xl p-6"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#456882] rounded-full flex items-center justify-center text-white font-bold">
                              U{review}
                            </div>
                            <div>
                              <div className="font-medium text-[#1B3C53]">
                                Customer {review}
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 text-yellow-500 fill-current"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            2 days ago
                          </div>
                        </div>
                        <p className="text-gray-700">
                          Excellent quality door mat! The floral design is
                          beautiful and the material feels premium. Great value
                          for money and fast delivery. Highly recommended!
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Supplier */}
        <div className="mt-16 bg-white rounded-2xl border border-[#D2C1B6]/30 p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#1B3C53] mb-4">
              Contact Supplier
            </h3>
            <p className="text-lg text-gray-600">
              Get in touch with BAGMA Overseas for bulk orders and custom
              requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[#F9F3EF] rounded-xl">
              <div className="w-16 h-16 bg-[#456882] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-[#1B3C53] mb-2">Call Us</h4>
              <p className="text-[#456882] font-medium">+91-804-580-3379</p>
            </div>

            <div className="text-center p-6 bg-[#F9F3EF] rounded-xl">
              <div className="w-16 h-16 bg-[#456882] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-[#1B3C53] mb-2">Email Us</h4>
              <p className="text-[#456882] font-medium">
                info@bagmaoverseas.com
              </p>
            </div>

            <div className="text-center p-6 bg-[#F9F3EF] rounded-xl">
              <div className="w-16 h-16 bg-[#456882] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-[#1B3C53] mb-2">Live Chat</h4>
              <p className="text-[#456882] font-medium">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;
