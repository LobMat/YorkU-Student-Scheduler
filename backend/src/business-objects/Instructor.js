// var admin = require("firebase-admin");
// var serviceAccount = require("../yorku-scheduler-firebase-adminsdk-fbsvc-b71daa9446.json");
// admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
// const db = admin.firestore();

class Instructor {
  constructor(instructorName) {
    this.instructorName = instructorName;
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

  async save() {
    const courseRef = db.collection('courses').doc(this.courseName);
      await courseRef.set({ 
        sections: this.sectionList,
        reviews: this.reviews,
      });
    console.log('Course Written');
  }

  static async getCourseRef (courseName) {
    const courseDoc = await db.collection('courses').doc(courseName).get();
    if (!courseDoc.exists) return null;
    return courseDoc;
  }

  static async getCourseByName(courseName) {
    const data = getCourseRef(courseName).data();
    return new Course(courseName, data.sections);
  }


  // method for adding a review
  addReview(review) {
    this.reviewList.push(review);
    this.updateInstructorRatings();
  }

  // method for getting all reviews
  getReviews() {
    return this.reviewList;
  }

  // method for updating instructor ratings based on reviews
  updateInstructorRatings() {
    const totalReviews = this.reviewList.length;
    if (totalReviews === 0) {
      this.difficulty = 0;
      this.quality = 0;
      return;
    }

    let totalDifficulty = 0;
    let totalQuality = 0;

    this.reviewList.forEach((review) => {
      totalDifficulty += review.difficulty;
      totalQuality += review.quality;
    });

    this.difficulty = totalDifficulty / totalReviews;
    this.quality = totalQuality / totalReviews;
  }
}

module.exports = Course;
