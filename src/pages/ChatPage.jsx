import { useEffect, useState } from "react";
import AstrologerChat from "../components/AstrologerChat/AstrologerChat";
import StudentChat from "../components/StudentChat/StudentChat";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";

const ChatPage = () => {
	const user = useAppSelector(selectCurrentUser);
	const [astrologerID, setAstrologerID] = useState("");
	const [studentID, setStudentID] = useState("");

	// ✅ Only run this when user changes
	useEffect(() => {
		if (!user) return;
		if (user.role === "astrologer" || user.role === "admin") {
			setAstrologerID(user._id);
			setStudentID(""); // Astrologer/Admin starts with no student selected
		}
		if (user.role === "student") {
			setStudentID(user._id);
			setAstrologerID(user.astrologerId || ""); // If astrologerId is available in user object
		}
	}, [user]);

	if (!user) return <p>Please log in first</p>;

	// Only block for students if IDs are missing
	if (user.role === "student" && (!studentID || !astrologerID)) {
		return <p>Loading chat...</p>;
	}

	return (
		<>
			{user.role === "astrologer" || user.role === "admin" ? (
				<AstrologerChat astrologerId={astrologerID} studentId={studentID} />
			) : (
				<StudentChat
					userId={studentID}
					targetUserId={astrologerID}
					name={user?.name}
				/>
			)}
		</>
	);
};

export default ChatPage;
