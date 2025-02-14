/* This is for the framework of how accounts work.
 * Each account has 5 fields to store. The username, password, email, courses enrolled in, and friends.
 * Friends is another collection of friend objects, username, email, and password are strings, and enrolements is an array of specified courses (by section).
 */
const Course = require("./Course");
const Review = require("./Review");

class Account {
  // constructor for making an account
  constructor(username, password, email, enrollments, friends, reviews = {}) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.enrollments = enrollments;
    this.friends = friends;
    this.reviews = reviews;
  }

  // method for adding a course
  addEnrolledCourse(course) {
    this.enrollments.push(course);
  }

  // method for getting courses
  getEnrolledCourses() {
    return this.enrollments;
  }

  addFriend(friend) {
    this.friends.push(friend);
  }

  getFriendList() {
    return this.friends;
  }

  // method for changing username
  changeUsername(username) {
    this.username = username;
  }

  // method for changing password
  changePassword(password) {
    this.password = password;
  }

  // method for changing email
  changeEmail(email) {
    this.email = email;
  }

  // method for getting password
  getPassword() {
    return this.password;
  }

  // method for getting username
  getUsername() {
    return this.username;
  }

  // method for getting email
  getEmail() {
    return this.email;
  }

  // method for adding a review for a course
  addReview(courseCode, section, quality, difficulty, text) {
    if (!this.reviews[courseCode]) {
      this.reviews[courseCode] = [];
    }
    
    const review = new Review(quality, difficulty, text);
    this.reviews[courseCode].push(review);

    // Assuming the course object has a method to add a review to the professor
    const course = this.enrollments.find(c => c.courseCode === courseCode);
    if (course) {
      course.addReviewToProfessor(section, review); // Add the review to the professor
    }
  }

  // method for getting reviews for a course
  getReviews(courseCode) {
    return this.reviews[courseCode] || [];
  }

  static makeNewAccount(username, password, database) {
    if (database.read("accounts", username) != null) {
      return null; // Account with username already exists
    } else {
      return new Account(username, password, "", [], []);
    }
  }
}

module.exports = Account;
