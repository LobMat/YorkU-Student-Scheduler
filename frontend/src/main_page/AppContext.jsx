import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
const AppContext = createContext();


export function AppProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  
  const addCourse = async (query) => {
    try {
        const response = await fetch(`http://localhost:5000/courses/${query}`)
        if (!response.ok) {
            alert("Course not found.")
            throw new Error("Course not found");
        }
            
        if (courses.find(course => course.code == query)) {
            alert("You have added this course!")
            throw new Error("You already have added this course.")
        }

        const course = {code: query, data: await response.json()};
        if (course) {
            setCourses((prevCourses) => [...prevCourses, course]);
        }
    } catch (error) {
        console.error("Error adding course.", error);
    }
  };

  return (
    <AppContext.Provider value={{ courses, setCourses, activities, setActivities, addCourse}}>
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  return useContext(AppContext);
}
export default useApp;