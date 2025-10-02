import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const WhatLearn = ({ crsDetails }) => {
  return (
    <div className="max-w-[500px] border p-[1rem] rounded-xl border-gray-400">
      <h2 className="text-[1.25rem] font-semibold mb-[1rem]">
        What You'll Learn
      </h2>
      <ul className="grid gap-x-[4rem] gap-y-[1rem] grid-cols-2 max-[1000px]:grid-cols-1 flex-wrap">
        {crsDetails.whatYouWillLearn.map((item, idx) => (
          <li key={idx} className="flex gap-[10px] min-w-[200px]">
            <span>
              <IoMdCheckmark className="text-[#BB0E00] mt-[5px]" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatLearn;
