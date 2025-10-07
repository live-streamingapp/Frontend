import React from "react";

import Hero from "../components/Landing/Hero";
import Services from "../components/Landing/Services";
import FreeServices from "../components/Landing/FreeServices";
import PremiumServices from "../components/Landing/PremiumServices"; // <-- Added this import
import Courses from "../components/Landing/Courses";
import UpcomingEvents from "../components/Landing/UpcomingEvents";
import ArrivalRemedies from "../components/Landing/ArrivalRemedies";
import Testimonials from "../components/Landing/Testimonials";
import StatsAndTestimonials from "../components/Landing/StatsAndTestimonials";
import AboutVastu from "../components/Landing/AboutVastu";
import Blogs from "../components/Landing/Blogs";
import TestimonialsSection from "../components/Landing/TestimonialsSection";
import "../App.css";
import LetsTalk from "../components/Landing/LetsTalk";

const Landing = () => {
	return (
		<>
			{/* <div className="hide-scrollbar"> */}
			<Hero />
			<Services />
			<PremiumServices />
			<FreeServices />
			{/* <Courses /> */}
			<UpcomingEvents />
			{/* <ArrivalRemedies /> */}
			{/* <Testimonials /> */}
			{/* <StatsAndTestimonials /> */}
			{/* <AboutVastu /> */}
			<Blogs />
			<TestimonialsSection />
			<LetsTalk />
			{/* </div> */}
		</>
	);
};

export default Landing;
