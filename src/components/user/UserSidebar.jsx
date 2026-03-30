import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const UserSidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Profile Overview', path: '/user/dashboard', icon: <FaUser /> },
    { name: 'My Orders', path: '/user/orders', icon: <FaShoppingBag /> },
    { name: 'Wishlist', path: '/wishlist', icon: <FaHeart /> },
    { name: 'Settings', path: '/user/settings', icon: <FaCog /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
        <hr className="my-4 border-gray-100" />
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left"
        >
          <span className="text-lg"><FaSignOutAlt /></span>
          <span className="font-medium">Sign Out</span>
        </button>
      </nav>
    </div>
  );
};

export default UserSidebar;
