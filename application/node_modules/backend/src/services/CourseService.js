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
}

module.exports = CourseService;