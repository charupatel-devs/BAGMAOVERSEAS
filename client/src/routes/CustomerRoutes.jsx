// routes/CustomerRoute.jsx
import { Navigate, Route, Routes } from "react-router-dom";

// Page Components (these will be created separately)
// import BulkOrderPage from "../pages/BulkOrderPage";
// import CartPage from "../pages/CartPage";
// import CategoryPage from "../pages/CategoryPage";
// import CheckoutPage from "../pages/customer/CheckoutPage";
import ContactUs from "../pages/customer/ContactUs";
// import ProductDetailPage from "../pages/ProductDetailPage";
// import ProductsPage from "../pages/ProductsPage";
// import SearchResultsPage from "../pages/SearchResultsPage";

// Auth Components
// import ForgotPassword from "../components/auth/ForgotPassword";
// import LoginForm from "../components/auth/LoginForm";
// import RegisterForm from "../components/auth/RegisterForm";
// import UserProfile from "../components/auth/UserProfile";

// Layout Components
import AuthSuccess from "../components/customer/auth/AuthSuccess";
import Login from "../components/customer/auth/Login";
import Register from "../components/customer/auth/Register";
import Footer from "../components/customer/layout/Footer";
import Header from "../components/customer/layout/Header";
import ProductViewPage from "../components/customer/products/ProductViewPage";
import AboutUs from "../pages/customer/AboutUs";
import Home from "../pages/customer/Home";
import Orders from "../pages/customer/Orders";
import ProductsList from "../pages/customer/ProductList";
import Profile from "../pages/customer/Profile";
// Protected Route Component
// import ProtectedRoute from "./ProtectedRoute";

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
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/contact" element={<ContactUs />} />
        {/* Product Routes */}
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:productId" element={<ProductViewPage />} />
        <Route path="/my-orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/search" element={<SearchResultsPage />} /> */}
        {/* Static Pages */}
        <Route path="/about" element={<AboutUs />} />
        {/*<Route path="/contact" element={<ContactPage />} />
        <Route path="/bulk-order" element={<BulkOrderPage />} /> */}
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />

        <Route path="/register" element={<Register />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        {/* Catch all route - 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default CustomerRoutes;
