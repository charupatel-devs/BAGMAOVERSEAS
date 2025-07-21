const mongoose = require("mongoose");

// ✅ Simplified cart item - only store essential data
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Update timestamp on save
cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// ✅ Method to get basic cart data (for cart display)
cartSchema.methods.getBasicCart = async function () {
  await this.populate({
    path: "items.productId",
    select: "name sku price  images stock isActive gst category",
  });

  let subtotal = 0;
  let totalGST = 0;
  let totalItems = 0;

  // ✅ Filter active products and calculate basic totals
  const activeItems = this.items
    .filter((item) => item.productId && item.productId.isActive)
    .map((item) => {
      const product = item.productId;
      const itemSubtotal = product.price * item.quantity;
      const gstAmount = (itemSubtotal * (product.gst || 18)) / 100;

      subtotal += itemSubtotal;
      totalGST += gstAmount;
      totalItems += item.quantity;

      return {
        productId: product._id,
        name: product.name,
        sku: product.sku,
        image:
          product.images && product.images.length > 0
            ? product.images.find((img) => img.isMain)?.url ||
              product.images[0].url
            : "https://via.placeholder.com/300",
        quantity: item.quantity,
        unitPrice: product.price,
        gstRate: product.gst || 18,
        itemSubtotal: Math.round(itemSubtotal * 100) / 100,
        gstAmount: Math.round(gstAmount * 100) / 100,
        itemTotal: Math.round((itemSubtotal + gstAmount) * 100) / 100,
        stock: product.stock,
        addedAt: item.addedAt,
      };
    });

  return {
    items: activeItems,
    itemCount: activeItems.length,
    totalItems,
    subtotal: Math.round(subtotal * 100) / 100,
    gstAmount: Math.round(totalGST * 100) / 100,
    totalAmount: Math.round((subtotal + totalGST) * 100) / 100,
  };
};

// ✅ Method to populate cart with product data and calculate totals (for checkout)
cartSchema.methods.getCartWithTotals = async function () {
  await this.populate({
    path: "items.productId",
    select: "name sku price  images stock isActive gst category",
  });

  let subtotal = 0;
  let totalGST = 0;
  let totalItems = 0;

  // ✅ Filter active products and calculate totals
  const activeItems = this.items
    .filter((item) => item.productId && item.productId.isActive)
    .map((item) => {
      const product = item.productId;
      const itemSubtotal = product.price * item.quantity;
      const gstAmount = (itemSubtotal * (product.gst || 18)) / 100;

      subtotal += itemSubtotal;
      totalGST += gstAmount;
      totalItems += item.quantity;

      return {
        _id: item._id,
        productId: product._id,
        name: product.name,
        sku: product.sku,
        image:
          product.images && product.images.length > 0
            ? product.images.find((img) => img.isMain)?.url ||
              product.images[0].url
            : "https://via.placeholder.com/300",
        quantity: item.quantity,
        unitPrice: product.price,
        gstRate: product.gst || 18,
        itemSubtotal: Math.round(itemSubtotal * 100) / 100,
        gstAmount: Math.round(gstAmount * 100) / 100,
        itemTotal: Math.round((itemSubtotal + gstAmount) * 100) / 100,
        stock: product.stock,
        addedAt: item.addedAt,
      };
    });

  // ✅ Calculate final totals
  const finalSubtotal = Math.round(subtotal * 100) / 100;
  const finalGST = Math.round(totalGST * 100) / 100;
  const finalTotal = Math.round((finalSubtotal + finalGST) * 100) / 100;

  return {
    items: activeItems,
    itemCount: activeItems.length,
    totalItems,
    subtotal: finalSubtotal,
    gstAmount: finalGST,
    totalAmount: finalTotal,
  };
};

// ✅ Clean up inactive products from cart
cartSchema.methods.removeInactiveProducts = async function () {
  const Product = mongoose.model("Product");

  for (let i = this.items.length - 1; i >= 0; i--) {
    const product = await Product.findById(this.items[i].productId);
    if (!product || !product.isActive) {
      this.items.splice(i, 1);
    }
  }

  return this.save();
};

module.exports = mongoose.model("Cart", cartSchema);
