import React from "react";
import { BsFillPatchCheckFill, BsPatchCheck } from "react-icons/bs";
import { IoIosStar } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";

const ReviewCard = ({ crsDetails }) => {
  return (
    <div className="w-[430px] bg-white p-[.75rem] rounded-xl min-shadow">
      <img
        src={crsDetails.image}
        alt=""
        className="object-cover h-[200px] object-center w-full"
      />
      <div className="text-black my-[1rem]">
        <h3 className="text-[1.25rem] font-semibold">{crsDetails.title}</h3>
        <p className="leading-tight">{crsDetails.description}</p>
        <p className="text-sm text-black/70">
          Created By: {crsDetails.createdBy}
        </p>
      </div>
      <div className="flex gap-[.5rem] overflow-hidden rounded-xl  pr-[5px] border-2 border-gray-300 text-gray-700">
        <div className="flex-1 flex flex-col items-center justify-center text-white bg-[#BB0E00]">
          <BsPatchCheck size={22} /> <span className="text-sm">Premium</span>{" "}
        </div>

        <div className="flex-1 text-sm p-[5px]">
          Master advanced skills with expert guidance.
        </div>
        <div className="flex flex-col items-center p-[5px]">
          <span>{crsDetails.rating}</span>
          <span className="flex items-center">
            {[...Array(Math.floor(crsDetails.rating))].map((_, i) => (
              <IoIosStar key={i} className="text-yellow-400 inline" />
            ))}
          </span>
          <span className="text-sm">Ratings</span>
        </div>
        <div className="flex flex-col items-center p-[5px]">
          <span className="">
            <PiStudentFill size={22} />{" "}
          </span>
          <span>{crsDetails.learners}</span>
          <span className="text-sm leading-tight">Learners</span>
        </div>
      </div>
      <button className="mt-[1rem] w-full bg-[#BB0E00] text-white rounded-md py-[8px] cursor-pointer">
        Buy Course
      </button>
      <button className="w-full rounded-md text-[#BB0E00] font-semibold border-2 border-[#BB0E00] py-[6px] mt-[10px] cursor-pointer">
        Add to Cart
      </button>
    </div>
  );
};

export default ReviewCard;
