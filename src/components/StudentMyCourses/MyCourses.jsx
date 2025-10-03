import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { courses } from "../../utils/constants";

const MyCourses = () => {
	return (
		<div className="mx-[1.5rem] my-[1.5rem]">
			<h2 className="font-semibold text-[1.25rem]">My Courses</h2>

			<div className="py-[1rem] flex flex-col gap-4">
				{courses.slice(0, 5).map((course) => {
					const isCompleted = course.progress === 100;
					return (
						<div
							key={course.id}
							className="flex gap-2 items-center justify-between bg-white min-shadow rounded-xl p-4 w-full"
						>
							{/* Left Section */}
							<div className="flex items-center gap-4 w-[80%] md:w-full">
								{/* Thumbnail */}
								<img
									src={course.image}
									alt={course.title}
									className="w-16 h-16 rounded-md object-cover"
								/>

								{/* Text Content */}
								<div className="">
									<h3 className="font-semibold text-gray-800 text-sm">
										{course.title}
									</h3>
									<p className="text-gray-500 text-xs">{course.description}</p>
									<p className="text-gray-400 text-xs">By {course.createdBy}</p>

									{/* Progress Bar */}
									<div className="max-[450px]:hidden mt-2 flex items-center gap-2">
										<div className="w-[200px] md:w-[350px] h-2 bg-gray-200 rounded-full overflow-hidden">
											<div
												className={`h-full ${
													isCompleted
														? "bg-green-500"
														: "bg-gradient-to-r from-[#d10000] to-[#cf6c24]"
												}`}
												style={{ width: `${course.progress}%` }}
											></div>
										</div>
										<span className="text-xs text-gray-500">
											{course.progress}%
										</span>
									</div>
								</div>
							</div>

							{/* Play Button */}
							{isCompleted ? (
								<button className="bg-[#d13b00] text-white px-4 py-1 rounded-full text-sm cursor-pointer">
									View
								</button>
							) : (
								<button className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-gradient-to-br from-red-600 to-orange-500 shadow-md text-white cursor-pointer">
									<BsPlayFill size={25} />
								</button>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MyCourses;
