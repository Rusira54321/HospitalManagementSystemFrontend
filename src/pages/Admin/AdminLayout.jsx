import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-100 w-full">
      {/* Sidebar */}
      <div className="flex flex-col h-auto">
        <AdminSideBar />
      </div>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
