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
    <div className="bg-gray-900 w-full top-0 text-white text-sm py-2 px-4 flex flex-row-reverse justify-between items-center max-[500px]:justify-center">
      {/* Right: Social Links */}
      <div className="flex space-x-4 max-[500px]:hidden">
        {socialLinks.map(({ icon: Icon, url }, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-colors"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      {/* Left: Contact Info */}
      <div className="max-[500px]:text-[.75rem] flex space-x-6">
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-white" />
          <a href="tel:+919599967655">+91 9599967655</a>
        </div>
        <div className="flex items-center space-x-2">
          <MdEmail size={19} className="text-white" />
          <a href="mailto:Contact@vastuabhishek.com">
            Contact@vastuabhishek.com
          </a>
        </div>
      </div>
    </div>
  );
}
