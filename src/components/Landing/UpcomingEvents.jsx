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
		}, 3000);
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
		<section className="py-10 sm:py-12 md:py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-5">
				<h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">
					Upcoming Events
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
					{/* Left Gradient Card */}
					<div className="bg-[radial-gradient(circle_at_center,_#dc4d00_30%,_#ab0101)] p-5 sm:p-6 rounded-2xl shadow-xl relative overflow-hidden transition-all duration-700 border min-h-[320px] sm:h-[380px]">
						<img
							src="/images/design1.png"
							alt=""
							className="absolute h-full right-0 top-0 opacity-80"
						/>
						<img
							src="/images/design2.png"
							alt=""
							className="absolute h-full left-0 top-0 opacity-80"
						/>

						{/* Title */}
						<h2 className="text-white text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 transition-all duration-700 px-2">
							<span
								style={{
									WebkitTextStroke: "1px white",
									color: "transparent",
								}}
							>
								{events[current].title}
							</span>{" "}
						</h2>

						{/* Circular Event Image */}
						<div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-3 sm:mb-4 rounded-full border-2 border-white shadow-lg overflow-hidden transform transition-transform duration-700 hover:rotate-3 hover:scale-105">
							<img
								src={events[current].thumbnail || "/images/event.png"}
								alt="Event"
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Event Details */}
						<p className="text-white font-semibold text-sm sm:text-base">
							<strong>Date:</strong>{" "}
							{new Date(events[current].startTime).toLocaleDateString()}
						</p>
						<p className="text-white font-semibold text-sm sm:text-base truncate">
							<strong>Location:</strong> {events[current].location}
						</p>
					</div>

					{/* Right Text Section */}
					<div className="px-2">
						<h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
							{events[current].title}
						</h3>
						<p className="text-gray-700 leading-tight text-sm sm:text-base">
							{events[current].description}
						</p>
					</div>
				</div>
			</div>

			{/* 🔹 Dots Indicator */}
			<div className="flex justify-center gap-2 mt-4 sm:mt-6">
				{events.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrent(index)}
						className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all duration-300 border border-gray-300 ${
							current === index ? "bg-gray-400 scale-110" : "bg-gray-100"
						}`}
					/>
				))}
			</div>
		</section>
	);
};

export default UpcomingEvents;
