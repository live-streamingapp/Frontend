import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";

const AdminLayout = ({ children }) => {
  const notifications = [
    {
      id: 1,
      title: "New Enquiry",
      message: "Aarti Nair has submitted a course access issue",
      time: "12 mins ago",
      path: "/enquiries",
    },
    {
      id: 2,
      title: "Payment Received",
      message: "₹45,000 payment received for Gemstone consultation",
      time: "15 mins ago",
      path: "/payments",
    },
    {
      id: 3,
      title: "Course Completed",
      message: "John Doe completed Numerology Basic Course",
      time: "1 hour ago",
      path: "/courses",
    },
    {
      id: 4,
      title: "New Registration",
      message: "5 new students registered today",
      time: "2 hours ago",
      path: "/users",
    },
  ];
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);
  return (
    <div className="flex min-h-screen">
      <div className="sticky left-0 top-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Topbar
          showNotification={showNotification}
          setShowNotification={setShowNotification}
          notificationRef={notificationRef}
          notifications={notifications}
        />
        <main className="p-4 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
