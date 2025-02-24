import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { useObjectList, useObjectMap, useObjectRef, useMountedEffect } from "../../hooks/yst-hooks";
import CourseItem from "./components/CourseItem";
import SearchBar from "./components/SearchBar";
import Schedule from "./components/Schedule";
import './styles/LeftBody.css'

const SchedulingContext = createContext();
export const useMainContext = () => useContext(SchedulingContext);


function MainPage() {

  //#region -- instantiation 

  // custom hook instantiation
  const [prefs, getPref, setPref, clear] = useObjectRef(JSON.parse(localStorage.getItem('coursePrefs') ?? '{}'));
  const [courses, getCourseValue, setCourseValue, pushCourse, initList] = useObjectList();
  const [activities, getActValue, setActValue, pushAct, initObj] = useObjectMap();
  
  // groupings of global props 
  const hooks = {prefs, courses, activities};
  const getters = {getPref, getCourseValue, getActValue};
  const setters = {setPref, setCourseValue, pushCourse, setActValue, pushAct};
  const dev = {clear, initList, initObj};

  //#endregion
  
  //on mount, load course objects from existing preferences.
  useEffect(() => {
    fetch(`http://localhost:5000/courses/init?data=${encodeURIComponent(JSON.stringify(prefs))}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          initList(data.courseUIContainer);
          initObj(data.activityUIContainer);
        } 
      })
      .catch(error => {
        throw new Error(error.message);
      })
  }, [])

  return(
    <SchedulingContext.Provider value={{hooks, getters, setters, dev}}>
      <div id='left-body'>

        <SearchBar />

        <div className="course-list">
          <ul>
            {
            courses?.map((course, index) => 
              <CourseItem key={index} course={course}/>
            )}
          </ul>
        </div>
      </div>
      <div id='sect2'>
        {/* <Schedule term="FALL"/>
        <Schedule term="WINTER" /> */}
      </div>

    </SchedulingContext.Provider>
  );
}
export default MainPage

