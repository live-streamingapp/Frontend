import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "../hooks/useCartApi";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Services = () => {
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({
		category: "",
		search: "",
		page: 1,
		limit: 12,
	});
	const [pagination, setPagination] = useState({
		total: 0,
		pages: 0,
		currentPage: 1,
	});

	const { mutate: addToCart, isPending: isAddingToCart } =
		useAddToCartMutation();

	const fetchServices = useCallback(async () => {
		try {
			setLoading(true);
			const params = new URLSearchParams();
			if (filters.category) params.append("category", filters.category);
			if (filters.search) params.append("search", filters.search);
			params.append("page", filters.page);
			params.append("limit", filters.limit);
			params.append("isActive", "true"); // Only show active services

			const response = await axios.get(
				`${VITE_BACKEND_URL}/services?${params.toString()}`
			);

			if (response.data.success) {
				setServices(response.data.data);
				setPagination({
					total: response.data.pagination.total,
					pages: response.data.pagination.pages,
					currentPage: response.data.pagination.currentPage,
				});
			}
		} catch (error) {
			console.error("Error fetching services:", error);
			toast.error(error.response?.data?.message || "Failed to fetch services");
		} finally {
			setLoading(false);
		}
	}, [filters]);

	useEffect(() => {
		fetchServices();
	}, [fetchServices]);

	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
	};

	const handlePageChange = (newPage) => {
		setFilters((prev) => ({ ...prev, page: newPage }));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleAddToCart = (service) => {
		addToCart({
			itemId: service._id,
			itemType: "Service",
			quantity: 1,
		});
	};

	const getImageUrl = (imagePath) => {
		if (!imagePath) return "/images/default-service.png";
		if (imagePath.startsWith("http")) return imagePath;
		return `${VITE_BACKEND_URL}/${imagePath}`;
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">Our Services</h1>
				<p className="text-gray-600">
					Explore our wide range of spiritual and consultation services
				</p>
			</div>

			{/* Filters */}
			<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Search */}
					<div>
						<input
							type="text"
							placeholder="Search services..."
							value={filters.search}
							onChange={(e) => handleFilterChange("search", e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
						/>
					</div>

					{/* Category Filter */}
					<div>
						<select
							value={filters.category}
							onChange={(e) => handleFilterChange("category", e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
						>
							<option value="">All Categories</option>
							<option value="vastu">Vastu</option>
							<option value="astrology">Astrology</option>
							<option value="numerology">Numerology</option>
							<option value="spiritual">Spiritual</option>
							<option value="other">Other</option>
						</select>
					</div>

					{/* Clear Filters */}
					<div>
						<button
							onClick={() =>
								setFilters({
									category: "",
									search: "",
									page: 1,
									limit: 12,
								})
							}
							className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
						>
							Clear Filters
						</button>
					</div>
				</div>
			</div>

			{/* Loading State */}
			{loading && (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
				</div>
			)}

			{/* Services Grid */}
			{!loading && services.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{services.map((service) => (
						<div
							key={service._id}
							className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
						>
							{/* Service Image */}
							<div className="h-48 bg-gray-100 overflow-hidden">
								<img
									src={getImageUrl(service.image)}
									alt={service.title}
									className="w-full h-full object-cover"
								/>
							</div>

							{/* Service Details */}
							<div className="p-4">
								<div className="flex items-start justify-between mb-2">
									<h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
										{service.title}
									</h3>
									<span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
										{service.category}
									</span>
								</div>

								<p className="text-sm text-gray-600 mb-3 line-clamp-3">
									{service.description}
								</p>

								{/* Features */}
								{service.features && service.features.length > 0 && (
									<div className="mb-3">
										<ul className="text-xs text-gray-500 space-y-1">
											{service.features.slice(0, 3).map((feature, index) => (
												<li key={index} className="flex items-start">
													<span className="text-green-600 mr-1">✓</span>
													<span className="line-clamp-1">{feature}</span>
												</li>
											))}
										</ul>
									</div>
								)}

								{/* Duration & Delivery Time */}
								<div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
									{service.duration && (
										<div className="flex items-center gap-1">
											<span>⏱️</span>
											<span>{service.duration}</span>
										</div>
									)}
									{service.deliveryTime && (
										<div className="flex items-center gap-1">
											<span>📅</span>
											<span>{service.deliveryTime}</span>
										</div>
									)}
								</div>

								{/* Price & Add to Cart */}
								<div className="flex items-center justify-between pt-3 border-t border-gray-100">
									<div className="flex flex-col">
										<span className="text-xl font-bold text-red-600">
											₹{service.price.toLocaleString()}
										</span>
										{service.originalPrice &&
											service.originalPrice > service.price && (
												<span className="text-sm text-gray-400 line-through">
													₹{service.originalPrice.toLocaleString()}
												</span>
											)}
									</div>
									<button
										onClick={() => handleAddToCart(service)}
										disabled={isAddingToCart}
										className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isAddingToCart ? "Adding..." : "Add to Cart"}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Empty State */}
			{!loading && services.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-600 text-lg mb-2">No services found</p>
					<p className="text-gray-500 text-sm">
						Try adjusting your filters or search criteria
					</p>
				</div>
			)}

			{/* Pagination */}
			{!loading && pagination.pages > 1 && (
				<div className="flex justify-center items-center gap-2">
					<button
						onClick={() => handlePageChange(filters.page - 1)}
						disabled={filters.page === 1}
						className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Previous
					</button>
					<span className="text-gray-600">
						Page {pagination.currentPage} of {pagination.pages}
					</span>
					<button
						onClick={() => handlePageChange(filters.page + 1)}
						disabled={filters.page >= pagination.pages}
						className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default Services;
