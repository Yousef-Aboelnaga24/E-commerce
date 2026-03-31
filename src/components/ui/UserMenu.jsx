import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { ImUser } from "react-icons/im";

export default function UserMenu({ isLoggedIn, user, logout, closeMenu }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      {isLoggedIn ? (
        <>
          <NavLink
            to={user?.role.toLowerCase() === "admin" ? "/admin" : "/user/dashboard"}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={closeMenu}
          >
            <FaUser size={16} /> My Account
          </NavLink>
          {user?.role.toLowerCase() !== "admin" && (
            <NavLink
              to="/user/orders"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={closeMenu}
            >
              <FaShoppingCart size={16} /> My Orders
            </NavLink>
          )}
          <hr className="my-2" />
          <button
            className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={() => { logout(); closeMenu(); }}
          >
            <FaSignOutAlt size={16} /> Sign Out
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={closeMenu}
          >
            <ImUser size={16} /> Sign In
          </NavLink>
          <NavLink
            to="/register"
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={closeMenu}
          >
            <FaUser size={16} /> Create Account
          </NavLink>
        </>
      )}
    </div>
  );
}