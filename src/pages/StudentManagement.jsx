import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import StudentCard from "../components/Admin/StudentCard";
import CourseProgressPage from "../components/courseProgress/CourseProgressPage";
import BookingHistory from "./BookingHistory";
import {
	useAdminUsersQuery,
	useStudentReportsQuery,
	useStudentBookingsQuery,
	useStudentProgressQuery,
} from "../hooks/useAdminApi";
import LoadingOverlay from "../components/common/LoadingOverlay";

const TABS = [
	{ key: "allStudents", label: "All Students" },
	{ key: "courseProgress", label: "Course Progress" },
	{ key: "bookingHistory", label: "Booking History" },
	{ key: "reportsDownload", label: "Reports Download" },
];

const PER_PAGE = 8;

const formatReportLevel = (level) => {
	const normalized = level?.toLowerCase();
	if (normalized === "silver") return "Mid";
	if (normalized === "gold" || normalized === "platinum") return "Adv";
	return level ?? "—";
};

const getLevelColor = (level) => {
	const normalized = level?.toLowerCase();
	if (normalized === "basic") return "#009823";
	if (normalized === "silver") return "#AC8400";
	if (normalized === "gold" || normalized === "platinum") return "#BB0E00";
	return "inherit";
};

const formatDate = (value) => {
	if (!value) return "—";
	try {
		return new Date(value).toLocaleDateString(undefined, {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	} catch {
		return "—";
	}
};

export default function StudentManagement() {
	const [activeTab, setActiveTab] = useState(TABS[0].key);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);

	const {
		data: studentData,
		isLoading: isStudentsLoading,
		isFetching: isStudentsFetching,
		isError: isStudentsError,
	} = useAdminUsersQuery({ keepPreviousData: true });

	const {
		data: reportsData,
		isLoading: isReportsLoading,
		isFetching: isReportsFetching,
		isError: isReportsError,
	} = useStudentReportsQuery({ keepPreviousData: true });

	const {
		data: bookingsData,
		isLoading: isBookingsLoading,
		isFetching: isBookingsFetching,
		isError: isBookingsError,
	} = useStudentBookingsQuery({ keepPreviousData: true });

	const {
		data: progressData,
		isLoading: isProgressLoading,
		isFetching: isProgressFetching,
		isError: isProgressError,
	} = useStudentProgressQuery({ keepPreviousData: true });

	const students = useMemo(() => studentData?.students ?? [], [studentData]);
	const studentCount = studentData?.count ?? students.length;
	const reports = useMemo(() => reportsData ?? [], [reportsData]);
	const bookings = useMemo(() => bookingsData ?? [], [bookingsData]);
	const progress = useMemo(() => progressData ?? [], [progressData]);

	useEffect(() => {
		setPage(1);
	}, [searchTerm]);

	useEffect(() => {
		setSearchTerm("");
		setPage(1);
	}, [activeTab]);

	const filteredReports = useMemo(() => {
		const term = searchTerm.trim().toLowerCase();
		if (!term) return reports;
		return reports.filter((report) => {
			const haystack = [
				report.student?.name,
				report.student?.email,
				report.report,
				report.level,
				report.uploadedBy,
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();
			return haystack.includes(term);
		});
	}, [reports, searchTerm]);

	const totalPages = Math.max(1, Math.ceil(filteredReports.length / PER_PAGE));

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}
	}, [page, totalPages]);

	const paginatedReports = useMemo(() => {
		const start = (page - 1) * PER_PAGE;
		return filteredReports.slice(start, start + PER_PAGE);
	}, [filteredReports, page]);

	const pageNumbers = useMemo(() => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, index) => index + 1);
		}
		const start = Math.max(1, page - 2);
		const end = Math.min(totalPages, start + 4);
		return Array.from({ length: end - start + 1 }, (_, index) => start + index);
	}, [page, totalPages]);

	const handleDownload = (row) => {
		if (row?.fileUrl) {
			window.open(row.fileUrl, "_blank", "noopener,noreferrer");
			return;
		}
		toast("Download link isn't available yet for this report.");
	};

	if (isStudentsLoading) {
		return <LoadingOverlay fullscreen message="Loading students..." />;
	}

	if (isStudentsError) {
		return (
			<div className="mt-10 text-center text-red-600">
				Error loading students. Please try again later.
			</div>
		);
	}

	const tabBadges = {
		allStudents: studentCount,
		courseProgress: progress.length,
		bookingHistory: bookings.length,
		reportsDownload: reports.length,
	};

	return (
		<section className="space-y-6">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h3 className="text-xl font-semibold text-gray-800">
						Student Management
					</h3>
					<p className="text-sm text-gray-500">
						{studentCount} enrolled student
						{studentCount === 1 ? "" : "s"}
					</p>
				</div>
				<div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
					{activeTab === "reportsDownload" && (
						<input
							type="search"
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							placeholder="Search reports..."
							className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#BB0E00] focus:outline-none focus:ring-2 focus:ring-[#BB0E00]/30 sm:w-64"
						/>
					)}
					<button
						type="button"
						className="rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
						style={{
							background: "linear-gradient(to right, #BB0E00, #B94400)",
						}}
					>
						+ Add Student
					</button>
				</div>
			</div>

			<div className="flex flex-wrap gap-3">
				{TABS.map((tab) => {
					const isActive = activeTab === tab.key;
					return (
						<button
							key={tab.key}
							type="button"
							onClick={() => setActiveTab(tab.key)}
							className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
								isActive
									? "text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
							style={
								isActive
									? {
											background: "linear-gradient(to right, #BB0E00, #B94400)",
									  }
									: undefined
							}
						>
							<span>{tab.label}</span>
							<span
								className={`rounded-full px-2 py-0.5 text-xs ${
									isActive ? "bg-white/20 text-white" : "bg-white text-gray-900"
								}`}
							>
								{tabBadges[tab.key] ?? 0}
							</span>
						</button>
					);
				})}
			</div>

			{activeTab === "allStudents" && (
				<section className="relative">
					{isStudentsFetching && !isStudentsLoading && (
						<LoadingOverlay message="Refreshing students..." />
					)}
					{students.length === 0 ? (
						<p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500">
							No students found.
						</p>
					) : (
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
							{students.map((student) => (
								<StudentCard key={student._id} student={student} />
							))}
						</div>
					)}
				</section>
			)}

			{activeTab === "courseProgress" && (
				<CourseProgressPage
					entries={progress}
					isLoading={isProgressLoading}
					isFetching={isProgressFetching}
					isError={isProgressError}
				/>
			)}

			{activeTab === "bookingHistory" && (
				<BookingHistory
					bookings={bookings}
					isLoading={isBookingsLoading}
					isFetching={isBookingsFetching}
					isError={isBookingsError}
				/>
			)}

			{activeTab === "reportsDownload" && (
				<section className="relative space-y-4">
					{isReportsFetching && !isReportsLoading && (
						<LoadingOverlay message="Refreshing reports..." />
					)}

					{isReportsLoading ? (
						<LoadingOverlay message="Loading reports..." />
					) : isReportsError ? (
						<p className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
							Failed to load reports. Please try again.
						</p>
					) : paginatedReports.length === 0 ? (
						<p className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500">
							No reports match your search.
						</p>
					) : (
						<div className="overflow-hidden rounded-xl border border-[#E1E1E1] bg-white">
							<table className="w-full min-w-[720px] text-sm">
								<thead className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
									<tr>
										<th className="p-3">Student</th>
										<th className="p-3">Report</th>
										<th className="p-3">Level</th>
										<th className="p-3">Downloaded</th>
										<th className="p-3">Uploaded by</th>
										<th className="p-3 text-right">Action</th>
									</tr>
								</thead>
								<tbody>
									{paginatedReports.map((row) => (
										<tr
											key={row._id}
											className="border-t border-[#E1E1E1] text-gray-700"
										>
											<td className="p-3">
												<div className="flex flex-col">
													<span className="font-medium text-gray-900">
														{row.student?.name ?? "Unknown"}
													</span>
													{row.student?.email && (
														<span className="text-xs text-gray-500">
															{row.student.email}
														</span>
													)}
												</div>
											</td>
											<td className="p-3">{row.report}</td>
											<td
												className="p-3 font-semibold"
												style={{ color: getLevelColor(row.level) }}
											>
												{formatReportLevel(row.level)}
											</td>
											<td className="p-3">{formatDate(row.downloadedAt)}</td>
											<td className="p-3">{row.uploadedBy}</td>
											<td className="p-3 text-right">
												<button
													type="button"
													onClick={() => handleDownload(row)}
													className="inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-semibold text-white transition-opacity hover:opacity-90"
													style={{
														background:
															"linear-gradient(to right, #BB0E00, #B94400)",
													}}
												>
													Download
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}

					{paginatedReports.length > 0 && (
						<div className="flex flex-wrap items-center justify-between gap-3">
							<p className="text-sm text-gray-500">
								Showing {(page - 1) * PER_PAGE + 1}–
								{Math.min(page * PER_PAGE, filteredReports.length)} of{" "}
								{filteredReports.length} report
								{filteredReports.length === 1 ? "" : "s"}
							</p>
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={() => setPage((prev) => Math.max(1, prev - 1))}
									disabled={page === 1}
									className="rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
								>
									Previous
								</button>
								{pageNumbers.map((number) => (
									<button
										key={number}
										type="button"
										onClick={() => setPage(number)}
										className={`rounded-md px-3 py-1 text-sm font-medium ${
											number === page
												? "bg-[#BB0E00] text-white"
												: "border border-gray-200 text-gray-600 hover:bg-gray-100"
										}`}
									>
										{number}
									</button>
								))}
								<button
									type="button"
									onClick={() =>
										setPage((prev) => Math.min(totalPages, prev + 1))
									}
									disabled={page === totalPages}
									className="rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
								>
									Next
								</button>
							</div>
						</div>
					)}
				</section>
			)}
		</section>
	);
}
