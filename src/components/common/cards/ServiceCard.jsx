import React from "react";
import PropTypes from "prop-types";
import {
	FaCaretRight,
	FaEdit,
	FaTrash,
	FaToggleOn,
	FaToggleOff,
	FaShoppingCart,
} from "react-icons/fa";
import BaseCard from "../BaseCard";

/**
 * ServiceCard - Reusable card component for services, packages, and consultations
 * Supports admin mode (edit/delete) and user mode (book now)
 */
const ServiceCard = ({
	service,
	onEdit,
	onDelete,
	onAddToCart,
	isDeleting = false,
	isAddingToCart = false,
	isInCart = false,
	isAdmin = false,
}) => {
	const getPlanTier = (price) => {
		if (price <= 15000) return "Basic";
		if (price <= 30000) return "Silver";
		if (price <= 60000) return "Gold";
		return "Platinum";
	};

	const tier = getPlanTier(service.price);

	const planStyles = {
		Basic: {
			gradient: "bg-white text-black border-2 border-gray-200",
			button: "bg-red-600 text-white hover:bg-red-700",
			icon: "text-orange-400",
			badge: "bg-orange-100 text-orange-800",
		},
		Silver: {
			gradient:
				"bg-gradient-to-tr from-[#f5f5f5] to-[#dbdbdb] text-black shadow-gray-300",
			button: "bg-red-600 text-white hover:bg-red-700",
			icon: "text-orange-400",
			badge: "bg-gray-200 text-gray-800",
		},
		Gold: {
			gradient: "bg-gradient-to-tr from-[#ffaa00] to-[#ff8c00] text-white",
			button: "bg-red-600 text-white hover:bg-red-700",
			icon: "text-white",
			badge: "bg-yellow-100 text-yellow-800",
		},
		Platinum: {
			gradient: "bg-gradient-to-tr from-[#a62b3d] to-[#6c69c9] text-white",
			button: "bg-red-600 text-white hover:bg-red-700",
			icon: "text-orange-400",
			badge: "bg-purple-100 text-purple-800",
		},
	};

	const style = planStyles[tier];

	const getBadgeColor = () => {
		if (service.serviceType === "consultation")
			return "bg-purple-100 text-purple-700";
		if (service.serviceType === "package")
			return "bg-indigo-100 text-indigo-700";
		return "bg-green-100 text-green-700";
	};

	const handleEdit = (e) => {
		e.stopPropagation();
		if (onEdit) {
			onEdit(service);
		}
	};

	const handleDelete = (e) => {
		e.stopPropagation();
		if (onDelete) {
			onDelete(service._id || service.id);
		}
	};

	const handleAddToCart = (e) => {
		e.stopPropagation();
		if (onAddToCart) {
			onAddToCart(service);
		}
	};

	return (
		<BaseCard
			className={`p-6 flex flex-col justify-between min-w-[280px] max-w-[340px] transition-transform hover:scale-105 ${style.gradient}`}
			variant="gradient"
		>
			{/* Admin controls */}
			{isAdmin && (
				<div className="absolute top-3 right-3 flex gap-2 items-center">
					{service.isActive ? (
						<FaToggleOn className="text-green-500 text-2xl" title="Active" />
					) : (
						<FaToggleOff className="text-gray-400 text-2xl" title="Inactive" />
					)}
				</div>
			)}

			<div>
				{/* Service type badges */}
				<div className="flex flex-wrap gap-2 mb-3">
					<span
						className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor()}`}
					>
						{service.serviceType}
					</span>
					{service.subCategory && (
						<span
							className={`px-2 py-1 rounded-full text-xs font-medium ${style.badge}`}
						>
							{service.subCategory}
						</span>
					)}
				</div>

				{/* Service image */}
				{service.image && (
					<div className="mb-4">
						<img
							src={service.image}
							alt={service.title}
							className="w-full h-40 object-cover rounded-lg"
						/>
					</div>
				)}

				{/* Title and description */}
				<h3 className="text-2xl font-bold text-center mb-2">{service.title}</h3>
				<p className="text-sm text-center mb-4 opacity-80 line-clamp-3">
					{service.description}
				</p>

				{/* Price */}
				<div className="text-center mb-2">
					<p className="text-4xl font-extrabold">
						<sup className="text-[15px]">₹ </sup>
						{service.price.toLocaleString("en-IN")}
					</p>
					{service.originalPrice && service.originalPrice > service.price && (
						<p className="text-sm opacity-60 line-through">
							₹ {service.originalPrice.toLocaleString("en-IN")}
						</p>
					)}
				</div>

				{/* Category */}
				{service.category && (
					<span className="block text-center opacity-70 text-sm capitalize mb-4">
						{service.category}
					</span>
				)}

				{/* Features */}
				{service.features && service.features.length > 0 && (
					<ul className="mt-4 space-y-2">
						{service.features.slice(0, 4).map((feature, i) => (
							<li key={i} className="flex items-start gap-2 text-sm">
								<FaCaretRight className={`${style.icon} mt-1 flex-shrink-0`} />
								<span className="line-clamp-2">{feature}</span>
							</li>
						))}
						{service.features.length > 4 && (
							<li className="text-xs opacity-70 text-center">
								+{service.features.length - 4} more features
							</li>
						)}
					</ul>
				)}
			</div>

			{/* Action buttons */}
			<div className="mt-6">
				{isAdmin ? (
					<div className="flex gap-2">
						<button
							onClick={handleEdit}
							className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
						>
							<FaEdit />
							Edit
						</button>
						<button
							onClick={handleDelete}
							disabled={isDeleting}
							className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-colors disabled:opacity-60"
						>
							<FaTrash />
							{isDeleting ? "Deleting..." : "Delete"}
						</button>
					</div>
				) : isInCart ? (
					<button
						onClick={(e) => {
							e.stopPropagation();
							window.location.href = "/cart";
						}}
						className="w-full px-5 py-2 font-semibold rounded-md flex items-center justify-center gap-2 bg-orange-500 text-white hover:bg-orange-600 transition-colors"
					>
						Go to Cart
					</button>
				) : (
					<button
						onClick={handleAddToCart}
						disabled={isAddingToCart}
						className={`w-full px-5 py-2 font-semibold rounded-md flex items-center justify-center gap-2 ${
							style.button
						} transition-opacity ${
							isAddingToCart ? "opacity-60 cursor-wait" : "hover:opacity-90"
						}`}
					>
						{isAddingToCart ? (
							<>
								<div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
								Adding...
							</>
						) : (
							<>
								<FaShoppingCart />
								Add to Cart
							</>
						)}
					</button>
				)}
			</div>
		</BaseCard>
	);
};

ServiceCard.propTypes = {
	service: PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.string,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		price: PropTypes.number.isRequired,
		originalPrice: PropTypes.number,
		category: PropTypes.string,
		serviceType: PropTypes.string,
		subCategory: PropTypes.string,
		image: PropTypes.string,
		features: PropTypes.arrayOf(PropTypes.string),
		isActive: PropTypes.bool,
	}).isRequired,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
	onAddToCart: PropTypes.func,
	isDeleting: PropTypes.bool,
	isAddingToCart: PropTypes.bool,
	isInCart: PropTypes.bool,
	isAdmin: PropTypes.bool,
};

export default ServiceCard;
