import { Navigate } from "react-router-dom";
import StudentChat from "../components/StudentChat/StudentChat";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";

const StudentChatPage = () => {
	const user = useAppSelector(selectCurrentUser);

	// Only students can access this page
	if (!user) {
		return <Navigate to="/auth/login" replace />;
	}

	if (user.role !== "student") {
		return <Navigate to="/" replace />;
	}

	// Get astrologer ID (assuming it's stored in user object or fetch from backend)
	const astrologerId = user.astrologerId || ""; // You may need to fetch this from backend

	return (
		<StudentChat
			userId={user._id}
			targetUserId={astrologerId}
			name={user.name}
		/>
	);
};

export default StudentChatPage;
