import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'user') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;