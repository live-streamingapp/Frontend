import React from "react";
import { PiStarOfDavidLight } from "react-icons/pi";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import { useNavigate } from "react-router-dom";

const PremiumServices = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <section className="py-10 bg-white text-center">
        <div className="max-w-7xl mx-auto px-[1rem]">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black">Premium Services</h2>
            <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
              Unlock the full potential of your spaces with our comprehensive
              premium Vastu consultation services.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                title: "Numero Vastu Consultation",
                color: "from-red-600 to-red-400",
                text: "text-red-600",
                icon: icon1,
                path: "/numero-consultation",
              },
              {
                title: "Astrology Consultation",
                color: "from-blue-600 to-blue-400",
                text: "text-blue-600",
                icon: icon3,
                path: "/astrology-consultation",
              },
              {
                title: "Vastu Consultation",
                color: "from-orange-600 to-orange-400",
                text: "text-orange-600",
                icon: icon2,
                path: "/vastu-consultation",
              },
              {
                title: "Logo Designing Consultation",
                color: "from-green-600 to-green-400",
                text: "text-orange-600",
                icon: icon2,
                path: "/services",
              },
            ].map(({ title, color, text, icon, path }) => (
              <div
                key={title}
                className={`relative w-[280px] p-6 rounded-3xl text-white bg-gradient-to-br ${color} shadow-lg transform transition-transform hover:-translate-y-2 hover:scale-105 overflow-hidden`}
              >
                <div className="h-[150px] w-[150px] absolute -top-[10%] -left-[10%] rounded-full bg-white/20" />
                <div className="h-[75px] w-[75px] absolute -bottom-[10%] -right-[10%] rounded-full bg-white/20" />
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="text-4xl mb-4 flex flex-col items-center gap-[1rem]">
                    <img src={icon} alt="" className="h-[60px]" />
                    <h3 className="text-xl font-semibold mb-6">{title}</h3>
                  </div>
                  <button
                    onClick={() => navigate(path)}
                    className={`get-btn bg-white px-6 py-2 rounded-[10px] font-bold flex items-center justify-center transition-transform hover:scale-105 mx-auto cursor-pointer ${text}`}
                  >
                    Get <span className="ml-2 font-bold">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PremiumServices;
