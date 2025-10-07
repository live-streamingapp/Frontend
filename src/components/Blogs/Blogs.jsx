import React, { useState, useEffect } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useBlogsQuery } from "../../hooks/useContentApi";
import { LoadingSpinner, ErrorMessage, Button } from "../common";
import { BlogCard } from "../common/cards";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { ROLES } from "../../utils/constants";

const Blogs = () => {
	const [visibleCards, setVisibleCards] = useState(6);
	const currentUser = useAppSelector(selectCurrentUser);
	const isAdmin =
		currentUser?.role === ROLES.ASTROLOGER || currentUser?.role === ROLES.ADMIN;

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
		return <LoadingSpinner message="Loading blogs..." />;
	}

	if (isError) {
		return <ErrorMessage message={errorMessage} onRetry={refetch} />;
	}

	return (
		<div className="px-[1.5rem]">
			<h1 className="my-[2rem] text-[1.5rem] font-semibold">Latest Blogs</h1>

			<div className="grid gap-6 max-[600px]:grid-cols-1 max-[850px]:grid-cols-2 min-[850px]:grid-cols-3">
				{blogs.slice(0, visibleCards).map((blog) => (
					<BlogCard key={blog._id} blog={blog} isAdmin={isAdmin} />
				))}
			</div>

			{/* View All / View Less */}
			{blogs.length > visibleCards ? (
				<div className="flex items-center justify-center my-[2rem]">
					<Button
						onClick={() => setVisibleCards(blogs.length)}
						icon={<IoIosArrowRoundForward size={24} />}
					>
						View All
					</Button>
				</div>
			) : blogs.length > 6 ? (
				<div className="flex items-center justify-center my-[2rem]">
					<Button onClick={() => setVisibleCards(6)}>View Less</Button>
				</div>
			) : null}
		</div>
	);
};

export default Blogs;
