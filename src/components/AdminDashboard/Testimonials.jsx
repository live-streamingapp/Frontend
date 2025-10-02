import React from "react";
import { FaStar } from "react-icons/fa";
import testimonialImg from "../../assets/testimonial.svg"; 

const testimonials = [
  {
    id: 1,
    name: "Megha Sharma",
    to: "Astrologer Rakesh S.",
    rating: 5,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image: testimonialImg,
  },
  {
    id: 2,
    name: "Megha Sharma",
    to: "Astrologer Rakesh S.",
    rating: 4,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: testimonialImg,
  },
  {
    id: 3,
    name: "Megha Sharma",
    to: "Astrologer Rakesh S.",
    rating: 5,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    image: testimonialImg,
  },
  {
    id: 4,
    name: "Megha Sharma",
    to: "Astrologer Rakesh S.",
    rating: 5,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    image: testimonialImg,
  },
  {
    id: 5,
    name: "Megha Sharma",
    to: "Astrologer Rakesh S.",
    rating: 5,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    image: testimonialImg,
  },
  {
    id: 6,
    name: "Megha Sharma",
    to: "Astrologer Rakesh S.",
    rating: 5,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    image: testimonialImg,
  },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white max-w-[300px] rounded-lg shadow-md p-5 text-center border border-gray-200 mx-auto" >
            <img
              src={t.image}
              alt={t.name}
              className="w-14 h-14 rounded-full mx-auto mb-3 object-cover"/>
            <h3 className="font-semibold text-base">{t.name}</h3>
            <p className="text-center text-[12px] text-black/70 font-normal leading-[12.56px] font-sans">To: {t.to}</p>

            <div className="flex justify-center my-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < t.rating ? "text-[#ffaa00]" : "text-gray-300" } w-4 h-4`} />
              ))}
            </div>
            <p className="text-gray-600 text-xs mb-3 line-clamp-3">
              "{t.feedback}"
            </p>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 rounded-md bg-gradient-to-b from-[#BB0E00] to-[#B94400] 
                text-white text-xs font-semibold shadow-inner border border-[#BB0E00] 
                hover:opacity-90 transition">
                Approve & Publish
              </button>
              <button className="w-full border-[1.5px] border-[#ba0000] text-[#BB0E00] py-2 rounded-md text-sm font-medium">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
