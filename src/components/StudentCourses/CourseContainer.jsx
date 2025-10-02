import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import CourseCard from "./CourseCard"; // import new card

const CourseContainer = () => {
  const [courses, setCourses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600 text-lg">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 p-3 sm:p-6">
        {courses.slice(0, visibleCount).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      {visibleCount < courses.length && (
        <div className="flex justify-center my-3">
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

export default CourseContainer;
