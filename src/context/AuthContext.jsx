import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    if (!userData?.user || !userData?.token) return;

    setUser(userData.user);
    setToken(userData.token);

    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = (userData) => {
    login(userData);
  };

  const value = {
    user,
    token,
    isLoggedIn: !!token,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}