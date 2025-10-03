import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../utils/apiClient";

const getErrorMessage = (error, fallbackMessage) =>
	error?.response?.data?.message ?? error?.message ?? fallbackMessage;

const buildMediaUrl = (path) => {
	if (!path) return null;
	if (path.startsWith("http")) return path;
	const baseUrl = import.meta.env.VITE_BACKEND_URL;
	if (!baseUrl) return path;
	const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
	return `${baseUrl}/${normalizedPath}`;
};

export const useBooksQuery = (options = {}) => {
	const { queryKey = ["books"], onError, select, ...queryOptions } = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/books");
			return response.data?.data ?? [];
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = getErrorMessage(
				error,
				"Failed to load books. Please try again."
			);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};

export const useBlogsQuery = (options = {}) => {
	const { queryKey = ["blogs"], onError, select, ...queryOptions } = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/blogs");
			return response.data?.data ?? [];
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = getErrorMessage(
				error,
				"Failed to load blogs. Please try again."
			);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};

export const useBookQuery = (bookId, options = {}) => {
	const {
		onError,
		queryKey = ["books", bookId],
		select,
		enabled = true,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		enabled: Boolean(bookId) && enabled,
		queryFn: async () => {
			const response = await apiClient.get(`/books/${bookId}`);
			const book = response.data?.data ?? null;
			if (!book) return null;
			return {
				...book,
				coverImageUrl: buildMediaUrl(book.coverImage ?? book.bannerImage),
				imageUrl: buildMediaUrl(book.image),
			};
		},
		onError: (error) => {
			const message = getErrorMessage(
				error,
				"Failed to load book details. Please try again."
			);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		staleTime: 1000 * 60,
		...queryOptions,
	});
};

export const usePodcastsQuery = (options = {}) => {
	const { queryKey = ["podcasts"], onError, select, ...queryOptions } = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/podcasts");
			return response.data?.data ?? [];
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = getErrorMessage(
				error,
				"Failed to load podcasts. Please try again."
			);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};
