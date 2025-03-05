// a collection of controllers which make service calls related to 'Review' business objects.const CourseService = require('../services/CourseService');
const ReviewService = require('../services/ReviewService');

exports.writeReviewController = async(req, res) => {
  const { 
    accountId,
    courseCode, 
    difficultyRating, 
    contentRating, 
    description 
  } = req.body;
  
  const resp = 200 + await ReviewService.postReview(accountId, courseCode, difficultyRating, contentRating, description);
  res.status(resp).json();

}
exports.getReviewsController = async(req,res) => {
  const query = req.query.query
  const response = await ReviewService.getReviews(query);
  res.status(200).json({response:response});
}