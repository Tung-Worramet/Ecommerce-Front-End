import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const LayoutUser = () => {
  return (
    <div>
      <MainNav />
      <main className="py-4 pt-6 mx-auto bg-gray-100 min-h-screen">
        {/* Outlet เอาไว้ใส่ components ลูกๆ ให้แสดง*/}
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutUser;
