class CourseUtils {

  static newSection(sectionLetter, termLetter, instructorName, subsects = [], commonActs = []) {
    return {
      sect:           sectionLetter,
      term:           termLetter,
      inst:           instructorName, 
      subsects:       subsects,
      commonActs:     commonActs, 
    };
  }
  
  static newActivity(activityName, catalogueNumber = "") {
    return {
      name:    activityName,
      cata:    catalogueNumber,
    }
  }

  static activityList(section) {
      return section.commonActs.concat(section.subsects);
  }

  static findActivity(section, activityName) {
      return activityList(section).find((activity) => activity.name == activityName)
  }
  
  static addActivity(section, activityName, catalogueNumber = "") { 
    const newActivity = Activities.newActivity(activityName, catalogueNumber);
    ((catalogueNumber != "") ? section.subsects : section.commonActs).push(newActivity)
  }

  static display(section){
      const {sect, term, inst, subsects, commonActs} = section;
      let retString = `Term ${term} Section ${sect} | Instructor: ${inst}\n
                       This section has the following activities:\n`
      subsects.concat(commonActs).forEach((activity) => {
          const {name, cata, times} = activity;
          retString += `\t${name}\t${cata}`
      });
      return retString;
  }
}

 


module.exports = CourseUtils;