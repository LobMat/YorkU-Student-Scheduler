const StubDatabase = require( '../database/StubDatabase.js');
const Course = require('../models/Course.js');

// this file contains the methods which facilitate database communication in the context of course business objects. 
const courseRepository = {
  writeCourse: async (course) => {
    const {key, value} = Course.getKeyValue(course);
    await StubDatabase.write("courses", key, value);
  },

  readCourse: async (code) => {
    const courseLiteral = await StubDatabase.read("courses", code);
    return courseLiteral;
  },
  
};

module.exports = courseRepository