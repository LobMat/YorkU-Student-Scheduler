//#region - imports
  //#region - functionnal imports
  import { createContext, useContext, useEffect } from "react"; //react hooks
  import { useObjectList, useObjectMap, useObjectRef } from "../../hooks/yst-hooks";  //custom hooks
  //#endregion
  //#region - component imports
  import CourseItem from "./components/CourseItem";
  import SearchBar from "./components/SearchBar";
  import Schedule from "./components/Schedule";
  //#endregion
  //#region - style imports
  import './styles/LeftBody.css'
  //#endregion
  //#region - context creation
const SchedulingContext = createContext();
export const useMainContext = () => useContext(SchedulingContext);
//#endregion
//

const MainPage = () => {

  //#region - instantiation 

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

  //#region - handlers
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
  //#endregion

  //#region - html return
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
  //#endregion

}

export default MainPage

function x (){
  
}