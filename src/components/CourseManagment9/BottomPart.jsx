
import SevenMukhiRudraksh from "../../../public/images/SevenMukhiRudraksh.png"
import { IoStar } from "react-icons/io5";

function ProductCard({ image, name, code, quantity, price, rating, reviews }) {
  return (
    <div className="flex flex-col justify-center items-start p-4 border border-[#E1E1E1] rounded-[15px] bg-[#F8F8F8] shadow-[0_0_15px_rgba(0,0,0,0.1)] w-full max-w-[337px] sm:max-w-[337px]">
      <div className="flex items-center gap-2.5 w-full">
        <div>
          <img src={image} width={100} height={100} alt={name} className="rounded-[10px] sm:w-[125px] sm:h-[125px]" />
        </div>
        <div className="flex flex-col items-start gap-2.5 flex-1">
          <div className="flex flex-col items-start gap-0.5">
            <p className="text-[14px] font-medium leading-[18px] sm:text-[16px] sm:leading-[21px] font-['SF_Pro']">{name}</p>
            <p className="text-[11px] font-normal leading-[13px] sm:text-[12px] sm:leading-[15px] font-['SF_Pro']">{code}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-[#696969] text-[11px] font-normal leading-[13px] sm:text-[12px] sm:leading-[15px] font-['SF_Pro']">Qnt:</p>
            <p className="text-[11px] font-medium leading-[14px] sm:text-[12px] sm:leading-[16px] font-['SF_Pro']">{quantity}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-[#696969] text-[11px] font-normal leading-[13px] sm:text-[12px] sm:leading-[15px] font-['SF_Pro']">Total Price:</p>
            <p className="text-[11px] font-medium leading-[14px] sm:text-[12px] sm:leading-[16px] font-['SF_Pro']">{price}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <IoStar size={10} color="#FFD000" className="sm:size-[12px]" />
            <p className="text-[9px] font-medium leading-[11px] sm:text-[10px] sm:leading-[13px] font-['SF_Pro']">
              {rating} ({reviews} reviews)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BottomPart() {
  const products = [
    { image: SevenMukhiRudraksh, name: "7 Mukhi Rudraksha", code: "QRD-9845", quantity: 10, price: "₹1,299", rating: 4.9, reviews: 560 },
    { image: SevenMukhiRudraksh, name: "7 Mukhi Rudraksha", code: "QRD-9845", quantity: 10, price: "₹1,299", rating: 4.9, reviews: 560 },
    { image: SevenMukhiRudraksh, name: "7 Mukhi Rudraksha", code: "QRD-9845", quantity: 10, price: "₹1,299", rating: 4.9, reviews: 560 },
    { image: SevenMukhiRudraksh, name: "7 Mukhi Rudraksha", code: "QRD-9845", quantity: 10, price: "₹1,299", rating: 4.9, reviews: 560 },
    { image: SevenMukhiRudraksh, name: "7 Mukhi Rudraksha", code: "QRD-9845", quantity: 10, price: "₹1,299", rating: 4.9, reviews: 560 },
    { image: SevenMukhiRudraksh, name: "7 Mukhi Rudraksha", code: "QRD-9845", quantity: 10, price: "₹1,299", rating: 4.9, reviews: 560 },
  ];

  return (
    <>
      <div className="flex flex-col items-start gap-5 mt-8 px-4 w-full sm:mt-[45px]">
        <div className="w-full">
          <p className="h-[26px] text-[18px] font-semibold leading-[24px] sm:text-[20px] sm:leading-[26px] font-['SF_Pro']">Recent Products</p>
        </div>
        <div className="grid grid-cols-1 gap-6 w-full sm:grid-cols-3 sm:gap-10">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
      <p className="text-center text-[13px] font-medium text-black/60 mt-6 sm:text-[15px] sm:mt-[30px] font-['SF_Pro']">
        @ 2025 Vastu Abhishek, All rights reserved.
      </p>
    </>
  )
}

export default BottomPart