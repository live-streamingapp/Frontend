import React, { useState } from "react";
import { FaVideo, FaPlay } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

export default function CourseContent({ crsDetails }) {
	const [previewVideo, setPreviewVideo] = useState(null);
	const videos = crsDetails?.courseContent ?? [];
	const [visibleCount, setVisibleCount] = useState(6);

	return (
		<>
			<div className="max-w-[500px] m-[1.5rem]">
				<h2 className="text-[1.25rem] font-semibold mb-4">Course Content</h2>

				<div className="space-y-3">
					{videos.slice(0, visibleCount).map((item, index) => (
						<div
							key={item._id || index}
							className="flex items-center justify-between border border-gray-400 rounded-lg px-4 py-2"
						>
							<div className="flex items-center gap-3">
								<FaVideo className="text-gray-600" />
								<span className="text-sm font-medium">{item.title}</span>
							</div>

							<button className="text-gray-500">
								<IoChevronDown />
							</button>

							{item.video && (
								<button
									className="flex items-center gap-2 text-red-600 font-medium"
									onClick={() => setPreviewVideo(item.video)}
								>
									<FaPlay /> Preview
								</button>
							)}
						</div>
					))}
				</div>

				{/* Video Preview Modal */}
				{previewVideo && (
					<div className="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50">
						<div className="bg-white p-1 rounded-lg shadow-lg max-w-lg w-full">
							<video
								src={previewVideo}
								controls
								autoPlay
								className="w-full rounded"
							/>
							<button
								className="mt-3 px-4 py-1 bg-red-500 text-white text-sm m-1 cursor-pointer rounded"
								onClick={() => setPreviewVideo(null)}
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
			{videos.length > 6 && (
				<button
					className="mt-3 text-sm underline text-[#BB0E00]"
					onClick={() =>
						setVisibleCount(visibleCount === videos.length ? 6 : videos.length)
					}
				>
					{visibleCount === videos.length ? "See less" : "See more"}
				</button>
			)}
		</>
	);
}
