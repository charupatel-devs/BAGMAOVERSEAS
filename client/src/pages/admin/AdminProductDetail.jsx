import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import { getProductById } from "../../services_hooks/admin/adminProductService";

const AdminProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { currentProduct, currentCategory, isFetching, error, errMsg } =
    useSelector((state) => state.products);

  console.log("Product Detail Rendered", currentProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await getProductById(dispatch, id);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProduct();
  }, [id, dispatch]);

  if (isFetching) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <span>Loading product details...</span>
        </div>
      </AdminLayout>
    );
  }

  if (!currentProduct) {
    return (
      <AdminLayout>
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">Product not found</h2>
          <NavLink
            to="/admin/products"
            className="text-blue-600 mt-4 inline-block"
          >
            ← Back to products
          </NavLink>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <NavLink
          to="/admin/products"
          className="text-blue-600 mb-4 inline-block"
        >
          ← Back to products
        </NavLink>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentProduct.name}
            </h1>
          </div>
          <NavLink
            to={`/admin/products/edit/${currentProduct.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Product
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-900">{currentProduct.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-gray-900">
                  {currentCategory?.name || currentProduct.category?.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-gray-900">₹{currentProduct.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Original Price</p>
                  <p className="text-gray-900">
                    ₹{currentProduct.originalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Inventory
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Stock Quantity</p>
                <p className="text-gray-900">{currentProduct.stock}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Min Order</p>
                  <p className="text-gray-900">
                    {currentProduct.minOrderQuantity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Max Order</p>
                  <p className="text-gray-900">
                    {currentProduct.maxOrderQuantity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {currentProduct.specifications &&
          Object.keys(currentProduct.specifications).length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Specifications
              </h2>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {Object.entries(currentProduct.specifications)
                      .filter(
                        ([_, value]) =>
                          value !== "" && value !== null && value !== undefined
                      )
                      .map(([key, value]) => (
                        <tr key={key}>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700 capitalize">
                            {key.replace(/_/g, " ")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </AdminLayout>
  );
};

export default AdminProductDetail;
