import {
  Award,
  ChevronRight,
  ExternalLink,
  Facebook,
  Factory,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1B3C53] to-[#0F2A3A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Enhanced Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#456882] to-[#D2C1B6] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">B</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  BAGMA OVERSEAS
                </h3>
                <p className="text-[#D2C1B6] text-sm font-medium">Since 2013</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading manufacturer and exporter of premium home textiles. From
              hotels to homes, we deliver quality products with 100,000+ monthly
              production capacity to 15+ countries worldwide.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Factory className="w-4 h-4 text-[#456882]" />
                <span className="text-gray-300">100K+ Monthly</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="w-4 h-4 text-[#456882]" />
                <span className="text-gray-300">15+ Countries</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Award className="w-4 h-4 text-[#456882]" />
                <span className="text-gray-300">Export Quality</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">4.4 Rating</span>
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="group">
                <div className="w-10 h-10 bg-[#456882]/20 hover:bg-[#456882] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Facebook className="w-5 h-5 text-[#456882] group-hover:text-white transition-colors" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-[#456882]/20 hover:bg-[#456882] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Instagram className="w-5 h-5 text-[#456882] group-hover:text-white transition-colors" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-[#456882]/20 hover:bg-[#456882] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Linkedin className="w-5 h-5 text-[#456882] group-hover:text-white transition-colors" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-10 h-10 bg-[#456882]/20 hover:bg-[#456882] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Twitter className="w-5 h-5 text-[#456882] group-hover:text-white transition-colors" />
                </div>
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white flex items-center">
              <div className="w-1 h-6 bg-[#456882] rounded-full mr-3"></div>
              Our Products
            </h4>
            <ul className="space-y-3">
              {[
                {
                  name: "Bath Mats",
                  count: "50+ Varieties",
                  path: "/bath-mats",
                },
                { name: "Door Mats", count: "40+ Designs", path: "/door-mats" },
                {
                  name: "Hotel Bath Rugs",
                  count: "30+ Types",
                  path: "/hotel-rugs",
                },
                {
                  name: "Prayer Mats",
                  count: "25+ Styles",
                  path: "/prayer-mats",
                },
                {
                  name: "Anti-Slip Mats",
                  count: "35+ Options",
                  path: "/anti-slip-mats",
                },
                { name: "Carpets", count: "20+ Varieties", path: "/carpets" },
              ].map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.path}
                    className="group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-300 py-1"
                  >
                    <div className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 text-[#456882] group-hover:translate-x-1 transition-transform" />
                      <span className="group-hover:text-[#D2C1B6]">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#456882] opacity-75">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white flex items-center">
              <div className="w-1 h-6 bg-[#456882] rounded-full mr-3"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "All Products", path: "/products" },
                { name: "Bulk Orders", path: "/bulk-order" },
                { name: "About Us", path: "/about" },
                { name: "Manufacturing", path: "/manufacturing" },
                { name: "Quality Control", path: "/quality" },
                { name: "Contact Us", path: "/contact" },
                { name: "Export Inquiry", path: "/export-inquiry" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-1"
                  >
                    <ChevronRight className="w-4 h-4 text-[#456882] group-hover:translate-x-1 transition-transform mr-2" />
                    <span className="group-hover:text-[#D2C1B6]">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white flex items-center">
              <div className="w-1 h-6 bg-[#456882] rounded-full mr-3"></div>
              Contact Info
            </h4>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-[#456882]/20 rounded-lg flex items-center justify-center mt-1 group-hover:bg-[#456882] transition-colors">
                  <MapPin className="w-5 h-5 text-[#456882] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-white font-medium">Factory Address</p>
                  <p className="text-gray-300 text-sm">
                    Shiv Nagar, Gali No. 4
                  </p>
                  <p className="text-gray-300 text-sm">Near Janta Park</p>
                  <p className="text-gray-300 text-sm">
                    Panipat - 132103, Haryana, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-[#456882]/20 rounded-lg flex items-center justify-center group-hover:bg-[#456882] transition-colors">
                  <Phone className="w-5 h-5 text-[#456882] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-300 text-sm">+91-8178211858</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-[#456882]/20 rounded-lg flex items-center justify-center group-hover:bg-[#456882] transition-colors">
                  <Mail className="w-5 h-5 text-[#456882] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300 text-sm">
                    bagmaoverseas@gmail.com
                  </p>
                </div>
              </div>

              {/* GST */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-[#456882]/20 rounded-lg flex items-center justify-center group-hover:bg-[#456882] transition-colors">
                  <Award className="w-5 h-5 text-[#456882] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-white font-medium">GST Number</p>
                  <p className="text-gray-300 text-sm">06AJVPP1131B1ZG</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Features Section */}
        <div className="border-t border-[#456882]/30 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Quality Assurance */}
            <div className="bg-[#456882]/10 rounded-xl p-6 border border-[#456882]/20 hover:border-[#456882]/40 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-8 h-8 text-[#456882]" />
                <h5 className="text-lg font-bold text-white">
                  Quality Assurance
                </h5>
              </div>
              <p className="text-gray-300 text-sm">
                Eco-friendly, formaldehyde-free products with strict quality
                control and REACH compliance standards.
              </p>
            </div>

            {/* Manufacturing */}
            <div className="bg-[#456882]/10 rounded-xl p-6 border border-[#456882]/20 hover:border-[#456882]/40 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <Factory className="w-8 h-8 text-[#456882]" />
                <h5 className="text-lg font-bold text-white">Manufacturing</h5>
              </div>
              <p className="text-gray-300 text-sm">
                State-of-the-art production facility in Panipat with 100,000+
                pieces monthly capacity.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#456882]/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                &copy; {currentYear} BAGMA OVERSEAS. All rights reserved.
              </p>
              <p className="text-[#456882] text-xs mt-1">
                Established in Delhi 2013 • Production Plant in Panipat, Haryana
              </p>
            </div>

            {/* Certifications & Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-[#456882] font-medium">Member of:</span>
                <span className="text-gray-300">TEXPROCIL</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-[#D2C1B6] transition-colors flex items-center"
                >
                  Privacy Policy <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-[#D2C1B6] transition-colors flex items-center"
                >
                  Terms of Service <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
