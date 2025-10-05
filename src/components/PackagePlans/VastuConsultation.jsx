import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonConsultation from "./CommonConsultation";

const planStyles = {
	Basic: {
		gradient: "bg-white text-black",
		button: "bg-[#ba3800] text-white",
		icon: "text-orange-400",
	},
	Silver: {
		gradient:
			"bg-gradient-to-tr from-[#f5f5f5] to-[#dbdbdb] text-black shadow-gray-300",
		button: "bg-[#ba3800] text-white",
		icon: "text-orange-400",
	},
	Gold: {
		gradient: "bg-gradient-to-tr from-[#ffaa00] to-[#ff8c00] text-white",
		button: "bg-[#ba3800] text-white",
		icon: "text-white",
	},
	Platinum: {
		gradient: "bg-gradient-to-tr from-[#a62b3d] to-[#6c69c9] text-white",
		button: "bg-[#ba3800] text-white",
		icon: "text-orange-400",
	},
};

const getPlanTier = (price) => {
	if (price <= 15000) return "Basic";
	if (price <= 30000) return "Silver";
	if (price <= 60000) return "Gold";
	return "Platinum";
};

const VastuConsultation = () => {
	const [plans, setPlans] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPackages = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/services?serviceType=package&category=vastu&isActive=true`
				);

				// Transform API data to match the expected format
				const transformedPlans = response.data.data.map((service) => ({
					name: getPlanTier(service.price),
					price: service.price.toLocaleString("en-IN"),
					desc: service.description,
					features: service.features || [],
				}));

				// Sort by price
				transformedPlans.sort((a, b) => {
					const priceA = parseInt(a.price.replace(/,/g, ""));
					const priceB = parseInt(b.price.replace(/,/g, ""));
					return priceA - priceB;
				});

				setPlans(transformedPlans);
			} catch (error) {
				console.error("Error fetching packages:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPackages();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<h2 className="text-3xl font-bold text-center mb-10">Vastu Packages</h2>

			<div className="flex flex-wrap justify-center gap-6">
				{plans.map((plan, index) => (
					<CommonConsultation
						key={index}
						plan={plan}
						style={planStyles[plan.name]}
					/>
				))}
			</div>
		</div>
	);
};

export default VastuConsultation;
