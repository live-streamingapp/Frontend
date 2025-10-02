import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import AdminLayout from "../../Layout/AdminLayout";

function AdminCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/courses`
        );
        setCourses(response.data.data); // Assuming API returns an array of courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center">
        <div className="text-[18px] font-semibold">Courses</div>
        <button
          onClick={() => navigate("/admin/create-course")}
          className="flex h-[40px] items-center gap-[.5rem] px-[1rem] py-[2px] rounded-[5px] cursor-pointer text-white bg-gradient-to-b from-[#bf1305] to-[#f64f42]"
        >
          <FiPlus size={23} />
          Add New Course
        </button>
      </div>
      <section className="mt-8 mx-2.5 sm:ml-[35px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-[35px]">
        {courses.map((course) => (
          <article
            key={course._id}
            className="w-full mx-auto border border-[#ECECEC] shadow-md rounded-[15px] pb-3 flex flex-col items-center gap-2"
          >
            <img
              src={course.image || "/images/AstroVastu.png"}
              alt={course.title}
              className="block w-full h-[150px] object-cover rounded-t-[15px]"
            />
            <div className="flex flex-col items-start gap-[9px] w-[90%] max-w-[258px] mx-auto">
              <h3 className="text-[14px] font-semibold pt-1">{course.title}</h3>
              <p className="text-[12px] font-medium">{course.description}</p>
              <hr className="w-full border-t border-black" />
              <footer className="flex justify-between items-center w-full">
                <span className="text-[14px] font-semibold">
                  ₹ {course.price?.toLocaleString() || "0"}
                </span>
                <button className="text-white bg-[#BB0E00] text-[10px] w-[63px] h-[26px] px-[5px] flex justify-center items-center rounded-md">
                  Edit
                </button>
              </footer>
            </div>
          </article>
        ))}
      </section>
      <p className="text-[15px] font-normal underline text-center mt-5 cursor-pointer">
        Load More
      </p>
      <br /> <br />
    </AdminLayout>
  );
}

export default AdminCourses;
