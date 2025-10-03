import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdLanguage } from "react-icons/md";
import { IoCalendarSharp } from "react-icons/io5";
import { PiSubtitlesFill } from "react-icons/pi";
import ReviewCard from "./ReviewCard";
import WhatLearn from "./WhatLearn";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import CourseContent from "./CourseContent";
import Requirements from "./Requirements";
import Instructor from "./Instructor";
import Feedback from "./Feedback";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { ROLES } from "../../utils/constants";

const CourseDetails = () => {
	const { id } = useParams();
	const [crsDetails, setCrsDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const currentUser = useAppSelector(selectCurrentUser);
	const isAdmin =
		currentUser?.role === ROLES.ADMIN || currentUser?.role === ROLES.ASTROLOGER;

	// Fetch course details
	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/courses/${id}`
				);
				setCrsDetails(res.data.data);
			} catch (err) {
				console.error("Error fetching course:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchCourse();
	}, [id]);

	if (loading) return <p className="text-center mt-10">Loading course...</p>;
	if (!crsDetails) return <p className="text-center mt-10">Course not found</p>;

	return (
		<>
			<div className="flex flex-col bg-linear-to-br from-[#BB0E00] to-[#B94400] my-[2rem] text-white px-[2.5rem] py-[1.5rem] mt-6">
				<h3 className="text-2xl font-semibold">{crsDetails.title}</h3>
				<p className="max-w-[50%]">{crsDetails.description}</p>
				<p className="text-sm text-white/80">
					Created By: {crsDetails.createdBy}
				</p>
				<p className="mt-[1rem] flex gap-[10px] items-end">
					<span className="text-2xl font-semibold">
						₹ {crsDetails.price}.00/-
					</span>
					<span className="line-through text-white/90">
						₹ {crsDetails.originalPrice}/-
					</span>
				</p>
				<p className="text-sm">
					{crsDetails.includedInPlans &&
						"This Premium course is included in plans"}
				</p>

				{/* <div className="my-[1rem] flex gap-[10px]">
          <button className="bg-white rounded-[5px] text-red-600 px-[10px] py-[8px] text-sm font-semibold cursor-pointer">
            Continue with Course
          </button>
          <button
            onClick={() => navigate("/group-discussion")}
            className="bg-white rounded-[5px] text-red-600 px-[10px] py-[8px] text-sm font-semibold cursor-pointer"
          >
            Discussion Forum
          </button>
        </div> */}

				<div className="text-sm flex flex-wrap items-center gap-x-[1rem]">
					<span className="flex items-center gap-[5px]">
						<IoCalendarSharp /> Last Updated {crsDetails.lastUpdated}
					</span>
					<span className="flex items-center gap-[5px]">
						<MdLanguage size={18} /> {crsDetails.languages?.join(", ")}
					</span>
					<span className="flex items-center gap-[5px]">
						<PiSubtitlesFill size={18} /> {crsDetails.subtitles?.join(", ")}
					</span>
				</div>
			</div>

			{/* Right Review Card */}
			<div className="max-[1000px]:hidden absolute right-[30px] top-[150px]">
				<ReviewCard crsDetails={crsDetails} disableActions={isAdmin} />
			</div>

			<div className="flex gap-[1rem] mx-[1.5rem] max-[750px]:flex-col">
				<div className="flex-1">
					{isAdmin && (
						<div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
							Admin accounts are restricted to management actions only. Course
							enrollment and student purchases are disabled.
						</div>
					)}
					<WhatLearn crsDetails={crsDetails} />
				</div>
				<div className="hidden max-[1000px]:flex flex-1">
					<ReviewCard crsDetails={crsDetails} disableActions={isAdmin} />
				</div>
			</div>

			<div className="mx-[1.5rem] my-[2rem]">
				<h2 className="text-[1.25rem] font-semibold">Explore Related Topics</h2>
				<div className="flex gap-[1rem] my-[1rem]">
					{crsDetails.relatedTopics?.map((item, i) => (
						<span
							key={i}
							className="bg-gray-200 px-[10px] py-[5px] rounded-md text-gray-800 text-sm"
						>
							{item}
						</span>
					))}
				</div>
			</div>

			<div className="mx-[1.5rem] w-fit">
				<h2 className="font-semibold text-[1.25rem] mb-[.75rem]">
					This Course Includes
				</h2>
				<ul className="grid grid-cols-2 gap-x-[2rem]">
					{crsDetails.courseIncludes?.map((item, i) => (
						<li key={i} className="flex items-center gap-[10px]">
							<IoMdCheckmarkCircleOutline
								className="text-[#BB0E00]"
								size={20}
							/>
							<span className="text-gray-800">{item}</span>
						</li>
					))}
				</ul>
			</div>

			<CourseContent crsDetails={crsDetails} />
			<Requirements crsDetails={crsDetails} />

			<div className="max-w-[600px] m-[1.5rem]">
				<h2 className="text-[1.25rem] font-semibold">Description</h2>
				<p>{crsDetails.detailedDescription}</p>
			</div>

			<Instructor />
			<Feedback />
		</>
	);
};

export default CourseDetails;
