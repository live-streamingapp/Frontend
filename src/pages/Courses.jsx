import React from "react";
import Header from "../components/Header/Header";
import AstroCourseHeader from "../components/AstrologerCourse/AstroCourseHeader";
import AstroCourseContainer from "../components/AstrologerCourse/AstroCourseContainer";
import CourseHeader from "../components/StudentCourses/CourseHeader";
import CourseContainer from "../components/StudentCourses/CourseContainer";

const Course = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role; // "student" or "astrologer"

  return (
    <>
      <Header />
      {role === "astrologer" ? (
        <>
          <AstroCourseHeader />
          <AstroCourseContainer />
        </>
      ) : (
        <>
          <CourseHeader />
          <CourseContainer />
        </>
      )}
    </>
  );
};

export default Course;
