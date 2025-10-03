import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../Blogs/BlogCard";
import { IoIosArrowRoundForward } from "react-icons/io";

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [visibleCards, setVisibleCards] = useState(6);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				setLoading(true);
				const res = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/blogs`,
					{
						withCredentials: true, // if auth is cookie-based
					}
				);

				if (res.data.status) {
					setBlogs(res.data.data); // API data is in data.data
				} else {
					setError("Failed to fetch blogs");
				}
			} catch (err) {
				console.error("Error fetching blogs:", err);
				setError("Failed to fetch blogs. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, []);

	if (loading) {
		return (
			<>
				<div className="text-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading blogs...</p>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<div className="text-center py-12">
					<p className="text-red-600 mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
					>
						Try Again
					</button>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="px-4 sm:px-8 md:px-12 lg:px-14 py-6 sm:py-8">
				<h1 className="my-6 sm:my-8 text-xl sm:text-2xl text-center font-semibold">
					Latest Blogs
				</h1>

				<div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{blogs.slice(0, visibleCards).map((blog) => (
						<BlogCard key={blog._id} blog={blog} />
					))}
				</div>

				{/* View All / View Less */}
				{blogs.length > visibleCards ? (
					<div className="flex items-center justify-center my-6 sm:my-8">
						<button
							onClick={() => setVisibleCards(blogs.length)}
							className="flex items-center gap-[5px] font-semibold transition-opacity duration-300 hover:opacity-80 text-white bg-[#c02c07] px-4 py-2 cursor-pointer rounded-lg text-sm"
						>
							View All <IoIosArrowRoundForward size={24} />
						</button>
					</div>
				) : blogs.length > 6 ? (
					<div className="flex items-center justify-center my-6 sm:my-8">
						<button
							onClick={() => setVisibleCards(6)}
							className="font-semibold transition-opacity duration-300 hover:opacity-80 text-white bg-[#c02c07] px-4 py-2 cursor-pointer rounded-lg text-sm"
						>
							View Less
						</button>
					</div>
				) : null}
			</div>
		</>
	);
};

export default Blogs;
