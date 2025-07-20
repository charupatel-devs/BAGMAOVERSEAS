import {
  Edit,
  MapPin,
  Plus,
  Save,
  Shield,
  Star,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAddress,
  deleteUserAddress,
  editUserProfile,
  getUserProfile,
  setDefaultAddress,
  updateUserAddress,
} from "../../services_hooks/customer/userAuthApi";

const Profile = () => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const { user, token, loading } = useSelector((state) => state.userAuth);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
    role: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState(null);

  const [newAddress, setNewAddress] = useState({
    nameOrCompany: "",
    fullAddress: "",

    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  const fetchData = async () => {
    await getUserProfile(dispatch);
  };
  useEffect(() => {
    fetchData();
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        profilePicture: user?.profilePicture || user?.avatar || "",
      });
      setAddresses(user?.addresses || []);
      // Find default address
      const defaultAddr = user?.addresses?.find((addr) => addr.isDefault);
      setDefaultAddressId(defaultAddr?._id || null);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await editUserProfile(dispatch, userProfile);
      setIsEditing(false);
      console.log("Profile updated:", userProfile);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  const handleInputChange = (field, value) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressInputChange = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddAddress = async () => {
    try {
      console.log("Adding new address:", newAddress);

      const response = await addUserAddress(dispatch, newAddress);
      if (response.success) {
        // Refresh user profile to get updated addresses
        await getUserProfile(dispatch);
        setNewAddress({
          nameOrCompany: "",
          fullAddress: "",

          city: "",
          state: "",
          zipCode: "",
          country: "",
          isDefault: false,
        });
        setIsAddingAddress(false);
      }
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  const handleUpdateAddress = async (addressId, updatedData) => {
    try {
      const response = await updateUserAddress(
        dispatch,
        addressId,
        updatedData
      );
      if (response.success) {
        // Refresh user profile to get updated addresses
        await getUserProfile(dispatch);
        setEditingAddressId(null);
      }
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await deleteUserAddress(dispatch, addressId);
      if (response.success) {
        // Refresh user profile to get updated addresses
        await getUserProfile(dispatch);
      }
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      const response = await setDefaultAddress(dispatch, addressId);
      if (response.success) {
        // Refresh user profile to get updated addresses
        await getUserProfile(dispatch);
      }
    } catch (error) {
      console.error("Failed to set default address:", error);
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#F9F3EF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3C53] to-[#456882] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={userProfile.profilePicture}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover bg-white/20"
              />
              <div>
                <h1 className="text-3xl font-bold">
                  {userProfile.name || "My Profile"}
                </h1>
                <p className="text-[#D2C1B6]">{userProfile.email}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-[#D2C1B6]/30 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
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
                      <Icon className="w-5 h-5" />
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
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userProfile.email}
                        disabled
                        className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#456882] disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-[#1B3C53]">
                      My Addresses
                    </h3>
                    <button
                      onClick={() => setIsAddingAddress(true)}
                      className="bg-[#456882] text-white px-4 py-2 rounded-lg hover:bg-[#1B3C53] transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Address
                    </button>
                  </div>

                  {/* Add Address Form */}
                  {isAddingAddress && (
                    <div className="bg-[#F9F3EF] rounded-lg p-6 mb-6">
                      <h4 className="font-semibold text-[#1B3C53] mb-4">
                        Add New Address
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Name/Company Name
                          </label>
                          <input
                            type="text"
                            value={newAddress.nameOrCompany}
                            onChange={(e) =>
                              handleAddressInputChange(
                                "nameOrCompany",
                                e.target.value
                              )
                            }
                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#456882]"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <input
                            type="text"
                            value={newAddress.fullAddress}
                            onChange={(e) =>
                              handleAddressInputChange(
                                "fullAddress",
                                e.target.value
                              )
                            }
                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#456882]"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            City
                          </label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) =>
                              handleAddressInputChange("city", e.target.value)
                            }
                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#456882]"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            State
                          </label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) =>
                              handleAddressInputChange("state", e.target.value)
                            }
                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#456882]"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            PIN Code
                          </label>
                          <input
                            type="text"
                            value={newAddress.zipCode}
                            onChange={(e) =>
                              handleAddressInputChange(
                                "zipCode",
                                e.target.value
                              )
                            }
                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#456882]"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <input
                            type="text"
                            value={newAddress.country}
                            onChange={(e) =>
                              handleAddressInputChange(
                                "country",
                                e.target.value
                              )
                            }
                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#456882]"
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={newAddress.isDefault}
                          onChange={(e) =>
                            handleAddressInputChange(
                              "isDefault",
                              e.target.checked
                            )
                          }
                          className="w-4 h-4 text-[#456882] border-gray-300 rounded focus:ring-[#456882]"
                        />
                        <label
                          htmlFor="isDefault"
                          className="text-sm text-gray-700"
                        >
                          Set as default address
                        </label>
                      </div>

                      <div className="mt-6 flex gap-4">
                        <button
                          onClick={() => setIsAddingAddress(false)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddAddress}
                          className="px-4 py-2 bg-[#456882] text-white rounded-lg hover:bg-[#1B3C53] transition-colors"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Address List */}
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address._id}
                        className="border border-gray-200 rounded-lg p-6 relative"
                      >
                        {address.isDefault && (
                          <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Default
                          </div>
                        )}

                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-semibold text-[#1B3C53] capitalize mb-2">
                              Address
                            </h5>
                            <p className="text-gray-600 font-medium">
                              {address.nameOrCompany}
                            </p>
                            {address.fullAddress && (
                              <p className="text-gray-600">
                                {address.fullAddress}
                              </p>
                            )}

                            <p className="text-gray-600">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p className="text-gray-600">{address.country}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            {!address.isDefault && (
                              <button
                                onClick={() =>
                                  handleSetDefaultAddress(address._id)
                                }
                                className="text-gray-400 hover:text-yellow-600 transition-colors"
                                title="Set as default"
                              >
                                <Star className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => setEditingAddressId(address._id)}
                              className="text-gray-400 hover:text-[#456882] transition-colors"
                              title="Edit address"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address._id)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete address"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {addresses.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>
                          No addresses found. Add your first address to get
                          started.
                        </p>
                      </div>
                    )}
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
              {isEditing && activeTab === "personal" && (
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
