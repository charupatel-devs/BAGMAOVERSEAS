const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token and send response
const sendTokenResponse = (user, statusCode, res, message = "Success") => {
  const token = generateToken(user._id);
  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      addresses: user.addresses,
      wishlist: user.wishlist,
      isActive: user.isActive,
      authProvider: user.authProvider,
      hasPassword: !!user.password,
      createdAt: user.createdAt,
    },
  });
};

// @desc    Register new user
// @route   POST /api/user/register
// @access  Public
exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword, phone } = req.body;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    return next(new AppError("Please provide all required fields", 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists with this email", 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: "user",
    authProvider: "local", // Explicitly set for local registration
  });

  // Send welcome email
  try {
    await sendEmail({
      email: user.email,
      subject: "Welcome to Electronics Marketplace!",
      message: `Hi ${user.name},\n\nWelcome to our electronics marketplace! Start exploring thousands of electronic components.\n\nBest regards,\nElectronics Marketplace Team`,
      html: `
        <h2>Welcome to Electronics Marketplace!</h2>
        <p>Hi ${user.name},</p>
        <p>Welcome to our electronics marketplace! Start exploring thousands of electronic components.</p>
        <p>Best regards,<br>Electronics Marketplace Team</p>
      `,
    });
  } catch (error) {
    console.log("Welcome email failed to send:", error.message);
  }

  sendTokenResponse(user, 201, res, "User registered successfully");
});

// @desc    Login user
// @route   POST /api/user/login
// @access  Public
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check if user exists and include password for comparison
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Check if account is active
  if (!user.isActive) {
    return next(
      new AppError(
        "Your account has been deactivated. Please contact support.",
        401
      )
    );
  }

  // Check if user registered with Google but trying to login with password
  if (user.authProvider === "google" && !user.password) {
    return next(
      new AppError(
        "This account was created with Google. Please use Google Sign In or set a password first.",
        400
      )
    );
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    // Increment login attempts for local auth users
    if (user.authProvider === "local") {
      await user.incLoginAttempts();
    }
    return next(new AppError("Invalid email or password", 401));
  }

  // Reset login attempts on successful login
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res, "Login successful");
});

// ===== GOOGLE OAUTH HANDLERS =====

// @desc    Handle Google OAuth callback
// @route   GET /api/user/auth/google/callback
// @access  Public (called by Google)
// controllers/authController.js
exports.googleCallback = catchAsync(async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=oauth_failed`
      );
    }

    const user = req.user;
    const token = generateToken(user._id);

    // Set token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false for development
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // lax for development
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to your OAuth success page
    const redirectUrl = `http://localhost:5173/auth/success?token=${token}&provider=google`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.redirect(
      `${process.env.FRONTEND_URL}/login?error=oauth_callback_failed`
    );
  }
});

// @desc    Get Google OAuth URL
// @route   GET /api/user/auth/google/url
// @access  Public
// @desc    Get Google OAuth URL

exports.getGoogleAuthUrl = catchAsync(async (req, res, next) => {
  const authUrl = `${req.protocol}://${req.get("host")}/api/user/auth/google`;

  res.json({
    success: true,
    authUrl,
  });
});

// ===== EXISTING FUNCTIONS =====

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("wishlist", "name price images stock")
    .select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user: {
      ...user.toObject(),
      hasPassword: !!user.password,
      authProvider: user.authProvider,
      hasGoogle: !!user.googleId,
    },
  });
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const { name, phone, avatar } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Update fields if provided
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (avatar) user.avatar = avatar;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      authProvider: user.authProvider,
      hasPassword: !!user.password,
    },
  });
});

// @desc    Change password
// @route   PUT /api/user/change-password
// @access  Private
exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  // Validation
  if (!newPassword || !confirmNewPassword) {
    return next(
      new AppError("Please provide new password and confirmation", 400)
    );
  }

  if (newPassword !== confirmNewPassword) {
    return next(new AppError("New passwords do not match", 400));
  }

  if (newPassword.length < 6) {
    return next(
      new AppError("New password must be at least 6 characters", 400)
    );
  }

  // Get user with password
  const user = await User.findById(req.user._id).select("+password");

  // If user has a password, require current password
  if (user.password) {
    if (!currentPassword) {
      return next(new AppError("Please provide current password", 400));
    }

    // Check current password
    const isCurrentPasswordCorrect =
      await user.comparePassword(currentPassword);
    if (!isCurrentPasswordCorrect) {
      return next(new AppError("Current password is incorrect", 400));
    }
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// @desc    Set password for OAuth users
// @route   POST /api/user/set-password
// @access  Private
exports.setPassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return next(
      new AppError("Please provide both password and confirmation", 400)
    );
  }

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  if (user.password) {
    return next(
      new AppError("Password already set. Use change password instead.", 400)
    );
  }

  await user.setPassword(password);

  res.json({
    success: true,
    message: "Password set successfully",
  });
});

