import React, {useContext, useState} from "react";
import useApp from '../../AppContext';
import CourseItem from "./CourseItem";



const CourseList = () => {
  const { courseList } = useApp();

  return (
    <div className="course-list">
      <ul>
      {courseList.map((course, index) => (
        <CourseItem key={index} course={course} />
      ))}
       </ul>
    </div>
    
  );
};

export default CourseList;