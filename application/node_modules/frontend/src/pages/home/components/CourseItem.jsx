import { writeLocal } from "../../../logic/BrowserStorage";
import { useMainContext } from "../HomePage";
import ActivityItem from "./ActivityItem";
const CourseItem = ({ course }) => {

  //#region - instantiation
  const {
    hooks: { prefs },
    setters: { setPref, setCourseValue },
    getters: { getPref, getCourseValue }
  } = useMainContext();

  const {code, title} = course;
  //#endregion

  //#region - handlers
  
  // *** HANDLE COURSE SECTION CHANGE *** //
  const handleSectionChange = (newSection) => {
    // load preferences (fp) and data (fd) for the new section
    const [fp] = getPref(code, [`sectionPreferences[${newSection}]`]);
    const [fd] = getCourseValue(code, [`sections[${newSection}]`]);

    // course hook update for section  
    setCourseValue(code, [
      ['sectionChoice', newSection],          // new section dropdown selection
      ['uniqueActs', fd.uniqueActs],       // unique activity dropdown options 
      ['uniqueActChoice', fp.uniqueActChoice],   // unique activity dropdown initial selection
      ['blocks', fp.commonActBlocks.concat(fp.uniqueActBlocks[fp.uniqueActChoice])]
    ]);

    // update preference ref hook
    setPref(code, [
      ['sectionChoice', newSection]
    ]);

    // write to local storage
    writeLocal('coursePrefs', prefs.current);
  }
  
  // *** HANDLE SECTION UNIQUE ACTIVITY SELECTION *** //
  const handleUniqueActChange = (newUniqueActivity) => {
    // load preferences (fp) for the currently selected section.
    const [fp] = getPref(code, [`sectionPreferences[${course?.sectionChoice}]`]);

    // course hook update for new unique activity
    setCourseValue(code, [
      ['uniqueActChoice', newUniqueActivity],
      ['blocks', fp.commonActBlocks.concat(fp.uniqueActBlocks[newUniqueActivity])]
    ]);


    // preference reference update for unique activity
    setPref(code, [
      [`sectionPreferences[${course?.sectionChoice}].uniqueActChoice`, newUniqueActivity]
    ]);

    // write prefs to local storage
    writeLocal('coursePrefs', prefs.current);
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