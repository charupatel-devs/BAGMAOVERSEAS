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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../../services_hooks/customer/productService";

const ProductViewPage = () => {
  const {
    currentProduct = null,
    isFetching = false,
    error = null,
  } = useSelector((state) => state.userProducts || {});
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("specifications");

  useEffect(() => {
    if (productId) {
      getProductById(dispatch, productId);
    }
  }, [productId, dispatch]);

  // Update quantity when product data loads
  useEffect(() => {
    if (currentProduct?.minOrderQuantity) {
      setQuantity(currentProduct.minOrderQuantity);
    }
  }, [currentProduct?.minOrderQuantity]);

  // Default product images (since API images array is empty)
  const productImages =
    currentProduct?.images?.length > 0
      ? currentProduct.images
      : [
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

  // Transform specifications object to display format and filter out N/A values
  const getFormattedSpecifications = () => {
    if (!currentProduct?.specifications) return {};

    const specs = currentProduct.specifications;
    const allSpecs = {
      Material: specs.material,
      "Usage/Application": specs.usage_application,
      Pattern: specs.pattern,
      Thickness: specs.thickness ? `${specs.thickness} mm` : null,
      Size: specs.size,
      Brand: specs.brand || currentProduct.brand || "Bagma",
      Color: specs.color || "Multi Coloured",
      Type: specs.type || currentProduct.category?.name,
      Shape: specs.shape,
      "Wash Care": specs.wash_care,
      "Water Resistant": specs.water_resistant,
      "Packaging Type": specs.packaging_type,
      "Packaging Size": specs.packaging_size,
      Weight:
        specs.weight ||
        (currentProduct.weight ? `${currentProduct.weight}g` : null),
      "Pieces per Bale": specs.pieces_per_bale,
      "Item Code": specs.item_code || currentProduct.sku,
      "Production Capacity": specs.production_capacity,
      "Delivery Time": specs.delivery_time || currentProduct.leadTime,
      "Minimum Order": `${currentProduct.minOrderQuantity || 1} ${
        currentProduct.unit || "Pieces"
      }`,
    };

    // Filter out empty, null, undefined, "N/A", and falsy values (except 0)
    const filteredSpecs = {};
    Object.entries(allSpecs).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== "N/A" &&
        value !== "n/a" &&
        !(typeof value === "string" && value.trim() === "") &&
        value !== 0 // Keep 0 values if they exist
      ) {
        filteredSpecs[key] = value;
      }
    });

    return filteredSpecs;
  };

  // Loading state
  if (isFetching) {
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F3EF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#D2C1B6] rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-[#456882]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1B3C53] mb-4">
            Error Loading Product
          </h1>
          <p className="text-gray-600 mb-4">
            {error || "Something went wrong while loading the product."}
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

  // Product not found
  if (!currentProduct) {
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
            The requested product could not be found.
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

  const specifications = getFormattedSpecifications();
  const minQuantity = currentProduct.minOrderQuantity || 1;

  // Filter additionalInfo to remove N/A values
  const additionalInfo = [
    { label: "Item Code", value: currentProduct.sku || currentProduct.id },
    {
      label: "Production Capacity",
      value: specifications["Production Capacity"],
    },
    { label: "Delivery Time(Approx)", value: specifications["Delivery Time"] },
    { label: "Packaging Details", value: specifications["Packaging Type"] },
  ].filter(
    (info) =>
      info.value &&
      info.value !== "N/A" &&
      info.value !== "n/a" &&
      info.value.toString().trim() !== ""
  );

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
            {currentProduct.category?.name || "Category"}
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#456882] font-medium">
            {currentProduct.name}
          </span>
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
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />

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
                {currentProduct.name}
              </h1>
              <div className="flex items-center gap-2 mb-0">
                {currentProduct.averageRating > 0 && (
                  <>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(currentProduct.averageRating)
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({currentProduct.numReviews} reviews)
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-xl p-2 border border-[#D2C1B6]/30 ">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-[#1B3C53]">
                  ₹{currentProduct.price}{" "}
                  <span className="text-2xl font-bold text-[#1B3C53]">
                    Per {currentProduct.unit || "Piece"}
                  </span>
                </span>
              </div>
              <p className="text-gray-600 mb-2 text-sm">
                <span className="font-medium">
                  {currentProduct.gst || 18}% GST
                </span>{" "}
                will be additional
                <p>
                  <span>Minimum Order: {specifications["Minimum Order"]}</span>
                </p>
              </p>

              <p className="text-xs text-[#456882] font-medium">
                ✓ Best Price Guaranteed • ✓ Quality Assured • ✓ Fast Delivery
              </p>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-3">
                Product Details :
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <p className="text-gray-700 leading-relaxed">
                  {currentProduct.description ||
                    "High quality product designed for your needs."}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
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
                  <div className="font-medium text-sm">
                    Subtotal: ₹
                    {(quantity * currentProduct.price).toLocaleString()}
                  </div>
                  <div className="font-medium text-sm text-gray-500">
                    GST ({currentProduct.gst || 18}%): ₹
                    {Math.round(
                      (quantity *
                        currentProduct.price *
                        (currentProduct.gst || 18)) /
                        100
                    ).toLocaleString()}
                  </div>
                  <div className="font-bold text-lg border-t pt-1">
                    Total: ₹
                    {Math.round(
                      quantity *
                        currentProduct.price *
                        (1 + (currentProduct.gst || 18) / 100)
                    ).toLocaleString()}
                  </div>
                  <div className="text-xs font-bold">Ex-Mill Price</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2 font-bold">
                *Transportation Cost will be paid by Buyer at Destination
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 ">
              <button className=" w-1/2 bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
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
                Reviews ({currentProduct.numReviews || 0})
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-2xl font-bold text-[#1B3C53] mb-4">
                    Product Specifications
                  </h3>

                  {Object.keys(specifications).length > 0 ? (
                    <>
                      {/* Two Column Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Main Specifications */}
                        <div className="bg-white rounded-xl border border-[#D2C1B6]/30 overflow-hidden">
                          <div className="bg-[#456882] text-white px-4 py-2 font-semibold text-center">
                            Main Specifications
                          </div>
                          <table className="w-full border-collapse">
                            <tbody>
                              {Object.entries(specifications)
                                .slice(
                                  0,
                                  Math.ceil(
                                    Object.entries(specifications).length / 2
                                  )
                                )
                                .map(([key, value], index) => (
                                  <tr
                                    key={index}
                                    className={`${
                                      index % 2 === 0
                                        ? "bg-white"
                                        : "bg-[#F9F3EF]"
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
                              {Object.entries(specifications)
                                .slice(
                                  Math.ceil(
                                    Object.entries(specifications).length / 2
                                  )
                                )
                                .map(([key, value], index) => (
                                  <tr
                                    key={index}
                                    className={`${
                                      index % 2 === 0
                                        ? "bg-white"
                                        : "bg-[#F9F3EF]"
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

                      {/* Additional Information */}
                      {additionalInfo.length > 0 && (
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
                                <span className="text-gray-700">
                                  {info.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-lg">
                        No specifications available for this product.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "description" && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#1B3C53]">
                    Product Description
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {currentProduct.description ||
                        "High quality product designed for your needs."}
                    </p>
                    {/* <p className="text-gray-700 leading-relaxed mb-4">
                      This premium quality{" "}
                      {currentProduct.category?.name?.toLowerCase() ||
                        "product"}{" "}
                      is crafted with precision using high-grade{" "}
                      {specifications.Material} material. The{" "}
                      {specifications.Pattern?.toLowerCase()} design adds
                      elegance to any space while providing excellent
                      functionality.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Perfect for{" "}
                      {specifications["Usage/Application"]?.toLowerCase()} use,
                      this product offers durability, comfort, and style.
                      Available in {specifications.Color?.toLowerCase()} and
                      provides excellent value for money with our quality
                      guarantee.
                    </p> */}
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

                  {currentProduct.averageRating > 0 ? (
                    <div className="bg-[#F9F3EF] rounded-xl p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl font-bold text-[#1B3C53]">
                          {currentProduct.averageRating}
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(currentProduct.averageRating)
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-gray-600">
                            Based on {currentProduct.numReviews} reviews
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#F9F3EF] rounded-xl p-6 text-center">
                      <p className="text-gray-600">
                        No reviews yet. Be the first to review this product!
                      </p>
                    </div>
                  )}

                  {/* Display actual reviews if they exist */}
                  {currentProduct.reviews &&
                  currentProduct.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {currentProduct.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="bg-white border border-[#D2C1B6]/30 rounded-xl p-6"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#456882] rounded-full flex items-center justify-center text-white font-bold">
                                {review.user?.name?.[0] || "U"}
                              </div>
                              <div>
                                <div className="font-medium text-[#1B3C53]">
                                  {review.user?.name || `Customer ${index + 1}`}
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "text-yellow-500 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-center text-gray-500 italic">
                        No reviews available yet. Be the first to review this
                        product!
                      </p>
                    </div>
                  )}
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
