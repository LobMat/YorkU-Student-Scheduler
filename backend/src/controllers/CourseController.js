
const CourseService = require('../services/CourseService.js')


  exports.openPageController = async(req, res) => {
    const parsedData = await JSON.parse(decodeURIComponent(req.query.data || "{}"));
    if (parsedData) {
      const { courseUIContainer, activityUIContainer } = await CourseService.initialLoad(parsedData);
      if (courseUIContainer && activityUIContainer) {
        res.status(200).json({ success: true, courseUIContainer: courseUIContainer, activityUIContainer: activityUIContainer});
      } else {
          res.status(400).json({ success: false, err: 'err(idk)' })
      } 
    } else {
      res.status(400).json({ success: false, err: 'err(idk)' })
    }
  }

  exports.addCourseController = async(req, res) => {
    const courseCode = req.query.code;
    const { courseObj, activityObj } = await CourseService.parseDataAndPrefs(courseCode, undefined);
    if (courseObj && activityObj){
      res.status(200).json({ success: true, courseObj, activityObj});
    } else {
      res.status(400).json({ success: false, err: 'courseNotFound' })
    }
  }
  