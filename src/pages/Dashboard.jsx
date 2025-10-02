import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaDollarSign,
  FaRupeeSign,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";
import axios from "axios";
import AdminLayout from "../Layout/AdminLayout";

const chartData = [
  { name: "JAN", revenue: 20, total: 30 },
  { name: "FEB", revenue: 25, total: 32 },
  { name: "MAR", revenue: 15, total: 48 },
  { name: "APR", revenue: 18, total: 28 },
  { name: "MAY", revenue: 32, total: 42 },
  { name: "JUN", revenue: 17, total: 31 },
  { name: "JUL", revenue: 38, total: 45 },
  { name: "AUG", revenue: 28, total: 34 },
];

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState();
  const [enquiries, setEnquiries] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/events`,
          { withCredentials: true }
        );
        setEvents(res.data.data);
        // console.log(res.data.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/users`,
          { withCredentials: true }
        );
        setUsers(res.data.count);
        console.log(res.data.count);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/contact`,
          { withCredentials: true }
        );
        setEnquiries(res.data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
    fetchEvents();
    fetchUsers();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (events.length > 0) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prevIndex) =>
          prevIndex === events.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [events]);

  const goToPrevious = () => {
    setCurrentEventIndex(
      currentEventIndex === 0 ? events.length - 1 : currentEventIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentEventIndex(
      currentEventIndex === events.length - 1 ? 0 : currentEventIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentEventIndex(index);
  };

  return (
    <AdminLayout>
      {" "}
      <div className="flex flex-col lg:flex-row h-screen overflow-scroll bg-gray-50 hide-scrollbar">
        <div className="flex-1 w-full min-w-0 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="mt-6 lg:mt-10">
            <h2 className="font-bold text-gray-900 text-xl sm:text-2xl lg:text-3xl">
              Overview
            </h2>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:gap-6 mt-4 sm:mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                count: users,
                label: "Total Users",
                // change: "+45 users",
                gradient: "from-indigo-400 via-blue-500 to-blue-600",
                footer: "from-blue-600 to-blue-700",
                icon: <FaUser />,
              },

              {
                count: "₹2.5L",
                label: "Monthly Revenue",
                // change: "+12%",
                gradient: "from-emerald-400 via-green-500 to-green-600",
                footer: "from-green-600 to-green-700",
                icon: <FaRupeeSign />,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr ${card.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white text-lg sm:text-xl">
                        {card.icon}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      <span className="font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
                        {card.count}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-full h-12 sm:h-14 bg-gradient-to-r ${card.footer} flex items-center justify-between px-4 sm:px-6 rounded-b-2xl`}
                >
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {card.label}
                  </span>
                  <span className="text-white text-lg">→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Product Sales + Chart */}
          <div className="flex flex-col xl:flex-row justify-between gap-6 mt-8 sm:mt-12">
            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {[
                { name: "Gemstones", sales: "₹45,000", icon: "💎" },
                { name: "Astrology", sales: "₹32,000", icon: "⭐" },
                { name: "Numerology", sales: "₹28,000", icon: "🔢" },
                { name: "Consultations", sales: "₹55,000", icon: "🔮" },
              ].map((product, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center text-lg">
                    {product.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {product.name}
                    </p>
                    <p className="font-bold text-gray-900 text-lg sm:text-xl">
                      {product.sales}{" "}
                      <span className="text-xs text-gray-500 font-normal">
                        Sales
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="flex-1 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 min-h-[300px]">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Revenue Analytics
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "white",
                    }}
                    labelStyle={{ fontWeight: "bold", color: "#374151" }}
                  />
                  <Bar dataKey="total" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Events & Enquiries */}
          <div className="flex flex-col xl:flex-row gap-6 mt-8 sm:mt-10">
            {/* Upcoming Events */}
            <div className="flex-1 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Upcoming Events
              </h4>

              {loading ? (
                <p>Loading events...</p>
              ) : events.length === 0 ? (
                <p>No events available</p>
              ) : (
                <div className="relative bg-gray-50 p-3 rounded-xl">
                  {/* Image Container */}
                  <div className="relative w-full overflow-hidden rounded-xl">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentEventIndex * 100}%)`,
                      }}
                    >
                      {events.map((event) => (
                        <div key={event._id} className="w-full flex-shrink-0">
                          <img
                            src={
                              event.thumbnail ||
                              "https://placehold.co/400x250?text=No+Image"
                            }
                            alt={event.title}
                            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl"
                          />

                          <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded text-sm font-semibold text-gray-800">
                            {event.title}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={goToPrevious}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <FaChevronLeft size={16} />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <FaChevronRight size={16} />
                    </button>
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {events.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`rounded-full transition-all duration-200 ${
                          index === currentEventIndex
                            ? "w-8 h-2 bg-blue-600"
                            : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* New Enquiries Section */}
            <div className="flex-1 bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              {/* Heading with Ring Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">
                    <FaBell />
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
                  New Enquiries
                </h4>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto hide-scrollbar">
                {/* Enquiry Cards */}
                {enquiries.length === 0 ? (
                  <p className="text-gray-500">No enquiries found.</p>
                ) : (
                  enquiries.map((enquiry) => (
                    <div
                      key={enquiry._id}
                      className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {enquiry.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 text-sm sm:text-base">
                            {enquiry.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            🕒{" "}
                            {new Date(enquiry.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                        Message
                      </p>
                      <p className="italic text-gray-600 mb-4 text-sm line-clamp-2">
                        "{enquiry.message}"
                      </p>
                      <div className="flex justify-end">
                        <button className="px-4 py-2 text-white rounded-lg font-medium bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-200 text-sm">
                          Quick Reply
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
