const Course = require('../models/Course');
const CourseUtils = require('../utils/CourseUtils');
const Database = require('../database/StubDatabase');

class CourseRepository {
    static async writeCourse(course) {
        await Database.write("courses", course.courseCode, course.getLiteral());
    }

    static async readCourse(courseCode) {
        const courseLiteral = await Database.read("courses", courseCode);
        if (!courseLiteral)  return null //throw error, course does not exist.
        else                 return Course.getCourseFromData(courseLiteral)
    }

    static async readSection(courseCode, sectionLetter) {
        const course = await readCourse(courseCode);
        if (!course) return null //throw error, course does not exist.
       
        const section = course.findSection(sectionLetter) 
        if (!section)   return null; //throw error
        else            return section;
    }

    static async readActivity(courseCode, sectionLetter, activityName) {
        const section = await readSection(courseCode, sectionLetter)
        if (!section) return null //throw error, course does not exist.
       
        const activity = CourseUtils.findActivity(section, activityName) 
        if (!activity)  return null; //throw error
        else            return activity;
    }

    static async readActivityList(courseCode, sectionLetter) {
        const section = await readSection(courseCode, sectionLetter)
        if (!section)   return null //throw error, course does not exist.
        else            return CourseUtils.activityList(section)
    }
} 

// The following class 'CourseServices.js' contains all business logic related to 'Course Objects'.
class CourseService {    


    
}


module.exports = { CourseService, CourseRepository };