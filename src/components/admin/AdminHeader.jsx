import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

function AdminHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <Link 
          to="/" 
          className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          <FiArrowLeft className="mr-2 w-4 h-4" />
          Back to Store
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {user?.role === 'admin' ? 'A' : (user?.name?.charAt(0) || 'U')}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role || 'Administrator'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
          title="Logout"
        >
          <FiLogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
