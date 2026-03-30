import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginUser } from '../services/api/AuthService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        email,
        password
      })
      login(res.data)
      if (res.data.user.role.toLowerCase() === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user/dashboard');
      }
    } catch (error) {
      let message = 'Something went wrong!';

      if (error.response && error.response.data) {
        message = error.response.data.message || JSON.stringify(error.response.data.errors);
      } else {
        message = error.message;
      }
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: message
      });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100" data-aos="zoom-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              required type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>
            <div className="relative">
              <input
                required type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-blue-500/30"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <NavLink to="/register" className="font-bold text-blue-600 hover:text-blue-500">
            Sign up now
          </NavLink>
        </div>
      </div>
    </div>
  );
}
