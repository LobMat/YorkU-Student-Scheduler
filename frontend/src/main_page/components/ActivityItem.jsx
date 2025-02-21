import React, { useEffect, useState, useRef } from "react";
import useApp from '../../AppContext.jsx'
import {StartTimeSelect, DurationSelect} from './Dropdowns.jsx'
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
import { useMountedEffect } from "../MainPageHooks.js";
const ActivityItem = ({ atts, actName, type, pos }) => {

  const { code, sectIndex, subsectIndex } = atts;
  const {prefs, prefObject} = useApp();
//NAME;M;8;4 
  const [actMap, setActMap] = useState(prefObject?.[code]?.sectPrefs?.[sectIndex]?.[`${type}ActTimes`]?.[pos]);  

  useMountedEffect(()=>{
    setActMap(prefObject?.[code]?.sectPrefs?.[sectIndex]?.[`${type}ActTimes`]?.[pos]);
  }, [actName]);

  
  useEffect (() => {
    prefs.setActivityTime(code, type, pos, actMap);
    
  }, [actMap])
  // useEffect(() => {
  //   setActMap(JSON.parse(prefs.getActivityTime(actName)));
  // }, [atts.sect, actName]);

  // useEffect(() => {
  //   setActivities((prev) => {
  //     // Check if an activity with the same courseCode & section already exists
  //     const existingIndex = prev.findIndex(
  //       (activity) =>
  //         activity.actName === actName &&
  //         activity.atts.code === atts.code &&
  //         activity.atts.sect === atts.sect &&
  //         activity.atts.term === atts.term
  //     );
  
  //     if (existingIndex !== -1) {
  //       // If it exists, replace the old entry
  //       const updatedActivities = [...prev];
  //       updatedActivities[existingIndex] = actMap;
  //       return updatedActivities;
  //     } else {
  //       // Otherwise, add a new one
  //       return [...prev, actMap];
  //     }
  //   });
  // }, [actMap]);
  
  const handleSelection = (day, value) => {
    setActMap(prev =>
      prev.map((vals, index) => {
        return day === index ? [value, vals[1], vals[2]] : vals
      })
    )
  }

  const handleTimeChange = (day, value) => {
    setActMap(prev =>
      prev.map((vals, index) => {
        return day === index ? [vals[0], value, vals[2]] : vals
      })
    )
  }
  const handleDurationChange = (day, value) => {
    setActMap(prev =>
      prev.map((vals, index) => {
        return day === index ? [vals[0], vals[1], value] : vals
      })
    )
  }

  return (
    <div className="activity-item">
      <h4>{actName}</h4>
      {daysOfWeek.map((day, index) => (
        <div key={day} className="activity-day">
          <input
            type="checkbox"
            checked={actMap?.at(index)?.at(0) || false}
            onChange={(e) =>
              handleSelection(index, e.target.checked)
            }
          />
          <label>{day}</label>
          {actMap?.at(index)?.at(0) && (
            <>
            <StartTimeSelect value={actMap?.at(index)?.at(1)} parentHandler={(selection) => handleTimeChange(index, selection)}/>
            <DurationSelect value={actMap?.at(index)?.at(2)} parentHandler={(selection) => handleDurationChange(index, selection)}/>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityItem;
