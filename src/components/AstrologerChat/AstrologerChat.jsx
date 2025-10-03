import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdChat } from "react-icons/md";
import socket from "../../utils/socket.js";
import { useAdminUsersQuery } from "../../hooks/useAdminApi";
import { useChatMessagesQuery } from "../../hooks/useChatApi";

const AstrologerChat = ({ astrologerId, studentId }) => {
	const [activeStudentId, setActiveStudentId] = useState(studentId ?? null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef(null);
	const [showSidebar, setShowSidebar] = useState(false);

	const { data: studentsData, isLoading: isStudentsLoading } =
		useAdminUsersQuery({
			select: (data) => data.students ?? [],
		});

	const students = useMemo(() => studentsData ?? [], [studentsData]);

	useEffect(() => {
		if (students.length === 0) return;
		setActiveStudentId(
			(prev) => prev ?? studentId ?? students[0]?._id ?? students[0]?.id ?? null
		);
	}, [students, studentId]);

	useEffect(() => {
		if (!astrologerId || !activeStudentId) return;
		socket.emit("joinChat", {
			userId: astrologerId,
			targetUserId: activeStudentId,
		});
	}, [astrologerId, activeStudentId]);

	const { data: fetchedMessages = [], refetch: refetchMessages } =
		useChatMessagesQuery(
			{ userId: astrologerId, targetUserId: activeStudentId },
			{ enabled: Boolean(astrologerId && activeStudentId) }
		);

	useEffect(() => {
		setMessages(fetchedMessages);
	}, [fetchedMessages]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = () => {
		if (!newMessage.trim() || !astrologerId || !activeStudentId) return;

		socket.emit("sendMessage", {
			name: "Astrologer",
			userId: astrologerId,
			targetUserId: activeStudentId,
			message: newMessage,
		});

		setMessages((prev) => [
			...prev,
			{
				id: Date.now(),
				sender: "me",
				text: newMessage,
				time: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			},
		]);

		setNewMessage("");
		refetchMessages();
	};

	useEffect(() => {
		const messageListener = (msg) => {
			if (msg.targetUserId !== astrologerId && msg.userId !== astrologerId) {
				return;
			}
			setMessages((prev) => [
				...prev,
				{
					id: Date.now(),
					sender: "them",
					text: msg.message,
					time: new Date(msg.timestamp).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
				},
			]);
		};

		socket.on("receiveMessage", messageListener);
		return () => {
			socket.off("receiveMessage", messageListener);
		};
	}, [astrologerId]);

	const activeStudent = useMemo(
		() => students.find((s) => (s._id ?? s.id) === activeStudentId),
		[students, activeStudentId]
	);

	return (
		<div className="flex mx-[1.5rem]">
			{/* Sidebar */}
			<div
				className={`fixed min-[600px]:static max-[600px]:h-screen top-[13%] left-0 bg-[#f4f4f4] border-r border-gray-300 transition-transform duration-300 z-50 ${
					showSidebar ? "translate-x-0" : "-translate-x-full"
				} min-[600px]:translate-x-0 w-[300px]`}
			>
				<h2 className="my-[1rem] font-semibold text-[1.15rem] text-gray-800 flex justify-between items-center px-3">
					Students
					<div className="hidden max-[600px]:block cursor-pointer rounded-full">
						<RxCross2 onClick={() => setShowSidebar(false)} />
					</div>
				</h2>

				<div className="overflow-y-auto max-h-[80vh]">
					{isStudentsLoading && (
						<p className="p-2 text-sm text-gray-500">Loading students…</p>
					)}
					{!isStudentsLoading && students.length === 0 && (
						<p className="p-2 text-sm text-gray-500">No students available.</p>
					)}
					{students.map((student) => {
						const studentKey = student._id ?? student.id;
						return (
							<div
								key={studentKey}
								onClick={() => {
									setActiveStudentId(studentKey);
									setShowSidebar(false);
								}}
								className={`flex flex-col border-b border-gray-300 p-2 cursor-pointer ${
									studentKey === activeStudentId ? "bg-white" : ""
								}`}
							>
								<div className="font-medium">{student.name}</div>
								<div className="text-xs text-gray-500">{student.email}</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Chat Window */}
			<div className="flex flex-col flex-1">
				<span className="w-fit my-[1rem] min-[600px]:hidden border text-gray-700 p-[8px] rounded-full shadow-lg cursor-pointer">
					<MdChat size={22} onClick={() => setShowSidebar(true)} />
				</span>

				{activeStudent ? (
					<>
						{/* Messages */}
						<div className="overflow-y-auto h-[500px] p-[1rem] thin-scrollbar">
							{messages.map((msg) => (
								<div key={msg.id}>
									<div
										className={`flex mb-1 ${
											msg.sender === "me" ? "justify-end" : "justify-start"
										}`}
									>
										<div
											className={`max-w-[60%] px-4 py-2 rounded-2xl min-shadow ${
												msg.sender === "me"
													? "bg-[#d20000] text-white"
													: "bg-gray-100 border border-gray-200 text-black"
											}`}
										>
											{msg.text}
										</div>
									</div>
									<div
										className={`text-[10px] mx-[1rem] opacity-60 ${
											msg.sender === "me" ? "text-right" : "text-left"
										}`}
									>
										{msg.time}
									</div>
								</div>
							))}
							<div ref={messagesEndRef} />
						</div>

						{/* Input Area */}
						<div className="flex gap-3 p-3 border-t border-gray-300">
							<input
								type="text"
								placeholder="Write your reply..."
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSend()}
								className="flex-1 px-4 py-2 border border-gray-300 bg-[#ddd] rounded-lg focus:outline-none"
							/>
							<button
								onClick={handleSend}
								className="bg-[#d20000] text-white px-4 py-2 rounded-lg cursor-pointer"
							>
								<IoMdSend size={22} />
							</button>
						</div>
					</>
				) : (
					<div className="flex justify-center items-center h-[500px] text-gray-500">
						Select a student to start chatting
					</div>
				)}
			</div>
		</div>
	);
};

export default AstrologerChat;
