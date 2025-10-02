import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import StudentCard from "../components/Admin/StudentCard";
import Layout from "../components/Admin/Layout";
import CourseProgressPage from "../components/courseProgress/CourseProgressPage";
import BookingHistory from "./BookingHistory";
import studentRecords from "../data/studentRecords.js";
import AdminLayout from "../Layout/AdminLayout.jsx";

const PER_PAGE = 8;

export default function StudentManagement() {
  const [activeTab, setActiveTab] = useState("allStudents");
  const [q] = useState("");
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // const filteredStudents = data.students.filter((s) => s.dob);
        // setStudents(filteredStudents);
        setStudents(data.students);
        // console.log(filteredStudents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter + paginate for reports
  const filtered = useMemo(() => {
    return studentRecords.filter((r) => {
      const blob =
        `${r.student} ${r.report} ${r.level} ${r.uploader}`.toLowerCase();
      return blob.includes(q.toLowerCase());
    });
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pages = Math.min(3, totalPages); // Cap at 3 max
  const start = (page - 1) * PER_PAGE;
  const rows = filtered.slice(start, start + PER_PAGE);

  const handleDownload = (row) => {
    console.log("download:", row);
    alert(`Downloading ${row.report} for ${row.student}`);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading students...</div>;
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
        <button
          className="px-4 py-2 text-white rounded hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(to right, #BB0E00, #B94400)" }}
        >
          + Add Student
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {[
          { key: "allStudents", label: "All Students" },
          { key: "courseProgress", label: "Course Progress" },
          { key: "bookingHistory", label: "Booking History" },
          { key: "reportsDownload", label: "Reports Download" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab.key ? "text-white" : "bg-gray-200 text-gray-700"
            }`}
            style={
              activeTab === tab.key
                ? { background: "linear-gradient(to right, #BB0E00, #B94400)" }
                : {}
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "allStudents" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((s) => (
            <StudentCard key={s._id} student={s} />
          ))}
        </div>
      )}

      {activeTab === "courseProgress" && <CourseProgressPage />}
      {activeTab === "bookingHistory" && <BookingHistory />}

      {activeTab === "reportsDownload" && (
        <div className="space-y-4">
          {/* Reports table remains the same */}
          <div className="border border-[#E1E1E1] p-4 bg-white">
            <table className="w-full border border-[#E1E1E1] bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Student</th>
                  <th className="p-2">Report</th>
                  <th className="p-2">Level</th>
                  <th className="p-2">Downloaded</th>
                  <th className="p-2">Uploaded by</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-t border-[#E1E1E1]">
                    <td className="p-2">{row.student}</td>
                    <td className="p-2">{row.report}</td>
                    <td
                      className="p-2 font-semibold"
                      style={{
                        color:
                          row.level?.toLowerCase() === "basic"
                            ? "#009823"
                            : row.level?.toLowerCase() === "silver"
                            ? "#AC8400"
                            : row.level?.toLowerCase() === "gold" ||
                              row.level?.toLowerCase() === "platinum"
                            ? "#BB0E00"
                            : "inherit",
                      }}
                    >
                      {row.level?.toLowerCase() === "silver"
                        ? "Mid"
                        : row.level?.toLowerCase() === "gold" ||
                          row.level?.toLowerCase() === "platinum"
                        ? "Adv"
                        : row.level}
                    </td>
                    <td className="p-2">Jul 10, 2025</td>
                    <td className="p-2">{row.uploader}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDownload(row)}
                        className="px-3 py-1 text-white rounded"
                        style={{
                          background:
                            "linear-gradient(to right, #BB0E00, #B94400)",
                        }}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              className="px-3 py-1 border border-[#E1E1E1] rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              &lt;
            </button>
            {Array.from({ length: 3 }, (_, i) => i + 1).map((p) => {
              if (p === 2) {
                return (
                  <button
                    key={p}
                    className="px-3 py-1 rounded border border-[#BB0E00] bg-[#BB0E00] text-white"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                );
              }
              if (p === 1 || p === 3) {
                return (
                  <button
                    key={p}
                    className="px-3 py-1 rounded border border-[#E1E1E1] bg-white text-black hover:bg-gray-100"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                );
              }
            })}
            <button
              className="px-3 py-1 border border-[#E1E1E1] rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setPage(Math.min(pages, page + 1))}
              disabled={page === pages}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
