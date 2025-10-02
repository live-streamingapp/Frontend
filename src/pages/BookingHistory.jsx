import React from "react";

const bookings = [
  {
    id: "STU-2025-0378",
    name: "Aditi R. Sharma",
    course: "Advanced Vedic Astrology",
    date: "Jul 11, 2025",
    time: "6:00 PM",
    astrologer: "Rajeev Malhotra",
    payment: 799,
    payout: 799,
    status: "Paid",
    image: "/images/aditi.png",
  },
  {
    id: "STU-2025-0379",
    name: "Rahul P. Kumar",
    course: "Advanced Vedic Astrology",
    date: "Aug 05, 2025",
    time: "4:30 PM",
    astrologer: "Priya Sharma",
    payment: 899,
    payout: 899,
    status: "Paid",
    image: "/images/aditi.png",
  },
   {
    id: "STU-2025-0378",
    name: "Aditi R. Sharma",
    course: "Advanced Vedic Astrology",
    date: "Jul 11, 2025",
    time: "6:00 PM",
    astrologer: "Rajeev Malhotra",
    payment: 799,
    payout: 799,
    status: "Paid",
    image: "/images/aditi.png",
  },
   {
    id: "STU-2025-0378",
    name: "Aditi R. Sharma",
    course: "Advanced Vedic Astrology",
    date: "Jul 11, 2025",
    time: "6:00 PM",
    astrologer: "Rajeev Malhotra",
    payment: 799,
    payout: 799,
    status: "Paid",
    image: "/images/aditi.png",
  },
   {
    id: "STU-2025-0378",
    name: "Aditi R. Sharma",
    course: "Advanced Vedic Astrology",
    date: "Jul 11, 2025",
    time: "6:00 PM",
    astrologer: "Rajeev Malhotra",
    payment: 799,
    payout: 799,
    status: "Paid",
    image: "/images/aditi.png",
  },
   {
    id: "STU-2025-0378",
    name: "Aditi R. Sharma",
    course: "Advanced Vedic Astrology",
    date: "Jul 11, 2025",
    time: "6:00 PM",
    astrologer: "Rajeev Malhotra",
    payment: 799,
    payout: 799,
    status: "Paid",
    image: "/images/aditi.png",
  },
  // Add more booking objects here to fill rows
];

export default function BookingHistory() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((b, index) => (
        <div key={index} className="bg-[#E1E1E1] p-4 rounded-xl">
          {/* Student Info */}
          <div className="bg-white p-4 rounded-xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={b.image}
                alt={b.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="font-bold text-gray-900">{b.name}</h2>
                <p className="text-xs text-gray-500">ID: {b.id}</p>
                <p className="text-sm text-gray-700">{b.course}</p>
              </div>
            </div>
            <img src="/images/3dots.png" alt="options" className="w-5 h-5" />
          </div>

          {/* Details */}
          <div className="bg-white mt-3 p-4 rounded-xl space-y-2">
            {/* Date */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src="/images/time-icon.png" alt="date" className="w-4 h-4" />
                <span className="text-gray-600">Date:</span>
              </div>
              <span className="font-medium text-gray-800">{b.date}</span>
            </div>

            {/* Time */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src="/images/time-icon.png" alt="time" className="w-4 h-4" />
                <span className="text-gray-600">Time:</span>
              </div>
              <span className="font-medium text-gray-800">{b.time}</span>
            </div>

            {/* Astrologer */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src="/images/time-icon.png" alt="astrologer" className="w-4 h-4" />
                <span className="text-gray-600">Astrologer:</span>
              </div>
              <span className="font-medium text-gray-800">{b.astrologer}</span>
            </div>

                            {/* Payment */}
                <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src="/images/time-icon.png" alt="payment" className="w-4 h-4" />
                    <span className="text-gray-600">Payment:</span>
                </div>
                <span className="font-medium text-gray-800">₹{b.payment}</span>
                </div>

                {/* Total Payout */}
                <div className="flex justify-between items-center border-t border-[#BB0E00] pt-2">
                <div className="flex items-center gap-2">
                    <img src="/images/time-icon.png" alt="payout" className="w-4 h-4" />
                    <span className="text-gray-600">Total Payout:</span>
                </div>
                <div className="text-right">
                    <p className="font-bold text-gray-900">₹{b.payout}</p>
                    <p
                    className={`text-xs font-semibold ${
                        b.status === "Paid" ? "text-[#189200]" : "text-red-500"
                    }`}
                    >
                    {b.status}
                    </p>
                </div>
            </div>

          </div>

          {/* Footer Strip */}
          <div className="w-full h-3 rounded-b-xl" style={{ backgroundColor: "#BB0E00" }}></div>
        </div>
      ))}
    </div>
  );
}
