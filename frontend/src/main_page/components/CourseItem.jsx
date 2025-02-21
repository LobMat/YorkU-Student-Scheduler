import React, { useMemo, useEffect, useState } from "react";
import useApp from '../../AppContext';
import ActivityList from "./ActivityList";
import { useMountedEffect } from "../MainPageHooks";

//IDEA: pass in the useState function as courseHook. on useState update,
const CourseItem = ({ course }) => {

  const { prefObject, setPrefObject, prefs } = useApp();
  const [sectionIndex, setSectionIndex] = useState(0);
  const [subsectIndex, setSubsectIndex] = useState(0);
  // info for the overall course, update when the course updates (for some reason)
  const { code, title, sections } = useMemo (() => ({
    code:     course.code,
    title:    course.title,
    sections: course.sections,
  }), [course]);
  
  useMountedEffect(()=> {
    setSectionIndex(prefs.curSec(code));
    setSubsectIndex(prefs.curSub(code));
  },[code])
  
  // info for the section of this course, updated when the sectionPref is changed.
  const { subsectList } = useMemo(() => ({
    subsectList: sections[sectionIndex]?.subsects || [],
  }), [sectionIndex])


  // handle section index update.
  useMountedEffect(() => {
    prefs.setSectionChoice(code, sectionIndex)
  }, [sectionIndex]);

  useMountedEffect(() => {
    setSubsectIndex(prefs.curSub(code));
  }, [prefObject[code].sectChoice])
  
  useMountedEffect(() => { 
    prefs.setSubsectChoice(code, subsectIndex); 
  }, [subsectIndex]);


  return (
    <div className="course-item">
      <p className="course-code">{code}</p>
      {/* Section dropdown */}
      <select onChange={(e) => {
        setSectionIndex(Number(e.target.value));
      }} value={sectionIndex}>
        
      
        {sections.map((section, index) => (
          <option key={index} value={index}>
            Term {section.term} Section {section.sect}
          </option>
        ))}
      </select>
      <p className="course-title">{title}</p>
      <select onChange={(e) => setSubsectIndex(Number(e.target.value))} value={subsectIndex}>
        {subsectList.map((subsection, index) => (
          
        <option key={index} value={index}>
          {subsection.name}
        </option>
      ))}
      </select>

      <ActivityList atts={{
        code: code,
        sectIndex: sectionIndex,
        subsectIndex: subsectIndex,
        }} 
        subsect={subsectList[subsectIndex]}
        commonActs={sections[sectionIndex]?.commonActs} 
      />
    </div>
  );
};

export default CourseItem;
