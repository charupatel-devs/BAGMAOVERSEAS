import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../services_hooks/customer/orderService";
import {
  addUserAddress,
  getUserAddresses,
  updateUserAddress,
} from "../../services_hooks/customer/userAuthApi";

const AddressSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const addresses = useSelector((state) => state.userAuth?.addresses ?? []);
  const defaultAddress = addresses.find((a) => a.isDefault);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showAddressList, setShowAddressList] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [newAddress, setNewAddress] = useState({
    nameOrCompany: "",
    fullAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",

    isDefault: false,
  });

  const orderSummary = location.state?.orderSummary || { totalAmount: 0 };

  useEffect(() => {
    getUserAddresses(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(defaultAddress || addresses[0]);
    }
  }, [addresses]);

  const handleAddressInputChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      if (editingAddressId) {
        await updateUserAddress(dispatch, editingAddressId, newAddress);
      } else {
        await addUserAddress(dispatch, newAddress);
      }

      setNewAddress({
        nameOrCompany: "",
        fullAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",
        isDefault: false,
      });

      setEditingAddressId(null);
      setShowAddressForm(false);
      getUserAddresses(dispatch);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = () => {
    setShowConfirmModal(true);
  };

  const confirmOrder = async () => {
    setShowConfirmModal(false);
    const payload = {
      shippingAddress: selectedAddress,
      useCartItems: true,
    };

    const result = await createOrder(dispatch, payload);

    if (result.success) {
      // Pass order data through navigation state
      navigate("/order-success", {
        state: {
          message: "Order placed successfully",
          order: result.order,
          orderNumber: result.order.orderNumber,
          totalAmount: result.order.totalAmount,
        },
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-[#F9F3EF] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#1B3C53]">
        Shipping Address
      </h2>

      {/* Selected Default Address */}
      {selectedAddress && !showAddressList && (
        <div className="bg-white p-4 rounded-lg border border-[#D2C1B6] shadow-sm">
          <h3 className="text-lg font-semibold text-[#1B3C53] mb-2">
            Deliver to:
          </h3>
          <div className="text-gray-800 text-sm space-y-1">
            <div className="font-semibold">
              {" "}
              <span className="font-medium text-[#1B3C53]">
                Name/Company name:
              </span>{" "}
              {selectedAddress.nameOrCompany}
            </div>
            <div>
              <span className="font-medium text-[#1B3C53]">Full Address:</span>{" "}
              {selectedAddress.fullAddress}
            </div>
            <div>
              <span className="font-medium text-[#1B3C53]">City:</span>{" "}
              {selectedAddress.city}
            </div>
            <div>
              <span className="font-medium text-[#1B3C53]">State:</span>{" "}
              {selectedAddress.state}
            </div>
            <div>
              <span className="font-medium text-[#1B3C53]">Pin Code:</span>{" "}
              {selectedAddress.zipCode}
            </div>
            <div>
              <span className="font-medium text-[#1B3C53]">Country:</span>{" "}
              {selectedAddress.country}
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => setShowAddressList(true)}
              className="px-4 py-2 bg-[#456882] text-white rounded hover:bg-[#3a5a6b]"
            >
              Change Address
            </button>
            <button
              onClick={() => {
                setShowAddressForm(true);
                setEditingAddressId(null);
              }}
              className="px-4 py-2 border border-[#456882] text-[#456882] rounded hover:bg-[#f3ede8]"
            >
              Add New Address
            </button>
          </div>
        </div>
      )}

      {/* List of Saved Addresses */}
      {showAddressList && (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-4 rounded-lg border-2 ${
                selectedAddress?._id === addr._id
                  ? "border-[#456882] bg-white"
                  : "border-gray-300 bg-white"
              }`}
            >
              <label className="flex items-start gap-4 cursor-pointer w-full">
                <input
                  type="radio"
                  name="selectedAddress"
                  value={addr._id}
                  checked={selectedAddress?._id === addr._id}
                  onChange={() => setSelectedAddress(addr)}
                  className="mt-1 accent-[#456882]"
                />
                <div className="text-gray-800 text-sm space-y-1">
                  <div className="font-semibold">
                    {" "}
                    <span className="font-medium text-[#1B3C53]">
                      Name/Company name:
                    </span>{" "}
                    {addr.nameOrCompany}
                  </div>
                  <div>
                    <span className="font-medium text-[#1B3C53]">
                      Full Address:
                    </span>{" "}
                    {addr.fullAddress}
                  </div>
                  <div>
                    <span className="font-medium text-[#1B3C53]">City:</span>{" "}
                    {addr.city}
                  </div>
                  <div>
                    <span className="font-medium text-[#1B3C53]">State:</span>{" "}
                    {addr.state}
                  </div>
                  <div>
                    <span className="font-medium text-[#1B3C53]">
                      Pin Code:
                    </span>{" "}
                    {addr.zipCode}
                  </div>
                  <div>
                    <span className="font-medium text-[#1B3C53]">Country:</span>{" "}
                    {addr.country}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNewAddress({ ...addr });
                    setEditingAddressId(addr._id);
                    setShowAddressForm(true);
                    setShowAddressList(false);
                  }}
                  className="text-sm text-[#1B3C53] underline"
                >
                  Edit
                </button>
              </label>
            </div>
          ))}
          <button
            onClick={() => setShowAddressList(false)}
            className="mt-4 text-sm text-[#1B3C53] underline"
          >
            Done Selecting
          </button>
        </div>
      )}

      {/* Address Form (Add or Edit) */}
      {showAddressForm && (
        <form
          onSubmit={handleSaveAddress}
          className="mt-10 bg-white border rounded-lg p-6 shadow-sm space-y-4"
        >
          <h3 className="text-lg font-semibold text-[#1B3C53]">
            {editingAddressId ? "Edit Address" : "Add New Address"}
          </h3>

          <input
            className="w-full border px-3 py-2 rounded-md bg-[#F9F3EF] focus:outline-none focus:ring-2 focus:ring-[#456882]"
            placeholder="Name or Company"
            value={newAddress.nameOrCompany}
            onChange={(e) =>
              handleAddressInputChange("nameOrCompany", e.target.value)
            }
            required
          />
          <input
            className="w-full border px-3 py-2 rounded-md bg-[#F9F3EF] focus:outline-none focus:ring-2 focus:ring-[#456882]"
            placeholder="Full Address"
            value={newAddress.fullAddress}
            onChange={(e) =>
              handleAddressInputChange("fullAddress", e.target.value)
            }
            required
          />
          <div className="flex gap-4">
            <input
              className="flex-1 border px-3 py-2 rounded-md bg-[#F9F3EF] focus:outline-none focus:ring-2 focus:ring-[#456882]"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) => handleAddressInputChange("city", e.target.value)}
              required
            />
            <input
              className="flex-1 border px-3 py-2 rounded-md bg-[#F9F3EF] focus:outline-none focus:ring-2 focus:ring-[#456882]"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) =>
                handleAddressInputChange("state", e.target.value)
              }
              required
            />
          </div>
          <div className="flex gap-4">
            <input
              className="flex-1 border px-3 py-2 rounded-md bg-[#F9F3EF] focus:outline-none focus:ring-2 focus:ring-[#456882]"
              placeholder="Pin Code"
              value={newAddress.zipCode}
              onChange={(e) =>
                handleAddressInputChange("zipCode", e.target.value)
              }
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                setShowAddressForm(false);
                setEditingAddressId(null);
              }}
              className="text-sm text-[#1B3C53] underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1B3C53] text-white px-4 py-2 rounded hover:bg-[#2a4f6b]"
            >
              {editingAddressId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      )}

      {/* Order Summary */}
      <div className="mt-10 border-t pt-6 text-[#1B3C53]">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>₹{orderSummary.totalAmount}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={!selectedAddress}
          className={`mt-6 w-full py-3 rounded-md text-white font-semibold transition ${
            selectedAddress
              ? "bg-[#456882] hover:bg-[#3a5a6b]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Confirm Order
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h3 className="text-xl font-semibold text-[#1B3C53] mb-4">
              Confirm Order?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to place this order?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className="px-4 py-2 bg-[#456882] text-white rounded hover:bg-[#3a5a6b]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelection;
