//#region - imports
import { useMemo } from "react";
import {useMainContext} from '../HomePage'
import { writeLocal } from "../../../logic/BrowserStorage";
//#endregion
//#region - global constants
const times = [
  { value: 0, label: "8:00 am"},
  { value: 1, label: "8:30 am"},
  { value: 2, label: "9:00 am"},
  { value: 3, label: "9:30 am"},
  { value: 4, label: "10:00 am"},
  { value: 5, label: "10:30 am"},
  { value: 6, label: "11:00 am"},
  { value: 7, label: "11:30 am"},
  { value: 8, label: "12:00 pm"},
  { value: 9, label: "12:30 pm"},
  { value: 10, label: "1:00 pm"},
  { value: 11, label: "1:30 pm"},
  { value: 12, label: "2:00 pm"},
  { value: 13, label: "2:30 pm"},
  { value: 14, label: "3:00 pm"},
  { value: 15, label: "3:30 pm"},
  { value: 16, label: "4:00 pm"},
  { value: 17, label: "4:30 pm"},
  { value: 18, label: "5:00 pm"},
  { value: 19, label: "5:30 pm"},
  { value: 20, label: "6:00 pm"},
  { value: 21, label: "6:30 pm"},
  { value: 22, label: "7:00 pm"},
  { value: 23, label: "7:30 pm"},
  { value: 24, label: "8:00 pm"},
  { value: 25, label: "8:30 pm"},
];
const durations = [
  { value: 0, label: "0m"},
  { value: 1, label: "30m"},
  { value: 2, label: "1h"},
  { value: 3, label: "1h30"},
  { value: 4, label: "2h"},
  { value: 5, label: "2h30"},
  { value: 6, label: "3h"},
  { value: 7, label: "3h30"},
  { value: 8, label: "4h"},
  { value: 9, label: "4h30"},
  { value: 10, label: "5h"},
  { value: 11, label: "5h30"},
  { value: 12, label: "6h"},
];
const daysOfWeek = [
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday"
];
//#endregion

const ActivityItem = ({ course, type, pos }) => {
  
  //#region - initialization
  const { 
    hooks:    {prefs}, 
    setters:  {setPref, setCourseValue},
    getters:  {getPref}
  } = useMainContext();
  
  const code = course?.code
  //#endregion
 
  //#region - handlers
  const displayMap = useMemo(() => { 
    return getPref(code, [`sectionPreferences[${course?.sectionChoice}].${type}ActBlocks[${pos}]`])?.[0];
  }, [course])

  const handleChange = (day, target, newVal) => {
    setCourseValue(code, [[`blocks[${(type == 'unique')  ? 0 : pos}][${day}][${target}]`, newVal]])
    setPref(code, [[`sectionPreferences[${course?.sectionChoice}].${type}ActBlocks[${pos}][${day}][${target}]`, newVal]]);
    writeLocal('coursePrefs', prefs.current);
  }
  //#endregion

  //#region - html return
  return (
    <div className="activity-item">
      <h4>{course?.sections[course.sectionChoice]?.[`${type}Acts`]?.[pos].name}</h4>
     
      {daysOfWeek.map((day, index) => (
        
        <div key={day} className="activity-day">
          <input
            type="checkbox"
            checked={displayMap?.at(index)?.at(0) || false}
            onChange={(e) =>
              handleChange(index, 0, e.target.checked)
            }
          />
          <label>{day}</label>
          {displayMap?.at(index)?.at(0) && (
            <>
              <select value={displayMap?.at(index)?.at(1)} onChange={(e) => handleChange(index, 1, Number(e.target.value))}>
                {times.map(time => (
                    <option key={time.value} value={time.value}>
                        {time.label}
                    </option>
                ))}
              </select>
              <select value={displayMap?.at(index)?.at(2)} onChange={(e) => handleChange(index, 2, Number(e.target.value))}>
                {durations.map(duration => (
                    <option key={duration.value} value={duration.value}>
                        {duration.label}
                    </option>
                ))}
              </select>
            </>
          )}
        </div>
      ))}
    </div>
  );
  //#endregion

}

export default ActivityItem;