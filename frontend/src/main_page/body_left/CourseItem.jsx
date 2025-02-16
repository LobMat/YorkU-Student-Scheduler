import React, { useMemo, useEffect, useState } from "react";
import ActivityList from "./ActivityList";

const CourseItem = ({ course }) => {


  const [sectionIndex, setSectionIndex] = useState(0);  
  const [subsectIndex, setSubsectIndex] = useState(0);

  const [selection, setSelection] = useState({
    sect: course.data.sections[0], 
    subsect: course.data.sections[0].subsects[0]
  });


  const courseActivities = useMemo(() => [
    ...selection.sect.commonActs,
    selection.subsect
  ].map((activity) => (activity.name)), [selection.sect, selection.subsect]);
  


  useEffect(() => {
    setSelection((prev) => {
      return {...prev, sect: course.data.sections[sectionIndex]};
    });
    setSubsectIndex(0);
  }, [sectionIndex]);

  useEffect(() => {
    setSelection((prev) => {
      return {...prev, subsect: course.data.sections[sectionIndex].subsects[subsectIndex]};
    });
  }, [subsectIndex]);
  
 
  return (
    <div className="course-item">
      <p className="course-code">{course.code}</p>
      {/* Section dropdown */}
      <select onChange={(e) => {
        setSectionIndex(Number(e.target.value));
      }}>
        
      
        {course.data.sections.map((section, index) => (
          <option key={index} value={index}>
            Term {section.term} Section {section.sect}
          </option>
        ))}
      </select>
      <p className="course-title">{course.data.title}</p>
      <select onChange={(e) => setSubsectIndex(Number(e.target.value))} value={subsectIndex}>
        {selection.sect.subsects.map((subsection, index) => (
          
        <option key={index} value={index}>
          {subsection.name}
        </option>
      ))}
      </select>

      <ActivityList atts={{
        code: course.code,
        sect: selection.sect.sect,
        term: selection.sect.term
        }} 
        courseActivities={courseActivities} 
      />
    </div>
  );
};

export default CourseItem;
