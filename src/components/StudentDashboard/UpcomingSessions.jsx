import React from "react";
import { BsPlayCircleFill, BsStarHalf } from "react-icons/bs";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UpcomingSessions = ({ recentBookings = [] }) => {
	const navigate = useNavigate();

	const hasBookings = recentBookings && recentBookings.length > 0;
	const nextBooking = hasBookings ? recentBookings[0] : null;

	return (
		<div className="relative flex flex-col justify-between gap-[1rem] flex-1 h-[350px] rounded-xl bg-gradient-to-br from-[#bb1101] via-[#ba4302] to-[#c73b01] overflow-hidden p-4 min-shadow min-w-[300px]">
			<BsStarHalf
				className="absolute top-[10%] left-[10%] opacity-30 text-red-400"
				size={22}
			/>
			<BsStarHalf
				className="absolute top-[40%] left-[20%] opacity-30 text-red-400"
				size={25}
			/>
			<BsStarHalf
				className="absolute bottom-[10%] right-[10%] opacity-30 text-red-400"
				size={22}
			/>
			<div className="absolute -bottom-[25%] -left-[15%] h-[200px] w-[200px] bg-red-400 opacity-30 rounded-full " />
			<div className="absolute -top-[30%] -right-[20%] h-[300px] w-[300px] bg-red-400 opacity-30 rounded-full " />

			<div className="flex flex-col justify-between z-2 h-full">
				<div>
					<h2 className="text-white/90 text-[1.15rem] font-semibold mb-2">
						{hasBookings ? "Recent Activity" : "Upcoming Sessions"}
					</h2>

					{hasBookings ? (
						<div className="space-y-2">
							<p className="text-white font-medium text-sm">
								Latest: {nextBooking.title}
							</p>
							<div className="flex items-center gap-2 text-white/80 text-xs">
								<FaCalendarAlt size={12} />
								<span>{new Date(nextBooking.date).toLocaleDateString()}</span>
							</div>
							<div className="flex items-center gap-2 text-white/80 text-xs">
								<span
									className={`px-2 py-1 rounded text-xs ${
										nextBooking.status === "completed"
											? "bg-green-500/30"
											: nextBooking.status === "pending"
											? "bg-yellow-500/30"
											: "bg-blue-500/30"
									}`}
								>
									{nextBooking.status}
								</span>
							</div>
						</div>
					) : (
						<p className="text-[1.2rem] text-white font-medium leading-tight">
							Ready to start your spiritual journey? Book your first
							consultation today!
						</p>
					)}
				</div>

				<div className="flex items-center gap-[1.5rem] z-2">
					<button
						onClick={() => navigate(hasBookings ? "/my-bookings" : "/services")}
						className="w-fit px-[16px] py-[8px] whitespace-nowrap bg-white rounded-lg font-medium text-gray-800 hover:bg-gray-100 transition-colors"
					>
						{hasBookings ? "View All" : "Book Session"}
					</button>
					<BsPlayCircleFill
						size={"2.5rem"}
						className="text-white cursor-pointer hover:scale-105 transition-transform"
						onClick={() => navigate("/courses")}
					/>
				</div>
			</div>

			<img
				src="/images/chakra.png"
				alt="Chakra"
				className="absolute right-2 top-8 h-[200px] z-2 opacity-80"
			/>
		</div>
	);
};

export default UpcomingSessions;