// @desc    Get user authentication methods
// @route   GET /api/user/auth-methods
// @access  Private
exports.getAuthMethods = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const authMethods = {
    hasPassword: !!user.password,
    hasGoogle: !!user.googleId,
    primaryMethod: user.authProvider,
    canSetPassword: !user.password && user.authProvider === "google",
    socialAccounts: user.socialAccounts.map((acc) => ({
      provider: acc.provider,
      email: acc.email,
      connectedAt: acc.connectedAt,
    })),
  };

  res.json({
    success: true,
    data: authMethods,
  });
});

// @desc    Forgot password
// @route   POST /api/user/forgot-password
// @access  Public
exports.forgotPassword = catchAsync(async (req, res, next) => {
  console.log("📧 Email settings check:");
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_PORT:", process.env.SMTP_PORT);
  console.log("SMTP_EMAIL:", process.env.SMTP_EMAIL);
  console.log("SMTP_PASSWORD exists:", !!process.env.SMTP_PASSWORD);

  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide email address", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("No user found with this email address", 404));
  }

  // Check if user is Google-only user without password
  if (user.authProvider === "google" && !user.password) {
    return next(
      new AppError(
        "This account was created with Google. Please use Google Sign In or contact support to set a password.",
        400
      )
    );
  }

  // Generate reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/user/reset-password/${resetToken}`;

  const message = `
    You are receiving this email because you (or someone else) has requested the reset of a password.
    Please click on the following link or paste it into your browser to complete the process:
    
    ${resetUrl}
    
    If you did not request this, please ignore this email and your password will remain unchanged.
  `;

  const htmlMessage = `
    <h2>Password Reset Request</h2>
    <p>You are receiving this email because you (or someone else) has requested the reset of a password.</p>
    <p>Please click on the following link to complete the process:</p>
    <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>If the button doesn't work, copy and paste this link into your browser:</p>
    <p>${resetUrl}</p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    <p>This link will expire in 10 minutes.</p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request - Electronics Marketplace",
      message,
      html: htmlMessage,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Email could not be sent", 500));
  }
});

// @desc    Reset password
// @route   PUT /api/user/reset-password/:token
// @access  Public
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return next(
      new AppError("Please provide password and confirm password", 400)
    );
  }

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired reset token", 400));
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res, "Password reset successful");
});

// @desc    Logout user
// @route   POST /api/user/logout
// @access  Public
exports.logoutUser = catchAsync(async (req, res, next) => {
  // Clear httpOnly cookie if it exists
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// ===== EXISTING USER FUNCTIONS (unchanged) =====

// @desc    Get user orders
// @route   GET /api/user/orders
// @access  Private
exports.getUserOrders = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const orders = await Order.find({ user: req.user._id })
    .populate("items.product", "name price images")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      hasNextPage: page < Math.ceil(totalOrders / limit),
      hasPrevPage: page > 1,
    },
  });
});

// @desc    Add product to wishlist
// @route   POST /api/user/wishlist/add/:productId
// @access  Private
exports.addToWishlist = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  const user = await User.findById(req.user._id);
  // Check if product already in wishlist
  if (user.wishlist.includes(productId)) {
    return next(new AppError("Product already in wishlist", 400));
  }

  user.wishlist.push(productId);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Product added to wishlist successfully",
  });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/user/wishlist/remove/:productId
// @access  Private
exports.removeFromWishlist = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);

  // Check if product in wishlist
  if (!user.wishlist.includes(productId)) {
    return next(new AppError("Product not in wishlist", 400));
  }

  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist successfully",
  });
});

// @desc    Get user wishlist
// @route   GET /api/user/wishlist
// @access  Private
exports.getWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    select: "name price images stock category specifications",
    populate: {
      path: "category",
      select: "name",
    },
  });

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
});

// @desc    Get user addresses
// @route   GET /api/user/addresses
// @access  Private
exports.getUserAddresses = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.json({
    success: true,
    data: user.addresses,
    count: user.addresses.length,
  });
});

// @desc    Add new address
// @route   POST /api/user/addresses
// @access  Private
exports.addUserAddress = catchAsync(async (req, res, next) => {
  const {
    type,
    name,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
  } = req.body;

  // Validation
  if (!name || !phone || !addressLine1 || !city || !state || !postalCode) {
    return next(
      new AppError("Please provide all required address fields", 400)
    );
  }

  // Validate phone number format
  if (!/^[0-9]{10}$/.test(phone)) {
    return next(
      new AppError("Please provide a valid 10-digit phone number", 400)
    );
  }

  // Validate postal code (basic validation)
  if (!/^[0-9]{6}$/.test(postalCode)) {
    return next(
      new AppError("Please provide a valid 6-digit postal code", 400)
    );
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const addressData = {
    type: type || "home",
    name,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country: country || "India",
    isDefault: isDefault || false,
  };

  await user.addAddress(addressData);

  res.status(201).json({
    success: true,
    message: "Address added successfully",
    data: user.addresses,
  });
});

// @desc    Update address
// @route   PUT /api/user/addresses/:addressId
// @access  Private
exports.updateUserAddress = catchAsync(async (req, res, next) => {
  const { addressId } = req.params;
  const {
    type,
    name,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Check if address exists
  const addressExists = user.addresses.id(addressId);
  if (!addressExists) {
    return next(new AppError("Address not found", 404));
  }

  // Validate phone number if provided
  if (phone && !/^[0-9]{10}$/.test(phone)) {
    return next(
      new AppError("Please provide a valid 10-digit phone number", 400)
    );
  }

  // Validate postal code if provided
  if (postalCode && !/^[0-9]{6}$/.test(postalCode)) {
    return next(
      new AppError("Please provide a valid 6-digit postal code", 400)
    );
  }

  const updateData = {};
  if (type) updateData.type = type;
  if (name) updateData.name = name;
  if (phone) updateData.phone = phone;
  if (addressLine1) updateData.addressLine1 = addressLine1;
  if (addressLine2 !== undefined) updateData.addressLine2 = addressLine2;
  if (city) updateData.city = city;
  if (state) updateData.state = state;
  if (postalCode) updateData.postalCode = postalCode;
  if (country) updateData.country = country;
  if (isDefault !== undefined) updateData.isDefault = isDefault;

  await user.updateAddress(addressId, updateData);

  res.json({
    success: true,
    message: "Address updated successfully",
    data: user.addresses,
  });
});

// @desc    Delete address
// @route   DELETE /api/user/addresses/:addressId
// @access  Private
exports.deleteUserAddress = catchAsync(async (req, res, next) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Check if address exists
  const addressExists = user.addresses.id(addressId);
  if (!addressExists) {
    return next(new AppError("Address not found", 404));
  }

  // Prevent deletion if it's the only address (optional business rule)
  if (user.addresses.length === 1) {
    return next(
      new AppError(
        "Cannot delete the only address. Please add another address first.",
        400
      )
    );
  }

  await user.removeAddress(addressId);

  res.json({
    success: true,
    message: "Address deleted successfully",
    data: user.addresses,
  });
});

// @desc    Set default address
// @route   PUT /api/user/addresses/:addressId/default
// @access  Private
exports.setDefaultAddress = catchAsync(async (req, res, next) => {
  const { addressId } = req.params;

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Check if address exists
  const addressExists = user.addresses.id(addressId);
  if (!addressExists) {
    return next(new AppError("Address not found", 404));
  }

  // Set all addresses to not default
  user.addresses.forEach((addr) => {
    addr.isDefault = false;
  });

  // Set the specified address as default
  const targetAddress = user.addresses.id(addressId);
  targetAddress.isDefault = true;

  await user.save();

  res.json({
    success: true,
    message: "Default address updated successfully",
    data: user.addresses,
  });
});

// @desc    Get default address
// @route   GET /api/user/addresses/default
// @access  Private
exports.getDefaultAddress = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const defaultAddress = user.getDefaultAddress();

  if (!defaultAddress) {
    return next(new AppError("No default address found", 404));
  }

  res.json({
    success: true,
    data: defaultAddress,
  });
});
