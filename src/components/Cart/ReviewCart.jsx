import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import rudrakshImg from "../../assets/rudraksh.png";
import {
	useCartQuery,
	useRemoveCartItemMutation,
} from "../../hooks/useCartApi";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getDisplayImage = (item) => {
	if (item.imageUrl) return item.imageUrl;
	if (item.image) {
		const baseUrl = import.meta.env.VITE_BACKEND_URL;
		if (!baseUrl) return item.image;
		const normalized = item.image.startsWith("/")
			? item.image.slice(1)
			: item.image;
		return `${baseUrl}/${normalized}`;
	}
	return rudrakshImg;
};

export default function ReviewCart() {
	const navigate = useNavigate();
	const { data, isLoading, isError, error, refetch } = useCartQuery();
	const { mutate: removeCartItem, isPending } = useRemoveCartItemMutation({
		showSuccessToast: true,
	});

	const [isProcessingOrder, setIsProcessingOrder] = useState(false);

	const items = useMemo(() => data?.items ?? [], [data]);
	const totals = useMemo(
		() => data?.totals ?? { totalMRP: 0, discount: 0, totalAmount: 0 },
		[data]
	);

	const handleCreateOrder = async () => {
		// Validate cart has items
		if (!items || items.length === 0) {
			toast.error("Your cart is empty");
			return;
		}

		// Show confirmation alert
		const confirmed = window.confirm(
			`Are you sure you want to place an order for ₹${totals.totalAmount.toLocaleString()}?\n\nPayment gateway integration will be added soon.`
		);

		if (!confirmed) {
			return;
		}

		try {
			setIsProcessingOrder(true);

			// Prepare order items from cart
			const orderItems = items.map((item) => ({
				itemId: item.itemId || item.productId,
				itemType: item.itemType || item.kind || "Product",
				quantity: item.quantity || 1,
				price: item.price,
			}));

			// Create order with pending payment status
			const orderResponse = await axios.post(
				`${VITE_BACKEND_URL}/orders`,
				{
					items: orderItems,
					paymentMethod: "pending", // Will be set by payment gateway
					paymentStatus: "pending", // Set payment status to pending
					clearCart: true, // Clear cart after order creation
				},
				{
					withCredentials: true,
				}
			);

			if (orderResponse.data.success) {
				toast.success("Order placed successfully! Payment is pending.");
				refetch(); // Refresh cart to show it's empty
				navigate("/my-orders"); // Redirect to orders page
			}
		} catch (error) {
			console.error("Order creation error:", error);
			const message =
				error.response?.data?.message ||
				error.message ||
				"Failed to create order. Please try again.";
			toast.error(message);
		} finally {
			setIsProcessingOrder(false);
		}
	};

	if (isLoading) {
		return <p className="text-center mt-4">Loading cart...</p>;
	}

	if (isError) {
		const message =
			error?.response?.data?.message ??
			error?.message ??
			"Failed to fetch cart.";
		return <p className="text-center mt-4 text-red-600">{message}</p>;
	}

	if (!items.length) {
		return (
			<div className="max-w-3xl mx-auto p-4 text-center space-y-4">
				<h2 className="text-2xl font-semibold">Your cart is empty</h2>
				<p className="text-gray-600">
					Add products to review them here before checkout.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto p-4 space-y-4">
			{items.map((item) => (
				<div
					key={item.cartItemId ?? item.id ?? item.productId}
					className="rounded-2xl shadow-md bg-white"
				>
					<div className="flex items-start p-4 gap-4">
						<img
							src={getDisplayImage(item)}
							alt={item.name}
							className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
						/>
						<div className="flex flex-col justify-between flex-1">
							<div>
								<h2 className="font-semibold text-lg">{item.name}</h2>
								<p className="text-sm text-gray-500">
									{item.description || "No description"}
								</p>
							</div>
							<div className="flex items-center gap-2 mt-2">
								<span className="text-red-600 font-semibold text-lg">
									₹{Number(item.price ?? 0).toLocaleString()}
								</span>
								{item.oldPrice && item.oldPrice !== item.price && (
									<span className="line-through text-gray-400 text-sm">
										₹{Number(item.oldPrice).toLocaleString()}
									</span>
								)}
							</div>
							<div className="text-sm">
								<span>Qty: </span>
								<span>{item.quantity}</span>
							</div>
						</div>
					</div>
					<div className="px-4 pb-4">
						<button
							onClick={() => removeCartItem({ productId: item.productId })}
							disabled={isPending || isProcessingOrder}
							className="w-40 py-2 rounded bg-[#ba3400] text-white font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isPending ? "Removing..." : "Remove"}
						</button>
					</div>
				</div>
			))}

			{/* Totals Section */}
			<div className="rounded-2xl shadow-md bg-white">
				<div className="p-4 text-sm">
					<h3 className="font-semibold text-gray-600 mb-3">Product Details</h3>
					<div className="flex justify-between mb-2">
						<span>Total MRP</span>
						<span>₹ {Number(totals.totalMRP ?? 0).toLocaleString()}</span>
					</div>
					<div className="flex justify-between mb-2">
						<span>Discount on MRP</span>
						<span>₹ {Number(totals.discount ?? 0).toLocaleString()}</span>
					</div>
					<div className="flex justify-between mb-2">
						<span>Shipping Fee</span>
						<span className="pl-2">Free</span>
					</div>
					<hr className="my-2 border-gray-400" />
					<div className="flex justify-between font-semibold">
						<span>Total Amount</span>
						<span>₹ {Number(totals.totalAmount ?? 0).toLocaleString()}</span>
					</div>
					<p className="text-xs text-gray-400 mt-0">Including Tax and GST</p>
				</div>
			</div>

			<div className="flex justify-center mt-4">
				<button
					onClick={handleCreateOrder}
					disabled={isPending || isProcessingOrder}
					className="bg-[#ba3400] text-white py-2 px-6 rounded text-lg font-medium shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isProcessingOrder ? (
						<span className="flex items-center justify-center gap-2">
							<div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
							Creating Order...
						</span>
					) : (
						"Continue to Payment"
					)}
				</button>
			</div>
		</div>
	);
}
