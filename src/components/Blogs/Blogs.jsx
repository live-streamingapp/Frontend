import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useBlogsQuery } from "../../hooks/useContentApi";

const Blogs = () => {
	const [visibleCards, setVisibleCards] = useState(6);
	const {
		data: blogs = [],
		isLoading,
		isError,
		error,
		refetch,
	} = useBlogsQuery();

	useEffect(() => {
		if (blogs.length <= 6) {
			setVisibleCards(Math.min(6, blogs.length));
		}
	}, [blogs]);

	const errorMessage =
		error?.response?.data?.message ??
		error?.message ??
		"Failed to fetch blogs. Please try again.";

	if (isLoading) {
		return (
			<div className="text-center py-12">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
				<p className="text-gray-600">Loading blogs...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center py-12 space-y-4">
				<p className="text-red-600">{errorMessage}</p>
				<button
					onClick={() => refetch()}
					className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="px-[1.5rem]">
			<h1 className="my-[2rem] text-[1.5rem] font-semibold">Latest Blogs</h1>

			<div className="grid gap-6 max-[600px]:grid-cols-1 max-[850px]:grid-cols-2 min-[850px]:grid-cols-3">
				{blogs.slice(0, visibleCards).map((blog) => (
					<BlogCard key={blog._id} blog={blog} />
				))}
			</div>

			{/* View All / View Less */}
			{blogs.length > visibleCards ? (
				<div className="flex items-center justify-center my-[2rem]">
					<button
						onClick={() => setVisibleCards(blogs.length)}
						className="flex items-center gap-[5px] font-semibold transition-opacity duration-300 hover:opacity-80 text-white bg-[#c02c07] px-4 py-2 cursor-pointer rounded-lg text-sm"
					>
						View All <IoIosArrowRoundForward size={24} />
					</button>
				</div>
			) : blogs.length > 6 ? (
				<div className="flex items-center justify-center my-[2rem]">
					<button
						onClick={() => setVisibleCards(6)}
						className="font-semibold transition-opacity duration-300 hover:opacity-80 text-white bg-[#c02c07] px-4 py-2 cursor-pointer rounded-lg text-sm"
					>
						View Less
					</button>
				</div>
			) : null}
		</div>
	);
};

export default Blogs;
