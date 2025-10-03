// src/components/courseProgress/StudentProfileHeader.jsx
import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const fallbackAvatar = "/images/astrologer-avatar.png";

export default function StudentProfileHeader({ student }) {
	if (!student) {
		return null;
	}

	const { name, id, course, avatar, email } = student;

	return (
		<div className="rounded-xl bg-white p-4 shadow-sm">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-4">
					<div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow">
						<img
							src={avatar || fallbackAvatar}
							alt={name ?? "Student avatar"}
							className="h-full w-full object-cover"
							onError={(event) => {
								event.currentTarget.src = fallbackAvatar;
							}}
						/>
					</div>
					<div>
						<p className="text-lg font-semibold text-gray-900">
							{name ?? "Unknown Student"}
						</p>
						{id && <p className="text-sm text-gray-500 break-all">ID: {id}</p>}
						{course && <p className="text-sm text-gray-400">{course}</p>}
						{email && <p className="text-sm text-gray-400">{email}</p>}
					</div>
				</div>

				<div className="flex items-center gap-2 self-start sm:self-auto">
					<button
						type="button"
						className="rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
						style={{
							background: "linear-gradient(to right, #BB0E00, #B94400)",
						}}
					>
						View profile
					</button>
					<button
						type="button"
						className="rounded-md border border-gray-200 p-2 text-gray-500 hover:bg-gray-100"
						aria-label="Student actions"
					>
						<EllipsisVerticalIcon className="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
	);
}
