import React, { useState, useRef, useEffect, useMemo } from "react";
import { IoMdSend } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdChat } from "react-icons/md";
import { useEnrolledCoursesQuery } from "../../hooks/useEnrolledCoursesApi";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import toast from "react-hot-toast";

const StudentGroupChat = () => {
	const { data: enrolledCourses = [], isLoading: coursesLoading } =
		useEnrolledCoursesQuery();
	const user = useSelector((state) => state.auth.user);
	const queryClient = useQueryClient();

	const [activeCourseId, setActiveCourseId] = useState(enrolledCourses[0]?._id);
	const [newMessage, setNewMessage] = useState("");
	const messagesEndRef = useRef(null);
	const [showSidebar, setShowSidebar] = useState(false);

	// Update active course when enrolled courses change
	useEffect(() => {
		if (enrolledCourses.length > 0 && !activeCourseId) {
			setActiveCourseId(enrolledCourses[0]._id);
		}
	}, [enrolledCourses, activeCourseId]);

	// Fetch forum messages for active course
	const { data: forumData, isLoading: messagesLoading } = useQuery({
		queryKey: ["forum-messages", activeCourseId],
		queryFn: async () => {
			if (!activeCourseId) return { messages: [] };
			const response = await apiClient.get(
				`/forums/${activeCourseId}/messages`
			);
			return response.data;
		},
		enabled: !!activeCourseId,
	});

	// Send message mutation
	const sendMessageMutation = useMutation({
		mutationFn: async (messageData) => {
			const response = await apiClient.post(
				`/forums/${activeCourseId}/messages`,
				messageData
			);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["forum-messages", activeCourseId]);
			setNewMessage("");
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "Failed to send message");
		},
	});

	const messages = useMemo(() => forumData?.messages || [], [forumData]);

	const handleSend = () => {
		if (!newMessage.trim()) return;

		sendMessageMutation.mutate({
			message: newMessage,
		});
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	if (coursesLoading) {
		return <div className="mx-[1.5rem] my-[1.5rem]">Loading courses...</div>;
	}

	if (enrolledCourses.length === 0) {
		return (
			<div className="mx-[1.5rem] my-[1.5rem]">
				You are not enrolled in any courses yet.
			</div>
		);
	}

	return (
		<div className="flex mx-[1.5rem]">
			{/* Sidebar */}
			<div
				className={`fixed min-[600px]:static max-[600px]:h-screen top-[13%] left-0 bg-[#f4f4f4] border-r border-gray-300 
            transition-transform duration-300 z-50
            ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
            min-[600px]:translate-x-0 w-[300px]`}
			>
				<h2 className="my-[1rem] font-semibold text-[1.15rem] text-gray-800 flex justify-between items-center px-3">
					Course Forums
					<div className="hidden max-[600px]:block cursor-pointer rounded-full">
						<RxCross2 onClick={() => setShowSidebar(false)} />
					</div>
				</h2>

				{enrolledCourses.map((course) => (
					<div
						key={course._id}
						onClick={() => {
							setActiveCourseId(course._id);
							setShowSidebar(false);
						}}
						className={`flex flex-col border-b border-gray-300 p-2 cursor-pointer ${
							course._id === activeCourseId ? "bg-white" : ""
						}`}
					>
						<div className="flex items-center gap-3">
							<img
								src={course.image || "/images/course.png"}
								alt=""
								className="w-10 h-10 rounded-full object-cover"
							/>
							<span className="font-medium">{course.title}</span>
						</div>
						<div className="text-xs text-gray-500">
							{course.description?.substring(0, 40)}...
						</div>
					</div>
				))}
			</div>

			{/* Chat Window */}
			<div className="flex flex-col flex-1">
				<span className="w-fit my-[1rem] min-[600px]:hidden border text-gray-700 p-[8px] rounded-full shadow-lg cursor-pointer">
					<MdChat size={22} onClick={() => setShowSidebar(true)} />
				</span>

				{messagesLoading ? (
					<div className="p-[1rem]">Loading messages...</div>
				) : (
					<>
						<div className="overflow-y-auto h-[500px] p-[1rem] thin-scrollbar">
							{messages.map((msg) => {
								const isMyMessage = msg.sender._id === user?._id;
								return (
									<div key={msg._id}>
										<div
											className={`flex mb-1 ${
												isMyMessage ? "justify-end" : "justify-start"
											}`}
										>
											<div
												className={`max-w-[60%] px-4 py-2 rounded-2xl min-shadow ${
													isMyMessage
														? "bg-[#d20000] text-white"
														: "bg-gray-100 border border-gray-200 text-black"
												}`}
											>
												{!isMyMessage && (
													<div className="text-[11px] font-semibold mb-[2px]">
														{msg.sender.name}
													</div>
												)}
												{msg.message}
											</div>
										</div>
										<div
											className={`text-[10px] mx-[1rem] opacity-60 ${
												isMyMessage ? "text-right" : "text-left"
											}`}
										>
											{new Date(msg.createdAt).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</div>
									</div>
								);
							})}
							<div ref={messagesEndRef} />
						</div>

						{/* Input */}
						<div className="flex gap-3 p-3 border-t border-gray-300">
							<input
								type="text"
								placeholder="Write your query..."
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
				)}
			</div>
		</div>
	);
};

export default StudentGroupChat;
