import {
  Building,
  CreditCard,
  Edit,
  FileText,
  Heart,
  Package,
  Save,
  Shield,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Sample user data
  const [userProfile, setUserProfile] = useState({
    // Personal Info
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh.kumar@textilemart.com",
    phone: "+91 98765 43210",

    // Business Info
    companyName: "Textile Mart Pvt Ltd",
    businessType: "Retailer",
    gstNumber: "27AABCT1234A1ZF",
    industry: "Home Textiles & Hospitality",
    yearEstablished: "2018",
    annualPurchase: "₹50-100 Lakhs",

    // Address
    address: "Plot No. 45, Textile Market",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India",
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile updated:", userProfile);
  };

  const handleInputChange = (field, value) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "business", label: "Business Details", icon: Building },
    { id: "security", label: "Security", icon: Shield },
  ];

  const stats = [
    {
      label: "Total Orders",
      value: "47",
      icon: Package,
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "This Year Purchase",
      value: "₹12.5L",
      icon: CreditCard,
      color: "bg-green-100 text-green-800",
    },
    {
      label: "Saved Products",
      value: "23",
      icon: Heart,
      color: "bg-red-100 text-red-800",
    },
    {
      label: "Active Quotes",
      value: "5",
      icon: FileText,
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-[#D2C1B6]">{userProfile.companyName}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
            >
              {isEditing ? (
                <X className="w-4 h-4" />
              ) : (
                <Edit className="w-4 h-4" />
              )}
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-[#D2C1B6]/30"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1B3C53]">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-[#D2C1B6]/30 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-[#456882] text-white"
                          : "text-[#1B3C53] hover:bg-[#F9F3EF]"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-[#D2C1B6]/30 p-8">
              {/* Personal Info Tab */}
              {activeTab === "personal" && (
                <div>
                  <h3 className="text-2xl font-bold text-[#1B3C53] mb-6">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-[#1B3C53] mt-8 mb-4">
                    Address
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={userProfile.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={userProfile.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={userProfile.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={userProfile.pincode}
                        onChange={(e) =>
                          handleInputChange("pincode", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={userProfile.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Business Info Tab */}
              {activeTab === "business" && (
                <div>
                  <h3 className="text-2xl font-bold text-[#1B3C53] mb-6">
                    Business Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type
                      </label>
                      <select
                        value={userProfile.businessType}
                        onChange={(e) =>
                          handleInputChange("businessType", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      >
                        <option value="Retailer">Retailer</option>
                        <option value="Wholesaler">Wholesaler</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Hotel/Hospitality">
                          Hotel/Hospitality
                        </option>
                        <option value="Interior Designer">
                          Interior Designer
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GST Number
                      </label>
                      <input
                        type="text"
                        value={userProfile.gstNumber}
                        onChange={(e) =>
                          handleInputChange("gstNumber", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                      </label>
                      <input
                        type="text"
                        value={userProfile.industry}
                        onChange={(e) =>
                          handleInputChange("industry", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Established
                      </label>
                      <input
                        type="text"
                        value={userProfile.yearEstablished}
                        onChange={(e) =>
                          handleInputChange("yearEstablished", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Purchase Volume
                      </label>
                      <select
                        value={userProfile.annualPurchase}
                        onChange={(e) =>
                          handleInputChange("annualPurchase", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      >
                        <option value="₹10-25 Lakhs">₹10-25 Lakhs</option>
                        <option value="₹25-50 Lakhs">₹25-50 Lakhs</option>
                        <option value="₹50-100 Lakhs">₹50-100 Lakhs</option>
                        <option value="₹1-5 Crores">₹1-5 Crores</option>
                        <option value="₹5+ Crores">₹5+ Crores</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h3 className="text-2xl font-bold text-[#1B3C53] mb-6">
                    Security Settings
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-[#F9F3EF] rounded-lg p-6">
                      <h4 className="font-semibold text-[#1B3C53] mb-3">
                        Password
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Last changed 2 months ago
                      </p>
                      <button className="bg-[#456882] text-white px-4 py-2 rounded-lg hover:bg-[#1B3C53] transition-colors">
                        Change Password
                      </button>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-semibold text-red-800 mb-3">
                        Danger Zone
                      </h4>
                      <p className="text-red-600 text-sm mb-4">
                        Permanently delete your account and all data
                      </p>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              {isEditing && (
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-[#456882] to-[#1B3C53] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
