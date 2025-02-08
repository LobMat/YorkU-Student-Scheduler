//#region - imports
  import { createContext, useContext, useEffect} from "react";     // react hooks
  import { useObjectList, useObjectRef } from "../../logic/CustomStates"; // custom logic
  import { readLocal } from "../../logic/BrowserStorage";
  import SearchBar from "./components/SearchBar";
  import CourseItem from "./components/CourseItem";
  import Schedule from "./components/Schedule";
  import './styles/LeftBody.css'
//#endregion

//#region - context creation
const SchedulingContext = createContext();
export const useMainContext = () => useContext(SchedulingContext);
//#endregion

const MainPage = () => {

  //#region - instantiation
  
  // instantiate hooks
  const [courses, getCourseValue, setCourseValue, pushCourse, initList] = useObjectList();
  const [prefs, getPref, setPref, initMap] = useObjectRef();  //an object ref which stores the local preferences.
 
  // organize context variables into sections:
  const hooks = {courses, prefs};
  const getters = {getCourseValue, getPref};
  const setters = {setCourseValue, pushCourse, setPref};
  const dev = {initList, initMap};

  // page mount effect: load local preferences, add courses.
  useEffect(() => {
    // read local prefs into the reference, append this to get request.
    initMap(readLocal('coursePrefs'));

    //fetch request for list of course objects in the pref object.
    fetch(`http://localhost:3000/courses/init?data=${encodeURIComponent(JSON.stringify(prefs.current))}`, {method: 'GET'})
    .then(response => response.json())
    .then(data => initList(data.courseObjectList));
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
      <div id='right-body'>
      <Schedule term="FALL"/>
      <Schedule term="WINTER" />
      </div>

    </SchedulingContext.Provider>
  );
  //#endregion

}

export default MainPage
