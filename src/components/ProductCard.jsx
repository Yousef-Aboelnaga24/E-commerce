import React from 'react';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlistItems } = useCart();
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    Swal.fire({
      title: 'Added to Cart',
      text: `${product.title} has been added to your cart.`,
      icon: 'success',
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
      data-aos="fade-up"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-6 flex items-center justify-center">
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform text-2xl"
        >
          <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-300"} />
        </button>

        {/* Product Image */}
        <NavLink to={`/product/${product.id}`} className="block w-full h-full relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          />
        </NavLink>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {product.categoryName}
        </div>
      </div>

      <div className="p-5 flex flex-col grow">
        <NavLink to={`/product/${product.id}`} className="block grow">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(product.rating?.rate || 0) ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-gray-500 text-xs ml-2">({product.rating?.count || 0})</span>
          </div>
        </NavLink>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center cursor-pointer gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm hover:shadow-blue-500/30"
          >
            <FaShoppingCart size={16} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
