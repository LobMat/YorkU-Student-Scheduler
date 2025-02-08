import { useMemo, useRef } from "react";
import {useMainContext} from '../HomePage.jsx'
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

// 'InteractiveGrid.jsx' : React component containing the grid part of a schedule. and the activities within it.
const activityAt = (courses, term, day, time) => {
  for (let course of courses) {
    if (course?.sections[course?.sectionChoice].termChar === term) {
      for (let block of course?.blocks) {
        if (block?.[day]?.[0] && block?.[day]?.[1] === time) {
          return { code: course?.code, span: block?.[day][2] }; // This will exit the function early
        }
      }
    }
  }
  return undefined; // This will only be reached if no match is found
}
function InteractiveGrid({scheduleTerm}) {
  
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
        let dispInfo = activityAt(courses, scheduleTerm, i, j);
         

        if (!dispInfo || dispInfo.span == 0) {
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
        } else {
          tsm.push(
            <div key={`${i}-${j}`} className="activity-slot" 
            style={{  /* set style for this specific activity */
              borderColor: '#80bfd4',
              color: 'black',
              backgroundColor: 'lightblue',
              gridColumn: `${i+1}`,
              gridRow: `${j+1}`,
              gridRowEnd: `span ${dispInfo.span}`,
            }}
            >
              {dispInfo.code}
            </div>
          )
           j+= dispInfo.span;

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