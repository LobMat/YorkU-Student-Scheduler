import { useMemo } from "react";
import {useMainContext} from '../HomePage.jsx'
import { writeLocal } from "../../../logic/BrowserStorage.js";
const colours = [
  {bg: '75c5ff', border: '0094ff'},
  {bg: '7cff89', border: '3aa544'},
  {bg: 'ffa347', border: 'a56a2e'},
  {bg: 'ffbac9', border: 'ff6e85'},
  {bg: 'd3baff', border: 'b184ff'},
  {bg: '75c5ff', border: '0094ff'},
  {bg: '7cff89', border: '3aa544'},
  {bg: 'ffa347', border: 'a56a2e'},
  {bg: 'ffbac9', border: 'ff6e85'},
  {bg: 'd3baff', border: 'b184ff'},
  {bg: '75c5ff', border: '0094ff'},
  {bg: '7cff89', border: '3aa544'},
  {bg: 'ffa347', border: 'a56a2e'},
  {bg: 'ffbac9', border: 'ff6e85'},
  {bg: 'd3baff', border: 'b184ff'},
];

// 'InteractiveGrid.jsx' : React component containing the grid part of a schedule. and the activities within it.
function InteractiveGrid({termSchedule, bool}) {
  
  // context variables
  const { 
    hooks: {courses, prefs, hoveredCourse, customActivityList},
    getters: {getPref},
    setters: {setCourseValue, setPref}
  } = useMainContext(); 

  // this memoized array updates when changes are made to the course list (set the block positions) or the hovered block changes (to set the mouse event listeners). 
  const displayBlocks = useMemo(() => {
    
    const tsm = []; // returned array, initially empty.

    // iterate through each day of the week
    for (let day = 0; day < 5; day++) {

      //iterate through each slot on the grid (0-25 ; 8:00am to 8:30pm)
      let slot = 0;
      while(slot < 26) {
        const savedSlot = slot; // current slot is preserved here for passing into mouse event handlers -- otherwise 26 will be used.
        
        // if there is an activity at this slot and it's span is not zero, add a block for this activity
        if (termSchedule[day][slot] && termSchedule[day][slot].span > 0) {
          if (termSchedule[day][slot].isCustom) {
            const {name,  span} = termSchedule[day][slot];
            tsm.push(
              <div key={`${day}-${slot}`} className="custom-slot" 
              style={{  
                /* style for this specific activity */
                borderColor: `#${colours[slot].border}`,
                backgroundColor: `#${colours[slot].bg}`,
                color: `black`,
                fontSize: `12px`,
                gridColumn: `${day+1}`,
                gridRow: `${slot+1}`,
                gridRowEnd: `span ${span}`,
              }}
              >
                {name}
              </div>
            )
          } else {
            //stored data for the course at this position
            const {courseIndex, sect, act, span} = termSchedule[day][slot];

            // create and push activity object
            tsm.push(
              <div key={`${day}-${slot}`} className="activity-slot" 
              style={{  
                /* style for this specific activity */
                borderColor: `#${colours[courseIndex].border}`,
                backgroundColor: `#${colours[courseIndex].bg}`,
                color: `black`,
                fontSize: `12px`,
                gridColumn: `${day+1}`,
                gridRow: `${slot+1}`,
                gridRowEnd: `span ${span}`,
              }}

              /* handle right-click event on this component when it represents the hovered activity */
              onContextMenu={
                (e)=>{
                  if (bool) {
                    e.preventDefault()
                    handleRightClick(day, savedSlot);
                  }
                }
              }
              >
                {(span > 1) ? <>{courses[courseIndex].code}<br /></> : <></>}
                {(span > 2) ? <>Section {sect}<br /></> : <></>}
                {act}
              </div>
            )
            } 
            slot += termSchedule[day][slot].span;
          }
        // otherwise, add an empty slot
        else {
          tsm.push(
            <div key={`${day}-${slot}`} className="time-slot"
            style={{
              gridColumn: `${day+1}`,
              gridRow: `${slot+1}`,
              gridRowEnd: `span 1`,
            }}
            onMouseDown={(event)=>{if(bool) handleMouseDown(event, day, savedSlot)}}
            onMouseUp={(event)=>{if(bool) handleMouseUp(event, day, savedSlot+1)}}
          />
          )
          slot += 1;
        }
      }
    }
    
    return tsm;
  }, [hoveredCourse, termSchedule]);  

  // #region - handle grid interaction while in overlay mode hovering 
  
  var selectedDayColumn = 0;
  var selectedStartBlock = 0;
  
  const handleMouseDown = (event,day, block) => {
    if (event.button === 0) {
      event.preventDefault();
      selectedDayColumn = day;
      selectedStartBlock = block;  
    }
  }
  
  const handleMouseUp = (event, day, block) => {
    if (event.button === 0 && day === selectedDayColumn && block > selectedStartBlock) {
      event.preventDefault();
      const {code, sectionChoice, type, pos} = hoveredCourse;
      
      setPref(code, [[`sectionPreferences[${sectionChoice}].${type}ActBlocks[${pos}].times[${day}]`, [true, selectedStartBlock, block-selectedStartBlock]]]);
      writeLocal('coursePrefs', prefs.current);

      const [fp] = getPref(code, [`sectionPreferences[${sectionChoice}`]);
      setCourseValue(code, [['blocks', fp.commonActBlocks.concat(fp.uniqueActBlocks[fp.uniqueActChoice])]]);
    }
  }
  
  const handleRightClick = (day, slot) => {

    const {code, sectionChoice, type, pos} = hoveredCourse;
    const [today] = getPref(code, [`sectionPreferences[${sectionChoice}].${type}ActBlocks[${pos}].times[${day}]`]);
   
    for (let i = today[1]; i < today[1] + today[2]; i++) {
      if (slot == i) {
        setPref(code, [[`sectionPreferences[${sectionChoice}].${type}ActBlocks[${pos}].times[${day}][0]`, false]]);
        writeLocal('coursePrefs', prefs.current);
        const [fp] = getPref(code, [`sectionPreferences[${sectionChoice}`]);
        setCourseValue(code, [['blocks', fp.commonActBlocks.concat(fp.uniqueActBlocks[fp.uniqueActChoice])]]);
        break;
      }
    }



  }
  // #endregion

  // Return the list of generated blocks, wrapped in a div used for styling.
  return (
      <div className='time-grid'> 
          {displayBlocks} 
      </div>
  )
}

export default InteractiveGrid;

