import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  FileText,
  Package,
  Phone,
  Search,
  Truck,
} from "lucide-react";
import { useState } from "react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Sample orders data
  const [orders] = useState([
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 89750,
      items: [
        {
          name: "Cotton Tufted Bath Mats 50x80",
          quantity: 150,
          price: 450,
          total: 67500,
        },
        {
          name: "Anti-Slip Door Mats TPR",
          quantity: 50,
          price: 445,
          total: 22250,
        },
      ],
      shipping: {
        address: "Textile Mart Pvt Ltd, Mumbai, Maharashtra",
        method: "Road Transport",
        trackingNumber: "TRK789123456",
        estimatedDelivery: "2024-01-22",
        actualDelivery: "2024-01-21",
      },
      payment: {
        method: "30 Days Credit",
        status: "paid",
        dueDate: "2024-02-14",
        paidDate: "2024-02-10",
      },
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-28",
      status: "shipped",
      total: 156800,
      items: [
        {
          name: "Hotel Bath Rugs 60x88 White",
          quantity: 200,
          price: 750,
          total: 150000,
        },
        {
          name: "Microfiber Cleaning Cloth",
          quantity: 100,
          price: 68,
          total: 6800,
        },
      ],
      shipping: {
        address: "Textile Mart Pvt Ltd, Mumbai, Maharashtra",
        method: "Express Delivery",
        trackingNumber: "EXP456789123",
        estimatedDelivery: "2024-02-03",
      },
      payment: {
        method: "Advance Payment",
        status: "paid",
        paidDate: "2024-01-28",
      },
    },
    {
      id: "ORD-2024-003",
      date: "2024-02-05",
      status: "delivered",
      total: 92400,
      items: [
        {
          name: "Kids Colorful Bath Mats Car Design",
          quantity: 120,
          price: 280,
          total: 33600,
        },
        {
          name: "Prayer Mats Traditional",
          quantity: 80,
          price: 735,
          total: 58800,
        },
      ],
      shipping: {
        address: "Textile Mart Pvt Ltd, Mumbai, Maharashtra",
        method: "Road Transport",
        trackingNumber: "TRK456789012",
        estimatedDelivery: "2024-02-15",
        actualDelivery: "2024-02-14",
      },
      payment: {
        method: "30 Days Credit",
        status: "paid",
        dueDate: "2024-03-07",
        paidDate: "2024-03-05",
      },
    },
  ]);

  const getStatusConfig = (status) => {
    const configs = {
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
    };
    return configs[status] || configs.delivered;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesSearch;
  });

  const totalValue = filteredOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Orders</h1>
                <p className="text-[#D2C1B6]">
                  Track your purchases and quotes
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#D2C1B6] text-sm">Total Orders Value</p>
              <p className="text-2xl font-bold">
                ₹{totalValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Actions */}
        <div className="bg-white rounded-xl border border-[#D2C1B6]/30 p-4 md:p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#1B3C53] mb-1">
                All Orders ({orders.length})
              </h2>
              <p className="text-gray-600 text-sm">
                View and manage your order history
              </p>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] w-full"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#456882] text-[#456882] rounded-lg hover:bg-[#456882] hover:text-white transition-colors whitespace-nowrap">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#D2C1B6]/30 p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-[#D2C1B6]/30 overflow-hidden"
                >
                  {/* Order Header */}
                  <div
                    className="p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      setExpandedOrder(isExpanded ? null : order.id)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 md:gap-4 flex-1">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#456882]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <StatusIcon className="w-5 h-5 md:w-6 md:h-6 text-[#456882]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm text-base lg:text-md font-semibold text-[#1B3C53] truncate">
                            {order.id}
                          </h3>
                          <p className="text-gray-600 text-xs md:text-sm">
                            {new Date(order.date).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:gap-4">
                        <div className="text-right">
                          <p className="text-sm md:text-xl font-bold text-[#1B3C53] ">
                            ₹{order.total.toLocaleString()}
                          </p>
                          <p className="text-gray-600 text-xs md:text-sm">
                            {order.items.length} items
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
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg p-3 md:p-4 border border-gray-200"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-[#1B3C53] text-sm md:text-base truncate pr-2">
                                      {item.name}
                                    </h5>
                                    <p className="text-gray-600 text-xs md:text-sm">
                                      Qty: {item.quantity} • ₹{item.price}/pc
                                    </p>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-semibold text-[#1B3C53] text-sm md:text-base">
                                      ₹{item.total.toLocaleString()}
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
                          {order.shipping && (
                            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                              <h5 className="font-medium text-[#1B3C53] mb-3 flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                Shipping
                              </h5>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <span className="text-gray-600">Method:</span>{" "}
                                  {order.shipping.method}
                                </p>
                                {order.shipping.trackingNumber && (
                                  <p>
                                    <span className="text-gray-600">
                                      Tracking:
                                    </span>{" "}
                                    {order.shipping.trackingNumber}
                                  </p>
                                )}
                                <p>
                                  <span className="text-gray-600">
                                    Address:
                                  </span>{" "}
                                  {order.shipping.address}
                                </p>
                                {order.shipping.estimatedDelivery && (
                                  <p>
                                    <span className="text-gray-600">
                                      Est. Delivery:
                                    </span>{" "}
                                    {new Date(
                                      order.shipping.estimatedDelivery
                                    ).toLocaleDateString("en-IN")}
                                  </p>
                                )}
                                {order.shipping.actualDelivery && (
                                  <p>
                                    <span className="text-gray-600">
                                      Delivered:
                                    </span>{" "}
                                    {new Date(
                                      order.shipping.actualDelivery
                                    ).toLocaleDateString("en-IN")}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Payment Info */}
                          {order.payment && (
                            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                              <h5 className="font-medium text-[#1B3C53] mb-3 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Payment
                              </h5>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <span className="text-gray-600">Method:</span>{" "}
                                  {order.payment.method}
                                </p>
                                <p>
                                  <span className="text-gray-600">Status:</span>
                                  <span
                                    className={`ml-2 px-2 py-1 rounded text-xs ${
                                      order.payment.status === "paid"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {order.payment.status}
                                  </span>
                                </p>
                                {order.payment.dueDate && (
                                  <p>
                                    <span className="text-gray-600">
                                      Due Date:
                                    </span>{" "}
                                    {new Date(
                                      order.payment.dueDate
                                    ).toLocaleDateString("en-IN")}
                                  </p>
                                )}
                                {order.payment.paidDate && (
                                  <p>
                                    <span className="text-gray-600">
                                      Paid Date:
                                    </span>{" "}
                                    {new Date(
                                      order.payment.paidDate
                                    ).toLocaleDateString("en-IN")}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Quote Info - Removed */}

                          {/* Actions */}
                          <div className="space-y-2">
                            <button className="w-full flex items-center justify-center gap-2 bg-[#456882] text-white py-2 rounded-lg hover:bg-[#1B3C53] transition-colors">
                              <Download className="w-4 h-4" />
                              Download Invoice
                            </button>
                            {order.shipping?.trackingNumber && (
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

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl border border-[#D2C1B6]/30 p-6">
          <h3 className="text-lg font-semibold text-[#1B3C53] mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 border border-[#D2C1B6] rounded-lg hover:bg-[#F9F3EF] transition-colors">
              <Package className="w-6 h-6 text-[#456882]" />
              <div className="text-left">
                <p className="font-medium text-[#1B3C53]">Reorder Items</p>
                <p className="text-gray-600 text-sm">
                  Order previous items again
                </p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-[#D2C1B6] rounded-lg hover:bg-[#F9F3EF] transition-colors">
              <Phone className="w-6 h-6 text-[#456882]" />
              <div className="text-left">
                <p className="font-medium text-[#1B3C53]">Contact Sales</p>
                <p className="text-gray-600 text-sm">Speak with our team</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
