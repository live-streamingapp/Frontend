import React from "react";
import { useParams } from "react-router-dom";
// import "./AstrologerProfile.css";

const AstrologerProfile = () => {
  const { id } = useParams();

  // Dummy data — will replace with API later
  const astrologer = {
    id: id,
    name: "Ritwik Sharma",
    languages: ["Hindi", "English"],
    consultations: 520,
    location: "Mumbai, IN",
    experience: 5,
    rating: 4.9,
    reviews: 1200,
    email: "ritwik@example.com",
    phone: "+91 9876543210",
  };

  return (
    <div className="profile-page flex justify-center items-center p-8">
      <div className="profile-card bg-white rounded-xl p-8 shadow-lg max-w-[500px] w-full text-center">
        <img
          className="profile-img w-24 h-24 rounded-full mx-auto mb-4"
          src="https://via.placeholder.com/100"
          alt={astrologer.name}
        />
        <h2 className="text-2xl font-bold mb-2">{astrologer.name}</h2>
        <p className="mb-1">
          <strong>ID:</strong> {astrologer.id}
        </p>
        <p className="mb-1">
          <strong>Languages:</strong> {astrologer.languages.join(", ")}
        </p>
        <p className="mb-1">
          <strong>Consultations:</strong> {astrologer.consultations}
        </p>
        <p className="mb-1">
          <strong>Location:</strong> {astrologer.location}
        </p>
        <p className="mb-1">
          <strong>Experience:</strong> {astrologer.experience} years
        </p>
        <p className="mb-1">
          <strong>Email:</strong> {astrologer.email}
        </p>
        <p className="mb-1">
          <strong>Phone:</strong> {astrologer.phone}
        </p>
        <p className="rating text-orange-600 font-bold mt-4">
          ⭐ {astrologer.rating} ({astrologer.reviews} reviews)
        </p>

        <div className="profile-actions flex justify-center gap-4 mt-8">
          <button className="edit-btn bg-blue-600 text-white px-5 py-2 rounded-md">
            Edit Profile
          </button>
          <button
            className="back-btn bg-gray-300 px-5 py-2 rounded-md"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AstrologerProfile;
