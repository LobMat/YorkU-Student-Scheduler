class CourseUtils {

  static newSection(sectionLetter, termLetter, directorName, subsects = [], commonActs = []) {
    return {
      sect:           sectionLetter,
      term:           termLetter,
      director:       directorName, 
      subsects:       subsects,
      commonActs:     commonActs, 
    };
  }
  
  static newActivity(activityName, catalogueNumber = "", instructorName = "") {
    return {
      name:       activityName,
      cata:       catalogueNumber,
      instructor: instructorName,
    }
  }

  static activityList(section) {
      return section.commonActs.concat(section.subsects);
  }

  static findActivity(section, activityName) {
      return this.activityList(section).find((activity) => activity.name == activityName)
  }
  
  static addActivity(section, activityName, catalogueNumber = "", instructorName = "") { 
    const newActivity = this.newActivity(activityName, catalogueNumber, instructorName);
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