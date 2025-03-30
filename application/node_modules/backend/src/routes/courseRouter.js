// This file contains the API endpoints for the frontend to call in order to access any business logic for course business objects.
// Each endpoint has an associated controller it calls to handle responses of each request.
const {addCourseController, initialCourseListController} = require('../controllers/CourseController');

const courseRouter = require('express').Router();

courseRouter.get('/add', addCourseController);
courseRouter.get('/init', initialCourseListController)
module.exports = courseRouter;