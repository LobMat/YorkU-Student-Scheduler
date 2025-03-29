//#region - imports
import { createContext, useContext, useEffect, useRef, useState } from "react";     // react hooks
import { useObjectList, useObjectRef } from "../../logic/CustomStates"; // custom logic
import { useMountedEffect } from "../../logic/CustomEffects";
import { readLocal, writeLocal, POST } from "../../logic/BrowserStorage";
import SearchBar from "./components/SearchBar";
import CourseItem from "./components/CourseItem";
import Schedule from "./components/Schedule";
import { useAppContext } from "../../App";
import CustomActivities from "./components/CustomActivities";
import './styles/LeftBody.css'
//#endregion

//#region - context creation
const SchedulingContext = createContext();
export const useMainContext = () => useContext(SchedulingContext);
import './styles/Overlay.css'
//#endregion

const MainPage = () => {

  //#region - instantiation

  // instantiate hooks
  const [courses, getCourseValue, setCourseValue, pushCourse, initList] = useObjectList();
  const [prefs, getPref, setPref, initMap] = useObjectRef();  //an object ref which stores the local preferences.
  const [hoveredCourse, setHoveredCourse] = useState(undefined);

  const [customActivityList, setActivityValue, getActivityValue, pushActivity, setCustomActivityList] = useObjectList();
  //write locally... 

  const {
    fetchMethods: { courseListFromPrefs },
    navigation: { hasSignedIn, navigationTrigger },
    overlay: { overlayState }
  } = useAppContext();

  const signInBool = useRef(hasSignedIn);
  const timeTilSave = useRef(-1);

  // organize context variables into sections:
  const hooks = { courses, prefs, hoveredCourse, customActivityList };
  const getters = { getCourseValue, getPref };
  const setters = { setCourseValue, pushCourse, setPref, setHoveredCourse };
  const dev = { initList, initMap };


  //#region - effects

  // do on page mount
  useEffect(() => {
    navigationTrigger();                  // check for valid sign in
    initMap(readLocal('coursePrefs'));    // load local prefs into reference
    setCustomActivityList(readLocal('customActs'));
    courseListFromPrefs(prefs.current).then(list => initList(list));   // set UI state to store the data

    // set-up the course preference map database storage interval:
    const interval = setInterval(() => {
      if (timeTilSave.current > -1) {
        if (signInBool.current && timeTilSave.current == 0) {
          fetch(`http://localhost:3000/accounts/store`, POST({ username: readLocal('id'), prefs: readLocal('coursePrefs'), customActs: readLocal('customActs') }));
        }
        timeTilSave.current -= 1;
      }
    }, 1000)

    return () => { clearInterval(interval) };
  }, [])

  // do upon sign-in state change
  useEffect(() => { signInBool.current = hasSignedIn }, [hasSignedIn])

  // course database write timer reset if logged in
  useMountedEffect(() => {
    if (signInBool.current && timeTilSave.current == -1) {
      timeTilSave.current = 3;
    }
  }, [courses, customActivityList]);
  //#endregion

  const getActivity = (activity) => { pushActivity(activity) }
  useMountedEffect(() => {
    writeLocal('customActs', customActivityList)
  }, [customActivityList])

  //#region - html return
  return (
    <SchedulingContext.Provider value={{ hooks, getters, setters, dev }}>
      <div id='left-body'>
        <SearchBar />
        <CustomActivities onSubmit={getActivity} />
        <div className="course-list">
          <ul>
            {
              courses?.map((course, index) =>
                <CourseItem key={index} course={course} />
              )}
          </ul>
        </div>
      </div>
      <div id='right-body'>
        <Schedule term="FALL" bool={overlayState == 2} />
        <Schedule term="WINTER" bool={overlayState == 3} />

      </div>


    </SchedulingContext.Provider>
  );
  //#endregion

}

export default MainPage
