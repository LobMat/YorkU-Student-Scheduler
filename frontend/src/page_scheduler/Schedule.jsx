import { useState } from 'react'
import './Schedule.css'

function Schedule() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="schedule">
        <div></div>
        <div className="days">
            <p>Mon</p>
            <p>Tues</p>
            <p>Wed</p>
            <p>Thurs</p>
            <p>Fri</p>
        </div>
      </div>
      
    </>
  )
}

export default Schedule
