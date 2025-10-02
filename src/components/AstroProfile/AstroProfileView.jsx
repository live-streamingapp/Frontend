import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import banner from "../../assets/banner.png";
import profile from "../../../public/images/astrologer-avatar.png";
import { PiStarOfDavidLight } from "react-icons/pi";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const contacts = [
  { icon: <FaPhoneAlt size={24} />, link: "tel:+911234567890" },
  { icon: <IoMdMail size={24} />, link: "mailto:abhishek@example.com" },
  { icon: <FaWhatsapp size={24} />, link: "https://wa.me/911234567890" },
];
const AstroProfileView = () => {
  return (
    <>
      <Header />
      <div className="px-[1.5rem] py-[1.5rem]">
        <h2 className="text-[1.25rem] font-semibold max-[500px]:text-center mb-[1rem]">
          My Profile
        </h2>
        <div className="mt-[1rem] relative max-[500px]:hidden">
          <img
            src={banner}
            alt="banner"
            className="h-full object-cover w-full"
          />
          <div className="flex items-center justify-center bg-white h-[180px] w-[180px] absolute -bottom-[20%] left-[50%] -translate-x-[50%] rounded-full overflow-hidden p-2">
            <div className="border border-red-600 min-shadow h-full w-full overflow-hidden rounded-full">
              <img
                src={profile}
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="hidden mx-auto max-[500px]:block border border-red-600 min-shadow h-[150px] w-[150px] overflow-hidden rounded-full">
          <img
            src={profile}
            alt="profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="max-[500px]:mt-[1rem] mt-[5rem] text-center mx-auto max-w-[500px] flex flex-col gap-[10px]">
          <h2 className="uppercase text-[1.25rem] font-semibold text-gray-700">
            Shankar
          </h2>
          <p className="text-gray-700 text-sm">
            Numerology | Astrology | Vastu
          </p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            molestias nihil praesentium sapiente, delectus numquam qui quo,
            officiis tenetur eligendi mollitia dignissimos ratione, architecto
            assumenda error sunt in repellendus est?
          </p>
        </div>
        <div className="my-[2rem] border-b border-gray-400 mx-auto max-w-[1000px] py-[1rem]">
          <h2 className="text-center font-semibold text-gray-700">
            Specialized in:
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mt-[1rem]">
            {[
              {
                title: "Astro Vastu Fortune Report",
                color: "from-red-600 to-red-400",
                text: "text-red-600",
              },
              {
                title: "Vastu Evaluation Report",
                color: "from-blue-600 to-blue-400",
                text: "text-blue-600",
              },
              {
                title: "Numerology Report",
                color: "from-orange-600 to-orange-400",
                text: "text-orange-600",
              },
            ].map(({ title, color, text }) => (
              <div
                key={title}
                className={`relative w-[280px] p-6 rounded-3xl text-white bg-gradient-to-br ${color} shadow-lg transform transition-transform hover:-translate-y-2 hover:scale-105 overflow-hidden`}
              >
                <div className="h-[150px] w-[150px] absolute -top-[10%] -left-[10%] rounded-full bg-white/20" />
                <div className="h-[75px] w-[75px] absolute -bottom-[10%] -right-[10%] rounded-full bg-white/20" />
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="text-4xl mb-4 flex flex-col items-center gap-[1rem]">
                    <PiStarOfDavidLight size={"4rem"} />
                    <h3 className="text-xl text-center font-semibold mb-6">
                      {title}
                    </h3>
                  </div>
                  {/* <button
                    className={`get-btn bg-white px-6 py-2 rounded-[10px] font-bold flex items-center justify-center transition-transform hover:scale-105 mx-auto ${text}`}
                  >
                    Get <span className="ml-2 font-bold">→</span>
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          {/* Icons Row */}
          <div className="flex gap-4">
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 text-[#c02c07] hover:bg-[#ffe6e3] transition"
              >
                {c.icon}
              </a>
            ))}
          </div>

          {/* Text */}
          <p className="text-sm text-gray-600">
            Get direct contact with Abhishek
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AstroProfileView;
