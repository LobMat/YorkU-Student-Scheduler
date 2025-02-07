// a collection of controllers which make service calls related to 'Course' business objects.
const CourseService = require('../services/CourseService');

exports.addCourseController = async(req, res) => {
  const courseCode = req.query.code;  //get course code from get req query
  const courseObject = await CourseService.getCourseObject(courseCode);

  if (courseObject) {
    req.status(200).json({courseObject: courseObject});
  } else {
    req.status(201).json({courseObject: undefined});
  }
}