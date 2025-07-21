import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Eye,
  FileText,
  Package,
  Phone,
  Search,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../services_hooks/customer/orderService";
import {
  clearOrderError,
  setOrderFilters,
} from "../../store/customer/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();

  const {
    orders = [],
    orderStats = {},
    isFetchingOrders = false,
    error = null,
    totalOrders = 0,
    filters = {},
  } = useSelector((state) => state.userOrders || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState(filters.status || "");

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
        label: "Pending",
      },
      processing: {
        color: "bg-blue-100 text-blue-800",
        icon: Package,
        label: "Processing",
      },
      shipped: {
        color: "bg-purple-100 text-purple-800",
        icon: Truck,
        label: "Shipped",
      },
      delivered: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        label: "Delivered",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: X,
        label: "Cancelled",
      },
      refunded: {
        color: "bg-gray-100 text-gray-800",
        icon: AlertCircle,
        label: "Refunded",
      },
    };
    return configs[status] || configs.pending;
  };

  const totalValue = orderStats?.totalSpent || 0;

  // ✅ Initial fetch and on filter change
  useEffect(() => {
    const fetchOrders = async () => {
      await fetchUserOrders(
        {
          status: statusFilter || "",
          search: searchTerm || "",
          sortBy: filters.sortBy || "createdAt",
          sortOrder: filters.sortOrder || "desc",
        },
        dispatch
      );
    };

    fetchOrders();
  }, [dispatch, statusFilter, searchTerm, filters.sortBy, filters.sortOrder]);

  // ✅ Handle status filter
  const handleStatusFilter = (status) => {
    const newStatus = status === statusFilter ? "" : status;
    setStatusFilter(newStatus);
    setSearchTerm(""); // Reset search
    dispatch(setOrderFilters({ status: newStatus }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearError = () => {
    dispatch(clearOrderError());
  };

  // ✅ Loading state
  if (isFetchingOrders && !orders?.length) {
    return (
      <div className="min-h-screen bg-[#F9F3EF] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#456882] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F3EF] flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-red-200">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            Error Loading Orders
          </h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={handleClearError}
            className="w-full bg-[#456882] text-white py-2 rounded-lg hover:bg-[#1B3C53] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white py-8">
        <div className="container mx-auto px-4 flex justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-[#D2C1B6]">Track your purchases and quotes</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#D2C1B6]">Total Orders Value</p>
            <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#D2C1B6]/30 p-4 md:p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#1B3C53] mb-1">
                All Orders ({totalOrders || 0})
              </h2>
              <p className="text-gray-600 text-sm">
                View and manage your order history
              </p>
            </div>

            {/* Status Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusFilter("")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === ""
                    ? "bg-[#456882] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All ({orderStats?.total || 0})
              </button>
              {[
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
                "refunded",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? "bg-[#456882] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)} (
                  {orderStats?.[status] || 0})
                </button>
              ))}
            </div>

            {/* Search   */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders or items..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Spinner in place */}
        {isFetchingOrders && orders?.length > 0 && (
          <div className="flex justify-center py-4">
            <div className="w-5 h-5 border-2 border-[#456882] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {orders?.length === 0 && !isFetchingOrders ? (
            <div className="bg-white rounded-xl border border-[#D2C1B6]/30 p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't placed any orders yet"}
              </p>
            </div>
          ) : (
            orders?.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              const isExpanded = expandedOrder === order._id;

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-[#D2C1B6]/30 overflow-hidden"
                >
                  {/* Order Header */}
                  <div
                    className="p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      setExpandedOrder(isExpanded ? null : order._id)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 md:gap-4 flex-1">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#456882]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <StatusIcon className="w-5 h-5 md:w-6 md:h-6 text-[#456882]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm text-base lg:text-md font-semibold text-[#1B3C53] truncate">
                            {order.orderNumber}
                          </h3>
                          <p className="text-gray-600 text-xs md:text-sm">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:gap-4">
                        <div className="text-right">
                          <p className="text-sm md:text-xl font-bold text-[#1B3C53]">
                            ₹{order.totalAmount?.toLocaleString()}
                          </p>
                          <p className="text-gray-600 text-xs md:text-sm">
                            {order.items?.length || 0} items
                          </p>
                        </div>
                        <div
                          className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${statusConfig.color}`}
                        >
                          <span className="hidden sm:inline">
                            {statusConfig.label}
                          </span>
                          <span className="sm:hidden">
                            {statusConfig.label.slice(0, 4)}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 p-4 md:p-6 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Items */}
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold text-[#1B3C53] mb-4">
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.items?.map((item, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg p-3 md:p-4 border border-gray-200"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-[#1B3C53] text-sm md:text-base truncate pr-2">
                                      {item.name ||
                                        item.product?.name ||
                                        "Product Name"}
                                    </h5>
                                    <p className="text-gray-600 text-xs md:text-sm">
                                      Qty: {item.quantity} • ₹{item.price}/pc
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-semibold text-[#1B3C53] text-sm md:text-base">
                                      ₹{item.totalPrice?.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Details */}
                        <div>
                          <h4 className="font-semibold text-[#1B3C53] mb-4">
                            Order Details
                          </h4>

                          {/* Shipping Info */}
                          {order.shippingAddress && (
                            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                              <h5 className="font-medium text-[#1B3C53] mb-3 flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                Shipping Address
                              </h5>
                              <div className="space-y-1 text-sm">
                                <p className="font-medium">
                                  {order.shippingAddress.nameOrCompany}
                                </p>
                                <p>{order.shippingAddress.fullAddress}</p>
                                <p>
                                  {order.shippingAddress.city},{" "}
                                  {order.shippingAddress.state}{" "}
                                  {order.shippingAddress.zipCode}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                              </div>
                              {order.trackingNumber && (
                                <div className="mt-3 pt-2 border-t border-gray-200">
                                  <p className="text-xs text-gray-600">
                                    Tracking Number:
                                  </p>
                                  <p className="font-medium text-sm">
                                    {order.trackingNumber}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Payment Info */}
                          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                            <h5 className="font-medium text-[#1B3C53] mb-3 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Payment
                            </h5>
                            <div className="space-y-2 text-sm">
                              <p>
                                <span className="text-gray-600">Method:</span>{" "}
                                {order.paymentInfo?.method === "manual"
                                  ? "Bank Transfer"
                                  : order.paymentInfo?.method || "Manual"}
                              </p>
                              <p>
                                <span className="text-gray-600">Status:</span>
                                <span
                                  className={`ml-2 px-2 py-1 rounded text-xs ${
                                    order.paymentInfo?.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : order.paymentInfo?.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {order.paymentInfo?.status || "pending"}
                                </span>
                              </p>
                              {order.paymentInfo?.paymentDate && (
                                <p>
                                  <span className="text-gray-600">
                                    Paid Date:
                                  </span>{" "}
                                  {new Date(
                                    order.paymentInfo.paymentDate
                                  ).toLocaleDateString("en-IN")}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                            <h5 className="font-medium text-[#1B3C53] mb-3">
                              Order Summary
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal:</span>
                                <span>₹{order.subtotal?.toLocaleString()}</span>
                              </div>
                              {order.taxAmount > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Tax:</span>
                                  <span>
                                    ₹{order.taxAmount?.toLocaleString()}
                                  </span>
                                </div>
                              )}
                              {order.shippingCost > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Shipping:
                                  </span>
                                  <span>
                                    ₹{order.shippingCost?.toLocaleString()}
                                  </span>
                                </div>
                              )}
                              {order.discountAmount > 0 && (
                                <div className="flex justify-between text-green-600">
                                  <span>Discount:</span>
                                  <span>
                                    -₹{order.discountAmount?.toLocaleString()}
                                  </span>
                                </div>
                              )}
                              <hr className="my-2" />
                              <div className="flex justify-between font-semibold">
                                <span>Total:</span>
                                <span>
                                  ₹{order.totalAmount?.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-2">
                            {order.invoiceNumber && (
                              <button className="w-full flex items-center justify-center gap-2 bg-[#456882] text-white py-2 rounded-lg hover:bg-[#1B3C53] transition-colors">
                                <Download className="w-4 h-4" />
                                Download Invoice
                              </button>
                            )}
                            {order.trackingNumber && (
                              <button className="w-full flex items-center justify-center gap-2 border border-[#456882] text-[#456882] py-2 rounded-lg hover:bg-[#456882] hover:text-white transition-colors">
                                <Eye className="w-4 h-4" />
                                Track Order
                              </button>
                            )}
                            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                              <Phone className="w-4 h-4" />
                              Contact Support
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        {/* Existing map over orders + expansion logic remains here */}
        {/* See previous response for the card details (you already had the map logic written well) */}
      </div>
    </div>
  );
};

export default Orders;
