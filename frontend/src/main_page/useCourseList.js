import { useState, useRef } from 'react';
import { useMountedEffect } from './MainPageHooks';


const readCourse = async (query) => {
  const response = await fetch(`http://localhost:5000/courses/${query}`)
  if (!response.ok) {
    alert("Course not found.")
    throw new Error("Course not found");
  } else {
    return await response.json(); //course data.
  }
}

const useCourseList = () => {
  
  const [middleObject, setMiddleObject] = useState({});
  const [dataObject, setDataObject] = useState({});

  const [prefObject, setPrefObject] = useState(JSON.parse(localStorage.getItem('coursePrefs') || "{}"));
  const [courseList, setCourseList] = useState([]);
  const addingNew = useRef(false);


  const addNewCourse = async (query) => {
    const courseData = await readCourse(query);
    setMiddleObject({code: query, data: courseData});
    addingNew.current = true;
  }

  // create the data object
  useMountedEffect(() => {
    setDataObject({
      code:       middleObject.code,
      title:      middleObject.data.title,
      sections:   middleObject.data.sections,
    })
  }, [middleObject])

  useMountedEffect(() => {
    setPrefObject((prev) => (!prev[dataObject.code]) ? {
      ...prev,
      [dataObject.code]: {
        sectChoice: 0,
        sectPrefs: dataObject.sections.map(section => ({
            subsectChoice: 0,
            commonActTimes: section.commonActs.map(()=>[[false,0,0],[false,0,0],[false,0,0],[false,0,0],[false,0,0]]),
            subsectActTimes: section.subsects.map(()=>[[false,0,0],[false,0,0],[false,0,0],[false,0,0],[false,0,0]]),
        }))
      }
    } : prev)
  }, [dataObject]);
  
  useMountedEffect(() => {
    if (addingNew.current) {
      setCourseList((prev) => [...prev, dataObject]);
      addingNew.current = false;
    }
  }, [prefObject])
  
  

  return {
    courseList,
    prefObject,
    setPrefObject,
    addNewCourse,
  };
};

export default useCourseList;