import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { ROLES } from "../../utils/constants";

export default function CourseCard({ course }) {
	const navigate = useNavigate();
	const currentUser = useAppSelector(selectCurrentUser);
	const isAdmin =
		currentUser?.role === ROLES.ADMIN || currentUser?.role === ROLES.ASTROLOGER;

	// Function to truncate description to 10 words
	const truncateDescription = (text, wordLimit) => {
		if (!text) return "";
		const words = text.split(" ");
		return words.length > wordLimit
			? words.slice(0, wordLimit).join(" ") + "..."
			: text;
	};

	return (
		<div
			key={course._id}
			className="flex flex-col shadow-md border border-gray-300 overflow-hidden rounded-xl bg-white hover:scale-[1.03] transition-all .3s ease-in-out"
		>
			<img
				src={course.image}
				alt={course.title}
				className="h-[200px] w-full object-cover p-[5px]"
			/>
			<h3 className="p-[.5rem] font-semibold">{course.title}</h3>
			<p className="px-[.5rem] text-gray-700 text-[.85rem] flex-grow">
				{truncateDescription(course.description, 10)}
			</p>
			<div className="flex items-center justify-between px-[.5rem]">
				<span className="font-bold">₹ {course.price?.toLocaleString()}</span>
				<button
					className="px-[1rem] py-[.25rem] my-[.75rem] text-gray-800 border-2 border-gray-300 rounded-[5px] cursor-pointer"
					onClick={() => navigate(`/course/${course._id}`)}
				>
					View Details
				</button>
				{!isAdmin && (
					<button className="bg-gradient-to-b from-[#bf1305] to-[#f64f42] px-[1rem] py-[.25rem] my-[.75rem] text-white rounded-[5px] cursor-pointer">
						Enroll Now
					</button>
				)}
			</div>
		</div>
	);
}
