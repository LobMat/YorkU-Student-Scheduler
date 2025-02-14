import React, { useEffect, useState } from "react";
import DelayedInput from "./DelayedInput";
import useApp from '../AppContext'
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ActivityItem = ({ activity }) => {

  const code = activity.courseCode;
  const sect = activity.sect;
  const term = activity.term;
  const name = activity.act.name;
  const {setActivities} = useApp();
  const [value, setValue] = useState("");
  const [schedule, setSchedule] = useState({
    code,
    sect,
    term,
    name,
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {}
  });

  useEffect(() => {
    setActivities((prev) => {
      // Check if an activity with the same courseCode & section already exists
      const existingIndex = prev.findIndex(
        (activity) =>
          activity.code === code &&
          activity.sect === sect &&
          activity.term === term &&
          activity.name === name
      );
  
      if (existingIndex !== -1) {
        // If it exists, replace the old entry
        const updatedActivities = [...prev];
        updatedActivities[existingIndex] = schedule;
        return updatedActivities;
      } else {
        // Otherwise, add a new one
        return [...prev, schedule];
      }
    });
  }, [schedule]);
  

  const handleChange = (day, field, value) => {
    
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  useEffect(() => {
    handleChange()
  }, [value])


  return (
    <div className="activity-item">
      <h4>{activity.name}</h4>
      {daysOfWeek.map((day) => (
        <div key={day} className="activity-day">
          <input
            type="checkbox"
            onChange={(e) =>
              handleChange(day, "selected", e.target.checked)
            }
          />
          <label>{day}</label>
          {schedule[day]?.selected && (
            <>
              <DelayedInput type="time"   value={value} onFinalValueChange={setValue} />
              {/* <DelayedInput type="number" value={value} onFinalValueChange={setValue} /> */}
              {/* <input
                type="number"
                placeholder="Duration (min)"
                onChange={(e) => handleChange(day, "duration", e.target.value)} 
              >
              */}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityItem;
