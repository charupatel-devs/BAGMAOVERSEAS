import { ArrowLeft, CheckCircle, Copy, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Get order data from navigation state
  useEffect(() => {
    const state = location.state;
    if (state && state.order) {
      // Map the received order data to the format expected by the component
      const mappedData = {
        orderId: state.order.orderNumber, // Use orderNumber as orderId
        totalAmount: state.order.totalAmount,
        status: state.order.status,
        _id: state.order._id,
        message: state.message,
        // Add other fields if they exist in the order object
        items: state.order.items || [],
        totalItems: state.order.items?.length || 0,
        subtotal: state.order.subtotal || state.order.totalAmount,
        gstAmount: state.order.gstAmount || 0,
        timestamp: new Date().toISOString(),
      };
      setOrderData(mappedData);
    } else {
      // Fallback: Generate a simple order ID if no data passed
      const orderId = `BO${Date.now().toString().slice(-6)}`;
      setOrderData({
        orderId,
        items: [],
        totalAmount: 0,
        totalItems: 0,
        timestamp: new Date().toISOString(),
      });
    }
  }, [location.state]);

  const handleCopyOrderId = () => {
    if (orderData?.orderId) {
      navigator.clipboard.writeText(orderData.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {orderData.message || "Order Placed Successfully!"}
            </h1>
            <p className="text-gray-600 mb-4">
              Thank you for your order. Your details have been shared with the
              seller.
            </p>

            {/* Order ID */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 mb-1">Order Number</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-gray-800">
                  {orderData.orderId}
                </span>
                <button
                  onClick={handleCopyOrderId}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy Order Number"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              {copied && (
                <div className="text-xs text-green-600 mt-1">
                  Order number copied!
                </div>
              )}
            </div>

            {/* Order Status */}
            {orderData.status && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Status:{" "}
                {orderData.status.charAt(0).toUpperCase() +
                  orderData.status.slice(1)}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              {orderData.totalItems > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Total Items</span>
                  <span>{orderData.totalItems}</span>
                </div>
              )}
              {orderData.subtotal &&
                orderData.subtotal !== orderData.totalAmount && (
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{orderData.subtotal?.toLocaleString()}</span>
                  </div>
                )}
              {orderData.gstAmount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>GST</span>
                  <span>₹{orderData.gstAmount?.toLocaleString()}</span>
                </div>
              )}
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total Amount</span>
                <span>₹{orderData.totalAmount?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Payment Instructions
            </h2>
            <div className="space-y-4 text-blue-700">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="font-semibold mb-2">
                  Bank Details(For NEFT/IMPS/RTGS):
                </div>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="font-medium">Account Name:</span> BAGMA
                    OVERSEAS
                  </div>
                  <div>
                    <span className="font-medium">Current A/C No:</span>{" "}
                    510101004343696
                  </div>
                  <div>
                    <span className="font-medium">Bank:</span> UNION BANK OF
                    INDIA
                  </div>
                  <div>
                    <span className="font-medium">IFSC:</span> UBIN0905496
                  </div>
                  <div>
                    <span className="font-medium">Branch:</span> Gujranwala
                    Branch Delhi-9
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="font-semibold mb-2">UPI Payment Details:</div>
                <div className="text-center">
                  <img
                    src="https://res.cloudinary.com/dthnv9dxb/image/upload/v1753080300/Screenshot_2025-07-21_at_12.14.51_PM_ddxbom.png"
                    alt="UPI QR Code"
                    className="w-50 h-auto mx-auto mb-2"
                  />
                  <div className="text-xs text-gray-600">
                    Scan to pay ₹{orderData.totalAmount?.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm mt-2">
                  <div>Google Pay / PhonePe</div>
                  <div className="font-bold text-lg">9810735041</div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Business Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <div>
                  <div className="font-semibold text-gray-800">
                    BAGMA OVERSEAS
                  </div>
                  <div>Shiv Nagar, Gali No. 4,</div>
                  <div>Near Janta Park, Panipat, Haryana</div>
                  <div>Pin Code - 132103</div>
                </div>
                <div>
                  <div>
                    <span className="font-medium">GSTIN:</span> 06AJVPP1131B1ZG
                  </div>
                  <div>
                    <span className="font-medium">Mobile:</span> +91-9810735041
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="font-medium text-gray-800">
                    Contact & Web:
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    bagmaoverseas@gmail.com
                  </div>
                  <div>
                    <span className="font-medium">Website:</span>{" "}
                    www.bagmaoverseas.com
                  </div>
                  <div>
                    <span className="font-medium">IndiaMART:</span>{" "}
                    www.indiamart.com/bagmaoverseas
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <div className="text-green-800 font-semibold text-lg mb-2">
                📞 After Payment, Call Us
              </div>
              <a
                href="tel:+919810735041"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call +91-9810735041
              </a>
              <div className="text-sm text-green-700 mt-3">
                Share your Order Number:{" "}
                <span className="font-bold">{orderData.orderId}</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
