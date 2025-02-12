import InteractiveGrid from './InteractiveGrid.jsx'
import '../styles/Schedule.css'
import { useMainContext } from '../HomePage.jsx'
import { useMemo } from 'react';
function Schedule({term}) {

  const termChar = term.charAt(0);
  const {
    hooks: {courses},
    getters: {getCourseValue}
  } = useMainContext();

  const termSchedule = useMemo(() => {
    //empty array filled with -1s
    const returnArr = Array.from({ length: 5 }, () => new Array(26).fill(undefined)); 

    //iterate through all courses.
    courses?.forEach((course, courseIndex) => {
      const {code, sectionChoice} = course;
      const [sectionData] = getCourseValue(code, [`sections[${sectionChoice}]`]);
      
      //check that extracted term matches input term
      if (sectionData.termChar == termChar) {
        const [blocks] = getCourseValue(code, [`blocks`]);
        console.log(blocks)
        
        //iterate through each activity
        blocks.forEach((block) => {
          block?.times.forEach((dayInBlock, dayIndex) => {
            const [active, start, span] = dayInBlock;
            if (active && span > 0 && start+span <= 26) {
              let canPopulate = true; 

              // iterate twice, first to check if its okay to populate with this activity
              // second to actually populate with the activity
              for (let i = 0; i < 2; i++) {
                for (let j = start; j < start+span; j++) {
                  if (i == 0 && returnArr[dayIndex][j]) {
                    canPopulate = false;
                    break;
                  } else if (i == 1 && canPopulate) {
                    returnArr[dayIndex][j] = {
                      courseIndex: courseIndex, 
                      sect: sectionData.sectChar, 
                      act: block.name,
                      span: span,
                    };
                  }
                }
              }

            }
          })
        })

      }
    }) 
    return returnArr;
  }, [courses]);  


  return (
    <>
      <div className="schedule">
        <div>{term}</div>
        <div className="days">
          <p>Mon</p>
          <p>Tues</p>
          <p>Wed</p>
          <p>Thurs</p>
          <p>Fri</p>
        </div>
        <div className="times">
          <p>8:00</p>
          <p>9:00</p>
          <p>10:00</p>
          <p>11:00</p>
          <p>12:00</p>
          <p>1:00</p>
          <p>2:00</p>
          <p>3:00</p>
          <p>4:00</p>
          <p>5:00</p>
          <p>6:00</p>
          <p>7:00</p>
          <p>8:00</p>
        </div>
        <InteractiveGrid termSchedule={termSchedule}/>
      </div>
    </>
  )
}

export default Schedule

