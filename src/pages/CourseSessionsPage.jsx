import React from "react";
import { useParams } from "react-router-dom";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../components/ui/tabs";
import CourseSessions from "../components/Sessions/CourseSessions";

// Mock course data - replace with actual API call
const mockCourse = {
	_id: "course123",
	title: "Complete Astrology Course",
	description: "Master the art of Vedic astrology with comprehensive lessons",
	instructor: {
		name: "Dr. Rajesh Sharma",
		avatar: null,
	},
	totalSessions: 12,
	completedSessions: 3,
	enrollmentDate: "2024-01-15",
	status: "active", // active, completed, paused
};

const CourseSessionsPage = () => {
	const { courseId } = useParams();

	// In real app, fetch course data based on courseId
	const course = mockCourse;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Course Header */}
			<div className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-start justify-between">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								{course.title}
							</h1>
							<p className="text-gray-600 mb-4">{course.description}</p>
							<div className="flex items-center gap-6 text-sm text-gray-600">
								<span>Instructor: {course.instructor.name}</span>
								<span>
									Sessions: {course.completedSessions}/{course.totalSessions}
								</span>
								<span className="capitalize">Status: {course.status}</span>
							</div>
						</div>

						<div className="bg-blue-50 rounded-lg p-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600">
									{Math.round(
										(course.completedSessions / course.totalSessions) * 100
									)}
									%
								</div>
								<div className="text-sm text-blue-600">Progress</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Course Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Tabs defaultValue="sessions" className="w-full">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="sessions">Live Sessions</TabsTrigger>
						<TabsTrigger value="materials">Course Materials</TabsTrigger>
						<TabsTrigger value="assignments">Assignments</TabsTrigger>
						<TabsTrigger value="progress">My Progress</TabsTrigger>
					</TabsList>

					<TabsContent value="sessions" className="space-y-6">
						<CourseSessions courseId={courseId} />
					</TabsContent>

					<TabsContent value="materials" className="space-y-6">
						<div className="bg-white rounded-lg shadow p-6">
							<h3 className="text-lg font-semibold mb-4">Course Materials</h3>
							<div className="text-gray-600">
								Course materials will be available here including PDFs, videos,
								and additional resources.
							</div>
						</div>
					</TabsContent>

					<TabsContent value="assignments" className="space-y-6">
						<div className="bg-white rounded-lg shadow p-6">
							<h3 className="text-lg font-semibold mb-4">Assignments</h3>
							<div className="text-gray-600">
								Course assignments and homework will be displayed here.
							</div>
						</div>
					</TabsContent>

					<TabsContent value="progress" className="space-y-6">
						<div className="bg-white rounded-lg shadow p-6">
							<h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
							<div className="space-y-4">
								<div>
									<div className="flex justify-between mb-2">
										<span className="text-sm text-gray-600">
											Overall Progress
										</span>
										<span className="text-sm font-medium">
											{course.completedSessions}/{course.totalSessions} Sessions
										</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className="bg-blue-600 h-2 rounded-full"
											style={{
												width: `${
													(course.completedSessions / course.totalSessions) *
													100
												}%`,
											}}
										></div>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-4 mt-6">
									<div className="text-center p-4 bg-green-50 rounded-lg">
										<div className="text-2xl font-bold text-green-600">
											{course.completedSessions}
										</div>
										<div className="text-sm text-green-600">Completed</div>
									</div>
									<div className="text-center p-4 bg-blue-50 rounded-lg">
										<div className="text-2xl font-bold text-blue-600">
											{course.totalSessions - course.completedSessions}
										</div>
										<div className="text-sm text-blue-600">Remaining</div>
									</div>
									<div className="text-center p-4 bg-purple-50 rounded-lg">
										<div className="text-2xl font-bold text-purple-600">
											{Math.round(
												(course.completedSessions / course.totalSessions) * 100
											)}
											%
										</div>
										<div className="text-sm text-purple-600">Progress</div>
									</div>
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default CourseSessionsPage;
