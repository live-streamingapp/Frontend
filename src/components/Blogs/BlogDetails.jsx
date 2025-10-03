import { useParams } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import { RiShareFill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const BlogDetails = () => {
	const { id } = useParams();
	// const blog = blogData.find((blog) => String(blog.id) === String(id));
	const [blog, setBlog] = useState(null);

	useEffect(() => {
		const fetchBlogDetails = async () => {
			const res = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`,
				{ withCredentials: true }
			);

			console.log("blog", res.data.data);
			setBlog(res.data.data);
		};

		fetchBlogDetails();
	}, [id]);

	if (!blog) return <p className="text-center py-10">Blog not found</p>;

	return (
		<div className="max-w-4xl mx-auto px-6 py-10">
			{/* Title */}
			<h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
			{/* Tags + Author + Date */}
			<div className="flex flex-col flex-wrap gap-3 mt-3 text-sm text-gray-600">
				<div className="flex gap-[10px]">
					{blog.tags?.map((tag, i) => (
						<span
							key={i}
							className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs"
						>
							{tag}
						</span>
					))}
				</div>
				<div className="flex items-center gap-[6px]">
					<span>{blog.author}</span>
					<span>
						<GoDotFill className="text-gray-500" size={12} />
					</span>
					<span>{new Date(blog.date).toDateString()}</span>
				</div>
			</div>
			<div className="w-full h-[2px] mt-[1rem] bg-gray-200" />
			{/* Main Image */}
			<div className="mt-6 rounded-xl overflow-hidden shadow">
				<img
					src={blog.mainImage}
					alt={blog.title}
					className="w-full h-[350px] object-cover"
				/>
			</div>
			{/* Main Description */}
			<p className="mt-6 text-lg leading-relaxed text-gray-700">
				{blog.description}
			</p>
			{/* Sections */}
			<div className="mt-10 space-y-10">
				{blog.sections?.map((section, idx) => (
					<div key={idx}>
						<h2 className="text-2xl font-semibold text-gray-800">
							{section.subheading}
						</h2>
						<p className="mt-3 text-gray-700 leading-relaxed">{section.text}</p>

						{/* Optional Images */}
						{section.images?.length > 0 && (
							<div className="mt-4">
								{/* 1 Image */}
								{section.images.length === 1 && (
									<img
										src={section.images[0]}
										alt={`section-${idx}-img-0`}
										className="w-full border border-gray-300 rounded-lg object-cover"
									/>
								)}

								{/* 2 Images */}
								{section.images.length === 2 && (
									<div className="grid gap-4 min-[800px]:grid-cols-2">
										{section.images.map((img, i) => (
											<img
												key={i}
												src={img}
												alt={`section-${idx}-img-${i}`}
												className="w-full border border-gray-300 h-full rounded-lg object-cover"
											/>
										))}
									</div>
								)}

								{/* 3 Images */}
								{section.images.length === 3 && (
									<div className="grid gap-4 min-[800px]:grid-cols-2">
										{/* First two images (side by side only on >=800px) */}
										{section.images.slice(0, 2).map((img, i) => (
											<img
												key={i}
												src={img}
												alt={`section-${idx}-img-${i}`}
												className="w-full border border-gray-300 h-full rounded-lg object-cover"
											/>
										))}
										{/* Third image always spans full width */}
										<div className="col-span-1 min-[800px]:col-span-2">
											<img
												src={section.images[2]}
												alt={`section-${idx}-img-2`}
												className="w-full border border-gray-300 rounded-lg object-cover"
											/>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				))}
			</div>
			<div className="flex items-center gap-[1rem] mt-[2rem]">
				<p className="flex flex-col items-center">
					<div className="flex items-center justify-center rounded-full border min-shadow border-gray-300 w-[35px] h-[35px]">
						<RiShareFill size={"1.15rem"} className="text-gray-700" />
					</div>
					<span className="text-[.75rem] text-gray-700">Share</span>
				</p>
				<p className="flex flex-col items-center">
					<div className="flex items-center justify-center rounded-full border min-shadow border-gray-300 w-[35px] h-[35px]">
						<LuDownload size={"1.15rem"} className="text-gray-700" />
					</div>
					<span className="text-[.75rem] text-gray-700">Download</span>
				</p>
			</div>{" "}
		</div>
	);
};

export default BlogDetails;
