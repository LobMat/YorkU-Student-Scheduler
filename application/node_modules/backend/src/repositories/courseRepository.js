const RealDatabase = require("../../database/RealDatabase.js");
const Course = require("../models/Course.js");

// this file contains the methods which facilitate database communication in the context of course business objects.
const courseRepository = {
  writeCourse: async (course) => {
    let sql = `INSERT INTO courses VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT ("courseCode")
       DO UPDATE SET
        "courseCode" = EXCLUDED."courseCode",
        title = EXCLUDED.title,
        sections = EXCLUDED.sections,
        reviews = EXCLUDED.reviews,
        difficulty = EXCLUDED.difficulty,
        quality = EXCLUDED.quality`;
    const value = await Course.getValueArray(course);
    await RealDatabase.write(sql, value);
  },

  readCourse: async (code) => {
    let sql = `SELECT * FROM courses WHERE "courseCode" = $1`;
    return await RealDatabase.read(sql, [code]); // return the first row of the result as an object (with values within being the columns).
  },
};

module.exports = courseRepository;
