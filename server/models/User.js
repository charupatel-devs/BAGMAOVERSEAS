const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["home", "office", "other"],
    default: "home",
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: "India",
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: function () {
        // Password only required for local authentication
        return !this.googleId && !this.facebookId;
      },
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in queries by default
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/electronics-marketplace/image/upload/v1/defaults/avatar_default.png",
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
    addresses: [addressSchema],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,

    // ===== OAUTH FIELDS =====
    googleId: {
      type: String,
      sparse: true, // Allows multiple null values
    },
    facebookId: {
      type: String,
      sparse: true,
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },
    providerId: String, // Store the provider's user ID
    profilePicture: String, // Social media profile picture

    // Social login metadata
    socialAccounts: [
      {
        provider: {
          type: String,
          enum: ["google", "facebook", "twitter"],
        },
        providerId: String,
        email: String,
        connectedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ facebookId: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ authProvider: 1 });

// Virtual for account lock status
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Virtual for social login status
userSchema.virtual("isSocialLogin").get(function () {
  return this.authProvider !== "local";
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new) and exists
  if (!this.isModified("password") || !this.password) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to handle avatar from social login
userSchema.pre("save", function (next) {
  // If user has a profile picture from social login and no custom avatar
  if (
    this.profilePicture &&
    this.avatar ===
      "https://res.cloudinary.com/electronics-marketplace/image/upload/v1/defaults/avatar_default.png"
  ) {
    this.avatar = this.profilePicture;
  }
  next();
});

// Method to compare password (only for local auth)
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    if (!this.password) {
      throw new Error("User registered with social login - no password set");
    }
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Method to set password for social login users
userSchema.methods.setPassword = async function (newPassword) {
  if (newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(newPassword, salt);
  return this.save();
};

// Method to link social account
userSchema.methods.linkSocialAccount = function (provider, providerId, email) {
  // Check if already linked
  const existingAccount = this.socialAccounts.find(
    (acc) => acc.provider === provider && acc.providerId === providerId
  );

  if (existingAccount) {
    return this;
  }

  // Add new social account
  this.socialAccounts.push({
    provider,
    providerId,
    email,
    connectedAt: new Date(),
  });

  return this.save();
};

// Method to unlink social account
userSchema.methods.unlinkSocialAccount = function (provider) {
  this.socialAccounts = this.socialAccounts.filter(
    (acc) => acc.provider !== provider
  );

  // If unlinking the primary auth provider, require password
  if (this.authProvider === provider && !this.password) {
    throw new Error(
      "Cannot unlink primary authentication method without setting a password first"
    );
  }

  return this.save();
};

// Method to generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire time (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Method to generate email verification token
userSchema.methods.getEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(20).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  return verificationToken;
};

// Method to handle failed login attempts (only for local auth)
userSchema.methods.incLoginAttempts = function () {
  // Don't track login attempts for social logins
  if (this.authProvider !== "local") {
    return Promise.resolve();
  }

  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = {
      lockUntil: Date.now() + 2 * 60 * 60 * 1000, // 2 hours
    };
  }

  return this.updateOne(updates);
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $unset: {
      loginAttempts: 1,
      lockUntil: 1,
    },
  });
};

// Method to add address
userSchema.methods.addAddress = function (addressData) {
  // If this is set as default, unset other default addresses
  if (addressData.isDefault) {
    this.addresses.forEach((addr) => {
      addr.isDefault = false;
    });
  }

  // If this is the first address, make it default
  if (this.addresses.length === 0) {
    addressData.isDefault = true;
  }

  this.addresses.push(addressData);
  return this.save();
};

// Method to update address
userSchema.methods.updateAddress = function (addressId, addressData) {
  const address = this.addresses.id(addressId);
  if (!address) {
    throw new Error("Address not found");
  }

  // If setting as default, unset other defaults
  if (addressData.isDefault) {
    this.addresses.forEach((addr) => {
      if (addr._id.toString() !== addressId) {
        addr.isDefault = false;
      }
    });
  }

  Object.assign(address, addressData);
  return this.save();
};

// Method to remove address
userSchema.methods.removeAddress = function (addressId) {
  const address = this.addresses.id(addressId);
  if (!address) {
    throw new Error("Address not found");
  }

  const wasDefault = address.isDefault;
  address.remove();

  // If removed address was default and there are other addresses,
  // make the first one default
  if (wasDefault && this.addresses.length > 0) {
    this.addresses[0].isDefault = true;
  }

  return this.save();
};

// Method to get default address
userSchema.methods.getDefaultAddress = function () {
  return this.addresses.find((addr) => addr.isDefault) || this.addresses[0];
};

// Static method to find user by email (case insensitive)
userSchema.statics.findByEmail = function (email) {
  return this.findOne({
    email: new RegExp(`^${email}$`, "i"),
  });
};

// Static method to find or create user from OAuth
userSchema.statics.findOrCreateOAuthUser = async function (profile, provider) {
  try {
    // First, try to find user by provider ID
    let user = await this.findOne({
      [`${provider}Id`]: profile.id,
    });

    if (user) {
      // Update last login and return existing user
      user.lastLogin = new Date();
      await user.save();
      return user;
    }

    // Try to find user by email
    user = await this.findByEmail(profile.emails[0].value);

    if (user) {
      // Link the social account to existing user
      user[`${provider}Id`] = profile.id;
      user.socialAccounts.push({
        provider,
        providerId: profile.id,
        email: profile.emails[0].value,
        connectedAt: new Date(),
      });

      // Update profile picture if not set
      if (
        profile.photos &&
        profile.photos[0] &&
        user.avatar ===
          "https://res.cloudinary.com/electronics-marketplace/image/upload/v1/defaults/avatar_default.png"
      ) {
        user.profilePicture = profile.photos[0].value;
        user.avatar = profile.photos[0].value;
      }

      user.lastLogin = new Date();
      await user.save();
      return user;
    }

    // Create new user
    user = await this.create({
      name:
        profile.displayName ||
        profile.name?.givenName + " " + profile.name?.familyName,
      email: profile.emails[0].value,
      [`${provider}Id`]: profile.id,
      authProvider: provider,
      providerId: profile.id,
      profilePicture: profile.photos ? profile.photos[0].value : undefined,
      avatar: profile.photos ? profile.photos[0].value : undefined,
      emailVerified: true, // Social logins are pre-verified
      isActive: true,
      socialAccounts: [
        {
          provider,
          providerId: profile.id,
          email: profile.emails[0].value,
          connectedAt: new Date(),
        },
      ],
      lastLogin: new Date(),
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Static method to get active users
userSchema.statics.getActiveUsers = function () {
  return this.find({ isActive: true });
};

// Pre-remove middleware to clean up related data
userSchema.pre("remove", async function (next) {
  try {
    // Remove user's orders, reviews, etc. (implement based on your needs)
    // await this.model('Order').deleteMany({ user: this._id });
    // await this.model('Review').deleteMany({ user: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

// Transform JSON output (remove sensitive fields)
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  // Remove sensitive fields
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpire;
  delete userObject.emailVerificationToken;
  delete userObject.loginAttempts;
  delete userObject.lockUntil;
  delete userObject.googleId;
  delete userObject.facebookId;
  delete userObject.socialAccounts;

  return userObject;
};

module.exports = mongoose.model("User", userSchema);
