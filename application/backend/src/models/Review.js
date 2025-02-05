// This file contains the business object for a review. 
// It will store related information such as course code, term, section, professor, author, ratings, and date for this unique review instance.

class Review {

  //#region - Review business object instance contructor

  constructor(reviewID, courseCode, authorUsername, postedDate, difficultyRating = 0, contentRating = 0) {
    // parameters required to create a course object
    this.reviewID = reviewID;
    this.authorUsername = authorUsername;
    this.postedDate = postedDate;
    this.courseCode = courseCode;

    // not required for creation, only used for updating.
    this.difficultyRating = difficultyRating;
    this.contentRating = contentRating;
  }

  //#endregion

  //#region - static methods
  
  // converts a passed in Course instance to its equivalent database-friendly object. 
  static getKeyValue(review) {
    return {
      key: review.reviewID,
      value: {
        author:       review.authorUsername,
        date:         review.postedDate,
        course:       review.courseCode,
        difficulty:   review.difficultyRating,
        quality:      review.contentRating
      }
    }
  }

  // converts a key-value pair into a Course instance.
  static getInstance(key, value) {
    return new Course(
      key,                // reviewID
      value.author,       // authorUsername
      value.date,         // postedDate
      value.course,       // courseCode
      value.difficulty,   // difficultyRating
      value.quality,      // contentRating
    )
  }

  //#endregion

  //#region - instance methods

  //#endregion

}

module.exports = Review;