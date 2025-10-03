import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import {
	useCoursesQuery,
	useDeleteCourseMutation,
} from "../../hooks/useCoursesApi";
import LoadingOverlay from "../common/LoadingOverlay";

function AdminCourses() {
	const navigate = useNavigate();
	const {
		data: coursesData,
		isLoading,
		isFetching,
		isError,
		error,
	} = useCoursesQuery();
	const [visibleCount, setVisibleCount] = useState(6);
	const deleteCourseMutation = useDeleteCourseMutation();
	const courses = useMemo(() => coursesData ?? [], [coursesData]);
	const isMutating = deleteCourseMutation.isPending;
	const showOverlay =
		isMutating || (isFetching && !isLoading && courses.length > 0);

	if (isLoading && courses.length === 0) {
		return <LoadingOverlay fullscreen message="Loading courses..." />;
	}

	if (isError) {
		const message =
			error?.response?.data?.message ??
			error?.message ??
			"Failed to load courses.";
		return <p className="text-red-600 text-center mt-10">{message}</p>;
	}

	if (!courses.length) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 mt-10">
				<p className="text-gray-600">No courses found yet.</p>
				<button
					onClick={() => navigate("/admin/create-course")}
					className="flex h-[40px] items-center gap-[.5rem] px-[1rem] py-[2px] rounded-[5px] cursor-pointer text-white bg-gradient-to-b from-[#bf1305] to-[#f64f42]"
				>
					<FiPlus size={23} />
					Add New Course
				</button>
			</div>
		);
	}

	const visibleCourses = courses.slice(0, visibleCount);
	const hasMore = visibleCount < courses.length;

	const handleDelete = async (courseId, title) => {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${title || "this course"}"?`
		);
		if (!confirmed) return;
		deleteCourseMutation.mutate(courseId);
	};

	return (
		<div className="relative">
			{showOverlay && (
				<LoadingOverlay
					message={isMutating ? "Deleting course..." : "Refreshing courses..."}
					className="rounded-xl"
				/>
			)}
			<div className="flex justify-between items-center">
				<div className="text-[18px] font-semibold">Courses</div>
				<button
					onClick={() => navigate("/admin/create-course")}
					className="flex h-[40px] items-center gap-[.5rem] px-[1rem] py-[2px] rounded-[5px] cursor-pointer text-white bg-gradient-to-b from-[#bf1305] to-[#f64f42]"
				>
					<FiPlus size={23} />
					Add New Course
				</button>
			</div>
			<section className="mt-8 mx-2.5 sm:ml-[35px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-[35px]">
				{visibleCourses.map((course) => (
					<article
						key={course._id}
						className="w-full mx-auto border border-[#ECECEC] shadow-md rounded-[15px] pb-3 flex flex-col items-center gap-2"
					>
						<img
							src={course.image || "/images/AstroVastu.png"}
							alt={course.title}
							className="block w-full h-[150px] object-cover rounded-t-[15px]"
						/>
						<div className="flex flex-col items-start gap-[9px] w-[90%] max-w-[258px] mx-auto">
							<h3 className="text-[14px] font-semibold pt-1">{course.title}</h3>
							<p className="text-[12px] font-medium">{course.description}</p>
							<hr className="w-full border-t border-black" />
							<footer className="flex justify-between items-center w-full">
								<span className="text-[14px] font-semibold">
									₹ {course.price?.toLocaleString() || "0"}
								</span>
								<div className="flex gap-2">
									<button
										onClick={() =>
											navigate(`/admin/courses/${course._id}/edit`)
										}
										className="text-white bg-[#BB0E00] text-[10px] w-[63px] h-[26px] px-[5px] flex justify-center items-center rounded-md"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(course._id, course.title)}
										disabled={deleteCourseMutation.isPending}
										className="text-white bg-[#636363] text-[10px] w-[63px] h-[26px] px-[5px] flex justify-center items-center rounded-md disabled:opacity-60"
									>
										{deleteCourseMutation.isPending ? "Deleting" : "Delete"}
									</button>
								</div>
							</footer>
						</div>
					</article>
				))}
			</section>
			{hasMore && (
				<button
					type="button"
					onClick={() => setVisibleCount((count) => count + 6)}
					className="text-[15px] font-normal underline text-center mt-5 cursor-pointer block mx-auto"
				>
					Load More
				</button>
			)}
			<br /> <br />
		</div>
	);
}

export default AdminCourses;
