import React, { useState, useEffect } from "react";
import axios from "axios";
import { ServiceCard } from "../components/common/cards";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";
import { ROLES } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation, useCartQuery } from "../hooks/useCartApi";
import toast from "react-hot-toast";

/**
 * ServicePackagesPage - Reusable component for displaying consultation/package/service listings
 *
 * @param {Object} props
 * @param {string} props.title - Page title (e.g., "Astrology Consultation Packages")
 * @param {string} props.serviceType - Type of service: "consultation", "package", or "service"
 * @param {string} props.category - Category filter: "astrology", "vastu", "numerology", "spiritual"
 * @param {string} props.subCategory - Optional subcategory filter (e.g., "Vastu for Home")
 */
const ServicePackagesPage = ({
	title,
	serviceType = "package",
	category = "astrology",
	subCategory = null,
}) => {
	const navigate = useNavigate();
	const currentUser = useAppSelector(selectCurrentUser);
	const isAdmin =
		currentUser?.role === ROLES.ASTROLOGER || currentUser?.role === ROLES.ADMIN;

	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [addingToCartId, setAddingToCartId] = useState(null); // Track which service is being added

	// Cart integration
	const { mutate: addToCart } = useAddToCartMutation();
	const { data: cartData } = useCartQuery(undefined, {
		skip: !currentUser || isAdmin, // Don't fetch cart for non-logged in or admin users
	});

	// Check if service is in cart
	const isServiceInCart = (serviceId) => {
		if (!cartData?.data?.items) return false;
		return cartData.data.items.some((item) => item.itemId?._id === serviceId);
	};

	useEffect(() => {
		const fetchServices = async () => {
			try {
				setLoading(true);
				setError(null);

				// Build query parameters
				const params = new URLSearchParams({
					serviceType,
					category,
					isActive: "true",
				});

				if (subCategory) {
					params.append("subCategory", subCategory);
				}

				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/services?${params.toString()}`
				);

				console.log(`${title} API Response:`, response.data);

				// Sort by price (ascending)
				const sortedServices = (response.data.data || []).sort(
					(a, b) => a.price - b.price
				);

				setServices(sortedServices);
			} catch (error) {
				console.error(`Error fetching ${title}:`, error);
				console.error("Error details:", error.response?.data || error.message);
				setError(
					error.response?.data?.message ||
						"Failed to load services. Please try again later."
				);
			} finally {
				setLoading(false);
			}
		};

		fetchServices();
	}, [title, serviceType, category, subCategory]);

	const handleEdit = (service) => {
		navigate(`/admin/edit-service/${service._id}`);
	};

	const handleDelete = (serviceId) => {
		if (!window.confirm("Are you sure you want to delete this service?"))
			return;
		// TODO: Implement delete service mutation
		console.log("Delete service:", serviceId);
	};

	const handleAddToCart = async (service) => {
		console.log("=== handleAddToCart called ===");
		console.log("Service object:", service);
		console.log("Service._id:", service._id);
		console.log("Service.serviceType:", service.serviceType);
		console.log("currentUser:", currentUser);

		// Check if user is logged in
		if (!currentUser) {
			console.log("User not logged in, redirecting to login");
			toast("Please log in to continue", { icon: "🔐" });
			navigate("/auth/login", {
				state: { from: { pathname: window.location.pathname } },
			});
			return;
		}

		// Check if already in cart, navigate to cart
		if (isServiceInCart(service._id)) {
			console.log("Service already in cart, navigating to cart");
			navigate("/cart");
			return;
		}

		// Set loading state for this specific service
		setAddingToCartId(service._id);

		// All services (consultation, package, service) from Service collection
		// should use "Service" as itemType in cart
		// Backend cart accepts: "Course", "Book", "Consultation", "Service"
		// Note: "Consultation" itemType is for the Consultation model (booked consultations),
		// while service items with serviceType="consultation" use "Service" itemType
		const itemType = "Service";

		const payload = {
			itemId: service._id,
			itemType: itemType,
			quantity: 1,
		};

		console.log("=== Sending to cart API ===");
		console.log("Payload:", JSON.stringify(payload, null, 2));

		// Use mutate function (it handles success/error internally via onSuccess/onError)
		addToCart(payload, {
			onSuccess: (data) => {
				console.log("=== Cart API Success ===");
				console.log("Response data:", data);
				setAddingToCartId(null); // Clear loading state
				// Toast is already shown by useAddToCartMutation hook
			},
			onError: (error) => {
				console.error("=== Cart API Error ===");
				console.error("Full error object:", error);
				console.error("Error response:", error?.response);
				console.error("Error data:", error?.response?.data);
				console.error("Error message:", error?.response?.data?.message);
				setAddingToCartId(null); // Clear loading state

				const errorMessage =
					error?.response?.data?.message ||
					error?.message ||
					"Failed to add to cart. Please try again.";

				// Special handling for cart corruption
				if (
					errorMessage.includes("toString") ||
					errorMessage.includes("undefined")
				) {
					toast.error(
						"Cart error detected. Please try clearing your cart and try again."
					);
				} else {
					toast.error(errorMessage);
				}
			},
		});
	};

	// Loading State
	if (loading) {
		return (
			<div className="min-h-screen bg-gray-100 py-10 px-4">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
					<div className="flex items-center justify-center py-20">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
					</div>
				</div>
			</div>
		);
	}

	// Error State
	if (error) {
		return (
			<div className="min-h-screen bg-gray-100 py-10 px-4">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
					<div className="text-center py-10">
						<p className="text-red-600 mb-4">{error}</p>
						<button
							onClick={() => window.location.reload()}
							className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
						>
							Retry
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Empty State
	if (services.length === 0) {
		return (
			<div className="min-h-screen bg-gray-100 py-10 px-4">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
					<div className="text-center text-gray-500 py-10">
						<p className="text-lg">No services available at the moment.</p>
						<p className="text-sm mt-2">Please check back later.</p>
					</div>
				</div>
			</div>
		);
	}

	// Services Grid
	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-10">{title}</h2>

				<div className="flex flex-wrap justify-center gap-6">
					{services.map((service) => (
						<div key={service._id} className="flex justify-center">
							<ServiceCard
								service={service}
								isAdmin={isAdmin}
								onEdit={handleEdit}
								onDelete={handleDelete}
								onAddToCart={handleAddToCart}
								isAddingToCart={addingToCartId === service._id}
								isInCart={isServiceInCart(service._id)}
								isDeleting={false}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServicePackagesPage;
