import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const Dropdown = ({
  label,
  path,
  altPath,
  links,
  openDropdown,
  setOpenDropdown,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  //   useClickOutside(dropdownRef, () => setOpenDropdown(null));

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpenDropdown(
            openDropdown === label.toLowerCase() ? null : label.toLowerCase()
          );
          if (label === "Courses" && navigate("/courses"));
          if (label === "Products" && navigate("/products"));
        }}
        className={`transition-colors duration-300 flex gap-[5px] items-center ${
          location.pathname === path || location.pathname === altPath
            ? "text-orange-800 underline"
            : "text-gray-800"
        }`}
      >
        {label} <MdOutlineKeyboardArrowDown />
      </button>

      <div
        className={`absolute left-0 mt-2 w-[200px] text-sm bg-white shadow-lg rounded-md border border-gray-200 z-50 transform transition-all duration-300 origin-top ${
          openDropdown === label.toLowerCase()
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        {links.map(({ label, path }) => (
          <Link
            key={label}
            to={path}
            className="block px-4 py-2 hover:underline text-gray-800"
            onClick={() => setOpenDropdown(null)}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
