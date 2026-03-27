import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { NavLink } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';

export default function Wishlist() {
  const { wishlistItems } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        {wishlistItems.length > 0 && (
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
          </span>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 px-4 text-center">
          <FaHeartBroken className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Looks like you haven't added anything to your wishlist yet. Explore our products and save your favorites!
          </p>
          <NavLink
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm"
          >
            Start Shopping
          </NavLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
