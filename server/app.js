const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { applySecurity } = require("./middlewares/security");

// Load environment variables first
dotenv.config({
  path: "./config/config.env",
});
// Initialize Passport configuration
const passport = require("./config/passport"); // Adjust path

const app = express();

// Trust proxy (important for deployment)
app.set("trust proxy", 1);

// Compression middleware
app.use(compression());
app.use(cookieParser());

// Session configuration (required for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Important for development
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:3001",
      "http://localhost:5174",
      "http://localhost:3000", // Add for React development
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Apply security middleware
applySecurity(app);

// Import Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const stockRoutes = require("./routes/stockRoutes");

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stocks", stockRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BAGMA Marketplace API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    features: {
      googleAuth: !!process.env.GOOGLE_CLIENT_ID,
      emailService: !!process.env.SMTP_HOST,
    },
  });
});

// API info route
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BAGMAONLINE  v1",
    endpoints: {
      users: "/api/user",
      admin: "/api/admin",
      products: "/api/products",
      orders: "/api/orders",
      categories: "/api/categories",
      stocks: "/api/stocks",
    },
    authentication: {
      traditional: "POST /api/user/login",
      google: "GET /api/user/auth/google",
      register: "POST /api/user/register",
    },
    documentation: "https://your-api-docs.com",
    support: "support@electronicsmarketplace.com",
  });
});

// 404 handler for undefined routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      "/api/user",
      "/api/admin",
      "/api/products",
      "/api/orders",
      "/api/stocks",
      "/api/categories",
    ],
  });
});
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-fallback-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

module.exports = app;
