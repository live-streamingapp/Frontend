import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaStar,
  FaBook,
  FaUsers,
  FaFolder,
  FaComments,
  FaBox,
  FaChartLine,
  FaVideo,
  FaRupeeSign,
  FaQuoteRight,
  FaCog,
  FaHome,
  FaBars,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaHome size={20} />,
    path: "/admin/dashboard",
  },
  {
    title: "User Management",
    icon: <FaUser size={20} />,
    children: [
      // {
      //   title: "Astrologer Management",
      //   path: "/admin/astrologers",
      //   icon: <FaStar size={18} />,
      // },
      {
        title: "Student Management",
        path: "/admin/student-management",
        icon: <FaBook size={17} />,
      },
    ],
  },
  {
    title: "Course Management",
    path: "/admin/courses",
    icon: <FaFolder size={20} />,
  },
  {
    title: "Event Management",
    path: "/admin/events",
    icon: <FaFolder size={20} />,
  },
  {
    title: "Consultation Management",
    path: "/admin/consultations",
    icon: <FaComments size={20} />,
  },
  {
    title: "Products ",
    icon: <FaBox size={20} />,
    children: [
      {
        title: "Books",
        path: "/admin/books",
        icon: <FaBook size={17} />,
      },
      {
        title: "Remedies",
        path: "/admin/remedies",
        icon: <FaBox size={17} />,
      },
    ],
  },

  {
    title: "Payments",
    path: "/admin/payments",
    icon: <FaRupeeSign size={20} />,
  },
  {
    title: "Reviews",
    path: "/admin/reviews",
    icon: <FaQuoteRight size={20} />,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <FaCog size={20} />,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const navClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-3 py-3 text-sm rounded-md transition-colors ${
      isActive
        ? "bg-red-50 text-red-700 font-semibold"
        : "text-gray-800 hover:bg-red-50 hover:text-red-700"
    }`;

  const dropdownClass =
    "flex items-center gap-2.5 px-3 py-3 text-sm text-gray-800 rounded-md transition-colors hover:bg-red-50 hover:text-red-700 cursor-pointer";

  const subNavClass =
    "flex items-center gap-2 py-2 text-xs text-gray-600 hover:text-red-700";

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full bg-white border-r border-gray-200 
          transition-all duration-300 z-50
          ${collapsed ? "w-[60px]" : "w-[250px]"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6 pt-4">
          <img
            src="/images/vastu-logo.png"
            alt="Vastu Abhishek"
            className={`${collapsed ? "h-8 w-8" : "h-12 w-auto"}`}
          />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex flex-col items-center mt-3 space-y-1 text-gray-700"
          >
            <span className="block w-6 h-0.5 bg-gray-700"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
          </button>
        </div>

        {/* Menu */}
        <ul className="list-none p-0 m-0 space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <>
                  <div
                    onClick={() => toggleMenu(item.title)}
                    className={dropdownClass}
                  >
                    {item.icon}
                    {!collapsed && item.title}
                    {!collapsed && (
                      <span className="ml-auto text-xs">
                        {openMenus[item.title] ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                  {openMenus[item.title] && !collapsed && (
                    <ul className="pl-6 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <NavLink to={child.path} className={subNavClass}>
                            {child.icon} {child.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink to={item.path} className={navClass}>
                  {item.icon} {!collapsed && item.title}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top bar for mobile */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 shadow sticky top-0 z-40">
          <img
            src="/images/vastu-logo.png"
            alt="Vastu Abhishek"
            className="h-10 w-auto"
          />
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars className="text-2xl text-gray-700" />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-4">{/* Your page content goes here */}</div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
