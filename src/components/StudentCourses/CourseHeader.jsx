import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";

const CourseHeader = () => {
  const [filter, setFilter] = useState("All");
  return (
    <div className="mt-[2rem] px-6">
      <h2 className="text-lg font-semibold text-gray-800">
        What Do You Want to Learn?
      </h2>
      <div className="flex items-center flex-wrap gap-[2rem] justify-between mt-[1rem]">
        <div className="flex flex-wrap gap-[10px]">
          {["All", "Astrology", "Numerology", "Tarot", "Vastu"].map((item) => (
            <p
              onClick={() => setFilter(item)}
              className={`px-[1rem] py-[2px] rounded-[5px] cursor-pointer
                ${
                  filter === item
                    ? " bg-gradient-to-b from-[#bf1305] to-[#f64f42] text-white"
                    : "bg-gray-200 border border-gray-300"
                }
              `}
            >
              {item}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-[1rem]">
          <div className="min-shadow flex items-center gap-[10px] border border-gray-300 text-gray-800 px-[1rem] py-[.5rem] rounded-full">
            <IoIosSearch size={22} className="text-gray-700" />
            <input
              type="text"
              placeholder="Search Keywords"
              className="outline-none border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
