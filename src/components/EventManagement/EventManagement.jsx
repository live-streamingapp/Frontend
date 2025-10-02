import React from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import EventsList from "./EventsList";
import AdminLayout from "../../Layout/AdminLayout";

const EventManagement = () => {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center my-[1rem]">
          <p className="text-xl font-bold">Events</p>
          <button
            onClick={() => navigate("/admin/create-event")}
            className="flex h-[40px] items-center gap-[.5rem] px-[1rem] py-[2px] rounded-[5px] cursor-pointer text-white bg-gradient-to-b from-[#bf1305] to-[#f64f42]"
          >
            <FiPlus size={23} />
            Create New Event
          </button>
        </div>
        {/* <p>There will be a list of events already scheduled</p> */}
        <EventsList />
      </div>
    </AdminLayout>
  );
};

export default EventManagement;
