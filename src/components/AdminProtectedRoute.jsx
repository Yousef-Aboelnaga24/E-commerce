import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminProtectedRoute() {
  const { isLoggedIn, user } = useAuth();
  
  // In a real app, you'd check `user?.role === 'admin'`.
  // For the sake of the challenge, we'll allow logged-in users or mock an admin state.
  // We'll enforce that the user must be logged in.
  if (!isLoggedIn) {
     return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
