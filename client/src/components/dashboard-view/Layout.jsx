import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* sidebar */}
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {/* navbar */}
        <Navbar />
        <main className="flex-1 flex bg-muted/40 p-[120px] md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
