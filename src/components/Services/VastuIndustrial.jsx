import React from "react";
import VastuService from "./VastuService";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { usePublicLayout } from "../../Layout/LayoutContext";

const PACKAGES = [
	{
		id: 1,
		title: "Astro Vastu Consultation Online",
		subtitle: "@ Rs. 50/- Per Sq. Ft.",
		features: [
			"Complete Vastu Consultation.",
			"Minimum Area Chargeable is 2500 Sq. Ft.",
			"Online Consultation.",
			"Horoscope Analysis.",
			"1 Year Validity.",
			"Free follow ups throughout the Year.",
		],
		oldPrice: "",
		price: "Rs. 50/SqFt",
		buttonText: "Buy Package",
		detailsLink: "#",
	},
	{
		id: 2,
		title: "Astro Vastu with Site Visit",
		subtitle: "@ Rs. 100/SqFt",
		features: [
			"Complete Vastu Consultation.",
			"Minimum Area Chargeable is 2500 Sq. Ft.",
			"1 Site Visit by Vastu Guru Abhishek Goel.",
			"2 complete Horoscope Analysis.",
			"Astro Vastu Remedies for your Factory.",
			"2 Year Validity.",
			"Free follow ups on Vastu as well as Horoscope.",
		],
		oldPrice: "",
		price: "Rs. 100/SqFt",
		buttonText: "Buy Package",
		detailsLink: "#",
	},
	{
		id: 3,
		title: "Project Vastu Package",
		subtitle: "(₹51 Lacs or 1% of the Project Cost whichever is Higher)",
		features: [
			"Complete Astro Vastu Planning.",
			"Horoscope Analysis of all Partners or Owners.",
			"Step by Step Guidance.",
			"Industrial, Commercial, Residential, Hotel, Hospital, Commercial Mall, Shopping Mall and all other projects included in this package.",
			"2-3 Site Visits as and when required.",
			"For Discussion with Vastu Guru Abhishek Goel, Call +919599967655.",
		],
		oldPrice: "",
		price: "₹51,00,000/- or 1% of \n Project Cost (whichever is higher)",
		buttonText: "Buy Package",
		detailsLink: "#",
	},
];

const VastuIndustrial = () => {
	const { inPublicLayout } = usePublicLayout();

	return (
		<>
			{!inPublicLayout && <Header />}
			<VastuService
				sectionTitle="Vastu For Industrial/Commercial Units"
				headingLines={[
					[
						{ text: "Sync Your Machines With", bold: false },
						{ text: "The +VE Energies", bold: true },
						{ text: "Of Your Factory Buildings And Do", bold: false },
					],
					[{ text: "Double Production", bold: true }],
				]}
				description="Vastu Of Your Factories Or Industries Affects Your Production And Product Quality To A Great Extent. Get Vastu Consultation From Vastu Guru Abhishek Goel Personally And Enjoy More Profits And Gains."
				packages={PACKAGES}
			/>
			{!inPublicLayout && <Footer />}
		</>
	);
};

export default VastuIndustrial;
