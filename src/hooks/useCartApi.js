import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import apiClient from "../utils/apiClient";

export const CART_QUERY_KEY = ["cart"];

const resolveErrorMessage = (error, fallback) =>
	error?.response?.data?.message ?? error?.message ?? fallback;

const buildImageUrl = (imagePath) => {
	if (!imagePath) return null;
	if (imagePath.startsWith("http")) return imagePath;
	const baseUrl = import.meta.env.VITE_BACKEND_URL;
	if (!baseUrl) return imagePath;
	const normalizedPath = imagePath.startsWith("/")
		? imagePath.slice(1)
		: imagePath;
	return `${baseUrl}/${normalizedPath}`;
};

const transformCartItem = (item = {}) => {
	const product = item.productId ?? item.product ?? {};
	const productId = product._id ?? product.id ?? item.productId ?? item.id;
	const price = Number(product.price ?? item.price ?? 0);
	const oldPrice = Number(
		product.oldPrice ?? product.actualPrice ?? item.oldPrice ?? price
	);
	const quantity = Number(item.quantity ?? 1);

	return {
		id: item._id ?? item.id ?? productId,
		cartItemId: item._id ?? item.id ?? null,
		productId,
		name: product.name ?? product.title ?? item.name ?? "Product",
		description: product.description ?? item.description ?? "",
		price,
		oldPrice,
		quantity,
		favorited: Boolean(item.favorited),
		image: product.coverImage ?? product.image ?? item.image ?? null,
		imageUrl: buildImageUrl(product.coverImage ?? product.image ?? item.image),
		kind: item.kind ?? product.kind ?? "Product",
		raw: item,
	};
};

const transformCartItems = (items = []) => items.map(transformCartItem);

const computeTotals = (items = []) => {
	const totals = items.reduce(
		(acc, item) => {
			acc.totalAmount += Number(item.price ?? 0) * Number(item.quantity ?? 0);
			acc.totalMRP +=
				Number(item.oldPrice ?? item.price ?? 0) * Number(item.quantity ?? 0);
			return acc;
		},
		{ totalMRP: 0, totalAmount: 0 }
	);

	totals.discount = Math.max(totals.totalMRP - totals.totalAmount, 0);

	return totals;
};

const extractCartPayload = (data) => {
	if (!data) return {};
	if (data.cart) return data.cart;
	if (data.data?.cart) return data.data.cart;
	if (data.data) return data.data;
	return data;
};

export const useCartQuery = (options = {}) => {
	const {
		queryKey = CART_QUERY_KEY,
		onError,
		select,
		...queryOptions
	} = options;

	return useQuery({
		queryKey,
		queryFn: async () => {
			const response = await apiClient.get("/cart");
			const cartPayload = extractCartPayload(response.data);
			const rawItems = cartPayload?.items ?? [];
			const items = transformCartItems(rawItems);
			const totals = computeTotals(items);

			return {
				cart: { ...cartPayload, items: rawItems },
				items,
				totals,
			};
		},
		staleTime: 1000 * 60,
		onError: (error) => {
			const message = resolveErrorMessage(
				error,
				"Unable to load cart. Please try again."
			);
			toast.error(message);
			onError?.(error, message);
		},
		select: (data) => (select ? select(data) : data),
		...queryOptions,
	});
};

const updateCacheItems = (queryClient, queryKey, updater) => {
	queryClient.setQueryData(queryKey, (previous) => {
		if (!previous) return previous;
		const nextItems = updater(previous.items ?? []);
		const totals = computeTotals(nextItems);
		return {
			...previous,
			items: nextItems,
			totals,
		};
	});
};

export const useUpdateCartItemMutation = (options = {}) => {
	const queryClient = useQueryClient();
	const {
		onSuccess,
		onError,
		queryKey = CART_QUERY_KEY,
		showSuccessToast = true,
		...mutationOptions
	} = options;

	return useMutation({
		mutationFn: async ({ productId, quantity }) => {
			if (!productId || typeof quantity === "undefined") {
				throw new Error("productId and quantity are required to update cart");
			}
			const response = await apiClient.put(`/cart/${productId}`, {
				quantity,
			});
			return { response, productId, quantity };
		},
		onSuccess: (data, variables, context) => {
			updateCacheItems(queryClient, queryKey, (items) =>
				items.map((item) =>
					item.productId === variables.productId
						? { ...item, quantity: variables.quantity }
						: item
				)
			);
			if (showSuccessToast) {
				toast.success("Cart updated");
			}
			onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			const message = resolveErrorMessage(
				error,
				"Unable to update cart. Please try again."
			);
			toast.error(message);
			onError?.(error, variables, context);
		},
		...mutationOptions,
	});
};

export const useRemoveCartItemMutation = (options = {}) => {
	const queryClient = useQueryClient();
	const {
		onSuccess,
		onError,
		queryKey = CART_QUERY_KEY,
		showSuccessToast = true,
		...mutationOptions
	} = options;

	return useMutation({
		mutationFn: async ({ productId }) => {
			if (!productId) {
				throw new Error("productId is required to remove cart item");
			}
			const response = await apiClient.delete(`/cart/${productId}`);
			return { response, productId };
		},
		onSuccess: (data, variables, context) => {
			updateCacheItems(queryClient, queryKey, (items) =>
				items.filter((item) => item.productId !== variables.productId)
			);
			if (showSuccessToast) {
				toast.success("Item removed from cart");
			}
			onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			const message = resolveErrorMessage(
				error,
				"Unable to remove item. Please try again."
			);
			toast.error(message);
			onError?.(error, variables, context);
		},
		...mutationOptions,
	});
};

export const useAddToCartMutation = (options = {}) => {
	const queryClient = useQueryClient();
	const {
		onSuccess,
		onError,
		queryKey = CART_QUERY_KEY,
		showSuccessToast = true,
		invalidateOnSuccess = true,
		...mutationOptions
	} = options;

	return useMutation({
		mutationFn: async ({ productId, quantity = 1, kind = "Product" }) => {
			if (!productId) {
				throw new Error("productId is required to add to cart");
			}
			const response = await apiClient.post("/cart/add", {
				productId,
				quantity,
				kind,
			});
			return { response, productId, quantity, kind };
		},
		onSuccess: (data, variables, context) => {
			if (invalidateOnSuccess) {
				queryClient.invalidateQueries({ queryKey });
			}
			if (showSuccessToast) {
				toast.success("Added to cart");
			}
			onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			const message = resolveErrorMessage(
				error,
				"Unable to add to cart. Please try again."
			);
			toast.error(message);
			onError?.(error, variables, context);
		},
		...mutationOptions,
	});
};
