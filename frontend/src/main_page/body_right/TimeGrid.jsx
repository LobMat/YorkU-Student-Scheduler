import { useEffect } from 'react';
import useApp from '../AppContext'
import './TimeGrid.css'



function TimeGrid() {

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const { activities } = useApp();
    let timeSlots = [] //0-25, mondayslots //26-51, tuesday days[i] => 26i + (0-26 iterative)
    useEffect (() => {
        
        {activities.map((activity, actIndex) => {
            days.map((day, dayIndex) => {
                if (activity[day].startTime) {
                    const numTime = activity[day].startTime.split(":").map(Number);
                    const startIndex = (numTime[0] - 8) * ((numTime[1] == 30) ? 2 : 1);
                    const endIndex = startIndex + Math.round((Number(activity[day].duration))/30);
                    for(let i = startIndex; i < endIndex; i++) {
                        timeSlots[dayIndex][i] = actIndex+1;
                    }
                }
            })
        })}

    }, [activities]);


    <div className = 'time-grid'>
        {timeSlots.map((daySlots) => {
            <div className = 'day'>
            {daySlots.map((numInSlot)=> {
                <div className={`${numInSlot == 0 ? time-slot : cal-activity}`} >
                    {`${numInSlot == 0 ? activities(0).name : ""}`}
                </div>
            })}
            </div>
        })}
        
    </div>
}
export default TimeGrid;

    // if (field == "startTime"){
    //     let comps = value.split(":").map(Number);
    //     if (comps[0] < 8 || comps[0] > 21) {
    //       comps[1] = 0;
    //     } else {
    //       if (0 > comps[1] && comps[1] <= 14) comps[1] = 0;
    //       else if (14 > comps[1] && comps[1] <= 44) comps[1] = 30;
    //       else {
    //         comps[1] = 0
    //         comps[0] += 1;
    //       }  
    //     }
        
    //     comps[0] = Math.min(21, Math.max(8, comps[0]));
    //     value = String(comps[0]).padStart(2, '0') + ":" +String(comps[1]).padStart(2, '0') ;

    // }

{/* <div style={{
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  borderRadius: '8px',
  textAlign: 'center',
  fontSize: '14px'
}}></div> */}