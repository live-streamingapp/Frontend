const plans = [
  {
    name: "Basic",
    price: "11,000",
    desc: "One Time Consultation on Horoscope of 1 Individual on Call or at Vastu Abhishek Center.",
    features: ["Answers for up to 3 questions with Solutions and Remedies."],
  },
  {
    name: "Silver",
    price: "25,000",
    desc: "Horoscope Analysis of 1 Individual with Remedies, Gemstone Recommendation, and Donation Recommendation.",
    features: [
      "All Astrological Remedies for Problem Solving.",
      "Guidance for Attracting Money, Growth, and Success in Life.",
      "Consultation Package is valid for 1 year.",
    ],
  },
  {
    name: "Gold",
    price: "50,000",
    desc: "Horoscope Analysis of 3 Individuals with Remedies, Gemstone Recommendation, and Donation Recommendation.",
    features: [
      "All Astrological Remedies for Problem Solving.",
      "Guidance for Attracting Money, Growth, and Success in Life.",
      "Consultation Package is valid for 1 year.",
    ],
  },
  {
    name: "Platinum",
    price: "70,000",
    desc: "Horoscope Analysis of 4 Individuals with Remedies, Gemstone Recommendation, and Donation Recommendation.",
    features: [
      "All Astrological Remedies for Problem Solving.",
      "Guidance for Attracting Money, Growth, and Success in Life.",
      "Consultation Package is valid for 1 year.",
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
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CommonConsultation from "./CommonConsultation";
import CommonConsulation from "./CommonConsultation";
export default function Consultation() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Astrology Consultation Packages
        </h2>

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
}
