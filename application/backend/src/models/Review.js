// This file contains the business object for a review. 
// It will store related information such as course code, term, section, professor, author, ratings, and date for this unique review instance.

class Review {

  //#region - Review business object instance contructor

  constructor(reviewID, courseCode, authorUsername, postedDate,description, difficultyRating = 0, contentRating = 0 ) {
    // parameters required to create a course object
    this.reviewID = reviewID;
    this.authorUsername = authorUsername;
    this.postedDate = postedDate;
    this.courseCode = courseCode;
    this.description = description
    // not required for creation, only used for updating.
    this.difficultyRating = difficultyRating;
    this.contentRating = contentRating;
  }

  //#endregion

  //#region - static methods
  
  // converts a passed in Course instance to its equivalent database-friendly object. 
  static async getValueArray(review) {
    return [
      review.reviewID,
      review.authorUsername,
      review.postedDate,
      review.courseCode,
      review.description,
      review.difficultyRating,
      review.contentRating,
    ];
  }

  // converts a key-value pair into a Course instance.
  static getInstance(value) {
    return new Review(
      value.review_id, // reviewID
      value.author, // authorUsername
      value.date, // postedDate
      value.course, // courseCode
      value.description, // description
      value.difficulty, // difficultyRating
      value.quality // contentRating
    );
  }

  //#endregion

  //#region - instance methods

  //#endregion

}

module.exports = Review;