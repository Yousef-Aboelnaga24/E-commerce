import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative bg-gray-900 overflow-hidden text-white pt-16 pb-32">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=2000&q=80"
          alt="E-commerce Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-24">
        <div className="max-w-2xl" data-aos="fade-right" data-aos-duration="1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Summer Sale is <span className="text-blue-500">Live</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-xl">
            Get up to 50% off on all items. Discover the latest trends in fashion, electronics, and home decor. Free shipping worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all text-center"
            >
              Shop Now
            </NavLink>
            <NavLink
              to="/products?category=electronics"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-8 rounded-full transition-all text-center"
            >
              Explore Electronics
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
