import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../Blogs/BlogCard";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LoadingSpinner, ErrorMessage, Button } from "../common";

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [visibleCards, setVisibleCards] = useState(6);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchBlogs = async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs`, {
				withCredentials: true,
			});

			if (res.data.status) {
				setBlogs(res.data.data);
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

	useEffect(() => {
		fetchBlogs();
	}, []);

	if (loading) {
		return <LoadingSpinner message="Loading blogs..." />;
	}

	if (error) {
		return <ErrorMessage message={error} onRetry={fetchBlogs} />;
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
						<Button
							onClick={() => setVisibleCards(blogs.length)}
							icon={<IoIosArrowRoundForward size={24} />}
						>
							View All
						</Button>
					</div>
				) : blogs.length > 6 ? (
					<div className="flex items-center justify-center my-6 sm:my-8">
						<Button onClick={() => setVisibleCards(6)}>View Less</Button>
					</div>
				) : null}
			</div>
		</>
	);
};

export default Blogs;
