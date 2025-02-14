import React, { useMemo, useEffect, useState } from "react";
import ActivityList from "./ActivityList";

const CourseItem = ({ course }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState(course.data.sections[0]);

  const [subsectIndex, setSubsectIndex] = useState(0);
  const [selectedSubsect, setSelectedSubsect] = useState(course.data.sections[0].subsects[0]);



  useEffect(() => {
    const newSection = course.data.sections[sectionIndex];
    setSelectedSection(newSection);
  }, [sectionIndex])

  useEffect(() => {
    const subsect = selectedSection.subsects[subsectIndex];
    setSelectedSubsect(subsect);
  }, [subsectIndex])

  
 
  return (
    <div className="course-item">
      <p className="course-code">{course.code}</p>
      {/* Section dropdown */}
      <select onChange={(e) => {
        setSectionIndex(Number(e.target.value));
        setSubsectIndex(0);
      }}>
        
      
        {course.data.sections.map((section, index) => (
          <option key={index} value={index}>
            Term {section.term} Section {section.sect}
          </option>
        ))}
      </select>
      <p className="course-title">{course.data.title}</p>
      <select onChange={(e) => setSubsectIndex(Number(e.target.value))} value={subsectIndex}>
        {selectedSection.subsects.map((subsection, index) => (
          
        <option key={index} value={index}>
          {subsection.name}
        </option>
      ))}
      </select>

      <ActivityList 
        courseActivities={[
          ...selectedSection.commonActs,
             selectedSubsect,
        ].map((activity) => ({
          act: activity,
          code: course.code,
          sect: selectedSection.sect,
          term: selectedSection.term,
  }))}
/>
    </div>
  );
};

export default CourseItem;
