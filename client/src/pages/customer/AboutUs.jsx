import {
  Award,
  Building,
  CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  Factory,
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Target,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1B3C53] via-[#456882] to-[#1B3C53] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-[#D2C1B6] bg-clip-text text-transparent">
              BAGMA OVERSEAS
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-[#D2C1B6] font-light mb-6 md:mb-8">
              Pioneering Excellence in Home Textiles Since 2013
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-8 text-xs md:text-sm">
              <div className="flex items-center">
                <Globe className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-[#D2C1B6]" />
                <span>15+ Export Countries</span>
              </div>
              <div className="flex items-center">
                <Factory className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-[#D2C1B6]" />
                <span>100,000+ Monthly Production</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 text-[#D2C1B6]" />
                <span>Export Quality Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="hover:text-[#456882] cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#456882] font-medium">About Us</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Company Overview */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 mb-8 md:mb-12 border border-[#D2C1B6]/30">
          <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 lg:w-40 md:h-32 lg:h-40 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-3xl md:text-4xl lg:text-6xl">
                  B
                </span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1B3C53]">
                  BAGMA OVERSEAS
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium text-xs md:text-sm">
                    Verified Exporter
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-[#456882] flex-shrink-0" />
                  <span>Shiv Nagar, Panipat, Haryana, India</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                  <Award className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-[#456882] flex-shrink-0" />
                  <span>GST: 06AJVPP1131B1ZG</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                  <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-yellow-500 fill-current flex-shrink-0" />
                  <span>4.4/5 Rating (61+ Reviews)</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm md:text-base">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-[#456882] flex-shrink-0" />
                  <span>12+ Years of Excellence</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium">
                  TEXPROCIL Member
                </span>
                <span className="bg-[#D2C1B6] text-[#1B3C53] px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium">
                  Export Quality
                </span>
                <span className="bg-[#F9F3EF] text-[#456882] px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium border border-[#D2C1B6]">
                  90% Export Business
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base lg:text-lg">
                A government-recognized export firm specializing in premium home
                textiles and hospitality products. From our state-of-the-art
                facility in Panipat, we serve global markets with uncompromising
                quality and innovative designs.
              </p>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 border border-[#D2C1B6]/30">
            <div className="flex items-center mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                <Eye className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#1B3C53]">
                Our Vision
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              To be the global leader in premium home textiles, setting industry
              standards for quality, innovation, and sustainability while
              creating value for customers, employees, and communities
              worldwide.
            </p>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 border border-[#D2C1B6]/30">
            <div className="flex items-center mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                <Target className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#1B3C53]">
                Our Mission
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              To manufacture and export world-class home textiles that combine
              traditional craftsmanship with modern technology, ensuring every
              product meets international quality standards and exceeds customer
              expectations.
            </p>
          </div>
        </div>

        {/* Company Story */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 mb-8 md:mb-12 border border-[#D2C1B6]/30">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1B3C53] mb-4 md:mb-8 text-center">
            Our Journey of Excellence
          </h2>

          <div className="space-y-4 md:space-y-6 text-gray-600 leading-relaxed">
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#456882] rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
              <p className="text-sm md:text-base lg:text-lg">
                <span className="font-bold text-[#1B3C53]">
                  Established in 2013
                </span>{" "}
                in Delhi, BAGMA Overseas began as a visionary enterprise with a
                commitment to transforming the home textiles industry through
                quality and innovation.
              </p>
            </div>

            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#456882] rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
              <p className="text-sm md:text-base lg:text-lg">
                Our production facility in{" "}
                <span className="font-bold text-[#1B3C53]">
                  Panipat, Haryana
                </span>{" "}
                - the textile hub of India - represents our dedication to
                manufacturing excellence. With cutting-edge machinery and
                skilled artisans, we produce over 100,000 pieces monthly.
              </p>
            </div>

            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#456882] rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
              <p className="text-sm md:text-base lg:text-lg">
                Today, we serve{" "}
                <span className="font-bold text-[#1B3C53]">15+ countries</span>{" "}
                including USA, UAE, Australia, UK, and European markets,
                maintaining a 90% export ratio while never compromising on
                quality or sustainability.
              </p>
            </div>

            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#456882] rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
              <p className="text-sm md:text-base lg:text-lg">
                Under the leadership of{" "}
                <span className="font-bold text-[#1B3C53]">
                  Mr. Mukesh Kumar
                </span>
                , we continue to innovate and expand, setting new benchmarks in
                the global home textiles industry.
              </p>
            </div>
          </div>
        </div>

        {/* Key Strengths */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-[#D2C1B6]/30">
          <h2 className="text-3xl font-bold text-[#1B3C53] mb-8 text-center">
            What Sets Us Apart
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8 text-[#456882]" />,
                title: "Quality Assurance",
                description:
                  "Eco-friendly, formaldehyde-free products with strict quality control and REACH compliance",
                highlight: "100% Quality Tested",
              },
              {
                icon: <Globe className="w-8 h-8 text-[#456882]" />,
                title: "Global Reach",
                description:
                  "Serving customers across 15+ countries with reliable shipping and excellent service",
                highlight: "15+ Countries",
              },
              {
                icon: <Factory className="w-8 h-8 text-[#456882]" />,
                title: "Manufacturing Excellence",
                description:
                  "State-of-the-art facility with 100,000+ monthly production capacity",
                highlight: "100K+ Monthly",
              },
              {
                icon: <Truck className="w-8 h-8 text-[#456882]" />,
                title: "Timely Delivery",
                description:
                  "Committed to delivering products within promised timeframes worldwide",
                highlight: "On-Time Delivery",
              },
              {
                icon: <Users className="w-8 h-8 text-[#456882]" />,
                title: "Expert Team",
                description:
                  "Skilled professionals with years of industry expertise and dedication",
                highlight: "Expert Craftsmen",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-[#456882]" />,
                title: "Competitive Pricing",
                description:
                  "Best-in-class pricing without compromising on quality or service",
                highlight: "Best Value",
              },
            ].map((strength, index) => (
              <div
                key={index}
                className="group relative bg-[#F9F3EF] rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-[#D2C1B6]/20 hover:border-[#456882]/40"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    {strength.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1B3C53] group-hover:text-[#456882] transition-colors">
                      {strength.title}
                    </h3>
                    <span className="text-xs text-[#456882] font-medium">
                      {strength.highlight}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {strength.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-[#D2C1B6]/30">
          <h2 className="text-3xl font-bold text-[#1B3C53] mb-8 text-center">
            Leadership Excellence
          </h2>

          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-16 h-16 text-white" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#1B3C53] mb-2">
                Mr. Mukesh Kumar
              </h3>
              <p className="text-[#456882] font-medium mb-4">
                Founder & Managing Director
              </p>
              <p className="text-gray-600 leading-relaxed">
                With over 12 years of industry experience, Mr. Mukesh Kumar has
                transformed BAGMA Overseas from a startup into a leading global
                exporter. His vision for quality, innovation, and customer
                satisfaction continues to drive our success in international
                markets.
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-[#456882]" />
                  <span className="text-sm text-gray-600">Industry Expert</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-[#456882]" />
                  <span className="text-sm text-gray-600">Global Vision</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Memberships */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-[#D2C1B6]/30">
          <h2 className="text-3xl font-bold text-[#1B3C53] mb-8 text-center">
            Certifications & Memberships
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[#F9F3EF] rounded-xl border border-[#D2C1B6]/20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-2">
                TEXPROCIL
              </h3>
              <p className="text-sm text-gray-600">
                The Cotton Textiles Export Promotion Council
              </p>
            </div>

            <div className="text-center p-6 bg-[#F9F3EF] rounded-xl border border-[#D2C1B6]/20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-2">
                ITPO Delhi
              </h3>
              <p className="text-sm text-gray-600">
                India Trade Promotion Organisation
              </p>
            </div>

            <div className="text-center p-6 bg-[#F9F3EF] rounded-xl border border-[#D2C1B6]/20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-2">
                Delhi Chamber
              </h3>
              <p className="text-sm text-gray-600">
                Delhi Chamber of Commerce & Industry
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white rounded-xl md:rounded-2xl p-4 md:p-8 mb-8 md:mb-12 shadow-xl">
          <div className="text-center mb-4 md:mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-[#D2C1B6]">
              Delivering excellence across global markets
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#D2C1B6] mb-1 md:mb-2">
                100K+
              </div>
              <div className="text-xs md:text-sm opacity-90">
                Monthly Production
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#D2C1B6] mb-1 md:mb-2">
                15+
              </div>
              <div className="text-xs md:text-sm opacity-90">
                Export Countries
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#D2C1B6] mb-1 md:mb-2">
                90%
              </div>
              <div className="text-xs md:text-sm opacity-90">
                Export Business
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#D2C1B6] mb-1 md:mb-2">
                4.4★
              </div>
              <div className="text-xs md:text-sm opacity-90">
                Customer Rating
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#D2C1B6]/30">
          <h2 className="text-3xl font-bold text-[#1B3C53] mb-8 text-center">
            Get in Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[#F9F3EF] rounded-xl border border-[#D2C1B6]/20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-2">Call Us</h3>
              <p className="text-[#456882] font-medium">+91-804-580-3379</p>
              <p className="text-sm text-gray-600 mt-1">Available 24/7</p>
            </div>

            <div className="text-center p-6 bg-[#F9F3EF] rounded-xl border border-[#D2C1B6]/20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-2">
                Email Us
              </h3>
              <p className="text-[#456882] font-medium">
                info@bagmaoverseas.com
              </p>
              <p className="text-sm text-gray-600 mt-1">Quick Response</p>
            </div>

            <div className="text-center p-6 bg-[#F9F3EF] rounded-xl border border-[#D2C1B6]/20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#456882] to-[#1B3C53] rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-2">
                Visit Us
              </h3>
              <p className="text-[#456882] font-medium">Shiv Nagar, Panipat</p>
              <p className="text-sm text-gray-600 mt-1">Haryana, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
