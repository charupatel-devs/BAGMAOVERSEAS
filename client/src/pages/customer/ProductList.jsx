import { ChevronRight, Filter, Heart, Loader2, Package, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

// Import your actual service functions - replace with your actual imports
import { fetchCategories } from "../../services_hooks/admin/adminCategory";
import { getProducts } from "../../services_hooks/customer/productService";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/products/${product._id || product.id}`);
  };
  // Check stock status - handles both inStock boolean and stock number
  const isInStock = product.stock > 0 || product.inStock;
  const stockCount = product.stock || 0;

  return (
    <div
      className="group relative bg-white rounded-xl shadow-md border border-[#D2C1B6]/30 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={handleViewProduct}
    >
      {/* Stock Badge */}
      <div
        className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-full text-xs font-medium ${
          isInStock
            ? stockCount > 0 && stockCount <= 10
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {isInStock
          ? stockCount > 0 && stockCount <= 10
            ? `Low Stock (${stockCount})`
            : "In Stock"
          : "Out of Stock"}
      </div>

      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={
            product.images?.[0]?.url ||
            "https://images.unsplash.com/photo-1584622781564-1d987ce3d4d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          }
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
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-bold text-[#1B3C53] group-hover:text-[#456882] transition-colors line-clamp-2 flex-1 leading-tight">
            {product.name}
          </h3>
        </div>

        <p className="text-gray-600 text-xs mb-3 line-clamp-1">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#1B3C53]">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
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

        {/* Action Buttons */}
        <div className="space-y-2">
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
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  localFilters,
  setLocalFilters,
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
              key={category._id || category.id}
              onClick={() => setSelectedCategory(category._id || category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === (category._id || category.id)
                  ? "bg-[#456882] text-white"
                  : "text-[#1B3C53] hover:bg-[#F9F3EF]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-xs opacity-75">
                  ({category.productCount || category.count || 0})
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stock Status Filters */}
      {localFilters && (
        <div>
          <h3 className="text-lg font-bold text-[#1B3C53] mb-4">
            Stock Status
          </h3>
          <div className="space-y-2">
            {["in-stock", "low-stock", "out-of-stock"].map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={localFilters.stockStatus?.includes(status)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setLocalFilters((prev) => ({
                        ...prev,
                        stockStatus: [...(prev.stockStatus || []), status],
                      }));
                    } else {
                      setLocalFilters((prev) => ({
                        ...prev,
                        stockStatus: (prev.stockStatus || []).filter(
                          (s) => s !== status
                        ),
                      }));
                    }
                  }}
                  className="rounded border-[#D2C1B6] text-[#456882] focus:ring-[#456882]"
                />
                <span className="text-sm capitalize text-[#1B3C53]">
                  {status.replace("-", " ")}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-bold text-[#1B3C53] mb-4">Price Range</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
              }
              className="w-1/2 border border-[#D2C1B6] rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])
              }
              className="w-1/2 border border-[#D2C1B6] rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full h-2 bg-[#D2C1B6] rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex items-center justify-between text-sm text-[#1B3C53] font-medium">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-lg font-bold text-[#1B3C53] mb-4">Sort By</h3>
        <div className="space-y-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-[#D2C1B6] rounded-lg px-3 py-2 bg-white text-[#1B3C53] focus:outline-none focus:ring-2 focus:ring-[#456882] text-sm"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="createdAt">Date Created</option>
            <option value="rating">Rating</option>
            <option value="stock">Stock</option>
          </select>

          {setSortOrder && (
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full border border-[#D2C1B6] rounded-lg px-3 py-2 bg-white text-[#1B3C53] focus:outline-none focus:ring-2 focus:ring-[#456882] text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          )}
        </div>
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get URL search parameters - now properly imported
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial search term from URL
  const initialSearchTerm = searchParams.get("search") || "";

  // Redux state - adjust these selectors to match your actual Redux state structure
  const {
    products = [],
    pagination = {},
    stats = {},
    isFetching = false,
    error = null,
  } = useSelector((state) => state.userProducts || {});
  const { categories = [] } = useSelector(
    (state) => state.categories || state.userCategories || {}
  );

  // Local UI states
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm); // ✅ Initialize with URL search
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [pageNo, setPageNo] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Local filter states (optional - depends on your backend implementation)
  const [localFilters, setLocalFilters] = useState({
    stockStatus: [],
    priceRange: { min: "", max: "" },
    inStock: false,
    newProduct: false,
    onSale: false,
  });

  // Price range state
  const [priceRange, setPriceRange] = useState([0, 2000]);

  // ✅ Sync searchTerm with URL params
  useEffect(() => {
    const urlSearchTerm = searchParams.get("search") || "";
    if (urlSearchTerm !== searchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

  // ✅ Update URL when search term changes
  const updateSearchInURL = (newSearchTerm) => {
    const newParams = new URLSearchParams(searchParams);
    if (newSearchTerm.trim()) {
      newParams.set("search", newSearchTerm.trim());
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories(dispatch);
  }, [dispatch]);

  // Debounced search function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Debounced search update
  const debouncedSearchUpdate = useCallback(
    debounce((newSearchTerm) => {
      updateSearchInURL(newSearchTerm);
    }, 500),
    [searchParams]
  );

  // Fetch products function
  const fetchProducts = useCallback(async () => {
    try {
      console.log("Fetching products with filters:", {
        search: searchTerm,
        category: selectedCategory,
        page: pageNo,
      });

      await getProducts(dispatch, {
        page: pageNo,
        limit: itemsPerPage,
        search: searchTerm, // This will now include the search from URL
        category: selectedCategory,
        status: localFilters.stockStatus.join(","),
        sortBy: sortBy,
        sortOrder,
        minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
        maxPrice: priceRange[1] < 2000 ? priceRange[1] : undefined,
      });
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }, [
    dispatch,
    pageNo,
    itemsPerPage,
    searchTerm, // Include searchTerm in dependencies
    selectedCategory,
    localFilters,
    sortBy,
    sortOrder,
    priceRange,
  ]);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Reset page when search term changes
  useEffect(() => {
    if (searchTerm !== initialSearchTerm) {
      setPageNo(1);
    }
  }, [searchTerm]);

  const handleClearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 2000]);
    setSortBy("createdAt");
    setSortOrder("desc");
    setPageNo(1);
    setSearchTerm(""); // Clear search term
    setLocalFilters({
      stockStatus: [],
      priceRange: { min: "", max: "" },
      inStock: false,
      newProduct: false,
      onSale: false,
    });

    // Clear search from URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPageNo(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Search input handler (for the search bar on products page)
  const handleSearchInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearchUpdate(newSearchTerm);
  };

  // Client-side search filtering (if you want additional filtering on top of backend)
  const filteredProducts = products;
  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Home Textile Products
              <br />
              <span className="text-[#D2C1B6]">(ONLINE SALE)</span>
            </h1>

            <div className="max-w-4xl mx-auto mb-6">
              <p className="lg:text-xl text-[#D2C1B6]/90 leading-relaxed">
                <strong>Specializing in:</strong> Door Mats (Cotton, Jute,
                Anti-Slip Rubberised, TPR Rubber Backed, Colourful, Reversible,
                Latexed, Hot Melt Latexed, Designer, PVC) • Bath Mats (Cotton,
                Hotel, Hospitality Bath Rugs, Colourful, Designer, Chenille,
                Reversible) • Pooja Asan Mats • Janamaj • Chenille Floor Carpets
                • Light Weight Carpets • Yoga Mats • Blankets • PVC Rolls •
                Microfiber Cleaning Cloth • etc
              </p>
            </div>
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
                {
                  categories.find((c) => (c._id || c.id) === selectedCategory)
                    ?.name
                }
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
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              localFilters={localFilters}
              setLocalFilters={setLocalFilters}
              onClearFilters={handleClearFilters}
              isMobile={false}
            />
          </div>

          {/* Mobile Sidebar */}
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            localFilters={localFilters}
            setLocalFilters={setLocalFilters}
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
                      {isFetching
                        ? "Loading..."
                        : `${filteredProducts.length} Products`}
                    </span>
                  </div>
                  {stats.totalProducts && (
                    <div className="text-gray-600 text-sm">
                      Total: {stats.totalProducts}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Items per page */}
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(parseInt(e.target.value));
                      setPageNo(1);
                    }}
                    className="border border-[#D2C1B6] rounded-lg px-3 py-1 text-sm"
                  >
                    <option value={5}>5 per page</option>
                    <option value={12}>12 per page</option>
                    <option value={24}>24 per page</option>
                    <option value={48}>48 per page</option>
                  </select>

                  {/* View Toggle */}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isFetching && (
              <div className="flex items-center justify-center py-16">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-[#456882]" />
                  <span className="text-[#456882] font-medium">
                    Loading products...
                  </span>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B3C53] mb-3">
                    Something went wrong
                  </h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button
                    onClick={() => fetchProducts()}
                    className="bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* No Products Found */}
            {!isFetching && !error && filteredProducts.length === 0 && (
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
            )}

            {/* Products Grid/List */}
            {!isFetching && !error && filteredProducts.length > 0 && (
              <>
                <div
                  className={`${
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-6"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(pageNo - 1)}
                      disabled={!pagination.hasPrevPage}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        pagination.hasPrevPage
                          ? "bg-white border border-[#456882] text-[#456882] hover:bg-[#456882] hover:text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        const pageNum = Math.max(1, pageNo - 2) + i;
                        if (pageNum > pagination.totalPages) return null;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                              pageNum === pageNo
                                ? "bg-[#456882] text-white"
                                : "bg-white border border-[#D2C1B6] text-[#1B3C53] hover:bg-[#F9F3EF]"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                    )}

                    <button
                      onClick={() => handlePageChange(pageNo + 1)}
                      disabled={!pagination.hasNextPage}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        pagination.hasNextPage
                          ? "bg-white border border-[#456882] text-[#456882] hover:bg-[#456882] hover:text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Page Info */}
                {pagination.totalPages > 1 && (
                  <div className="text-center mt-4 text-sm text-gray-600">
                    Page {pagination.currentPage || pageNo} of{" "}
                    {pagination.totalPages}
                    {pagination.totalProducts && (
                      <span className="ml-2">
                        ({pagination.totalProducts} total products)
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
