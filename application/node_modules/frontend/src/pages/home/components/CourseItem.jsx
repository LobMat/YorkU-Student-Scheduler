import { useMainContext } from "../HomePage";
import ActivityItem from "./ActivityItem";
const CourseItem = ({ course }) => {

  //#region - instantiation
  const {setCourseValue, getCourseValue} = useMainContext();
  const {code, title} = course;
  //#endregion

  //#region - handlers
  const handleSectionChange = (newSection) => {
    const [fd] = getCourseValue(code, [`sections[${newSection}]`]);

    setCourseValue(code, [
      ['sectionChoice', newSection],
      ['uniqueActs', fd.uniqueActs],
      ['uniqueActChoice', 0],
    ]);

  }
  
  const handleUniqueActChange = (newUniqueAct) => {
    setCourseValue(code, [
      ['uniqueActChoice', newUniqueAct],
    ]);
  }
  //#endregion

  //#region - html return
  return (
    <div className="course-item">
      <p className="course-code">{code}</p>
      <select onChange={(e) => handleSectionChange(Number(e.target.value))} value={course?.sectionChoice}>

        {course?.sections.map(
          (section, index) => (
            <option key={index} value={index}>
              Term {section.termChar} Section {section.sectChar}
            </option>
          ))}
      </select>

      {/* unique activity choice dropdown */}
      <p className="course-title">{title}</p>
      <select onChange={(e) => handleUniqueActChange(Number(e.target.value))} value={course?.uniqueActChoice}>
        {course?.uniqueActs.map((uniqueAct, index) => (

          <option key={index} value={index}>
            {uniqueAct.actName}
          </option>
        ))}
      </select>

      {/* activity list for this course */}
      <div className="act-list">
        {course?.sections[course.sectionChoice].commonActs.map((act, index) => (
          <ActivityItem key={index} course={course} type={"common"} pos={index} />
        ))}
        <ActivityItem course={course} type="unique" pos={course?.uniqueActChoice} />
      </div>

    </div>
  );
  //#endregion

}

export default CourseItem;