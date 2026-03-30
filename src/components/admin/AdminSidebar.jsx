import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiHome, FiUsers, FiBox,FiLayers, FiShoppingCart, FiSettings } from 'react-icons/fi';

function AdminSidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome className="w-5 h-5 mr-3" /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers className="w-5 h-5 mr-3" /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox className="w-5 h-5 mr-3" /> },
    { name: 'Categories', path: '/admin/categories', icon: <FiLayers className="w-5 h-5 mr-3" /> },
    { name: 'Orders', path: '/admin/orders', icon: <FiShoppingCart className="w-5 h-5 mr-3" /> },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <Link to="/admin" className="text-2xl font-bold tracking-wider text-white">
          ADMIN<span className="text-blue-500">PRO</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          to="/admin/settings"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
        >
          <FiSettings className="w-5 h-5 mr-3" />
          Settings
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
