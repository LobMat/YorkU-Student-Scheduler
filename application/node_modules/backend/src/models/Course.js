// This file contains the business object for course data. 
// It will store related information such as course code, title, sections, instructors, activities, reviews, and user averages for this unique course instance.

class Course {

  //#region - Course business object instance contructor

  constructor(courseCode, courseTitle, sectionList = [], reviewList = [], difficultyRating = 0, contentRating = 0) {
    // parameters required to create a course object
    this.courseCode = courseCode;
    this.courseTitle = courseTitle;
    
    // not required for creation, only used for updating.
    this.sectionList = sectionList;
    this.reviewList = reviewList;
    this.difficultyRating = difficultyRating;
    this.contentRating = contentRating;
  }

  //#endregion

  //#region - static methods
  
  // converts a passed in Course instance to its equivalent database-friendly object. 
  static getKeyValue(course) {
    return {
      key: course.courseCode,
      value: {
        title:        course.courseTitle,
        sections:     course.sectionList,
        reviews:      course.reviewList,
        difficulty:   course.difficultyRating,
        quality:      course.contentRating
      }
    }
  }

  // converts a key-value pair into a Course instance.
  static getInstance(key, value) {
    return new Course(
      key,                // courseCode
      value.title,        // courseTitle
      value.sections,     // sectionList
      value.reviews,      // reviewList
      value.difficulty,   // difficultyRating
      value.quality,      // contentRating
    )
  }

  //#endregion

  //#region - instance methods

  // add reference to a review
  addReview(reviewID) {
    this.reviewList.push(reviewID);
  }
  // remove reference to a review
  removeReview(reviewID) {
    const reviewIndex = this.reviewList.indexOf(reviewID);
    if (reviewIndex > -1) {
      this.reviewList.splice(reviewIndex, 1);
    }
  }

  //#endregion

}

module.exports = Course;