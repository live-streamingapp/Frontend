import { IoCalendarClearOutline } from "react-icons/io5";
import { FiGlobe } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import StatusSection from "./StatusSection";
import { useConsultationsQuery } from "../../hooks/useConsultationsApi";

// Consultation Status & Notify Component - Single Card Component
function CourseCard({ name, date, topic, language }) {
	return (
		<div className="border border-gray-300 rounded-[15px] shadow-md w-full max-w-[330px] min-w-[300px] h-auto min-h-[162px] flex pr-3 items-center gap-2">
			{/* Left Image */}
			<div className="flex-shrink-0 w-[105px] min-w-[80px] self-stretch">
				<img
					src="/images/aditi_sharma.png"
					className="h-full w-full rounded-l-[15px] object-cover"
					alt={name}
				/>
			</div>

			{/* Right Content */}
			<div className="flex-1 min-w-0 flex flex-col gap-1.5 py-2">
				{/* Name + Arrow */}
				<div className="flex justify-between items-center pt-[3px]">
					<p className="text-[15px] font-bold truncate pr-2">{name}</p>
					<IoIosArrowDown size={15} className="flex-shrink-0" />
				</div>

				{/* Date */}
				<div className="flex items-center gap-2">
					<IoCalendarClearOutline size={15} className="flex-shrink-0" />
					<p className="text-[13px] sm:text-[15px] font-normal truncate">
						{date}
					</p>
				</div>

				{/* Separator */}
				<hr className="border border-gray-400 w-full" />

				{/* Topic */}
				<div className="flex items-start gap-2">
					<div className="flex items-center gap-1.5 flex-shrink-0">
						<FiGlobe size={13} />
						<p className="text-[11px] sm:text-[12px] text-black/70 whitespace-nowrap">
							Topic:
						</p>
					</div>
					<p className="text-[11px] sm:text-[12px] font-bold break-words">
						{topic}
					</p>
				</div>

				{/* Language */}
				<div className="flex items-start gap-2">
					<div className="flex items-center gap-1.5 flex-shrink-0">
						<FiGlobe size={13} />
						<p className="text-[11px] sm:text-[12px] text-black/70 whitespace-nowrap">
							Language:
						</p>
					</div>
					<p className="text-[11px] sm:text-[12px] font-bold break-words">
						{language}
					</p>
				</div>

				{/* Button */}
				<div className="border border-[#BB0E00] rounded-[5px] bg-gradient-to-b from-[#BB0E00] to-[#B94400] flex justify-center items-center h-[31px] mt-1">
					<button className="text-white text-[11px] sm:text-[12px] px-2 cursor-pointer">
						Assign & Notify
					</button>
				</div>
			</div>
		</div>
	);
}

function ConsultationStatusNotify() {
	const {
		data: consultations = [],
		isLoading: loading,
		isError,
		error,
	} = useConsultationsQuery();

	// Transform data for this component
	const cardData = consultations.map((consultation) => ({
		name: consultation.customer.customerName,
		date:
			new Date(consultation.consultationDetails.date).toLocaleDateString(
				"en-US",
				{
					month: "short",
					day: "numeric",
					year: "numeric",
				}
			) +
			" | " +
			consultation.consultationDetails.time,
		topic: consultation.consultationDetails.topic,
		language: consultation.consultationDetails.language,
		_id: consultation._id,
	}));

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-lg">Loading consultations...</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-lg text-red-600">
					{error?.response?.data?.message || "Failed to load consultations"}
				</div>
			</div>
		);
	}

	return (
		<>
			<StatusSection />

			{/* Responsive Grid */}
			<div className="pl-[10px] pr-3 sm:pr-5">
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 sm:gap-y-10 gap-x-4 mt-6 sm:mt-10">
					{cardData.length > 0 ? (
						cardData.map((card, index) => (
							<CourseCard
								key={card._id || index}
								name={card.name}
								date={card.date}
								topic={card.topic}
								language={card.language}
							/>
						))
					) : (
						<div className="col-span-full text-center text-gray-500 py-10">
							No consultations to assign
						</div>
					)}
				</div>
			</div>

			{/* Load More */}
			{cardData.length > 0 && (
				<p className="text-[14px] sm:text-[15px] underline text-center mt-5 cursor-pointer px-3">
					Load More
				</p>
			)}
		</>
	);
}

export default ConsultationStatusNotify;
