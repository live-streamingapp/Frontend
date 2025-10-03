import React from "react";
import VastuService from "./VastuService";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { usePublicLayout } from "../../Layout/LayoutContext";

const PACKAGES = [
	{
		id: 1,
		title: "Astro Vastu Consultation",
		subtitle: "@ Rs. 50/- Per Sq Ft",
		features: [
			"Complete Vastu Consultation.",
			"Minimum Area Chargeable is 1000 Sq. Ft. Per Floor.",
			"1 complete Horoscope Analysis.",
			"Astro Vastu Remedies for your Home.",
			"Online Consultation.",
			"1 year Validity.",
			"Free follow ups on Vastu as well as Horoscope throughout the year.",
			"Ideal Package for getting Growth in Life.",
			"Astrological Growth Remedies like Gemstones, Donations, Etc. Included.",
			"Watsapp Chat With Us",
		],
		price: "₹50 / Sq Ft",
		oldPrice: "",
		buttonText: "Buy Package",
		detailsLink: "#",
	},
	{
		id: 2,
		title: "Astro Vastu Consultation with Site Visit",
		subtitle: "@ Rs. 100/- Per Sq Ft",
		features: [
			"Complete Vastu Consultation.",
			"Minimum Area Chargeable is 1250 Sq. Ft. Per Floor.",
			"2 complete Horoscope Analysis.",
			"1 Site Visit by Vastu Guru Abhishek Goel.",
			"Astro Vastu Remedies for your Home.",
			"1 Year Validity.",
			"Free follow ups on Vastu as well as Horoscope.",
			"Ideal Package for Getting Growth and Prosperity in Life.",
			"Astrological Growth Remedies like Gemstones, Donations, Etc. Included for Life.",
			"Watsapp Chat With Us",
		],
		price: "₹100 / Sq Ft",
		oldPrice: "",
		buttonText: "Buy Package",
		detailsLink: "#",
	},
	{
		id: 3,
		title: "Astro Vastu - Site Selection Package",
		subtitle: "@ Rs. 59,000 /-",
		features: [
			"If you are looking for a new home and confused which one to buy, then this package is best for you. After buying this package, you can share 3-4 layout plans of shortlisted homes and their google pin location. We'll select the best one for you as per your horoscopes. After the house gets finalized, you can take the normal Astro Vastu Consultation for your home as per above packages.",
			"Minimum Area Chargeable - Not Applicable.",
			"2 Horoscopes you can share for Site Selection.",
			"Online Consultation.",
			"Watsapp Chat With Us",
		],
		price: "₹59,000",
		oldPrice: "",
		buttonText: "Buy Package",
		detailsLink: "#",
	},
];

const VastuHome = () => {
	const { inPublicLayout } = usePublicLayout();
	return (
		<>
			{!inPublicLayout && <Header />}
			<VastuService
				sectionTitle="Vastu For Home"
				headingLines={[
					[
						{ text: "The Space", bold: false },
						{ text: "In Which You Live", bold: true },
						{ text: "Decides What", bold: false },
						{ text: "Universe", bold: true },
						{ text: "Will Give You", bold: false },
					],
				]}
				description="Vastu of your home affects you and your overall growth to a great extent. If you are living in a vastu perfect building, you will definitely convert your karma into gains and prosperity. If your home has vastu dosh, your hard work will not give good results. Get consultation from Vastu Guru Abhishek Goel personally and enjoy a happy and purpose-driven life. Requirements – layout plans, Google location, birth details, problem and target list, complete video of home in case of online consultation."
				packages={PACKAGES}
			/>
			{!inPublicLayout && <Footer />}
		</>
	);
};

export default VastuHome;
