import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./Layout/PublicLayout";
import AdminLayout from "./Layout/AdminLayout";
import RequireAuth from "./routes/RequireAuth";
import RequireAdmin from "./routes/RequireAdmin";
import NotFound from "./pages/NotFound";
import AdminNotFound from "./pages/AdminNotFound";
import Login from "./components/Auth/Login";
import Register from "./pages/Register";
import Forget from "./components/Auth/Forget";
import EmailVerification from "./components/Auth/EmailVerification";
import ResetPassword from "./components/Auth/ResetPassword";
import Landing from "./pages/Landing";
import Course from "./pages/Courses";
import CourseDetails from "./components/StudentCourses/CourseDetails";
import NameCalculator from "./components/NameCalculator/NameCalculator";
import AboutUs from "./components/AboutUs/AboutUs";
import HelpSupport from "./components/HelpSupport/HelpSupport";
import VastuHome from "./components/Services/VastuHome";
import VastuOffice from "./components/Services/VastuOffice";
import VastuIndustrial from "./components/Services/VastuIndustrial";
import Blogs from "./components/Blogs/Blogs";
import BlogDetails from "./components/Blogs/BlogDetails";
import PodcastPage from "./pages/PodcastPage";
import Contact from "./components/Contact/Contact";
import Services from "./components/PackagePlans/Services";
import ServicesPage from "./pages/Services"; // New services browsing page
import Books from "./pages/Books";
import BookDetails from "./components/BookService/BookDetails";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import Profile from "./components/StudentProfile/Profile";
import StudentChatPage from "./pages/StudentChatPage";
import AstrologerChatPage from "./pages/AstrologerChatPage";
import MyCourses from "./components/StudentMyCourses/MyCourses";
import StudentGroupChat from "./components/StudentGroupChat/StudentGroupChat";
import Consultation from "./components/PackagePlans/Consultation";
import NumeroVastu from "./components/PackagePlans/NumeroVastu";
import VastuConsultation from "./components/PackagePlans/VastuConsultation";
import AstrologyPackage from "./components/PackagePlans/AstrologyPackage";

import BlogManagement from "./components/SocialForm/BlogManagement";
import PodcastManagement from "./components/SocialForm/PodcastManagement";
import AdminBlogDetails from "./components/SocialForm/BlogDetails";
import AdminPodcastDetails from "./components/SocialForm/PodcastDetails";
import Testimonials from "./components/AdminDashboard/Testimonials";
import FinancialManagement from "./components/AdminDashboard/FinancialManagement";
import TicketManagement from "./components/AdminDashboard/TicketManagement";
import ApproveComment from "./pages/ApproveComment";
import Cart from "./components/Cart/Cart";
import ReviewCart from "./components/Cart/ReviewCart";
import Dashboard from "./pages/Dashboard";
import StudentManagement from "./pages/StudentManagement";
import AdminCourses from "./components/AdminCourses/AdminCourses";
import CreateCourseForm from "./components/CreateCourse/CreateCourseForm";
import EventManagement from "./components/EventManagement/EventManagement";
import CreateEvent from "./components/EventManagement/CreateEvent";
import BooksList from "./components/ProductsManagement/BooksList";
import CreateBook from "./components/ProductsManagement/CreateBook";
import EventPaymentManagement from "./components/CourseManagment2/CourseManagment2";
import StudentProgressTracking from "./components/CourseManagment5/CourseManagment5";
import ConsultationBookings from "./components/CourseManagment6/CourseManagment6";
import ConsultationStatusNotify from "./components/CourseManagment7/CourseManagment7";
import VastuServicesPage from "./components/CourseManagment12/CourseManagment12";
import RolePermissionPage from "./components/CourseManagment13/CourseManagment13";
import PaymentSecurityPage from "./components/CourseManagment14/CourseManagment14";
import SecurityBackupPage from "./components/CourseManagment15/CourseManagment15";

import CustomerManagement from "./pages/CustomerManagement";
import UserDetailView from "./pages/UserDetailView";
import StudentDetailView from "./pages/StudentDetailView";
import { BannerManagement } from "./pages/BannerManagement";
import { CreateManagement } from "./pages/CreateManagement";
import { ManageTicket } from "./pages/ManageTicket";
import Notification1 from "./components/AdminDashboard/Notification1";
import Notification2 from "./components/AdminDashboard/Notification2";
import AdminProfile from "./components/Admin/AdminProfile";
import AdminSettings from "./pages/AdminSettings";
import ChartComponent from "./components/Admin/ChartComponent";
import CourseDetailPage from "./pages/CourseDetailPage";

// New imports for Services and Orders
import AdminServices from "./pages/AdminServices";
import CreateService from "./pages/CreateService";
import CreatePackage from "./pages/CreatePackage";
import OrderManagement from "./pages/OrderManagement";
import MyOrders from "./pages/MyOrders";
import AdminConsultations from "./pages/AdminConsultations";
import AdminPackages from "./pages/AdminPackages";
import ServiceBookings from "./pages/ServiceBookings";

