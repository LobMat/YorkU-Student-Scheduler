import InteractiveGrid from './InteractiveGrid.jsx'
import '../styles/Schedule.css'

function Schedule({term}) {
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
        <InteractiveGrid scheduleTerm={term.charAt(0)}/>
      </div>
    </>
  )
}

export default Schedule
