import React from "react";

import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
} from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { GrYoutube } from "react-icons/gr";

const socialLinks = [
	{ icon: FaFacebookF, url: "https://facebook.com" },
	{ icon: FaTwitter, url: "https://twitter.com" },
	{ icon: FaInstagram, url: "https://instagram.com" },
	{ icon: GrYoutube, url: "https://www.youtube.com/@vastuabhishek" },
];

export default function TopBar() {
	const { pathname } = useLocation();
	if (pathname !== "/") return null;

	return (
		<div className="bg-gray-900 w-full top-0 text-white text-xs sm:text-sm py-2 px-2 sm:px-4 flex flex-row-reverse justify-between items-center">
			{/* Right: Social Links */}
			<div className="flex space-x-2 sm:space-x-4 max-[640px]:hidden">
				{socialLinks.map(({ icon: Icon, url }, index) => (
					<a
						key={index}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-orange-500 transition-colors"
					>
						<Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
					</a>
				))}
			</div>

			{/* Left: Contact Info */}
			<div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4 lg:space-x-6">
				<div className="flex items-center space-x-1 sm:space-x-2">
					<FaPhoneAlt className="text-white text-[10px] sm:text-xs" />
					<a href="tel:+919599967655" className="whitespace-nowrap">
						+91 9599967655
					</a>
				</div>
				<div className="flex items-center space-x-1 sm:space-x-2">
					<MdEmail size={16} className="text-white sm:text-[19px]" />
					<a
						href="mailto:Contact@vastuabhishek.com"
						className="truncate max-w-[180px] sm:max-w-none"
					>
						Contact@vastuabhishek.com
					</a>
				</div>
			</div>
		</div>
	);
}
