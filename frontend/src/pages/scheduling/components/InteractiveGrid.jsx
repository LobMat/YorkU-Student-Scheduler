import {act, useMemo} from "react";

import {useMainContext} from '../Scheduling';
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

// 'InteractiveGrid.jsx' : React component containing the grid part of a schedule. and the activities within it.
function InteractiveGrid({scheduleTerm}) {
  
  const {activities} = useMainContext();  // Context variables
  const blocks = [];              // array containing all divs genererated in this function.

  // Updates matrix when activities array changes.  
  const timeSlotMatrix = useMemo(() => {
    const matrix = new Array(5).fill(-1).map(()=>new Array(26).fill(-1));
    // Iterate over the array of all activities available, even deselected.
    activities?.map((activity, actNum) => {
      // Iterate through each day of the week. 
      days.map((day, dayNum) => { 
        // Check if this day is selected for this activity, then populate the grid from the startTime.
        const currentBlock = activity[day]; 
        if (currentBlock?.selected) {
          for (let i = currentBlock.startTime; i < +currentBlock.startTime + +currentBlock.duration; i++) {
            (i < 26) && (matrix[dayNum][i] = actNum);
          }
        }
      }) 
    })
    return matrix;
  }, [activities]);  
  
  // Iterate through each day of the week (columns of the grid)
  for (let day = 0; day < 5; day++) {
    let slot = 0; 
    while (slot < 26) {
      
      // get the activity on this day at this time, if there is one.
      const actIndex = timeSlotMatrix[day][slot];
      const activity = (actIndex == -1) ? null : activities[actIndex];

      // Check that activity exists and that the term is in is the same as the term that this grid is for.
      if (activity && activity.atts.term == scheduleTerm) {
        blocks.push(
          <div key={`${day}-${slot}`} className="activity-slot" 
            style={{  /* set style for this specific activity */
              borderColor: '#80bfd4',
              color: 'black',
              backgroundColor: 'lightblue',
              gridColumn: `${day+1}`,
              gridRow: `${slot+1}`,
              gridRowEnd: `span ${activity[days[day]]?.duration}`,
            }}
          >
            {activity.actName}
          </div>
        );
        slot += Math.max(1, activity[days[day]]?.duration); //only create this activity block once
        } else {
          blocks.push(
            <div key={`${day}-${slot}`} className="time-slot"
                style={{
                  gridColumn: `${day+1}`,
                  gridRow: `${slot+1}`,
                }}
            />
          ) 
        slot+=1; //increment by 1.
        }
      }
    }

    // Return the list of generated arrays, wrapped in a div used for styling.
    return (
        <div className='time-grid'> 
            {blocks} 
        </div>
    )
}

export default InteractiveGrid;