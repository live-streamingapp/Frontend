import { useMemo, useState } from "react";
import CourseCard from "./CourseCard"; // import new card
import LoadingOverlay from "../common/LoadingOverlay";
import { useCoursesQuery } from "../../hooks/useCoursesApi";

const CourseContainer = () => {
	const [visibleCount, setVisibleCount] = useState(8);
	const {
		data: coursesData,
		isLoading,
		isFetching,
		isError,
		error,
	} = useCoursesQuery({ enableToast: false });
	const courses = useMemo(() => coursesData ?? [], [coursesData]);
	const hasCourses = courses.length > 0;
	const showOverlay = isFetching && !isLoading && hasCourses;

	const handleLoadMore = () => {
		setVisibleCount(courses.length);
	};

	if (isLoading) {
		return <LoadingOverlay fullscreen message="Loading courses..." />;
	}

	if (isError) {
		const message =
			error?.response?.data?.message ??
			error?.message ??
			"Failed to load courses. Please try again.";
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<p className="text-red-600">{message}</p>
			</div>
		);
	}

	return (
		<div className="relative">
			{showOverlay && (
				<LoadingOverlay
					className="rounded-xl"
					message="Refreshing courses..."
				/>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 p-3 sm:p-6">
				{courses.slice(0, visibleCount).map((course) => (
					<CourseCard key={course._id} course={course} />
				))}
			</div>
			{visibleCount < courses.length && (
				<div className="flex justify-center my-3">
					<button
						onClick={handleLoadMore}
						className="bg-gradient-to-b from-[#bf1305] to-[#f64f42] px-4 py-2 text-sm text-white rounded-lg shadow-md hover:opacity-90 transition cursor-pointer"
					>
						Load More
					</button>
				</div>
			)}
		</div>
	);
};

export default CourseContainer;
