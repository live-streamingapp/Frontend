import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import SubTopbar from "./SubTopbar";

const subTopbarMap = {
  "/admin/astrologers": "Astrologer Management",
  "/admin/student-management": "Student Management",
  "/admin/dashboard": "Admin Dashboard",
  // add others here!
};

const Layout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const subTopbarTitle = subTopbarMap[currentPath] || "Customer Management"; // fallback

  return (
    <div className="dashboard-container flex h-screen w-full">
      <Sidebar />
      <div className="dashboard-main flex-1 flex flex-col bg-[#f9f9f9] overflow-hidden">
        <SubTopbar title={subTopbarTitle} />
        <div className="px-8 pt-[50px] flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
