import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import {
	HiVideoCamera as Video,
	HiVideoCameraSlash as VideoOff,
	HiMicrophone as Mic,
	HiChatBubbleLeftRight as MessageCircle,
	HiUsers as Users,
	HiXMark as X,
	HiPaperAirplane as Send,
} from "react-icons/hi2";
import {
	useLeaveSessionMutation,
	useJoinSessionMutation,
} from "../../hooks/useSessionApi";

const LiveSessionViewer = ({
	sessionData,
	onLeave,
	isJoined = false,
	agoraConfig = null,
	skipJoinApi = false, // Flag to skip join API call if parent already called it
}) => {
	const [isVideoOn, setIsVideoOn] = useState(false);
	const [isAudioOn, setIsAudioOn] = useState(false);
	// Permission flags for clearer UI/logic
	const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
	const [micPermissionDenied, setMicPermissionDenied] = useState(false);
	const [showChat, setShowChat] = useState(true);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [sessionDuration, setSessionDuration] = useState(0);
	const [participationScore, setParticipationScore] = useState(0);
	const [remoteUsers, setRemoteUsers] = useState([]);
	const [connectionState, setConnectionState] = useState("DISCONNECTED");

	const joinTimeRef = useRef(new Date());
	const intervalRef = useRef(null);
	const clientRef = useRef(null);
	const localAudioTrackRef = useRef(null);
	const localVideoTrackRef = useRef(null);
	const placeholderVideoTrackRef = useRef(null);
	const placeholderCanvasRef = useRef(null);
	const placeholderDrawIntervalRef = useRef(null);
	const localVideoRef = useRef(null);
	const initializedRef = useRef(false);
	// Track last connection state to avoid noisy repeated state updates/logs
	const lastConnectionStateRef = useRef("DISCONNECTED");
	// Track if we've already called the join API to prevent duplicate toasts
	const hasJoinedApiRef = useRef(false);
	// Track if we've attempted auto-publish to prevent repeated attempts
	const hasAttemptedAutoPublishRef = useRef(false);

	const leaveSessionMutation = useLeaveSessionMutation();
	const joinSessionMutation = useJoinSessionMutation();

	// Timer for session duration
	useEffect(() => {
		if (isJoined) {
			intervalRef.current = setInterval(() => {
				const now = new Date();
				const duration = Math.floor((now - joinTimeRef.current) / (1000 * 60)); // minutes
				setSessionDuration(duration);
			}, 60000); // Update every minute
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isJoined]);

	// Agora SDK integration
	const initializeAgora = async () => {
		try {
			if (initializedRef.current) return;
			// Mark as initializing immediately to prevent re-entrancy
			initializedRef.current = true;
			setConnectionState("CONNECTING");

			// Resolve App ID and channel
			const appId =
				(agoraConfig && agoraConfig.appId) || import.meta.env.VITE_AGORA_APP_ID;
			if (!appId) {
				console.error("Missing VITE_AGORA_APP_ID for Agora initialization");
				setConnectionState("FAILED");
				return;
			}

			// Try to retrieve latest join info from server (attendance + channel/token)
			// Only call join API once to prevent duplicate toasts, and only if parent hasn't already called it
			let serverChannel = null;
			let serverToken = null;
			const candidateSessionId = sessionData?._id || sessionData?.id;

			// Minimal logging to avoid noise

			if (candidateSessionId && !hasJoinedApiRef.current && !skipJoinApi) {
				try {
					// Join API for attendance/token
					hasJoinedApiRef.current = true; // Mark as called before making the request
					const resp = await joinSessionMutation.mutateAsync(
						candidateSessionId
					);
					const payload = resp?.data || resp;
					serverChannel = payload?.channelName || null;
					serverToken = payload?.token ?? null; // null in testing mode
					// API success
				} catch (e) {
					console.warn(
						"Join API failed in viewer; continuing without token:",
						e?.message || e
					);
					// Reset flag on error so user can retry
					hasJoinedApiRef.current = false;
				}
			}

			const channel =
				serverChannel ||
				(agoraConfig && agoraConfig.channelName) ||
				sessionData?.agora?.channelName ||
				candidateSessionId;
			const token =
				serverToken || (agoraConfig ? agoraConfig.token : null) || null; // tokenless in testing

			if (!channel) {
				console.error("Could not resolve Agora channel name");
				setConnectionState("FAILED");
				return;
			}

			// Create Agora client (or reuse if already connecting/connected)
			if (
				clientRef.current &&
				["CONNECTING", "CONNECTED"].includes(clientRef.current.connectionState)
			) {
				console.log(
					"Agora client already connecting/connected, skipping rejoin"
				);
				return;
			}
			// If there is an old client instance lying around (e.g., previous failed init), clear its listeners to avoid duplicate events
			if (clientRef.current) {
				try {
					clientRef.current.removeAllListeners?.();
				} catch {
					// ignore cleanup errors
				}
			}
			clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

			// Set up event handlers
			clientRef.current.on("user-published", handleUserPublished);
			clientRef.current.on("user-unpublished", handleUserUnpublished);
			clientRef.current.on("user-joined", handleUserJoined);
			clientRef.current.on("user-left", handleUserLeft);
			clientRef.current.on(
				"connection-state-changed",
				(curState, prevState, reason) => {
					// Only react when state actually changes to avoid floods
					if (curState !== lastConnectionStateRef.current) {
						console.log(
							`Connection state changed: ${prevState} -> ${curState}, reason: ${reason}`
						);
						lastConnectionStateRef.current = curState;
						if (curState === "CONNECTED") setConnectionState("CONNECTED");
						else if (curState === "CONNECTING")
							setConnectionState("CONNECTING");
						else if (curState === "FAILED") setConnectionState("FAILED");
						else if (curState === "DISCONNECTED")
							setConnectionState("DISCONNECTED");
					}
				}
			);

			// Join channel
			await clientRef.current.join(appId, channel, token, null);

			setConnectionState("CONNECTED");

			// Get initial remote users already in the channel
			const existingRemoteUsers = clientRef.current.remoteUsers || [];
			// Initial remote users present?
			if (existingRemoteUsers.length > 0) {
				setRemoteUsers(existingRemoteUsers);
			}
		} catch (error) {
			console.error("Failed to initialize Agora:", error);
			setConnectionState("FAILED");
			// Clean up any partial client to prevent lingering listeners
			try {
				if (clientRef.current) {
					clientRef.current.removeAllListeners?.();
					await clientRef.current.leave?.();
				}
			} catch {
				// ignore cleanup errors
			}
			clientRef.current = null;
			// allow retry
			initializedRef.current = false;
		}
	};

	useEffect(() => {
		if (isJoined) {
			initializeAgora();
		}

		return () => {
			cleanupAgora();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isJoined]);

	// Auto-publish audio and video after successfully connecting (audio first)
	useEffect(() => {
		const autoPublishTracks = async () => {
			// Only attempt auto-publish once per connection
			if (
				connectionState === "CONNECTED" &&
				!hasAttemptedAutoPublishRef.current
			) {
				hasAttemptedAutoPublishRef.current = true;

				// 1) Try to enable audio first for presence
				if (!isAudioOn && !localAudioTrackRef.current) {
					const audioSuccess = await createAndPublishAudioTrack();
					// Only set state to ON if successful
					if (audioSuccess) {
						setIsAudioOn(true);
					} else {
						// Ensure state is OFF when failed
						setIsAudioOn(false);
					}
				}

				// 2) Then try to enable video independently
				if (
					!isVideoOn &&
					!localVideoTrackRef.current &&
					!placeholderVideoTrackRef.current
				) {
					const videoSuccess = await createAndPublishVideoTrack();
					// Only set state to ON if successful
					if (videoSuccess) {
						setIsVideoOn(true);
					} else {
						// Ensure state is OFF when failed (placeholder will be published)
						setIsVideoOn(false);
					}
				}
			}
		};

		autoPublishTracks();
	}, [connectionState]); // eslint-disable-line react-hooks/exhaustive-deps

	// Periodically sync remote users list from Agora client
	useEffect(() => {
		if (connectionState === "CONNECTED" && clientRef.current) {
			const syncInterval = setInterval(() => {
				const agoraRemoteUsers = clientRef.current.remoteUsers || [];

				setRemoteUsers((prev) => {
					// Merge Agora's remote users with our state
					const allUsers = [...prev];
					let hasChanges = false;

					agoraRemoteUsers.forEach((agoraUser) => {
						if (!allUsers.some((u) => u.uid === agoraUser.uid)) {
							console.log("Sync: Found new remote user", agoraUser.uid);
							allUsers.push(agoraUser);
							hasChanges = true;
						}
					});

					return hasChanges ? allUsers : prev;
				});
			}, 2000); // Check every 2 seconds

			return () => clearInterval(syncInterval);
		}
	}, [connectionState]);
	const cleanupAgora = async () => {
		try {
			initializedRef.current = false;
			hasJoinedApiRef.current = false; // Reset join API flag on cleanup
			hasAttemptedAutoPublishRef.current = false; // Reset auto-publish flag on cleanup

			// Stop placeholder track if running
			await stopPlaceholderVideoTrack();

			// Unpublish and stop local tracks
			if (clientRef.current) {
				try {
					// Unpublish audio track
					if (localAudioTrackRef.current) {
						await clientRef.current.unpublish(localAudioTrackRef.current);
						localAudioTrackRef.current.stop();
						localAudioTrackRef.current.close();
						localAudioTrackRef.current = null;
					}

					// Unpublish video track
					if (localVideoTrackRef.current) {
						await clientRef.current.unpublish(localVideoTrackRef.current);
						localVideoTrackRef.current.stop();
						localVideoTrackRef.current.close();
						localVideoTrackRef.current = null;
					}
				} catch (e) {
					console.warn("Error unpublishing tracks during cleanup:", e);
					// Still close the tracks even if unpublish fails
					if (localAudioTrackRef.current) {
						localAudioTrackRef.current.stop();
						localAudioTrackRef.current.close();
						localAudioTrackRef.current = null;
					}
					if (localVideoTrackRef.current) {
						localVideoTrackRef.current.stop();
						localVideoTrackRef.current.close();
						localVideoTrackRef.current = null;
					}
				}
			} else {
				// If no client, just stop and close tracks
				if (localAudioTrackRef.current) {
					localAudioTrackRef.current.stop();
					localAudioTrackRef.current.close();
					localAudioTrackRef.current = null;
				}
				if (localVideoTrackRef.current) {
					localVideoTrackRef.current.stop();
					localVideoTrackRef.current.close();
					localVideoTrackRef.current = null;
				}
			}

			// Leave channel and remove listeners
			if (clientRef.current) {
				try {
					clientRef.current.removeAllListeners?.();
				} catch {
					// ignore cleanup errors
				}
				await clientRef.current.leave();
				clientRef.current = null;
			}

			setConnectionState("DISCONNECTED");
			setRemoteUsers([]);
			setIsVideoOn(false);
			setIsAudioOn(false);
			setCameraPermissionDenied(false);
			setMicPermissionDenied(false);
		} catch (error) {
			console.error("Error during Agora cleanup:", error);
		}
	};

	const handleUserJoined = (user) => {
		setRemoteUsers((prev) => {
			// Avoid duplicates for the same uid when reconnections occur
			if (prev.some((u) => u.uid === user.uid)) {
				return prev.map((u) => (u.uid === user.uid ? user : u));
			}
			return [...prev, user];
		});
	};

	const handleUserLeft = (user) => {
		console.log("User left:", user.uid);
		setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
	};

	const handleUserPublished = async (user, mediaType) => {
		console.log("User published:", user.uid, mediaType);

		await clientRef.current.subscribe(user, mediaType);

		if (mediaType === "video") {
			const remoteVideoTrack = user.videoTrack;
			const remoteVideoContainer = document.getElementById(
				`remote-video-${user.uid}`
			);
			if (remoteVideoContainer) {
				remoteVideoTrack.play(remoteVideoContainer);
			}
		}

		if (mediaType === "audio") {
			const remoteAudioTrack = user.audioTrack;
			remoteAudioTrack.play();
		}

		// Ensure the user exists in list even if 'user-joined' didn't fire
		setRemoteUsers((prev) => {
			const exists = prev.some((u) => u.uid === user.uid);
			if (!exists) return [...prev, user];
			return prev.map((u) => (u.uid === user.uid ? user : u));
		});
	};

	const handleUserUnpublished = (user, mediaType) => {
		console.log("User unpublished:", user.uid, mediaType);

		if (mediaType === "video") {
			const remoteVideoContainer = document.getElementById(
				`remote-video-${user.uid}`
			);
			if (remoteVideoContainer) {
				remoteVideoContainer.innerHTML = "";
			}
		}
	};

	// Helper: Create and publish placeholder video track (black canvas)
	const publishPlaceholderVideoTrack = async () => {
		try {
			if (!clientRef.current) {
				console.error(
					"Cannot publish placeholder: Agora client not initialized"
				);
				return false;
			}

			// Create offscreen canvas with user indicator
			const canvas = document.createElement("canvas");
			canvas.width = 640;
			canvas.height = 480;
			placeholderCanvasRef.current = canvas;

			const ctx = canvas.getContext("2d");

			// Draw a simple placeholder frame
			const drawFrame = () => {
				if (!ctx) return;
				// Black background
				ctx.fillStyle = "#1a1a1a";
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				// Camera off icon (circle with slash)
				ctx.strokeStyle = "#6b7280";
				ctx.lineWidth = 4;
				ctx.beginPath();
				ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(canvas.width / 2 - 30, canvas.height / 2 - 30);
				ctx.lineTo(canvas.width / 2 + 30, canvas.height / 2 + 30);
				ctx.stroke();

				// "Camera Off" text
				ctx.fillStyle = "#9ca3af";
				ctx.font = "16px Arial";
				ctx.textAlign = "center";
				ctx.fillText("Camera Off", canvas.width / 2, canvas.height / 2 + 70);
			};

			drawFrame();

			// Redraw every 2 seconds to keep track "alive" (very low fps)
			placeholderDrawIntervalRef.current = setInterval(drawFrame, 2000);

			// Create custom video track from canvas
			const stream = canvas.captureStream(1); // 1 fps
			const videoTrack = stream.getVideoTracks()[0];
			placeholderVideoTrackRef.current = AgoraRTC.createCustomVideoTrack({
				mediaStreamTrack: videoTrack,
			});

			await clientRef.current.publish(placeholderVideoTrackRef.current);
			console.log("Published placeholder video track");
			return true;
		} catch (error) {
			console.error("Failed to publish placeholder video:", error);
			return false;
		}
	};

	// Helper: Stop and unpublish placeholder video track
	const stopPlaceholderVideoTrack = async () => {
		try {
			if (placeholderDrawIntervalRef.current) {
				clearInterval(placeholderDrawIntervalRef.current);
				placeholderDrawIntervalRef.current = null;
			}

			if (placeholderVideoTrackRef.current) {
				if (clientRef.current) {
					await clientRef.current.unpublish(placeholderVideoTrackRef.current);
				}
				placeholderVideoTrackRef.current.close();
				placeholderVideoTrackRef.current = null;
			}

			placeholderCanvasRef.current = null;
			console.log("Stopped placeholder video track");
		} catch (error) {
			console.warn("Error stopping placeholder video:", error);
		}
	};

	const createAndPublishAudioTrack = async () => {
		try {
			if (!clientRef.current) {
				console.error("Cannot publish audio: Agora client not initialized");
				return false;
			}

			localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
			await clientRef.current.publish(localAudioTrackRef.current);
			// reset permission flag on success
			if (micPermissionDenied) setMicPermissionDenied(false);
			return true;
		} catch (error) {
			console.warn("Failed to create/publish audio track:", error);

			// Log specific error types for debugging but don't alert user
			if (
				error.name === "NotAllowedError" ||
				error.code === "PERMISSION_DENIED"
			) {
				setMicPermissionDenied(true);
			} else if (
				error.name === "NotFoundError" ||
				error.code === "DEVICE_NOT_FOUND"
			) {
				setMicPermissionDenied(true);
			} else if (error.message?.includes("Permission")) {
				setMicPermissionDenied(true);
			}

			// Return false to indicate failure - UI will show mic as off
			return false;
		}
	};

	const createAndPublishVideoTrack = async () => {
		try {
			if (!clientRef.current) {
				console.error("Cannot publish video: Agora client not initialized");
				return false;
			}

			// Stop placeholder if it's running
			await stopPlaceholderVideoTrack();

			localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
			await clientRef.current.publish(localVideoTrackRef.current);
			// reset permission flag on success
			if (cameraPermissionDenied) setCameraPermissionDenied(false);

			// Play local video
			if (localVideoRef.current) {
				localVideoTrackRef.current.play(localVideoRef.current);
			}
			return true;
		} catch (error) {
			console.error("Failed to create/publish video track:", error);

			// Provide user-friendly error messages
			if (
				error.name === "NotAllowedError" ||
				error.code === "PERMISSION_DENIED"
			) {
				alert(
					"Camera permission denied. Please allow camera access and try again."
				);
				setCameraPermissionDenied(true);
			} else if (
				error.name === "NotFoundError" ||
				error.code === "DEVICE_NOT_FOUND"
			) {
				alert("No camera found. Please connect a camera and try again.");
				setCameraPermissionDenied(true);
			} else if (error.message?.includes("Permission")) {
				alert(
					"Camera permission required. Please enable camera access in your browser settings."
				);
				setCameraPermissionDenied(true);
			} else {
				alert("Failed to access camera: " + (error.message || "Unknown error"));
			}

			// Publish placeholder so user is still visible to others
			console.log("Publishing placeholder video track due to camera failure");
			await publishPlaceholderVideoTrack();

			return false;
		}
	};

	const toggleVideo = async () => {
		if (!isVideoOn) {
			// User wants to turn video ON
			const success = await createAndPublishVideoTrack();
			if (success) {
				setIsVideoOn(true);
			}
			// If failed, createAndPublishVideoTrack already published placeholder
		} else {
			// User wants to turn video OFF
			// Stop real video track
			if (localVideoTrackRef.current) {
				if (clientRef.current) {
					await clientRef.current.unpublish(localVideoTrackRef.current);
				}
				localVideoTrackRef.current.stop();
				localVideoTrackRef.current.close();
				localVideoTrackRef.current = null;
			}

			// Publish placeholder so user remains visible to others
			await publishPlaceholderVideoTrack();

			setIsVideoOn(false);
		}
	};

	const toggleAudio = async () => {
		if (isAudioOn) {
			if (localAudioTrackRef.current) {
				if (clientRef.current) {
					await clientRef.current.unpublish(localAudioTrackRef.current);
				}
				localAudioTrackRef.current.stop();
				localAudioTrackRef.current.close();
				localAudioTrackRef.current = null;
			}
			setIsAudioOn(false);
		} else {
			const success = await createAndPublishAudioTrack();
			if (success) {
				setIsAudioOn(true);
			}
		}
	};

	const handleLeaveSession = () => {
		const finalDuration = Math.floor(
			(new Date() - joinTimeRef.current) / (1000 * 60)
		);

		leaveSessionMutation.mutate({
			sessionId: sessionData._id,
			attendanceDuration: finalDuration,
			participationScore: participationScore,
		});

		onLeave();
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (newMessage.trim()) {
			const message = {
				id: Date.now(),
				text: newMessage,
				sender: "You",
				timestamp: new Date().toLocaleTimeString(),
			};
			setMessages((prev) => [...prev, message]);
			setNewMessage("");

			// Increase participation score for chat interaction
			setParticipationScore((prev) => Math.min(prev + 5, 100));
		}
	};

	if (!isJoined) {
		return (
			<div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
				<div className="text-center">
					<Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-600">Session not joined yet</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-lg overflow-hidden">
			{/* Session Header */}
			<div className="bg-gray-900 text-white p-4">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-xl font-semibold">{sessionData.title}</h2>
						<p className="text-gray-300 text-sm">
							{sessionData.course?.title} • {sessionData.instructor?.name}
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-sm">
							<span className="text-red-400">●</span> LIVE
						</div>
						<div className="text-sm">Duration: {sessionDuration}min</div>
						<button
							onClick={handleLeaveSession}
							className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
						>
							Leave Session
						</button>
					</div>
				</div>
			</div>

			<div className="flex h-96">
				{/* Main Video Area */}
				<div className="flex-1 bg-gray-900 relative">
					{/* Connection Status Overlay */}
					{connectionState !== "CONNECTED" && (
						<div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-75">
							<div className="text-center text-white">
								<Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
								<p className="text-lg">
									{connectionState === "CONNECTING" &&
										"Connecting to session..."}
									{connectionState === "FAILED" && "Connection failed"}
									{connectionState === "DISCONNECTED" && "Disconnected"}
								</p>
								{connectionState === "FAILED" && (
									<button
										onClick={initializeAgora}
										className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
									>
										Retry Connection
									</button>
								)}
							</div>
						</div>
					)}

					{/* Remote Users Video Grid */}
					<div className="grid grid-cols-2 gap-2 p-2 h-full">
						{remoteUsers.map((user) => (
							<div
								key={user.uid}
								className="relative bg-gray-800 rounded overflow-hidden"
							>
								<div
									id={`remote-video-${user.uid}`}
									className="w-full h-full"
								/>
								<div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
									User {user.uid}
								</div>
							</div>
						))}

						{/* Show placeholder if no remote users and connected */}
						{remoteUsers.length === 0 && connectionState === "CONNECTED" && (
							<div className="col-span-2 flex items-center justify-center text-white">
								<div className="text-center">
									<Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
									<p>Waiting for other participants...</p>
								</div>
							</div>
						)}
					</div>

					{/* Local Video - Small overlay (always show when connected, even if video off) */}
					{connectionState === "CONNECTED" && (
						<div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded overflow-hidden border-2 border-white">
							{isVideoOn ? (
								<div ref={localVideoRef} className="w-full h-full" />
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<VideoOff className="w-8 h-8 text-gray-400" />
								</div>
							)}
							<div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded">
								You
							</div>
						</div>
					)}

					{/* Video Controls */}
					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
						<div className="flex gap-2">
							<button
								onClick={toggleVideo}
								className={`p-3 rounded-full transition-colors ${
									isVideoOn
										? "bg-gray-700 hover:bg-gray-600 text-white"
										: "bg-red-500 hover:bg-red-600 text-white"
								}`}
							>
								{isVideoOn ? (
									<Video className="w-5 h-5" />
								) : (
									<VideoOff className="w-5 h-5" />
								)}
							</button>
							<button
								onClick={toggleAudio}
								className={`p-3 rounded-full transition-colors ${
									isAudioOn
										? "bg-gray-700 hover:bg-gray-600 text-white"
										: "bg-red-500 hover:bg-red-600 text-white"
								}`}
							>
								{isAudioOn ? (
									<Mic className="w-5 h-5" />
								) : (
									<div className="relative">
										<Mic className="w-5 h-5" />
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="w-6 h-0.5 bg-white transform rotate-45"></div>
										</div>
									</div>
								)}
							</button>
							<button
								onClick={() => setShowChat(!showChat)}
								className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
							>
								<MessageCircle className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>

				{/* Chat Sidebar */}
				{showChat && (
					<div className="w-80 border-l border-gray-200 flex flex-col">
						{/* Chat Header */}
						<div className="p-4 border-b border-gray-200 flex justify-between items-center">
							<div className="flex items-center gap-2">
								<MessageCircle className="w-4 h-4" />
								<span className="font-medium">Live Chat</span>
							</div>
							<button
								onClick={() => setShowChat(false)}
								className="text-gray-400 hover:text-gray-600"
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						{/* Messages */}
						<div className="flex-1 p-4 overflow-y-auto space-y-3">
							{messages.length === 0 ? (
								<p className="text-gray-500 text-sm text-center">
									No messages yet. Start the conversation!
								</p>
							) : (
								messages.map((message) => (
									<div key={message.id} className="text-sm">
										<div className="font-medium text-gray-900">
											{message.sender}
											<span className="text-gray-400 text-xs ml-2">
												{message.timestamp}
											</span>
										</div>
										<div className="text-gray-700 mt-1">{message.text}</div>
									</div>
								))
							)}
						</div>

						{/* Message Input */}
						<form
							onSubmit={handleSendMessage}
							className="p-4 border-t border-gray-200"
						>
							<div className="flex gap-2">
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="Type your message..."
									className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button
									type="submit"
									disabled={!newMessage.trim()}
									className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-2 rounded-md transition-colors"
								>
									<Send className="w-4 h-4" />
								</button>
							</div>
						</form>
					</div>
				)}
			</div>

			{/* Session Info Bar */}
			<div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
				<div className="flex justify-between items-center text-sm text-gray-600">
					<div className="flex items-center gap-4">
						<span>Participation Score: {participationScore}%</span>
						<span>Duration: {sessionDuration} minutes</span>
					</div>
					<div className="flex items-center gap-2">
						<Users className="w-4 h-4" />
						<span>Live Session</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiveSessionViewer;
