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
			// Handle nested data structure: response.data.data
			const apiData = response.data?.data || response.data;
			const students = apiData?.students ?? [];
			const count =
				apiData?.count ?? (Array.isArray(students) ? students.length : 0);

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

export const useStudentReportsQuery = (studentId = null, options = {}) => {
	const {
		onError,
		queryKey = studentId
			? ["admin", "students", "reports", studentId]
			: ["admin", "students", "reports"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const url = studentId
				? `/admin/students/reports?studentId=${studentId}`
				: "/admin/students/reports";
			const response = await apiClient.get(url);
			return response.data;
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

export const useStudentBookingsQuery = (studentId = null, options = {}) => {
	const {
		onError,
		queryKey = studentId
			? ["admin", "students", "bookings", studentId]
			: ["admin", "students", "bookings"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const url = studentId
				? `/admin/students/bookings?studentId=${studentId}`
				: "/admin/students/bookings";
			const response = await apiClient.get(url);
			return response.data;
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

export const useStudentProgressQuery = (studentId = null, options = {}) => {
	const {
		onError,
		queryKey = studentId
			? ["admin", "students", "progress", studentId]
			: ["admin", "students", "progress"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const url = studentId
				? `/admin/students/progress?studentId=${studentId}`
				: "/admin/students/progress";
			const response = await apiClient.get(url);
			return response.data;
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

// Customer Management Hooks
export const useCustomersQuery = (options = {}) => {
	const {
		onError,
		queryKey = ["admin", "customers"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/admin/customers");
			const customers = response.data?.data?.customers ?? [];
			const count = response.data?.data?.count ?? customers.length;
			return { customers, count };
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

export const useCustomerByIdQuery = (customerId, options = {}) => {
	const {
		onError,
		queryKey = ["admin", "customers", customerId],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get(`/admin/customers/${customerId}`);
			return response.data?.data ?? {};
		},
		enabled: !!customerId,
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

export const useCustomerOrdersQuery = (customerId, options = {}) => {
	const {
		onError,
		queryKey = customerId
			? ["admin", "customers", customerId, "orders"]
			: ["admin", "customers", "orders"],
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const params = customerId ? { customerId } : {};
			const response = await apiClient.get("/admin/customers/orders", {
				params,
			});
			const orders = response.data?.data?.orders ?? [];
			const count = response.data?.data?.count ?? orders.length;
			return { orders, count };
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
