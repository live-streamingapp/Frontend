import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";
import { ADMIN_NOTIFICATIONS } from "../utils/constants";

const AdminLayout = () => {
	const [showNotification, setShowNotification] = useState(false);
	const notificationRef = useRef(null);
	return (
		<div className="flex min-h-screen">
			<div className="sticky left-0 top-0 h-screen">
				<Sidebar />
			</div>
			<div className="flex-1 flex flex-col">
				<Topbar
					showNotification={showNotification}
					setShowNotification={setShowNotification}
					notificationRef={notificationRef}
					notifications={ADMIN_NOTIFICATIONS}
				/>
				<main className="p-4 flex-1">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
