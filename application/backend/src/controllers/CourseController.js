// a collection of controllers which make service calls related to 'Course' business objects.
const CourseService = require('../services/CourseService');

exports.addCourseController = async(req, res) => {
  const courseCode = req.query.code;  //get course code from get req query
  const courseObject = await CourseService.getCourseObject(courseCode);

  if (courseObject) {
    res.status(200).json({courseObject: courseObject});
  } else {
    res.status(201).json({courseObject: undefined});
  }
}

exports.initialCourseListController = async(req, res) => {
  const prefs = await JSON.parse(decodeURIComponent(req.query.data));
  const courseObjectList = await CourseService.getInitialCourseList(prefs);
  res.status(200).json({courseObjectList: courseObjectList});

}