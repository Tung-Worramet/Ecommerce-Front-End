import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  SquareChartGantt,
  Group,
  Box,
  ClipboardList,
  LogOut,
} from "lucide-react";

const SidebarAdmin = () => {
  return (
    <div className="bg-gray-800 w-64 text-gray-100 flex flex-col h-screen">
      <div className="h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold">
        Admin Panel
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={"/admin"}
          end // ใส่ end ไว้เพราะต้องการให้ Active หน้า Dashboard ก่อน ถ้าไม่ใส่จะ Active ทุกหน้า
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>

        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <SquareChartGantt className="mr-2" />
          Manage
        </NavLink>

        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <Group className="mr-2" />
          Category
        </NavLink>

        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <Box className="mr-2" />
          Product
        </NavLink>

        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <ClipboardList className="mr-2" />
          Orders
        </NavLink>
      </nav>

      <div>
        <NavLink
          //   to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LogOut className="mr-2" />
          Logout
        </NavLink>
      </div>
    </div>

    // <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
    //   <h2 className="text-center text-2xl font-bold mb-8">Admin Panel</h2>
    //   <ul className="space-y-4">
    //     <li>
    //       <NavLink
    //         to="/"
    //         className={({ isActive }) =>
    //           `flex items-center  px-4 py-2 rounded-md ${
    //             isActive ? "bg-gray-700" : "hover:bg-gray-600"
    //           }`
    //         }
    //       >
    //         <LayoutDashboard className="mr-2" />
    //         Dashboard
    //       </NavLink>
    //     </li>
    //     {/* <li>
    //       <NavLink
    //         to="/reports"
    //         className={({ isActive }) =>
    //           `block px-4 py-2 rounded-md ${
    //             isActive ? "bg-gray-700" : "hover:bg-gray-600"
    //           }`
    //         }
    //       >
    //         Reports
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink
    //         to="/settings"
    //         className={({ isActive }) =>
    //           `block px-4 py-2 rounded-md ${
    //             isActive ? "bg-gray-700" : "hover:bg-gray-600"
    //           }`
    //         }
    //       >
    //         Settings
    //       </NavLink>
    //     </li> */}
    //   </ul>
    // </div>
  );
};

export default SidebarAdmin;
