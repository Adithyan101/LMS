// src/layout/AdminLayout.jsx
import Navbar from "../components/Navbar";
import SideBar from "../pages/admin/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-900 overflow-hidden">
      {/* Sidebar */}
      <SideBar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Scrollable main content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
