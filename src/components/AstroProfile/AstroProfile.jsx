import React from "react";
import Header from "../Header/Header";
import { MdCall, MdEmail, MdLogout } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import {
  FaBell,
  FaGraduationCap,
  FaInfoCircle,
  FaLifeRing,
  FaLock,
} from "react-icons/fa";
import { IoIosArrowForward, IoMdLock, IoMdPin } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const menuItems = [
  {
    label: "View Profile",
    icon: <CgProfile className="text-[#ce0d06] text-lg" />,
    path: "/astrologer/profile/me",
  },
  {
    label: "My Courses",
    icon: <FaGraduationCap className="text-[#ce0d06] text-lg" />,
    path: "/my-courses",
  },
  {
    label: "Change Password",
    icon: <IoMdLock className="text-[#ce0d06] text-lg" />,
    path: "/change-password",
  },
  {
    label: "Notifications",
    icon: <FaBell className="text-[#ce0d06] text-lg" />,
    path: "/notifications",
  },
  {
    label: "About",
    icon: <FaInfoCircle className="text-[#ce0d06] text-lg" />,
    path: "/about",
  },
  {
    label: "Help & Support",
    icon: <BiSupport className="text-[#ce0d06] text-lg" />,
    path: "/help-support",
  },
];

const AstroProfile = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <Header />
        <div className="mx-[1.5rem] my-[2rem] flex justify-between items-center">
          <span className="text-[1.25rem] font-semibold">My Profile</span>
          <span className="flex items-center gap-[5px] text-[#ce0d06]">
            <span className="bg-white p-2 rounded-full min-shadow cursor-pointer">
              <MdLogout />
            </span>{" "}
            Logout
          </span>
        </div>
        <div className="mx-[2rem] mt-[50px] max-[850px]:flex-col flex justify-between gap-[3rem]">
          <div className="relative rounded-xl h-full min-[475px]:h-[200px] w-[450px] max-[520px]:w-[100%] bg-gradient-to-b from-[#ce0d06] to-[#e47031] p-3">
            <div className="max-[475px]:hidden absolute flex items-center justify-center -top-[18%] -left-[5%] h-[180px] w-[180px] bg-[#f4f4f4] rounded-full">
              <div className="h-[80%] w-[80%] rounded-full border-2 border-[#ce0d06] red-shadow overflow-hidden">
                <img
                  src="/images/aditi.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="hidden max-[475px]:block h-[40%]">
              <img
                src="/images/aditi.png"
                alt=""
                className="h-[200px] w-[200px] object-cover object-center rounded-full mx-auto"
              />
            </div>
            <div className="min-[475px]:ml-[40%] flex items-center justify-between text-white border-b pb-[1rem]">
              <div>
                <p className="text-[1.25rem] font-semibold leading-tight">
                  Aditi Shrivas
                </p>
                <p className="text-sm flex items-center gap-[5px]">
                  <MdEmail size={18} /> aditishrivas4@gmail.com
                </p>
              </div>
              <span className="border p-2 rounded-full bg-white/30 cursor-pointer">
                <LuPencilLine />
              </span>
            </div>
            <div className="min-[475px]:ml-[40%] mt-[1rem] flex flex-col gap-[5px] text-white">
              {/* <span className="flex-1 border rounded-lg p-2 bg-white/30">
                <p className="font-semibold">20 Hrs</p>
                <p className="text-sm">Study Time</p>
              </span>
              <span className="flex-1 border rounded-lg p-2 bg-white/30">
                <p className="font-semibold">11 Courses</p>
                <p className="text-sm">Learned</p>
              </span> */}
              <p className="text-sm flex items-center gap-[5px]">
                <MdCall size={19} /> +91 8866539541
              </p>
              <p className="text-sm flex items-center gap-[5px]">
                <IoMdPin size={19} /> Jaya Nagar, Bangalore, India
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[1rem] overflow-hidden flex-1">
            {menuItems.map((item, index) => (
              <div
                onClick={() => navigate(item.path)}
                key={index}
                className="flex min-shadow justify-between items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <IoIosArrowForward className="text-gray-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AstroProfile;
