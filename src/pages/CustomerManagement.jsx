// src/pages/CustomerManagement.jsx
import React, { useMemo, useState } from "react";
import Tabs from "../components/common/Tabs";
import CustomerCard from "../components/customer/CustomerCard";

// ⬇ Import your Layout (make sure path is correct)
import Layout from "../components/Admin/Layout";

// ⬇ Import OrdersHistory component
import OrdersHistory from "../components/customer/OrdersHistory";

export default function CustomerManagement() {
  const [tab, setTab] = useState("list");

  // sample list; replace with API later
  const customers = useMemo(
    () => [
      {
        id: "2025-1087",
        name: "Aditi R. Sharma",
        phone: "+91 98765 43210",
        location: "Pune, India",
        avatar: "/images/aditi.png", // ✅ from public folder
      },
      {
        id: "2025-1087",
        name: "Aditi R. Sharma",
        phone: "+91 98765 43210",
        location: "Pune, India",
        avatar: "/images/aditi.png", // ✅ from public folder
      },
      {
        id: "2025-1087",
        name: "Aditi R. Sharma",
        phone: "+91 98765 43210",
        location: "Pune, India",
        avatar: "/images/aditi.png", // ✅ from public folder
      },
      {
        id: "2025-1088",
        name: "Rahul Verma",
        phone: "+91 99887 77665",
        location: "Delhi, India",
        avatar: "/images/aditi.png",
      },
      {
        id: "2025-1089",
        name: "Sneha Kapoor",
        phone: "+91 91234 56789",
        location: "Mumbai, India",
        avatar: "/images/aditi.png",
      },
      {
        id: "2025-1090",
        name: "Rohan Singh",
        phone: "+91 97654 32109",
        location: "Bangalore, India",
        avatar: "/images/aditi.png",
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="min-h-full flex flex-col gap-4 p-3 sm:p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {/* <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Customer Management
          </h1> */}
        </div>

        {/* Tabs */}
        <Tabs value={tab} onChange={setTab} />

        {/* Content */}
        {tab === "list" && (
          <section className="mt-2">
            {/* Customer Grid */}
            <div
              className="
                grid gap-3 sm:gap-4
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {customers.map((c) => (
                <CustomerCard
                  key={c.id}
                  avatar={c.avatar}
                  name={c.name}
                  phone={c.phone}
                  location={c.location}
                  customerId={c.id}
                  onView={() => console.log("view", c)}
                  onEdit={() => console.log("edit", c)}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center">
              <button className="mt-4 px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50">
                Load More
              </button>
            </div>
          </section>
        )}

        {tab === "orders" && (
          <section className="mt-2">
            <OrdersHistory />
          </section>
        )}

        {tab === "events" && (
          <section className="mt-2">
            <div className="text-gray-600 text-sm">
              Event Bookings — connect calendar / list component here.
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
