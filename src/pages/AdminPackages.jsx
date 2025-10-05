import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CommonConsultation from "../components/PackagePlans/CommonConsultation";

const planStyles = {
	Basic: {
		gradient: "bg-white text-black border-2 border-gray-200",
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

const AdminPackages = () => {
	const navigate = useNavigate();
	const [packages, setPackages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState({
		category: "",
		subCategory: "",
		page: 1,
		limit: 10,
	});

	const fetchPackages = useCallback(async () => {
		try {
			setLoading(true);
			const params = new URLSearchParams();
			params.append("serviceType", "package");
			if (filter.category) params.append("category", filter.category);
			if (filter.subCategory) params.append("subCategory", filter.subCategory);
			params.append("page", filter.page);
			params.append("limit", filter.limit);

			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/services?${params.toString()}`,
				{ withCredentials: true }
			);

			setPackages(response.data.data);
		} catch (error) {
			console.error("Error fetching packages:", error);
			toast.error("Failed to fetch packages");
		} finally {
			setLoading(false);
		}
	}, [filter]);

	useEffect(() => {
		fetchPackages();
	}, [fetchPackages]);

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this package?"))
			return;

		try {
			await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/services/${id}`, {
				withCredentials: true,
			});
			toast.success("Package deleted successfully");
			fetchPackages();
		} catch (error) {
			console.error("Error deleting package:", error);
			toast.error("Failed to delete package");
		}
	};

	const handleEdit = (id) => {
		navigate("/admin/create-service", {
			state: {
				serviceType: "package",
				editId: id,
			},
		});
	};

	const handleCreateNew = () => {
		navigate("/admin/create-service", {
			state: { serviceType: "package" },
		});
	};

	// Transform packages to card format
	const transformedPackages = packages.map((pkg) => ({
		id: pkg._id,
		name: getPlanTier(pkg.price),
		price: pkg.price,
		desc: pkg.description,
		features: pkg.features || [],
		subCategory: pkg.subCategory,
	}));

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Packages Management</h1>
				<button
					onClick={handleCreateNew}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Create New Package
				</button>
			</div>

			{/* Filters */}
			<div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
				<select
					value={filter.category}
					onChange={(e) => setFilter({ ...filter, category: e.target.value })}
					className="border rounded px-3 py-2"
				>
					<option value="">All Categories</option>
					<option value="vastu">Vastu</option>
					<option value="astrology">Astrology</option>
					<option value="numerology">Numerology</option>
					<option value="spiritual">Spiritual</option>
					<option value="other">Other</option>
				</select>

				<input
					type="text"
					placeholder="Filter by sub-category"
					value={filter.subCategory}
					onChange={(e) =>
						setFilter({ ...filter, subCategory: e.target.value })
					}
					className="border rounded px-3 py-2"
				/>

				<button
					onClick={() =>
						setFilter({ category: "", subCategory: "", page: 1, limit: 10 })
					}
					className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
				>
					Clear Filters
				</button>
			</div>

			{/* Packages Grid */}
			{loading ? (
				<div className="flex justify-center py-8">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
				</div>
			) : packages.length === 0 ? (
				<div className="bg-white rounded-lg shadow p-8 text-center">
					<p className="text-gray-500 mb-4">
						No packages found. Create your first package to get started.
					</p>
					<button
						onClick={handleCreateNew}
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
					>
						Create First Package
					</button>
				</div>
			) : (
				<div className="flex flex-wrap gap-6 justify-center">
					{transformedPackages.map((pkg) => (
						<CommonConsultation
							key={pkg.id}
							plan={pkg}
							style={planStyles[pkg.name] || planStyles.Basic}
							isAdmin={true}
							onEdit={handleEdit}
							onDelete={handleDelete}
							serviceId={pkg.id}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default AdminPackages;
