import React from "react";
import { BsDot } from "react-icons/bs";

const Requirements = ({ crsDetails }) => {
  return (
    <div className="mx-[1.5rem]">
      <h2 className="text-[1.25rem] font-semibold">Requirements</h2>
      <ul>
        {crsDetails.requirements.map((item) => (
          <li className="flex items-center">
            <span>{<BsDot size={24} />}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requirements;
