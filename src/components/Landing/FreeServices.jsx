import React from "react";
import { CgChevronRight } from "react-icons/cg";
import { PiStarOfDavidLight, PiStarOfDavidThin } from "react-icons/pi";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import { MdMenuBook } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FreeServices = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto  px-[1rem] flex flex-col-reverse items-center md:flex-row gap-10 md:gap-16 justify-between">
          {/* Left: Cards */}
          <div className="flex-1 min-w-[320px] flex flex-col gap-5 px-[1rem] w-full">
            {[
              {
                icon: icon1,
                title: "Kundli",
                color: "from-red-500 to-red-400",
              },
              {
                icon: icon2,
                title: "Name Numerology",
                color: "from-blue-500 to-blue-400",
                path: "/name-calculator",
              },
              {
                icon: icon3,
                title: "Free Vastu courses",
                color: "from-orange-500 to-orange-400",
              },
            ].map(({ icon, title, color, path }) => (
              <>
                <div
                  onClick={() => {
                    if (path) {
                      navigate(path);
                    }
                  }}
                  key={title}
                  className={`flex justify-between items-center gap-4 p-5 rounded-xl text-white bg-gradient-to-r ${color} shadow-lg transition-transform transform hover:scale-105 hover:rotate-y-6 cursor-pointer relative overflow-hidden`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-center gap-[1rem]">
                    <span className="text-2xl rounded-full">
                      <img src={icon} alt="" className="h-[60px]" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                  <div className="h-[50px] w-[50px] absolute top-[70%] left-[40%] rounded-full bg-white/20" />
                  <div className="h-[50px] w-[50px] absolute -top-[20%] right-[20%] rounded-full bg-white/20" />
                  <CgChevronRight size={"2rem"} />
                </div>
              </>
            ))}
          </div>

          {/* Right: Text */}
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Free Services</h2>
            <p className="text-base text-gray-600 leading-tight">
              Discover our complimentary tools designed to help you understand
              the fundamentals of Vastu and personal astrology. Whether you're
              exploring Kundli charts, decoding numerology, or checking Panchang
              — our free tools are here to guide your spiritual journey.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FreeServices;
