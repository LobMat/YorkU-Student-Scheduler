import './InteractiveGrid.css'
import { useEffect } from "react";


function InteractiveGrid({ term, courses }) {
  useEffect(() => {
    const gridCells = document.querySelectorAll(".igrid div");

    gridCells.forEach(cell => {
      const cellDay = cell.getAttribute("data-day");
      const cellValue = parseFloat(cell.getAttribute("data-value"));


      // Reset previous colors
      cell.style.backgroundColor = "";
      courses.forEach(course => {
        console.log("course term: ", course.term)
        console.log("calendar term: ", term)
        if (course.weekday === cellDay && course.term === term && course.startNum <= cellValue && course.endNum > cellValue) {
          cell.style.backgroundColor = "#F24255"; // Color for occupied slots
        }
      });
    });
  }, [courses, term]);





  return (
    <>
      <div className="igrid">
        <div className="igrid-col">
          <div data-time="08:00" data-value="8.0" data-day="Monday"></div>
          <div data-time="08:30" data-value="8.5" data-day="Monday"></div>
          <div data-time="09:00" data-value="9.0" data-day="Monday"></div>
          <div data-time="09:30" data-value="9.5" data-day="Monday"></div>
          <div data-time="10:00" data-value="10.0" data-day="Monday"></div>
          <div data-time="10:30" data-value="10.5" data-day="Monday"></div>
          <div data-time="11:00" data-value="11.0" data-day="Monday"></div>
          <div data-time="11:30" data-value="11.5" data-day="Monday"></div>
          <div data-time="12:00" data-value="12.0" data-day="Monday"></div>
          <div data-time="12:30" data-value="12.5" data-day="Monday"></div>
          <div data-time="13:00" data-value="13.0" data-day="Monday"></div>
          <div data-time="13:30" data-value="13.5" data-day="Monday"></div>
          <div data-time="14:00" data-value="14.0" data-day="Monday"></div>
          <div data-time="14:30" data-value="14.5" data-day="Monday"></div>
          <div data-time="15:00" data-value="15.0" data-day="Monday"></div>
          <div data-time="15:30" data-value="15.5" data-day="Monday"></div>
          <div data-time="16:00" data-value="16.0" data-day="Monday"></div>
          <div data-time="16:30" data-value="16.5" data-day="Monday"></div>
          <div data-time="17:00" data-value="17.0" data-day="Monday"></div>
          <div data-time="17:30" data-value="17.5" data-day="Monday"></div>
          <div data-time="18:00" data-value="18.0" data-day="Monday"></div>
          <div data-time="18:30" data-value="18.5" data-day="Monday"></div>
          <div data-time="19:00" data-value="19.0" data-day="Monday"></div>
          <div data-time="19:30" data-value="19.5" data-day="Monday"></div>
          <div data-time="20:00" data-value="20.0" data-day="Monday"></div>
          <div data-time="20:30" data-value="20.5" data-day="Monday"></div>
        </div>
        <div className="igrid-col">
          <div data-time="08:00" data-value="8.0" data-day="Tuesday"></div>
          <div data-time="08:30" data-value="8.5" data-day="Tuesday"></div>
          <div data-time="09:00" data-value="9.0" data-day="Tuesday"></div>
          <div data-time="09:30" data-value="9.5" data-day="Tuesday"></div>
          <div data-time="10:00" data-value="10.0" data-day="Tuesday"></div>
          <div data-time="10:30" data-value="10.5" data-day="Tuesday"></div>
          <div data-time="11:00" data-value="11.0" data-day="Tuesday"></div>
          <div data-time="11:30" data-value="11.5" data-day="Tuesday"></div>
          <div data-time="12:00" data-value="12.0" data-day="Tuesday"></div>
          <div data-time="12:30" data-value="12.5" data-day="Tuesday"></div>
          <div data-time="13:00" data-value="13.0" data-day="Tuesday"></div>
          <div data-time="13:30" data-value="13.5" data-day="Tuesday"></div>
          <div data-time="14:00" data-value="14.0" data-day="Tuesday"></div>
          <div data-time="14:30" data-value="14.5" data-day="Tuesday"></div>
          <div data-time="15:00" data-value="15.0" data-day="Tuesday"></div>
          <div data-time="15:30" data-value="15.5" data-day="Tuesday"></div>
          <div data-time="16:00" data-value="16.0" data-day="Tuesday"></div>
          <div data-time="16:30" data-value="16.5" data-day="Tuesday"></div>
          <div data-time="17:00" data-value="17.0" data-day="Tuesday"></div>
          <div data-time="17:30" data-value="17.5" data-day="Tuesday"></div>
          <div data-time="18:00" data-value="18.0" data-day="Tuesday"></div>
          <div data-time="18:30" data-value="18.5" data-day="Tuesday"></div>
          <div data-time="19:00" data-value="19.0" data-day="Tuesday"></div>
          <div data-time="19:30" data-value="19.5" data-day="Tuesday"></div>
          <div data-time="20:00" data-value="20.0" data-day="Tuesday"></div>
          <div data-time="20:30" data-value="20.5" data-day="Tuesday"></div>
        </div>
        <div className="igrid-col">
          <div data-time="08:00" data-value="8.0" data-day="Wednesday"></div>
          <div data-time="08:30" data-value="8.5" data-day="Wednesday"></div>
          <div data-time="09:00" data-value="9.0" data-day="Wednesday"></div>
          <div data-time="09:30" data-value="9.5" data-day="Wednesday"></div>
          <div data-time="10:00" data-value="10.0" data-day="Wednesday"></div>
          <div data-time="10:30" data-value="10.5" data-day="Wednesday"></div>
          <div data-time="11:00" data-value="11.0" data-day="Wednesday"></div>
          <div data-time="11:30" data-value="11.5" data-day="Wednesday"></div>
          <div data-time="12:00" data-value="12.0" data-day="Wednesday"></div>
          <div data-time="12:30" data-value="12.5" data-day="Wednesday"></div>
          <div data-time="13:00" data-value="13.0" data-day="Wednesday"></div>
          <div data-time="13:30" data-value="13.5" data-day="Wednesday"></div>
          <div data-time="14:00" data-value="14.0" data-day="Wednesday"></div>
          <div data-time="14:30" data-value="14.5" data-day="Wednesday"></div>
          <div data-time="15:00" data-value="15.0" data-day="Wednesday"></div>
          <div data-time="15:30" data-value="15.5" data-day="Wednesday"></div>
          <div data-time="16:00" data-value="16.0" data-day="Wednesday"></div>
          <div data-time="16:30" data-value="16.5" data-day="Wednesday"></div>
          <div data-time="17:00" data-value="17.0" data-day="Wednesday"></div>
          <div data-time="17:30" data-value="17.5" data-day="Wednesday"></div>
          <div data-time="18:00" data-value="18.0" data-day="Wednesday"></div>
          <div data-time="18:30" data-value="18.5" data-day="Wednesday"></div>
          <div data-time="19:00" data-value="19.0" data-day="Wednesday"></div>
          <div data-time="19:30" data-value="19.5" data-day="Wednesday"></div>
          <div data-time="20:00" data-value="20.0" data-day="Wednesday"></div>
          <div data-time="20:30" data-value="20.5" data-day="Wednesday"></div>
        </div>
        <div className="igrid-col">
          <div data-time="08:00" data-value="8.0" data-day="Thursday"></div>
          <div data-time="08:30" data-value="8.5" data-day="Thursday"></div>
          <div data-time="09:00" data-value="9.0" data-day="Thursday"></div>
          <div data-time="09:30" data-value="9.5" data-day="Thursday"></div>
          <div data-time="10:00" data-value="10.0" data-day="Thursday"></div>
          <div data-time="10:30" data-value="10.5" data-day="Thursday"></div>
          <div data-time="11:00" data-value="11.0" data-day="Thursday"></div>
          <div data-time="11:30" data-value="11.5" data-day="Thursday"></div>
          <div data-time="12:00" data-value="12.0" data-day="Thursday"></div>
          <div data-time="12:30" data-value="12.5" data-day="Thursday"></div>
          <div data-time="13:00" data-value="13.0" data-day="Thursday"></div>
          <div data-time="13:30" data-value="13.5" data-day="Thursday"></div>
          <div data-time="14:00" data-value="14.0" data-day="Thursday"></div>
          <div data-time="14:30" data-value="14.5" data-day="Thursday"></div>
          <div data-time="15:00" data-value="15.0" data-day="Thursday"></div>
          <div data-time="15:30" data-value="15.5" data-day="Thursday"></div>
          <div data-time="16:00" data-value="16.0" data-day="Thursday"></div>
          <div data-time="16:30" data-value="16.5" data-day="Thursday"></div>
          <div data-time="17:00" data-value="17.0" data-day="Thursday"></div>
          <div data-time="17:30" data-value="17.5" data-day="Thursday"></div>
          <div data-time="18:00" data-value="18.0" data-day="Thursday"></div>
          <div data-time="18:30" data-value="18.5" data-day="Thursday"></div>
          <div data-time="19:00" data-value="19.0" data-day="Thursday"></div>
          <div data-time="19:30" data-value="19.5" data-day="Thursday"></div>
          <div data-time="20:00" data-value="20.0" data-day="Thursday"></div>
          <div data-time="20:30" data-value="20.5" data-day="Thursday"></div>
        </div>
        <div className="igrid-col">
          <div data-time="08:00" data-value="8.0" data-day="Friday"></div>
          <div data-time="08:30" data-value="8.5" data-day="Friday"></div>
          <div data-time="09:00" data-value="9.0" data-day="Friday"></div>
          <div data-time="09:30" data-value="9.5" data-day="Friday"></div>
          <div data-time="10:00" data-value="10.0" data-day="Friday"></div>
          <div data-time="10:30" data-value="10.5" data-day="Friday"></div>
          <div data-time="11:00" data-value="11.0" data-day="Friday"></div>
          <div data-time="11:30" data-value="11.5" data-day="Friday"></div>
          <div data-time="12:00" data-value="12.0" data-day="Friday"></div>
          <div data-time="12:30" data-value="12.5" data-day="Friday"></div>
          <div data-time="13:00" data-value="13.0" data-day="Friday"></div>
          <div data-time="13:30" data-value="13.5" data-day="Friday"></div>
          <div data-time="14:00" data-value="14.0" data-day="Friday"></div>
          <div data-time="14:30" data-value="14.5" data-day="Friday"></div>
          <div data-time="15:00" data-value="15.0" data-day="Friday"></div>
          <div data-time="15:30" data-value="15.5" data-day="Friday"></div>
          <div data-time="16:00" data-value="16.0" data-day="Friday"></div>
          <div data-time="16:30" data-value="16.5" data-day="Friday"></div>
          <div data-time="17:00" data-value="17.0" data-day="Friday"></div>
          <div data-time="17:30" data-value="17.5" data-day="Friday"></div>
          <div data-time="18:00" data-value="18.0" data-day="Friday"></div>
          <div data-time="18:30" data-value="18.5" data-day="Friday"></div>
          <div data-time="19:00" data-value="19.0" data-day="Friday"></div>
          <div data-time="19:30" data-value="19.5" data-day="Friday"></div>
          <div data-time="20:00" data-value="20.0" data-day="Friday"></div>
          <div data-time="20:30" data-value="20.5" data-day="Friday"></div>
        </div>
      </div>
    </>
  )
}

export default InteractiveGrid
