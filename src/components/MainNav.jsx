import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown, ShoppingCart } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Menu */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-600 hover:text-gray-700 transition"
            >
              LOGO
            </Link>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold px-3 py-2 rounded-lg bg-blue-100"
                  : "text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold px-3 py-2 rounded-lg bg-blue-100"
                  : "text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              }
            >
              Shop
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "relative text-blue-600 font-semibold px-3 py-2 rounded-lg bg-blue-100"
                  : "relative text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              }
            >
              <ShoppingCart size={20} />
              {carts.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-80">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* User Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--human-man-profile-auto-user-google-material-vol-3-pack-interface-icons-30483.png?f=webp&w=256"
                  alt="User"
                />
                <ChevronDown size={18} />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 transition-transform transform scale-95 origin-top-right">
                  <Link
                    to="/user/history"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-500 rounded-t-lg transition hover:font-bold"
                  >
                    📜 History
                  </Link>

                  <hr className="border-t border-gray-300" />

                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-b-lg transition hover:font-bold"
                  >
                    🔴 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold px-3 py-2 rounded-lg bg-blue-100"
                    : "text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                }
              >
                Register
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold px-3 py-2 rounded-lg bg-blue-100"
                    : "text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
