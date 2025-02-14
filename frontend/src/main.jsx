import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './page_scheduler/index.css'
import Header from './page_scheduler/Header.jsx'
import Schedule from './page_scheduler/Schedule.jsx'
import AddCourse from './page_scheduler/AddCourse.jsx'
function Main() {

  const [showTextbox, setShowTextbox] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [section, setSection] = useState('');
  const [courses, setCourses] = useState([]);
  const [type, setType] = useState('')
  const [weekday, setWeekday] = useState('');
  const [startNum, setStartNum] = useState(0)
  const [term, setTerm] = useState('')
  const [endNum, setEndNum] = useState(0)
  const changeCourseName = (e) => setCourseName(e.target.value);
  const changeSection = (e) => setSection(e.target.value);
  const changeType = (e) => setType(e.target.value);
  const changeTerm = (e) => setTerm(e.target.value);
  const changeWeekday = (e) => setWeekday(e.target.value);
  const timeToValue = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + (minutes / 60);
  };
  const changeStartTime = (e) => {
    setStartTime(e.target.value);
    setStartNum(timeToValue(e.target.value))
  }
  const changeEndTime = (e) => {
    setEndTime(e.target.value)
    setEndNum(timeToValue(e.target.value))
  };

  const addCourse = () => {
    if (!courseName || !section || !startTime || !endTime || !type || !weekday || !term) {
      alert("Please fill out all fields.");
      return;
    }

    /* each course is added to the courses array. you can access attributes of a course 
    by referencing a specific attribute. ex: courses[0].name, courses[0].startTime etc.
    */
    const newCourse = { name: courseName, section, type, weekday, startTime, endTime, startNum, endNum, term };

    setCourses(prevCourses => {
      const updatedCourses = [...prevCourses, newCourse];
      console.log("Updated courses:", updatedCourses); // Logs correctly
      console.log("courses: ", courses)
      return updatedCourses;
    });

    setCourseName("");
    setSection("");
    setStartTime("");
    setEndTime("");
    setType("");
    setWeekday("");
    setTerm("")
    setStartNum(0)
    setEndNum(0);
    setShowTextbox(false);
  };

  return (
    <>
      <StrictMode>
        <Header />
        <div id='sect1'>

          <div style={styles.container}>
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
              onClick={() => setShowTextbox(!showTextbox)}
            >
              Add Course
            </button>


            {!showTextbox && <div style={styles.coursesContainer}>
              {courses.map((course, index) => (
                <div key={index} style={styles.courseItem}>
                  <strong>{course.name}</strong> {course.section}
                  <p> {course.type}</p>
                  {course.startTime} - {course.endTime}
                </div>
              ))}
            </div>
            }
            {showTextbox && (
              <>
                <div style={styles.textboxContainer}>
                  <input style={styles.textbox} type="text" placeholder="Course name" value={courseName} onChange={changeCourseName} />
                </div>
                <div style={styles.timeContainer}>
                  <div style={styles.textboxContainer}>
                    <input style={styles.smallbox} type="text" placeholder="Section" value={section} onChange={changeSection} />
                    <select style={styles.term} value={term} onChange={changeTerm}>
                      <option value="">Term:</option>
                      <option value="FALL">Fall</option>
                      <option value="WINTER">Winter</option>
                    </select>
                  </div>

                </div>
                <div style={styles.timeContainer}>
                  <select style={styles.dropdown} value={weekday} onChange={changeWeekday}>
                    <option value="">Day:</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                  <select style={styles.dropdown} value={type} onChange={changeType}>
                    <option value="">Type:</option>
                    <option value="Lecture">Lecture</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Lab">Lab</option>
                  </select>
                </div>

                <div style={styles.timeContainer}>
                  <select style={styles.dropdown} value={startTime} onChange={changeStartTime}>
                    <option value="">Start Time</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="08:30">8:30 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="09:30">9:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="16:30">4:30 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                  <select style={styles.dropdown} value={endTime} onChange={changeEndTime}>
                    <option value="">End Time</option>
                    <option value="08:30">8:30 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="09:30">9:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="16:30">4:30 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>

                <button
                  style={styles.button}
                  onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                  onClick={addCourse}
                >
                  Confirm!
                </button>
              </>
            )}


          </div>







        </div>
        <div id='sect2'>
          <Schedule term="FALL" courses={courses} />
          <Schedule term="WINTER" courses={courses} />
        </div>
      </StrictMode>
    </>
  );
}
export default Main;




const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  button: {
    marginTop: '15px',
    backgroundColor: '#F24255',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#b5313f',
  },
  textboxContainer: {
    marginTop: '15px',
  },
  textbox: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '250px',
  },
  smallbox: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '70px',
  },
  dropdown: {
    margin: '15px',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '125px',
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  coursesContainer: {
    marginTop: '20px',
  },
  courseItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  term: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '90px',
  },
};
const root = createRoot(document.getElementById('root'));
root.render(<Main />);

