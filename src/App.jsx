import { Routes, Route } from "react-router-dom"

// Layout Components
import MainLayout from "./components/layout/MainLayout"
import AdminLayout from "./components/layout/AdminLayout"
import OfflineAlert from "./components/OfflineAlert"
import AdminProtectedRoute from "./routes/AdminProtectedRoute"

// Public Pages
import LandingPage from './pages/LandingPage';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from "./pages/NotFound"

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import UserOrders from './pages/user/UserOrders';
import ProtectedRoute from './routes/ProtectedRoute';

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* User Dashboard Routes */}
        <Route path="/user" element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="orders" element={<UserOrders />} />
          </Route>
        </Route>

        {/* Admin Dashboard Protected Routes */}
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Route>
      </Routes>

    </>
  )
}

export default App
