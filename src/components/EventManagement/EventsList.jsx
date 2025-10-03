import { useState } from "react";
import {
	useDeleteEventMutation,
	useEventsQuery,
	useUpdateEventMutation,
} from "../../hooks/useEventsApi";

const EventsList = () => {
	const { data: events = [], isLoading } = useEventsQuery();
	const updateEventMutation = useUpdateEventMutation({
		onSuccess: () => {
			setIsModalOpen(false);
			setSelectedEvent(null);
		},
	});
	const deleteEventMutation = useDeleteEventMutation();

	const [selectedEvent, setSelectedEvent] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditClick = (event) => {
		setSelectedEvent(JSON.parse(JSON.stringify(event)));
		setIsModalOpen(true);
	};

	const handleDelete = (id) => {
		if (!id) return;
		if (!confirm("Are you sure you want to delete this event?")) return;
		deleteEventMutation.mutate(id);
	};

	const handleInputChange = (e) => {
		const { name, value, type } = e.target;
		const parsedValue = type === "number" ? Number(value) : value;
		setSelectedEvent((prev) => ({
			...prev,
			[name]: parsedValue,
		}));
	};

	const handleNestedChange = (parent, key, value) => {
		setSelectedEvent((prev) => ({
			...prev,
			[parent]: { ...prev?.[parent], [key]: value },
		}));
	};

	const handleSave = () => {
		if (!selectedEvent?._id) return;

		const payload = {
			title: selectedEvent.title,
			description: selectedEvent.description,
			startTime: selectedEvent.startTime,
			endTime: selectedEvent.endTime,
			entryAmount: Number(selectedEvent.entryAmount) || 0,
			capacity:
				selectedEvent.capacity === "" || selectedEvent.capacity === null
					? null
					: Number(selectedEvent.capacity),
			registrationRequired:
				typeof selectedEvent.registrationRequired === "boolean"
					? selectedEvent.registrationRequired
					: true,
			location: selectedEvent.location,
			isVirtual:
				typeof selectedEvent.isVirtual === "boolean"
					? selectedEvent.isVirtual
					: false,
			virtualPlatform: selectedEvent.virtualPlatform ?? {},
			organizer: selectedEvent.organizer ?? {},
			topics: selectedEvent.topics ?? [],
			resources: selectedEvent.resources ?? [],
			requirements: selectedEvent.requirements ?? [],
		};

		const formData = new FormData();
		formData.append("payload", JSON.stringify(payload));

		updateEventMutation.mutate({
			eventId: selectedEvent._id,
			payload: formData,
		});
	};

	if (isLoading) {
		return <p className="text-gray-500">Loading events...</p>;
	}

	return (
		<>
			{events.length === 0 ? (
				<p className="text-gray-500">No events found.</p>
			) : (
				<div className="space-y-4 max-h-[500px] overflow-y-auto hide-scrollbar">
					{events.map((event) => (
						<div
							key={event._id}
							className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200"
						>
							<h3 className="text-lg font-semibold text-gray-800">
								{event.title}
							</h3>
							<p className="text-sm text-gray-600 mt-1">{event.description}</p>
							<p className="text-xs text-gray-500 mt-2">
								📅 {new Date(event.startTime).toLocaleDateString()}{" "}
								{new Date(event.startTime).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}{" "}
								- {new Date(event.endTime).toLocaleDateString()}{" "}
								{new Date(event.endTime).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}{" "}
								| 📍 {event.location}
							</p>

							<div className="mt-3 flex justify-end gap-[1rem]">
								<button
									onClick={() => handleEditClick(event)}
									className="px-4 py-1 text-white text-sm rounded-lg font-medium bg-gradient-to-r from-red-700 to-red-500 cursor-pointer transition-all duration-200"
								>
									Edit Event
								</button>
								<button
									className="border-2 px-4 py-1 rounded-lg cursor-pointer border-red-700 text-red-700"
									onClick={() => {
										handleDelete(event._id);
									}}
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Modal */}
			{isModalOpen && selectedEvent && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
					<div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
						<h2 className="text-lg font-semibold mb-4">Edit Event</h2>

						<div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
							<input
								type="text"
								name="title"
								value={selectedEvent.title}
								onChange={handleInputChange}
								className="w-full border rounded p-2 text-sm"
								placeholder="Event Title"
							/>
							<textarea
								name="description"
								value={selectedEvent.description}
								onChange={handleInputChange}
								className="w-full border rounded p-2 text-sm"
								placeholder="Event Description"
							/>
							<input
								type="datetime-local"
								name="startTime"
								value={selectedEvent.startTime?.slice(0, 16) || ""}
								onChange={handleInputChange}
								className="w-full border rounded p-2 text-sm"
							/>
							<input
								type="datetime-local"
								name="endTime"
								value={selectedEvent.endTime?.slice(0, 16) || ""}
								onChange={handleInputChange}
								className="w-full border rounded p-2 text-sm"
							/>
							<input
								type="number"
								name="entryAmount"
								value={selectedEvent.entryAmount ?? 0}
								onChange={handleInputChange}
								className="w-full border rounded p-2 text-sm"
								placeholder="Entry Amount"
							/>
							<input
								type="number"
								name="capacity"
								value={selectedEvent.capacity ?? ""}
								onChange={handleInputChange}
								className="w-full border rounded p-2 text-sm"
								placeholder="Capacity"
							/>
							<input
								type="text"
								name="location"
								value={selectedEvent.location ?? ""}
								onChange={handleInputChange}
								className="w-full border rounded p-2 text-sm"
								placeholder="Location"
							/>

							{/* Organizer */}
							<h3 className="font-medium mt-4">Organizer</h3>
							<input
								type="text"
								value={selectedEvent.organizer?.name || ""}
								onChange={(e) =>
									handleNestedChange("organizer", "name", e.target.value)
								}
								className="w-full border rounded p-2 text-sm"
								placeholder="Organizer Name"
							/>
							<input
								type="email"
								value={selectedEvent.organizer?.email || ""}
								onChange={(e) =>
									handleNestedChange("organizer", "email", e.target.value)
								}
								className="w-full border rounded p-2 text-sm"
								placeholder="Organizer Email"
							/>
							<input
								type="text"
								value={selectedEvent.organizer?.contact || ""}
								onChange={(e) =>
									handleNestedChange("organizer", "contact", e.target.value)
								}
								className="w-full border rounded p-2 text-sm"
								placeholder="Organizer Contact"
							/>

							{/* Virtual Platform */}
							<h3 className="font-medium mt-4">Virtual Platform</h3>
							<input
								type="text"
								value={selectedEvent.virtualPlatform?.name || ""}
								onChange={(e) =>
									handleNestedChange("virtualPlatform", "name", e.target.value)
								}
								className="w-full border rounded p-2 text-sm"
								placeholder="Platform Name"
							/>
							<input
								type="url"
								value={selectedEvent.virtualPlatform?.url || ""}
								onChange={(e) =>
									handleNestedChange("virtualPlatform", "url", e.target.value)
								}
								className="w-full border rounded p-2 text-sm"
								placeholder="Platform URL"
							/>
							<label className="flex items-center gap-2 text-sm">
								<input
									type="checkbox"
									checked={
										selectedEvent.virtualPlatform?.liveStreaming || false
									}
									onChange={(e) =>
										handleNestedChange(
											"virtualPlatform",
											"liveStreaming",
											e.target.checked
										)
									}
								/>
								Live Streaming Available
							</label>
							<input
								type="url"
								value={selectedEvent.virtualPlatform?.streamingUrl || ""}
								onChange={(e) =>
									handleNestedChange(
										"virtualPlatform",
										"streamingUrl",
										e.target.value
									)
								}
								className="w-full border rounded p-2 text-sm"
								placeholder="Streaming URL"
							/>
						</div>

						<div className="flex justify-end gap-3 mt-4">
							<button
								onClick={() => setIsModalOpen(false)}
								className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								disabled={updateEventMutation.isPending}
								className="px-4 py-2 text-sm text-white rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
							>
								{updateEventMutation.isPending ? "Saving..." : "Save Changes"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EventsList;
