import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const Layout = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <MainNav />
      {/* <main className="h-full px-4 py-4 mt-2 mx-auto bg-gray-100"> */}
      <main className="flex-grow overflow-auto bg-gray-100">
        {/* Outlet เอาไว้ใส่ components ลูกๆ ให้แสดง*/}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
