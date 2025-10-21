import React, { useState } from "react";
import { FaVideo, FaPlay } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (url) => {
	if (!url) return null;

	// Handle various YouTube URL formats
	const youtubeRegex =
		/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
	const match = url.match(youtubeRegex);

	if (match && match[1]) {
		return `https://www.youtube.com/embed/${match[1]}`;
	}

	return null;
};

// Helper function to get Vimeo embed URL
const getVimeoEmbedUrl = (url) => {
	if (!url) return null;

	const vimeoRegex = /vimeo\.com\/(\d+)/;
	const match = url.match(vimeoRegex);

	if (match && match[1]) {
		return `https://player.vimeo.com/video/${match[1]}`;
	}

	return null;
};

// Helper to check if URL is a direct video link
const isDirectVideoUrl = (url) => {
	if (!url) return false;
	return /\.(mp4|webm|ogg|mov)$/i.test(url);
};

export default function CourseContent({ crsDetails }) {
	const [previewVideo, setPreviewVideo] = useState(null);
	const [visibleCount, setVisibleCount] = useState(6);

	const videos = React.useMemo(
		() => crsDetails?.courseContent ?? [],
		[crsDetails?.courseContent]
	);

	// Debug: Log course content to check what data we're receiving
	React.useEffect(() => {
		if (videos.length > 0) {
			console.log("📹 Course Content Data:", videos);
			console.log("📹 First video item:", videos[0]);
		}
	}, [videos]);

	const renderVideoPlayer = (videoUrl) => {
		if (!videoUrl) return null;

		// Check for YouTube
		const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
		if (youtubeEmbedUrl) {
			return (
				<iframe
					src={youtubeEmbedUrl}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="w-full h-[400px] rounded"
				></iframe>
			);
		}

		// Check for Vimeo
		const vimeoEmbedUrl = getVimeoEmbedUrl(videoUrl);
		if (vimeoEmbedUrl) {
			return (
				<iframe
					src={vimeoEmbedUrl}
					title="Vimeo video player"
					frameBorder="0"
					allow="autoplay; fullscreen; picture-in-picture"
					allowFullScreen
					className="w-full h-[400px] rounded"
				></iframe>
			);
		}

		// Direct video URL or fallback
		if (isDirectVideoUrl(videoUrl)) {
			return (
				<video src={videoUrl} controls autoPlay className="w-full rounded" />
			);
		}

		// Fallback: try to render as iframe (for other video platforms)
		return (
			<iframe
				src={videoUrl}
				title="Video player"
				frameBorder="0"
				allow="autoplay; fullscreen"
				allowFullScreen
				className="w-full h-[400px] rounded"
			></iframe>
		);
	};

	return (
		<>
			<div className="w-full mt-[1.5rem]">
				<h2 className="text-[1.25rem] font-semibold mb-4">Course Content</h2>

				<div className="space-y-3">
					{videos.slice(0, visibleCount).map((item, index) => (
						<div
							key={item._id || index}
							className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 bg-white"
						>
							<div className="flex items-center gap-3">
								<FaVideo className="text-gray-600" />
								<span className="text-sm font-medium">{item.title}</span>
							</div>

							<button className="text-gray-500">
								<IoChevronDown />
							</button>

							{/* Support both videoUrl (new) and video (old) fields */}
							{(item.videoUrl || item.video) && (
								<button
									className="flex items-center gap-2 text-red-600 font-medium"
									onClick={() => setPreviewVideo(item.videoUrl || item.video)}
								>
									<FaPlay /> Preview
								</button>
							)}
						</div>
					))}
				</div>

				{/* Video Preview Modal */}
				{previewVideo && (
					<div className="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50">
						<div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
							{renderVideoPlayer(previewVideo)}
							<button
								className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
								onClick={() => setPreviewVideo(null)}
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
			{videos.length > 6 && (
				<button
					className="mt-3 text-sm underline text-[#BB0E00]"
					onClick={() =>
						setVisibleCount(visibleCount === videos.length ? 6 : videos.length)
					}
				>
					{visibleCount === videos.length ? "See less" : "See more"}
				</button>
			)}
		</>
	);
}
