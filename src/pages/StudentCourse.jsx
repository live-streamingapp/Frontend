import React from "react";
import Header from "../components/Header/Header";
import CourseHeader from "../components/StudentCourses/CourseHeader";
import CourseContainer from "../components/StudentCourses/CourseContainer";

const StudentCourse = () => {
  return (
    <>
      <Header />
      <CourseHeader />
      <CourseContainer />
    </>
  );
};

export default StudentCourse;
