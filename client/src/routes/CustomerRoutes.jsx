// routes/CustomerRoute.jsx
import { Navigate, Route, Routes } from "react-router-dom";

// Page Components
import ContactUs from "../pages/customer/ContactUs";

// Layout Components
import AuthSuccess from "../components/customer/auth/AuthSuccess";
import Login from "../components/customer/auth/Login";
import Register from "../components/customer/auth/Register";
import Footer from "../components/customer/layout/Footer";
import Header from "../components/customer/layout/Header";
import ProductViewPage from "../components/customer/products/ProductViewPage";
import AboutUs from "../pages/customer/AboutUs";
import AddressSelection from "../pages/customer/AddressSelection";
import Home from "../pages/customer/Home";
import OrderConfirmation from "../pages/customer/OrderConfirmation";
import Orders from "../pages/customer/Orders";
import ProductsList from "../pages/customer/ProductList";
import Profile from "../pages/customer/Profile";
import ViewCart from "../pages/customer/ViewCart";
import ProtectedRoute from "../utils/customer/ProtectedRoute";

// Protected Route Component

// Main Layout Wrapper
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

// Customer Routes Component
const CustomerRoutes = () => {
  return (
    <Layout>
      <Routes>
        {/* Public Routes - No authentication required */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Product Routes - Public (viewing products) */}
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:productId" element={<ProductViewPage />} />

        {/* Auth Routes - Only for non-authenticated users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* Protected Routes - Require authentication */}
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <ViewCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-address"
          element={
            <ProtectedRoute>
              <AddressSelection />
            </ProtectedRoute>
          }
        />

        {/* Catch all route - 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default CustomerRoutes;
