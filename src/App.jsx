import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./Layout/PublicLayout";
import AdminLayout from "./Layout/AdminLayout";
import RequireAuth from "./routes/RequireAuth";
import RequireAdmin from "./routes/RequireAdmin";
import NotFound from "./pages/NotFound";
import AdminNotFound from "./pages/AdminNotFound";
import ChooseRole from "./components/Auth/ChooseRole";
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
import Books from "./pages/Books";
import BookDetails from "./components/BookService/BookDetails";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import Profile from "./components/StudentProfile/Profile";
import ChatPage from "./pages/ChatPage";
import MyCourses from "./components/StudentMyCourses/MyCourses";
import StudentGroupChat from "./components/StudentGroupChat/StudentGroupChat";
import Consultation from "./components/PackagePlans/Consultation";
import NumeroVastu from "./components/PackagePlans/NumeroVastu";
import VastuConsultation from "./components/PackagePlans/VastuConsultation";
import Products from "./components/Products/Products";
import AddBlogForm from "./components/SocialForm/AddBlogForm";
import AddPodcastVideoForm from "./components/SocialForm/AddPodcastForm";
import Testimonials from "./components/AdminDashboard/Testimonials";
import FinancialManagement from "./components/AdminDashboard/FinancialManagement";
import TicketManagement from "./components/AdminDashboard/TicketManagement";
import ApproveComment from "./pages/ApproveComment";
import Cart from "./components/Cart/Cart";
import ReviewCart from "./components/Cart/ReviewCart";
import Dashboard from "./pages/Dashboard";
import StudentManagement from "./pages/StudentManagement";
import AstrologerList from "./pages/AstrologerList";
import AstrologerProfile from "./pages/AstrologerProfile";
import AdminCourses from "./components/AdminCourses/AdminCourses";
import CreateCourseForm from "./components/CreateCourse/CreateCourseForm";
import EventManagement from "./components/EventManagement/EventManagement";
import CreateEvent from "./components/EventManagement/CreateEvent";
import PayementGatewayForm from "./components/Payments.jsx/PaymentGatwayForm";
import BooksList from "./components/ProductsManagement/BooksList";
import CreateBook from "./components/ProductsManagement/CreateBook";
import CourseManagment2 from "./components/CourseManagment2/CourseManagment2";
import CourseManagment5 from "./components/CourseManagment5/CourseManagment5";
import CourseManagment6 from "./components/CourseManagment6/CourseManagment6";
import CourseManagment7 from "./components/CourseManagment7/CourseManagment7";
import CourseManagment8 from "./components/CourseManagment8/CourseManagment8";
import CourseManagment9 from "./components/CourseManagment9/CourseManagment9";
import CourseManagment10 from "./components/CourseManagment10/CourseManagment10";
import CourseManagment11 from "./components/CourseManagment11/CourseManagment11";
import CourseManagment12 from "./components/CourseManagment12/CourseManagment12";
import CourseManagment13 from "./components/CourseManagment13/CourseManagment13";
import CourseManagment14 from "./components/CourseManagment14/CourseManagment14";
import CourseManagment15 from "./components/CourseManagment15/CourseManagment15";
import ChartComponent from "./components/Admin/ChartComponent";
import CustomerManagement from "./pages/CustomerManagement";
import { BannerManagement } from "./pages/BannerManagement";
import { CreateManagement } from "./pages/CreateManagement";
import { ManageTicket } from "./pages/ManageTicket";
import Notification1 from "./components/AdminDashboard/Notification1";
import Notification2 from "./components/AdminDashboard/Notification2";
import AdminProfile from "./components/Admin/AdminProfile";
import AdminSettings from "./pages/AdminSettings";

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
				<Route path="numero-consultation" element={<NumeroVastu />} />
				<Route path="vastu-consultation" element={<VastuConsultation />} />
				<Route path="blogs" element={<Blogs />} />
				<Route path="blogs/:id" element={<BlogDetails />} />
				<Route path="podcast" element={<PodcastPage />} />
				<Route path="contact" element={<Contact />} />
				<Route path="services" element={<Services />} />
				<Route path="books" element={<Books />} />
				<Route path="books/:id" element={<BookDetails />} />

				<Route element={<RequireAuth />}>
					<Route path="dashboard" element={<StudentDashboard />} />
					<Route path="profile" element={<Profile />} />
					<Route path="chat" element={<ChatPage />} />
					<Route path="my-courses" element={<MyCourses />} />
					<Route path="group-discussion" element={<StudentGroupChat />} />
					<Route path="products" element={<Products />} />
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
					<Route path="student-management" element={<StudentManagement />} />
					<Route path="courses" element={<AdminCourses />} />
					<Route path="courses/:courseId/edit" element={<CreateCourseForm />} />
					<Route path="courses/payment" element={<CourseManagment2 />} />
					<Route
						path="courses/LearningAstrology"
						element={<CourseManagment5 />}
					/>
					<Route
						path="courses/ConsultationManagment"
						element={<CourseManagment6 />}
					/>
					<Route path="courses/NotifyStatus" element={<CourseManagment7 />} />
					<Route
						path="courses/ProductManagment"
						element={<CourseManagment8 />}
					/>
					<Route
						path="courses/ProductOverview"
						element={<CourseManagment9 />}
					/>
					<Route
						path="courses/ProductDetails"
						element={<CourseManagment10 />}
					/>
					<Route
						path="courses/CourseManagment11"
						element={<CourseManagment11 />}
					/>
					<Route
						path="courses/CourseManagment12"
						element={<CourseManagment12 />}
					/>
					<Route
						path="courses/CourseManagment13"
						element={<CourseManagment13 />}
					/>
					<Route
						path="courses/CourseManagment14"
						element={<CourseManagment14 />}
					/>
					<Route
						path="courses/CourseManagment15"
						element={<CourseManagment15 />}
					/>
					<Route path="create-course" element={<CreateCourseForm />} />
					<Route path="events" element={<EventManagement />} />
					<Route path="create-event" element={<CreateEvent />} />
					<Route path="payments" element={<PayementGatewayForm />} />
					<Route path="books" element={<BooksList />} />
					<Route path="add-book" element={<CreateBook />} />
					<Route path="astrologers" element={<AstrologerList />} />
					<Route path="astrologers/:id" element={<AstrologerProfile />} />
					<Route path="chart" element={<ChartComponent />} />
					<Route path="customers" element={<CustomerManagement />} />
					<Route path="banner-management" element={<BannerManagement />} />
					<Route path="create-management" element={<CreateManagement />} />
					<Route path="manage-ticket" element={<ManageTicket />} />
					<Route path="notification-one" element={<Notification1 />} />
					<Route path="notification-two" element={<Notification2 />} />
					<Route path="add-blogform" element={<AddBlogForm />} />
					<Route path="add-podcastform" element={<AddPodcastVideoForm />} />
					<Route path="testimonials" element={<Testimonials />} />
					<Route
						path="financial-management"
						element={<FinancialManagement />}
					/>
					<Route path="ticket-management" element={<TicketManagement />} />
					<Route path="approve-comment" element={<ApproveComment />} />
					<Route path="*" element={<AdminNotFound />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
