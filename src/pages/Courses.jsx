import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CourseHeader from "../components/StudentCourses/CourseHeader";
import CourseContainer from "../components/StudentCourses/CourseContainer";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";

const Course = () => {
	const user = useAppSelector(selectCurrentUser);
	const role = user?.role;
	const [filter, setFilter] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");
	const [priceFilter, setPriceFilter] = useState("all"); // all | paid | free
	const location = useLocation();

	// Initialize from query params (e.g., /courses?price=free)
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const price = (params.get("price") || "").toLowerCase();
		if (price === "free" || price === "paid") {
			setPriceFilter(price);
		}
	}, [location.search]);

	// Redirect admin/astrologer to admin dashboard
	// They should use admin panel for course management
	if (role === "admin" || role === "astrologer") {
		return <Navigate to="/admin/dashboard" replace />;
	}

	// Show student course view
	return (
		<>
			<CourseHeader
				onFilterChange={setFilter}
				onSearchChange={setSearchTerm}
				priceFilter={priceFilter}
				onPriceFilterChange={setPriceFilter}
			/>
			<CourseContainer
				filter={filter}
				searchTerm={searchTerm}
				priceFilter={priceFilter}
			/>
		</>
	);
};

export default Course;
