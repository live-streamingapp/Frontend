import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	useSessionQuery,
	useJoinSessionMutation,
} from "../hooks/useSessionApi.js";
import AgoraRTC from "agora-rtc-sdk-ng";
import toast from "react-hot-toast";

/**
 * Simplified Live Session Page
 * Admin can start and stream, students can watch
 */
const SessionPageUIKit = () => {
	const { sessionId } = useParams();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const isAdmin = user?.role === "admin" || user?.role === "astrologer";

	// Fetch session data
	const { data: session, isLoading, error } = useSessionQuery(sessionId);
	const joinSessionMutation = useJoinSessionMutation();

	// Agora state
	const [isJoined, setIsJoined] = useState(false);
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);
	const [remoteUsers, setRemoteUsers] = useState([]);
	const [connectionError, setConnectionError] = useState(null);

	// Refs
	const clientRef = useRef(null);
	const localVideoTrackRef = useRef(null);
	const localAudioTrackRef = useRef(null);
	const localVideoContainerRef = useRef(null);
	const hasJoinedRef = useRef(false);

	// Agora event handlers
	useEffect(() => {
		if (!client) return;

		const handleUserPublished = async (user, mediaType) => {
			console.log("User published:", user.uid, mediaType);
			await client.subscribe(user, mediaType);

			if (mediaType === "video") {
				const remoteVideoTrack = user.videoTrack;
				const playerContainer = remoteVideoRefs.current[user.uid];
				if (playerContainer && remoteVideoTrack) {
					remoteVideoTrack.play(playerContainer);
				}
			}

			if (mediaType === "audio") {
				user.audioTrack?.play();
			}

			setRemoteUsers((prev) => {
				const updated = prev.filter((u) => u.uid !== user.uid);
				return [...updated, user];
			});
		};

		const handleUserUnpublished = (user, mediaType) => {
			console.log("User unpublished:", user.uid, mediaType);
			setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
		};

		const handleUserLeft = (user) => {
			console.log("User left:", user.uid);
			setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
		};

		client.on("user-published", handleUserPublished);
		client.on("user-unpublished", handleUserUnpublished);
		client.on("user-left", handleUserLeft);

		return () => {
			client.off("user-published", handleUserPublished);
			client.off("user-unpublished", handleUserUnpublished);
			client.off("user-left", handleUserLeft);
		};
	}, [client]);

	// Join channel
	const handleLeaveChannel = async () => {
		try {
			console.log("Leaving channel...");

			// Stop and close local tracks
			if (localVideoTrack) {
				localVideoTrack.stop();
				localVideoTrack.close();
				setLocalVideoTrack(null);
			}

			if (localAudioTrack) {
				localAudioTrack.stop();
				localAudioTrack.close();
				setLocalAudioTrack(null);
			}

			// Leave the channel
			await client.leave();
			setIsJoined(false);
			setRemoteUsers([]);

			// Reset join API flag so user can rejoin if needed
			hasCalledJoinApiRef.current = false;

			console.log("Successfully left channel");

			// Navigate back
			navigate(-1);
		} catch (error) {
			console.error("Error leaving channel:", error);
			hasCalledJoinApiRef.current = false; // Reset on error too
			navigate(-1);
		}
	};

	// Toggle video
	const toggleVideo = async () => {
		if (localVideoTrack) {
			await localVideoTrack.setEnabled(!isVideoEnabled);
			setIsVideoEnabled(!isVideoEnabled);
		}
	};

	// Toggle audio
	const toggleAudio = async () => {
		if (localAudioTrack) {
			await localAudioTrack.setEnabled(!isAudioEnabled);
			setIsAudioEnabled(!isAudioEnabled);
		}
	};

	// Auto-join when session data is loaded
	useEffect(() => {
		// Early return if session data is not loaded yet
		if (!session || !session._id) {
			console.log("Session not loaded yet, skipping Agora initialization");
			return;
		}

		let appId = import.meta.env.VITE_AGORA_APP_ID;

		// Fallback App ID for testing - REMOVE IN PRODUCTION
		if (!appId || appId.trim() === "") {
			appId = "6754a391dfc04a948834902edcfd3ede"; // Direct from .env file
			console.warn(
				"Using fallback App ID - check environment variable loading"
			);
		}

		// Debug the App ID
		console.log("=== AGORA DEBUG INFO ===");
		console.log("App ID:", appId);
		console.log("App ID type:", typeof appId);
		console.log("App ID length:", appId?.length);
		console.log("App ID trimmed:", appId?.trim());

		// Validate App ID format (should be 32 character hex string)
		const isValidAppId = /^[a-f0-9]{32}$/i.test(appId?.trim() || "");
		console.log("Is valid App ID format:", isValidAppId);

		// Run diagnostic test
		validateAppId(appId);

		console.log("All env vars:", import.meta.env);
		console.log("Session data:", session);
		console.log(
			"Channel name:",
			session?.agora?.channelName || session?._id || "No session"
		);
		console.log("Is joined:", isJoined);
		console.log("=========================");

		// Run connection test before attempting to join
		if (isValidAppId && session?._id) {
			console.log("🔧 Running Agora connection test...");
			testAgoraConnection(appId, session.agora?.channelName || session._id)
				.then((result) => {
					console.log("🔧 Connection test result:", result);
					if (!result.success) {
						console.error(
							"🔧 Connection test failed - this explains the join error"
						);

						// Show user-friendly error based on token requirement
						if (result.requiresToken === true) {
							setAgoraError(
								"Token authentication required. Please enable Primary Certificate in Agora Console and add AGORA_APP_CERTIFICATE to server."
							);
						} else if (result.requiresToken === false) {
							setAgoraError(
								"Token mismatch: Your Agora project is in Testing Mode (no token required), but the backend is sending a token. Please enable Primary Certificate in Agora Console or remove AGORA_APP_CERTIFICATE from server .env"
							);
						}
					}
				})
				.catch((err) => {
					console.error("🔧 Connection test error:", err);
				});
		}

		if (session && session._id && !isJoined && appId && appId.trim() !== "") {
			const joinChannelAsync = async () => {
				try {
					console.log("Joining channel...");

					// Try to fetch fresh join credentials from server
					// Only call once to prevent duplicate toasts
					let channel = session.agora?.channelName || session._id;
					let token = session.agora?.token || null;

					if (!hasCalledJoinApiRef.current) {
						try {
							console.log("Calling join API for session:", session._id);
							hasCalledJoinApiRef.current = true; // Mark as called
							const resp = await joinSessionMutation.mutateAsync(session._id);
							const payload = resp?.data || resp;
							if (payload) {
								channel = payload.channelName || channel;
								token = payload.token ?? token;
							}
							console.log("Join API successful");
						} catch (e) {
							console.warn(
								"Join API failed; proceeding with existing session fields:",
								e?.message || e
							);
							hasCalledJoinApiRef.current = false; // Reset on error
						}
					} else {
						console.log("Skipping join API call - already called");
					}
					const uid = null; // Let Agora generate UID

					console.log("Join params:", { appId, channel, token, uid });

					// Check if client is already connected
					if (
						client.connectionState === "CONNECTED" ||
						client.connectionState === "CONNECTING"
					) {
						console.log("Client already connected/connecting, skipping join");
						return;
					}

					// Debug exactly what we're passing to Agora
					console.log("=== JOINING CHANNEL ===");
					console.log("Final appId value:", appId);
					console.log("Final appId type:", typeof appId);
					console.log("Final appId length:", appId?.length);
					console.log("Channel:", channel);
					console.log("Token:", token);
					console.log("UID:", uid);
					console.log("========================");

					// Join the channel
					await client.join(appId, channel, token, uid);
					setIsJoined(true);
					console.log("Successfully joined channel");

					// Create and publish local tracks if admin or host
					if (isAdmin) {
						console.log("Creating local tracks for admin/host...");

						// Create video track
						const videoTrack = await AgoraRTC.createCameraVideoTrack();
						setLocalVideoTrack(videoTrack);

						// Create audio track
						const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
						setLocalAudioTrack(audioTrack);

						// Play local video
						if (localVideoRef.current && videoTrack) {
							videoTrack.play(localVideoRef.current);
						}

						// Publish tracks
						await client.publish([videoTrack, audioTrack]);
						console.log("Published local tracks");
					}
				} catch (error) {
					console.error("Error joining channel:", error);
					console.error("Error details:", error.message);
					console.error("Error code:", error.code);

					// Handle specific Agora errors
					if (error.code === "CAN_NOT_GET_GATEWAY_SERVER") {
						console.error("❌ AGORA APP ID ERROR");
						console.error(
							"The App ID might be invalid, expired, or from a deleted project"
						);
						console.error("Current App ID:", appId);
						console.error("Solutions:");
						console.error("1. Check if the App ID exists in Agora Console");
						console.error("2. Create a new project in Agora Console");
						console.error("3. Update VITE_AGORA_APP_ID in .env file");
						console.error(
							"4. Make sure the project is in 'Testing' or 'Live' mode"
						);

						// Set error state to show user-friendly message
						setAgoraError("Invalid Agora App ID. Please check configuration.");
					}
				}
			};

			joinChannelAsync();
		} else {
			console.log("Skipping join - conditions not met:", {
				hasSession: !!session,
				isJoined,
				hasAppId: !!appId,
				appIdValue: appId,
			});
		}

		// Cleanup on unmount
		return () => {
			if (isJoined) {
				const leaveChannelAsync = async () => {
					try {
						console.log("Leaving channel...");

						// Stop and close local tracks
						if (localVideoTrack) {
							localVideoTrack.stop();
							localVideoTrack.close();
							setLocalVideoTrack(null);
						}

						if (localAudioTrack) {
							localAudioTrack.stop();
							localAudioTrack.close();
							setLocalAudioTrack(null);
						}

						// Leave the channel
						await client.leave();
						setIsJoined(false);
						setRemoteUsers([]);
						console.log("Successfully left channel");
					} catch (error) {
						console.error("Error leaving channel:", error);
					}
				};

				leaveChannelAsync();
			}
		};
	}, [
		session,
		isJoined,
		isAdmin,
		client,
		localVideoTrack,
		localAudioTrack,
		joinSessionMutation,
	]);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading session...</p>
				</div>
			</div>
		);
	}

	if (error || !session) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h3 className="text-xl font-semibold text-gray-900 mb-2">
						{error ? "Error loading session" : "Session not found"}
					</h3>
					<p className="text-gray-600 mb-4">
						{error?.message || "The session you're looking for doesn't exist."}
					</p>
					<button
						onClick={() => navigate(-1)}
						className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	// Check for Agora connection errors
	if (agoraError) {
		return (
			<div className="h-screen bg-black flex flex-col">
				{/* Top Header Bar with Back Button */}
				<div className="bg-gray-900 border-b border-gray-700 p-3 flex items-center justify-between z-10">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Back
					</button>

					<div className="flex-1 text-center">
						<h1 className="text-white font-semibold text-lg truncate">
							{session.title}
						</h1>
						<p className="text-red-400 text-sm">Connection Error</p>
					</div>
				</div>

				{/* Error Message */}
				<div className="flex-1 flex items-center justify-center">
					<div className="text-center text-white p-8 max-w-md">
						<div className="text-red-500 text-6xl mb-4">🔴</div>
						<h3 className="text-xl font-semibold mb-2">
							Agora Connection Failed
						</h3>
						<p className="text-gray-400 mb-4">{agoraError}</p>

						<div className="bg-gray-800 p-4 rounded text-left text-sm mb-4">
							<p className="text-red-400 mb-2">Technical Details:</p>
							<p className="text-gray-300">
								App ID: {import.meta.env.VITE_AGORA_APP_ID || "Not configured"}
							</p>
							<p className="text-gray-300">
								Channel: {session.agora?.channelName || session._id}
							</p>
						</div>

						<div className="bg-yellow-900 p-4 rounded text-left text-sm mb-4">
							<p className="text-yellow-300 mb-2">How to fix:</p>
							<ol className="text-gray-300 text-xs space-y-1">
								<li>
									1. Go to{" "}
									<a
										href="https://console.agora.io/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-400 underline"
									>
										Agora Console
									</a>
								</li>
								<li>2. Create a new project or check existing project</li>
								<li>3. Copy the App ID from project settings</li>
								<li>4. Update VITE_AGORA_APP_ID in .env file</li>
								<li>5. Restart the development server</li>
							</ol>
						</div>

						<button
							onClick={() => {
								setAgoraError(null);
								window.location.reload();
							}}
							className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors mr-2"
						>
							Try Again
						</button>
						<button
							onClick={() => navigate(-1)}
							className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
						>
							Go Back
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Check session access permissions
	const now = new Date();
	const sessionDate = new Date(session.scheduledDate);
	const canJoinSession =
		isAdmin || // Admins can always join any session
		session.status === "live" || // Anyone can join live sessions
		session.status === "scheduled" || // Allow joining scheduled sessions
		sessionDate <= now; // Allow joining if session time has passed

	// Show different content based on session status
	if (session.status === "completed" && !isAdmin) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h3 className="text-xl font-semibold text-gray-900 mb-2">
						Session Completed
					</h3>
					<p className="text-gray-600 mb-4">
						This session has already been completed.
					</p>
					<button
						onClick={() => navigate(-1)}
						className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	// If user cannot join session, show appropriate message
	if (!canJoinSession) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<h3 className="text-xl font-semibold text-gray-900 mb-2">
						Session Not Available
					</h3>
					<p className="text-gray-600 mb-4">
						This session is not yet available for joining.
					</p>
					<button
						onClick={() => navigate(-1)}
						className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	// Check if Agora App ID is available
	if (!import.meta.env.VITE_AGORA_APP_ID) {
		return (
			<div className="h-screen bg-black flex flex-col">
				<div className="bg-gray-900 border-b border-gray-700 p-3 flex items-center justify-between z-10">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Back
					</button>
					<div className="flex-1 text-center">
						<h1 className="text-white font-semibold text-lg">
							Configuration Error
						</h1>
					</div>
				</div>
				<div className="flex-1 flex items-center justify-center">
					<div className="text-center text-white p-8">
						<div className="text-red-500 text-6xl mb-4">⚠️</div>
						<h3 className="text-xl font-semibold mb-2">
							Agora Configuration Missing
						</h3>
						<p className="text-gray-400 mb-4">
							VITE_AGORA_APP_ID environment variable is not set.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="h-screen bg-black flex flex-col">
			{/* Top Header Bar with Back Button */}
			<div className="bg-gray-900 border-b border-gray-700 p-3 flex items-center justify-between z-10">
				<button
					onClick={handleLeaveChannel}
					className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					Leave Session
				</button>

				<div className="flex-1 text-center">
					<h1 className="text-white font-semibold text-lg truncate">
						{session.title}
					</h1>
					<p className="text-gray-400 text-sm">
						{session.course?.title} • Session {session.sessionNumber} •{" "}
						{session.status}
					</p>
				</div>

				{/* Session Info Badge */}
				<div className="flex items-center gap-2">
					<span
						className={`px-2 py-1 rounded-full text-xs font-medium ${
							session.status === "live"
								? "bg-red-500 text-white"
								: session.status === "scheduled"
								? "bg-blue-500 text-white"
								: "bg-green-500 text-white"
						}`}
					>
						{session.status === "live"
							? "🔴 LIVE"
							: session.status === "scheduled"
							? "📅 Scheduled"
							: "✅ Completed"}
					</span>
					{isAdmin && (
						<span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-medium">
							HOST
						</span>
					)}
					<span className="text-gray-400 text-xs">
						{remoteUsers.length + (isJoined ? 1 : 0)} participant
						{remoteUsers.length + (isJoined ? 1 : 0) !== 1 ? "s" : ""}
					</span>
				</div>
			</div>

			{/* Video Grid */}
			<div className="flex-1 p-4">
				{!isJoined ? (
					<div className="flex items-center justify-center h-full">
						<div className="text-center text-white">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
							<p className="text-lg mb-2">Connecting to session...</p>
							<p className="text-gray-400 text-sm">
								Channel: {session.agora?.channelName || session._id}
							</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
						{/* Local Video (if admin/host) */}
						{isAdmin && (
							<div className="relative bg-gray-800 rounded-lg overflow-hidden">
								<div
									ref={localVideoRef}
									className="w-full h-full min-h-[200px]"
								/>
								<div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
									You (Host)
								</div>
							</div>
						)}

						{/* Remote Videos */}
						{remoteUsers.map((remoteUser) => (
							<div
								key={remoteUser.uid}
								className="relative bg-gray-800 rounded-lg overflow-hidden"
							>
								<div
									ref={(el) => {
										if (el) {
											remoteVideoRefs.current[remoteUser.uid] = el;
											if (remoteUser.videoTrack) {
												remoteUser.videoTrack.play(el);
											}
										}
									}}
									className="w-full h-full min-h-[200px]"
								/>
								<div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
									User {remoteUser.uid}
								</div>
							</div>
						))}

						{/* Empty state when no users */}
						{remoteUsers.length === 0 && !isAdmin && (
							<div className="col-span-full flex items-center justify-center h-full">
								<div className="text-center text-gray-400">
									<div className="text-6xl mb-4">👥</div>
									<p className="text-xl mb-2">Waiting for host to start...</p>
									<p className="text-sm">
										You'll see the stream when the host begins the session
									</p>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Bottom Controls (only for admin/host) */}
			{isAdmin && isJoined && (
				<div className="bg-gray-900 border-t border-gray-700 p-4">
					<div className="flex items-center justify-center gap-4">
						<button
							onClick={toggleVideo}
							className={`p-3 rounded-full transition-colors ${
								isVideoEnabled
									? "bg-gray-700 text-white hover:bg-gray-600"
									: "bg-red-500 text-white hover:bg-red-600"
							}`}
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								{isVideoEnabled ? (
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
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
									/>
								)}
							</svg>
						</button>

						<button
							onClick={toggleAudio}
							className={`p-3 rounded-full transition-colors ${
								isAudioEnabled
									? "bg-gray-700 text-white hover:bg-gray-600"
									: "bg-red-500 text-white hover:bg-red-600"
							}`}
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								{isAudioEnabled ? (
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

						<button
							onClick={handleLeaveChannel}
							className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors"
						>
							End Session
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SessionPageUIKit;
