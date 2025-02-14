// var admin = require("firebase-admin");
// var serviceAccount = require("../yorku-scheduler-firebase-adminsdk-fbsvc-b71daa9446.json");
// admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
// const db = admin.firestore();

const Section = require("./Section");
const Review = require("./Review"); // Import the Review class

class Course {
  constructor(courseCode, courseTitle, sectionList = []) {
    this.courseCode = courseCode;
    this.courseTitle = courseTitle;
    this.sectionList = sectionList;

    this.reviewList = [];
    this.difficulty = 0;
    this.quality = 0;
  }

  addSection(section) {
    this.sectionList.push(Object.assign({}, section));
  }

  getSection(letter) {
    return this.sectionList.find((section) => section.letter == letter);
  }

  // method for adding a review
  addReview(quality, difficulty, text) {
    const review = new Review(quality, difficulty, text);
    this.reviewList.push(review);
    this.updateCourseRatings();
  }

  // method for getting all reviews
  getReviews() {
    return this.reviewList;
  }

  // method for updating course ratings based on reviews
  updateCourseRatings() {
    const totalReviews = this.reviewList.length;
    if (totalReviews === 0) {
      this.difficulty = 0;
      this.quality = 0;
      return;
    }

    let totalDifficulty = 0;
    let totalQuality = 0;

    this.reviewList.forEach((review) => {
      totalDifficulty += review.getDifficulty();
      totalQuality += review.getQuality();
    });

    this.difficulty = totalDifficulty / totalReviews;
    this.quality = totalQuality / totalReviews;
  }

  // method for adding a review to the professor
  addReviewToProfessor(section, review) {
    const sectionObj = this.getSection(section);
    if (sectionObj && sectionObj.professor) {
      sectionObj.professor.addReview(review);
    }
  }
}

class Enrolments {
  constructor() {
    this.courseCode = courseCode;
    this.section = section;
    this.times = ["M:1:30-3:30", "T:4:30-6:30"];
  }
}

module.exports = Course;
