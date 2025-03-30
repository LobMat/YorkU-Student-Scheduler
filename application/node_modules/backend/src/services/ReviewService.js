const Review = require("../models/Review");
const Account = require("../models/Account");
const Course = require("../models/Course");
const accountRepository = require("../repositories/accountRepository");
const reviewRepository = require("../repositories/reviewRepository");
const courseRepository = require("../repositories/courseRepository");

// This file contains all business logic related to Review objects.

class ReviewService {
  //handle review posting logic.
  static async postReview(
    accountId,
    courseCode,
    difficultyRating,
    contentRating,
    description
  ) {
    const reviewId = await reviewRepository.nextId();
    const d = new Date();
    const newRev = new Review(
      reviewId,
      courseCode,
      accountId.substring(0, accountId.indexOf("|")),
      d.toDateString(),
      description,
      difficultyRating,
      contentRating
    );

    const courseData = await courseRepository.readCourse(courseCode);
    const accountData = await accountRepository.readAccount(accountId);
    if (!courseData) {
      return 1;
    } else if (!accountData) {
      return 2;
    } else {
      await reviewRepository.writeReview(newRev);
      const account = Account.getInstance(accountData);
      account.addReview(reviewId);
      await accountRepository.writeAccount(account);

      const course = Course.getInstance(courseData);
      course.addReview(reviewId);
      await courseRepository.writeCourse(course);

      return 0;
    }
  }

  //get all reviews matching a query
  static async getReviews(query) {
    const revis = Array.from(await reviewRepository.allReviews());
    return revis.filter(
      (review) => review.course === query || review.author === query
    );
  }
}

module.exports = ReviewService;
