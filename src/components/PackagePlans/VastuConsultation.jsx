import React from "react";
import CommonConsultation from "./CommonConsultation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const plans = [
  {
    name: "Basic",
    price: "11,000",
    desc: "Signature Correction and Guidance on problems caused by current signatures.",
    features: [
      "Analysis of current signatures",
      "Correction techniques",
      "Guidance on avoiding issues caused by current signature patterns",
    ],
  },
  {
    name: "Silver",
    price: "25,000",
    desc: "Numero Analysis of 1 Individual with complete Numero Remedies including all Lucky numbers for Bank Account, Mobile, Home Number, Office Number, Car Number, Lucky Number, etc.",
    features: [
      "Complete Numero Remedies",
      "Lucky numbers for Bank, Mobile, Home, Office, Car, etc.",
      "Get Free Signature Analysis with this report",
    ],
  },
  {
    name: "Gold",
    price: "50,000",
    desc: "Numero Vastu Analysis of 1 Individual with Remedies. You have to send furniture layout plan of your home which should be upto 1000 sq ft area. More than 1000 sq ft will be charged @Rs. 50/- per sq ft.",
    features: [
      "Numero Vastu Analysis of 1 Individual",
      "Remedies included",
      "Furniture layout analysis (upto 1000 sq ft)",
      "Extra area charged @Rs. 50 per sq ft",
    ],
  },
  {
    name: "Platinum",
    price: "1,25,000",
    desc: "Numero Vastu Analysis of 3 Individuals with Remedies. You have to send furniture layout plan of your home which should be upto 2000 sq ft area. More than 2000 sq ft will be charged @Rs. 50/- per sq ft.",
    features: [
      "Numero Vastu Analysis of 3 Individuals",
      "Remedies included",
      "Furniture layout analysis (upto 2000 sq ft)",
      "Extra area charged @Rs. 50 per sq ft",
      "Get Free Signature Analysis for 3 with this report",
    ],
  },
];

const planStyles = {
  Basic: {
    gradient: "bg-white text-black",
    button: "bg-[#ba3800] text-white",
    icon: "text-orange-400",
  },
  Silver: {
    gradient:
      "bg-gradient-to-tr from-[#f5f5f5] to-[#dbdbdb] text-black shadow-gray-300",
    button: "bg-[#ba3800] text-white",
    icon: "text-orange-400",
  },
  Gold: {
    gradient: "bg-gradient-to-tr from-[#ffaa00] to-[#ff8c00] text-white",
    button: "bg-[#ba3800] text-white",
    icon: "text-white",
  },
  Platinum: {
    gradient: "bg-gradient-to-tr from-[#a62b3d] to-[#6c69c9] text-white",
    button: "bg-[#ba3800] text-white",
    icon: "text-orange-400",
  },
};
const VastuConsultation = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Vastu Packages</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {plans.map((plan, index) => (
            <CommonConsultation
              key={index}
              plan={plan}
              style={planStyles[plan.name]}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VastuConsultation;
