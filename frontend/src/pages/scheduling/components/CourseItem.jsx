//#region - imports
import ActivityItem from "./ActivityItem";
import { useMainContext } from '../Scheduling'
//#endregion

const CourseItem = ({ course }) => {
  //#region - Initialization
  const {
    hooks: { prefs },
    setters: { setPref, setCourseValue, setActValue },
    getters: { getPref, getCourseValue }
  } = useMainContext();

  const { code, title } = course;
  //#endregion


  //#region - selection handlers 

  // *** HANDLE COURSE SECTION CHANGE *** //
  const handleSectionChange = (newSection) => {
    // load preferences (fp) and data (fd) for the new section
    const [fp] = getPref(code, [`sectionPreferences[${newSect}]`]);
    const [fd] = getCourseValue(code, [`sections[${newSect}]`]);

    // course hook update for section  
    setCourseValue(code, [
      ['sectionChoice', newSection],          // new section dropdown selection
      ['uniqueActs', fd.uniqueActs],       // unique activity dropdown options 
      ['uniqueActChoice', fp.uniqueActChoice]   // unique activity dropdown initial selection
    ]);

    // activity hook update for section
    setActValue(code, [
      ['sectChar', fd.sect],             // character representing the section (i.e 'M', 'N', 'X', 'Z')
      ['termChar', fd.term],             // character representing the section's term (i.e 'W', 'F') 
      ['blocks', fp.commonActBlocks.concat(fp.uniqueActBlocks[fp.uniqueActChoice])]
    ]);

    // update preference ref hook
    setPref(code, [
      ['sectionChoice', newSection]
    ]);

    // write to local storage
    localStorage.setItem('coursePrefs', JSON.stringify(prefs))
  }


  // *** HANDLE SECTION UNIQUE ACTIVITY SELECTION *** //
  const handleUniqueActChange = (newUniqueActivity) => {
    // load preferences (fp) for the currently selected section.
    const [fp] = getPref(code, [`sectionPreferences[${course?.sectionChoice}]`]);

    // course hook update for new unique activity
    setCourseValue(code, [
      ['uniqueActChoice', newUniqueActivity]
    ]);

    // activity hook update for unique activity
    setActValue(code, [
      ['blocks', fp.commonActBlocks.concat(fp.uniqueActBlocks[newUniqueActivity])]
    ]);

    // preference reference update for unique activity
    setPref(code, [
      [`sectionPreferences[${course?.sectionChoice}].uniqueActChoice`, newAct]
    ]);

    // write prefs to local storage
    localStorage.setItem('coursePrefs', JSON.stringify(prefs))
  }
  //#endregion

  //#region - html return
  return (
    //tmrw - reformat this so that we dont depend so hard on tags. only highest class should have a tag name.
    <div className="course-item">
      <p className="course-code">{code}</p>
      <select onChange={(e) => handleSectionChange(Number(e.target.value))} value={course?.sectionChoice}>

        {course?.sections.map(
          (section, index) => (
            <option key={index} value={index}>
              Term {section.term} Section {section.sect}
            </option>
          ))}
      </select>

      {/* unique activity choice dropdown */}
      <p className="course-title">{title}</p>
      <select onChange={(e) => handleUniqueActChange(Number(e.target.value))} value={course?.uniqueActChoice}>
        {course?.uniqueActs.map((uniqueAct, index) => (

          <option key={index} value={index}>
            {uniqueAct.name}
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

};

export default CourseItem;