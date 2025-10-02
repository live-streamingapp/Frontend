// src/components/common/Tabs.jsx
import React from "react";
import GradientButton from "./GradientButton";

export default function Tabs({ value, onChange }) {
  const base =
    "px-4 py-2.5 rounded-md text-sm font-medium transition border border-gray-200";
  const inactive = "bg-white text-gray-700 hover:bg-gray-50";
  // Active for customer list must be gradient
  return (
    <div className="flex flex-wrap gap-2">
      {value === "list" ? (
        <GradientButton className="!border-none" onClick={() => onChange("list")}>
          Customers List
        </GradientButton>
      ) : (
        <button
          onClick={() => onChange("list")}
          className={`${base} ${inactive}`}
        >
          Customers List
        </button>
      )}

      <button
        onClick={() => onChange("orders")}
        className={`${base} ${value === "orders" ? "bg-gray-900 text-white" : inactive}`}
      >
        Orders &amp; Purchase History
      </button>

      <button
        onClick={() => onChange("events")}
        className={`${base} ${value === "events" ? "bg-gray-900 text-white" : inactive}`}
      >
        Event Bookings
      </button>
    </div>
  );
}
