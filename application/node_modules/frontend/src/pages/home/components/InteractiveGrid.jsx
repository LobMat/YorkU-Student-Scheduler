import { useMemo, useRef } from "react";
import {useMainContext} from '../HomePage.jsx'
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
function InteractiveGrid({termSchedule}) {
  
  const { hooks: {courses},
          getters: {getCourseValue}
        } = useMainContext();  // Context variables
         // array containing all divs genererated in this function.

  //#region - course block grid 
  // Updates matrix when activities array changes.  
  const displayBlocks = useMemo(() => {
    
    const tsm = [];

    for (let i = 0; i < 5; i++) {


      let j = 0;
      while(j < 26) {
        
        if (termSchedule[i][j] && termSchedule[i][j].span > 0) {
          const {courseIndex, sect, act, span} = termSchedule[i][j];
          // push activity object
          tsm.push(
            <div key={`${i}-${j}`} className="activity-slot" 
            style={{  /* set style for this specific activity */
              borderColor: `#${colours[courseIndex].border}`,
              backgroundColor: `#${colours[courseIndex].bg}`,
              color: `black`,
              fontSize: `${(span < 3)?10:12}px`,
              gridColumn: `${i+1}`,
              gridRow: `${j+1}`,
              gridRowEnd: `span ${span}`,
            }}
            >
              {courses[courseIndex].code}<br />
              Section {sect}<br />
              {act}
            </div>
          )
          j+= span;
        } else {
          tsm.push(
            <div key={`${i}-${j}`} className="time-slot"
            style={{
              gridColumn: `${i+1}`,
              gridRow: `${j+1}`,
              gridRowEnd: `span 1`,
            }}
          />
          )
          j+= 1;
        }
      }
    }
    
    return tsm;
  }, [courses]);  
  
  // Iterate through each day of the week (columns of the grid)


    // Return the list of generated arrays, wrapped in a div used for styling.
    return (
        <div className='time-grid'> 
            {displayBlocks} 
        </div>
    )
}

export default InteractiveGrid;