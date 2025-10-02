import React, { useState } from "react";
import { useEffect } from "react";
import { BsDot } from "react-icons/bs";
import axios from "axios";

const Instructor = () => {
  const [instructor, setInstructor] = useState([]);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/instructors`
        );
        setInstructor(res.data.data[0]);
        console.log("instructor", res.data.data[0]);
      } catch (err) {
        console.log("Error while fetching instructor details", err);
      }
    };
    fetchInstructor();
  }, []);

  if (!instructor) {
    return (
      <div className="mx-[1.5rem]">
        <h2 className="text-[1.25rem] font-semibold">Instructor</h2>
        <p className="text-gray-500">No instructor information available.</p>
      </div>
    );
  }

  return (
    <div className="mx-[1.5rem]">
      <h2 className="text-[1.25rem] font-semibold">Instructor</h2>
      <p className="font-semibold text-[#BB0E00] mt-[.5rem]">
        {instructor.name}
      </p>
      <p>{instructor.bio}</p>
      <div className="my-[1rem] flex items-center gap-[2rem]">
        {instructor.profileImage && (
          <img
            src={instructor.profileImage}
            alt="profile"
            className="h-[100px] w-[100px] object-cover rounded-full border border-gray-300"
          />
        )}
        <ul>
          {instructor.specialties?.map((item, idx) => (
            <li key={idx} className="flex items-center">
              <BsDot size={24} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Instructor;
