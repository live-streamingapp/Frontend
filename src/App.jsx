import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
// import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import AstrologerList from "./pages/AstrologerList";
import StudentManagement from "./pages/StudentManagement";
import AstrologerProfile from "./pages/AstrologerProfile";
import Forget from "./components/Auth/Forget";
import CourseManagement from "./components/CourseManagement/CourseManagement";

import EmailVerification from "./components/Auth/EmailVerification";
import ResetPassword from "./components/Auth/ResetPassword";

import ChartComponent from "./components/Admin/ChartComponent";
import CourseDetails from "./components/StudentCourses/CourseDetails";
import CourseManagment2 from "./components/CourseManagment2/CourseManagment2";
import StudentCourse from "./pages/StudentCourse";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import Profile from "./components/StudentProfile/Profile";
import StudentChat from "./components/StudentChat/StudentChat";

import CourseManagment4 from "./components/EventManagement/CreateEvent";
import CourseManagment5 from "./components/CourseManagment5/CourseManagment5";

import AboutUs from "./components/AboutUs/AboutUs";
import MyCourses from "./components/StudentMyCourses/MyCourses";
import StudentGroupChat from "./components/StudentGroupChat/StudentGroupChat";
import AstrologerDashboard from "./components/AstrologerDashboard/StudentDashboard";
import AstroCourse from "./pages/AstroCourse";
import AstrologerChat from "./components/AstrologerChat/AstrologerChat";
import AstroProfile from "./components/AstroProfile/AstroProfile";
import AstroMyCourses from "./components/AstroMyCourses/AstroMyCourses";
import HelpSupport from "./components/HelpSupport/HelpSupport";
import CreateCourseForm from "./components/CreateCourse/CreateCourseForm";
import VastuHome from "./components/Services/VastuHome";
import VastuOffice from "./components/Services/VastuOffice";
// import VastuResidential from "./components/Services/VastuResidential";
import VastuIndustrial from "./components/Services/VastuIndustrial";
import Blogs from "./components/Blogs/Blogs";
import BlogDetails from "./components/Blogs/BlogDetails";
import Contact from "./components/Contact/Contact";
import ProcessingCard from "./components/PackagePlans/ProcessingCard";

import Consultation from "./components/PackagePlans/Consultation";
import NumeroVastu from "./components/PackagePlans/NumeroVastu";
import Products from "./components/Products/Products";
import AstroProfileView from "./components/AstroProfile/AstroProfileView";
import Services from "./components/PackagePlans/Services";
import ConsultancySection from "./components/PackagePlans/ConsultancySection";
import CartPage from "./components/Cart/ReviewCart";
import CheckoutPage from "./components/Cart/Payment";

// ✅ Import the new Customer Management page
import CustomerManagement from "./pages/CustomerManagement";
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

import PodcastPage from "./pages/PodcastPage";
import AddBlogForm from "./components/SocialForm/AddBlogForm";
import AddPodcastVideoForm from "./components/SocialForm/AddPodcastForm";
import Login from "./components/Auth/Login";
import ChooseRole from "./components/Auth/ChooseRole";
import Testimonials from "./components/AdminDashboard/Testimonials";
import FinancialManagement from "./components/AdminDashboard/FinancialManagement";
import TicketManagement from "./components/AdminDashboard/TicketManagement";

