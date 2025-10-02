import { useEffect, useState } from "react";
import AstrologerChat from "../components/AstrologerChat/AstrologerChat";
import StudentChat from "../components/StudentChat/StudentChat";

const ChatPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [astrologerID, setAstrologerID] = useState("");
  const [studentID, setStudentID] = useState("");

  // ✅ Only run this when user changes
  useEffect(() => {
    if (!user) return;
    if (user.role === "astrologer") {
      setAstrologerID(user._id);
      setStudentID(""); // Astrologer starts with no student selected
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
      {user.role === "astrologer" ? (
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
