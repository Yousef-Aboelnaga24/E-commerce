import { Routes, Route } from "react-router-dom"

// Layout Components
import MainLayout from "./components/MainLayout"
import AdminLayout from "./components/AdminLayout"
import OfflineAlert from "./components/OfflineAlert"
import AdminProtectedRoute from "./components/AdminProtectedRoute"

// Public Pages
import LandingPage from './pages/LandingPage';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import NotFound from "./pages/NotFound"

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <>
      <OfflineAlert />
      <Routes>
        {/* Main Public E-commerce Routes */}
        <Route element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin Dashboard Protected Routes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
