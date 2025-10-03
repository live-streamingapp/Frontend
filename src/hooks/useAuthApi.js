import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../utils/apiClient";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";

const getErrorMessage = (error, fallbackMessage) => {
	return error?.response?.data?.message ?? error?.message ?? fallbackMessage;
};

export const useLoginMutation = (options = {}) => {
	const dispatch = useAppDispatch();
	const { onSuccess, onError, ...mutationOptions } = options;

	return useMutation({
		mutationFn: async (payload) => {
			const response = await apiClient.post("/auth/login", payload);
			return response.data;
		},
		onSuccess: (data, variables, context) => {
			dispatch(
				setCredentials({
					user: data?.data ?? null,
					token: data?.token ?? null,
				})
			);
			toast.success(data?.message ?? "Login successful");
			onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			const message = getErrorMessage(error, "Something went wrong");
			toast.error(message);
			onError?.(error, message, variables, context);
		},
		...mutationOptions,
	});
};

export const useRegisterMutation = (options = {}) => {
	const dispatch = useAppDispatch();
	const { onSuccess, onError, ...mutationOptions } = options;

	return useMutation({
		mutationFn: async (payload) => {
			const response = await apiClient.post("/auth/register", payload);
			return response.data;
		},
		onSuccess: (data, variables, context) => {
			dispatch(
				setCredentials({
					user: data?.data ?? null,
					token: data?.token ?? null,
				})
			);
			toast.success(data?.message ?? "Registration successful");
			onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			const message = getErrorMessage(
				error,
				"Something went wrong. Try again."
			);
			toast.error(message);
			onError?.(error, message, variables, context);
		},
		...mutationOptions,
	});
};

// Admin login has been removed - all users now login through the same endpoint
// Role-based access is determined from the user object returned by the server

export const useCurrentUserQuery = (options = {}) => {
	const { queryKey = ["currentUser"], ...queryOptions } = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/me");
			return response.data?.data ?? null;
		},
		staleTime: 1000 * 60 * 5,
		retry: false,
		...queryOptions,
	});
};
