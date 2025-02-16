import React, { useEffect, useState } from "react";
import useApp from '../AppContext'
import {StartTimeSelect, DurationSelect} from './Dropdowns.jsx'
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ActivityItem = ({ atts, actName }) => {
  const {setActivities} = useApp();


  const [actMap, setActMap] = useState({    actName,
    atts,
    Monday:     { selected: false, startTime: 0, duration: 0 },
    Tuesday:    { selected: false, startTime: 0, duration: 0 },
    Wednesday:  { selected: false, startTime: 0, duration: 0 },
    Thursday:   { selected: false, startTime: 0, duration: 0 },
    Friday:     { selected: false, startTime: 0, duration: 0 }});
  useEffect(() => {
    setActMap({
    actName,
    atts,
    Monday:     { selected: false, startTime: 0, duration: 0 },
    Tuesday:    { selected: false, startTime: 0, duration: 0 },
    Wednesday:  { selected: false, startTime: 0, duration: 0 },
    Thursday:   { selected: false, startTime: 0, duration: 0 },
    Friday:     { selected: false, startTime: 0, duration: 0 }
  });

}, [atts.sect, actName])

  useEffect(() => {
    setActivities((prev) => {
      // Check if an activity with the same courseCode & section already exists
      const existingIndex = prev.findIndex(
        (activity) =>
          activity.actName === actName &&
          activity.atts.code === atts.code &&
          activity.atts.sect === atts.sect &&
          activity.atts.term === atts.term
      );
  
      if (existingIndex !== -1) {
        // If it exists, replace the old entry
        const updatedActivities = [...prev];
        updatedActivities[existingIndex] = actMap;
        return updatedActivities;
      } else {
        // Otherwise, add a new one
        return [...prev, actMap];
      }
    });
  }, [actMap]);
  
  const handleChange = (day, field, value) => {
    setActMap((prev) => ({
      ...prev,
      [day]: {...prev[day], [field]: value},
    }));   
  }


  return (
    <div className="activity-item">
      <h4>{actName}</h4>
      {daysOfWeek.map((day) => (
        <div key={day} className="activity-day">
          <input
            type="checkbox"
            checked={actMap[day].selected}
            onChange={(e) =>
              handleChange(day, "selected", e.target.checked)
            }
          />
          <label>{day}</label>
          {actMap[day]?.selected && (
            <>
            <StartTimeSelect value={actMap[day].startTime} parentHandler={(selection) => handleChange(day, "startTime", selection)}/>
            <DurationSelect value={actMap[day].duration} parentHandler={(selection) => handleChange(day, "duration", selection)}/>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityItem;
