const { openPageController, addCourseController } = require('../controllers/CourseController')

const courseRouter = require('express').Router();

courseRouter.get("/init", openPageController)

courseRouter.get("/add", addCourseController)

module.exports = courseRouter;