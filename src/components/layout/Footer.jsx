import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

export default function Footer() {
  const { isLoggedIn, user } = useAuth();
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold tracking-wide mb-4">Cartify</h3>
          <p className="text-gray-400 mb-4">Your one-stop shop for everything you need. Quality products, competitive prices.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={24} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><NavLink to="/" className="text-gray-400 hover:text-white transition-colors">Home</NavLink></li>
            <li><NavLink to="/products" className="text-gray-400 hover:text-white transition-colors">Products</NavLink></li>
            <li><NavLink to="/cart" className="text-gray-400 hover:text-white transition-colors">Cart</NavLink></li>
            {isLoggedIn ? (
              user?.role === "admin" ? (
                <li>
                  <NavLink
                    to="/admin"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Admin
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/orders"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Orders
                  </NavLink>
                </li>
              )
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <div className="flex">
            <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors font-semibold">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Cartify. All rights reserved.
      </div>
    </footer>
  );
}
