import React, { useState, useEffect } from "react";
import axios from "axios";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);

  // 🔹 Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/events`
        );
        setEvents(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // 🔹 Auto slide
  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [events]);

  if (events.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="text-center text-gray-600">No events available</div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <h3 className="text-2xl text-center md:text-3xl font-bold mb-6">
          Upcoming Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Gradient Card */}
          <div className="bg-[radial-gradient(circle_at_center,_#dc4d00_30%,_#ab0101)] p-6 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-700 border h-[380px]">
            <img
              src="/images/design1.png"
              alt=""
              className="absolute h-full right-0 top-0"
            />
            <img
              src="/images/design2.png"
              alt=""
              className="absolute h-full left-0 top-0"
            />

            {/* Title */}
            <h2 className="text-white text-center text-5xl font-bold mb-4 transition-all duration-700">
              <span
                style={{
                  WebkitTextStroke: "1px white",
                  color: "transparent",
                }}
              >
                {events[current].title}
              </span>{" "}
              {/* {new Date(events[current].startTime).getFullYear()} */}
            </h2>

            {/* Circular Event Image */}
            <div className="w-40 h-40 mx-auto mb-4 rounded-full border-2 border-white shadow-lg overflow-hidden transform transition-transform duration-700 hover:rotate-3 hover:scale-105">
              <img
                src={events[current].thumbnail || "/images/event.png"}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Details */}
            <p className="text-white font-semibold">
              <strong>Date:</strong>{" "}
              {new Date(events[current].startTime).toLocaleDateString()}
            </p>
            <p className="text-white font-semibold">
              <strong>Location:</strong> {events[current].location}
            </p>
          </div>

          {/* Right Text Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {events[current].title}
            </h3>
            <p className="text-gray-700 leading-tight">
              {events[current].description}
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 border border-gray-300 ${
              current === index ? "bg-gray-400 scale-110" : "bg-gray-100"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
