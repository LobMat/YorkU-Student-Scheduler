
//#region - imports
import {useMainContext} from '../HomePage'
import dropdown from '../../../assets/dropdown.svg';
import pointer from '../../../assets/pointer.svg';
import close from '../../../assets/close.svg'
import { useAppContext } from '../../../App';
import '../styles/Overlay.css'
import { useMemo, useState} from "react";
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

//activity name and two buttons. 
const ActivityItem = ({ course, type, pos }) => {
  //#region - instantiation
  const {sectionChoice} = course ?? {};
  const { setters:  {setHoveredCourse}} = useMainContext();
  const {overlay: {setOverlayState}} = useAppContext();
  const [overlayIsActive, setOverlayIsActiveLocal] = useState(false);
  
  const pointerClick = () => {
    if (course?.sections[sectionChoice]?.termChar == 'F') {
      setOverlayState(2);
    } else {
      setOverlayState(3);
    }
    setHoveredCourse(
      {
        code: course?.code, 
        sectionChoice: course?.sectionChoice,
        type: type,
        pos: pos,
      }
    );
    //create popup.
  }

  const dropdownClick = () => {
    setOverlayIsActiveLocal(1);
    setOverlayState(1);
  }
  
  const closePopUp =() => {
    setOverlayIsActiveLocal(0);
    setOverlayState(0);
    setHoveredCourse(undefined);
  }

  //#endregion

  return (
    <div className="activity-item">
      <h4>{course?.sections[sectionChoice]?.[`${type}Acts`]?.[pos]?.actName}</h4>
      <button onClick={()=>dropdownClick()}><img src={dropdown} className="dropdown-button"/></button>
      <button onClick={()=>pointerClick()}><img src={pointer} className="drag-button" /></button>
      {(overlayIsActive == 1) ? <DropdownPopup course={course} type={type} pos={pos} cmd={()=>closePopUp()}/> :  <></>}
    </div>
  
  );
}
export default ActivityItem;

// this component holds the popup which gives the user drop-down options for setting course times
const DropdownPopup = ({course, type, pos, cmd}) => {

   //#region - initialization
   const { 
    hooks:    {prefs, courses}, 
    setters:  {setPref, setCourseValue},
    getters:  {getPref, getCourseValue}
  } = useMainContext();
  
  const code = course?.code
  //#endregion
  const [blockPos] = (type == 'unique') ? [pos] : getCourseValue(code, [`sections[${course.sectionChoice}].commonActs.length`]);
 
  //#region - handlers
  const displayMap = useMemo(() => { 
    return getPref(code, [`sectionPreferences[${course?.sectionChoice}].${type}ActBlocks[${pos}]`])?.[0]?.times;
  }, [course])

  const handleChange = (day, target, newVal) => {
    
    setPref(code, [[`sectionPreferences[${course?.sectionChoice}].${type}ActBlocks[${pos}].times[${day}][${target}]`, newVal]]);
    const [fp] = getPref(code, [`sectionPreferences[${course.sectionChoice}]`]);
    setCourseValue(code, [['blocks', fp.commonActBlocks.concat(fp.uniqueActBlocks[fp.uniqueActChoice])]])
    writeLocal('coursePrefs', prefs.current);
  }
  //#endregion

  //#region - html return
  return (
    <div className="dropdown-popup">
      <div className="popupHeader">
      <h4>{course?.sections[course.sectionChoice]?.[`${type}Acts`]?.[pos]?.actName}</h4><button onClick={()=>cmd()}><img src={close} className="add-button"/></button>
      </div>
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