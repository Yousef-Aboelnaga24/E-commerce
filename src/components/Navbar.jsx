import React, { useEffect, useState } from "react";
import { MdSearch, MdMenu, MdClose } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Input from "./ui/InputField";
// Data Fetching
import { getCategories } from "../services/api/CategoryService";

export default function AppNavbar() {
  // useStates
  const [categories, setCategories] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Auth
  const { isLoggedIn, user, logout } = useAuth();
  const { cartCount, wishlistCount } = useCart();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  // useEffects For Fetching
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error(error);
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Top Navbar */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>

            {/* Logo */}
            <NavLink
              to="/"
              className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform"
            >
              MyShop
            </NavLink>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-2 rounded-l-lg border-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-blue-700 hover:bg-blue-800 rounded-r-lg transition-colors">
                  <MdSearch size={20} />
                </button>
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center gap-6">
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <ImUser size={20} />
                  <span className="text-sm font-medium">
                    {isLoggedIn ? "Account" : "Sign In"}
                  </span>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {isLoggedIn ? (
                      <>
                        <NavLink
                          to="/user/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaUser size={16} />
                          My Account
                        </NavLink>
                        <NavLink
                          to="/user/orders"
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaShoppingCart size={16} />
                          My Orders
                        </NavLink>
                        <hr className="my-2" />
                        <button
                          className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                        >
                          <FaSignOutAlt size={16} />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <ImUser size={16} />
                          Sign In
                        </NavLink>
                        <NavLink
                          to="/register"
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaUser size={16} />
                          Create Account
                        </NavLink>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <NavLink
                to="/wishlist"
                className="relative p-2 hover:bg-blue-700 rounded-lg transition-colors group"
              >
                <FaHeart size={20} className="group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>

              {/* Cart */}
              <NavLink
                to="/cart"
                className="relative p-2 hover:bg-blue-700 rounded-lg transition-colors group"
              >
                <FaShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center gap-4">
              <NavLink
                to="/cart"
                className="relative p-2 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <FaShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden bg-gray-50 px-4 py-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full pl-4 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300"
          />
          <button className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors">
            <MdSearch size={20} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Desktop Categories */}
          <div className="hidden lg:flex gap-6 text-sm font-medium overflow-x-auto">
            <NavLink className="whitespace-nowrap px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" to="#">All</NavLink>
            {categories.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="whitespace-nowrap px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {cat.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Categories */}
          <div className="lg:hidden">
            <div className={`overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="flex flex-col gap-2 py-2">
                {categories.map((cat) => (
                  <NavLink
                    key={cat.id}
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile User Menu Overlay */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
}