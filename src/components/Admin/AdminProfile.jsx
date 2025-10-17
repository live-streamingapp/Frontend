import { useMemo } from "react";
import { FaEnvelope, FaPhoneAlt, FaUserShield } from "react-icons/fa";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { useCurrentUserQuery } from "../../hooks/useAuthApi";

const defaultAdminDetails = {
	name: "—",
	email: "—",
	role: "—",
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
	const currentUser = useAppSelector(selectCurrentUser);
	const { data: fetchedUser } = useCurrentUserQuery({
		enabled: !currentUser,
	});

	const adminDetails = useMemo(() => {
		const user = currentUser ?? fetchedUser;
		if (!user) return defaultAdminDetails;
		return {
			name: user.name ?? defaultAdminDetails.name,
			email: user.email ?? defaultAdminDetails.email,
			role: user.role ?? defaultAdminDetails.role,
			phone: user.phone ?? defaultAdminDetails.phone,
		};
	}, [currentUser, fetchedUser]);

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
			<header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-gray-100 pb-6">
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-semibold text-gray-900">
						{adminDetails.name}
					</h1>
					<p className="text-sm text-gray-500">{adminDetails.role}</p>
				</div>
				{/* Edit Profile button hidden until edit flow is implemented */}
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

			{/* Removed static Security & Activity placeholders */}
		</div>
	);
}

export default AdminProfile;