import Course from "./pages/Courses";
// import EventManagement from "./components/AdminDashboard/EventManagement";
import Payout from "./components/AdminDashboard/Payouts";
import Notification1 from "./components/AdminDashboard/Notification1";
import Notification2 from "./components/AdminDashboard/Notification2";
// import ContentManagement from "./components/AdminDashboard/ContentManagement";
// import BookOverview from "./components/AdminDashboard/BookService/BookOverview";
// import BookDetails from "./components/AdminDashboard/BookService/BookDetails";
import ApproveComment from "./pages/ApproveComment";
import Invoices from "./pages/Invoices";
// import Books from "./pages/Books";
import { BannerManagement } from "./pages/BannerManagement";
import { CreateManagement } from "./pages/CreateManagement";
import { ManageTicket } from "./pages/ManageTicket";
import { CartPages } from "./pages/CartPages";
import { PageCheckout } from "./pages/PageCheckout";
import { ConsultationCmn } from "./pages/ConsultationCmn";
import BookDetails from "./components/BookService/BookDetails";
import Books from "./pages/Books";
import PayementGatewayForm from "./components/Payments.jsx/PaymentGatwayForm";
import AdminCourses from "./components/AdminCourses/AdminCourses";
import AdminLayout from "./Layout/AdminLayout";
import EventManagement from "./components/EventManagement/EventManagement";
import AdminLogin from "./pages/AdminLogin";
import CreateEvent from "./components/EventManagement/CreateEvent";
import NameCalculator from "./components/NameCalculator/NameCalculator";
import ChatPage from "./pages/ChatPage";
import Cart from "./components/Cart/Cart";
import ReviewCart from "./components/Cart/ReviewCart";
import Payment from "./components/Cart/Payment";
import VastuConsultation from "./components/PackagePlans/VastuConsultation";
import BooksList from "./components/ProductsManagement/BooksList";
import CreateBook from "./components/ProductsManagement/CreateBook";
function App() {
  return (
    <Routes>
      {/* ------------User Routes------------ */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/support" element={<HelpSupport />} />
      {/* STUDENT AUTH */}
      <Route path="/auth" element={<ChooseRole />} />
      <Route path="/auth/forget-password" element={<Forget />} />
      <Route path="/auth/email-verification" element={<EmailVerification />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      {/* <Route
        path="/auth/email-verification/:token"
        element={<EmailVerification />}
      /> */}
      {/* STUDENT PAGES */}
      <Route path="/" element={<Landing />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/name-calculator" element={<NameCalculator />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/profile" element={<Profile />} />
      {/* <Route path="/chat" element={<StudentChat />} /> */}
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/group-discussion" element={<StudentGroupChat />} />
      <Route path="/vastu-office" element={<VastuOffice />} />
      <Route path="/vastu-home" element={<VastuHome />} />
      {/* <Route path="/vastu-residential" element={<VastuResidential />} /> */}
      <Route path="/vastu-industrial" element={<VastuIndustrial />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/podcast" element={<PodcastPage />} />
      <Route path="/contact" element={<Contact />} />
      {/* <Route path="/astrology-package" element={<Consultation />} /> */}
      {/* <Route path="/numero-package" element={<NumeroVastu />} /> */}
      <Route path="/services" element={<Services />} />
      {/* <Route path="/consultancy-section" element={<ConsultancySection />} /> */}
      <Route path="/astrology-consultation" element={<Consultation />} />
      <Route path="/numero-consultation" element={<NumeroVastu />} />
      <Route path="/vastu-consultation" element={<VastuConsultation />} />
      <Route path="/products" element={<Products />} />
      <Route path="/processing-card" element={<ProcessingCard />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cart-page" element={<ReviewCart />} />
      <Route path="/payment" element={<Payment />} />
      {/* <Route path="/checkout-page" element={<CheckoutPage />} /> */}
      <Route path="/add-blogform" element={<AddBlogForm />} />
      <Route path="/add-podcastform" element={<AddPodcastVideoForm />} />
      {/* <Route path="/ticket-management" element={<TicketManagement/>}/> */}
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/financial-management" element={<FinancialManagement />} />
      <Route path="/ticket-management" element={<TicketManagement />} />
      <Route path="/approve-comment" element={<ApproveComment />} />
      <Route path="/invoices" element={<Invoices />} />
      {/* <Route path="/ticket-management" element={<TicketManagement />} /> */}
      {/* <Route path="/create-management" element={<CreateManagement/>} /> */}
      {/* <Route path="/payout" element={<Payout />} /> */}
      <Route path="/notification-one" element={<Notification1 />} />
      <Route path="/notification-two" element={<Notification2 />} />
      <Route path="/banner-management" element={<BannerManagement />} />
      <Route path="/create-management" element={<CreateManagement />} />
      <Route path="/manange-ticket" element={<ManageTicket />} />
      {/* <Route path="/cartpage" element={<CartPages />} /> */}
      {/* <Route path="/consultancy" element={ <CommonConsultancy/>}/> */}
      {/* <Route path="/common-consultant" element={<ConsultationCmn/>}/> */}
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetails />} />
      {/* ASTROLOGER PAGES */}
      {/* <Route path="/astrologer/dashboard" element={<AstrologerDashboard />} /> */}
      <Route path="/astrologer/courses" element={<AstroCourse />} />
      {/* <Route path="/astrologer/chat" element={<AstrologerChat />} /> */}
      <Route path="/astrologer/profile" element={<AstroProfile />} />
      <Route path="/astrologer/profile/me" element={<AstroProfileView />} />
      <Route path="/astrologer/my-courses" element={<AstroMyCourses />} />
      {/* ADMIN AUTH */}
      {/* <Route path="/admin/login" element={<Login />} /> */}
      {/* <Route path="/admin/signin" element={<Signin />} /> */}
      {/* <Route path="/admin/register" element={<Register />} /> */}
      {/* ----------------------------------------------------------------- */}
      {/* ADMIN AUTH */}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* ADMIN PAGES */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/student-management" element={<StudentManagement />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
      <Route path="/admin/create-course" element={<CreateCourseForm />} />
      <Route path="/admin/events" element={<EventManagement />} />
      <Route path="/admin/create-event" element={<CreateEvent />} />
      <Route path="/admin/payments" element={<PayementGatewayForm />} />
      <Route path="/admin/books" element={<BooksList />} />
      <Route path="/admin/add-book" element={<CreateBook />} />
      {/* </Route> */}
      {/* ------------------------------------------------------------ */}
      {/* <Route path="/admin/welcome" element={<Welcome />} /> */}
      <Route path="/admin/astrologers" element={<AstrologerList />} />
      <Route path="/admin/astrologers/:id" element={<AstrologerProfile />} />
      {/* <Route path="/admin/courses" element={<CourseManagement />} /> */}
      <Route path="/admin/courses/payment" element={<CourseManagment2 />} />
      <Route
        path="/admin/courses/LearningAstrology"
        element={<CourseManagment5 />}
      />
      <Route
        path="/admin/courses/ConsultationManagment"
        element={<CourseManagment6 />}
      />
      <Route
        path="/admin/courses/NotifyStatus"
        element={<CourseManagment7 />}
      />
      <Route
        path="/admin/courses/ProductManagment"
        element={<CourseManagment8 />}
      />
      <Route
        path="/admin/courses/ProductOverview"
        element={<CourseManagment9 />}
      />
      <Route
        path="/admin/courses/ProductDetails"
        element={<CourseManagment10 />}
      />
      <Route
        path="/admin/courses/CourseManagment11"
        element={<CourseManagment11 />}
      />
      <Route
        path="/admin/courses/CourseManagment12"
        element={<CourseManagment12 />}
      />
      <Route
        path="/admin/courses/CourseManagment13"
        element={<CourseManagment13 />}
      />
      <Route
        path="/admin/courses/CourseManagment14"
        element={<CourseManagment14 />}
      />
      <Route
        path="/admin/courses/CourseManagment15"
        element={<CourseManagment15 />}
      />
      {/* CHART PAGE */}
      <Route path="/admin/chart" element={<ChartComponent />} />
      {/* ✅ NEW CUSTOMER MANAGEMENT PAGE */}
      <Route path="/admin/customers" element={<CustomerManagement />} />
    </Routes>
  );
}

export default App;
