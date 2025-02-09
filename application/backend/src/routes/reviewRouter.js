// This file contains the API endpoints for the frontend to call in order to access any business logic for review business objects.
// Each endpoint has an associated controller it calls to handle responses of each request.

const {writeReviewController} = require('../controllers/ReviewController');

const reviewRouter = require('express').Router();

reviewRouter.post('/writeReview', writeReviewController);

module.exports = reviewRouter;