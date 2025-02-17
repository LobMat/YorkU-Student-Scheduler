const StubDatabase = require( '../database/StubDatabase.js'); //import database access tool. in final implementation, this layer may not exist.

const courseRepository = {
  writeCourse: async (course) => {
    await StubDatabase.write("courses", course.courseCode, course.getLiteral());
  },

  readCourse: async (code) => {
    const courseLiteral = await StubDatabase.read("courses", code);
    return courseLiteral;
  },

  readSectionList: async(code) => {},
  readSection: async(code, sect) => {},
  readActivityList: async(code, sect)=> {},
  readActivity: async(code, sect, act) => {},
  
};

module.exports = courseRepository