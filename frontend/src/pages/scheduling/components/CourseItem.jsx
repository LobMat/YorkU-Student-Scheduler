//#region - imports
import ActivityItem from "./ActivityItem";
import {useMainContext} from '../Scheduling'
//#endregion

const CourseItem = ({ course }) => {

  //#region - initialization
    const { 
      hooks:    {prefs}, 
      setters:  {setPref, setCourseValue, setActValue},
      getters:  {getPref, getCourseValue}
    } = useMainContext();

    const {code, title} = course;
  //#endregion

  //#region - select handlers 
  const handleSectionChange = (newSect) => {
    const [fp] = getPref(code, [`sectionPreferences[${newSect}]`]);
    const [fd] = getCourseValue(code, [`sections[${newSect}]`]);
    setCourseValue(code, [
      ['sectionChoice', newSect],
      ['uniqueActs', fd.uniqueActs],
      ['uniqueActChoice',fp.uniqueActChoice]
    ]);

    setActValue(code, [
      ['sectChar', fd.sect],
      ['termChar', fd.term],
      ['sectionChoice', newSect],
      ['uniqueActChoice',fp.uniqueActChoice],
      ['blocks', fp.commonActBlocks.concat(fp.uniqueActBlocks[fp.uniqueActChoice])]
    ]);

    setPref(code, [
      ['sectionChoice', newSect]
    ]);

    localStorage.setItem('coursePrefs', JSON.stringify(prefs))
  }

  const handleUniqueActChange = (newAct) => {
    const [fp] = getPref(code, [`sectionPreferences[${course?.sectionChoice}]`]);
    
    setCourseValue(code, [
      ['uniqueActChoice',newAct]
    ]);

    setActValue(code, [
      ['uniqueActChoice',newAct],
      ['blocks', fp.commonActBlocks.concat(fp.uniqueActBlocks[newAct])]
    ]);

    setPref(code, [
      [`sectionPreferences[${course?.sectionChoice}].uniqueActChoice`, newAct]
    ]);

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

      {/* unique activity choice dropdown */ }
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
        <ActivityItem course={course} type ="unique" pos={course?.uniqueActChoice} />
      </div>
    </div>
  );
  //#endregion

};

export default CourseItem;