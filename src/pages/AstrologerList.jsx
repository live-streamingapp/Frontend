// src/pages/AstrologerList.jsx
import React, { useState } from "react";

// import "./AstrologerList.css";
import AstrologerCard from "../components/Admin/AstrologerCard";
import Layout from "../components/Admin/Layout";
import SubTopbar from "../components/Admin/SubTopbar";

const AstrologerList = () => {
  const [tab, setTab] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const dummyAstrologers = Array(6).fill({
    id: "AST01248",
    name: "Ritwik Sharma",
    languages: ["Hindi", "English"],
    consultations: 520,
    location: "Mumbai, IN",
    experience: 5,
    rating: 4.9,
    reviews: 1030,
  });

  const liveStatusData = Array(6).fill({
    name: "Anjali Desai",
    image: "/images/anjali-desai.png",
    status: "Online",
    consultingWith: "Rahul M",
    lastActive: "12 mins ago",
  });

  const earningsData = Array(6).fill({
    name: "Kavita Rao",
    image: "/images/kavita-rao.png",
    month: "July 2025",
    consultations: "₹45,000",
    productCommission: "₹6,500",
    courseShare: "₹4,000",
    total: "₹55,500",
    processedDate: "Processed on Jul 10",
  });

  const handleTabChange = (value) => setTab(value);
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <Layout>
      <div className="astrologer-list-container">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-gray-50 px-6 py-4 mb-5">
          <h3 className="text-xl font-semibold text-gray-900 m-0">
            {tab === "monitor"
              ? "Live Status Monitor:"
              : tab === "earnings"
              ? "Payment & Earning Reports"
              : "Overview"}
          </h3>

          {tab === "monitor" ? (
            <button className="bg-white text-red-500 border border-red-500 rounded-md px-4 py-2 font-medium flex items-center gap-1.5">
              <i className="fas fa-sync-alt text-red-500"></i> Refresh
            </button>
          ) : tab === "all" ? (
            <button
              className="bg-white text-[#BB0E00] border border-[#B94400] rounded-lg px-4 py-2 font-semibold flex items-center hover:bg-[#BB0E00] hover:text-white transition"
              onClick={handleModalOpen}
            >
              <span className="text-lg mr-2">+</span> Add Astrologer
            </button>
          ) : null}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 my-5 flex-wrap">
          <button
            className={`px-4 py-2.5 rounded-md font-medium border ${
              tab === "all"
                ? "bg-[#BB0E00] text-white border-[#9B0000]"
                : "bg-[#F1F1F1] text-gray-700 border-[#9B0000] hover:bg-[#FA5446] hover:text-white"
            }`}
            onClick={() => handleTabChange("all")}
          >
            All Astrologers
          </button>

          <button
            className={`px-4 py-2.5 rounded-md font-medium border ${
              tab === "approval"
                ? "bg-[#BB0E00] text-white border-[#9B0000]"
                : "bg-[#F1F1F1] text-gray-700 border-[#9B0000] hover:bg-[#FA5446] hover:text-white"
            }`}
            onClick={() => handleTabChange("approval")}
          >
            Approval Requests
          </button>

          <button
            className={`px-4 py-2.5 rounded-md font-medium border ${
              tab === "monitor"
                ? "bg-[#BB0E00] text-white border-[#9B0000]"
                : "bg-[#F1F1F1] text-gray-700 border-[#9B0000] hover:bg-[#FA5446] hover:text-white"
            }`}
            onClick={() => handleTabChange("monitor")}
          >
            Live Status Monitor
          </button>

          <button
            className={`px-4 py-2.5 rounded-md font-medium border ${
              tab === "earnings"
                ? "bg-[#BB0E00] text-white border-[#9B0000]"
                : "bg-[#F1F1F1] text-gray-700 border-[#9B0000] hover:bg-[#FA5446] hover:text-white"
            }`}
            onClick={() => handleTabChange("earnings")}
          >
            Payment & Earnings
          </button>
        </div>

        {/* Tab Content */}
        {tab === "all" && (
          <div className="grid grid-cols-3 gap-5 py-5">
            {dummyAstrologers.map((astro, index) => (
              <AstrologerCard key={index} astrologer={astro} />
            ))}
          </div>
        )}

        {tab === "approval" && (
          <div className="grid grid-cols-3 gap-6 mt-8">
            {dummyAstrologers.map((astro, idx) => (
              <div
                className="bg-white rounded-xl shadow-sm p-6 text-center"
                key={idx}
              >
                <img
                  className="w-20 h-20 object-cover rounded-full border-2 border-red-600 mx-auto"
                  src="/images/yash.png"
                  alt="Yash Kothari"
                />
                <h4 className="font-semibold text-base text-black mt-3 mb-1">
                  Yash Kothari
                </h4>
                <p className="text-sm text-gray-500">M.A. Astrology</p>
                <p className="text-xs text-gray-400 mb-3">Applied: Jul 13</p>
                <div className="flex justify-center gap-2">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold text-sm">
                    Approve
                  </button>
                  <button className="bg-white border border-red-500 text-red-500 px-4 py-2 rounded-md font-semibold text-sm">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "monitor" && (
          <div className="live-status-section">
            <div className="grid grid-cols-3 gap-5 py-5">
              {liveStatusData.map((astro, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm flex relative p-4"
                >
                  <div className="w-1.5 h-full bg-gradient-to-b from-red-600 to-orange-500 rounded-l-md absolute left-0 top-0"></div>
                  <img
                    src={astro.image}
                    alt={astro.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {astro.name}
                    </h4>
                    <p className="text-green-500 font-medium">
                      🟢 {astro.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      👤 Consulting with:{" "}
                      <strong>{astro.consultingWith}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      🕒 {astro.lastActive}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "earnings" && (
          <div className="grid grid-cols-3 gap-6 mt-8">
            {earningsData.map((entry, index) => (
              <div
                className="bg-white rounded-xl shadow-sm pb-1 relative border-b-4 border-red-600"
                key={index}
              >
                {/* Header */}
                <div className="flex justify-between items-center p-5">
                  <div className="flex items-center">
                    <img
                      src="/images/kavita-rao.png"
                      alt="Kavita Rao"
                      className="w-12 h-12 rounded-full bg-gray-200 p-1 object-contain"
                    />
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900">
                        Kavita Rao
                      </h4>
                      <p className="text-xs text-gray-500">Astrologer</p>
                    </div>
                  </div>
                  <button className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-md">
                    Download Report
                  </button>
                </div>

                {/* Divider */}
                <hr className="border-t border-gray-200 mx-5" />

                {/* Payment Details */}
                <div className="p-5 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">🌐 Month:</span>
                    <span>July 2025</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">
                      💬 Consultations:
                    </span>
                    <span>₹45,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">
                      🛒 Product Commission:
                    </span>
                    <span>₹6,500</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">
                      📘 Course Revenue Share:
                    </span>
                    <span>₹4,000</span>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <div className="font-bold text-gray-900 mb-2">
                    💰 Total Payout: ₹55,500
                  </div>
                  <div className="text-green-500 text-xs">
                    Processed on <span className="font-semibold">Jul 10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center my-5">
          <button className="bg-black text-white font-bold px-5 py-2.5 rounded-lg">
            Load More
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mb-5">
          © 2025 Vastu Abhishek. All rights reserved.
        </footer>

        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={handleModalClose}
          >
            <div
              className="bg-white rounded-xl p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Add New Astrologer
              </h3>
              <form className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Languages (comma separated)"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Experience (in years)"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-2.5 rounded-md mt-2"
                >
                  Add Astrologer
                </button>
              </form>
              <button
                className="mt-4 bg-gray-200 px-4 py-2 rounded-md w-full"
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AstrologerList;
