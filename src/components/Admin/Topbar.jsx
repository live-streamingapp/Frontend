import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { ADMIN_HIDE_GREETING_PATHS } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectCurrentUser } from "../../store/slices/authSlice";
import apiClient from "../../utils/apiClient";

const Topbar = ({
	showNotification,
	setShowNotification,
	notificationRef,
	notifications,
}) => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const profileRef = useRef(null);

	const shouldHideGreeting = ADMIN_HIDE_GREETING_PATHS.some((path) =>
		location.pathname.startsWith(path)
	);

	// Close profile dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (profileRef.current && !profileRef.current.contains(e.target)) {
				setShowProfileMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleLogout = async () => {
		try {
			// Call logout API to clear server-side cookie
			await apiClient.post("/logout");
		} catch (error) {
			console.error("Logout API error:", error);
		} finally {
			// Clear client-side state regardless of API result
			Cookies.remove("token");
			dispatch(logout());
		}
	};

	return (
		<div
			className="flex justify-between items-center px-4 sm:px-6 border-b border-[#ddd] sticky left-0 top-0 z-[10] shadow-sm"
			style={{
				backgroundColor: "#FBFBFB",
				width: "1123px",
				height: "106px",
			}}
		>
			{/* Conditionally render greeting */}
			{!shouldHideGreeting ? (
				<div className="flex flex-col leading-tight">
					<span className="text-[#666] whitespace-nowrap text-[16px]">
						Welcome !
					</span>
					<span className="font-bold text-[#333] whitespace-nowrap text-[16px]">
						{currentUser?.name || currentUser?.role || "Admin"}
					</span>
				</div>
			) : (
				<div></div>
			)}

			<div className="flex items-center gap-4 w-full justify-end">
				{/* Notification Section */}
				<div ref={notificationRef} className="relative">
					<button
						className="relative cursor-pointer flex items-center justify-center bg-white border border-gray-200 h-[54px] w-[54px] rounded-full"
						onClick={() => setShowNotification((prev) => !prev)}
					>
						<FaBell className="text-gray-700" />
					</button>

					{/* Notifications Dropdown */}
					<div
						className={`absolute top-[90%] right-0 w-[320px] bg-white shadow-xl px-[8px] py-[16px] rounded-lg border border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${
							showNotification
								? "max-h-[400px] opacity-100 z-50"
								: "max-h-0 opacity-0"
						}`}
					>
						<h3 className="text-lg font-semibold text-gray-800 mb-[5px]">
							Notifications
						</h3>
						<ul className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto thin-scrollbar">
							{notifications.map((note) => (
								<li key={note.id}>
									<Link
										to={note.path || "#"}
										className="block hover:bg-gray-100 p-2 rounded-md transition-colors duration-200"
									>
										<p className="text-sm font-medium text-gray-800">
											{note.title}
										</p>
										<p className="text-xs text-gray-600">{note.message}</p>
										<p className="text-[10px] text-gray-400 mt-1">
											{note.time}
										</p>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Profile Dropdown */}
				<div ref={profileRef} className="relative">
					<button
						className="flex items-center gap-2 cursor-pointer bg-white border border-gray-200 h-[54px] px-4 rounded-full"
						onClick={() => setShowProfileMenu((prev) => !prev)}
					>
						<FaUserCircle className="text-gray-700 text-xl" />
						<span className="hidden sm:block font-medium text-gray-700">
							{currentUser?.name || "User"}
						</span>
					</button>

					{/* Profile Menu */}
					<div
						className={`absolute top-[90%] right-0 w-[200px] bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
							showProfileMenu
								? "max-h-[400px] opacity-100 z-50"
								: "max-h-0 opacity-0"
						}`}
					>
						<ul className="divide-y divide-gray-100">
							<li>
								<Link
									to="/admin/profile"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									My Profile
								</Link>
							</li>
							<li>
								<Link
									to="/admin/settings"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Settings
								</Link>
							</li>
							<li>
								<button
									onClick={handleLogout}
									className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
