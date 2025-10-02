import React from "react";
import Header from "../components/Header/Header";
import AstroCourseContainer from "../components/AstrologerCourse/AstroCourseContainer";
import AstroCourseHeader from "../components/AstrologerCourse/AstroCourseHeader";

const AstroCourse = () => {
  return (
    <>
      <Header />
      <AstroCourseHeader />
      <AstroCourseContainer />
    </>
  );
};

export default AstroCourse;
