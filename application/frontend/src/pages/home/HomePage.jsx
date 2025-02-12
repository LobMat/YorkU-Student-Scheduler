//#region - imports
  import { createContext, useContext, useEffect, useRef} from "react";     // react hooks
  import { useObjectList, useObjectRef } from "../../logic/CustomStates"; // custom logic
  import { useMountedEffect } from "../../logic/CustomEffects";
  import { readLocal, POST } from "../../logic/BrowserStorage";
  import SearchBar from "./components/SearchBar";
  import CourseItem from "./components/CourseItem";
  import Schedule from "./components/Schedule";
  import { useAppContext } from "../../App";
  import './styles/LeftBody.css'
//#endregion

//#region - context creation
const SchedulingContext = createContext();
export const useMainContext = () => useContext(SchedulingContext);
//#endregion

const MainPage = () => {

  //#region - instantiation
  
  const {navTrig, hasSignedIn} = useAppContext();
  const signInBool = useRef(hasSignedIn);
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
    navTrig();
    // read local prefs into the reference, append this to get request.
    initMap(readLocal('coursePrefs'));

    //fetch request for list of course objects in the pref object.
    fetch(`http://localhost:3000/courses/init?data=${encodeURIComponent(JSON.stringify(prefs.current))}`, {method: 'GET'})
    .then(response => response.json())
    .then(data => initList(data.courseObjectList));
    
  }, [])

  
  useEffect(()=> {
    signInBool.current = hasSignedIn
  },[hasSignedIn])
  //#endregion
  
  //#region - course preference update handler

  // effect which sets a timer. every one second decrement it as long as its over -1. when it reaches zero,
  // store account preferences changes in the database.
  const timeTilSave = useRef(-1);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeTilSave.current > -1) {
        if (signInBool.current && timeTilSave.current == 0) {
          const id = readLocal('id');
          fetch(`http://localhost:3000/accounts/store`, POST({username: id, prefs: readLocal('coursePrefs')}));
        }
        timeTilSave.current -= 1;
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // effect which resets timer on course change if timer inactive and user is signed in.
  useMountedEffect(() => {
    if (signInBool.current && timeTilSave.current == -1) {
      timeTilSave.current = 5;
    }
  }, [courses]);

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
