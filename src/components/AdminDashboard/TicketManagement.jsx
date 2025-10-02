import React from "react";
import { FaBars, FaCircle } from "react-icons/fa";

const tickets = [
  {
    name: "Dhruti Sharma",
    status: "Scheduled",
    date: "25, Jul 2025",
    time: "10:00 AM",
    price: "₹2,000.00",
  },
  {
    name: "Dhruti Sharma",
    status: "Scheduled",
    date: "25, Jul 2025",
    time: "10:00 AM",
    price: "₹2,000.00",
  },
  {
    name: "Dhruti Sharma",
    status: "Scheduled",
    date: "25, Jul 2025",
    time: "10:00 AM",
    price: "₹2,000.00",
  },
  {
    name: "Dhruti Sharma",
    status: "Scheduled",
    date: "25, Jul 2025",
    time: "10:00 AM",
    price: "₹2,000.00",
  },
  {
    name: "Dhruti Sharma",
    status: "Scheduled",
    date: "25, Jul 2025",
    time: "10:00 AM",
    price: "₹2,000.00",
  },
  {
    name: "Dhruti Sharma",
    status: "Scheduled",
    date: "25, Jul 2025",
    time: "10:00 AM",
    price: "₹2,000.00",
  },
  {
    name: "Dhruti Sharma",
    status: "Scheduled",
    date: "25, Jul 2025",
    time: "10:00 AM",
    price: "₹2,000.00",
  },
];
const TicketManagement = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg border border-gray-200">
        <div className="divide-y divide-gray-200">
          {tickets.map((ticket, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-start space-x-2">
                <FaBars className="text-gray-400 mt-5" />
                <div>
                  <h3 className="font-semibold text-gray-800">{ticket.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <FaCircle className="text-green-500 w-2 h-2" />
                    <span>
                      {ticket.status} | {ticket.date} | {ticket.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {ticket.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
