import React from "react";
import { Navigate } from "react-router-dom";
import CourseHeader from "../components/StudentCourses/CourseHeader";
import CourseContainer from "../components/StudentCourses/CourseContainer";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";

const Course = () => {
	const user = useAppSelector(selectCurrentUser);
	const role = user?.role;

	// Redirect admin/astrologer to admin dashboard
	// They should use admin panel for course management
	if (role === "admin" || role === "astrologer") {
		return <Navigate to="/admin/dashboard" replace />;
	}

	// Show student course view
	return (
		<>
			<CourseHeader />
			<CourseContainer />
		</>
	);
};

export default Course;
