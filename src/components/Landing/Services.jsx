import React from "react";
import { BiSolidFactory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { MdMenuBook } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  return (
    <>
      <section
        id="services"
        className="py-10 bg-gray-50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 max-[500px]:px-[1rem] flex items-center gap-y-[2rem] gap-x-14 max-[600px]:flex-col">
          {/* Left side */}
          <div className="flex-1 pr-0 lg:pr-8">
            <h2 className="text-4xl font-semibold mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 leading-tight max-[500px]:text-[16px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Right side - Cards */}
          <div className="flex-1 min-h-[350px] flex gap-[1rem] max-[500px]:gap-[10px] max-[750px]:flex-col w-full">
            <div className="flex flex-col w-[50%] gap-[1rem] max-[500px]:gap-[10px] max-[750px]:w-[100%]">
              <div
                onClick={() => navigate("/vastu-residential")}
                className="cursor-pointer hover:scale-102 transition-all .3s ease-in-out p-2 h-[70%] bg-[#ee6340] border border-[#ee6340] rounded-[15px] relative overflow-hidden"
              >
                <span className="text-white text-[1.15rem] font-semibold">
                  Residential <br /> Vastu
                </span>
                <FaHome
                  size={"10rem"}
                  className="text-white absolute -right-[10%] -bottom-[10%]"
                />
                <div className="h-[150px] w-[150px] absolute -top-[25%] -left-[20%] rounded-full bg-white/20" />
                <div className="h-[50px] w-[50px] absolute top-[60%] rounded-full bg-white/20" />
                <div className="h-[100px] w-[100px] absolute bottom-[60%] -right-[20%] rounded-full bg-white/20" />
              </div>
              <div
                onClick={() => navigate("/vastu-industrial")}
                className="cursor-pointer hover:scale-102 transition-all .3s ease-in-out flex items-center gap-[1rem] h-[30%] bg-[#1386cb] p-2 rounded-[15px] relative overflow-hidden"
              >
                <BiSolidFactory size={"4rem"} className="text-white" />
                <span className="text-white text-[1.15rem] leading-tight font-semibold">
                  Industrial <br /> Vastu
                </span>
                <div className="h-[50px] w-[50px] absolute -top-[30%] left-[20%] rounded-full bg-white/20" />
                <div className="h-[50px] w-[50px] absolute top-[60%] rounded-full bg-white/20" />
                <div className="h-[100px] w-[100px] absolute bottom-[60%] -right-[20%] rounded-full bg-white/20" />
              </div>
            </div>
            <div className="flex flex-col w-[50%] gap-[1rem] max-[500px]:gap-[10px] max-[750px]:w-[100%]">
              <div
                onClick={() => navigate("/vastu-office")}
                className="cursor-pointer hover:scale-102 transition-all .3s ease-in-out flex items-center gap-[1rem] h-[30%] bg-[#1386cb] p-2 rounded-[15px] relative overflow-hidden"
              >
                <HiMiniBuildingOffice2 size={"4rem"} className="text-white" />
                <span className="text-white text-[1.15rem] leading-tight font-semibold">
                  Vastu for <br /> Office
                </span>
                <div className="h-[50px] w-[50px] absolute -top-[30%] left-[20%] rounded-full bg-white/20" />
                <div className="h-[50px] w-[50px] absolute top-[60%] rounded-full bg-white/20" />
                <div className="h-[100px] w-[100px] absolute bottom-[60%] -right-[20%] rounded-full bg-white/20" />
              </div>
              <div
                onClick={() => navigate("/courses")}
                className="cursor-pointer hover:scale-102 transition-all .3s ease-in-out p-2 h-[70%] bg-[#ef4e40] border border-[#ef4e40] rounded-[15px] relative overflow-hidden"
              >
                <span className="text-white text-[1.15rem] font-semibold">
                  Courses
                </span>
                <MdMenuBook
                  size={"8rem"}
                  className="text-white absolute right-[10%] bottom-[10%] max-[750px]:hidden"
                />
                <div className="h-[150px] w-[150px] absolute -top-[25%] -left-[20%] rounded-full bg-white/20" />
                <div className="h-[75px] w-[75px] absolute bottom-[0%] right-[10%] rounded-full bg-white/20" />
                <div className="h-[100px] w-[100px] absolute bottom-[60%] -right-[20%] rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
