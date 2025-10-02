
import Girl from "../../../public/images/Girl.png";
import Header from "./Header";
import StatusSection from "./StatusSection";
import { PiStarOfDavid } from "react-icons/pi";
import { IoMdStar } from "react-icons/io";
import { IoCalendarClearOutline, IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import Layout from "../../components/Admin/Layout";

const bookings = [
  {
    title: "Carrer Advice",
    instructor: "Deepa R.",
    rating: 4.9,
    reviews: 560,
    price: 599,
    status: "paid",
    date: "Jul 18,2025 | 8:00 PM",
    mode: "Online (Zoom)",
    customerId: "CUST-2025-1087",
    customerName: "Aditi R. Sharma",
    phone: "+91 987654320",
    city: "Pune, India",
  },
  {
    title: "Carrer Advice",
    instructor: "Deepa R.",
    rating: 4.9,
    reviews: 560,
    price: 599,
    status: "paid",
    date: "Jul 18,2025 | 8:00 PM",
    mode: "Online (Zoom)",
    customerId: "CUST-2025-1087",
    customerName: "Aditi R. Sharma",
    phone: "+91 987654320",
    city: "Pune, India",
  },
  {
    title: "Carrer Advice",
    instructor: "Deepa R.",
    rating: 4.9,
    reviews: 560,
    price: 599,
    status: "paid",
    date: "Jul 18,2025 | 8:00 PM",
    mode: "Online (Zoom)",
    customerId: "CUST-2025-1087",
    customerName: "Aditi R. Sharma",
    phone: "+91 987654320",
    city: "Pune, India",
  },
  {
    title: "Carrer Advice",
    instructor: "Deepa R.",
    rating: 4.9,
    reviews: 560,
    price: 599,
    status: "paid",
    date: "Jul 18,2025 | 8:00 PM",
    mode: "Online (Zoom)",
    customerId: "CUST-2025-1087",
    customerName: "Aditi R. Sharma",
    phone: "+91 987654320",
    city: "Pune, India",
  },
  {
    title: "Carrer Advice",
    instructor: "Deepa R.",
    rating: 4.9,
    reviews: 560,
    price: 599,
    status: "paid",
    date: "Jul 18,2025 | 8:00 PM",
    mode: "Online (Zoom)",
    customerId: "CUST-2025-1087",
    customerName: "Aditi R. Sharma",
    phone: "+91 987654320",
    city: "Pune, India",
  },
  {
    title: "Carrer Advice",
    instructor: "Deepa R.",
    rating: 4.9,
    reviews: 560,
    price: 599,
    status: "paid",
    date: "Jul 18,2025 | 8:00 PM",
    mode: "Online (Zoom)",
    customerId: "CUST-2025-1087",
    customerName: "Aditi R. Sharma",
    phone: "+91 987654320",
    city: "Pune, India",
  },
];

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
            <p className="font-[590] text-[16px] leading-[21px] text-black">{title}</p>
            <p className="text-[11px] font-normal leading-[14px] text-black">By: {instructor}</p>
            <p className="flex items-center gap-[5px]">
              <IoMdStar size={15} color="#F90" />
              <span>
                <span className="text-[10px] font-semibold leading-[13px] text-black">{rating} </span>
                <span className="text-[10px] font-normal leading-[13px] text-black">({reviews} reviews)</span>
              </span>
            </p>
          </div>

          <div className="flex w-[97px] p-[10px_31px] flex-col justify-center items-center gap-[10px] border border-[#e1e1e1] rounded-[100px_0_0_100px] bg-white">
            <div className="flex w-[41px] flex-col items-end gap-[2px]">
              <p className="text-right font-[590] text-[15px] leading-[19px] text-black">₹{price}</p>
              <p className="text-right text-[11px] font-[510] text-[#189200]">{status}</p>
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
            <img src={Girl} width={66} height={66} alt="Customer" />
            <p className="text-[11px] font-[510] leading-[14px] text-[rgba(0,0,0,0.69)]">{customerId}</p>
          </div>

          {/* Customer Details */}
          <div className="flex w-[202px] flex-col justify-end items-start gap-[9px]">
            <div className="flex flex-col items-start gap-[6px] w-full">
              <p className="font-[590] text-[16px] text-black">{customerName}</p>
              <div className="flex items-center gap-[10px] w-full">
                <div className="flex items-center gap-[5px]">
                  <BsTelephone size={11} />
                  <p className="text-[11px] font-normal leading-[14px] text-black">{phone}</p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <span className="mx-[2px_4px] opacity-80">|</span>
                  <IoLocationOutline size={11} />
                  <p className="text-[11px] font-normal leading-[14px] text-black">{city}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[10px]">
              <button className="border border-[#bb0e00] rounded-[5px] w-[96px] h-[31px] p-[15px] flex justify-center items-center gap-[10px] shadow-[0_4px_12.4px_rgba(255,255,255,0.25)_inset] bg-gradient-to-b from-[#bb0e00] to-[#b94400] text-white text-[12px] font-[590] leading-[15px] cursor-pointer">View</button>
              <button className="border border-[#bb0e00] rounded-[5px] w-[96px] h-[31px] p-[15px] flex justify-center items-center gap-[10px] shadow-[0_4px_12.4px_rgba(255,255,255,0.25)_inset] bg-transparent text-black text-[12px] font-[590] leading-[16px] cursor-pointer">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseManagment6() {
  return (
    <>
      <Header />
      <StatusSection />

      {/* Grid Section */}
      <div className="relative mt-12 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
        {bookings.map((b, i) => (
          <BookingCard key={i} {...b} />
        ))}
      </div>

      <p className="text-[15px] font-normal underline text-center mt-5 cursor-pointer">
        Load More
      </p>
       {/* Footer Note */}
      <p className="text-center text-[13px] font-medium text-black/60 mt-6 sm:text-[15px] sm:mt-[30px] font-['SF_Pro']">
        @ 2025 Vastu Abhishek, All rights reserved.
      </p>
    </>
  );
}

export default CourseManagment6;
