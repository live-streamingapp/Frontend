import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";
import toast from "react-hot-toast";
import apiClient from "../utils/apiClient";

/**
 * Simplified Live Session Page - Working Implementation
 * Admin: Can publish video/audio as host
 * Student: Can subscribe to streams as viewer
 */
const SessionPageSimple = () => {
	const { sessionId } = useParams();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const isAdmin = user?.role === "admin" || user?.role === "astrologer";

	// Session state
	const [session, setSession] = useState(null);
	const [loading, setLoading] = useState(true);

	// Agora state
	const [isJoined, setIsJoined] = useState(false);
	const [isVideoOn, setIsVideoOn] = useState(true);
	const [isAudioOn, setIsAudioOn] = useState(true);
	const [remoteUsers, setRemoteUsers] = useState([]);

	// Refs
	const clientRef = useRef(null);
	const localVideoRef = useRef(null);
	const localAudioRef = useRef(null);
	const videoContainerRef = useRef(null);

	// Fetch session
	useEffect(() => {
		const fetchSession = async () => {
			try {
				const response = await apiClient.get(`/sessions/${sessionId}`);
				setSession(response.data?.data);
				setLoading(false);
			} catch (err) {
				console.error("Error fetching session:", err);
				toast.error("Failed to load session");
				setLoading(false);
			}
		};
		fetchSession();
	}, [sessionId]);

	// Join Agora channel
	useEffect(() => {
		if (!session || isJoined) return;

		const joinChannel = async () => {
			try {
				console.log("=== Joining Agora Channel ===");

				// Call join API to get credentials
				const joinResponse = await apiClient.post(
					`/sessions/${sessionId}/join`
				);
				const joinData = joinResponse.data?.data;

				const appId = joinData.appId || import.meta.env.VITE_AGORA_APP_ID;
				const channelName = joinData.channelName;
				const token = joinData.token;

				console.log("Join config:", { appId, channelName, hasToken: !!token });

				// Create client
				clientRef.current = AgoraRTC.createClient({
					mode: "rtc",
					codec: "vp8",
				});

				// Event handlers
				clientRef.current.on("user-published", async (agoraUser, mediaType) => {
					await clientRef.current.subscribe(agoraUser, mediaType);

					if (mediaType === "video") {
						setRemoteUsers((prev) => {
							const filtered = prev.filter((u) => u.uid !== agoraUser.uid);
							return [...filtered, agoraUser];
						});
					}

					if (mediaType === "audio") {
						agoraUser.audioTrack?.play();
					}
				});

				clientRef.current.on("user-unpublished", (agoraUser) => {
					setRemoteUsers((prev) => prev.filter((u) => u.uid !== agoraUser.uid));
				});

				clientRef.current.on("user-left", (agoraUser) => {
					setRemoteUsers((prev) => prev.filter((u) => u.uid !== agoraUser.uid));
				});

				// Join channel
				await clientRef.current.join(appId, channelName, token, null);
				console.log("Joined Agora channel successfully");

				setIsJoined(true);
				toast.success("Joined session!");

				// If admin, create and publish tracks
				if (isAdmin) {
					try {
						// Create video track
						localVideoRef.current = await AgoraRTC.createCameraVideoTrack();

						// Create audio track
						localAudioRef.current = await AgoraRTC.createMicrophoneAudioTrack();

						// Play local video
						if (videoContainerRef.current) {
							localVideoRef.current.play(videoContainerRef.current);
						}

						// Publish tracks
						await clientRef.current.publish([
							localVideoRef.current,
							localAudioRef.current,
						]);

						console.log("Published tracks successfully");
						toast.success("You are now live!");
					} catch (err) {
						console.error("Error creating/publishing tracks:", err);
						toast.error("Could not access camera/microphone");
					}
				}
			} catch (err) {
				console.error("Error joining channel:", err);
				toast.error(err.response?.data?.message || "Failed to join session");
			}
		};

		joinChannel();

		// Cleanup
		return () => {
			if (clientRef.current) {
				if (localVideoRef.current) {
					localVideoRef.current.stop();
					localVideoRef.current.close();
				}
				if (localAudioRef.current) {
					localAudioRef.current.stop();
					localAudioRef.current.close();
				}
				clientRef.current.leave();
				clientRef.current.removeAllListeners();
			}
		};
	}, [session, isJoined, sessionId, isAdmin]);

	// Toggle video
	const toggleVideo = async () => {
		if (localVideoRef.current) {
			const newState = !isVideoOn;
			await localVideoRef.current.setEnabled(newState);
			setIsVideoOn(newState);
		}
	};

	// Toggle audio
	const toggleAudio = async () => {
		if (localAudioRef.current) {
			const newState = !isAudioOn;
			await localAudioRef.current.setEnabled(newState);
			setIsAudioOn(newState);
		}
	};

	// Leave session
	const leaveSession = async () => {
		try {
			if (clientRef.current) {
				if (localVideoRef.current) {
					localVideoRef.current.stop();
					localVideoRef.current.close();
				}
				if (localAudioRef.current) {
					localAudioRef.current.stop();
					localAudioRef.current.close();
				}
				await clientRef.current.leave();
			}

			// Record attendance for students
			if (!isAdmin) {
				await apiClient.post(`/sessions/${sessionId}/leave`, {
					attendanceDuration: 0,
					participationScore: 0,
				});
			}

			toast.success("Left session");
			navigate(-1);
		} catch (err) {
			console.error("Error leaving:", err);
			navigate(-1);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
					<p className="text-white">Loading session...</p>
				</div>
			</div>
		);
	}

	if (!session) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center">
				<div className="text-center">
					<h3 className="text-xl text-white mb-4">Session not found</h3>
					<button
						onClick={() => navigate(-1)}
						className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900 flex flex-col">
			{/* Header */}
			<div className="bg-gray-800 border-b border-gray-700 p-4">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div>
						<h1 className="text-xl font-semibold text-white">
							{session.title}
						</h1>
						<p className="text-gray-400 text-sm">
							{session.course?.title}
							{isAdmin && <span className="ml-2 text-red-400">(HOST)</span>}
						</p>
					</div>
					<button
						onClick={leaveSession}
						className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
					>
						Leave
					</button>
				</div>
			</div>

			{/* Video Grid */}
			<div className="flex-1 p-4">
				{!isJoined ? (
					<div className="flex items-center justify-center h-full">
						<div className="text-center text-white">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
							<p>Connecting...</p>
						</div>
					</div>
				) : (
					<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{/* Local Video (Admin only) */}
						{isAdmin && (
							<div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
								<div ref={videoContainerRef} className="w-full h-full" />
								<div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
									You (Host)
								</div>
								{!isVideoOn && (
									<div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
										<span className="text-white">Camera Off</span>
									</div>
								)}
							</div>
						)}

						{/* Remote Videos */}
						{remoteUsers.map((agoraUser) => (
							<div
								key={agoraUser.uid}
								className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video"
							>
								<div
									ref={(container) => {
										if (container && agoraUser.videoTrack) {
											agoraUser.videoTrack.play(container);
										}
									}}
									className="w-full h-full"
								/>
								<div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
									User {agoraUser.uid}
								</div>
							</div>
						))}

						{/* Waiting message */}
						{remoteUsers.length === 0 && !isAdmin && (
							<div className="col-span-full bg-gray-800 rounded-lg p-12 text-center">
								<p className="text-gray-400">Waiting for host...</p>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Controls (Admin only) */}
			{isAdmin && isJoined && (
				<div className="bg-gray-800 border-t border-gray-700 p-4">
					<div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
						<button
							onClick={toggleVideo}
							className={`p-4 rounded-full ${
								isVideoOn ? "bg-blue-500" : "bg-red-500"
							} text-white hover:opacity-90`}
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								{isVideoOn ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
									/>
								)}
							</svg>
						</button>
						<button
							onClick={toggleAudio}
							className={`p-4 rounded-full ${
								isAudioOn ? "bg-blue-500" : "bg-red-500"
							} text-white hover:opacity-90`}
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								{isAudioOn ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SessionPageSimple;
