// src/components/SubTopbar.jsx
import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Sample notifications data
const notifications = [
  { id: 1, title: "New Student Registration", message: "Aditi R. Sharma enrolled in Advanced Vedic Astrology", time: "5 mins ago", path: "/students" },
  { id: 2, title: "Course Progress Update", message: "Neha J. Singh completed 95% of her course", time: "12 mins ago", path: "/course-progress" },
  { id: 3, title: "Report Generated", message: "Monthly progress report is ready for download", time: "30 mins ago", path: "/reports" },
  { id: 4, title: "Consultation Booked", message: "Rahul P. Kumar booked a consultation session", time: "1 hour ago", path: "/bookings" },
  { id: 5, title: "Payment Received", message: "₹25,000 payment received for consultation package", time: "2 hours ago", path: "/payments" }
];

const SubTopbar = ({ title }) => {
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);

  return (
    <div className="flex justify-between items-center mb-5 px-5 py-3 bg-white rounded-xl shadow-sm max-w-full">
      <h2 className="text-[1.2rem] sm:text-[1.4rem] font-semibold text-[#333] truncate">
        {title}
      </h2>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search box */}
        <div className="flex items-center bg-[#f9f9f9] rounded-full px-3 py-1.5 gap-2 shadow-inner">
          <FaSearch className="text-[#666]" />
          <input
            type="text"
            placeholder="Search key words.."
            className="border-none outline-none bg-transparent text-[0.9rem] sm:text-[0.95rem] w-[100px] sm:w-[160px]"
          />
        </div>

        {/* Notification Section - Working notification bell */}
        <div ref={notificationRef} className="relative">
          <button 
            className="bg-[#f9f9f9] border-none rounded-full p-2 cursor-pointer shadow hover:bg-[#eee] flex items-center justify-center w-[44px] h-[44px]"
            onClick={() => setShowNotification((prev) => !prev)}
          >
            <FaBell className="text-[#666] w-4 h-4" />
          </button>

          <div
            className={`absolute top-[90%] right-0 w-[320px] bg-white shadow-xl px-[8px] py-[16px] rounded-lg border border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${
              showNotification
                ? "max-h-[400px] opacity-100 z-50"
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
                    onClick={() => setShowNotification(false)}
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
      </div>
    </div>
  );
};

export default SubTopbar;