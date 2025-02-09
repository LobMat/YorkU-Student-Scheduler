const Course = require('../models/Course');
const courseRepository = require('../repositories/courseRepository');

// This file contains all business logic related to Course objects.

class CourseService {  

  static async getCourseObject(courseCode) {
    const courseData = await courseRepository.readCourse(courseCode);
    if (!courseData) return undefined;
    return ({
      code: courseCode,
      title: courseData.title,
      sections: courseData.sections,
      uniqueActs: courseData.sections[0].uniqueActs,
      sectionChoice: 0,
      uniqueActChoice: 0,
      blocks: [],
    })
  }
  
  static async getInitialCourseList(allPrefs) {
    const returnList = [];
  
    for (const [code, prefs] of Object.entries(allPrefs)) {
      const courseObject = await this.getCourseObject(code);
      if (courseObject) {
        const sectChoice = prefs.sectionChoice;
        const actChoice =  prefs.sectionPreferences[sectChoice].uniqueActChoice;
        const blocks =     prefs.sectionPreferences[sectChoice].commonActBlocks.concat([prefs.sectionPreferences[sectChoice].uniqueActBlocks[actChoice]]);

        courseObject.sectionChoice =   sectChoice;
        courseObject.uniqueActChoice = actChoice;
        courseObject.blocks = blocks;
        
        returnList.push(courseObject);
      }
    }
    
    return returnList;
  }
}

module.exports = CourseService;