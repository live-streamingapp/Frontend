import { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaUserShield } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const defaultAdminDetails = {
	name: "Admin",
	email: "admin@example.com",
	role: "Administrator",
	phone: "—",
};

const InfoRow = ({ icon, label, value }) => (
	<div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
		<span className="text-[#BB0E00] text-lg">{icon}</span>
		<div className="flex flex-col">
			<span className="text-xs uppercase tracking-wide text-gray-400">
				{label}
			</span>
			<span className="text-sm font-medium text-gray-800">{value}</span>
		</div>
	</div>
);

function AdminProfile() {
	const [adminDetails, setAdminDetails] = useState(defaultAdminDetails);

	useEffect(() => {
		const token = Cookies.get("token");
		if (!token) return;

		try {
			const decoded = jwtDecode(token);
			setAdminDetails((prev) => ({
				name: decoded?.admin?.name || decoded?.name || prev.name,
				email: decoded?.admin?.email || decoded?.email || prev.email,
				role: decoded?.role || prev.role,
				phone: decoded?.admin?.phone || prev.phone,
			}));
		} catch (error) {
			console.warn("Failed to decode admin token", error);
		}
	}, []);

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
			<header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-gray-100 pb-6">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-semibold text-gray-900">
						{adminDetails.name}
					</h1>
					<p className="text-sm text-gray-500">{adminDetails.role}</p>
				</div>
				<button className="inline-flex items-center gap-2 text-sm font-medium text-[#BB0E00] border border-[#BB0E00] rounded-full px-4 py-2 hover:bg-[#FFF4F3] transition">
					<LuPencil />
					Edit Profile
				</button>
			</header>

			<section className="grid gap-4 md:grid-cols-2 mt-6">
				<InfoRow
					icon={<FaUserShield />}
					label="Role"
					value={adminDetails.role}
				/>
				<InfoRow
					icon={<FaEnvelope />}
					label="Email"
					value={adminDetails.email}
				/>
				<InfoRow
					icon={<FaPhoneAlt />}
					label="Phone"
					value={adminDetails.phone}
				/>
			</section>

			<section className="mt-8">
				<h2 className="text-lg font-semibold text-gray-900 mb-3">
					Security & Activity
				</h2>
				<div className="space-y-3">
					<p className="text-sm text-gray-500">
						Last login:{" "}
						<span className="font-medium text-gray-700">Just now</span>
					</p>
					<p className="text-sm text-gray-500">
						Two-factor authentication:{" "}
						<span className="font-medium text-gray-700">Coming soon</span>
					</p>
				</div>
			</section>
		</div>
	);
}

export default AdminProfile;
