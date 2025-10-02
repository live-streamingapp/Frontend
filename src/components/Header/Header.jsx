import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaCog,
  FaQuestionCircle,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import { RxCross2 } from "react-icons/rx";
import { menuOptions, notifications } from "../../utils/constants";
import TopBar from "../TopBar/TopBar";
import { PiShoppingCartFill } from "react-icons/pi";
import { MdDashboard, MdKey } from "react-icons/md";
import Dropdown from "./Dropdown";
import MobileMenu from "./MobileMenu";
import axios from "axios";

export const profileDropdownItems = [
  {
    id: 1,
    label: "Profile",
    icon: <FaUser />,
    path: "/profile",
  },
  {
    id: 2,
    label: "Dashboard",
    icon: <MdDashboard />,
    path: "/dashboard",
  },
  {
    id: 3,
    label: "Notifications",
    icon: <FaBell />,
    path: "/notifications",
    hideAbove900: true,
  },
  {
    id: 4,
    label: "Cart",
    icon: <PiShoppingCartFill />,
    path: "/cart",
    hideAbove900: true,
  },
  {
    id: 5,
    label: "Change Password",
    icon: <MdKey />,
    path: "/change-password",
  },
  {
    id: 6,
    label: "Logout",
    icon: <FaSignOutAlt />,
    path: "/logout",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check authentication status
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/me`, {
        withCredentials: true,
      });
      setUserData(res.data.data);
      setIsAuthenticated(true);
    } catch (err) {
      setUserData(null);
      setIsAuthenticated(false);
    }
  };

  // Check authentication status on component mount and when location changes
  useEffect(() => {
    fetchUserData();
  }, [location]);

  useClickOutside(profileRef, () => setShowProfile(false));
  useClickOutside(notificationRef, () => setShowNotification(false));

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {},
        { withCredentials: true } // clear cookie on backend
      );
    } catch (err) {
      console.error(err);
    }
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <section className="sticky top-0 z-50">
        <TopBar />
        <header
          className={`bg-transparent backdrop-blur-[10px] min-shadow w-full transition-all duration-300 `}
        >
          <nav className="mx-auto px-6 max-[500px]:px-2">
            <div className="flex items-center justify-between py-2">
              {/* Logo */}
              <span
                onClick={() => navigate("/")}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#610908] to-[#c41210] cursor-pointer"
              >
                <img src="/images/logo.jpg" alt="logo" className="h-[80px]" />
              </span>

              {/* Desktop Nav Links */}
              <div className="flex items-center gap-[1rem]">
                <div className="hidden min-[1100px]:flex gap-[1rem] relative">
                  {menuOptions.map(({ label, path, altPath, links }) =>
                    links ? (
                      <Dropdown
                        key={label}
                        label={label}
                        path={path}
                        altPath={altPath}
                        links={links}
                        openDropdown={openDropdown}
                        setOpenDropdown={setOpenDropdown}
                      />
                    ) : (
                      <Link
                        key={label}
                        to={path}
                        className={`transition-colors duration-300 ${
                          location.pathname === path ||
                          location.pathname === altPath
                            ? "text-orange-800 underline"
                            : "text-gray-800"
                        }`}
                      >
                        {label}
                      </Link>
                    )
                  )}
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-3 ">
                  {/* Notification Section */}
                  <div ref={notificationRef} className="max-[1100px]:hidden">
                    <button
                      className="relative cursor-pointer flex items-center justify-center bg-white border border-gray-200 h-[45px] w-[45px] rounded-full"
                      onClick={() => setShowNotification((prev) => !prev)}
                    >
                      <FaBell className="text-gray-700" />
                    </button>

                    <div
                      className={`absolute top-[90%] right-[10%] w-[320px] bg-white shadow-xl px-[8px] py-[16px] rounded-lg border border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${
                        showNotification
                          ? "max-h-[400px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-[5px]">
                        Notifications
                      </h3>
                      <ul className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto thin-scrollbar">
                        {notifications.map((note) => (
                          <li key={note.id} className="">
                            <Link
                              to={note.path || "#"}
                              className="block hover:bg-gray-100 p-2 rounded-md transition-colors duration-200"
                            >
                              <p className="text-sm font-medium text-gray-800">
                                {note.title}
                              </p>
                              <p className="text-xs text-gray-600">
                                {note.message}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {note.time}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* AUTHENTICATION OPTIONS - Conditionally render based on auth status */}
                  {!isAuthenticated ? (
                    <div className="flex items-center gap-[10px]">
                      <button
                        onClick={() => navigate("/auth/login")}
                        className="border-2 border-[#bb1201] text-[#bb1201] px-3 py-1 rounded-[5px] cursor-pointer max-[500px]:text-sm"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => navigate("/auth/register")}
                        className="bg-[#bb1201] text-white rounded-[5px] px-3 py-1 border-2 border-[#bb1201] cursor-pointer max-[500px]:text-sm whitespace-nowrap"
                      >
                        Sign Up
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-[10px]">
                      <button
                        className="max-[1100px]:hidden relative cursor-pointer flex items-center text-gray-700 justify-center bg-white border border-gray-200 h-[45px] w-[45px] rounded-full"
                        onClick={() => navigate("/cart")}
                      >
                        <PiShoppingCartFill size={22} />
                      </button>
                    </div>
                  )}

                  {/* PROFILE SECTION - Only show when authenticated */}
                  {isAuthenticated && userData && (
                    <div ref={profileRef}>
                      <div
                        className="w-[45px] h-[45px] cursor-pointer border border-gray-400 rounded-full overflow-hidden"
                        onClick={() => setShowProfile((prev) => !prev)}
                      >
                        <img
                          src="/images/profile.png"
                          alt="user"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div
                        className={`absolute top-[90%] right-0 bg-white shadow-xl px-[8px] py-[10px] w-[250px] rounded-lg border border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${
                          showProfile
                            ? "max-h-[400px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-2 py-1 border-b border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {userData.name || "User"}
                          </h3>
                          <p className="text-xs text-gray-600 truncate">
                            {userData.email}
                          </p>
                        </div>
                        <ul className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto thin-scrollbar">
                          {profileDropdownItems.map((item) => (
                            <li
                              key={item.id}
                              className={
                                item.hideAbove900 ? "min-[1100px]:hidden" : ""
                              }
                            >
                              {item.label === "Logout" ? (
                                <button
                                  onClick={handleLogout}
                                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors text-sm text-gray-800 w-full text-left"
                                >
                                  <span>{item.icon}</span>
                                  <span>{item.label}</span>
                                </button>
                              ) : (
                                <Link
                                  to={item.path}
                                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 transition-colors text-sm text-gray-800"
                                  onClick={() => setShowProfile(false)}
                                >
                                  <span>{item.icon}</span>
                                  <span>{item.label}</span>
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Mobile Menu Button */}
                  <button
                    onClick={toggleMobileMenu}
                    className="block focus:outline-none focus:border-none min-[1100px]:hidden text-xl text-gray-700"
                  >
                    {mobileMenuOpen ? <RxCross2 size={22} /> : <FaBars />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`absolute bg-[#fbfbfb] w-full left-0 px-[1rem] pb-[.5rem] shadow-sm overflow-hidden transition-all duration-500 ease-in-out ${
                mobileMenuOpen
                  ? "max-h-[450px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <MobileMenu
                isAuthenticated={isAuthenticated}
                userData={userData}
                onLogout={handleLogout}
              />
            </div>
          </nav>
        </header>
      </section>
    </>
  );
};

export default Header;
