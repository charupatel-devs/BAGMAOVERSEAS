import {
  CheckCircle,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    productInterest: "",
    quantity: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        productInterest: "",
        quantity: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#D2C1B6]">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="hover:text-[#456882] cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#456882] font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B3C53] mb-4">
            Get Your Quote Instantly
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Experience our contactless ordering system! Get instant quotes,
            place bulk orders, and track your shipments online. No phone calls
            needed - our automated system handles everything for you.
          </p>
          <div className="bg-[#F9F3EF] border border-[#D2C1B6] rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-[#456882] font-medium">
              🚀 <strong>Seamless Online Experience:</strong> Browse products →
              Add to cart → Get instant quote → Place order
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Having trouble? Our professionals are here to help you complete
              your order.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Order Section */}
            <div className="bg-gradient-to-r from-[#456882] to-[#1B3C53] rounded-xl p-6 md:p-8 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Quick Order System
              </h2>
              <p className="text-[#D2C1B6] mb-6">
                Skip the paperwork! Use our smart ordering system for instant
                quotes and seamless checkout.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🛍️</div>
                  <h3 className="font-semibold text-sm">Browse Products</h3>
                  <p className="text-xs text-[#D2C1B6]">
                    Select from 200+ items
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">💰</div>
                  <h3 className="font-semibold text-sm">Get Instant Quote</h3>
                  <p className="text-xs text-[#D2C1B6]">Real-time pricing</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">📦</div>
                  <h3 className="font-semibold text-sm">Place Order</h3>
                  <p className="text-xs text-[#D2C1B6]">Secure checkout</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D2C1B6] text-[#1B3C53] px-6 py-3 rounded-lg font-semibold hover:bg-[#F9F3EF] transition-colors flex-1">
                  Start Shopping Now
                </button>
                <button className="border-2 border-[#D2C1B6] text-[#D2C1B6] px-6 py-3 rounded-lg font-semibold hover:bg-[#D2C1B6] hover:text-[#1B3C53] transition-colors flex-1">
                  View Bulk Pricing
                </button>
              </div>
            </div>

            {/* Problem? Contact Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-[#D2C1B6]/30">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-[#F9F3EF] rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#456882]" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1B3C53] mb-2">
                    Having Problems? We're Here to Help!
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Our professionals will assist you with product selection,
                    custom requirements, or any ordering difficulties.
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">
                    Thank you for your inquiry!
                  </h3>
                  <p className="text-gray-600">
                    We'll get back to you within 24 hours with the best quote.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#D2C1B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#D2C1B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#D2C1B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#D2C1B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product of Interest
                      </label>
                      <select
                        name="productInterest"
                        value={formData.productInterest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#D2C1B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent"
                      >
                        <option value="">Select a product</option>
                        <option value="door-mats">Door Mats</option>
                        <option value="bath-mats">Bath Mats</option>
                        <option value="hotel-bath-rugs">Hotel Bath Rugs</option>
                        <option value="tufted-bath-mats">
                          Tufted Bath Mats
                        </option>
                        <option value="anti-slip-mats">Anti-Slip Mats</option>
                        <option value="prayer-mats">Prayer Mats</option>
                        <option value="carpets">Carpets</option>
                        <option value="microfiber-cloth">
                          Microfiber Cleaning Cloth
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity Required
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#D2C1B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent"
                        placeholder="e.g., 100 pieces, 1000 pieces"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-[#D2C1B6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] focus:border-transparent"
                      placeholder="Please describe your requirements, specifications, or any other details..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#456882] hover:bg-[#1B3C53] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Requirement
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#D2C1B6]/30">
              <h3 className="text-lg font-bold text-[#1B3C53] mb-4">
                Professional Support
              </h3>

              <div className="bg-[#F9F3EF] border border-[#D2C1B6] rounded-lg p-4 mb-6">
                <p className="text-sm text-[#456882] font-medium mb-2">
                  📞 <strong>Only if you need assistance:</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Our self-service platform handles 95% of orders automatically.
                  Contact us only if you encounter issues.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#456882] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#1B3C53]">
                      Emergency Support
                    </p>
                    <p className="text-sm text-gray-600">+91-804-580-3379</p>
                    <p className="text-xs text-green-600">
                      73% Call Response Rate
                    </p>
                    <p className="text-xs text-gray-500">
                      Available: Mon-Sat 9AM-6PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#456882] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#1B3C53]">Email Support</p>
                    <p className="text-sm text-gray-600">
                      support@bagmaoverseas.com
                    </p>
                    <p className="text-xs text-gray-500">
                      Response within 4 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-5 h-5 text-[#456882] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#1B3C53]">Live Chat</p>
                    <p className="text-sm text-gray-600">
                      Instant assistance available
                    </p>
                    <button className="text-xs text-[#456882] hover:text-[#1B3C53] mt-1 underline">
                      Start Chat Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#D2C1B6]/30">
              <h3 className="text-lg font-bold text-[#1B3C53] mb-4">
                Additional Information
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="font-medium text-[#1B3C53] mb-2">
                    Manufacturing Unit
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>GangadharPrasad</strong>
                    </p>
                    <p>
                      BAGMA OVERSEAS, Shiv Nagar, Gali No. 4, Near Janta Park,
                      Panipat, Haryana - 132103
                    </p>
                    <p>Panipat - 132103 Haryana, INDIA</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D2C1B6]/30">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Nature of Business
                    </p>
                    <p className="text-sm font-medium text-[#1B3C53]">
                      Manufacturer & Exporter
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Legal Status</p>
                    <p className="text-sm font-medium text-[#1B3C53]">
                      Proprietorship
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Annual Turnover
                    </p>
                    <p className="text-sm font-medium text-[#1B3C53]">
                      Rs. 5-10 Crore
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">GST Number</p>
                    <p className="text-sm font-medium text-[#1B3C53]">
                      06AJVPP1131B1ZG
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Self-Service Benefits */}
            <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">
                Why Choose Self-Service?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#D2C1B6] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1B3C53] text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">24/7 Available</h4>
                    <p className="text-xs text-[#D2C1B6]">
                      Order anytime, anywhere
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#D2C1B6] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1B3C53] text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Instant Pricing</h4>
                    <p className="text-xs text-[#D2C1B6]">
                      Real-time bulk discounts
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#D2C1B6] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1B3C53] text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Order Tracking</h4>
                    <p className="text-xs text-[#D2C1B6]">
                      Real-time status updates
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#D2C1B6] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1B3C53] text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">No Wait Time</h4>
                    <p className="text-xs text-[#D2C1B6]">Skip phone queues</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-[#D2C1B6]/30">
            <h3 className="text-xl font-bold text-[#1B3C53] mb-4">
              Our Location
            </h3>
            <div className="bg-gray-200 rounded-lg h-64 md:h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Interactive Map</p>
                <p className="text-xs">Shiv Nagar, Panipat, Haryana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
