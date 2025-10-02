import { useState } from "react";
import { courses } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { LuClock, LuVideo } from "react-icons/lu";
import { AiFillSignal } from "react-icons/ai";

const AstroCourseContainer = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/courses`
        );
        setCourses(res.data.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(courses.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 p-3 sm:p-6">
        {courses.slice(0, visibleCount).map((course) => (
          <div
            key={course.id}
            className="flex flex-col shadow-md border border-gray-300 overflow-hidden rounded-xl bg-white hover:scale-[1.03] transition-all .3s ease-in-out"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-[200px] w-full object-cover p-[5px]"
            />
            <h3 className="p-[.5rem] font-semibold">{course.title}</h3>
            {/* <p className="px-[.5rem] text-gray-700 text-[.85rem] flex-grow">
              {course.description}
            </p> */}
            {/* <div className="flex items-center justify-between px-[.5rem]">
              <span className="font-bold">
                ₹ {course.price.toLocaleString()}
              </span>
              <button
                className="px-[1rem] py-[.25rem] my-[.75rem] text-gray-800 border-2 border-gray-300 rounded-[5px] cursor-pointer"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                View Details
              </button>
              <button className="bg-gradient-to-b from-[#bf1305] to-[#f64f42] px-[1rem] py-[.25rem] my-[.75rem] text-white rounded-[5px] cursor-pointer">
                Enroll Now
              </button>
            </div> */}
            <span className="flex items-center gap-[5px] px-[10px] text-sm text-gray-600 font-semibold">
              <AiFillSignal className="text-red-500" />
              Beginner Level
            </span>
            <div className="p-2 flex items-center gap-[1rem]">
              <span className="flex items-center gap-[5px]">
                <LuClock className="text-[#bb1101]" />
                <span className="text-gray-700 text-sm">
                  {course.duration} Week
                </span>
              </span>
              <span className="flex items-center gap-[5px]">
                <LuVideo className="text-[#bb1101]" />
                <span className="text-gray-700 text-sm">
                  {course.lessions} Lessions
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < courses.length && (
        <div className="flex justify-center my-3 ">
          <button
            onClick={handleLoadMore}
            className="bg-gradient-to-b from-[#bf1305] to-[#f64f42] px-4 py-2 text-sm text-white rounded-lg shadow-md hover:opacity-90 transition cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AstroCourseContainer;
