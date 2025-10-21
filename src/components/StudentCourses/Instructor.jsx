import React from "react";
import { BsDot } from "react-icons/bs";
import { useInstructorsQuery } from "../../hooks/useSessionApi";

const Instructor = () => {
	// Fetch instructors using React Query
	const { data: instructors = [] } = useInstructorsQuery();
	const instructor = instructors[0];

	if (!instructor) {
		return (
			<div className="mx-[1.5rem]">
				<h2 className="text-[1.25rem] font-semibold">Instructor</h2>
				<p className="text-gray-500">No instructor information available.</p>
			</div>
		);
	}

	return (
		<div className="mx-[1.5rem]">
			<h2 className="text-[1.25rem] font-semibold">Instructor</h2>
			<p className="font-semibold text-[#BB0E00] mt-[.5rem]">
				{instructor.name}
			</p>
			<p>{instructor.bio}</p>
			<div className="my-[1rem] flex items-center gap-[2rem]">
				{instructor.profileImage && (
					<img
						src={instructor.profileImage}
						alt="profile"
						className="h-[100px] w-[100px] object-cover rounded-full border border-gray-300"
					/>
				)}
				<ul>
					{instructor.specialties?.map((item, idx) => (
						<li key={idx} className="flex items-center">
							<BsDot size={24} />
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Instructor;
