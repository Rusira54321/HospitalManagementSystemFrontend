import React from "react";
import { Outlet } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Header */}
      <HomeHeader />

      {/* Main Page Content */}
      <main className="flex-1  mx-auto w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default HomeLayout;
