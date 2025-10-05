import { useState } from "react";
import StatusSection from "./StatusSection";
import { PiStarOfDavid } from "react-icons/pi";
import { IoMdStar } from "react-icons/io";
import { IoCalendarClearOutline, IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import {
	useConsultationsQuery,
	useConsultationQuery,
	useUpdateConsultationMutation,
} from "../../hooks/useConsultationsApi";

// Consultation Bookings Management Component

// View Modal Component
function ViewConsultationModal({ consultationId, onClose }) {
	const { data: consultation, isLoading } = useConsultationQuery(
		consultationId,
		{
			enabled: !!consultationId,
		}
	);

	if (isLoading) {
		return (
			<div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
					<div className="flex justify-center items-center">
						<div className="text-lg">Loading consultation details...</div>
					</div>
				</div>
			</div>
		);
	}

	if (!consultation) return null;

	return (
		<div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-semibold text-gray-800">
						Consultation Details
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<IoClose size={24} />
					</button>
				</div>

				{/* Content */}
				<div className="space-y-6">
					{/* Service Details */}
					<div className="border-b pb-4">
						<h3 className="text-lg font-semibold text-gray-700 mb-3">
							Service Information
						</h3>
						<div className="space-y-2">
							<div className="flex">
								<span className="font-medium w-32">Title:</span>
								<span>{consultation.title}</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">Instructor:</span>
								<span>{consultation.instructor.name}</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">Price:</span>
								<span>₹{consultation.pricing.price}</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">Status:</span>
								<span
									className={`px-3 py-1 rounded-full text-sm ${
										consultation.status === "confirmed"
											? "bg-green-100 text-green-800"
											: consultation.status === "pending"
											? "bg-yellow-100 text-yellow-800"
											: consultation.status === "completed"
											? "bg-blue-100 text-blue-800"
											: consultation.status === "cancelled"
											? "bg-red-100 text-red-800"
											: "bg-gray-100 text-gray-800"
									}`}
								>
									{consultation.status.charAt(0).toUpperCase() +
										consultation.status.slice(1)}
								</span>
							</div>
							<div className="flex items-center">
								<span className="font-medium w-32">Rating:</span>
								<div className="flex items-center gap-2">
									<IoMdStar size={20} color="#F90" />
									<span>
										{consultation.rating.value} ({consultation.rating.reviews}{" "}
										reviews)
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Consultation Details */}
					<div className="border-b pb-4">
						<h3 className="text-lg font-semibold text-gray-700 mb-3">
							Consultation Details
						</h3>
						<div className="space-y-2">
							<div className="flex">
								<span className="font-medium w-32">Date:</span>
								<span>
									{new Date(
										consultation.consultationDetails.date
									).toLocaleDateString("en-US", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">Time:</span>
								<span>{consultation.consultationDetails.time}</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">Mode:</span>
								<span>{consultation.consultationDetails.mode}</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">Topic:</span>
								<span>{consultation.consultationDetails.topic}</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">Language:</span>
								<span>{consultation.consultationDetails.language}</span>
							</div>
						</div>
					</div>

					{/* Customer Details */}
					<div>
						<h3 className="text-lg font-semibold text-gray-700 mb-3">
							Customer Information
						</h3>
						<div className="space-y-2">
							<div className="flex">
								<span className="font-medium w-32">Name:</span>
								<span>{consultation.customer.customerName}</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">ID:</span>
								<span>{consultation.customer.customerId}</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">Phone:</span>
								<span>{consultation.customer.phone}</span>
							</div>
							<div className="flex">
								<span className="font-medium w-32">City:</span>
								<span>{consultation.customer.city}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="flex justify-end mt-6">
					<button
						onClick={onClose}
						className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

// Edit Modal Component
function EditConsultationModal({ consultationId, onClose }) {
	const { data: consultation, isLoading } = useConsultationQuery(
		consultationId,
		{
			enabled: !!consultationId,
		}
	);
	const updateMutation = useUpdateConsultationMutation({
		onSuccess: () => {
			onClose();
		},
	});

	const [formData, setFormData] = useState({
		date: "",
		time: "",
		mode: "",
		topic: "",
		language: "",
		status: "",
	});

	// Initialize form data when consultation loads
	useState(() => {
		if (consultation) {
			setFormData({
				date: consultation.consultationDetails.date
					? new Date(consultation.consultationDetails.date)
							.toISOString()
							.split("T")[0]
					: "",
				time: consultation.consultationDetails.time || "",
				mode: consultation.consultationDetails.mode || "",
				topic: consultation.consultationDetails.topic || "",
				language: consultation.consultationDetails.language || "",
				status: consultation.status || "",
			});
		}
	}, [consultation]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const payload = {
			consultationDetails: {
				date: formData.date,
				time: formData.time,
				mode: formData.mode,
				topic: formData.topic,
				language: formData.language,
			},
			status: formData.status,
		};

		updateMutation.mutate({
			consultationId,
			payload,
		});
	};

	if (isLoading) {
		return (
			<div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
					<div className="flex justify-center items-center">
						<div className="text-lg">Loading consultation details...</div>
					</div>
				</div>
			</div>
		);
	}

	if (!consultation) return null;

	// Update formData if not initialized
	if (!formData.date && consultation) {
		setFormData({
			date: consultation.consultationDetails.date
				? new Date(consultation.consultationDetails.date)
						.toISOString()
						.split("T")[0]
				: "",
			time: consultation.consultationDetails.time || "",
			mode: consultation.consultationDetails.mode || "",
			topic: consultation.consultationDetails.topic || "",
			language: consultation.consultationDetails.language || "",
			status: consultation.status || "",
		});
	}

	return (
		<div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-semibold text-gray-800">
						Edit Consultation
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600"
					>
						<IoClose size={24} />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Consultation Details */}
					<div>
						<h3 className="text-lg font-semibold text-gray-700 mb-3">
							Consultation Details
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Date
								</label>
								<input
									type="date"
									name="date"
									value={formData.date}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB0E00]"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Time
								</label>
								<input
									type="time"
									name="time"
									value={formData.time}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB0E00]"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Mode
								</label>
								<select
									name="mode"
									value={formData.mode}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB0E00]"
								>
									<option value="">Select Mode</option>
									<option value="Online (Zoom)">Online (Zoom)</option>
									<option value="Online (Phone)">Online (Phone)</option>
									<option value="In-Person">In-Person</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Language
								</label>
								<select
									name="language"
									value={formData.language}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB0E00]"
								>
									<option value="">Select Language</option>
									<option value="Hindi">Hindi</option>
									<option value="English">English</option>
									<option value="Marathi">Marathi</option>
									<option value="Tamil">Tamil</option>
									<option value="Telugu">Telugu</option>
								</select>
							</div>
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Topic
								</label>
								<input
									type="text"
									name="topic"
									value={formData.topic}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB0E00]"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Status
								</label>
								<select
									name="status"
									value={formData.status}
									onChange={handleChange}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BB0E00]"
								>
									<option value="">Select Status</option>
									<option value="pending">Pending</option>
									<option value="paid">Paid</option>
									<option value="confirmed">Confirmed</option>
									<option value="completed">Completed</option>
									<option value="cancelled">Cancelled</option>
								</select>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="flex justify-end gap-4">
						<button
							type="button"
							onClick={onClose}
							className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={updateMutation.isPending}
							className="px-6 py-2 bg-gradient-to-b from-[#bb0e00] to-[#b94400] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
						>
							{updateMutation.isPending ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function BookingCard({
	title,
	instructor,
	rating,
	reviews,
	price,
	status,
	date,
	mode,
	customerId,
	customerName,
	phone,
	city,
	consultationId,
	onView,
	onEdit,
}) {
	return (
		<div className="relative border border-[#e2e2e2] rounded-[15px] w-[340px] h-[340px] bg-[#f8f8f8] shadow-[0_0_15px_rgba(0,0,0,0.1)] ml-0 md:ml-[5px]">
			<div className="absolute w-[61px] h-[61px] border border-[#e1e1e1] rounded-full flex justify-center items-center -top-[31px] left-[130px]">
				<PiStarOfDavid style={{ width: 28, height: 32 }} color="#B94400" />
			</div>

			<div className="w-[330px] flex flex-col items-start gap-[15px] ml-[9px]">
				{/* Top Info */}
				<div className="flex justify-between items-center w-full mt-[30px]">
					<div className="flex flex-col w-[111px] items-start gap-[5px]">
						<p className="font-[590] text-[16px] leading-[21px] text-black">
							{title}
						</p>
						<p className="text-[11px] font-normal leading-[14px] text-black">
							By: {instructor}
						</p>
						<p className="flex items-center gap-[5px]">
							<IoMdStar size={15} color="#F90" />
							<span>
								<span className="text-[10px] font-semibold leading-[13px] text-black">
									{rating}{" "}
								</span>
								<span className="text-[10px] font-normal leading-[13px] text-black">
									({reviews} reviews)
								</span>
							</span>
						</p>
					</div>

					<div className="flex w-[97px] p-[10px_31px] flex-col justify-center items-center gap-[10px] border border-[#e1e1e1] rounded-[100px_0_0_100px] bg-white">
						<div className="flex w-[41px] flex-col items-end gap-[2px]">
							<p className="text-right font-[590] text-[15px] leading-[19px] text-black">
								₹{price}
							</p>
							<p
								className={`text-right text-[11px] font-[510] ${
									status === "confirmed"
										? "text-[#189200]"
										: status === "pending"
										? "text-[#FFA500]"
										: status === "completed"
										? "text-[#0066FF]"
										: status === "cancelled"
										? "text-[#FF0000]"
										: "text-[#189200]"
								}`}
							>
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</p>
						</div>
					</div>
				</div>

				{/* Date */}
				<div className="flex items-center gap-[10px]">
					<IoCalendarClearOutline size={15} />
					<p>{date}</p>
				</div>

				{/* Location/Mode */}
				<div className="flex items-center gap-[10px]">
					<IoLocationOutline size={20} />
					<p>{mode}</p>
				</div>

				<div className="border border-[#c8c8c8] w-full" />

				{/* Booking Details */}
				<div className="text-[10px] font-normal leading-[13px] text-[rgba(0,0,0,0.55)]">
					<p>Booking details:</p>
				</div>

				<div className="flex w-[320px] justify-between items-start">
					{/* Customer Image & ID */}
					<div className="flex w-[112px] h-[89px] flex-col justify-between items-center shrink-0">
						<img src="/images/Girl.png" width={66} height={66} alt="Customer" />
						<p className="text-[11px] font-[510] leading-[14px] text-[rgba(0,0,0,0.69)]">
							{customerId}
						</p>
					</div>

					{/* Customer Details */}
					<div className="flex w-[202px] flex-col justify-end items-start gap-[9px]">
						<div className="flex flex-col items-start gap-[6px] w-full">
							<p className="font-[590] text-[16px] text-black">
								{customerName}
							</p>
							<div className="flex items-center gap-[10px] w-full">
								<div className="flex items-center gap-[5px]">
									<BsTelephone size={11} />
									<p className="text-[11px] font-normal leading-[14px] text-black">
										{phone}
									</p>
								</div>
								<div className="flex items-center gap-[5px]">
									<span className="mx-[2px_4px] opacity-80">|</span>
									<IoLocationOutline size={11} />
									<p className="text-[11px] font-normal leading-[14px] text-black">
										{city}
									</p>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-[10px]">
							<button
								onClick={() => onView(consultationId)}
								className="border border-[#bb0e00] rounded-[5px] w-[96px] h-[31px] p-[15px] flex justify-center items-center gap-[10px] shadow-[0_4px_12.4px_rgba(255,255,255,0.25)_inset] bg-gradient-to-b from-[#bb0e00] to-[#b94400] text-white text-[12px] font-[590] leading-[15px] cursor-pointer hover:opacity-90"
							>
								View
							</button>
							<button
								onClick={() => onEdit(consultationId)}
								className="border border-[#bb0e00] rounded-[5px] w-[96px] h-[31px] p-[15px] flex justify-center items-center gap-[10px] shadow-[0_4px_12.4px_rgba(255,255,255,0.25)_inset] bg-transparent text-black text-[12px] font-[590] leading-[16px] cursor-pointer hover:bg-gray-100"
							>
								Edit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Consultation Bookings Component
function ConsultationBookings() {
	const [viewModalOpen, setViewModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedConsultationId, setSelectedConsultationId] = useState(null);

	const {
		data: consultations = [],
		isLoading: loading,
		isError,
		error,
	} = useConsultationsQuery();

	// Transform data to match component format
	const bookings = consultations.map((consultation) => ({
		consultationId: consultation._id,
		title: consultation.title,
		instructor: consultation.instructor.name,
		rating: consultation.rating.value,
		reviews: consultation.rating.reviews,
		price: consultation.pricing.price,
		status: consultation.status,
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
		mode: consultation.consultationDetails.mode,
		customerId: consultation.customer.customerId,
		customerName: consultation.customer.customerName,
		phone: consultation.customer.phone,
		city: consultation.customer.city,
	}));

	const handleView = (consultationId) => {
		setSelectedConsultationId(consultationId);
		setViewModalOpen(true);
	};

	const handleEdit = (consultationId) => {
		setSelectedConsultationId(consultationId);
		setEditModalOpen(true);
	};

	const closeViewModal = () => {
		setViewModalOpen(false);
		setSelectedConsultationId(null);
	};

	const closeEditModal = () => {
		setEditModalOpen(false);
		setSelectedConsultationId(null);
	};

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

			{/* Grid Section */}
			<div className="relative mt-12 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
				{bookings.length > 0 ? (
					bookings.map((b, i) => (
						<BookingCard
							key={i}
							{...b}
							onView={handleView}
							onEdit={handleEdit}
						/>
					))
				) : (
					<div className="col-span-full text-center text-gray-500 py-10">
						No consultations found
					</div>
				)}
			</div>

			{bookings.length > 0 && (
				<p className="text-[15px] font-normal underline text-center mt-5 cursor-pointer">
					Load More
				</p>
			)}

			{/* Modals */}
			{viewModalOpen && (
				<ViewConsultationModal
					consultationId={selectedConsultationId}
					onClose={closeViewModal}
				/>
			)}
			{editModalOpen && (
				<EditConsultationModal
					consultationId={selectedConsultationId}
					onClose={closeEditModal}
				/>
			)}
		</>
	);
}

export default ConsultationBookings;
