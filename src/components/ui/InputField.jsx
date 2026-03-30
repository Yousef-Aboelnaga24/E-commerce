import React from 'react';

export default function InputField({ type = "text", placeholder, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`pl-2 pr-4 py-2 z-20 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 w-64 text-sm ${className}`}
    />
  );
}