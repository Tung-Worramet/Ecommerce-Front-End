import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);
  // console.log(Boolean(user));

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-5">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to={"/"} className="text-2xl font-bold">
              LOGO
            </Link>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-1 rounded-md text-sm font-medium"
                  : "hover:bg-gray-200 px-3 py-1 rounded-md text-sm font-medium "
              }
              to={"/"}
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-1 rounded-md text-sm font-medium"
                  : "hover:bg-gray-200 px-3 py-1 rounded-md text-sm font-medium "
              }
              to={"/shop"}
            >
              Shop
            </NavLink>

            {/* Badge */}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-1 rounded-md text-sm font-medium"
                  : "hover:bg-gray-200 px-3 py-1 rounded-md text-sm font-medium "
              }
              to={"/cart"}
            >
              Cart
              {/* ถ้าสินค้าเป็น 0 ชิ้นจะไม่ทำอะไร แต่ถ้าสินค้ามีมากกว่า 0 ชิ้นจะทำใน () */}
              {carts.length > 0 && (
                <span className="absolute top-2 bg-red-500 rounded-full px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center hover:bg-gray-200 px-1 py-1 rounded-md"
              >
                <img
                  className="w-8 h-8"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--human-man-profile-auto-user-google-material-vol-3-pack-interface-icons-30483.png?f=webp&w=256"
                />
                <ChevronDown className="w-4" />
              </button>
              {isOpen && (
                <div className="absolute top-16 bg-white shadow-md z-50">
                  <Link
                    to={"/user/history"}
                    className="block px-2 py-2 hover:bg-gray-200"
                  >
                    History
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="block px-2 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-1 rounded-md text-sm font-medium"
                    : "hover:bg-gray-200 px-3 py-1 rounded-md text-sm font-medium "
                }
                to={"/register"}
              >
                Register
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-1 rounded-md text-sm font-medium"
                    : "hover:bg-gray-200 px-3 py-1 rounded-md text-sm font-medium "
                }
                to={"/login"}
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
