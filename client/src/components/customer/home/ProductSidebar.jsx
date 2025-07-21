import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductSidebar = ({ categories, loading }) => {
  const dispatch = useDispatch();

  // Local state to manage expand/collapse
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="w-80 bg-white border-r border-[#D2C1B6] h-full overflow-y-auto">
      <div className="p-4 border-b border-[#D2C1B6]">
        <h2 className="text-lg font-semibold text-[#1B3C53]">Our Products</h2>
      </div>

      <div className="py-2">
        {loading && (
          <div className="text-center py-4 text-gray-500 text-sm">
            Loading categories...
          </div>
        )}

        {!loading && categories.length === 0 && (
          <div className="text-center py-4 text-gray-400 text-sm">
            No categories found
          </div>
        )}

        {!loading &&
          categories.map((category) => (
            <div key={category._id} className="border-b border-gray-100">
              <button
                onClick={() => toggleCategory(category._id)}
                className="w-full flex flex-col items-start px-4 py-3 text-left hover:bg-[#F9F3EF] transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-[#1B3C53] text-sm">
                    {category.name}
                  </span>
                  {expandedCategories.includes(category._id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                {category.productCount !== undefined && (
                  <span className="text-xs text-gray-500">
                    {category.productCount} products available
                  </span>
                )}
              </button>

              {expandedCategories.includes(category._id) && (
                <div className="bg-[#F9F3EF] px-6 py-2">
                  <Link
                    to={`/products?category=${category.slug || category._id}`}
                    className="text-xs text-gray-600 hover:text-[#456882] transition-colors"
                  >
                    View all {category.name.toLowerCase()}
                  </Link>
                </div>
              )}
            </div>
          ))}

        <div className="p-4">
          <Link
            to="/products"
            className="text-[#456882] font-medium hover:text-[#1B3C53] transition-colors flex items-center text-sm"
          >
            +View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
