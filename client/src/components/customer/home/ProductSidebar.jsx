import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const ProductSidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState(["door-mats"]);

  const productCategories = [
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
        {productCategories.map((category) => (
          <div key={category.id} className="border-b border-gray-100">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex flex-col items-start px-4 py-3 text-left hover:bg-[#F9F3EF] transition-colors"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-[#1B3C53] text-sm">
                  {category.name}
                </span>
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <span className="text-xs text-gray-500">
                {category.productCount} products available
              </span>
            </button>

            {expandedCategories.includes(category.id) && (
              <div className="bg-[#F9F3EF] px-6 py-2">
                <Link
                  to={`/products?category=${category.id}`}
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
