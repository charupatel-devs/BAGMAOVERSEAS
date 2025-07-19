import {
  ChevronRight,
  Eye,
  Filter,
  Grid,
  Heart,
  List,
  Package,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

// Real BAGMA product data with unique IDs
const products = [
  {
    id: "cotton-tufted-bath-mats-50x80",
    slug: "cotton-tufted-bath-mats-50x80",
    name: "Cotton Tufted Bath Mats",
    category: "bath-mats",
    price: 450,
    originalPrice: 600,
    rating: 4.5,
    reviews: 28,
    image:
      "https://images.unsplash.com/photo-1584622781564-1d987ce3d4d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
  },
  {
    id: "micro-polyester-flower-door-mat",
    slug: "micro-polyester-flower-door-mat",
    name: "Micro Polyester Flower Door Mat",
    category: "door-mats",
    price: 55,
    originalPrice: 75,
    rating: 4.3,
    reviews: 15,
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "Micro Polyester Door Mats, Size 16x24 inches. Beautiful butterfly design.",
    features: [
      "Micro Polyester",
      "Designer patterns",
      "Lightweight",
      "Multi-colored",
    ],
    inStock: true,
    discount: 27,
  },
  {
    id: "hotel-bath-rugs-60x88",
    slug: "hotel-bath-rugs-60x88",
    name: "Hotel Bath Rugs",
    category: "bath-mats",
    price: 750,
    originalPrice: 900,
    rating: 4.7,
    reviews: 42,
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
  },
  {
    id: 4,
    name: "Kids Colorful Bath Mats",
    category: "kids-mats",
    price: 280,
    originalPrice: 350,
    rating: 4.8,
    reviews: 35,
    image:
      "https://images.unsplash.com/photo-1558618020-fde91ad7eaa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
  },
  {
    id: 5,
    name: "Handloom Door Mats",
    category: "door-mats",
    price: 220,
    originalPrice: 280,
    rating: 4.2,
    reviews: 22,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "Cotton Ribbed Handloom Door Mats, Size 16x24 inches. Traditional craftsmanship.",
    features: [
      "Handloom crafted",
      "Cotton ribbed",
      "Traditional design",
      "Reversible",
    ],
    inStock: true,
    discount: 21,
  },
  {
    id: 6,
    name: "Chenille Bath Mats",
    category: "bath-mats",
    price: 580,
    originalPrice: 720,
    rating: 4.6,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "Chenille Bath Mats, Size 50x80 cm, GSM 2000. Soft 2.5mm pile with anti-slip backing.",
    features: ["Chenille pile", "2.5mm thickness", "GSM 2000", "Ultra soft"],
    inStock: true,
    discount: 19,
  },
  {
    id: 7,
    name: "Round Cotton Bath Mat",
    category: "bath-mats",
    price: 380,
    originalPrice: 450,
    rating: 4.4,
    reviews: 12,
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "Round Cotton Bath Mat, Diameter 60 cm. Elegant circular design.",
    features: [
      "Round shape",
      "60cm diameter",
      "Cotton material",
      "Elegant design",
    ],
    inStock: false,
    discount: 16,
  },
  {
    id: 8,
    name: "Anti-Slip Door Mats",
    category: "door-mats",
    price: 420,
    originalPrice: 500,
    rating: 4.5,
    reviews: 25,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "TPR Rubberised Anti-Slip Door Mats, Size 15x23 inches. Maximum grip and safety.",
    features: [
      "TPR rubber base",
      "Anti-slip surface",
      "Weather resistant",
      "High grip",
    ],
    inStock: true,
    discount: 16,
  },
  {
    id: 8,
    name: "Anti-Slip Door Mats",
    category: "door-mats",
    price: 420,
    originalPrice: 500,
    rating: 4.5,
    reviews: 25,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "TPR Rubberised Anti-Slip Door Mats, Size 15x23 inches. Maximum grip and safety.",
    features: [
      "TPR rubber base",
      "Anti-slip surface",
      "Weather resistant",
      "High grip",
    ],
    inStock: true,
    discount: 16,
  },
  {
    id: 8,
    name: "Anti-Slip Door Mats",
    category: "door-mats",
    price: 420,
    originalPrice: 500,
    rating: 4.5,
    reviews: 25,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "TPR Rubberised Anti-Slip Door Mats, Size 15x23 inches. Maximum grip and safety.",
    features: [
      "TPR rubber base",
      "Anti-slip surface",
      "Weather resistant",
      "High grip",
    ],
    inStock: true,
    discount: 16,
  },
  {
    id: 8,
    name: "Anti-Slip Door Mats",
    category: "door-mats",
    price: 420,
    originalPrice: 500,
    rating: 4.5,
    reviews: 25,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "TPR Rubberised Anti-Slip Door Mats, Size 15x23 inches. Maximum grip and safety.",
    features: [
      "TPR rubber base",
      "Anti-slip surface",
      "Weather resistant",
      "High grip",
    ],
    inStock: true,
    discount: 16,
  },
  {
    id: 8,
    name: "Anti-Slip Door Mats",
    category: "door-mats",
    price: 420,
    originalPrice: 500,
    rating: 4.5,
    reviews: 25,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "TPR Rubberised Anti-Slip Door Mats, Size 15x23 inches. Maximum grip and safety.",
    features: [
      "TPR rubber base",
      "Anti-slip surface",
      "Weather resistant",
      "High grip",
    ],
    inStock: true,
    discount: 16,
  },
  {
    id: 8,
    name: "Anti-Slip Door Mats",
    category: "door-mats",
    price: 420,
    originalPrice: 500,
    rating: 4.5,
    reviews: 25,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "TPR Rubberised Anti-Slip Door Mats, Size 15x23 inches. Maximum grip and safety.",
    features: [
      "TPR rubber base",
      "Anti-slip surface",
      "Weather resistant",
      "High grip",
    ],
    inStock: true,
    discount: 16,
  },
  {
    id: 8,
    name: "Anti-Slip Door Mats",
    category: "door-mats",
    price: 420,
    originalPrice: 500,
    rating: 4.5,
    reviews: 25,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "TPR Rubberised Anti-Slip Door Mats, Size 15x23 inches. Maximum grip and safety.",
    features: [
      "TPR rubber base",
      "Anti-slip surface",
      "Weather resistant",
      "High grip",
    ],
    inStock: true,
    discount: 16,
  },
  {
    id: 8,
    name: "Anti-Slip Door Mats",
    category: "door-mats",
    price: 420,
    originalPrice: 500,
    rating: 4.5,
    reviews: 25,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "TPR Rubberised Anti-Slip Door Mats, Size 15x23 inches. Maximum grip and safety.",
    features: [
      "TPR rubber base",
      "Anti-slip surface",
      "Weather resistant",
      "High grip",
    ],
    inStock: true,
    discount: 16,
  },
];

const categories = [
  { id: "", name: "All Products", productCount: products.length },
  { id: "door-mats", name: "Door Mats", productCount: 42 },
  { id: "hotel-bath-rugs", name: "Hotel Bath Rugs", productCount: 32 },
  { id: "tufted-bath-mats", name: "Tufted Bath Mats", productCount: 34 },
  {
    id: "door-mats-anti-slip",
    name: "Door Mats - ANTI SLIP",
    productCount: 28,
  },
  {
    id: "door-mats-handloom",
    name: "Door Mats - Handloom",
    productCount: 25,
  },
  { id: "runners-anti-slip", name: "Runners - ANTI SLIP", productCount: 15 },
  {
    id: "microfiber-cleaning-cloth",
    name: "Microfiber Cleaning Cloth",
    productCount: 12,
  },
  { id: "carpets", name: "Carpets", productCount: 12 },
  { id: "bath-mats", name: "Bath Mats", productCount: 38 },
  { id: "prayer-mats", name: "Prayer Mats", productCount: 24 },
  { id: "kids-mats", name: "Kids Mats", productCount: 18 },
  { id: "braided-mats", name: "Braided Mats", productCount: 16 },
];

// Enhanced Product Card with compact design
const ProductCard = ({ product, viewMode }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleViewProduct = () => {
    console.log("Navigate to product:", product.id);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    handleViewProduct();
  };

  return (
    <div
      className="group relative bg-white rounded-xl shadow-md border border-[#D2C1B6]/30 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={handleViewProduct}
    >
      {/* Stock Badge */}
      <div
        className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-xs font-medium ${
          product.inStock
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </div>

      {/* Image Section - Compact */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/90 text-[#1B3C53] hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {/* Quick View */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickView}
            className="bg-white/90 backdrop-blur-sm text-[#1B3C53] px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#456882] hover:text-white transition-all duration-200 flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content Section - Compact */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-bold text-[#1B3C53] group-hover:text-[#456882] transition-colors line-clamp-2 flex-1 leading-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500 ml-2">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-medium text-gray-600">
              {product.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-xs mb-3 line-clamp-1">
          {product.description}
        </p>

        {/* Price Section - Compact */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#1B3C53]">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-gray-500 line-through text-sm">
                ₹{product.originalPrice}
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                -{product.discount}%
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons - Compact */}
        <div className="space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Added to cart:", product.name);
            }}
            className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              product.inStock
                ? "bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white hover:shadow-md"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!product.inStock}
          >
            {product.inStock ? (
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </div>
            ) : (
              "Out of Stock"
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewProduct();
            }}
            className="w-full py-2 border border-[#456882] text-[#456882] rounded-lg text-sm font-medium hover:bg-[#456882] hover:text-white transition-all duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Sidebar Filter Component
const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onClearFilters,
  isMobile,
  isOpen,
  onClose,
}) => {
  const sidebarContent = (
    <div className="space-y-6">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-[#D2C1B6]/30">
          <h3 className="text-lg font-bold text-[#1B3C53]">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F9F3EF] rounded-lg"
          >
            <X className="w-5 h-5 text-[#456882]" />
          </button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h3 className="text-lg font-bold text-[#1B3C53] mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#456882] text-white"
                  : "text-[#1B3C53] hover:bg-[#F9F3EF]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-bold text-[#1B3C53] mb-4">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full h-2 bg-[#D2C1B6] rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex items-center justify-between text-sm text-[#1B3C53] font-medium">
            <span>₹0</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-lg font-bold text-[#1B3C53] mb-4">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-[#D2C1B6] rounded-lg px-3 py-2 bg-white text-[#1B3C53] focus:outline-none focus:ring-2 focus:ring-[#456882] text-sm"
        >
          <option value="name">Name A-Z</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="discount">Best Discount</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={onClearFilters}
        className="w-full py-2 border border-[#456882] text-[#456882] rounded-lg text-sm font-medium hover:bg-[#456882] hover:text-white transition-all duration-200"
      >
        Clear All Filters
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 lg:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 h-full overflow-y-auto">{sidebarContent}</div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#D2C1B6]/30 p-6">
      {sidebarContent}
    </div>
  );
};

// Main ProductList Component
const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and sort logic
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, sortBy, searchTerm]);

  const handleClearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 1000]);
    setSortBy("name");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Home Textile Products
              <br />
              <span className="text-[#D2C1B6] ">(ONLINE SALE)</span>
            </h1>

            <div className="max-w-4xl mx-auto mb-6">
              <p className="lg:text-XL text-[#D2C1B6]/90 leading-relaxed">
                <strong>Specializing in:</strong> Door Mats (Cotton, Jute,
                Anti-Slip Rubberised, TPR Rubber Backed, Colourful, Reversible,
                Latexed, Hot Melt Latexed, Designer, PVC) • Bath Mats (Cotton,
                Hotel, Hospitality Bath Rugs, Colourful, Designer, Chenille,
                Reversible) • Pooja Asan Mats • Janamaj • Chenille Floor Carpets
                • Light Weight Carpets • Yoga Mats • Blankets • PVC Rolls •
                Microfiber Cleaning Cloth • etc
              </p>
            </div>

            {/* Search Bar */}
            {/* <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for bath mats, door mats, rugs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D2C1B6] text-sm"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <button className="hover:text-[#456882]">Home</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#456882] font-medium">Products</span>
          {selectedCategory && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#456882] font-medium capitalize">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            </>
          )}
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-white border border-[#D2C1B6] rounded-lg px-4 py-2 text-[#1B3C53] font-medium"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex gap-8">
          {/* Desktop Sidebar - Left */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClearFilters={handleClearFilters}
              isMobile={false}
            />
          </div>

          {/* Mobile Sidebar */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onClearFilters={handleClearFilters}
            isMobile={true}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />

          {/* Products Section - Right */}
          <div className="flex-1">
            {/* Stats Bar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-[#D2C1B6]/30">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#456882]" />
                    <span className="font-semibold text-[#1B3C53]">
                      {filteredProducts.length} Products
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {filteredProducts.filter((p) => p.inStock).length} In Stock
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex items-center bg-[#F9F3EF] rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-all ${
                        viewMode === "grid"
                          ? "bg-[#456882] text-white"
                          : "text-[#456882] hover:bg-[#D2C1B6]"
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-all ${
                        viewMode === "list"
                          ? "bg-[#456882] text-white"
                          : "text-[#456882] hover:bg-[#D2C1B6]"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-[#D2C1B6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-[#456882]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B3C53] mb-3">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any products matching your search criteria.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
