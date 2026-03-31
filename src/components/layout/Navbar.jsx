import React, { useEffect, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { ImUser } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getCategories } from "../../services/api/CategoryService";


import CategoryButton from '../ui/CategoryButton'
import SearchBar from '../ui/SearchBar'
import UserMenu from '../ui/UserMenu'

export default function AppNavbar() {
  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const { cartCount, wishlistCount } = useCart();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const query = searchValue.trim();
      const categoryQuery = selectedCategory !== "All" ? `&category=${encodeURIComponent(selectedCategory)}` : "";
      if (query || selectedCategory !== "All") {
        navigate(`/products?search=${encodeURIComponent(query)}${categoryQuery}`);
        setSearchValue("");
        setIsMobileMenuOpen(false);
      }
    }
  };

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    navigate(catName === "All" ? `/products` : `/products?category=${encodeURIComponent(catName)}`);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Top Navbar */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={toggleMobileMenu} className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors">
            {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>

          <NavLink to="/" className="text-2xl font-bold tracking-wide hover:scale-105 transition-transform" onClick={() => setIsMobileMenuOpen(false)}>
            Cartify
          </NavLink>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <SearchBar value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onSearch={handleSearch} />
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* User Menu */}
            <div className="relative">
              <button onClick={toggleUserMenu} className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors">
                <ImUser size={20} />
                <span className="text-sm font-medium">{isLoggedIn ? "Account" : "Sign In"}</span>
              </button>
              {isUserMenuOpen && <UserMenu isLoggedIn={isLoggedIn} user={user} logout={logout} closeMenu={() => setIsUserMenuOpen(false)} />}
            </div>

            {/* Wishlist & Cart */}
            <NavLink to="/wishlist" className="relative p-2 hover:bg-blue-700 rounded-lg transition-colors group">
              <FaHeart size={20} className="group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/cart" className="relative p-2 hover:bg-blue-700 rounded-lg transition-colors group">
              <FaShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* Mobile Cart Icon */}
          <div className="lg:hidden flex items-center gap-4">
            <NavLink to="/cart" className="relative p-2 hover:bg-blue-700 rounded-lg transition-colors">
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

      {/* Mobile Search */}
      <div className="lg:hidden bg-gray-50 px-4 py-3">
        <SearchBar value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onSearch={handleSearch} />
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Desktop Categories */}
          <div className="hidden lg:flex gap-2 text-sm font-medium overflow-x-auto scrollbar-hide">
            <CategoryButton name="All" selected={selectedCategory === "All"} onClick={handleCategorySelect} />
            {categories.map((cat) => (
              <CategoryButton key={cat.id} name={cat.name} selected={selectedCategory === cat.name} onClick={handleCategorySelect} />
            ))}
          </div>

          {/* Mobile Categories */}
          <div className="lg:hidden">
            <div className={`overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96" : "max-h-0"}`}>
              <div className="flex flex-col gap-2 py-2">
                <CategoryButton name="All" selected={selectedCategory === "All"} onClick={handleCategorySelect} />
                {categories.map((cat) => (
                  <CategoryButton key={cat.id} name={cat.name} selected={selectedCategory === cat.name} onClick={handleCategorySelect} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile User Menu Overlay */}
      {isUserMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsUserMenuOpen(false)} />}
    </header>
  );
}