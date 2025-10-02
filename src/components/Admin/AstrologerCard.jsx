// src/components/AstrologerCard.jsx
import React from "react";
// import avatar from "./images/astrologer-avatar.png";
// import "./AstrologerCard.css";

const AstrologerCard = ({ astrologer }) => {
  return (
    <div className="astro-card flex rounded-xl shadow-md overflow-hidden bg-white w-full min-w-[350px]">
      {/* Left Strip */}
      <div className="bg-gradient-to-r from-[#BB0E00] to-[#B94400] text-white shadow-md rounded-xl p-5">
        <img
          src="/images/astrologer-avatar.png"
          alt="Astrologer"
          className="left-avatar w-[70px] h-[70px] rounded-full object-cover mb-2"
        />
        <div className="astro-name font-bold text-base mb-1">
          {astrologer.name}
        </div>
        <div className="astro-id text-sm mb-1">ID: {astrologer.id}</div>
        <div className="astro-rating text-amber-400 text-sm font-semibold">
          ⭐ {astrologer.rating} ({astrologer.reviews} reviews)
        </div>
      </div>

      {/* Right Content */}
      <div className="card-content flex-1 p-4 flex flex-col justify-between bg-white text-gray-800">
        <div>
          <p className="mb-2">
            <strong>Languages:</strong> {astrologer.languages.join(", ")}
          </p>
          <p className="mb-2">
            <strong>Consultations:</strong> {astrologer.consultations} members
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {astrologer.location}
          </p>
          <p className="mb-2">
            <strong>Experience:</strong> {astrologer.experience} years
          </p>
        </div>

        <div className="card-buttons flex justify-between mt-4">
          <button className="view-btn bg-[#e63946] text-white px-3 py-1.5 rounded-md">
            View
          </button>
          <button className="bg-white text-[#000000]] border border-[#B94400] px-4 py-2 rounded-md font-semibold hover:bg-[#000000] hover:text-white transition">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AstrologerCard;
