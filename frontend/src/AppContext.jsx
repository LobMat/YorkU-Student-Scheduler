import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
const AppContext = createContext();
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
import { PrefLogic } from "./main_page/MainPageLogic";
import useCourseList from "./main_page/useCourseList";
export function AppProvider({ children }) {


  //constant course data, not updated ever.
  const {courseList,
         prefObject,
         setPrefObject,
         addNewCourse} = useCourseList();
  
  //account-based preferences.
  
  const prefs = {
    curSec:(code) => prefObject[code]?.sectChoice,
    curSub:(code) => prefObject[code]?.sectPrefs[prefs.curSec(code)].subsectChoice,
    setSectionChoice: (code, newSec) => {
      if (newSec != prefs.curSec(code)) {
        setPrefObject((prev) => ({
          ...prev,
          [code]: {...prev[code], sectChoice: newSec }
        }))
      }
    },
    //given a course, update the prefered subsection for the current section. If changed.
    setSubsectChoice: (code, newSub) => {
      if (newSub != prefs.curSub(code))  {
        setPrefObject((prev) => ({
          ...prev,
          [code]: {
            ...prev[code], 
            sectPrefs: prev[code].sectPrefs.map((sect, i) =>
                i === prefs.curSec(code) ? {...sect, subsectChoice: newSub } : sect
            ), 
          },
        }))
      }
    },
      
    setActivityTime: (code,  type, pos, timeMap) => {
      setPrefObject((prev) => ({
        ...prev,
        [code]: {
          ...prev[code], 
          sectPrefs: prev[code].sectPrefs.map((sect, i) =>
            i === prefs.curSec(code) ? ({
              ...sect, 
              [`${type}ActTimes`]: 
                sect[`${type}ActTimes`].map((time,j) => j === pos ? timeMap : time)
            }) : sect
          ), 
        },
      }))
    },
  }

  useEffect(() => {
    localStorage.setItem('coursePrefList', JSON.stringify(prefObject));
  }, [prefObject]);

  return (
    <AppContext.Provider value={{daysOfWeek, courseList, prefObject, setPrefObject, addNewCourse, prefs}}>
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  return useContext(AppContext);
}
export default useApp;