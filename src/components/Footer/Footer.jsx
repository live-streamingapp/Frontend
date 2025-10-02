import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const services = [
  { label: "Residential Vastu", path: "/vastu-home" },
  { label: "Commercial Vastu", path: "/vastu-industrial" },
  // { label: "Online Consultation", path: "/services/online" },
  { label: "Vastu Remedies", path: "/services" },
  { label: "Vastu for Office", path: "/vastu-office" },
];

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Courses", path: "/courses" },
  { label: "Help", path: "/support" },
];

const contactInfo = [
  {
    icon: <FaPhone className="mr-2" />,
    text: "+91 9599967655",
    href: "tel:+919599967655",
  },
  {
    icon: <FaEnvelope className="mr-2" />,
    text: "Contact@vastuabhishek.com",
    href: "mailto:Contact@vastuabhishek.com",
  },
  {
    icon: <FaMapMarkerAlt className="mr-2" size={24} />,
    text: "142, 2nd Floor Pocket - 17, Sector-24 Rohini, New Delhi 110085",
    href: "https://www.google.com/maps?q=Mumbai,India",
  },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="text-white pt-[2rem] mt-[2rem] bg-gradient-to-br from-[#bb1200] to-[#c84706]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <img src="/images/logo.jpg" alt="Logo" className="h-[50px]" />
            </div>
            <p className="text-white/90 mb-4">
              Transforming lives through ancient Vastu wisdom and modern
              insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-1 text-sm">
                  <button
                    className="text-white/90 hover:text-white cursor-pointer hover:underline"
                    onClick={() => navigate(link.path)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul>
              {services.map((service, index) => (
                <li key={index} className="mb-1 text-sm">
                  <button
                    className="text-white/90 hover:text-white hover:underline"
                    onClick={() => navigate(service.path)}
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-white/90">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className="pb-[10px] font-semibold">Vastu Abhishek</p>
            <ul className="space-y-1">
              {contactInfo.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-white/90 text-sm"
                >
                  <a
                    href={item.href}
                    // target={item.href.startsWith("http") ? "_blank" : "_self"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start hover:underline"
                  >
                    {item.icon} {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 mt-10 text-center">
          <p className="text-white/70 font-semibold text-sm">
            © 2025 Vastu Abhishek. All rights reserved. {" | "}
            Developed By{" "}
            <a
              href="https://alpixn.com/"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              Alpixn Technologies Private Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
