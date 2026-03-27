import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken)
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    setToken(userData.token)
    setIsLoggedIn(true);

    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = (userData) => {
    login(userData);
  };

  const value = {
    user,
    token,
    isLoggedIn,
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
