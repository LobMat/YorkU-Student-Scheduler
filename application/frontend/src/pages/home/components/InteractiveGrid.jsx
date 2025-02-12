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
const activityAt = (courses, term, day, time) => {
  let activo = undefined;
  courses.forEach((course, index) => {
    if (course?.sections[course?.sectionChoice].termChar === term) {
      for (let block of course?.blocks) {
        if (block?.times?.[day]?.[0] && block?.times?.[day]?.[1] === time) {
          console.log(course.name)
          activo = ({ 
            code: course?.code,
            index: index, 
            sect: course?.sections[course?.sectionChoice].sectChar, 
            actName: block?.name, 
            span: block?.times?.[day][2] 
          });
        } 
      }
    }
  })
  return activo; // This will only be reached if no match is found
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
          const fontSize = (dispInfo.span < 3) ? '10px' : '12px'; 
          tsm.push(
            <div key={`${i}-${j}`} className="activity-slot" 
            style={{  /* set style for this specific activity */
              borderColor: `#${colours[dispInfo.index].border}`,
              color: 'black',
              fontSize: `${fontSize}`,
              backgroundColor: `#${colours[dispInfo.index].bg}`,
              gridColumn: `${i+1}`,
              gridRow: `${j+1}`,
              gridRowEnd: `span ${dispInfo.span}`,
            }}
            >
              {dispInfo.code}<br />
              Section {dispInfo.sect}<br />
              {dispInfo.actName}
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