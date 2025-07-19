import { ShoppingBag } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-[#1B3C53] to-[#456882] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/10 rounded-full"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-white w-full">
        <div className="text-center max-w-sm">
          {/* Logo */}
          <div className="w-24 h-24 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>

          {/* Brand name */}
          <h1 className="text-4xl font-bold mb-4 tracking-wide">
            BAGMA OVERSEAS
          </h1>

          {/* Tagline */}
          <p className="text-xl text-[#D2C1B6] mb-8 font-light">
            Premium Home Textiles Since 2013
          </p>

          {/* Features list */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D2C1B6] rounded-full flex-shrink-0"></div>
              <span className="text-white/90">100K+ Monthly Production</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D2C1B6] rounded-full flex-shrink-0"></div>
              <span className="text-white/90">Export Quality Products</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D2C1B6] rounded-full flex-shrink-0"></div>
              <span className="text-white/90">15+ Countries Worldwide</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D2C1B6] rounded-full flex-shrink-0"></div>
              <span className="text-white/90">Trusted by Global Retailers</span>
            </div>
          </div>

          {/* Bottom quote */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-[#D2C1B6] text-sm italic">
              "Your trusted partner in premium textiles"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
