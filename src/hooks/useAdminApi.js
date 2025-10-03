import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../utils/apiClient";

const getErrorMessage = (error) =>
	error?.response?.data?.message ??
	error?.message ??
	"Unable to load data. Please try again.";

export const useAdminUsersQuery = (options = {}) => {
	const {
		onError,
		queryKey = ["admin", "students"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/admin/users");
			const students = response.data?.students ?? [];
			const count =
				response.data?.count ?? (Array.isArray(students) ? students.length : 0);

			return { students, count };
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = getErrorMessage(error);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};

export const useStudentReportsQuery = (options = {}) => {
	const {
		onError,
		queryKey = ["admin", "students", "reports"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/admin/students/reports");
			return response.data?.reports ?? [];
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = getErrorMessage(error);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};

export const useStudentBookingsQuery = (options = {}) => {
	const {
		onError,
		queryKey = ["admin", "students", "bookings"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/admin/students/bookings");
			return response.data?.bookings ?? [];
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = getErrorMessage(error);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};

export const useStudentProgressQuery = (options = {}) => {
	const {
		onError,
		queryKey = ["admin", "students", "progress"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/admin/students/progress");
			return response.data?.progress ?? [];
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = getErrorMessage(error);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};

export const useAdminEventsQuery = (options = {}) => {
	const {
		onError,
		queryKey = ["admin", "events"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/events");
			return response.data?.data ?? [];
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = getErrorMessage(error);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};

export const useAdminEnquiriesQuery = (options = {}) => {
	const {
		onError,
		queryKey = ["admin", "enquiries"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/contact");
			return response.data?.data ?? [];
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = getErrorMessage(error);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};