function App() {
	return (
		<Routes>
			<Route path="/" element={<PublicLayout />}>
				<Route index element={<Landing />} />
				<Route path="about" element={<AboutUs />} />
				<Route path="support" element={<HelpSupport />} />
				<Route path="courses" element={<Course />} />
				<Route path="course/:id" element={<CourseDetails />} />
				<Route path="name-calculator" element={<NameCalculator />} />
				<Route path="vastu-home" element={<VastuHome />} />
				<Route path="vastu-office" element={<VastuOffice />} />
				<Route path="vastu-industrial" element={<VastuIndustrial />} />
				<Route path="astrology-consultation" element={<Consultation />} />
				<Route path="astrology-package" element={<AstrologyPackage />} />
				<Route path="numero-consultation" element={<NumeroVastu />} />
				<Route path="vastu-consultation" element={<VastuConsultation />} />
				<Route path="blogs" element={<Blogs />} />
				<Route path="blogs/:id" element={<BlogDetails />} />
				<Route path="podcast" element={<PodcastPage />} />
				<Route path="contact" element={<Contact />} />
				<Route path="services" element={<ServicesPage />} />
				<Route path="books" element={<Books />} />
				<Route path="books/:id" element={<BookDetails />} />

				<Route element={<RequireAuth />}>
					<Route path="dashboard" element={<StudentDashboard />} />
					<Route path="profile" element={<Profile />} />
					<Route path="chat" element={<StudentChatPage />} />
					<Route path="my-courses" element={<MyCourses />} />
					<Route path="my-orders" element={<MyOrders />} />
					<Route path="group-discussion" element={<StudentGroupChat />} />
					<Route path="cart" element={<Cart />} />
					<Route path="cart-page" element={<ReviewCart />} />
				</Route>

				{/* Auth Routes */}
				<Route path="auth/login" element={<Login />} />
				<Route path="auth/register" element={<Register />} />
				<Route path="auth/forget-password" element={<Forget />} />
				<Route path="auth/email-verification" element={<EmailVerification />} />
				<Route path="auth/reset-password" element={<ResetPassword />} />

				<Route path="*" element={<NotFound />} />
			</Route>

			<Route element={<RequireAdmin />}>
				<Route path="/admin" element={<AdminLayout />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="profile" element={<AdminProfile />} />
					<Route path="settings" element={<AdminSettings />} />
					<Route path="chat" element={<AstrologerChatPage />} />
					<Route path="student-management" element={<StudentManagement />} />
					<Route path="courses" element={<AdminCourses />} />
					<Route path="courses/:courseId/edit" element={<CreateCourseForm />} />
					<Route path="courses/:courseId" element={<CourseDetailPage />} />
					<Route path="create-course" element={<CreateCourseForm />} />
					{/* Event Management */}
					<Route path="events" element={<EventManagement />} />
					<Route path="create-event" element={<CreateEvent />} />
					<Route path="event-payment" element={<EventPaymentManagement />} />
					{/* Consultation Management */}
					<Route
						path="consultation-bookings"
						element={<ConsultationBookings />}
					/>
					<Route
						path="consultation-status"
						element={<ConsultationStatusNotify />}
					/>
					<Route path="create-package" element={<CreatePackage />} />
					{/* Services Management - Three Types */}
					<Route path="consultations" element={<AdminConsultations />} />
					<Route path="packages" element={<AdminPackages />} />
					<Route path="services" element={<AdminServices />} />
					<Route path="service-bookings" element={<ServiceBookings />} />
					<Route path="create-service" element={<CreateService />} />
					{/* Books Management */}
					<Route path="books" element={<BooksList />} />
					<Route path="add-book" element={<CreateBook />} />
					{/* Orders Management */}
					<Route path="orders" element={<OrderManagement />} />
					{/* Legacy Routes - To be reviewed */}
					<Route path="courses/payment" element={<EventPaymentManagement />} />
					<Route
						path="courses/LearningAstrology"
						element={<StudentProgressTracking />}
					/>
					<Route
						path="courses/ConsultationManagment"
						element={<ConsultationBookings />}
					/>
					<Route
						path="courses/NotifyStatus"
						element={<ConsultationStatusNotify />}
					/>
					<Route path="courses/VastuServices" element={<VastuServicesPage />} />
					<Route
						path="courses/RolePermission"
						element={<RolePermissionPage />}
					/>
					<Route
						path="courses/PaymentSecurity"
						element={<PaymentSecurityPage />}
					/>
					<Route
						path="courses/SecurityBackup"
						element={<SecurityBackupPage />}
					/>
					{/* Other Management */}
					{/* Other Management */}
					<Route path="chart" element={<ChartComponent />} />
					<Route path="customers" element={<CustomerManagement />} />
					<Route path="user-detail/:userId" element={<UserDetailView />} />
					<Route
						path="student-detail/:studentId"
						element={<StudentDetailView />}
					/>{" "}
					{/* Content Management */}
					<Route path="banner-management" element={<BannerManagement />} />
					<Route path="create-management" element={<CreateManagement />} />
					<Route path="blog-management" element={<BlogManagement />} />
					<Route path="blog-details/:blogId" element={<AdminBlogDetails />} />
					<Route path="podcast-management" element={<PodcastManagement />} />
					<Route
						path="podcast-details/:podcastId"
						element={<AdminPodcastDetails />}
					/>
					{/* Support & Reviews */}
					<Route path="manage-ticket" element={<ManageTicket />} />
					<Route path="ticket-management" element={<TicketManagement />} />
					<Route path="testimonials" element={<Testimonials />} />
					<Route path="approve-comment" element={<ApproveComment />} />
					{/* Financial */}
					<Route
						path="financial-management"
						element={<FinancialManagement />}
					/>
					{/* Notifications */}
					<Route path="notification-one" element={<Notification1 />} />
					<Route path="notification-two" element={<Notification2 />} />
					<Route path="*" element={<AdminNotFound />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
