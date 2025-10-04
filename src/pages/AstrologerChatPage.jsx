import { Navigate } from "react-router-dom";
import AstrologerChat from "../components/AstrologerChat/AstrologerChat";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";

const AstrologerChatPage = () => {
	const user = useAppSelector(selectCurrentUser);

	// Only astrologer/admin can access this page
	if (!user) {
		return <Navigate to="/auth/login" replace />;
	}

	if (user.role !== "astrologer" && user.role !== "admin") {
		return <Navigate to="/admin/dashboard" replace />;
	}

	// Astrologer starts with no student selected (will select from chat list)
	return <AstrologerChat astrologerId={user._id} studentId="" />;
};

export default AstrologerChatPage;
