import React from "react";
import VastuService from "./VastuService";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { usePublicLayout } from "../../Layout/LayoutContext";

const PACKAGES = [
	{
		title: "Astro Vastu Consultation Online",
		subtitle: "@ Rs. 50/- Per Sq Ft",
		features: [
			"Complete Vastu Consultation.",
			"Minimum Area Chargeable is 1000 Sq. Ft.",
			"Online Consultation.",
			"1 complete Horoscope Analysis.",
			"Astro Vastu Remedies for your Office.",
			"1 Year Validity.",
			"Free follow ups throughout the Year on Vastu as well as Horoscope.",
			"Chat With Us, Click here.",
		],
		oldPrice: "",
		price: "Rs. 50/SqFt",
	},
	{
		title: "Astro Vastu with Consultation Site Visit",
		subtitle: "@ Rs. 100/- Per Sq Ft",
		features: [
			"Complete Vastu Consultation.",
			"Minimum Area Chargeable is 1250 Sq. Ft.",
			"1 Site Visit by Vastu Guru Abhishek Goel.",
			"2 complete Horoscope Analysis.",
			"Astro Vastu Remedies for your Office.",
			"1 Year Validity.",
			"Free follow ups on Vastu as well as Horoscope.",
			"Chat With Us, Click here.",
		],
		oldPrice: "",
		price: "Rs. 100/SqFt",
	},
];

const VastuOffice = () => {
	const { inPublicLayout } = usePublicLayout();

	return (
		<>
			{!inPublicLayout && <Header />}
			<VastuService
				sectionTitle="Vastu For Office"
				headingLines={[
					[
						{ text: "Energies", bold: false },
						{ text: "Of", bold: false },
						{ text: "Your Working Space", bold: true },
						{ text: "Is Directly Proportional To", bold: false },

						{ text: "Your Growth", bold: true },
					],
				]}
				description="Vastu of your Office affects your business decisions which in turn affects your growth. If you are working in a vastu perfect office building, your decisions and actions will attract gains and profits in your business. Get vastu consultation from Vastu Guru Abhishek Goel personally for your office and enjoy more profits and gains."
				packages={PACKAGES}
			/>
			{!inPublicLayout && <Footer />}
		</>
	);
};

export default VastuOffice;
