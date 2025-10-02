// src/components/customer/OrdersHistory.jsx
import React from "react";

const timelineSteps = [
  { label: "Order Confirmed", date: "03, July 2025" },
  { label: "Order Shipped", date: "07, July 2025" },
  { label: "Order Delivered", date: "13, July 2025" },
];

export default function OrdersHistory({ order }) {
  // Example order data fallback
  const o = order || {
    customerName: "Swati Joshi",
    addressLines: ["7 Mukhi Rudraksha"],
    orderId: "9845",
    orderDate: "Jul 10, 2025",
    payableAmount: "₹1,299",
    deliveryStatus: "Delivered on Jul 13",
    product: {
      title: "7 Mukhi Rudraksha",
      qty: 10,
      price: "₹1,299",
      img: "/images/product1.png",
      rating: 4.9,
      reviews: 560,
    },
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header card */}
      <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Left column: label list with time-icon */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <img src="/images/time-icon.png" alt="icon" className="w-4 h-4" />
              <span>Customer Name:</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/time-icon.png" alt="icon" className="w-4 h-4" />
              <span>Product:</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/time-icon.png" alt="icon" className="w-4 h-4" />
              <span>Order ID:</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/time-icon.png" alt="icon" className="w-4 h-4" />
              <span>Order Date:</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/time-icon.png" alt="icon" className="w-4 h-4" />
              <span>Payable Amount:</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/time-icon.png" alt="icon" className="w-4 h-4" />
              <span>Delivery Status:</span>
            </div>
          </div>

          {/* Middle spacer */}
          <div className="hidden sm:block" />

          {/* Right column: values */}
          <div className="text-sm text-gray-800 space-y-2 text-right">
            <div>{o.customerName}</div>
            <div>{o.product.title}</div>
            <div className="font-medium">ORD-{o.orderId}</div>
            <div>{o.orderDate}</div>
            <div className="font-semibold">{o.payableAmount}</div>
            <div className="text-green-600 font-medium">{o.deliveryStatus}</div>
          </div>
        </div>
      </div>

      {/* Timeline card */}
      <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100">
        <h3 className="text-sm font-semibold mb-3">1 Item Delivered</h3>
        <p className="text-xs text-gray-500 mb-4">
          Product delivered on <span className="font-medium">July 13, 2025</span>
        </p>

        <div className="relative pl-6">
          {/* vertical line */}
          <div className="absolute left-2 top-1 bottom-1 w-[2px] bg-gray-200" />

          {timelineSteps.map((s, idx) => (
            <div key={s.label} className="relative mb-6 pl-4">
              <span
                className={`absolute -left-[10px] top-0 w-3.5 h-3.5 rounded-full
                  ${idx === timelineSteps.length - 1
                    ? "bg-gradient-to-r from-[#BB0E00] to-[#B94400]"
                    : "bg-[#BB0E00]"}`}
              />
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-gray-500">{s.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product card */}
      <div className="bg-white rounded-2xl p-4 shadow-soft border border-gray-100 flex flex-col sm:flex-row gap-4 items-center">
        <img
          src={o.product.img}
          alt={o.product.title}
          className="w-28 h-28 object-cover rounded-lg shadow-sm"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold">{o.product.title}</div>
              <div className="text-xs text-gray-500">ORD-{o.orderId}</div>
              <div className="text-xs text-gray-600 mt-2">Qty: {o.product.qty}</div>

              {/* Price & Rating BELOW Qty */}
              <div className="mt-1 text-sm font-semibold">{o.product.price}</div>
              <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                <img src="/images/Star 1.png" alt="star" className="w-3 h-3" />
                <span>{o.product.rating}  ({o.product.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button className="w-full text-white font-medium py-3 rounded-lg bg-gradient-to-r from-[#BB0E00] to-[#FA5446] hover:opacity-95 transition">
          Return Product
        </button>

        <div className="rounded-lg p-[1px] bg-gradient-to-r from-[#BB0E00] to-[#FA5446]">
          <button className="w-full bg-white py-3 rounded-lg text-[#BB0E00] font-medium">
            Cancel Product
          </button>
        </div>
      </div>
    </div>
  );
}
